import { supabase } from './supabase';
import { Reference, ReferenceFormData } from '@/types/reference';

/**
 * Holt alle veröffentlichten Referenzen, sortiert nach order_index
 * WICHTIG: Die RLS-Policy filtert bereits nach is_published = true,
 * daher verwenden wir keine explizite Filterung mehr
 */
export async function getAllReferences(): Promise<Reference[]> {
  try {
    console.log('🔍 getAllReferences: Fetching published references...');
    
    // Die RLS-Policy "Public can view published references" filtert bereits nach is_published = true
    // Daher verwenden wir keine explizite Filterung, um alle veröffentlichten Referenzen zu erhalten
    const { data, error } = await supabase
      .from('references')
      .select('*')
      .order('order_index', { ascending: true, nullsFirst: false });
    
    if (error) {
      console.error('❌ Error fetching references:', error);
      console.error('Error details:', error.message, error.code, error.details, error.hint);
      return [];
    }

    console.log(`✅ getAllReferences: Found ${data?.length || 0} published references (RLS-filtered)`);
    if (data && data.length > 0) {
      console.log('Published references:', data.map(r => ({ 
        id: r.id, 
        title: r.title, 
        slug: r.slug, 
        is_published: r.is_published 
      })));
    }

    return data || [];
  } catch (error) {
    console.error('❌ Error in getAllReferences:', error);
    return [];
  }
}

/**
 * Holt eine Referenz anhand des Slugs
 */
export async function getReferenceBySlug(slug: string): Promise<Reference | null> {
  try {
    console.log('🔍 getReferenceBySlug: Fetching reference with slug:', slug);
    
    // Explizit alle Felder inkl. challenges auswählen
    const { data, error } = await supabase
      .from('references')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('❌ Error fetching reference:', error);
      console.error('Error details:', error.message, error.code, error.details, error.hint);
      return null;
    }

    // Logge alle zurückgegebenen Felder
    console.log('✅ getReferenceBySlug: Raw data keys:', data ? Object.keys(data) : 'no data');
    console.log('✅ getReferenceBySlug: Full data:', JSON.stringify(data, null, 2));
    
    // Falls challenges fehlt, versuche es explizit zu laden
    if (data && !('challenges' in data)) {
      console.log('⚠️ challenges field missing, trying to fetch explicitly...');
      const { data: challengesData, error: challengesError } = await supabase
        .from('references')
        .select('challenges')
        .eq('slug', slug)
        .single();
      
      if (!challengesError && challengesData) {
        console.log('✅ Successfully fetched challenges:', challengesData.challenges);
        data.challenges = challengesData.challenges;
      } else {
        console.error('❌ Error fetching challenges:', challengesError);
      }
    }
    
    console.log('✅ getReferenceBySlug: Found reference:', {
      id: data?.id,
      title: data?.title,
      hasChallenges: 'challenges' in (data || {}),
      challenges: data?.challenges,
      challengesType: typeof data?.challenges,
      challengesIsArray: Array.isArray(data?.challenges),
      challengesLength: data?.challenges?.length,
    });

    return data;
  } catch (error) {
    console.error('❌ Error in getReferenceBySlug:', error);
    return null;
  }
}

/**
 * Holt verwandte Referenzen (ausgenommen die aktuelle)
 */
export async function getRelatedReferences(currentId: string, limit: number = 3): Promise<Reference[]> {
  try {
    const { data, error } = await supabase
      .from('references')
      .select('id, title, slug, logo_path, highlight_video_path, color_glow, created_at, is_published')
      .eq('is_published', true)
      .neq('id', currentId)
      .order('order_index', { ascending: true, nullsFirst: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related references:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getRelatedReferences:', error);
    return [];
  }
}

/**
 * Erstellt eine neue Referenz (Admin) - über API Route
 */
export async function createReference(reference: ReferenceFormData): Promise<{ success: boolean; data?: Reference; error?: string }> {
  try {
    const response = await fetch('/api/references', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reference),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Fehler beim Erstellen',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
    };
  }
}

/**
 * Aktualisiert eine Referenz (Admin) - über API Route
 */
export async function updateReference(id: string, reference: Partial<ReferenceFormData>): Promise<{ success: boolean; data?: Reference; error?: string }> {
  try {
    const response = await fetch(`/api/references/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reference),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Fehler beim Aktualisieren',
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
    };
  }
}

/**
 * Löscht eine Referenz (Admin) - über API Route
 */
export async function deleteReference(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/references/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Fehler beim Löschen',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unbekannter Fehler',
    };
  }
}

/**
 * Holt alle Referenzen für Admin-Panel (inkl. nicht veröffentlichte) - über API Route
 */
export async function getAllReferencesAdmin(): Promise<Reference[]> {
  try {
    // Verwende cache: 'no-store' und timestamp um sicherzustellen, dass immer die neuesten Daten geladen werden
    const timestamp = Date.now();
    const response = await fetch(`/api/references?t=${timestamp}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error fetching references:', errorData.error || 'Unknown error', 'Status:', response.status);
      return [];
    }

    const data = await response.json();
    console.log('✅ Client: Loaded references from API:', data.length);
    console.log('References:', data.map((r: Reference) => ({ id: r.id, title: r.title, slug: r.slug })));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error in getAllReferencesAdmin:', error);
    return [];
  }
}

/**
 * Generiert einen Slug aus einem Titel
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Entfernt diakritische Zeichen
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
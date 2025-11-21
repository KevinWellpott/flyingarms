// lib/page-sections.ts
// Client-seitige Funktionen für page_sections (nur Read-Operationen)

import { PageSection, PageSectionFormData } from '@/types/page-section';
import { extractYouTubeId } from '@/lib/utils';

/**
 * Holt alle aktiven Page Sections (für öffentliche Seiten)
 */
export async function getAllPageSections(): Promise<PageSection[]> {
  try {
    const response = await fetch('/api/page-sections', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch page sections');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching page sections:', error);
    return [];
  }
}

/**
 * Holt eine Page Section anhand des Slugs (für öffentliche Seiten)
 */
export async function getPageSectionBySlug(slug: string): Promise<PageSection | null> {
  try {
    const response = await fetch(`/api/page-sections/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching page section:', error);
    return null;
  }
}

/**
 * Holt alle Page Sections für Admin (inkl. inaktive)
 */
export async function getAllPageSectionsAdmin(): Promise<PageSection[]> {
  try {
    const response = await fetch('/api/page-sections/admin', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch page sections');
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching page sections for admin:', error);
    return [];
  }
}

/**
 * Erstellt eine neue Page Section (Admin)
 */
export async function createPageSection(
  pageSection: PageSectionFormData
): Promise<{ success: boolean; data?: PageSection; error?: string }> {
  try {
    const response = await fetch('/api/page-sections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageSection),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Fehler beim Erstellen der Seite',
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
 * Aktualisiert eine Page Section (Admin)
 */
export async function updatePageSection(
  id: string,
  pageSection: Partial<PageSectionFormData>
): Promise<{ success: boolean; data?: PageSection; error?: string }> {
  try {
    const response = await fetch(`/api/page-sections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pageSection),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Fehler beim Aktualisieren der Seite',
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
 * Löscht eine Page Section (Admin)
 */
export async function deletePageSection(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`/api/page-sections/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Fehler beim Löschen der Seite',
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


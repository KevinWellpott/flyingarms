import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Öffentlicher Client (mit RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase client not configured' },
      { status: 500 }
    );
  }

  try {
    console.log('🔍 Public API: Fetching published references...');
    
    // Prüfe zuerst alle Referenzen (ohne Filter)
    const { data: allData, error: allError } = await supabase
      .from('references')
      .select('id, title, slug, is_published, order_index');
    
    console.log('📊 All references (before filter):', allData?.length || 0);
    if (allData) {
      console.log('All references data:', allData.map(r => ({ 
        id: r.id, 
        title: r.title, 
        slug: r.slug, 
        is_published: r.is_published 
      })));
    }
    
    if (allError) {
      console.error('❌ Error fetching all references:', allError);
    }
    
    // Jetzt filtere nach veröffentlichten Referenzen
    const { data, error } = await supabase
      .from('references')
      .select('*')
      .eq('is_published', true)
      .order('order_index', { ascending: true, nullsFirst: false });

    if (error) {
      console.error('❌ Error fetching published references:', error);
      console.error('Error details:', error.message, error.code, error.details, error.hint);
      return NextResponse.json(
        { error: error.message, code: error.code, details: error.details },
        { status: 400 }
      );
    }

    console.log(`✅ Public API: Found ${data?.length || 0} published references`);
    if (data && data.length > 0) {
      console.log('Published references:', data.map(r => ({ 
        id: r.id, 
        title: r.title, 
        slug: r.slug, 
        is_published: r.is_published 
      })));
    } else {
      console.warn('⚠️ No published references found, but allData shows:', allData?.length || 0, 'references');
    }

    return NextResponse.json(data || [], {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


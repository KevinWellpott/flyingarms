import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

/**
 * GET /api/page-sections/slug/[slug]
 * Holt eine Page Section anhand des Slugs (öffentlich)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('page_sections')
      .select('*')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


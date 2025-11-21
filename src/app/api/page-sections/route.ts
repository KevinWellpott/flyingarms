import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PageSection, PageSectionFormData } from '@/types/page-section';

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
 * GET /api/page-sections
 * Holt alle aktiven Page Sections (öffentlich)
 */
export async function GET(request: NextRequest) {
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
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data || [], {
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

/**
 * POST /api/page-sections
 * Erstellt eine neue Page Section (Admin)
 */
export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const body: PageSectionFormData = await request.json();
    
    // Parse JSON fields if they are strings
    const pageSectionData: any = {
      ...body,
      services: typeof body.services === 'string' ? JSON.parse(body.services) : body.services,
      pricing_tiers: typeof body.pricing_tiers === 'string' ? JSON.parse(body.pricing_tiers) : body.pricing_tiers,
      gallery_images: typeof body.gallery_images === 'string' ? JSON.parse(body.gallery_images) : body.gallery_images,
      featured_video: typeof body.featured_video === 'string' ? JSON.parse(body.featured_video) : body.featured_video,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('page_sections')
      .insert([pageSectionData])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


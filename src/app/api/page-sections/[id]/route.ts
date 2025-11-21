import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { PageSectionFormData } from '@/types/page-section';

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
 * GET /api/page-sections/[id]
 * Holt eine Page Section anhand der ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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
      .eq('id', params.id)
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

/**
 * PUT /api/page-sections/[id]
 * Aktualisiert eine Page Section
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const body: Partial<PageSectionFormData> = await request.json();
    
    // Parse JSON fields if they are strings
    const updateData: any = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    if (body.services && typeof body.services === 'string') {
      updateData.services = JSON.parse(body.services);
    }
    if (body.pricing_tiers && typeof body.pricing_tiers === 'string') {
      updateData.pricing_tiers = JSON.parse(body.pricing_tiers);
    }
    if (body.gallery_images && typeof body.gallery_images === 'string') {
      updateData.gallery_images = JSON.parse(body.gallery_images);
    }
    if (body.featured_video && typeof body.featured_video === 'string') {
      updateData.featured_video = JSON.parse(body.featured_video);
    }

    const { data, error } = await supabaseAdmin
      .from('page_sections')
      .update(updateData)
      .eq('id', params.id)
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

/**
 * DELETE /api/page-sections/[id]
 * Löscht eine Page Section
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const { error } = await supabaseAdmin
      .from('page_sections')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


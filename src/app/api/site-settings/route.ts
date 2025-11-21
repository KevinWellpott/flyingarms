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

// GET - Site Settings abrufen
export async function GET(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching site settings:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data || null, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/site-settings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// PUT - Site Settings aktualisieren
export async function PUT(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { hero_youtube_url } = body;

    // Hole den ersten Eintrag (sollte nur einer existieren)
    const { data: existing } = await supabaseAdmin
      .from('site_settings')
      .select('id')
      .limit(1)
      .single();

    let result;

    if (existing) {
      // Update bestehenden Eintrag
      const { data, error } = await supabaseAdmin
        .from('site_settings')
        .update({
          hero_youtube_url: hero_youtube_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating site settings:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      result = data;
    } else {
      // Erstelle neuen Eintrag
      const { data, error } = await supabaseAdmin
        .from('site_settings')
        .insert([{
          hero_youtube_url: hero_youtube_url || null,
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating site settings:', error);
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      result = data;
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Unexpected error in PUT /api/site-settings:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


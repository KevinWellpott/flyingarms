import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Test-Route um zu prüfen, ob INSERT mit Service Role Key funktioniert
export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Missing credentials' },
      { status: 500 }
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  try {
    // Test-Insert
    const { data, error } = await supabaseAdmin
      .from('references')
      .insert([
        {
          title: 'Test Referenz',
          slug: 'test-referenz-' + Date.now(),
          is_published: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase Error:', error);
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
        { status: 400 }
      );
    }

    // Lösche Test-Datensatz wieder
    await supabaseAdmin.from('references').delete().eq('id', data.id);

    return NextResponse.json({
      success: true,
      message: 'Test-Insert erfolgreich! Service Role Key funktioniert.',
      testData: data,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}


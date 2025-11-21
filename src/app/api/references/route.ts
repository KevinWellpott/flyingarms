import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Reference, ReferenceFormData } from '@/types/reference';

// Service Role Key - nur serverseitig!
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY;

console.log('API Route - Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('API Route - Service Role Key:', serviceRoleKey ? 'Set (' + serviceRoleKey.substring(0, 10) + '...)' : 'Missing');

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase credentials for admin operations');
  console.error('URL:', supabaseUrl);
  console.error('Service Role Key:', serviceRoleKey ? 'Present' : 'Missing');
}

// Erstelle Admin Client mit Service Role Key (umgeht RLS)
// WICHTIG: Service Role Key muss mit 'service_role' enden oder der komplette Key sein
const supabaseAdmin = supabaseUrl && serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Teste ob Admin Client korrekt initialisiert wurde
if (supabaseAdmin && serviceRoleKey) {
  console.log('✅ Supabase Admin Client initialized with Service Role Key');
  console.log('Service Role Key starts with:', serviceRoleKey.substring(0, 20)); // ✅ FIX: Jetzt sicher
} else {
  console.error('❌ Failed to initialize Supabase Admin Client');
  console.error('URL:', supabaseUrl);
  console.error('Key present:', !!serviceRoleKey);
}

// GET - Alle Referenzen (Admin)
export async function GET(request: NextRequest) {
  if (!supabaseAdmin) {
    console.error('Admin client not configured in GET /api/references');
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    console.log('Fetching all references...');
    const { data, error } = await supabaseAdmin
      .from('references')
      .select('*')
      .order('order_index', { ascending: true, nullsFirst: false });

    if (error) {
      console.error('Error fetching references:', error);
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 400 }
      );
    }

    console.log(`✅ Fetched ${data?.length || 0} references`);
    return NextResponse.json(data || [], {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Unexpected error in GET /api/references:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Neue Referenz erstellen
export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    console.error('Admin client not configured - URL:', supabaseUrl, 'Key:', serviceRoleKey ? 'Present' : 'Missing');
    return NextResponse.json(
      { error: 'Admin client not configured. Please check NEW_SUPABASE_SERVICE_ROLE_KEY in .env.local' },
      { status: 500 }
    );
  }

  try {
    const body: ReferenceFormData = await request.json();
    console.log('Creating reference:', body.title);
    console.log('Using Service Role Key:', !!serviceRoleKey);
    console.log('Supabase Admin Client:', !!supabaseAdmin);

    // Prüfe ob Service Role Key korrekt ist (sollte mit 'service_role' enden)
    if (serviceRoleKey && !serviceRoleKey.includes('service_role') && !serviceRoleKey.startsWith('eyJ')) {
      console.warn('⚠️ Service Role Key might be incorrect. Should contain "service_role" or be a JWT token.');
    }

    const { data, error } = await supabaseAdmin
      .from('references')
      .insert([body])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error code:', error.code);
      console.error('Error details:', error.details);
      console.error('Error hint:', error.hint);
      return NextResponse.json(
        { 
          error: error.message, 
          code: error.code, 
          details: error.details,
          hint: error.hint,
          message: 'RLS-Fehler: Bitte prüfen Sie, ob der Service Role Key korrekt ist und RLS umgeht.'
        },
        { status: 400 }
      );
    }

    console.log('✅ Reference created successfully:', data?.id);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
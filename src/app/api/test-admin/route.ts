import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Test-Route um zu prüfen, ob der Service Role Key funktioniert
export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.NEW_SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    hasUrl: !!supabaseUrl,
    hasServiceRoleKey: !!serviceRoleKey,
    serviceRoleKeyPrefix: serviceRoleKey ? serviceRoleKey.substring(0, 20) + '...' : 'Missing',
    message: serviceRoleKey ? 'Service Role Key is loaded' : 'Service Role Key is MISSING - check .env.local',
  });
}


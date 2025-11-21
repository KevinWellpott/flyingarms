import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { BucketName, MAX_FILE_SIZES, ALLOWED_LOGO_FORMATS, ALLOWED_IMAGE_FORMATS, ALLOWED_VIDEO_FORMATS } from '@/types/storage';

// Service Role Key - nur serverseitig!
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

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Admin client not configured' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as BucketName;
    const path = formData.get('path') as string | null;

    if (!file || !bucket) {
      return NextResponse.json(
        { error: 'File and bucket are required' },
        { status: 400 }
      );
    }

    // Validierung der Dateigröße
    const maxSize = MAX_FILE_SIZES[bucket];
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Datei ist zu groß. Maximum: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Validierung des Dateityps
    let allowedFormats: string[];
    switch (bucket) {
      case 'logos':
        allowedFormats = ALLOWED_LOGO_FORMATS;
        break;
      case 'gallery-images':
        allowedFormats = ALLOWED_IMAGE_FORMATS;
        break;
      case 'videos':
        allowedFormats = ALLOWED_VIDEO_FORMATS;
        break;
      default:
        return NextResponse.json(
          { error: 'Ungültiger Bucket-Name' },
          { status: 400 }
        );
    }

    if (!allowedFormats.includes(file.type)) {
      return NextResponse.json(
        { error: `Ungültiger Dateityp. Erlaubt: ${allowedFormats.join(', ')}` },
        { status: 400 }
      );
    }

    // Generiere eindeutigen Dateinamen
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = path || `${timestamp}-${randomString}.${fileExtension}`;
    // WICHTIG: filePath sollte NICHT den Bucket-Namen enthalten, da Supabase Storage den Bucket bereits kennt
    const filePath = fileName;

    // Upload mit Service Role Key (umgeht RLS)
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Hole öffentliche URL - verwende nur den Dateinamen, nicht bucket/dateiname
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    // Rückgabe: path sollte den vollständigen Pfad enthalten für die Datenbank
    // aber ohne doppelten bucket-Namen
    return NextResponse.json({
      success: true,
      path: filePath, // Nur der Dateiname, z.B. "1763628212252-fbmk75j1vq.png"
      url: urlData.publicUrl,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


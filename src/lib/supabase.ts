// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { PageSection } from '../types/page';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
console.log('Supabase Key:', supabaseKey ? 'Set' : 'Missing');

const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function getPageBySlug(slug: string): Promise<PageSection | null> {
  console.log('🔍 Searching for slug:', slug);
  
  try {
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    console.log('📊 Supabase Response:', { data, error });

    if (error) {
      console.error('❌ Supabase Error:', error);
      return null;
    }

    if (!data) {
      console.log('❌ No data found for slug:', slug);
      return null;
    }

    console.log('✅ Found data:', data.title);
    return data;
  } catch (error) {
    console.error('💥 Catch Error in getPageBySlug:', error);
    return null;
  }
}

export async function getAllPageSlugs(): Promise<string[]> {
  console.log('🔍 Getting all slugs...');
  
  try {
    const { data, error } = await supabase
      .from('page_sections')
      .select('slug')
      .eq('is_active', true);

    console.log('📊 All Slugs Response:', { data, error });

    if (error) {
      console.error('❌ Error getting slugs:', error);
      return [];
    }

    const slugs = data?.map(item => item.slug) || [];
    console.log('✅ Found slugs:', slugs);
    return slugs;
  } catch (error) {
    console.error('💥 Catch Error in getAllPageSlugs:', error);
    return [];
  }
}

// ✅ DIE FEHLENDE FUNKTION!
export function getVideoEmbedUrl(url: string, type: 'vimeo' | 'youtube' | 'direct' | 'none'): string {
  if (type === 'direct' || type === 'none') {
    return url;
  }

  if (type === 'vimeo') {
    // Vimeo URL: https://vimeo.com/123456789
    // Embed URL: https://player.vimeo.com/video/123456789?autoplay=1&loop=1&muted=1
    const vimeoId = url.split('/').pop()?.split('?')[0];
    return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1`;
  }

  if (type === 'youtube') {
    // YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID?autoplay=1&loop=1&mute=1
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = new URL(url).searchParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&playlist=${videoId}`;
  }

  return url;
}
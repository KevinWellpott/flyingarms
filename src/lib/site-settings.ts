import { supabase } from './supabase';

export interface SiteSettings {
  id: string;
  created_at: string;
  updated_at: string;
  hero_youtube_url: string | null;
}

/**
 * Holt die aktuellen Site Settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching site settings:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getSiteSettings:', error);
    return null;
  }
}

/**
 * Extrahiert YouTube Video ID aus verschiedenen URL-Formaten
 */
export function extractYouTubeVideoId(urlOrId: string | null | undefined): string | null {
  if (!urlOrId) return null;

  // Wenn es bereits eine reine Video-ID ist (11 Zeichen, alphanumerisch)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return urlOrId;
  }

  // Extrahiere Video-ID aus verschiedenen YouTube-URL-Formaten
  let videoId = '';
  
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (urlOrId.includes('youtube.com/watch?v=')) {
    const match = urlOrId.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    videoId = match ? match[1] : '';
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (urlOrId.includes('youtu.be/')) {
    const match = urlOrId.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    videoId = match ? match[1] : '';
  }
  // Format: https://www.youtube.com/embed/VIDEO_ID
  else if (urlOrId.includes('youtube.com/embed/')) {
    const match = urlOrId.match(/embed\/([a-zA-Z0-9_-]{11})/);
    videoId = match ? match[1] : '';
  }
  // Format: https://www.youtube.com/v/VIDEO_ID
  else if (urlOrId.includes('youtube.com/v/')) {
    const match = urlOrId.match(/\/v\/([a-zA-Z0-9_-]{11})/);
    videoId = match ? match[1] : '';
  }
  // Wenn nichts passt, versuche es als Video-ID zu verwenden
  else {
    videoId = urlOrId.trim();
  }

  if (!videoId || videoId.length !== 11) {
    console.warn('Ungültige YouTube Video-ID:', urlOrId);
    return null;
  }

  return videoId;
}


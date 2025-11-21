import { supabase } from './supabase';
import { getChannelPlaylists, getPlaylistItems } from './youtube-api';
import { PlaylistData, VideoData, YouTubePlaylist, YouTubePlaylistItem } from '@/types/youtube';

const CACHE_DURATION_HOURS = 24;

function isCacheValid(lastUpdated: string | null): boolean {
  if (!lastUpdated) {
    return false;
  }
  const lastUpdatedDate = new Date(lastUpdated);
  const currentDate = new Date();
  const diffHours = (currentDate.getTime() - lastUpdatedDate.getTime()) / (1000 * 60 * 60);
  return diffHours < CACHE_DURATION_HOURS;
}

export async function getCachedPlaylists(): Promise<PlaylistData[]> {
  // 1. Try to get from cache
  const { data: cachedPlaylists, error: selectError } = await supabase
    .from('youtube_playlists')
    .select('*');

  if (selectError) {
    console.error('Error fetching playlists from cache:', selectError);
  }

  if (cachedPlaylists && cachedPlaylists.length > 0 && isCacheValid(cachedPlaylists[0].last_updated)) {
    return cachedPlaylists;
  }

  // 2. Fetch from API if cache is invalid or empty
  const apiPlaylists = await getChannelPlaylists();

  // 3. Update cache
  const playlistsToUpsert = apiPlaylists.map((p: YouTubePlaylist) => ({
    id: p.id,
    title: p.snippet.title,
    description: p.snippet.description,
    thumbnail_url: p.snippet.thumbnails.high?.url || p.snippet.thumbnails.default?.url,
    video_count: p.contentDetails.itemCount,
    last_updated: new Date().toISOString(),
  }));

  const { error: upsertError } = await supabase
    .from('youtube_playlists')
    .upsert(playlistsToUpsert, { onConflict: 'id' });

  if (upsertError) {
    console.error('Error upserting playlists to cache:', upsertError);
  }

  return (await supabase.from('youtube_playlists').select('*')).data || [];
}

export async function getCachedPlaylistVideos(playlistId: string): Promise<VideoData[]> {
    // 1. Check playlist's last_updated to decide if videos need re-fetching
    const { data: playlistData, error: playlistError } = await supabase
        .from('youtube_playlists')
        .select('last_updated')
        .eq('id', playlistId)
        .single();

    if (playlistError) {
        console.error('Error fetching playlist metadata from cache:', playlistError);
    }
    
    if (playlistData && isCacheValid(playlistData.last_updated)) {
        const { data: cachedVideos, error: videosError } = await supabase
            .from('youtube_playlist_videos')
            .select('*')
            .eq('playlist_id', playlistId)
            .order('position', { ascending: true });

        if (videosError) {
            console.error('Error fetching videos from cache:', videosError);
        }

        if (cachedVideos && cachedVideos.length > 0) {
            return cachedVideos;
        }
    }

    // 2. Fetch from API
    const apiVideos = await getPlaylistItems(playlistId);

    // 3. Update cache
    const videosToUpsert = apiVideos.map((item: YouTubePlaylistItem) => ({
        playlist_id: playlistId,
        video_id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail_url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
        published_at: item.snippet.publishedAt,
        position: item.snippet.position,
    }));

    // To ensure data consistency, we can delete old videos and insert new ones
    await supabase.from('youtube_playlist_videos').delete().eq('playlist_id', playlistId);
    
    const { error: upsertError } = await supabase
        .from('youtube_playlist_videos')
        .upsert(videosToUpsert, { onConflict: 'playlist_id,video_id', ignoreDuplicates: false });

    if (upsertError) {
        console.error('Error upserting videos to cache:', upsertError);
    }

    // Also update the parent playlist's last_updated timestamp
    await supabase.from('youtube_playlists').update({ last_updated: new Date().toISOString() }).eq('id', playlistId);


    return (await supabase.from('youtube_playlist_videos').select('*').eq('playlist_id', playlistId).order('position', { ascending: true })).data || [];
}

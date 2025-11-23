import { google } from 'googleapis';
import { YouTubePlaylist, YouTubePlaylistItem } from '@/types/youtube';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

export async function getChannelPlaylists(): Promise<YouTubePlaylist[]> {
  if (!CHANNEL_ID) {
    throw new Error('YOUTUBE_CHANNEL_ID is not set');
  }

  let allPlaylists: YouTubePlaylist[] = [];
  let nextPageToken: string | undefined | null = undefined;

  try {
    let res;
    do {
      res = await youtube.playlists.list({
        part: ['snippet', 'contentDetails'],
        channelId: CHANNEL_ID,
        maxResults: 50,
        pageToken: nextPageToken || undefined,
      });

      if (res.data.items) {
        allPlaylists = allPlaylists.concat(res.data.items as YouTubePlaylist[]);
      }

      nextPageToken = res.data.nextPageToken;
    } while (nextPageToken);

    return allPlaylists;
  } catch (error) {
    console.error('Error fetching playlists from YouTube API:', error);
    throw new Error('Could not fetch playlists');
  }
}

export async function getPlaylistItems(playlistId: string): Promise<YouTubePlaylistItem[]> {
  let allItems: YouTubePlaylistItem[] = [];
  let nextPageToken: string | undefined | null = undefined;

  try {
    let res;
    do {
      res = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: playlistId,
        maxResults: 50,
        pageToken: nextPageToken || undefined,
      });

      if (res.data.items) {
        allItems = allItems.concat(res.data.items as YouTubePlaylistItem[]);
      }

      nextPageToken = res.data.nextPageToken;
    } while (nextPageToken);

    return allItems;
  } catch (error) {
    console.error(`Error fetching items for playlist ${playlistId} from YouTube API:`, error);
    throw new Error(`Could not fetch items for playlist ${playlistId}`);
  }
}

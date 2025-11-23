import { YouTubePlaylistItem, YouTubePlaylistItemsResponse, YouTubePlaylist, YouTubePlaylistsResponse } from '@/types/youtube';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!API_KEY || !CHANNEL_ID) {
  throw new Error('YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID must be set in .env.local');
}

export async function getChannelPlaylists(): Promise<YouTubePlaylist[]> {
  let allPlaylists: YouTubePlaylist[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    const params = new URLSearchParams({
      part: 'snippet,contentDetails',
      channelId: CHANNEL_ID as string,
      maxResults: '50',
      key: API_KEY as string,
    });

    if (nextPageToken) {
      params.append('pageToken', nextPageToken);
    }

    const response = await fetch(`${YOUTUBE_API_URL}/playlists?${params.toString()}`);
    if (!response.ok) {
      console.error('Failed to fetch playlists:', await response.json());
      throw new Error('Failed to fetch playlists from YouTube API');
    }

    const data: YouTubePlaylistsResponse = await response.json();
    allPlaylists = allPlaylists.concat(data.items);
    nextPageToken = data.nextPageToken;

  } while (nextPageToken);

  return allPlaylists;
}

export async function getPlaylistItems(playlistId: string): Promise<YouTubePlaylistItem[]> {
  let allItems: YouTubePlaylistItem[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    const params = new URLSearchParams({
      part: 'snippet',
      playlistId: playlistId,
      maxResults: '50',
      key: API_KEY as string,
    });

    if (nextPageToken) {
      params.append('pageToken', nextPageToken);
    }

    const response = await fetch(`${YOUTUBE_API_URL}/playlistItems?${params.toString()}`);

    if (!response.ok) {
      console.error(`Failed to fetch videos for playlist ${playlistId}:`, await response.json());
      throw new Error(`Failed to fetch videos for playlist ${playlistId}`);
    }

    const data: YouTubePlaylistItemsResponse = await response.json();
    allItems = allItems.concat(data.items);
    nextPageToken = data.nextPageToken;

  } while (nextPageToken);

  return allItems;
}

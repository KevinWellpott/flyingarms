export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubePlaylistItemSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface YouTubePlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubePlaylistItemSnippet;
}

export interface YouTubePlaylistItemsResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubePlaylistItem[];
}

export interface YouTubePlaylistSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default?: YouTubeThumbnail;
        medium?: YouTubeThumbnail;
        high?: YouTubeThumbnail;
        standard?: YouTubeThumbnail;
        maxres?: YouTubeThumbnail;
    };
    channelTitle: string;
    localized: {
        title: string;
        description: string;
    };
}

export interface YouTubePlaylist {
    kind: string;
    etag: string;
    id: string;
    snippet: YouTubePlaylistSnippet;
    contentDetails: {
        itemCount: number;
    };
}

export interface YouTubePlaylistsResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubePlaylist[];
}

export interface PlaylistData {
    id: string;
    title: string | null;
    description: string | null;
    thumbnail_url: string | null;
    video_count: number | null;
    last_updated: string | null;
}

export interface VideoData {
    id: number;
    playlist_id: string | null;
    video_id: string | null;
    title: string | null;
    description: string | null;
    thumbnail_url: string | null;
    published_at: string | null;
    position: number | null;
}

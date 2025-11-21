CREATE TABLE youtube_playlist_videos (
    id SERIAL PRIMARY KEY,
    playlist_id TEXT REFERENCES youtube_playlists(id) ON DELETE CASCADE,
    video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    published_at TIMESTAMPTZ,
    "position" INTEGER,
    UNIQUE(playlist_id, video_id)
);

CREATE TABLE youtube_playlists (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    video_count INTEGER,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

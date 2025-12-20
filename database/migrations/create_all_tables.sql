-- ============================================
-- Vollständiges SQL-Skript zur Erstellung aller Datenbanktabellen
-- ============================================

-- Erweiterung für UUID-Generierung aktivieren
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. REFERENCES Tabelle
-- ============================================
CREATE TABLE IF NOT EXISTS "references" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT UNIQUE NOT NULL,
  logo_path TEXT,
  highlight_video_path TEXT,
  youtube_video_id TEXT,
  color_glow TEXT DEFAULT '#76E4F7',
  
  -- Info-Block Felder
  content_points TEXT[],
  task_points TEXT[],
  client_info TEXT,
  equipment_points TEXT[],
  description_text TEXT,
  challenges TEXT[],
  
  -- Bilder
  gallery_images TEXT[],
  
  -- Sortierung und Sichtbarkeit
  order_index INTEGER,
  is_published BOOLEAN DEFAULT false
);

-- Indizes für References
CREATE INDEX IF NOT EXISTS idx_references_slug ON "references"(slug);
CREATE INDEX IF NOT EXISTS idx_references_published ON "references"(is_published);
CREATE INDEX IF NOT EXISTS idx_references_order ON "references"(order_index);

-- Kommentare für References
COMMENT ON TABLE "references" IS 'Speichert Referenzen/Projekte für die Website';
COMMENT ON COLUMN "references".logo_path IS 'Pfad zum Logo im Storage Bucket "logos"';
COMMENT ON COLUMN "references".highlight_video_path IS 'Pfad zum Highlight-Video im Storage Bucket "videos"';
COMMENT ON COLUMN "references".gallery_images IS 'Array von Pfaden zu Bildern im Storage Bucket "gallery-images"';
COMMENT ON COLUMN "references".color_glow IS 'Hex-Farbcode für den Glow-Effekt (Standard: #76E4F7)';
COMMENT ON COLUMN "references".challenges IS 'Herausforderungen bei diesem Projekt';

-- Row Level Security für References
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published references"
  ON "references"
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can view all references"
  ON "references"
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can insert references"
  ON "references"
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update references"
  ON "references"
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete references"
  ON "references"
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- 2. REVIEWS Tabelle
-- ============================================
CREATE TABLE IF NOT EXISTS "reviews" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  customer_name TEXT NOT NULL,
  company_name TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  project_type TEXT,
  video_url TEXT,
  image_url TEXT,
  project_description TEXT,
  is_featured BOOLEAN DEFAULT false,
  reference_id UUID,
  
  CONSTRAINT fk_reviews_reference 
    FOREIGN KEY (reference_id) 
    REFERENCES "references"(id) 
    ON DELETE SET NULL
);

-- Indizes für Reviews
CREATE INDEX IF NOT EXISTS idx_reviews_reference_id ON "reviews"(reference_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_featured ON "reviews"(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON "reviews"(created_at);

-- Kommentare für Reviews
COMMENT ON TABLE "reviews" IS 'Speichert Kundenbewertungen/Rezensionen';
COMMENT ON COLUMN "reviews".reference_id IS 'Optional: Zuordnung zu einer spezifischen Referenz. NULL bedeutet, dass das Review allgemein ist und auf der Landing Page angezeigt wird.';
COMMENT ON COLUMN "reviews".is_featured IS 'Featured Reviews werden auf der Landing Page angezeigt';

-- Row Level Security für Reviews
ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view reviews"
  ON "reviews"
  FOR SELECT
  USING (true);

CREATE POLICY "Public can insert reviews"
  ON "reviews"
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update reviews"
  ON "reviews"
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete reviews"
  ON "reviews"
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- 3. SITE_SETTINGS Tabelle
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Hero Section Settings
  hero_youtube_url TEXT
  
  -- Weitere Settings können hier hinzugefügt werden
  -- z.B. footer_text, contact_email, etc.
);

-- Trigger-Funktion für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für site_settings
CREATE TRIGGER update_site_settings_updated_at 
  BEFORE UPDATE ON site_settings
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Standard-Eintrag für Site Settings
INSERT INTO site_settings (hero_youtube_url)
SELECT NULL
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Kommentare für Site Settings
COMMENT ON TABLE site_settings IS 'Speichert globale Website-Einstellungen';
COMMENT ON COLUMN site_settings.hero_youtube_url IS 'YouTube URL für den Hero Section Player auf der Landing Page';

-- Row Level Security für Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Site settings are updatable by authenticated admins"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Site settings are insertable by authenticated admins"
  ON site_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- 4. YOUTUBE_PLAYLISTS Tabelle
-- ============================================
CREATE TABLE IF NOT EXISTS youtube_playlists (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  video_count INTEGER,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Kommentare für YouTube Playlists
COMMENT ON TABLE youtube_playlists IS 'Speichert YouTube Playlist-Informationen';
COMMENT ON COLUMN youtube_playlists.id IS 'YouTube Playlist ID';
COMMENT ON COLUMN youtube_playlists.last_updated IS 'Zeitpunkt der letzten Aktualisierung';

-- Row Level Security für YouTube Playlists
ALTER TABLE youtube_playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view youtube playlists"
  ON youtube_playlists FOR SELECT
  USING (true);

CREATE POLICY "Public can manage youtube playlists"
  ON youtube_playlists FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 5. YOUTUBE_PLAYLIST_VIDEOS Tabelle
-- ============================================
CREATE TABLE IF NOT EXISTS youtube_playlist_videos (
  id SERIAL PRIMARY KEY,
  playlist_id TEXT NOT NULL REFERENCES youtube_playlists(id) ON DELETE CASCADE,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  published_at TIMESTAMPTZ,
  "position" INTEGER,
  UNIQUE(playlist_id, video_id)
);

-- Indizes für YouTube Playlist Videos
CREATE INDEX IF NOT EXISTS idx_youtube_playlist_videos_playlist_id ON youtube_playlist_videos(playlist_id);
CREATE INDEX IF NOT EXISTS idx_youtube_playlist_videos_position ON youtube_playlist_videos(playlist_id, "position");

-- Kommentare für YouTube Playlist Videos
COMMENT ON TABLE youtube_playlist_videos IS 'Speichert Videos innerhalb von YouTube Playlists';
COMMENT ON COLUMN youtube_playlist_videos.video_id IS 'YouTube Video ID';
COMMENT ON COLUMN youtube_playlist_videos."position" IS 'Position des Videos in der Playlist';

-- Row Level Security für YouTube Playlist Videos
ALTER TABLE youtube_playlist_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view youtube playlist videos"
  ON youtube_playlist_videos FOR SELECT
  USING (true);

CREATE POLICY "Public can manage youtube playlist videos"
  ON youtube_playlist_videos FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- ============================================
-- 6. PAGE_SECTIONS Tabelle
-- ============================================
CREATE TABLE IF NOT EXISTS page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  description_left TEXT,
  description_right TEXT,
  hero_video_url TEXT,
  hero_thumbnail TEXT,
  
  -- JSON Felder für komplexe Datenstrukturen
  services JSONB,
  pricing_section_title TEXT,
  pricing_section_subtitle TEXT,
  pricing_section_description TEXT,
  pricing_tiers JSONB,
  gallery_section_title TEXT,
  gallery_section_subtitle TEXT,
  gallery_section_description TEXT,
  gallery_images JSONB,
  featured_video JSONB,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Status
  is_active BOOLEAN DEFAULT true
);

-- Trigger für updated_at bei page_sections
CREATE TRIGGER update_page_sections_updated_at 
  BEFORE UPDATE ON page_sections
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Indizes für Page Sections
CREATE INDEX IF NOT EXISTS idx_page_sections_slug ON page_sections(slug);
CREATE INDEX IF NOT EXISTS idx_page_sections_is_active ON page_sections(is_active);
CREATE INDEX IF NOT EXISTS idx_page_sections_created_at ON page_sections(created_at);

-- Kommentare für Page Sections
COMMENT ON TABLE page_sections IS 'Speichert dynamische Seitenabschnitte für die Website';
COMMENT ON COLUMN page_sections.slug IS 'Eindeutiger Slug für die URL';
COMMENT ON COLUMN page_sections.services IS 'JSON Array von ServiceItem Objekten';
COMMENT ON COLUMN page_sections.pricing_tiers IS 'JSON Array von PricingTier Objekten';
COMMENT ON COLUMN page_sections.gallery_images IS 'JSON Array von GalleryImage Objekten';
COMMENT ON COLUMN page_sections.featured_video IS 'JSON Object mit FeaturedVideo Daten';

-- Row Level Security für Page Sections
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active page sections"
  ON page_sections
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all page sections"
  ON page_sections
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can insert page sections"
  ON page_sections
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update page sections"
  ON page_sections
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete page sections"
  ON page_sections
  FOR DELETE
  TO public
  USING (true);

-- ============================================
-- Fertig!
-- ============================================
-- Alle Tabellen wurden erfolgreich erstellt.
-- Die Tabellen enthalten:
-- 1. references - Referenzen/Projekte
-- 2. reviews - Kundenbewertungen
-- 3. site_settings - Globale Website-Einstellungen
-- 4. youtube_playlists - YouTube Playlist-Informationen
-- 5. youtube_playlist_videos - Videos in Playlists
-- 6. page_sections - Dynamische Seitenabschnitte
-- ============================================



-- Erstelle die References-Tabelle
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
  
  -- Bilder
  gallery_images TEXT[],
  
  -- Sortierung und Sichtbarkeit
  order_index INTEGER,
  is_published BOOLEAN DEFAULT false
);

-- Erstelle Index für Slug (für schnelle Suche)
CREATE INDEX IF NOT EXISTS idx_references_slug ON "references"(slug);

-- Erstelle Index für is_published (für Filterung)
CREATE INDEX IF NOT EXISTS idx_references_published ON "references"(is_published);

-- Erstelle Index für order_index (für Sortierung)
CREATE INDEX IF NOT EXISTS idx_references_order ON "references"(order_index);

-- Kommentare für Dokumentation
COMMENT ON TABLE "references" IS 'Speichert Referenzen/Projekte für die Website';
COMMENT ON COLUMN "references".logo_path IS 'Pfad zum Logo im Storage Bucket "logos"';
COMMENT ON COLUMN "references".highlight_video_path IS 'Pfad zum Highlight-Video im Storage Bucket "videos"';
COMMENT ON COLUMN "references".gallery_images IS 'Array von Pfaden zu Bildern im Storage Bucket "gallery-images"';
COMMENT ON COLUMN "references".color_glow IS 'Hex-Farbcode für den Glow-Effekt (Standard: #76E4F7)';

-- Row Level Security (RLS) Policies
-- Aktiviere RLS
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;

-- Policy: Alle können veröffentlichte Referenzen lesen
CREATE POLICY "Public can view published references"
  ON "references"
  FOR SELECT
  USING (is_published = true);

-- Policy: Authentifizierte Benutzer können alle Referenzen lesen (für Admin)
CREATE POLICY "Authenticated users can view all references"
  ON "references"
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Alle Benutzer können Referenzen erstellen (für Admin-Panel ohne Auth)
-- WICHTIG: In Produktion sollten Sie Authentifizierung implementieren!
CREATE POLICY "Public can insert references"
  ON "references"
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy: Alle Benutzer können Referenzen aktualisieren (für Admin-Panel ohne Auth)
-- WICHTIG: In Produktion sollten Sie Authentifizierung implementieren!
CREATE POLICY "Public can update references"
  ON "references"
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Policy: Alle Benutzer können Referenzen löschen (für Admin-Panel ohne Auth)
-- WICHTIG: In Produktion sollten Sie Authentifizierung implementieren!
CREATE POLICY "Public can delete references"
  ON "references"
  FOR DELETE
  TO public
  USING (true);


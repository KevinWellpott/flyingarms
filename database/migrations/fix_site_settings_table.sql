-- Fix für Site Settings Tabelle: Entferne fehlerhafte Constraint und erstelle Tabelle neu

-- Lösche die Tabelle falls sie bereits existiert (mit fehlerhafter Constraint)
DROP TABLE IF EXISTS site_settings CASCADE;

-- Erstelle die Site Settings-Tabelle neu (ohne fehlerhafte Constraint)
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Hero Section Settings
  hero_youtube_url TEXT
  
  -- Weitere Settings können hier hinzugefügt werden
  -- z.B. footer_text, contact_email, etc.
);

-- Erstelle einen Trigger für updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Erstelle einen Standard-Eintrag (nur wenn noch keiner existiert)
INSERT INTO site_settings (hero_youtube_url)
SELECT NULL
WHERE NOT EXISTS (SELECT 1 FROM site_settings);

-- Kommentare für Dokumentation
COMMENT ON TABLE site_settings IS 'Speichert globale Website-Einstellungen';
COMMENT ON COLUMN site_settings.hero_youtube_url IS 'YouTube URL für den Hero Section Player auf der Landing Page';

-- Row Level Security (RLS) Policies
-- Aktiviere RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Alle können lesen (öffentlich)
CREATE POLICY "Site settings are viewable by everyone"
  ON site_settings FOR SELECT
  USING (true);

-- Policy: Nur authentifizierte Admins können updaten
CREATE POLICY "Site settings are updatable by authenticated admins"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy: Nur authentifizierte Admins können einfügen
CREATE POLICY "Site settings are insertable by authenticated admins"
  ON site_settings FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');


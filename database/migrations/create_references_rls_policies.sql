-- Row Level Security (RLS) Policies für die References-Tabelle
-- Führen Sie dieses Script aus, wenn RLS bereits aktiviert ist und Sie nur die Policies hinzufügen möchten

-- Aktiviere RLS (falls noch nicht aktiviert)
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;

-- Lösche existierende Policies (falls vorhanden)
DROP POLICY IF EXISTS "Public can view published references" ON "references";
DROP POLICY IF EXISTS "Authenticated users can view all references" ON "references";
DROP POLICY IF EXISTS "Authenticated users can insert references" ON "references";
DROP POLICY IF EXISTS "Authenticated users can update references" ON "references";
DROP POLICY IF EXISTS "Authenticated users can delete references" ON "references";
DROP POLICY IF EXISTS "Public can insert references" ON "references";
DROP POLICY IF EXISTS "Public can update references" ON "references";
DROP POLICY IF EXISTS "Public can delete references" ON "references";

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

-- Alternative: Wenn Sie Authentifizierung verwenden möchten, verwenden Sie diese Policies:
-- CREATE POLICY "Authenticated users can insert references"
--   ON "references"
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (true);
--
-- CREATE POLICY "Authenticated users can update references"
--   ON "references"
--   FOR UPDATE
--   TO authenticated
--   USING (true)
--   WITH CHECK (true);
--
-- CREATE POLICY "Authenticated users can delete references"
--   ON "references"
--   FOR DELETE
--   TO authenticated
--   USING (true);


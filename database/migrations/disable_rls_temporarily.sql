-- TEMPORÄR: RLS deaktivieren für Tests
-- WICHTIG: Nur für Entwicklung verwenden! In Produktion sollte RLS aktiviert bleiben.

-- RLS deaktivieren
ALTER TABLE "references" DISABLE ROW LEVEL SECURITY;

-- Hinweis: Um RLS wieder zu aktivieren, führen Sie aus:
-- ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;
-- Dann führen Sie create_references_rls_policies.sql aus


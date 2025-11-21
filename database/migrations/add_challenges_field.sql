-- Migration: Füge "challenges" Feld zur References-Tabelle hinzu
-- Herausforderungen / Challenges für die Referenzen

ALTER TABLE "references" 
ADD COLUMN IF NOT EXISTS challenges TEXT[];

COMMENT ON COLUMN "references".challenges IS 'Herausforderungen bei diesem Projekt';


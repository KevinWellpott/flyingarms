-- Migration: Füge reference_id zur reviews Tabelle hinzu
-- Ermöglicht die Zuordnung von Reviews zu spezifischen Referenzen

-- Füge reference_id Spalte hinzu (optional, da Reviews auch ohne Referenz existieren können)
ALTER TABLE "reviews" 
ADD COLUMN IF NOT EXISTS reference_id UUID;

-- Erstelle Foreign Key Constraint
ALTER TABLE "reviews"
ADD CONSTRAINT fk_reviews_reference 
FOREIGN KEY (reference_id) 
REFERENCES "references"(id) 
ON DELETE SET NULL;

-- Erstelle Index für bessere Performance
CREATE INDEX IF NOT EXISTS idx_reviews_reference_id ON "reviews"(reference_id);

-- Kommentar hinzufügen
COMMENT ON COLUMN "reviews".reference_id IS 'Optional: Zuordnung zu einer spezifischen Referenz. NULL bedeutet, dass das Review allgemein ist und auf der Landing Page angezeigt wird.';


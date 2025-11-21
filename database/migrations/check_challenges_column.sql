-- Prüfe ob die Spalte challenges existiert und zeige ihren Wert
SELECT 
  id,
  title,
  slug,
  challenges,
  pg_typeof(challenges) as challenges_type,
  array_length(challenges, 1) as challenges_length
FROM "references"
WHERE slug = 'j'; -- Ersetze 'j' mit dem tatsächlichen Slug

-- Alternative: Zeige alle Spalten der Tabelle
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'references'
  AND table_schema = 'public'
ORDER BY ordinal_position;


-- Migration: Korrigiere doppelte "gallery-images/" Pfade in der Datenbank
-- Dieses Skript entfernt das "gallery-images/" Präfix aus den gallery_images Pfaden

-- Prüfe zuerst, welche Einträge betroffen sind
SELECT 
  id,
  title,
  gallery_images
FROM "references"
WHERE gallery_images IS NOT NULL
  AND array_length(gallery_images, 1) > 0;

-- Aktualisiere die Pfade: Entferne "gallery-images/" am Anfang jedes Pfads
UPDATE "references"
SET gallery_images = (
  SELECT array_agg(
    CASE 
      WHEN path LIKE 'gallery-images/%' THEN substring(path FROM length('gallery-images/') + 1)
      WHEN path LIKE 'gallery-images/gallery-images/%' THEN substring(path FROM length('gallery-images/gallery-images/') + 1)
      ELSE path
    END
  )
  FROM unnest(gallery_images) AS path
)
WHERE gallery_images IS NOT NULL
  AND array_length(gallery_images, 1) > 0
  AND EXISTS (
    SELECT 1 
    FROM unnest(gallery_images) AS path 
    WHERE path LIKE 'gallery-images/%'
  );

-- Zeige die aktualisierten Einträge
SELECT 
  id,
  title,
  gallery_images
FROM "references"
WHERE gallery_images IS NOT NULL
  AND array_length(gallery_images, 1) > 0;


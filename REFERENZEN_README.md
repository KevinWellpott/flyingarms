# Referenzen-System Dokumentation

## Übersicht

Das Referenzen-System ermöglicht die Verwaltung und Anzeige von Projekt-Referenzen für Flying Arms. Es besteht aus einer öffentlichen Ansicht für Besucher und einem Admin-Panel zur Verwaltung.

## Features

### Öffentliche Ansicht

- **Übersichtsseite** (`/referenzen`): Grid-Layout mit allen veröffentlichten Referenzen
- **Detailseite** (`/referenzen/[slug]`): Vollständige Referenz-Details mit:
  - Hero-Section mit Logo und YouTube-Video
  - Info-Block mit Stichpunkten (Inhalt, Aufgaben, Kunde, Equipment)
  - Bildergalerie-Slider
  - Verwandte Referenzen

### Admin-Panel

- **Übersicht** (`/admin/referenzen`): Liste aller Referenzen mit CRUD-Operationen
- **Neue Referenz** (`/admin/referenzen/new`): Formular zum Erstellen
- **Bearbeiten** (`/admin/referenzen/edit/[id]`): Formular zum Bearbeiten

## Datenbank-Schema

Die Tabelle `references` enthält folgende Felder:

```sql
- id: UUID (Primary Key)
- created_at: Timestamp
- title: Text (Pflichtfeld)
- subtitle: Text (optional)
- slug: Text (unique, Pflichtfeld)
- logo_path: Text (Pfad im Storage)
- highlight_video_path: Text (Pfad im Storage)
- youtube_video_id: Text (optional)
- color_glow: Text (Standard: #76E4F7)
- content_points: Text[] (Array)
- task_points: Text[] (Array)
- client_info: Text
- equipment_points: Text[] (Array)
- description_text: Text
- gallery_images: Text[] (Array von Pfaden)
- order_index: Integer (für Sortierung)
- is_published: Boolean (Standard: false)
```

## Supabase Storage Buckets

Das System verwendet drei Storage-Buckets:

1. **logos**: Kunden-Logos (PNG, SVG, JPG, max. 5MB)
2. **gallery-images**: Bilder für den Slider (PNG, JPG, WebP, max. 10MB)
3. **videos**: Highlight-Videos (MP4, WebM, max. 50MB)

### Bucket-Konfiguration

Stellen Sie sicher, dass die Buckets in Supabase erstellt und öffentlich zugänglich sind:

```sql
-- Buckets erstellen (über Supabase Dashboard)
-- logos: public access
-- gallery-images: public access
-- videos: public access
```

## Komponenten

### Öffentliche Komponenten

- `ReferenceCard`: Einzelne Referenz-Karte mit Logo, Video-Hintergrund und Glow-Effekt
- `ReferencesGrid`: Responsive Grid-Layout für Referenzen
- `HeroSection`: Hero-Bereich der Detailseite
- `InfoBlock`: Info-Block mit Stichpunkten und Beschreibung
- `ImageSlider`: Bildergalerie mit Vollbild-Modus
- `RelatedReferences`: Verwandte Referenzen-Slider

### Admin-Komponenten

- `AdminReferenceForm`: Vollständiges Formular für CRUD-Operationen
- `FileUpload`: Drag & Drop Upload-Komponente mit Validierung
- `ColorPicker`: Farbauswahl für Glow-Effekt mit Vorschau

## Verwendung

### Neue Referenz erstellen

1. Navigieren Sie zu `/admin/referenzen`
2. Klicken Sie auf "Neue Referenz"
3. Füllen Sie das Formular aus:
   - Titel (automatisch generiert Slug)
   - Logo hochladen
   - Highlight-Video hochladen (optional)
   - YouTube Video ID eingeben (optional)
   - Farbglow auswählen
   - Stichpunkte hinzufügen
   - Bilder für Galerie hochladen
4. Klicken Sie auf "Erstellen"

### Referenz bearbeiten

1. Navigieren Sie zu `/admin/referenzen`
2. Klicken Sie auf das Bearbeiten-Icon
3. Ändern Sie die gewünschten Felder
4. Klicken Sie auf "Aktualisieren"

### Referenz löschen

1. Navigieren Sie zu `/admin/referenzen`
2. Klicken Sie auf das Löschen-Icon
3. Bestätigen Sie die Löschung

## Design-Features

### Glassmorphismus

Alle Komponenten verwenden das `glass` CSS-Klasse für den Glassmorphismus-Effekt:

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Dynamischer Glow-Effekt

Der Glow-Effekt wird dynamisch basierend auf der `color_glow`-Eigenschaft generiert:

- **Weich**: 20px Blur, 40% Opacity
- **Mittel**: 30px Blur, 60% Opacity
- **Stark**: 40px Blur, 80% Opacity

## API-Funktionen

### `lib/references.ts`

- `getAllReferences()`: Holt alle veröffentlichten Referenzen
- `getReferenceBySlug(slug)`: Holt eine Referenz anhand des Slugs
- `getRelatedReferences(id, limit)`: Holt verwandte Referenzen
- `createReference(data)`: Erstellt eine neue Referenz
- `updateReference(id, data)`: Aktualisiert eine Referenz
- `deleteReference(id)`: Löscht eine Referenz
- `generateSlug(title)`: Generiert einen Slug aus einem Titel

### `lib/storage.ts`

- `uploadFile(options)`: Lädt eine Datei hoch
- `deleteFile(options)`: Löscht eine Datei
- `compressImage(file)`: Komprimiert ein Bild vor dem Upload
- `validateFile(file, bucket)`: Validiert eine Datei

## Umgebungsvariablen

Stellen Sie sicher, dass folgende Variablen in `.env.local` gesetzt sind:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Performance-Optimierungen

- **Lazy Loading**: Bilder und Videos werden lazy geladen
- **Bild-Komprimierung**: Bilder werden vor dem Upload komprimiert (WebP)
- **Next.js Image**: Optimierte Bildanzeige mit Next.js Image-Komponente
- **SSR/ISR**: Server-Side Rendering für bessere SEO

## Accessibility

- ARIA-Labels für alle interaktiven Elemente
- Keyboard-Navigation für Slider
- Alt-Texte für Bilder
- Semantisches HTML

## Responsive Design

- Mobile-First Ansatz
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-optimierte Bedienelemente

## Fehlerbehandlung

- Validierung von Dateitypen und -größen
- Fehleranzeigen im Admin-Panel
- Graceful Fallbacks bei fehlenden Daten

## Nächste Schritte

1. Erstellen Sie die Supabase-Tabelle mit dem SQL-Script
2. Erstellen Sie die Storage-Buckets in Supabase
3. Konfigurieren Sie die Umgebungsvariablen
4. Testen Sie das System mit Testdaten


# Flying Arms - Projektstruktur Dokumentation

## 📋 Inhaltsverzeichnis

1. [Übersicht](#übersicht)
2. [Technologie-Stack](#technologie-stack)
3. [Projektstruktur](#projektstruktur)
4. [Verzeichnis-Details](#verzeichnis-details)
5. [Routing & Seiten](#routing--seiten)
6. [Komponenten-Architektur](#komponenten-architektur)
7. [API & Backend](#api--backend)
8. [Datenbank-Integration](#datenbank-integration)
9. [TypeScript-Typen](#typescript-typen)
10. [Konfiguration](#konfiguration)
11. [Umgebungsvariablen](#umgebungsvariablen)

---

## Übersicht

**Flying Arms** ist eine professionelle Drohnenservice-Website, erstellt mit Next.js 14 (App Router), TypeScript und Chakra UI. Die Anwendung bietet:

- **Dynamische Service-Seiten** (aus Supabase)
- **Statische Seiten** (Kontakt, Rezensionen, Rechtliches)
- **CMS-Integration** über Supabase
- **Responsive Design** mit modernem Glassmorphism-UI
- **Email-Versand** über SMTP/Nodemailer

---

## Technologie-Stack

### Core
- **Next.js 14.0.4** - React Framework mit App Router
- **React 18** - UI Library
- **TypeScript 5** - Type Safety

### UI & Styling
- **Chakra UI 2.10.9** - Component Library
- **@chakra-ui/next-js 2.2.0** - Next.js Integration
- **@emotion/react & @emotion/styled** - CSS-in-JS
- **Framer Motion 10.18.0** - Animationen
- **React Icons 4.12.0** - Icon Library

### Backend & Datenbank
- **Supabase 2.81.1** - Backend-as-a-Service (PostgreSQL)
- **Nodemailer 7.0.10** - Email-Versand
- **Resend 6.4.2** - Alternative Email-Service

### Development
- **ESLint** - Code Linting
- **TypeScript** - Type Checking

---

## Projektstruktur

```
flying-arms/
├── public/                    # Statische Assets
│   └── robots.txt
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── [slug]/            # Dynamische Service-Seiten
│   │   │   └── page.tsx
│   │   ├── api/               # API Routes
│   │   │   └── contact/
│   │   │       └── route.ts
│   │   ├── kontakt/           # Kontakt-Seite
│   │   │   └── page.tsx
│   │   ├── rezensionen/       # Rezensionen-Seite
│   │   │   └── page.tsx
│   │   ├── rechtliches/       # Rechtliche Seiten
│   │   │   ├── datenschutz/
│   │   │   │   └── page.tsx
│   │   │   └── impressum/
│   │   │       └── page.tsx
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # Wiederverwendbare Komponenten
│   │   └── mainpage-components/
│   │       ├── _Irrelevant/   # Nicht mehr verwendete Komponenten
│   │       ├── HeroSection/
│   │       ├── PricingSection/
│   │       ├── ServiceSection/
│   │       └── TestimonialSection/
│   ├── sections/              # Page Sections
│   │   ├── aufnahmen-sections/    # Dynamische Service-Sections
│   │   ├── contact-section/
│   │   ├── global-sections/       # Header, Footer, Theme
│   │   ├── mainpage-sections/     # Homepage-Sections
│   │   └── reviews-section/
│   ├── lib/                   # Utilities & Services
│   │   ├── supabase.ts        # Supabase Client & Page Functions
│   │   └── supabase-reviews.ts # Review Functions
│   └── types/                 # TypeScript Type Definitions
│       ├── hero.ts
│       └── page.ts
├── next.config.js             # Next.js Konfiguration
├── package.json               # Dependencies & Scripts
├── tsconfig.json              # TypeScript Konfiguration
└── README.md                  # Projekt-Dokumentation
```

---

## Verzeichnis-Details

### `/src/app/` - Next.js App Router

#### `layout.tsx`
- **Root Layout** für alle Seiten
- Enthält Chakra UI Provider
- Definiert globale Metadata
- Setzt Hintergrund-Styling (Grid Pattern)

#### `page.tsx` (Homepage)
- Zusammensetzung der Homepage-Sections:
  - Header
  - Hero
  - TestimonialSection
  - ServiceSection
  - PricingSection
  - ProcessSection
  - Footer

#### `[slug]/page.tsx` - Dynamische Service-Seiten
- **Dynamisches Routing** für Service-Seiten
- Lädt Daten aus Supabase (`page_sections` Tabelle)
- Rendert dynamische Sections:
  - `DynamicHeroSection`
  - `DynamicServicesSection`
  - `DynamicPricingSection`
  - `DynamicGallery`
  - `DynamicVideoGallery`
  - `ProcessSection`
- **Force Dynamic** - Kein Caching für aktuelle Daten

#### `/api/contact/route.ts`
- **POST Endpoint** für Kontaktformular
- Verwendet Nodemailer für SMTP-Versand
- Validiert Pflichtfelder
- Sendet HTML-Email an `info@flyingarms.de`

#### `/kontakt/page.tsx`
- Statische Kontakt-Seite
- Verwendet `ContactSection` Component

#### `/rezensionen/page.tsx`
- Rezensionen-Seite
- Lädt Reviews aus Supabase
- Server-Side Rendering

#### `/rechtliches/`
- **Datenschutz** (`datenschutz/page.tsx`)
- **Impressum** (`impressum/page.tsx`)

---

### `/src/components/` - Wiederverwendbare Komponenten

#### `mainpage-components/`
- **HeroSection/** - Hero-Button CTA
- **PricingSection/** - Pricing Cards & Trust Indicators
- **ServiceSection/** - Service Cards & Slider
- **TestimonialSection/** - Testimonial Cards & Slider
- **`_Irrelevant/`** - Nicht mehr verwendete Komponenten (Process-bezogen)

---

### `/src/sections/` - Page Sections

#### `global-sections/`
- **`Header.tsx`** - Navigation Header (Fixed, Glassmorphism)
  - Responsive Mobile Menu
  - Logo & Navigation Links
  - CTA Button
- **`Footer.tsx`** - Footer Component
- **`ChakraProviders.tsx`** - Chakra UI Theme Provider
  - Custom Theme mit Brand Colors
  - Button Variants (Gradient)

#### `mainpage-sections/`
- **`Hero.tsx`** - Homepage Hero Section
- **`ServiceSection.tsx`** - Service Übersicht
- **`PricingSection.tsx`** - Pricing Übersicht
- **`TestimonialSection.tsx`** - Kundenstimmen
- **`ProcessSection.tsx`** - Prozess-Übersicht

#### `aufnahmen-sections/` - Dynamische Service-Sections
- **`DynamicHeroSection.tsx`** - Dynamischer Hero (mit Video Support)
- **`DynamicServices.tsx`** - Dynamische Service-Liste
- **`DynamicPricingSection.tsx`** - Dynamische Pricing-Tiers
- **`DynamicGallery.tsx`** - Bildergalerie
- **`DynamicVideoGallery.tsx`** - Video-Galerie

#### `contact-section/`
- **`ContactSection.tsx`** - Kontaktformular

#### `reviews-section/`
- **`ReviewsSection.tsx`** - Reviews-Anzeige

---

### `/src/lib/` - Utilities & Services

#### `supabase.ts`
- **Supabase Client** Initialisierung
- **`getPageBySlug(slug: string)`** - Lädt Page-Daten aus `page_sections`
- **`getAllPageSlugs()`** - Lädt alle aktiven Slugs
- **`getVideoEmbedUrl()`** - Konvertiert Video-URLs zu Embed-URLs
  - Unterstützt: Vimeo, YouTube, Direct URLs

#### `supabase-reviews.ts`
- **Review Interface** Definition
- **`getAllReviews()`** - Lädt alle Reviews aus `reviews` Tabelle

---

### `/src/types/` - TypeScript Definitions

#### `page.ts`
- **`PageSection`** - Haupt-Interface für Service-Seiten
  - Enthält: Hero, Services, Pricing, Gallery, Videos
- **`PricingTier`** - Pricing-Tier Struktur
- **`GalleryImage`** - Galerie-Bild Struktur
- **`FeaturedVideo`** - Featured Video Struktur
- **`ServiceItem`** - Service-Item Struktur

#### `hero.ts`
- **`HeroSection`** - Hero-Section Interface
  - Enthält: Video-URL, Video-Type, Thumbnail

---

## Routing & Seiten

### Statische Routen

| Route | Datei | Beschreibung |
|-------|-------|--------------|
| `/` | `app/page.tsx` | Homepage |
| `/kontakt` | `app/kontakt/page.tsx` | Kontakt-Seite |
| `/rezensionen` | `app/rezensionen/page.tsx` | Rezensionen-Seite |
| `/rechtliches/datenschutz` | `app/rechtliches/datenschutz/page.tsx` | Datenschutz |
| `/rechtliches/impressum` | `app/rechtliches/impressum/page.tsx` | Impressum |

### Dynamische Routen

| Route | Datei | Beschreibung |
|-------|-------|--------------|
| `/[slug]` | `app/[slug]/page.tsx` | Dynamische Service-Seiten |

**Beispiel-Slugs:**
- `/aufnahmen`
- `/vermessungen`
- `/schulungen`

---

## Komponenten-Architektur

### Hierarchie

```
Page (app/page.tsx)
├── Header (global)
├── Hero Section
├── Testimonial Section
│   └── TestimonialSlider
│       └── TestimonialCard
├── Service Section
│   └── ServiceCardSlider
│       └── ServiceCard
├── Pricing Section
│   └── PricingCard
│   └── TrustIndicator
├── Process Section
└── Footer (global)
```

### Dynamische Service-Seiten

```
Page ([slug]/page.tsx)
├── Header (global)
├── DynamicHeroSection
├── DynamicServicesSection
├── DynamicPricingSection
├── DynamicGallery
├── DynamicVideoGallery
├── ProcessSection
└── Footer (global)
```

---

## API & Backend

### API Routes

#### `POST /api/contact`
**Beschreibung:** Kontaktformular-Submission

**Request Body:**
```typescript
{
  name: string;      // Pflichtfeld
  email: string;     // Pflichtfeld
  phone?: string;    // Optional
  service: string;   // Pflichtfeld
  message: string;   // Pflichtfeld
}
```

**Response:**
```typescript
// Success
{ success: true }

// Error
{ error: string }
```

**Umgebungsvariablen:**
- `SMTP_HOST` - SMTP Server (z.B. `mail.flyingarms.de`)
- `SMTP_USER` - SMTP Benutzername
- `SMTP_PASSWORD` - SMTP Passwort

---

## Datenbank-Integration

### Supabase Tabellen

#### `page_sections`
**Beschreibung:** Speichert dynamische Service-Seiten

**Wichtige Felder:**
- `id` (uuid)
- `slug` (text) - URL-Slug
- `title` (text) - Seitentitel
- `subtitle` (text) - Untertitel
- `description` (text) - Beschreibung
- `hero_video_url` (text) - Hero Video URL
- `hero_thumbnail` (text) - Hero Thumbnail
- `services` (jsonb) - Service-Items Array
- `pricing_tiers` (jsonb) - Pricing-Tiers Array
- `gallery_images` (jsonb) - Galerie-Bilder Array
- `featured_video` (jsonb) - Featured Video Object
- `is_active` (boolean) - Aktivierungsstatus
- `meta_title` (text) - SEO Title
- `meta_description` (text) - SEO Description

#### `reviews`
**Beschreibung:** Kundenbewertungen

**Wichtige Felder:**
- `id` (uuid)
- `customer_name` (text)
- `company_name` (text, optional)
- `rating` (number) - 1-5 Sterne
- `review_text` (text)
- `project_type` (text, optional)
- `video_url` (text, optional)
- `image_url` (text, optional)
- `project_description` (text, optional)
- `is_featured` (boolean)
- `created_at` (timestamp)

---

## TypeScript-Typen

### Wichtige Interfaces

#### `PageSection`
```typescript
interface PageSection {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  description_left?: string;
  description_right?: string;
  hero_video_url?: string;
  hero_thumbnail?: string;
  services: ServiceItem[];
  pricing_section_title?: string;
  pricing_section_subtitle?: string;
  pricing_section_description?: string;
  pricing_tiers: PricingTier[];
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
  gallery_section_title?: string;
  gallery_section_subtitle?: string;
  gallery_section_description?: string;
  gallery_images: GalleryImage[];
  featured_video?: FeaturedVideo;
}
```

#### `PricingTier`
```typescript
interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  badge?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  order: number;
}
```

#### `GalleryImage`
```typescript
interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
  order: number;
}
```

#### `Review`
```typescript
interface Review {
  id: string;
  customer_name: string;
  company_name?: string;
  rating: number;
  review_text: string;
  project_type?: string;
  video_url?: string;
  image_url?: string;
  project_description?: string;
  is_featured: boolean;
  created_at: string;
}
```

---

## Konfiguration

### `next.config.js`
```javascript
{
  experimental: {
    appDir: true  // App Router aktiviert
  }
}
```

### `tsconfig.json`
- **Base URL:** `.`
- **Path Alias:** `@/*` → `./src/*`
- **Target:** ES5
- **Module:** ESNext
- **JSX:** Preserve

### `package.json` Scripts
- `npm run dev` - Development Server (Port 3000)
- `npm run build` - Production Build
- `npm run start` - Production Server
- `npm run lint` - ESLint Check

---

## Umgebungsvariablen

### Erforderliche `.env.local` Variablen

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# SMTP (für Kontaktformular)
SMTP_HOST=mail.flyingarms.de
SMTP_USER=info@flyingarms.de
SMTP_PASSWORD=your-smtp-password
```

### Umgebungsvariablen-Erklärung

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Projekt-URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | `eyJhbGc...` |
| `SMTP_HOST` | SMTP Server Hostname | `mail.flyingarms.de` |
| `SMTP_USER` | SMTP Benutzername | `info@flyingarms.de` |
| `SMTP_PASSWORD` | SMTP Passwort | `your-password` |

---

## Design-System

### Farben (Chakra UI Theme)

**Brand Colors:**
- `brand.400` - Primary Blue (`#60a5fa`)
- `brand.500` - Main Blue (`#3b82f6`)
- `cyan.300` - Accent Cyan (`#67e8f9`)
- `cyan.400` - Bright Cyan (`#22d3ee`)

**Background:**
- `gray.900` - Dark Background (`#171923`)
- `gray.800` - Card Background (`#1a202c`)

### Button Variants

**Gradient Button:**
```tsx
<Button variant="gradient">
  Primary Action
</Button>
```

### Responsive Breakpoints

- `base` - Mobile (< 768px)
- `md` - Tablet (≥ 768px)
- `lg` - Desktop (≥ 1024px)
- `xl` - Large Desktop (≥ 1280px)

---

## Entwicklungshinweise

### Neue Service-Seite erstellen

1. **In Supabase:** Neue Zeile in `page_sections` Tabelle einfügen
2. **Slug setzen:** z.B. `neue-service`
3. **Daten ausfüllen:** Alle erforderlichen Felder
4. **Aktivieren:** `is_active = true`
5. **Zugriff:** `/neue-service` Route ist automatisch verfügbar

### Neue Komponente erstellen

```typescript
// src/components/MeineComponent.tsx
'use client' // Falls Client-Side Features benötigt

import { Box, Text } from '@chakra-ui/react'

export default function MeineComponent() {
  return (
    <Box p={6} bg="gray.800" borderRadius="xl">
      <Text color="white">Mein Content</Text>
    </Box>
  )
}
```

### Neue Section erstellen

```typescript
// src/sections/mainpage-sections/MeineSection.tsx
'use client'

import { Container, Box } from '@chakra-ui/react'

export default function MeineSection() {
  return (
    <Container maxW="container.xl" py={20}>
      <Box>Meine Section</Box>
    </Container>
  )
}
```

---

## Wichtige Hinweise

### Caching
- Dynamische Service-Seiten (`[slug]`) sind auf **`force-dynamic`** gesetzt
- Kein Caching für aktuelle Daten aus Supabase
- `revalidate: 0` für immer frische Daten

### Video-Support
- **Vimeo:** Automatische Embed-URL Konvertierung
- **YouTube:** Automatische Embed-URL Konvertierung
- **Direct URLs:** Direkte Verwendung

### Performance
- Server-Side Rendering (SSR) für bessere SEO
- Dynamische Imports möglich für Code-Splitting
- Chakra UI mit Next.js Cache Provider optimiert

---

## Git Branch

**Aktueller Branch:** `Dynamic-Client+Database`

---

**Letzte Aktualisierung:** 2024  
**Projekt:** Flying Arms - Professionelle Drohnenservices  
**Made by VIERLESS** 🚀


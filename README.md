# Flying Arms - Professionelle Drohnenservices

Ein vollständig funktionsfähiges Next.js + Chakra UI Projekt für Flying Arms.

## 🚀 Installation & Start

### 1. Dependencies installieren:
```bash
npm install
```

### 2. Development Server starten:
```bash
npm run dev
```

### 3. Browser öffnen:
```
http://localhost:3000
```

## 📁 Projekt Struktur

```
flying-arms/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root Layout
│   │   └── page.tsx            # Homepage
│   └── components/
│       └── global-components/
│           ├── ChakraProviders.tsx  # Chakra UI Theme
│           └── Header.tsx           # Navigation Header
├── package.json
├── next.config.js
└── tsconfig.json
```

## 🎨 Features

✅ **Next.js 14** mit App Router  
✅ **TypeScript** für Type Safety  
✅ **Chakra UI** für UI Components  
✅ **Responsive Design** (Desktop + Mobile)  
✅ **Glassmorphism Design** mit Flying Arms Branding  
✅ **React Icons** für Icons  
✅ **Custom Theme** mit Brand Colors  

## 🎯 Entwicklung

### Neue Components erstellen:
```tsx
// src/components/MeineComponent.tsx
import { Box, Text } from '@chakra-ui/react'

export default function MeineComponent() {
  return (
    <Box p={6} bg="gray.800" borderRadius="xl">
      <Text color="white">Mein Content</Text>
    </Box>
  )
}
```

### Theme Farben verwenden:
```tsx
// Brand Colors verfügbar:
color="brand.400"  // Primary Blue
bg="gray.900"      // Dark Background
```

### Button Variants:
```tsx
<Button variant="gradient">Primary Button</Button>
```

## 📱 Responsive Breakpoints

```tsx
// Responsive Design Pattern:
{{ base: 'mobile', md: 'tablet', lg: 'desktop' }}

// Beispiel:
fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
```

## 🔧 Scripts

- `npm run dev` - Development Server
- `npm run build` - Production Build
- `npm run start` - Production Server
- `npm run lint` - ESLint prüfen

## 🚁 Flying Arms Services

- **📸 Produktaufnahmen** - Full HD/4K Aufnahmen & Luftbilder
- **📐 Vermessungen** - Photogrammetrische Vermessung
- **🎓 Schulungen** - Drohnenführerschein & Kenntnisnachweis

---

**Made by VIERLESS** 🚀  
Bei Fragen: team@vierless.de

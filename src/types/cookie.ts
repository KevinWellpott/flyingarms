// types/cookies.ts
export interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }
  
  export interface CookieConsentData {
    hasConsented: boolean;
    consentDate: Date | null;
    preferences: CookiePreferences;
    version: string; // für DSGVO Updates
  }
  
  export const COOKIE_CONSENT_KEY = 'flying-arms-cookie-consent';
  export const COOKIE_VERSION = '1.0';
  
  export const DEFAULT_PREFERENCES: CookiePreferences = {
    necessary: true,    // Immer true, kann nicht deaktiviert werden
    analytics: false,
    marketing: false,
    functional: false,
  };
  
  // Cookie Kategorien mit Beschreibungen
  export const COOKIE_CATEGORIES = {
    necessary: {
      title: 'Notwendige Cookies',
      description: 'Diese Cookies sind für das Funktionieren der Website unerlässlich und können nicht deaktiviert werden.',
      required: true,
      examples: ['Sitzungs-ID', 'CSRF-Token', 'Cookie-Einstellungen']
    },
    analytics: {
      title: 'Analyse Cookies',
      description: 'Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
      required: false,
      examples: ['Google Analytics', 'Heatmap-Tools', 'Performance-Metriken']
    },
    marketing: {
      title: 'Marketing Cookies',
      description: 'Diese Cookies werden verwendet, um Ihnen relevante Werbung anzuzeigen.',
      required: false,
      examples: ['Facebook Pixel', 'Google Ads', 'Retargeting']
    },
    functional: {
      title: 'Funktionale Cookies',
      description: 'Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung.',
      required: false,
      examples: ['Spracheinstellungen', 'Video-Player', 'Chat-Widget']
    }
  } as const;
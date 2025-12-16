// contexts/CookieContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CookieConsentData, 
  CookiePreferences, 
  DEFAULT_PREFERENCES, 
  COOKIE_CONSENT_KEY, 
  COOKIE_VERSION 
} from '../types/cookie';

interface CookieContextType {
  consentData: CookieConsentData;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  acceptSelected: (preferences: CookiePreferences) => void;
  denyAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  resetConsent: () => void;
  hasAnalytics: () => boolean;
  hasMarketing: () => boolean;
  hasFunctional: () => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export const CookieProvider: React.FC<CookieProviderProps> = ({ children }) => {
  const [consentData, setConsentData] = useState<CookieConsentData>({
    hasConsented: false,
    consentDate: null,
    preferences: DEFAULT_PREFERENCES,
    version: COOKIE_VERSION,
  });

  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Load consent data on mount
  useEffect(() => {
    const loadConsentData = () => {
      try {
        const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (saved) {
          const parsedData: CookieConsentData = JSON.parse(saved);
          
          // Check if version is outdated (force new consent)
          if (parsedData.version !== COOKIE_VERSION) {
            setShowBanner(true);
            return;
          }
          
          // Convert date string back to Date object
          if (parsedData.consentDate) {
            parsedData.consentDate = new Date(parsedData.consentDate);
          }
          
          setConsentData(parsedData);
          
          // Check if consent is older than 12 months (DSGVO requirement)
          if (parsedData.consentDate) {
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            
            if (parsedData.consentDate < oneYearAgo) {
              setShowBanner(true);
              return;
            }
          }
          
          // Only show banner if no consent given
          if (!parsedData.hasConsented) {
            setShowBanner(true);
          }
        } else {
          // No saved data, show banner
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error loading cookie consent data:', error);
        setShowBanner(true);
      }
    };

    // Small delay to avoid SSR issues
    const timer = setTimeout(loadConsentData, 100);
    return () => clearTimeout(timer);
  }, []);

  // Save consent data to localStorage
  const saveConsentData = (data: CookieConsentData) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving cookie consent data:', error);
    }
  };

  // Google Analytics & other tracking scripts management
  const loadAnalyticsScripts = () => {
    if (typeof window === 'undefined') return;
    
    // Google Analytics Beispiel
    if (!window.gtag && consentData.preferences.analytics) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=Secure'
        });
      };
    }
  };

  const loadMarketingScripts = () => {
    if (typeof window === 'undefined') return;
    
    // Facebook Pixel Beispiel
    if (consentData.preferences.marketing) {
      // Facebook Pixel Code hier
      console.log('Marketing scripts loaded');
    }
  };

  // Accept all cookies
  const acceptAll = () => {
    const newConsentData: CookieConsentData = {
      hasConsented: true,
      consentDate: new Date(),
      preferences: {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true,
      },
      version: COOKIE_VERSION,
    };
    
    setConsentData(newConsentData);
    saveConsentData(newConsentData);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Load tracking scripts
    loadAnalyticsScripts();
    loadMarketingScripts();
  };

  // Accept selected preferences
  const acceptSelected = (preferences: CookiePreferences) => {
    const newConsentData: CookieConsentData = {
      hasConsented: true,
      consentDate: new Date(),
      preferences: {
        ...preferences,
        necessary: true, // Always true
      },
      version: COOKIE_VERSION,
    };
    
    setConsentData(newConsentData);
    saveConsentData(newConsentData);
    setShowBanner(false);
    setShowPreferences(false);
    
    // Load tracking scripts based on preferences
    if (preferences.analytics) {
      loadAnalyticsScripts();
    }
    if (preferences.marketing) {
      loadMarketingScripts();
    }
  };

  // Deny all (except necessary)
  const denyAll = () => {
    const newConsentData: CookieConsentData = {
      hasConsented: true,
      consentDate: new Date(),
      preferences: DEFAULT_PREFERENCES,
      version: COOKIE_VERSION,
    };
    
    setConsentData(newConsentData);
    saveConsentData(newConsentData);
    setShowBanner(false);
    setShowPreferences(false);
  };

  // Open preferences modal
  const openPreferences = () => {
    setShowPreferences(true);
  };

  // Close preferences modal
  const closePreferences = () => {
    setShowPreferences(false);
  };

  // Reset consent (for testing/admin)
  const resetConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    setConsentData({
      hasConsented: false,
      consentDate: null,
      preferences: DEFAULT_PREFERENCES,
      version: COOKIE_VERSION,
    });
    setShowBanner(true);
    setShowPreferences(false);
  };

  // Helper functions
  const hasAnalytics = () => consentData.hasConsented && consentData.preferences.analytics;
  const hasMarketing = () => consentData.hasConsented && consentData.preferences.marketing;
  const hasFunctional = () => consentData.hasConsented && consentData.preferences.functional;

  return (
    <CookieContext.Provider value={{
      consentData,
      showBanner,
      showPreferences,
      acceptAll,
      acceptSelected,
      denyAll,
      openPreferences,
      closePreferences,
      resetConsent,
      hasAnalytics,
      hasMarketing,
      hasFunctional,
    }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookies = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookies must be used within a CookieProvider');
  }
  return context;
};
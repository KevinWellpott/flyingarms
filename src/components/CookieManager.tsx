// components/CookieManager.tsx
'use client';

import React from 'react';
import CookieBanner from './CookieBanner';
import CookiePreferencesModal from './CookiePreferences';
import { useGoogleAnalytics, useFacebookPixel } from '../hooks/useCookieTracking';

const CookieManager: React.FC = () => {
  // Initialize tracking hooks
  useGoogleAnalytics();
  useFacebookPixel();

  return (
    <>
      <CookieBanner />
      <CookiePreferencesModal />
    </>
  );
};

export default CookieManager;
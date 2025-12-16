// hooks/useCookieTracking.ts
'use client';

import { useEffect } from 'react';
import { useCookies } from '../contexts/CookieContext';

// Hook für Google Analytics Tracking
export const useGoogleAnalytics = () => {
  const { hasAnalytics } = useCookies();

  useEffect(() => {
    if (!hasAnalytics() || typeof window === 'undefined') return;

    // Google Analytics 4 Setup
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID';
    
    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    
    if (!document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
      document.head.appendChild(script);
      
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
          window.dataLayer.push(args);
        }
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
        });
        
        console.log('Google Analytics initialized with consent');
      };
    }
  }, [hasAnalytics]);
};

// Hook für Facebook Pixel Tracking
export const useFacebookPixel = () => {
  const { hasMarketing } = useCookies();

  useEffect(() => {
    if (!hasMarketing() || typeof window === 'undefined') return;

    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (!FB_PIXEL_ID) return;

    // Facebook Pixel Code
    !(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');

    console.log('Facebook Pixel initialized with consent');
  }, [hasMarketing]);
};

// Hook für Custom Events mit Cookie-Consent
export const useTrackingEvents = () => {
  const { hasAnalytics, hasMarketing } = useCookies();

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    // Google Analytics Event
    if (hasAnalytics() && window.gtag) {
      window.gtag('event', eventName, {
        ...properties,
        custom_parameter: 'flying_arms'
      });
    }

    // Facebook Pixel Event
    if (hasMarketing() && window.fbq) {
      window.fbq('track', 'CustomEvent', {
        event_name: eventName,
        ...properties
      });
    }

    console.log('Event tracked:', eventName, properties);
  };

  const trackPageView = (pagePath: string) => {
    if (hasAnalytics() && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: pagePath
      });
    }
  };

  return { trackEvent, trackPageView };
};
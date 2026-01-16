'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/**
 * Centralized tracking component
 * Handles UTM parameters, affiliate tracking, and other analytics scripts
 */
export function Tracking() {
  // UTM Parameter Tracking
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    try {
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);

      // Find all UTM parameters
      const utmParams: Record<string, string> = {};
      let hasUtmParams = false;

      urlParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          utmParams[key] = value;
          hasUtmParams = true;
        }
      });

      // If we found UTM parameters, set cookies
      if (hasUtmParams) {
        // Calculate expiration date (7 days from now)
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        const expires = expirationDate.toUTCString();

        // Set cookie for each UTM parameter
        Object.entries(utmParams).forEach(([key, value]) => {
          document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
        });

        // Set timestamp cookie
        const timestamp = new Date().toISOString();
        document.cookie = `utm_dt=${encodeURIComponent(timestamp)}; expires=${expires}; path=/; SameSite=Lax`;

        console.log('UTM parameters tracked:', utmParams);
      }
    } catch (err) {
      console.error('UTM tracking error:', err);
    }
  }, []); // Run once on mount

  return (
    <>
      {/* Post Affiliate Pro Tracking */}
      <Script
        id="pap_x2s6df8d"
        src="https://opus.postaffiliatepro.com/scripts/56fkwj0okv"
        strategy="afterInteractive"
        onLoad={() => {
          // Execute tracking code after the script has loaded
          if (typeof window !== 'undefined' && (window as any).PostAffTracker) {
            try {
              (window as any).PostAffTracker.setAccountId("default1");
              (window as any).PostAffTracker.track();
            } catch (err) {
              console.error('PostAffTracker error:', err);
            }
          }
        }}
      />

      {/* Add additional tracking scripts below */}
      {/* Example:
      <Script
        id="your-tracking-id"
        src="https://your-tracking-url.com/script.js"
        strategy="afterInteractive"
      />
      */}
    </>
  );
}

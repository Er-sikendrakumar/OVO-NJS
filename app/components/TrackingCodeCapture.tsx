'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { setTrackingCode } from '@/app/lib/cookies';

/**
 * TrackingCodeCapture Component
 *
 * Captures acode and pcode query parameters from the URL and stores them in cookies
 * with a 7-day expiration time.
 *
 * Usage: Include this component in the root layout to track affiliate/partner codes
 * across the entire site.
 *
 * Query parameters:
 * - ?acode=ABC123 -> Sets "acode" cookie with value "ABC123" for 7 days
 * - ?pcode=XYZ789 -> Sets "pcode" cookie with value "XYZ789" for 7 days
 *
 * Examples:
 * - https://example.com/?acode=partner123
 * - https://example.com/services?pcode=promo456
 * - https://example.com/?acode=affiliate1&pcode=partner2
 */
export function TrackingCodeCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for acode parameter
    const acode = searchParams.get('acode');
    if (acode) {
      setTrackingCode('acode', acode);
      console.log(`[Tracking] acode captured: ${acode}`);
    }

    // Check for pcode parameter
    const pcode = searchParams.get('pcode');
    if (pcode) {
      setTrackingCode('pcode', pcode);
      console.log(`[Tracking] pcode captured: ${pcode}`);
    }
  }, [searchParams]);

  // This component doesn't render anything
  return null;
}

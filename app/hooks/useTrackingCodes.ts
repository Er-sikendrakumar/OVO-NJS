'use client';

import { useState, useEffect } from 'react';
import { getTrackingCode } from '@/app/lib/cookies';

export interface TrackingCodes {
  acode: string | null;
  pcode: string | null;
}

/**
 * Hook to retrieve current tracking codes from cookies
 *
 * Returns the current acode and pcode values stored in cookies.
 * Use this hook in forms, analytics, or anywhere you need to access
 * the affiliate/partner codes.
 *
 * @example
 * ```tsx
 * function ContactForm() {
 *   const { acode, pcode } = useTrackingCodes();
 *
 *   const handleSubmit = async (data) => {
 *     await submitForm({
 *       ...data,
 *       acode,
 *       pcode,
 *     });
 *   };
 *
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 * ```
 */
export function useTrackingCodes(): TrackingCodes {
  const [codes, setCodes] = useState<TrackingCodes>({
    acode: null,
    pcode: null,
  });

  useEffect(() => {
    // Read cookies on mount
    setCodes({
      acode: getTrackingCode('acode'),
      pcode: getTrackingCode('pcode'),
    });
  }, []);

  return codes;
}

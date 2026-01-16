/**
 * Cookie utility functions for managing affiliate/partner codes
 */

export interface CookieOptions {
  expires?: Date | number; // Date object or days
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie with the given name, value, and options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') {
    return; // Skip on server-side
  }

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // Handle expiration
  if (options.expires) {
    let expiresDate: Date;

    if (typeof options.expires === 'number') {
      // If number, treat as days
      expiresDate = new Date();
      expiresDate.setTime(expiresDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
    } else {
      expiresDate = options.expires;
    }

    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  // Add path (default to root)
  cookieString += `; path=${options.path || '/'}`;

  // Add domain if specified
  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  // Add secure flag if specified
  if (options.secure) {
    cookieString += '; secure';
  }

  // Add SameSite attribute
  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null; // Skip on server-side
  }

  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
  setCookie(name, '', {
    ...options,
    expires: new Date(0),
  });
}

/**
 * Set affiliate/partner code cookie with 7-day expiration
 * - acode: 7 days
 * - pcode: 7 days
 */
export function setTrackingCode(type: 'acode' | 'pcode', value: string): void {
  const days = 7;
  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + days * 24 * 60 * 60 * 1000);

  setCookie(type, value, {
    expires: expiresDate,
    path: '/',
    sameSite: 'lax',
  });
}

/**
 * Get tracking code from cookie
 */
export function getTrackingCode(type: 'acode' | 'pcode'): string | null {
  return getCookie(type);
}

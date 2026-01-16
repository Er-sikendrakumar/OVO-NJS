import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import cityRedirects from './newsite/json/city-redirects.json';

/**
 * Proxy for city-to-location redirects
 *
 * NOTE: This uses a static import of city-redirects.json, which means
 * updates to the redirect mappings require a rebuild. This is acceptable
 * for redirect rules (infrastructure-level routing) as opposed to content
 * data which should always use runtime file reading.
 *
 * To add new redirects:
 * 1. Update newsite/json/city-redirects.json
 * 2. Rebuild and redeploy the application
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const zipMatch = pathname.match(/^\/business-address\/(\d{5})\/?$/);
  if (zipMatch) {
    const [, zip] = zipMatch;
    const url = request.nextUrl.clone();
    url.pathname = `/business-address/zip/${zip}`;
    return NextResponse.rewrite(url);
  }

  // Check if this is a virtual office city page
  // Pattern: /virtual-office/{state}/{city}/
  const cityPageMatch = pathname.match(/^\/virtual-office\/([^/]+)\/([^/]+)\/?$/);

  if (cityPageMatch) {
    const [, state, city] = cityPageMatch;
    const cityPath = `${state}/${city}`;

    // Check if this city has a redirect mapping
    const locationId = cityRedirects[cityPath as keyof typeof cityRedirects];

    if (locationId) {
      // Redirect to the specific location page
      const locationUrl = new URL(
        `/virtual-office/${state}/${city}/${locationId}`,
        request.url
      );

      // Use 301 (permanent redirect) for SEO
      return NextResponse.redirect(locationUrl, 301);
    }
  }

  // No redirect needed, continue to the page
  return NextResponse.next();
}

// Proxy runs on all routes but only redirects virtual office city pages
// This avoids complex matcher patterns that can cause parsing errors

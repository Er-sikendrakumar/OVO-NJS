/**
 * Location Search API Service
 * Connects to WordPress REST API for location searches
 */

// WordPress API Response Types
export interface WordPressLocationResponse {
  success: boolean;
  result: {
    locations: Array<{
      // Common fields
      id?: string;
      city?: string;
      state?: string;
      state_english?: string;
      abbr?: string;

      // City/Zipcode specific fields
      cityID?: string;
      name?: string;
      address?: string;
      opuslocphone?: string;
      premium?: string;
      countryid?: string;
      opusowned?: string;
      showpopular?: string;
      point_x?: string;
      point_y?: string;
      image?: string;
      link?: string;
      display?: string;
    }>;
    opusownedzip: boolean;
  };
}

// Transformed Location Types for Component
export interface LocationResult {
  id: string;
  city: string;
  state?: string;
  type: 'city' | 'state';
  premium?: boolean;
  href?: string;
  addressLine1?: string;
  addressLine2?: string;
}

export interface StateResult {
  state: string;
  type: 'state';
}

export type SearchResult = LocationResult | StateResult;

export interface PaidSearchResponse {
  success: boolean;
  message?: string;
  data: string[];
}

export interface PaidSearchResult {
  label: string;
  href: string;
  city: string;
  state_abbr: string;
}

/**
 * Detect if search term is a zipcode (5 digits)
 */
/**
 * Extract first 5-digit zipcode from a string.
 */
export function extractZipcode(term: string): string | null {
  const match = term.trim().match(/(\d{5,6})(?:-\d{4})?\b/);
  return match ? match[1] : null;
}

/**
 * Search for locations via WordPress API
 * @param keyword - Search term (city, state, or zipcode)
 * @param distance - Distance in miles (default: 20)
 * @param mode - Search mode (e.g., 'business-address' or undefined for virtual office)
 */
export async function searchLocations(
  keyword: string,
  distance: number = 20,
  mode?: string
): Promise<SearchResult[]> {
  if (!keyword || keyword.trim().length < 2) {
    return [];
  }

  try {
    // Use production hostname for localhost development, otherwise use current site
    const isLocalhost = typeof window !== 'undefined'
      ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      : false;

    const baseUrl = isLocalhost
      ? 'https://njs.opusvirtualoffices.com'
      : (typeof window !== 'undefined' ? window.location.origin : '');

    const url = new URL('/wp-json/opus/v1/locations/search/', baseUrl);

    // WordPress API expects POST with form data, not GET with query params
    const formData = new URLSearchParams();
    formData.append('keyword', keyword.trim());
    formData.append('distance', distance.toString());

    // Only add mode if provided
    if (mode) {
      formData.append('mode', mode);
    }

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: WordPressLocationResponse = await response.json();

    if (!data.success || !data.result?.locations) {
      return [];
    }

    // Transform API response to component format
    return transformLocations(data.result.locations);
  } catch (error) {
    console.error('Location search error:', error);
    throw error;
  }
}

/**
 * Search for locations via paid search endpoint
 * @param keyword - Search term (city, state, or zipcode)
 */
export async function searchPaidLocations(
  keyword: string
): Promise<PaidSearchResult[]> {
  if (!keyword || keyword.trim().length < 2) {
    return [];
  }

  try {
    const baseUrl = 'https://www.opusvirtualoffices.com/';
    const url = new URL('/wp-json/opus/v1/locations/paidsearch/', baseUrl);
    const stripHtml = (value: string) =>
      value
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<\/?[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&#8217;|&rsquo;/gi, "'")
        .replace(/&amp;/gi, '&')
        .replace(/\s+/g, ' ')
        .trim();

    const formData = new URLSearchParams();
    formData.append('keyword', keyword.trim());

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    const data: PaidSearchResponse = await response.json();

    if (!data.success || !Array.isArray(data.data)) {
      return [];
    }

    return data.data
      .map((entry) => {
        const hrefMatch = entry.match(/href=["']([^"']+)["']/i);
        const href = hrefMatch ? hrefMatch[1] : '';
        const labelMatch = entry.match(/>([^<]+)\s*<span>([^<]+)<\/span>/i);
        let city = '';
        let state_abbr = '';
        if (labelMatch) {
          city = labelMatch[1].trim();
          state_abbr = labelMatch[2].trim();
        } else {
          const text = stripHtml(entry);
          if (!text) {
            return null;
          }
          const parts = text.split(' ').filter(Boolean);
          const last = parts[parts.length - 1] ?? '';
          if (last.length === 2 && last === last.toUpperCase()) {
            state_abbr = last;
            city = parts.slice(0, -1).join(' ');
          } else {
            city = text;
          }
        }
        return {
          label: `${city}${state_abbr ? ` ${state_abbr}` : ''}`,
          href,
          city,
          state_abbr,
        };
      })
      .filter((result): result is PaidSearchResult => Boolean(result));
  } catch (error) {
    console.error('Paid search error:', error);
    throw error;
  }
}

/**
 * Transform WordPress API locations to component format
 */
function transformLocations(
  locations: WordPressLocationResponse['result']['locations']
): SearchResult[] {
  return locations.map((loc) => {
    // State-only result (for state searches)
    if (loc.state && !loc.city && !loc.name) {
      return {
        state: loc.state,
        type: 'state' as const,
      };
    }

    // City/Zipcode result
    return {
      id: loc.id || loc.cityID || '',
      city: loc.city || '',
      state: loc.abbr || loc.state || '',
      type: 'city' as const,
      premium: loc.premium === '1',
      href: loc.link || '',
      addressLine1: loc.name || loc.address || '',
      addressLine2: '', // Not provided in API response
    };
  });
}

/**
 * Type guard to check if result is a state result
 */
export function isStateResult(result: SearchResult): result is StateResult {
  return result.type === 'state' && 'state' in result && !('city' in result);
}

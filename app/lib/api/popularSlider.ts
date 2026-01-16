/**
 * API service for fetching popular Opus-owned locations including top premium slider data.
 */

import { readFile } from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';

export interface PopularSliderLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  link: string;
  top_premium: string;
  alttext: string | null;
  city_featured_image_url: string;
  location_image_url: string;
}

export interface PopularSliderResponse {
  success: boolean;
  count: number;
  data: PopularSliderLocation[];
}

export interface PopularSliderPayload {
  success: boolean;
  count: number;
  top_premium_count: number;
  data: {
    all_popular: PopularSliderLocation[];
    top_premium: PopularSliderLocation[];
  };
}

function normalizeUrl(url: string, origin: string) {
  if (!url) return '';
  const cleaned = url.replace(/\\\//g, '/');
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }
  if (cleaned.startsWith('//')) {
    return `https:${cleaned}`;
  }
  if (cleaned.startsWith('/')) {
    return `${origin}${cleaned}`;
  }
  return `${origin}/${cleaned}`;
}

function normalizeLocation(location: PopularSliderLocation, origin: string): PopularSliderLocation {
  return {
    ...location,
    city_featured_image_url: normalizeUrl(location.city_featured_image_url, origin),
    location_image_url: normalizeUrl(location.location_image_url, origin),
    link: normalizeUrl(location.link, origin),
  };
}

function normalizeResponse(
  response: PopularSliderResponse,
  origin: string
): PopularSliderPayload {
  const allLocations = response.data.map((location) => normalizeLocation(location, origin));
  const topPremium = allLocations.filter((location) => location.top_premium === '1');

  return {
    success: response.success,
    count: response.count,
    top_premium_count: topPremium.length,
    data: {
      all_popular: allLocations,
      top_premium: topPremium,
    },
  };
}

/**
 * Fetch enhanced slider payload (with_flagged=true ensures images + top premium data).
 */
export async function fetchPopularSlider(): Promise<PopularSliderPayload> {
  const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', 'toppremium.json');
  const fileContent = await readFile(jsonFilePath, 'utf-8');
  const data = JSON.parse(fileContent) as PopularSliderResponse;

  // Get current hostname dynamically from headers
  const headersList = await headers();
  const host = headersList.get('host') || 'www.opusvirtualoffices.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const imageOrigin = `${protocol}://${host}`;

  return normalizeResponse(data, imageOrigin);
}

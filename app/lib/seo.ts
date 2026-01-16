import type { Metadata } from 'next';
import { readFile } from 'fs/promises';
import { headers } from 'next/headers';
import path from 'path';

interface SeoData {
  success: boolean;
  page: string;
  page_type: string;
  view: string;
  seo: {
    title: string;
    meta_description: string;
    canonical?: string;
    og?: {
      title: string;
      description: string;
      url: string;
      type: string;
      image?: string;
    };
  };
  data?: {
    state?: string;
    city?: string;
    location_id?: string;
    mode?: string;
  };
}

/**
 * Fetches SEO metadata from WordPress JSON files
 * @param jsonPath - Path to the JSON file (e.g., 'homepage', 'virtual-office', 'states/florida/boca-raton/776/776_seo_vo')
 * @returns Next.js Metadata object
 */
export async function getSeoMetadata(jsonPath: string): Promise<Metadata> {
  try {
    // Read JSON file directly from filesystem (server-side only)
    // Path: /web/newsite/json/{jsonPath}.json
    // From Next.js running in /web/.next, we go up to /web then into newsite/json
    const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', `${jsonPath}.json`);

    let fileContent: string;
    try {
      fileContent = await readFile(jsonFilePath, 'utf-8');
    } catch (fileError) {
      console.warn(`Failed to read SEO file from ${jsonFilePath}, using defaults`);
      return getDefaultMetadata();
    }

    const data: SeoData = JSON.parse(fileContent);

    if (!data.success || !data.seo) {
      console.warn(`Invalid SEO data structure from ${jsonFilePath}, using defaults`);
      return getDefaultMetadata();
    }

    // Get actual request hostname
    const headersList = await headers();
    const host = headersList.get('host') || 'www.opusvirtualoffices.com';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    // Get current hostname for URLs that might be relative
    const getFullUrl = (url: string | undefined): string | undefined => {
      if (!url) return undefined;

      // If already a full URL, extract the path and use current hostname
      if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
          const urlObj = new URL(url);
          return `${baseUrl}${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
        } catch {
          return url;
        }
      }

      // Otherwise, prepend the current hostname
      return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
    };

    // Build Next.js Metadata object
    const metadata: Metadata = {
      title: data.seo.title,
      description: data.seo.meta_description,
    };

    // Add OpenGraph data if available
    if (data.seo.og) {
      const ogImage = data.seo.og.image ? getFullUrl(data.seo.og.image) : undefined;

      metadata.openGraph = {
        title: data.seo.og.title,
        description: data.seo.og.description,
        url: getFullUrl(data.seo.og.url),
        type: data.seo.og.type as 'website',
        images: ogImage ? [ogImage] : undefined,
      };
    }

    // Add canonical URL if available
    if (data.seo.canonical) {
      metadata.alternates = {
        canonical: getFullUrl(data.seo.canonical),
      };
    }

    return metadata;
  } catch (error) {
    console.error(`Error fetching SEO metadata for ${jsonPath}:`, error);
    return getDefaultMetadata();
  }
}

/**
 * Returns default metadata as fallback
 */
function getDefaultMetadata(): Metadata {
  return {
    title: 'Opus Virtual Offices - Professional Business Solutions',
    description: 'Discover premium virtual office solutions with Opus VO. Get a prestigious business address, professional live call answering, and more.',
    openGraph: {
      title: 'Opus Virtual Offices - Professional Business Solutions',
      description: 'Discover premium virtual office solutions with Opus VO. Get a prestigious business address, professional live call answering, and more.',
      type: 'website',
    },
  };
}

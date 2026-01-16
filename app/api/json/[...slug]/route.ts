import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

// Whitelist of allowed files (security)
const ALLOWED_FILES = [
  'all-states',
  'reviews4',
  'popular-slider',
  'toppremium',
  'homepage',
  'virtual-office',
  'business-address',
];

// Allowed path patterns for hierarchical JSON files
const ALLOWED_PATTERNS = [
  /^([a-z0-9\-]+)\/(citiesvirtual|citiesbusiness|citiespopular|locations_vo|locations_ba)$/,
];

/**
 * Transform URL path to file path
 * Example: florida/citiesvirtual -> states/florida/florida_citiesvirtual
 */
function transformPathToFilename(urlPath: string): string {
  const match = urlPath.match(/^([a-z0-9\-]+)\/(citiesvirtual|citiesbusiness|citiespopular|locations_vo|locations_ba)$/);
  if (match) {
    const state = match[1];
    const endpoint = match[2];
    return `states/${state}/${state}_${endpoint}`;
  }
  return urlPath;
}

/**
 * Validate filename against whitelist
 */
function validateFilename(filename: string): boolean {
  // Must not contain path traversal attempts
  if (filename.includes('..') || filename.includes('./')) {
    return false;
  }

  // Check if it's in the simple whitelist
  if (ALLOWED_FILES.includes(filename)) {
    return /^[a-z0-9\-]+$/i.test(filename);
  }

  // Check if it matches any allowed patterns
  return ALLOWED_PATTERNS.some(pattern => pattern.test(filename));
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const filename = slug.join('/');

    // Validate filename
    if (!validateFilename(filename)) {
      return NextResponse.json(
        { success: false, error: 'File not allowed or invalid filename format' },
        { status: 403 }
      );
    }

    // Transform path to actual filename
    const actualFilename = transformPathToFilename(filename);

    // Construct file path
    const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', `${actualFilename}.json`);

    // Read file
    let fileContent: string;
    try {
      fileContent = await readFile(jsonFilePath, 'utf-8');
    } catch {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    // Parse and return JSON
    const data = JSON.parse(fileContent);

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300', // 5 minutes cache
      },
    });
  } catch (error) {
    console.error('JSON API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

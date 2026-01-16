import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Cleans WordPress block editor HTML by removing block comments
 * while preserving valid HTML tags like <p>, <a>, <strong>, etc.
 *
 * @param html - Raw HTML string with WordPress block comments
 * @returns Cleaned HTML string with block comments removed and empty tags removed
 */
export function cleanWordPressHtml(html: string): string {
  if (!html) return '';

  let cleaned = html;

  // Remove WordPress block comments (<!-- wp:paragraph -->, <!-- /wp:paragraph -->, etc.)
  cleaned = cleaned.replace(/<!--\s*\/?wp:[^>]*-->/g, '');

  // Remove empty HTML tags (e.g., <p></p>, <p> </p>, <div></div>, etc.)
  // This regex matches opening tag, optional whitespace, and closing tag
  cleaned = cleaned.replace(/<([a-z][a-z0-9]*)\b[^>]*>\s*<\/\1>/gi, '');

  return cleaned.trim();
}

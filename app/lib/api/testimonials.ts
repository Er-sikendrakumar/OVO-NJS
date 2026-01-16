/**
 * Testimonials API Service
 * Reads testimonials from local JSON files
 */

import { readFile } from 'fs/promises';
import path from 'path';

// WordPress API Response Types
export interface WordPressReview {
  id: number;
  client_name: string;
  client_review: string;
  stars: number;
  review_by: string;
  show_on_general: string;
}

export interface WordPressReviewResponse {
  success: boolean;
  count: number;
  data: WordPressReview[];
}

// Transformed Testimonial Type for Component
export interface Testimonial {
  id: number;
  reviewerName: string;
  reviewText: string;
  rating: number;
}

/**
 * Fetch testimonials from local JSON file
 * @param limit - Number of testimonials to fetch (default: 4)
 */
export async function fetchTestimonials(limit: number = 4): Promise<Testimonial[]> {
  try {
    const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', 'reviews4.json');
    const fileContent = await readFile(jsonFilePath, 'utf-8');
    const responseData: WordPressReviewResponse = JSON.parse(fileContent);

    // Check if the data is valid
    if (!responseData.success || !responseData.data) {
      console.warn('JSON file returned unsuccessful response or no data');
      return [];
    }

    // Transform API response to component format
    return transformReviews(responseData.data);
  } catch (error) {
    console.error('[Testimonials API] Read error:', error);
    throw error;
  }
}

/**
 * Transform WordPress API reviews to component format
 */
function transformReviews(reviews: WordPressReview[]): Testimonial[] {
  return reviews.map((review) => ({
    id: review.id,
    reviewerName: review.client_name.trim() || 'Anonymous',
    reviewText: review.client_review.trim(),
    rating: review.stars,
  }));
}

/**
 * React Query hook for fetching testimonials
 */
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials, type Testimonial } from './testimonials';

export function useTestimonials(limit: number = 4) {
  return useQuery<Testimonial[], Error>({
    queryKey: ['testimonials', limit],
    queryFn: () => fetchTestimonials(limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

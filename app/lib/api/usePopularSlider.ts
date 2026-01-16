'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPopularSlider, type PopularSliderPayload } from './popularSlider';

/**
 * Hook to fetch popular slider data
 */
export function usePopularSlider() {
  return useQuery<PopularSliderPayload>({
    queryKey: ['/api/locations/popular-slider'],
    queryFn: fetchPopularSlider,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

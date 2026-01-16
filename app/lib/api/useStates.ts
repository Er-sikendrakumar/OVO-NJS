'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchStates, type StatesResponse } from './states';

/**
 * Hook to fetch states and provinces data
 */
export function useStates() {
  return useQuery<StatesResponse>({
    queryKey: ['/api/locations/states'],
    queryFn: fetchStates,
    staleTime: 60 * 60 * 1000, // 1 hour (states data rarely changes)
  });
}

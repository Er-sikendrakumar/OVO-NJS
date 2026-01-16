/**
 * TanStack Query hook for paid location search
 */
import { useQuery } from '@tanstack/react-query';
import { searchPaidLocations, type PaidSearchResult } from './locations';

interface UsePaidLocationSearchOptions {
  keyword: string;
  enabled?: boolean;
}

export function usePaidLocationSearch({
  keyword,
  enabled,
}: UsePaidLocationSearchOptions) {
  const shouldEnable = enabled ?? (keyword.trim().length >= 2);

  return useQuery<PaidSearchResult[], Error>({
    queryKey: ['locations', 'paidsearch', keyword.trim()],
    queryFn: () => searchPaidLocations(keyword),
    enabled: shouldEnable,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

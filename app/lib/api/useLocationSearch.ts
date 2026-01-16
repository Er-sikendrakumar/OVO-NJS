/**
 * TanStack Query hook for location search
 */
import { useQuery } from '@tanstack/react-query';
import { searchLocations, type SearchResult } from './locations';

interface UseLocationSearchOptions {
  keyword: string;
  distance?: number;
  mode?: string;
  enabled?: boolean;
}

/**
 * Hook to search for locations with TanStack Query
 * @param keyword - Search term (city, state, or zipcode)
 * @param distance - Distance in miles (default: 20)
 * @param mode - Search mode (e.g., 'business-address' or undefined for virtual office)
 * @param enabled - Whether the query should run (default: true if keyword.length >= 2)
 */
export function useLocationSearch({
  keyword,
  distance = 20,
  mode,
  enabled,
}: UseLocationSearchOptions) {
  // Only enable query if keyword is at least 2 characters
  const shouldEnable = enabled ?? (keyword.trim().length >= 2);

  return useQuery<SearchResult[], Error>({
    queryKey: ['locations', 'search', keyword.trim(), distance, mode],
    queryFn: () => searchLocations(keyword, distance, mode),
    enabled: shouldEnable,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Retry once on failure
  });
}

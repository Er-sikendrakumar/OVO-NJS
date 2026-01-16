'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Send, Flag } from "lucide-react";
import { useLocationSearch } from "@/app/lib/api/useLocationSearch";
import {
  extractZipcode,
  isStateResult,
} from "@/app/lib/api/locations";
import RadiusSelector from "@/app/components/RadiusSelector";

function useDebounce<T>(value: T, delay: number = 400): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export type LocationType = "city" | "state";

export interface LocationItem {
  id: string;
  city: string;
  state?: string;
  type: LocationType;
  premium?: boolean;
  href?: string;
  addressLine1?: string;
  addressLine2?: string;
}

interface LocationSearchBarProps {
  initialResults?: LocationItem[];
  onSelect?: (item: LocationItem) => void;
  onSearchChange?: (query: string) => void;
  placeholder?: string;
  label?: string;
  mode?: string;
  zipRedirectBase?: string;
}

function TypeBadge({ type }: { type: LocationType | 'location' }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[10px] font-semibold uppercase">
      {type}
    </span>
  );
}

export function ActionSearchBar({
  initialResults = [],
  onSelect,
  onSearchChange,
  placeholder = "Search for Zip, State, or City",
  label,
  mode,
  zipRedirectBase,
}: LocationSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [distance, setDistance] = useState<number>(20);
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<LocationItem[]>(initialResults);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showDistanceSelector, setShowDistanceSelector] = useState(false);
  const radiusOptions = [{ value: 20, label: "20 Miles Radius" }];

  // Call onSearchChange when query changes
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(query);
    }
  }, [query, onSearchChange]);

  const debouncedQuery = useDebounce(query, 250);
  const zipFromQuery = extractZipcode(query);
  const zipFromDebounced = extractZipcode(debouncedQuery);
  const searchKeyword = zipFromDebounced ?? debouncedQuery;

  // Use API hook for real searches
  // Keep query enabled if distance selector is visible (zipcode search active)
  const { data: apiResults, isLoading, error } = useLocationSearch({
    keyword: searchKeyword,
    distance,
    mode,
    enabled: (isFocused || showDistanceSelector) && searchKeyword.length >= 2,
  });

  // Handle API results
  useEffect(() => {
    if (!apiResults) return;

    // Convert API results to LocationItem format (including state results)
    const locationItems: LocationItem[] = apiResults.map((r) => {
      if (isStateResult(r)) {
        // Convert state result to LocationItem
        return {
          id: '',
          city: r.state,
          state: r.state,
          type: 'state' as const,
          premium: false,
          href: `/virtual-office/${r.state.toLowerCase().replace(/\s+/g, '-')}`,
        };
      }
      // City result
      return {
        id: r.id,
        city: r.city,
        state: r.state,
        type: r.type,
        premium: r.premium,
        href: r.href,
        addressLine1: r.addressLine1,
        addressLine2: r.addressLine2,
      };
    });

    setResults(locationItems);

    // Show distance selector for all zipcode searches (even if no results)
    if (zipFromDebounced) {
      setShowDistanceSelector(true);
    } else {
      setShowDistanceSelector(false);
    }

    setSelectedIndex(-1);
  }, [apiResults, zipFromDebounced]);

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: { height: { duration: 0.35 }, staggerChildren: 0.06 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { height: { duration: 0.25 }, opacity: { duration: 0.2 } },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  };

  const handleSelect = (loc: LocationItem) => {
    if (onSelect) onSelect(loc);
    if (zipRedirectBase && zipFromQuery) {
      router.push(`${zipRedirectBase}/${encodeURIComponent(zipFromQuery)}`);
      setIsFocused(false);
      return;
    }
    if (loc.href) window.location.assign(loc.href);
    setIsFocused(false);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!isFocused) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      } else if (zipRedirectBase && zipFromQuery) {
        e.preventDefault();
        router.push(`${zipRedirectBase}/${encodeURIComponent(zipFromQuery)}`);
        setIsFocused(false);
      }
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col justify-start items-center">
        <div className="w-full">
          {label && (
            <label
              className="text-xs font-medium text-gray-600 mb-1 block"
              htmlFor="location-search"
            >
              {label}
            </label>
          )}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none">
                <AnimatePresence mode="popLayout">
                  {query.length > 0 ? (
                    <motion.div
                      key="send"
                      initial={{ y: -16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 16, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Send className="w-5 h-5 text-gray-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ y: -16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 16, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <img
                        src="/figmaAssets/googlemaps.svg"
                        alt="Location"
                        className="w-5 h-5"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Input
                id="location-search"
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                className="pl-10 pr-3.5 py-3 h-[50px] text-base bg-white rounded-lg border border-[#cfd4dc] shadow-shadows-shadow-xs focus-visible:ring-offset-0 font-normal text-gray-500"
                autoComplete="off"
                data-testid="input-location-search"
              />
            </div>

            {/* Distance selector - only visible for zipcode searches */}
            <AnimatePresence>
              {showDistanceSelector && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <RadiusSelector
                    options={radiusOptions}
                    placeholder="Select Radius"
                    defaultValue={distance}
                    value={distance}
                    onChange={(value) => {
                      setDistance(value);
                      setIsFocused(true);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full relative">
          <AnimatePresence>
            {isFocused && (
              <motion.div
                className="w-full border rounded-md shadow-sm overflow-hidden bg-white border-neutral-200 mt-1 absolute top-0 left-0 z-50"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul>
                  {isLoading && (
                    <motion.li
                      variants={item}
                      className="px-3 py-3 text-xs text-gray-600"
                    >
                      Searching…
                    </motion.li>
                  )}

                  {!isLoading && results.length === 0 && !zipFromQuery && (
                    <motion.li
                      variants={item}
                      className="px-3 py-3 text-xs text-gray-600"
                    >
                      No results. Try a different city, state, or ZIP.
                    </motion.li>
                  )}

                  {error && (
                    <motion.li
                      variants={item}
                      className="px-3 py-3 text-xs text-red-600"
                    >
                      Error loading results. Please try again.
                    </motion.li>
                  )}

                  {/* Zipcode search header - shows link to location search page */}
                  {!isLoading && results.length > 0 && zipFromQuery && (
                    <motion.li
                      variants={item}
                      className="px-3 py-2 border-b border-neutral-100"
                    >
                      <Link
                        href={
                          zipRedirectBase
                            ? `${zipRedirectBase}/${zipFromQuery}`
                            : `/${mode ? `${mode}-search` : 'location-search'}/${zipFromQuery}/${distance}/`
                        }
                        prefetch={false}
                        className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        View office locations near {zipFromQuery}
                      </Link>
                    </motion.li>
                  )}

                  {/* City search header - shows when multiple locations in same city */}
                  {!isLoading && results.length > 1 && !zipFromQuery && results[0].type === 'city' && (() => {
                    const firstCity = results[0].city;
                    const firstState = results[0].state;
                    const allSameCity = results.every(r => r.type === 'city' && r.city === firstCity);

                    if (allSameCity) {
                      return (
                        <motion.li
                          variants={item}
                          className="px-3 py-2 border-b border-neutral-100"
                        >
                          <Link
                            href={`/${mode ? `${mode}-search` : 'location-search'}/${firstCity.toLowerCase().replace(/\s+/g, '-')}/${distance}/`}
                            prefetch={false}
                            className="flex items-center justify-between text-sm hover:bg-neutral-50 -mx-3 px-3 py-1"
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-neutral-500" />
                              <span className="font-semibold text-blue-700">{firstCity}</span>
                              <span className="text-xs text-gray-500 uppercase bg-gray-100 px-2 py-0.5 rounded">CITY</span>
                            </div>
                            <span className="text-sm text-gray-600">{firstState}</span>
                          </Link>
                        </motion.li>
                      );
                    }
                    return null;
                  })()}

                  {!isLoading &&
                    results.map((loc, idx) => {
                      // Create unique key for both city and state results
                      const uniqueKey = loc.type === 'state'
                        ? `state-${loc.state}`
                        : `city-${loc.id || `${loc.city}-${loc.state}-${idx}`}`;

                      const isZipcodeSearch = Boolean(zipFromQuery);

                      // Check if all results are in the same city (for city vs location badge)
                      const allSameCity = results.length > 1 &&
                        results.every(r => r.type === 'city' && r.city === results[0].city);

                      return (
                        <motion.li
                          key={uniqueKey}
                          variants={item}
                          layout
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSelect(loc)}
                          className={[
                            "px-3 py-2 flex items-center justify-between cursor-pointer",
                            "hover:bg-neutral-100",
                            idx === selectedIndex ? "bg-neutral-100" : "",
                          ].join(" ")}
                          data-testid={`location-item-${uniqueKey}`}
                        >
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-neutral-500">
                            {loc.type === 'state' ? (
                              <Flag className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                          </span>
                          <div className="flex flex-col gap-0.5 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-sm font-medium ${loc.type === 'city' ? 'text-blue-700' : 'text-gray-500'}`}>
                                {loc.type === 'city' ? (
                                  isZipcodeSearch && loc.addressLine1
                                    ? (() => {
                                        const parts = loc.addressLine1.split(',').map(p => p.trim());
                                        const streetAddress = parts[0];
                                        // City is always second-to-last part
                                        const cityName = parts.length >= 2 ? parts[parts.length - 2] : loc.city;
                                        return `${streetAddress}, ${cityName}`;
                                      })()
                                    : allSameCity && loc.addressLine1
                                      ? loc.addressLine1.split(',')[0].trim()
                                      : loc.city
                                ) : loc.city}
                              </span>
                              {!isZipcodeSearch && loc.type === 'city' && (
                                <TypeBadge type={allSameCity ? 'location' : 'city'} />
                              )}
                              {!isZipcodeSearch && loc.type === 'state' && (
                                <TypeBadge type='state' />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {loc.state && (
                            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                              {loc.state}
                            </span>
                          )}
                        </div>
                      </motion.li>
                      );
                    })}
                </motion.ul>

                <div className="px-3 py-2 border-t border-neutral-100 hidden sm:block">
                  <div className="flex items-center justify-between text-[11px] text-gray-600">
                    <span>Tip: Use ↑ ↓ to navigate</span>
                    <span>ESC to close</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
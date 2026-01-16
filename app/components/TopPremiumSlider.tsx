'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import type { PopularSliderLocation } from '@/app/lib/api/popularSlider';

interface TopPremiumSliderProps {
  locations?: PopularSliderLocation[];
}

function normalizePath(link: string) {
  if (!link) return '/virtual-office/';
  if (link.startsWith('http')) {
    try {
      const url = new URL(link);
      return url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    } catch {
      return link;
    }
  }
  return link.endsWith('/') ? link : `${link}/`;
}

const CARD_GAP = 20;

export function TopPremiumSlider({ locations = [] }: TopPremiumSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sliderLocations = locations;
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector<HTMLAnchorElement>('[data-location-card]');
    const cardWidth = card ? card.offsetWidth : 360;
    const offset = (cardWidth + CARD_GAP) * (direction === 'left' ? -1 : 1);
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  }, []);

  const handleImageError = useCallback((id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  const cards = sliderLocations.length ? sliderLocations : Array.from({ length: 3 }).map((_, idx) => ({
    id: `placeholder-${idx}`,
    city: 'Loading',
    state_abbr: '',
    name: '',
    link: '#',
    top_premium: '1',
    alttext: null,
    city_featured_image_url: '',
    location_image_url: '',
  }));

  return (
    <section className="py-0 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-col gap-[16px] lg:gap-[32px] mb-12 lg:mb-16">
          <h2 className="text-[#181D27] text-[30px] leading-[38px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
            Top Premium Locations
          </h2>
          <p className="text-[#535862] text-lg leading-[28px]">
            Browse our most popular prestigious virtual office locations throughout the USA.
          </p>
        </div>

        <div
          ref={scrollRef}
          className="slider-container flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar"
          style={{ scrollPadding: '10px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {cards.map((location) => {
            const href = sliderLocations.length ? normalizePath(location.link) : '#';
            const primaryImage = location.location_image_url;
            const showImage = !!primaryImage && !failedImages[location.id];
            const addressParts = location.name?.split(',').map((part) => part.trim()).filter(Boolean) ?? [];
            let streetLine = '';
            let suiteLine = '';
            let cityStateLine = '';

            if (addressParts.length) {
              streetLine = addressParts[0];

              if (addressParts[1] && /suite/i.test(addressParts[1])) {
                suiteLine = addressParts[1];
                cityStateLine = addressParts.slice(2).join(', ');
              } else {
                if (addressParts[1]) {
                  streetLine += `, ${addressParts[1]}`;
                }
                if (addressParts[2] && /suite/i.test(addressParts[2])) {
                  suiteLine = addressParts[2];
                  cityStateLine = addressParts.slice(3).join(', ');
                } else {
                  cityStateLine = addressParts.slice(2).join(', ');
                }
              }
            }

            return (
              <Link
                key={location.id}
                href={href}
                prefetch={false}
                className="location-card w-[287px] min-w-[287px] h-[480px] rounded-[12px] relative flex-shrink-0 snap-start group bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)] lg:w-[360px] lg:min-w-[360px]"
                data-location-card
              >
                <div className="w-full h-full rounded-[12px] overflow-hidden relative">
                  {showImage ? (
                    <img
                      src={primaryImage}
                      alt={location.alttext ?? `${location.city}, ${location.state_abbr}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={() => handleImageError(location.id)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      Image unavailable
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/45" />
                  <div className="absolute inset-0 flex items-end pb-4 px-4">
                    <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative rounded-[16px] w-full">
                      <div className="absolute inset-0 border border-[rgba(255,255,255,0.3)] rounded-[16px] pointer-events-none" />
                      <div className="flex flex-col gap-2 p-5 relative text-white">
                        <h3 className="text-2xl font-semibold leading-[32px]">
                          {location.city}{location.state_abbr ? `, ${location.state_abbr}` : ''}
                        </h3>
                        <div className="text-sm leading-relaxed flex flex-col gap-1 font-normal">
                          {streetLine && <span>{streetLine}</span>}
                          {suiteLine && <span>{suiteLine}</span>}
                          {cityStateLine && <span>{cityStateLine}</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-start gap-4 mt-4">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => handleScroll('left')}
            className="slider-arrow left w-12 h-12 flex items-center justify-center rounded-full border border-[#E9EAEB] bg-white shadow-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => handleScroll('right')}
            className="slider-arrow right w-12 h-12 flex items-center justify-center rounded-full border border-[#E9EAEB] bg-white shadow-sm"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

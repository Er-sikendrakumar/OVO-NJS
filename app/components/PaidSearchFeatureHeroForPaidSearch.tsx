"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { usePaidLocationSearch } from "@/app/lib/api/usePaidLocationSearch";

type FeatureItem = {
  id: string;
  text: string;
};

type PaidSearchHero = {
  search_placeholder?: string;
  search_help_text?: string;
  title?: string;
  subtitle?: string;
  features?: string[];
  badges?: {
    google_rating?: string;
    all_inclusive?: string;
  };
};

type LocationItem = {
  id?: string;
  name?: string;
  city?: string;
  state?: string;
  state_abbr?: string;
  link?: string;
};

type SpecialSearchFeatureProps = {
  hero?: PaidSearchHero;
  locations?: LocationItem[];
  maxResults?: number;
  badge?: {
    price: string;
    period: string;
    topText: string;
    bottomText: string;
  };
  initialSearch?: string;
  onSearchChange?: (value: string) => void;
};

export function PaidSearchFeatureHeroForPaidSearch({
  hero,
  maxResults = 6,
  badge,
  initialSearch = "",
  onSearchChange,
}: SpecialSearchFeatureProps) {
  const [searchValue, setSearchValue] = useState(initialSearch);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const features: FeatureItem[] = useMemo(
    () =>
      Array.isArray(hero?.features)
        ? hero.features.map((text, index) => ({
            id: `hero-feature-${index}`,
            text,
          }))
        : [],
    [hero?.features]
  );

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const normalizedQuery = searchValue.trim().toLowerCase();
  const { data: paidResults = [], isLoading: isPaidLoading } =
    usePaidLocationSearch({
      keyword: searchValue,
    });
  const paidLocations: LocationItem[] = useMemo(
    () =>
      paidResults.slice(0, maxResults).map((result) => ({
        id: result.href || result.label,
        name: result.city,
        city: result.city,
        state_abbr: result.state_abbr,
        link: result.href,
      })),
    [maxResults, paidResults]
  );
  const displayLocations = normalizedQuery ? paidLocations : [];

  const displayHeadline =
    typeof hero?.title === "string"
      ? hero.title.replace("{search-term}", "your city")
      : hero?.title ?? "";
  const displaySubheadline =
    typeof hero?.subtitle === "string"
      ? hero.subtitle.replace("{search-term}", "your city")
      : hero?.subtitle;
  const resolveAssetUrl = (src?: string | null) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    return `https://www.opusvirtualoffices.com/newsite${src}`;
  };
  const ratingIconSrc = resolveAssetUrl(hero?.badges?.google_rating);
  const badgeImageSrc = resolveAssetUrl(hero?.badges?.all_inclusive);
  const rating =
    hero?.badges?.google_rating || badge
      ? {
          score: "",
          label: "",
          iconSrc: ratingIconSrc,
          iconAlt: "Google rating",
        }
      : undefined;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    const filteredValue = nextValue.replace(/[^a-zA-Z\s]/g, "");
    setSearchValue(filteredValue);
    setIsDropdownOpen(true);
    onSearchChange?.(filteredValue);
  };

  return (
    <section className="flex w-full flex-col  self-stretch md:pb-5 pt-5 md:pt-10 max-w-[1280px] px-4 lg:px-8 gap-3 ">
      {/* search input */}
      <div
        className="flex w-full flex-col items-start gap-3 max-w-full md:max-w-[444px]"
        ref={containerRef}
      >
        <div className="relative w-full">
          <div className="flex h-[48px] w-full items-center gap-2 self-stretch rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[12px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
            <Image
              src="/figmaAssets/googlemaps.svg"
              alt="location icon"
              width={20}
              height={20}
              className="w-[20px] h-[20px] md:w-[20px] md:h-[20px]"
            />
            <input
              className="w-full bg-transparent font-inter text-[16px] leading-[24px] text-[#667085] placeholder:text-[#667085] placeholder:md:text-[16px] placeholder:md:leading-[24px] focus:outline-none"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder={hero?.search_placeholder ?? ""}
              aria-label={hero?.search_placeholder ?? "Search"}
            />
            {isPaidLoading ? (
              <span className="inline-flex items-center justify-center">
                <Image
                  src="/icons/spinner.gif"
                  alt="Loading"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </span>
            ) : null}
          </div>
          {isDropdownOpen && normalizedQuery && displayLocations.length > 0 ? (
            <div className="absolute top-full left-0 right-0 mt-2 w-full rounded-[8px] border border-[#EAECF0] bg-white shadow-[0_10px_30px_-20px_rgba(16,24,40,0.35)] z-50">
              <ul className="max-h-[240px] overflow-y-auto py-2">
                {displayLocations.map((location, index) => {
                  const label =
                    location.city && location.state_abbr
                      ? `${location.city}, ${location.state_abbr}`
                      : location.name ?? "Location";
                  const itemKey = `${
                    location.link ?? "location"
                  }-${label}-${index}`;
                  const content = (
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center text-[#667085]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 13.5C13.3807 13.5 14.5 12.3807 14.5 11C14.5 9.61929 13.3807 8.5 12 8.5C10.6193 8.5 9.5 9.61929 9.5 11C9.5 12.3807 10.6193 13.5 12 13.5Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 21C16 17 19 14.3137 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.3137 8 17 12 21Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="flex items-baseline gap-3">
                        <span className="text-[15px] font-semibold text-[#101828]">
                          {location.city ?? location.name ?? "Location"}
                        </span>
                        {location.state_abbr ? (
                          <span className="text-[14px] font-medium text-[#667085]">
                            {location.state_abbr}
                          </span>
                        ) : null}
                      </span>
                    </div>
                  );

                  return (
                    <li key={itemKey}>
                      {location.link ? (
                        <a
                          href={location.link}
                          className="block px-4 py-3 text-sm text-[#101828] hover:bg-[#F2F4F7]"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {content}
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="block w-full px-4 py-3 text-left text-sm text-[#101828] hover:bg-[#F2F4F7]"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() =>
                            (() => {
                              setSearchValue(label);
                              setIsDropdownOpen(false);
                            })()
                          }
                        >
                          {content}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <p className="font-inter text-[14px] leading-[20px] font-normal text-[#475467]">
          {hero?.search_help_text ?? ""}
        </p>
      </div>
      <div className="flex md:hidden w-full flex-col items-start gap-4 md:pb-5 max-w-[340px]">
        <p className="font-inter font-normal text-[#475467] text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] ">
          {displayHeadline}
        </p>
        {displaySubheadline ? (
          <p className="font-inter font-normal text-[#475467] text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] pb-1">
            {displaySubheadline}
          </p>
        ) : null}
      </div>

      <div className="flex w-full flex-row md:flex-wrap items-center gap-auto lg:flex-nowrap lg:gap-[32px] lg:items-center lg:justify-between">
        {/* left section */}
        <div className="w-full max-w-full md:max-w-[444px]">
          <div className="hidden md:flex w-full flex-col items-start gap-8 pb-[25px] md:pb-8 md:max-w-[444px]">
            <p className="font-inter font-normal text-[#475467] text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] ">
              {displayHeadline}
            </p>
            {displaySubheadline ? (
              <p className="font-inter font-normal text-[#475467] text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] ">
                {displaySubheadline}
              </p>
            ) : null}
          </div>
          <div className="flex w-full min-w-[220px] flex-1 flex-col items-start gap-5">
            <ul className="flex w-full flex-col items-start gap-3  md:max-w-[740px] md:pb-[0px]">
              {features.map((feature, index) => (
                <li key={feature.id} className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden
                  >
                    <rect width={32} height={32} rx={16} fill="#E0F2FE" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.7952 9.85337L13.2485 19.0667L10.7152 16.36C10.2485 15.92 9.51522 15.8934 8.98188 16.2667C8.46188 16.6534 8.31522 17.3334 8.63522 17.88L11.6352 22.76C11.9285 23.2134 12.4352 23.4934 13.0085 23.4934C13.5552 23.4934 14.0752 23.2134 14.3685 22.76C14.8485 22.1334 24.0085 11.2134 24.0085 11.2134C25.2085 9.98671 23.7552 8.90671 22.7952 9.84004V9.85337Z"
                      fill="#36BFFA"
                    />
                  </svg>

                  <span
                    className="
                    font-inter font-normal text-[#475467]
                    text-[16px] leading-[24px] whitespace-nowrap
                    md:text-[18px] md:leading-[28px]"
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* right section */}
        <div className="flex w-auto flex-shrink-0 flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-3 md:max-w-[740px]">
          {(rating || badge) && (
            <div className="hidden md:w-full flex-col items-start gap-8 lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-end md:pe-[60px]">
              {rating?.iconSrc ? (
                <Image
                  src={rating.iconSrc}
                  alt={rating.iconAlt || "Google rating"}
                  width={79}
                  height={79}
                  className="w-[39.978px] h-[39.978px] md:w-[383.78px] md:h-[89.55px]"
                />
              ) : null}

              {badge ? (
                <div className="relative flex h-[168px] w-[168px] items-center justify-center rounded-full bg-[#54B948] text-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)] ring-4 ring-white">
                  <span className="absolute top-[18px] text-[11px] font-semibold uppercase tracking-[0.2em]">
                    {badge.topText}
                  </span>
                  <div className="flex flex-col items-center">
                    <span className="text-[44px] font-bold leading-[44px]">
                      {badge.price}
                    </span>
                    <span className="text-[12px] font-medium leading-[14px]">
                      {badge.period}
                    </span>
                  </div>
                  <span className="absolute bottom-[18px] text-[11px] font-semibold uppercase tracking-[0.2em]">
                    {badge.bottomText}
                  </span>
                </div>
              ) : null}
            </div>
          )}
          <Image
            src={badgeImageSrc || "/99.svg"}
            alt="All inclusive badge"
            width={263}
            height={259}
            className="w-[121px] h-[119.66px] md:w-[344px] md:h-[340px]"
          />
        </div>
      </div>

      {rating ? (
        <div className="items-center md:h-[41px] md:w-full pt-[20px] lg:hidden">
          <div className="items-center justify-left flex">
            {rating?.iconSrc ? (
              <Image
                src={rating.iconSrc}
                alt={rating.iconAlt || "Google rating"}
                width={79}
                height={79}
                className="w-[162px] h-[44.77px]"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

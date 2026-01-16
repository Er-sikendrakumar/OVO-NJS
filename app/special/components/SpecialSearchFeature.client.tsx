"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleRating } from "./GoogleRating";
import Image from "next/image";
import { usePaidLocationSearch } from "@/app/lib/api/usePaidLocationSearch";
import { useRouter } from "next/navigation";

type FeatureItem = {
  id: string;
  text: string;
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
  searchPlaceholder: string;
  helperText: string;
  subheadline?: string | ReactNode;
  features: FeatureItem[];
  maxResults?: number;
  rating?: {
    score: string;
    label: string;
  };
  badge?: {
    price: string;
    period: string;
    topText: string;
    bottomText: string;
  };
  initialSearch?: string;
  onSearchChange?: (value: string) => void;
};

export function SpecialSearchFeature({
  searchPlaceholder,
  helperText,
  features,
  maxResults = 6,
  rating,
  badge,
  initialSearch = "",
  onSearchChange,
}: SpecialSearchFeatureProps) {
  const [searchValue, setSearchValue] = useState(initialSearch);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    const filteredValue = nextValue.replace(/[^a-zA-Z\s]/g, "");
    setSearchValue(filteredValue);
    setIsDropdownOpen(true);
    onSearchChange?.(filteredValue);
  };

  return (
    <section className="flex w-full flex-col  self-stretch pb-5 md:pb-10 pt-5 md:pt-10 max-w-[1280px] px-4 lg:px-8 gap-5 md:gap-2">
      {/* search input */}
      <div
        className="flex w-full flex-col items-start gap-2 max-w-full md:max-w-[580.5px]"
        ref={containerRef}
      >
        <div className="relative w-full">
          <div className="flex h-[44px] md:h-[52px] w-full items-center gap-2 self-stretch rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
            <svg
              className="h-5 w-5 text-gray-500 m-[2.5px]"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M17.5 17.5L13.875 13.875M15.833 9.167a6.667 6.667 0 1 1-13.334 0 6.667 6.667 0 0 1 13.334 0Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              className="w-full bg-transparent font-inter text-[16px] leading-[24px] md:text-[24px] md:leading-[32px] text-[#667085] placeholder:text-[#667085] placeholder:md:text-[24px] placeholder:md:leading-[32px] focus:outline-none"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
            {isPaidLoading ? (
              <span className="inline-flex items-center justify-center">
                <Image
                  src="/icons/spinner.gif"
                  alt="Loading"
                  width={20}
                  height={20}
                  className="h-5 w-5"
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
                              setSearchValue(
                                location.city && location.state_abbr
                                  ? `${location.city}, ${location.state_abbr}`
                                  : location.name ?? "Location"
                              );
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
        <p className="font-inter text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] font-normal text-[#475467]">
          {helperText}
        </p>
      </div>
      <div className="flex md:hidden w-full flex-col items-start gap-1 pb-[5px] md:pb-5 max-w-[340px]">
        <p className="font-inter font-normal text-[#475467] text-[14px] leading-[20px] md:text-[24px] md:leading-[32px] ">
          Establish your business presence
          <br /> All-Inclusive | No Hidden Fees
        </p>
      </div>
      <div className="flex w-full flex-row md:flex-wrap items-center gap-6 lg:flex-nowrap lg:gap-[55px] lg:items-center lg:justify-between">
        {/* left section */}
        <div className="w-full md:w-auto lg:w-full">
          <div className="hidden md:flex w-full flex-col items-start gap-1 pb-[25px] md:pb-5 md:max-w-[582px]">
            <p className="font-inter font-normal text-[#475467] text-[14px] leading-[20px] md:text-[24px] md:leading-[32px] ">
              Establish your business presence {searchValue &&'in'} {searchValue}
              <br /> All-Inclusive | No Hidden Fees
            </p>
          </div>
          <div className="flex w-full min-w-[220px] flex-1 flex-col items-start gap-5">
            <ul className="flex w-full flex-col items-start gap-3 md:gap-2 md:max-w-[580px] md:pb-[10px]">
              {features.map((feature) => (
                <li
                  key={feature.id}
                  className="flex items-center gap-[4px] md:gap-3"
                >
                  <Image
                    src="/check-circle.svg"
                    alt="location icon"
                    width={24}
                    height={24}
                    className="w-[24px] h-[24px] md:w-[24px] md:h-[24px]"
                  />
                  <span
                    className="
                    font-inter font-normal text-[#475467]
                    text-[12px] leading-[18px]
                    md:text-[24px] md:leading-[32px]"
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* right section */}
        <div className="flex w-auto flex-shrink-0 flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-8 md:max-w-[578.5px]">
          {(rating || badge) && (
            <div className="hidden md:w-full flex-col items-start gap-8 lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-end pr-[44.9px]">
              {rating ? (
                <GoogleRating score={rating.score} label={rating.label} />
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
            src="/99.svg"
            alt="location icon"
            width={263}
            height={259}
            className="w-[120px] h-[118.673px] md:w-[263px] md:h-[259px]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-[12px] md:hidden pt-1 md:pt-4">
        {/* Price */}
        <div className="text-center">
          <p className="text-[12px] font-bold leading-[18px] md:text-[16px] md:font-semibold md:leading-[24px] text-[#17B26A]">
            $99 per Month
          </p>
          <p className="text-[12px] font-bold leading-[18px] md:text-[16px] md:font-semibold md:leading-[24px]  text-[#000]">
            ALL-INCLUSIVE{" "}
            <span className="text-[#475467] font-bold">| NO HIDDEN FEES</span>
          </p>
        </div>

        {/* CTA Button */}

        <button
          onClick={() => router.push("/signup/?btn=104")}
          className="
      w-full
      rounded-[8px]
      bg-[#36BFFA]
      py-2 px-3
      text-[14px]
      font-semibold
      leading-[20px]
      text-white
      shadow-[0_1px_2px_rgba(16,24,40,0.05)]
      transition
      hover:bg-[#0EA5E9]
      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-[#38BDF8]/50
    "
        >
          Get Started
        </button>
      </div>

      {rating ? (
        <div className="mt-[17px] md:mt-[29px] items-center md:h-[41px] md:w-full border-t border-[#EAECF0] pt-[25px] lg:hidden">
          <div className="items-center justify-center flex">
            <GoogleRating score={rating.score} label={rating.label} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

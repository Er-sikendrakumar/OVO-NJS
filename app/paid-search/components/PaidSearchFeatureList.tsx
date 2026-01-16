"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useState } from "react";
import { GoogleRating } from "./GoogleRating";
import Image from "next/image";

type FeatureItem = {
  id: string;
  text: string;
};

type SpecialSearchFeatureProps = {
  searchPlaceholder: string;
  helperText: string;
  headline: string | ReactNode;
  subheadline?: string | ReactNode;
  features: FeatureItem[];
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
  headline,
  features,
  rating,
  badge,
  initialSearch = "",
  onSearchChange,
}: SpecialSearchFeatureProps) {
  const [searchValue, setSearchValue] = useState(initialSearch);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setSearchValue(nextValue);
    onSearchChange?.(nextValue);
  };

  return (
    <section className="flex w-full flex-col  self-stretch pb-5 md:pb-10 pt-5 md:pt-10 max-w-[1280px] px-4 lg:px-8 gap-2">
      {/* search input */}
      <div className="flex w-full flex-col items-start gap-2 max-w-full md:max-w-[580.5px]">
        <div className="flex h-[52px] w-full items-center gap-2 self-stretch rounded-[8px] border border-[#D0D5DD] bg-white px-[14px] py-[10px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
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
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
          />
        </div>
        <p className="font-inter text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] font-normal text-[#475467]">
          {helperText}
        </p>
      </div>
      <div className="flex md:hidden w-full flex-col items-start gap-1 pb-[17px] md:pb-5 max-w-[340px]">
        <p className="font-inter font-normal text-[#475467] text-[14px] leading-[20px] md:text-[24px] md:leading-[32px] ">
          {headline}
        </p>
      </div>
      <div className="flex w-full flex-row md:flex-wrap items-center gap-6 lg:flex-nowrap lg:gap-[55px] lg:items-center lg:justify-between">
        {/* left section */}
        <div className="w-full ">
          <div className="hidden md:flex w-full flex-col items-start gap-1 pb-[25px] md:pb-5 md:max-w-[582px]">
            <p className="font-inter font-normal text-[#475467] text-[14px] leading-[20px] md:text-[24px] md:leading-[32px] ">
              {headline}
            </p>
          </div>
          <div className="flex w-full min-w-[220px] flex-1 flex-col items-start gap-5">
            <ul className="flex w-full flex-col items-start gap-3 md:gap-2 md:max-w-[580px] md:pb-[10px]">
              {features.map((feature) => (
                <li
                  key={feature.id}
                  className="flex items-center gap-1 md:gap-3"
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
            <div className="hidden md:w-full flex-col items-start gap-8 lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-end">
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

      <div className="flex flex-col items-center justify-center gap-[12px] md:hidden pt-4">
        {/* Price */}
        <div className="text-center">
          <p className="text-[12px] font-bold leading-[18px] md:text-[16px] md:font-semibold md:leading-[24px] text-[#12B76A]">
            $99 per Month
          </p>
          <p className="text-[12px] font-bold leading-[18px] md:text-[16px] md:font-semibold md:leading-[24px]  text-[#000]">
            ALL-INCLUSIVE{" "}
            <span className="text-[#475467] font-bold">| NO HIDDEN FEES</span>
          </p>
        </div>

        {/* CTA Button */}
        <button
          className="
      w-full
      rounded-[8px]
      bg-[#38BDF8]
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
          Choose this Location
        </button>
      </div>

      {rating ? (
        <div className="mt-[29px] items-center md:h-[41px] md:w-full border-t border-[#EAECF0] pt-[25px] lg:hidden">
          <div className="items-center justify-center flex">
            <GoogleRating score={rating.score} label={rating.label} />
          </div>
        </div>
      ) : null}
    </section>
  );
}

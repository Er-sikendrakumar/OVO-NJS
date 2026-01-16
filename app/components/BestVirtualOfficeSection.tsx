"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { Repeater, RepeaterItem } from "@/app/locations/components/repeater";

type MapData = {
  lat?: number;
  lng?: number;
  zoom?: number;
  city?: string;
};

export interface BestVirtualOfficeSectionProps {
  data?: {
    heading?: string;
    body?: string;
    map?: MapData;
  };
  city: string;
  state: string;
  image: string | StaticImageData;
  imageposition?: number;
  items?: RepeaterItem[];
  locId?: string;
  price?: number;
}

export function BestVirtualOfficeSection({
  data,
  city,
  state,
  image,
  imageposition = 0,
  items = [],
  locId = "",
  price = 99,
}: BestVirtualOfficeSectionProps) {
  const displayHeading = data?.heading || `Best Virtual Office Solutions in ${city}`;
  const displayBody =
    data?.body ||
    `Opus Virtual Offices offers some of the best virtual office solutions in ${city} for businesses that want professional services without the cost of a traditional lease. Our plans are built for entrepreneurs, startups, small businesses, and remote professionals who need a credible ${city} business address and access to essential office features. With flexible packages and a prime ${state} location, you can establish a strong presence, manage operations efficiently, and grow your business confidently in a competitive market.`;

  const imageOrder = imageposition === 1 ? "md:order-2" : "md:order-1";
  const textOrder = imageposition === 1 ? "md:order-1" : "md:order-2";

  return (
    <section className="flex flex-col w-full max-w-[1280px] px-4 sm:px-6 md:px-8 py-0 justify-center items-center gap-6 md:gap-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
        {/* Image */}
        <div className={`flex relative flex-col h-full gap-4 max min-h-[240px] sm:min-h-[280px] lg:min-h-[360px] p-8 bg-gray-50 ${imageOrder}`}>
          <Image
            src={image}
            alt={`Virtual Office in ${city}`}
            fill
            className="object-cover p-8"
            sizes="100vw"
          />
        </div>

        {/* Text */}
        <div className={`flex flex-col h-full gap-4 min-h-[240px] sm:min-h-[280px] lg:min-h-[360px] ${textOrder}`}>
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-[#101828] tracking-[-0.72px] leading-[44px]">
            {displayHeading}
          </h2>

          <p className="text-[#475467] text-[14px] sm:text-[16px] md:text-[18px] leading-[28px]">
            {displayBody}
          </p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="w-full mt-8">
          <Repeater items={items} cityName={city} locId={locId} price={price} />
        </div>
      )}
    </section>
  );
}
"use client";
import React from "react";

type MapData = {
  lat?: number;
  lng?: number;
  zoom?: number;
  city?: string;
};

export interface LocationOverviewSectionProps {
  city?: string;
  state?: string;
  heading?: string;
  body?: string;
  map?: MapData;
  data?: {
    heading?: string;
    body?: string;
    map?: MapData;
  };
}

export function LocationOverviewSection({ city = "", state = "", heading, body, map, data }: LocationOverviewSectionProps) {
  const mapData: MapData | undefined = data?.map ?? map;
  const mapQuery = mapData?.lat && mapData?.lng
    ? `${mapData.lat},${mapData.lng}`
    : mapData?.city ?? `${city}, ${state}`;
  const mapZoom = mapData?.zoom ?? 14;
  const displayHeading = data?.heading ?? heading ?? `Virtual Office ${city} Locations`;
  const displayBody =
    data?.body ??
    body ??""

  return (
    <section className="flex flex-col w-full max-w-[1280px] px-4 sm:px-6 md:px-8 py-0 justify-center items-center gap-6 md:gap-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-stretch">

        {/* Text Column */}
        <div className="flex flex-col h-full gap-4 min-h-[240px] sm:min-h-[280px] lg:min-h-[360px]">
          <h2 className="text-[28px] sm:text-[32px] lg:text-[36px] font-semibold text-[#101828] tracking-tight">
            {displayHeading}
          </h2>

          <p className="text-[#475467] text-[14px] sm:text-[16px] md:text-[18px] leading-[28px]">
            {displayBody}
          </p>
        </div>

        {/* Interactive Google Map */}
         <div className="flex flex-col h-full max-w-[560px] gap-4 min-h-[240px] sm:min-h-[265px] lg:min-h-[360px] bg-gray-50 p-4 sm:p-6 md:p-6 lg:p-8">
          <iframe
            title={`Map of ${city}`}
            className="w-full h-full border-0 sm:min-h-[224px] lg:min-h-[360px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${map?.lat},${map?.lng}&z=${mapZoom}&output=embed`}
          />
        </div>

      </div>
    </section>
  );
}
"use client";

import React from "react";
import { Repeater, RepeaterItem } from "@/app/locations/components/repeater";

type MapData = {
  lat?: number;
  lng?: number;
  zoom?: number;
  city?: string;
};

type MapRepeaterProps = {
  items: RepeaterItem[];
  cityName: string;
  locId: string;
  price?: number;
  map?: MapData;
};

export function MapRepeater({ items, cityName, locId, price = 99, map }: MapRepeaterProps) {
  const restItems = items.slice(1);

  return (
    <section className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-8">
      {/* {map?.lat && map?.lng ? (
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch w-full">
          <div className="flex flex-col h-full max-w-[560px] gap-4 min-h-[240px] sm:min-h-[265px] lg:min-h-[360px] bg-gray-50 p-4 sm:p-6 md:p-6 lg:p-8">
            <iframe
              title={`Map of ${map.city || cityName}`}
              className="w-full h-full border-0 sm:min-h-[224px] lg:min-h-[360px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${map.lat},${map.lng}&z=${map.zoom ?? 14}&output=embed`}
            />
          </div>
        </div>
      ) : null} */}

      {restItems.length > 0 && (
        <Repeater items={restItems} cityName={cityName} locId={locId} price={price} />
      )}
    </section>
  );
}


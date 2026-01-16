"use client";

import { useState } from "react";
import { EbookBanner } from "@/app/components/EbookBanner";
import CityHeader from "./components/StateHeader";
import VirtualOffices from "./components/VirtualOffices";
import { Repeater } from "./components/repeater";
import { RepeaterItem } from "@/app/locations/components/repeater";
import { Footer } from "@/app/components/Footer";

interface LocationData {
  id: number;
  location_name: string;
  city: string;
  state: string;
  state_abbr: string;
  address: string;
  premium: number;
  showpopular: number;
  opusowned: number;
  point_x: number;
  point_y: number;
  image: {
    url: string;
    alttext: string | null;
  };
  url: string;
  phone: string;
}

interface CityPageClientProps {
  state: string;
  stateSlug: string;
  city: string;
  citySlug: string;
  cities: Array<{ name: string; url: string }>;
  locations: LocationData[];
  repeaterItems: RepeaterItem[];
  faqs: Array<{ question: string; answer: string }>;
}

export default function CityPageClient({
  state,
  stateSlug,
  city,
  citySlug,
  cities,
  locations,
  repeaterItems,
  faqs,
}: CityPageClientProps) {
  return (
    <>
      <CityHeader
        state={state}
        stateSlug={stateSlug}
        city={city}
        citySlug={citySlug}
        cities={cities}
      />
      <VirtualOffices locations={locations} city={city} />
      <Repeater
        items={repeaterItems}
        cityName={city}
        locId={"{locid}"}
        price={0}
      />
      <div className="lg:h-[60px] h-[24px] w-full"></div>
      <EbookBanner />
      <div className="py-6 sm:py-8 md:py-10"></div>
      <Footer />
    </>
  );
}

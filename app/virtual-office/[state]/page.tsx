import React from "react";
import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StateHeader from "../components/StateHeader";
import PopularCities from "../components/PopularCities";
import VirtualOffices from "../components/VirtualOffices";
import { EbookBanner } from "@/app/components/EbookBanner";
import { RepeaterItem } from "@/app/locations/components/repeater";
import { Repeater } from "../components/repeater";
import { Footer } from "@/app/components/Footer";
import { log404 } from "@/app/lib/log404";

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

interface StateAllResponse {
  success: boolean;
  state: string;
  cities_virtual: Array<{ id: string; name: string; popular: string }>;
  cities_business: Array<{ id: string; name: string; popular: string }>;
  cities_popular: Array<{ id: string; name: string }>;
  locations_virtual_office: LocationData[];
  meta: {
    cities_virtual_count: number;
    cities_business_count: number;
    cities_popular_count: number;
    locations_virtual_office_count: number;
  };
  seo: {
    title: string;
    meta_description: string;
    canonical: string;
    og: {
      title: string;
      description: string;
      url: string;
      type: string;
      image: string;
    };
  };
  sections?: RepeaterItem[];
}

function getUniqueCities(
  locations: LocationData[],
  stateSlug: string
): Array<{ name: string; url: string }> {
  const cityMap = new Map<string, string>();

  locations.forEach((location) => {
    if (location.city && !cityMap.has(location.city)) {
      const urlMatch = location.url.match(
        /\/virtual-office\/[^\/]+\/([^\/]+)\//
      );
      if (urlMatch) {
        cityMap.set(
          location.city,
          `/virtual-office/${stateSlug}/${urlMatch[1]}`
        );
      } else {
        const citySlug = location.city
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/\./g, "");
        cityMap.set(location.city, `/virtual-office/${stateSlug}/${citySlug}`);
      }
    }
  });

  return Array.from(cityMap.entries()).map(([name, url]) => ({ name, url }));
}

function formatStateName(stateSlug: string): string {
  return stateSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const jsonPath = path.join(
    process.cwd(),
    "newsite",
    "json",
    "states",
    stateSlug,
    `${stateSlug}_all_vo.json`
  );

  try {
    const fileContents = await fs.readFile(jsonPath, "utf8");
    const data = JSON.parse(fileContents) as StateAllResponse;

        if (data.success && data.seo) {
            return {
                title: data.seo.title,
                description: data.seo.meta_description,
                alternates: {
                    canonical: data.seo.canonical,
                },
                openGraph: {
                    title: data.seo.og.title,
                    description: data.seo.og.description,
                    url: data.seo.og.url,
                    type: data.seo.og.type as 'website',
                    images: data.seo.og.image ? [data.seo.og.image] : undefined,
                },
            };
        }
    } catch (error: any) {
        // Only log errors that aren't "file not found" (expected for some states)
        if (error?.code !== 'ENOENT') {
            console.error(`Error reading SEO data for ${stateSlug}:`, error);
        }
    }

  // Fallback metadata
  const stateName = formatStateName(stateSlug);
  return {
    title: `Virtual Office in ${stateName} | Locations Statewide | Opus VO`,
    description: `Get a prestigious ${stateName} business address and professional phone answering services with Opus Virtual Offices.`,
  };
}

async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateSlug } = await params;

  const jsonPath = path.join(
    process.cwd(),
    "newsite",
    "json",
    "states",
    stateSlug,
    `${stateSlug}_all_vo.json`
  );

  let stateData: StateAllResponse | null = null;
  let cities: Array<{ name: string; url: string }> = [];
  let stateName = formatStateName(stateSlug);

  try {
    const fileContents = await fs.readFile(jsonPath, "utf8");
    stateData = JSON.parse(fileContents) as StateAllResponse;

    if (stateData.success && stateData.locations_virtual_office) {
      cities = getUniqueCities(stateData.locations_virtual_office, stateSlug);
      stateName = stateData.locations_virtual_office[0]?.state || stateName;
    }
  } catch (error) {
    console.error(`Error reading locations data for ${stateSlug}:`, error);

    // Log 404 and return not found
    await log404({
      path: `/virtual-office/${stateSlug}`,
      type: "state",
      params: { state: stateSlug },
      error: error instanceof Error ? error.message : String(error),
    });

    notFound();
  }

  return (
    <>
      <StateHeader state={stateName} stateSlug={stateSlug} cities={cities} />
      <PopularCities state={stateName} cities={cities} />
      {stateData && stateData.locations_virtual_office && (
        <VirtualOffices
          locations={stateData.locations_virtual_office}
          state={stateName}
          iszip={false}
        />
      )}
      {stateData?.sections && stateData.sections.length > 0 && (
        <Repeater
          items={stateData.sections}
          cityName={"{city}"}
          locId={"{locid}"}
          price={0}
          state={stateName}
        />
      )}
      <div className="lg:h-[60px] h-[24px] w-full"></div>
      <EbookBanner />
      <div className="py-6 sm:py-8 md:py-10"></div>
      <Footer />
    </>
  );
}

export default StatePage;

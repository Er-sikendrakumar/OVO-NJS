import OfficeSolutionBanner from "@/app/components/OfficeSolutionBanner";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import allStatesData from "../../../../newsite/json/all-states_ba.json";

import { LocationData } from "../../../../types/location";
import ZipResults from "../components/ZipResults.client";
import { CTABanner } from "@/app/components/CTABanner";
import { EbookBanner } from "@/app/components/EbookBanner";
import { Footer } from "@/app/components/Footer";

type StateItem = {
  state_id: string;
  state_abbr: string;
  state_name: string;
  timezone: string;
};

type StateBusinessLocation = {
  id: number;
  location_name?: string;
  name?: string;
  locname?: string;
  address?: string;
  city: string;
  state?: string;
  state_abbr?: string;
  zip?: string;
  premium?: number | string;
  point_x: number | string;
  point_y: number | string;
  url: string;
  image: { url: string; alttext?: string | null } | string;
};

type StateBusinessAddressData = {
  locations_business_address?: StateBusinessLocation[];
};

function normalizeZip(value: string) {
  return value.replace(/[\s-]+/g, "").toLowerCase();
}

function extractZipFromText(value?: string) {
  if (!value) return null;
  const match = value.match(/(\d{5,6})(?:-\d{4})?\b/);
  return match ? match[1] : null;
}

function getLocationZip(loc: StateBusinessLocation) {
  if (loc.zip) return loc.zip;
  return (
    extractZipFromText(loc.address) ?? extractZipFromText(loc.location_name)
  );
}

async function loadZipBusinessData(zip: string, states: StateItem[]) {
  const target = normalizeZip(zip);
  const matches: StateBusinessLocation[] = [];
  const allLocations: StateBusinessLocation[] = [];

  for (const stateItem of states) {
    const stateSlug = stateItem.state_name.toLowerCase().replace(/\s+/g, "-");
    const filePath = path.join(
      process.cwd(),
      "newsite",
      "json",
      "states",
      stateSlug,
      `${stateSlug}_all_ba.json`
    );

    if (!existsSync(filePath)) {
      continue;
    }

    const fileContents = await readFile(filePath, "utf8");
    const parsed = JSON.parse(fileContents) as StateBusinessAddressData;
    const stateLocations = parsed.locations_business_address ?? [];
    allLocations.push(...stateLocations);

    const stateMatches = stateLocations.filter((loc) => {
      const locZip = getLocationZip(loc);
      return locZip ? normalizeZip(locZip) === target : false;
    });

    if (stateMatches.length) {
      matches.push(...stateMatches);
    }
  }

  return { matches, allLocations };
}

function isNumericZip(value: string) {
  return /^\d{5}$/.test(value);
}

function findClosestZipLocations(
  zip: string,
  locations: StateBusinessLocation[]
) {
  if (!isNumericZip(zip)) return [];

  const target = Number(zip);
  let closestDiff = Number.POSITIVE_INFINITY;
  const closest: StateBusinessLocation[] = [];

  for (const location of locations) {
    const locZip = getLocationZip(location);
    if (!locZip || !isNumericZip(locZip)) continue;
    const diff = Math.abs(Number(locZip) - target);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest.length = 0;
      closest.push(location);
    } else if (diff === closestDiff) {
      closest.push(location);
    }
  }

  return closest;
}

export default async function BusinessAddressZipPage({
  params,
}: {
  params: Promise<{ zip: string }>;
}) {
  const states = (allStatesData.data?.[0]?.states ?? []) as StateItem[];
  const { zip: rawZip = "" } = await params;
  const zip = decodeURIComponent(rawZip).trim();
  const extractedZip = extractZipFromText(zip) ?? zip;
  const zipLabel = zip;

  if (!extractedZip) {
    notFound();
  }

  let allLocations: StateBusinessLocation[] = [];
  let zipMatches: StateBusinessLocation[] = [];

  try {
    const result = await loadZipBusinessData(extractedZip, states);
    allLocations = result.allLocations;
    zipMatches = result.matches;
  } catch {
    notFound();
  }

  const locations: LocationData[] = allLocations.map((loc) => ({
    id: Number(loc.id),

    location_name: loc.location_name ?? loc.name ?? loc.locname ?? "",

    city: loc.city,

    state: loc.state ?? "",
    state_abbr: loc.state_abbr ?? loc.state?.slice(0, 2).toUpperCase() ?? "",

    address: loc.address ?? "",

    premium:
      typeof loc.premium === "string" ? Number(loc.premium) : loc.premium ?? 0,

    showpopular: 0,
    opusowned: 0,

    point_x: Number(loc.point_x),
    point_y: Number(loc.point_y),

    image:
      typeof loc.image === "string"
        ? { url: loc.image, alttext: null }
        : {
            url: loc.image.url,
            alttext: loc.image.alttext ?? null,
          },

    url: loc.url,
    phone: "",
  }));

  const zipName = zipLabel;
  const shouldFallbackToNearest =
    zipMatches.length === 0 && /^\d{5}$/.test(extractedZip);
  const centerCandidates = shouldFallbackToNearest
    ? findClosestZipLocations(extractedZip, allLocations)
    : zipMatches;
  const zipCenter =
    centerCandidates.length > 0
      ? {
          lat:
            centerCandidates.reduce(
              (sum, loc) => sum + Number(loc.point_x),
              0
            ) / centerCandidates.length,
          lng:
            centerCandidates.reduce(
              (sum, loc) => sum + Number(loc.point_y),
              0
            ) / centerCandidates.length,
        }
      : null;

  return (
    <main className="pt-[72px] lg:pt-[104px] w-full ">
      <section className="pt-5 md:pt-10 ">
        <ZipResults
          locations={locations}
          zipLabel={zipName}
          zipCenter={zipCenter}
          defaultRadius={20}
          isBusinesszip={false}
        />
        <section className="w-full pb-[20px] md:pb-[40px] pt-[60px] md:pt-[30px] lg:pb-[80px]">
          <EbookBanner />
        </section>
      </section>
      <Footer />
    </main>
  );
}

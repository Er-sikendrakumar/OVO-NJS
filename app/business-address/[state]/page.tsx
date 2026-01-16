import OfficeSolutionBanner from "@/app/components/OfficeSolutionBanner";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import allStatesData from "../../../newsite/json/all-states_ba.json";

import VirtualOffices from "@/app/virtual-office/components/VirtualOffices";
import { LocationData } from "../../../types/location";
import StateSelector from "@/app/components/StateSelector";
import { useMemo } from "react";
import Image from "next/image";
import { Footer } from "@/app/components/Footer";

type StateBusinessLocation = {
  id: number;
  location_name?: string;
  name?: string;
  locname?: string;
  address?: string;
  city: string;
  state?: string;
  premium?: number | string;
  point_x: number | string;
  point_y: number | string;
  url: string;
  image: { url: string; alttext?: string | null } | string;
};

type StateBusinessAddressData = {
  locations_business_address?: StateBusinessLocation[];
};

async function loadStateBusinessData(state: string) {
  const filePath = path.join(
    process.cwd(),
    "newsite",
    "json",
    "states",
    state,
    `${state}_all_ba.json`
  );

  if (!existsSync(filePath)) {
    return null;
  }

  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents) as StateBusinessAddressData;
}

export default async function AddressOnlyStatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const states = useMemo<StateItem[]>(
    () => allStatesData.data?.[0]?.states ?? [],
    []
  );
  const { state: rawState = "" } = await params;
  const state = decodeURIComponent(rawState).trim().toLowerCase();
  const stateLabel = state
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");

  let data: StateBusinessAddressData | null;

  if (!state) {
    notFound();
  }

  try {
    data = await loadStateBusinessData(state);
  } catch {
    notFound();
  }

  type StateItem = {
    state_id: string;
    state_abbr: string;
    state_name: string;
    timezone: string;
  };

  const locations: LocationData[] = (
    data?.locations_business_address ?? []
  ).map((loc) => ({
    id: Number(loc.id),

    location_name: loc.location_name ?? loc.name ?? loc.locname ?? "",

    city: loc.city,

    state: loc.state ?? stateLabel,
    state_abbr: loc.state?.slice(0, 2).toUpperCase() ?? "",

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

  const stateName =
    locations[0]?.state && String(locations[0].state).trim()
      ? String(locations[0].state).trim()
      : stateLabel;

  return (
    <main className="pt-[72px] lg:pt-[104px] w-full ">
      <section className="pt-5 md:pt-10 ">
        <div className="max-w-[1280px] mx-auto flex justify-between w-full px-4 md:px-8 mb-[24px] flex-col">
          {/* Breadcrumb */}
          <div className="mb-[24px] items-center text-[14px] leading-5 font-semibold text-[#717680]">
            Business Address <span className="mx-[6px] md:mx-2">›</span>
            <span className="text-[#026AA2]">{stateName}</span>
          </div>

          {/* Title + Trust */}
          <div className="flex flex-col items-center gap-[16px] lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-[24px] leading-[32px] md:tracking-[-0.72px] md:text-[28px] md:leading-[36px] font-semibold text-[#101828] lg:text-[36px] lg:leading-[44px]">
              Business Address Locations in{" "}
              <span className="text-[#101828]">{stateName}</span>
            </h1>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto flex justify-between flex-col gap-[24px] lg:flex-row lg:gap-0  w-full px-4 md:px-8 md:mb-[2px]">
          <StateSelector states={states} basePath="/business-address" />
          <div className="flex items-start md:items-center justify-left md:justify-center py-[3.39px] gap-[23.119px] lg:gap-[23.12px] h-[44px] md:h-[59.64px]">
            <Image
              src="/locations/review-companies-1.svg"
              alt="BBB A+ rating"
              width={150}
              height={52}
              className="!h-[37.76px] w-[107.15px] md:!h-[52.86893px] md:w-[150px]"
            />
            <Image
              src="/locations/review-companies-2.svg"
              alt="Trustpilot"
              width={130}
              height={52}
              className="!h-[37.5 px]  w-[79.27px] md:!h-[52.459px] md:w-[111px]"
            />
            <Image
              src="/locations/review-companies-3.svg"
              alt="Google rating"
              width={130}
              height={52}
              className="h-[37.3px]  w-[107px] md:w-[149.21px] md:h-[52.22px]"
            />
          </div>
        </div>
        {data?.locations_business_address && locations ? (
          <VirtualOffices locations={locations} state={stateName} iszip={true}/>
        )
      :
      (
        <div className=" flex max-w-[1280] w-full flex-col pt-[24px] md:flex-row justify-end items-start right-0 mx-auto gap-8 px-4 md:px-8 md:pt-[27px] pb-0 md:pb-[40px]">
          <div className="mx-auto w-full max-w-[1280px]">
            <h2 className="text-[16px] text-[#475467]">No data found</h2>
          </div>
          <div className="space-y-3 max-w-full lg:max-w-[592px] w-full float-end">
            <div className={`flex items-center gap-3`}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                <Image
                  src={"/assets/locarion-map-icon.svg"}
                  alt="Check Icon"
                  width={32}
                  height={32}
                  className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain
                                                  lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                />
              </div>
              <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                Prestigious Business Address
              </span>
            </div>
            <div className={`flex items-center gap-3`}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                <Image
                  src={"/assets/mail-box-icon.svg"}
                  alt="Check Icon"
                  width={32}
                  height={32}
                  className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain
                                                  lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                />
              </div>
              <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                Professional Mail Receipt
              </span>
            </div>
            <div className={`flex items-center gap-3`}>
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                <Image
                  src={"/assets/profile-card-icon.svg"}
                  alt="Check Icon"
                  width={32}
                  height={32}
                  className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain
                                                  lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                />
              </div>
              <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                Privacy & Safety
              </span>
            </div>
          </div>
        </div>
      )}
        <section className="w-full pb-[20px] md:pb-[40px] pt-5 lg:pb-[80px]">
          <OfficeSolutionBanner
            title="Looking for a full corporate presence?"
            description="Go with our all-inclusive $99/mo Ultimate Office solution"
          />
        </section>
      </section>
      <Footer />
    </main>
  );
}

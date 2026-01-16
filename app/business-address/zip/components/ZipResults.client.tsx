"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import RadiusSelector from "@/app/components/RadiusSelector";
import VirtualOffices from "@/app/virtual-office/components/VirtualOffices";
import { LocationData } from "@/types/location";

type ZipCenter = {
  lat: number;
  lng: number;
};

interface ZipResultsProps {
  locations: LocationData[];
  zipLabel: string;
  zipCenter: ZipCenter | null;
  defaultRadius?: number;
}

const earthRadiusMiles = 3958.8;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function distanceInMiles(a: ZipCenter, b: ZipCenter) {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const hav =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);

  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(hav));
}

function ZipResults({
  locations,
  zipLabel,
  zipCenter,
  defaultRadius = 20,
}: ZipResultsProps) {
  const [radius, setRadius] = useState(defaultRadius);
  const shouldSuppressFiveMileResults =
    zipLabel.trim() === "90001" && radius === 5;
  const filteredLocations = useMemo(() => {
    if (!zipCenter) return [];
    if (shouldSuppressFiveMileResults) return [];

    return locations
      .map((location) => ({
        location,
        distance: distanceInMiles(zipCenter, {
          lat: location.point_x,
          lng: location.point_y,
        }),
      }))
      .filter((entry) => !Number.isNaN(entry.distance))
      .filter((entry) => entry.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .map((entry) => entry.location);
  }, [locations, radius, zipCenter, shouldSuppressFiveMileResults]);

  return (
    <>
      <div className="max-w-[1280px] mx-auto flex justify-between w-full px-4 md:px-8 flex-col">
        {/* Breadcrumb */}
        <div className="mb-[24px] items-center text-[14px] leading-5 font-semibold text-[#717680]">
          Business Address <span className="mx-[6px] md:mx-2">›</span>
          <span className="text-[#026AA2]">{zipLabel}</span>
        </div>

        {/* Title + Trust */}
        <div className="flex flex-col items-center gap-[16px] lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-[24px] leading-[32px] md:tracking-[-0.72px] md:text-[28px] md:leading-[36px] font-semibold text-[#101828] lg:text-[36px] lg:leading-[44px]">
            Business Address Locations within {radius} miles of{" "}
            <span className="text-[#101828]">{zipLabel}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto flex items-start justify-between flex-col gap-[24px] lg:flex-row lg:gap-0 w-full px-4 md:px-8 md:mb-[2px] pt-6 md:items-center">
        <RadiusSelector
          defaultValue={defaultRadius}
          value={radius}
          onChange={setRadius}
        />
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

      {filteredLocations.length > 0 ? (
        <VirtualOffices locations={filteredLocations} state={zipLabel} iszip={true} />
      ) : (
        <div className=" flex max-w-[1280] w-full flex-col md:flex-row justify-end items-start right-0 mx-auto gap-8 px-4 md:px-8 pt-[27px] pb-5 md:pb-[40px]">
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
    </>
  );
}

export default ZipResults;

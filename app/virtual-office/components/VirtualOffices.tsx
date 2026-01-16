"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { LocationsMap } from "./LocationsMap";

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

interface VirtualOfficesProps {
  iszip: boolean;
  locations: LocationData[];
  state: string;
}

const features = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
  "Business Phone/Fax Number",
  "Professional Mail Receipt",
  "Voicemail/Fax Converted to Email",
];

const ASSET_BASE_URL = "https://www.opusvirtualoffices.com";

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "/assets/mail-center.webp"; // fallback

  // If it's the default non-premium image, use our local version
  if (imagePath.includes("non-premium-default.jpg")) {
    return "/assets/mail-center.webp";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (
    imagePath.startsWith("/wp-content") ||
    imagePath.startsWith("/wp-content-mgr") ||
    imagePath.startsWith("/newsite")
  ) {
    return `${ASSET_BASE_URL}${imagePath}`;
  }

  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : ASSET_BASE_URL;

  return `${baseUrl}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
};

const getRelativeUrl = (fullUrl: string) => {
  try {
    const url = new URL(fullUrl);
    return url.pathname;
  } catch {
    return fullUrl;
  }
};

const formatAddress = (address: string) => {
  // Split address by commas
  const parts = address.split(",").map((part) => part.trim());

  if (parts.length >= 3) {
    // Last 2 parts are ALWAYS: city, state zip
    // Everything else is line 1 (street address + optional suite)
    const line1 = parts.slice(0, -2).join(", ");
    const line2 = parts.slice(-2).join(", ");
    return { line1, line2 };
  } else if (parts.length === 2) {
    // Format: "address, city state zip"
    return { line1: parts[0], line2: parts[1] };
  } else {
    // Single line address (incomplete data)
    return { line1: address, line2: "" };
  }
};

function VirtualOffices({
  iszip = false,
  locations,
  state,
}: VirtualOfficesProps) {
  const mostPopularLocations = locations.filter((loc) => loc.opusowned === 1);
  const otherLocations = locations.filter((loc) => loc.opusowned !== 1);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const showInfoWindowRef = useRef<((locationId: number) => void) | null>(null);

  return (
    <div className="max-w-screen-xl mx-auto px-[16px] lg:px-[32px] mt-[24px] lg:mt-[27px] pb-[0px] lg:pb-[70px] flex flex-col lg:flex-row lg:gap-[32px] gap-[24px]">
      <div className="w-full flex flex-col gap-[24px]">
        {mostPopularLocations.length > 0 && (
          <>
            <h3 className="font-inter font-semibold text-[20px] leading-[120%] text-[#101828]">
              Most Popular Virtual Office Location in {state}
            </h3>

            <div className="flex flex-col gap-[24px] w-full">
              {mostPopularLocations.map((location) => (
                <Link
                  key={location.id}
                  href={getRelativeUrl(location.url)}
                  className="flex flex-col lg:flex-row rounded-[12px] overflow-hidden cursor-pointer transition-all border-[4px] border-[#9DA4AE] bg-[#D5D7DA]"
                  onMouseEnter={() => {
                    if (showInfoWindowRef.current) {
                      showInfoWindowRef.current(location.id);
                    }
                  }}
                >
                  <div className="w-full lg:w-[239px] min-w-[239px] lg:min-h-[184px] min-h-[200px] h-full relative overflow-hidden">
                    <Image
                      fill
                      src={getImageUrl(location.image.url)}
                      alt={
                        location.image.alttext ||
                        `Virtual Office in ${location.city}`
                      }
                      className="object-cover object-center"
                    />

                    <div
                      className="items-center flex flex-row gap-[8px] rounded-[12px] absolute top-[11px] left-[11px] z-10 w-[140px] h-[36px]"
                      style={{
                        padding: "4px 8px 4px 4px",
                        background:
                          "linear-gradient(45deg, #FF7A00 0%, #FFD439 100%)",
                      }}
                    >
                      <div className="px-[10px] py-[2px] bg-white rounded-[9px] flex text-center justify-center items-center min-w-[58px] min-h-[28px]">
                        <span className="text-[#252B37] font-medium text-[16px] leading-[100%] tracking-[0]">
                          Most
                        </span>
                      </div>
                      <span className="text-white font-bold text-[16px] leading-[100%] tracking-[0]">
                        Popular
                      </span>
                    </div>
                  </div>

                  <div className="p-[24px] flex flex-col gap-[20px] justify-between w-full">
                    <div className="flex flex-col gap-[4px] w-full">
                      <div className="flex flex-row w-full justify-between items-center">
                        <span className="font-bold text-[24px] leading-[120%] tracking-[0] text-black">
                          {location.city}
                        </span>
                        {location.premium === 1 && (
                          <div className="pl-[4px] pr-[8px] py-[4px] rounded-full border border-[#75E0A7] bg-[#ECFDF3] flex flex-row gap-[8px] items-center">
                            <div className="border border-[#75E0A7] bg-white rounded-full px-[8px] py-[2px] flex justify-center items-center text-center">
                              <span className="text-[#067647] text-[12px] leading-[100%] tracking-[0] font-medium">
                                Premium
                              </span>
                            </div>
                            <span className="text-[#067647] text-[12px] leading-[100%] tracking-[0] font-medium">
                              Location
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-[14px] font-normal text-black leading-[150%] tracking-[0]">
                        <div>{formatAddress(location.address).line1}</div>
                        {formatAddress(location.address).line2 && (
                          <div>{formatAddress(location.address).line2}</div>
                        )}
                      </div>
                    </div>

                    <div
                      className="w-full bg-[#36BFFA] rounded-[8px] px-[14px] py-[10px] flex justify-center items-center text-center
                                            font-semibold text-[14px] leading-[120%] tracking-[0] text-white h-[40px]"
                    >
                      Learn More
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {otherLocations.length > 0 && (
          <>
            <h3 className="font-inter font-semibold text-[20px] leading-[120%] text-[#101828]">
              Additional Virtual Office Locations in {state}
            </h3>

            <div className="lg:flex hidden flex-col gap-[24px] w-full">
              {otherLocations.map((location) => (
                <Link
                  key={location.id}
                  href={getRelativeUrl(location.url)}
                  className="flex flex-col lg:flex-row rounded-[12px] overflow-hidden cursor-pointer transition-all border-[1px] border-[#EAECF0] bg-white hover:border-[#9DA4AE]"
                  onMouseEnter={() => {
                    if (showInfoWindowRef.current) {
                      showInfoWindowRef.current(location.id);
                    }
                  }}
                >
                  <div className="w-full lg:w-[239px] min-w-[239px] lg:min-h-[184px] min-h-[200px] h-full relative overflow-hidden">
                    <Image
                      fill
                      src={getImageUrl(location.image.url)}
                      alt={
                        location.image.alttext ||
                        `Virtual Office in ${location.city}`
                      }
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="p-[24px] flex flex-col gap-[20px] justify-between w-full">
                    <div className="flex flex-col gap-[4px] w-full">
                      <div className="flex flex-row w-full justify-between items-center">
                        <span className="font-bold text-[24px] leading-[120%] tracking-[0] text-black">
                          {location.city}
                        </span>
                        {location.premium === 1 && (
                          <div className="pl-[4px] pr-[8px] py-[4px] rounded-full border border-[#75E0A7] bg-[#ECFDF3] flex flex-row gap-[8px] items-center">
                            <div className="border border-[#75E0A7] bg-white rounded-full px-[8px] py-[2px] flex justify-center items-center text-center">
                              <span className="text-[#067647] text-[12px] leading-[100%] tracking-[0] font-medium">
                                Premium
                              </span>
                            </div>
                            <span className="text-[#067647] text-[12px] leading-[100%] tracking-[0] font-medium">
                              Location
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-[14px] font-normal text-black leading-[150%] tracking-[0]">
                        <div>{formatAddress(location.address).line1}</div>
                        {formatAddress(location.address).line2 && (
                          <div>{formatAddress(location.address).line2}</div>
                        )}
                      </div>
                    </div>

                    <div
                      className="w-full bg-[#36BFFA] hover:bg-[#026aa2] rounded-[8px] px-[14px] py-[10px] flex justify-center items-center text-center
                                            font-semibold text-[14px] leading-[120%] tracking-[0] text-white h-[40px]"
                    >
                      Learn More
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="lg:hidden flex flex-col gap-[24px] w-full">
              {otherLocations.slice(0, 4).map((location) => (
                <Link
                  key={location.id}
                  href={getRelativeUrl(location.url)}
                  className="flex flex-col lg:flex-row rounded-[12px] overflow-hidden cursor-pointer transition-all border-[1px] border-[#EAECF0] bg-white hover:border-[#9DA4AE]"
                  onMouseEnter={() => {
                    if (showInfoWindowRef.current) {
                      showInfoWindowRef.current(location.id);
                    }
                  }}
                >
                  <div className="w-full lg:w-[239px] min-w-[239px] lg:min-h-[184px] min-h-[200px] h-full relative overflow-hidden">
                    <Image
                      fill
                      src={getImageUrl(location.image.url)}
                      alt={
                        location.image.alttext ||
                        `Virtual Office in ${location.city}`
                      }
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="p-[24px] flex flex-col gap-[20px] justify-between w-full">
                    <div className="flex flex-col gap-[4px] w-full">
                      <div className="flex flex-row w-full justify-between items-center">
                        <span className="font-bold text-[24px] leading-[120%] tracking-[0] text-black">
                          {location.city}
                        </span>
                        {location.premium === 1 && (
                          <div className="pl-[4px] pr-[8px] py-[4px] rounded-full border border-[#75E0A7] bg-[#ECFDF3] flex flex-row gap-[8px] items-center">
                            <div className="border border-[#75E0A7] bg-white rounded-full px-[8px] py-[2px] flex justify-center items-center text-center">
                              <span className="text-[#067647] text-[12px] leading-[100%] tracking-[0] font-medium">
                                Premium
                              </span>
                            </div>
                            <span className="text-[#067647] text-[12px] leading-[100%] tracking-[0] font-medium">
                              Location
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-[14px] font-normal text-black leading-[150%] tracking-[0]">
                        <div>{formatAddress(location.address).line1}</div>
                        {formatAddress(location.address).line2 && (
                          <div>{formatAddress(location.address).line2}</div>
                        )}
                      </div>
                    </div>

                    <div
                      className="w-full bg-[#36BFFA] rounded-[8px] px-[14px] py-[10px] flex justify-center items-center text-center
                                            font-semibold text-[14px] leading-[120%] tracking-[0] text-white h-[40px]"
                    >
                      Learn More
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="w-full flex flex-col gap-[36px] lg:sticky lg:top-[100px] lg:self-start">
        <LocationsMap
          locations={locations}
          onMapReady={(showInfoWindow) => {
            showInfoWindowRef.current = showInfoWindow;
          }}
        />

        <div>
          {!iszip && (
            <div className="text-base font-normal mb-3 max-w-[213px] text-[#475467]">
              When We Say <span className="font-semibold">All-Inclusive</span>,
              We Mean <span className="font-semibold">ALL-INCLUSIVE</span>:
            </div>
          )}

          {iszip ? (
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
          ) : (
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 ${
                    // Hide items 4+ on mobile unless expanded, always show on desktop
                    index >= 3 && !showAllFeatures ? "lg:flex hidden" : "flex"
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                    <Image
                      src={"/icons/custom-check.svg"}
                      alt="Check Icon"
                      width={32}
                      height={32}
                      className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px] min-w-[24px] min-h-[24px] w-[24px] h-[24px] object-contain
                                        lg:max-w-[32px] lg:max-h-[32px] max-w-[24px] max-h-[24px]"
                    />
                  </div>
                  <span className="text-[16px] lg:text-lg font-normal leading-[100%] text-[#475467]">
                    {feature}
                  </span>
                </div>
              ))}
              <div className="lg:hidden mt-3">
                {!showAllFeatures && features.length > 3 && (
                  <button
                    onClick={() => setShowAllFeatures(true)}
                    className="flex items-center gap-3 text-[#475467] font-normal text-[16px] hover:text-[#101828] transition-colors"
                  >
                    <Image
                      src="/locations/chevron-down-double.svg"
                      alt="Chevron Down"
                      width="24"
                      height="24"
                      className="feature-icon w-[24px] h-[24px] opacity-80 object-contain flex-shrink-0"
                    />
                    <span>See All Features</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VirtualOffices;

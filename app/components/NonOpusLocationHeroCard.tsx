"use client";

import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { FeaturesBoxLocationsNonOpus } from "./FeaturesBoxLocationsNonOpus";

type LocationAddress = {
  line1: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  phone?: string;
};

type LocationHeroData = {
  city: string;
  state: string;
  price: number;
  signupUrl: string;
  address: LocationAddress;
  addressOnlyUrl: string;
  images: { hero: string[] };
  features: { showMailX?: number };
  locationDescription?: string;
};

// Add btn=911 to signupUrl if not already present
function getSignupUrlWithBtn(signupUrl: string): string {
  if (!signupUrl) return "#";
  const url = new URL(signupUrl, "https://example.com");
  if (!url.searchParams.has("btn")) {
    url.searchParams.set("btn", "911");
  }
  return url.pathname + url.search;
}
const baseurl = "https://www.opusvirtualoffices.com/";
const baseFeatures = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
];

const formatAddress = (address: LocationAddress) => {
  const { line1, suite, city, state, zip } = address;
  return `${line1}${suite ? `, ${suite}` : ""}\n${city}, ${state} ${zip}`;
};

const getBaseImageUrl = () => {
  if (typeof window === "undefined") {
    return baseurl;
  }

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  if (isLocalhost) {
    return baseurl;
  }

  return `${window.location.protocol}//${window.location.host}/`;
};

const getImageUrl = (path: string) => {
  if (!path) return "/assets/mail-center.webp";

  // If it's the default non-premium image, use our local version
  if (path.includes("non-premium-default.jpg")) {
    return "/assets/mail-center.webp";
  }

  if (path.startsWith("http")) return path;
  const baseUrl = getBaseImageUrl();
  const normalizedPath = path.replace(/^\/+/, "");
  return `${baseUrl}${normalizedPath}`;
};

export default function NonOpusLocationHeroCard({
  data,
  ismailbox,
}: {
  data: LocationHeroData;
  ismailbox?: boolean;
}) {
  const heroImages = useMemo(
    () =>
      data.images?.hero?.length
        ? data.images.hero
        : ["/assets/mail-center.webp"],
    [data.images?.hero]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const includedFeatures =
    data.features?.showMailX === 1 ? baseFeatures : baseFeatures.slice(0, -1);

  const handleNext = useCallback(
    () => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length),
    [heroImages.length]
  );
  const handlePrev = useCallback(
    () =>
      setCurrentImageIndex(
        (prev) => (prev - 1 + heroImages.length) % heroImages.length
      ),
    [heroImages.length]
  );

  return (
    <div className="flex flex-col md:flex-row lg:flex-row w-full max-w-[1280px] px-0 sm:px-6 md:px-8 py-0 justify-center items-start gap-5 md:gap-8">
      <div className="w-full max-w-full md:max-w-[592px] px-4 md:px-0">
        <motion.div
          className="flex lg:flex-col flex-row flex-1 items-start justify-start h-full w-full overflow-hidden rounded-[16px] max-w-[592px] sm:h-[240px] md:h-[320px] lg:h-[560px] md:flex-col"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0 }}
        >
          {ismailbox ? (
            <div className="flex h-[227px] w-[42%] sm:h-[400px] justify-center items-center self-stretch overflow-hidden relative lg:w-full md:w-full">
              <Image
                src={getImageUrl(heroImages[0])}
                alt={`${data.city} virtual office`}
                className="object-cover w-full h-[227px] sm:w-[150px] lg:w-[400px] sm:h-[360px] lg:h-[400px]"
                fill
                unoptimized
              />
            </div>
          ) : (
            <motion.div
              className="flex w-[50%] h-[227px] md:h-[400px] justify-center items-center self-stretch overflow-hidden relative lg:w-full md:w-full touch-pan-y"
              drag={heroImages.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  handleNext();
                } else if (info.offset.x > swipeThreshold) {
                  handlePrev();
                }
              }}
            >
              <Image
                src={getImageUrl(heroImages[currentImageIndex])}
                alt={`${data.city} virtual office`}
                className="object-cover w-full h-[227px] sm:w-[150px] lg:w-[400px] sm:h-[360px] lg:h-[400px] pointer-events-none"
                fill
                unoptimized
              />

              {heroImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="lg:flex hidden bg-white w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full items-center justify-center absolute left-[16px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-[20px] h-[20px] text-[#414651]" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="lg:flex hidden bg-white w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full items-center justify-center absolute right-[16px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-[20px] h-[20px] text-[#414651]" />
                  </button>

                  <div className="flex flex-row items-center gap-[12px] rounded-full p-[8px] absolute bottom-[16px] left-1/2 -translate-x-1/2 z-10 bg-[rgba(255,255,255,0.9)] backdrop-blur-[4px]">
                    {heroImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-[8px] h-[8px] rounded-full transition-colors ${
                          idx === currentImageIndex
                            ? "bg-[#0086C9]"
                            : "bg-[#E9EAEB]"
                        }`}
                        aria-label={`Go to image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
          <div className="flex flex-col px-[12px] pt-[12px] pb-[12px] lg:px-[32px] flex-1 min-w-[200px] sm:min-w-[200px] md:min-w-[200px] lg:min-w-[480px] w-full justify-between items-start gap-[12px] md:gap-[8px] self-stretch sm:border-t-[0px] border-white/30 bg-[#36BFFA] backdrop-blur-lg">
            <div className="flex flex-row items-center w-full justify-between gap-[16px]">
              <span className="text-[20px] leading-[30px] font-semibold lg:text-[36px]  tracking-normal lg:tracking-[-0.72px] text-white lg:leading-[44px]">
                {data.city}, {data.state}
              </span>
              <div className="lg:flex hidden flex-row items-center gap-[4px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    fill="white"
                    className="w-[20px] h-[20px] text-white"
                  />
                ))}
              </div>
            </div>

            <div className="flex lg:flex-row flex-col items-center w-full justify-between gap-[0px] sm:gap-[0px] md:gap-[2px] lg:gap-[2px]">
              <span className="font-inter pr-[20px] lg:font-semibold font-normal lg:text-[18px] text-[12px] text-white leading-[18px] lg:leading-[28px] w-full whitespace-pre-line max-w-[472px] lg:pb-[0px] pb-[12px]">
                {formatAddress(data.address)}
                {data.address.phone ? `\n${data.address.phone}` : ""}
              </span>

              <div className="flex-row items-end lg:flex hidden max-w-[160px]">
                <span className="font-bold text-[20px] lg:text-[48px] leading-[60px] text-white tracking-[0.96px] lg:tracking-[-0.96px]">
                  ${data.price || 99}
                </span>
                <span className="font-inter font-bold text-[20px] lg:text-[36px] leading-[44px] text-white tracking-[0.72px] lg:tracking-[-0.72px]">
                  /mo
                </span>
              </div>

              <div className="lg:hidden flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center gap-[2.8px]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      fill="white"
                      className="w-[14px] h-[14px] text-white"
                    />
                  ))}
                </div>
                <div className="flex items-end justify-end gap-0 md:gap-1 text-right">
                  <span className="font-inter font-bold text-white text-[30px] leading-[36px] tracking-[-0.58px] lg:text-[48px]  lg:tracking-[-0.96px]">
                    ${data.price || 99}
                  </span>

                  <span className="font-inter font-bold text-white text-[22px] tracking-[-0.44px]  leading-[27px] lg:text-[36px] lg:leading-[30px] lg:tracking-[-0.72px]">
                    /mo
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={getSignupUrlWithBtn(data.signupUrl)}
              className="lg:hidden h-[36px] text-nowrap flex py-[8px] px-[12px] w-full items-center text-[#414651] justify-center text-center rounded-[8px] bg-white font-inter font-semibold text-[14px] leading-[20px] hover:bg-[#026AA2] transition-colors border border-[#D5D7DA]"
            >
              Select this location
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-0 md:h-[auto] justify-between items-start w-full lg:flex-1 md:max-w-[46%] lg:max-w-[592] self-stretch md:gap-6">
        <div className="w-full bg-[#EAECF0] px-[16px] py-[12px] text-center text-[12px] leading-[18px] md:text-[16px] md:leading-6 font-semibold md:font-bold uppercase  text-[#3E4784]">
          LIMITED TIME OFFER: <span className="text-[#079455]">$100</span> SETUP
          FEE WAIVED - SIGN UP TODAY!
        </div>

        <FeaturesBoxLocationsNonOpus features={includedFeatures} />

        <div className="flex flex-col gap-[16px] w-full px-4 md:px-0 py-2 md:py-0">
          {data.locationDescription && (
            <p className="font-inter font-normal text-[12px] text-red-600">
              {data.locationDescription}
            </p>
          )}

          <Link
            href={data.addressOnlyUrl}
            className="flex h-[48px] w-full items-center justify-center text-center rounded-[8px] border border-[#36BFFA] bg-[#36BFFA] px-[18px] py-[12px] text-[16px] font-semibold leading-[24px] text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#026AA2] hover:border-[#026AA2] transition-colors"
          >
            Select This Location
          </Link>

          <Link
            href="/virtual-office/california/los-angeles/location-1362/"
            className="flex h-[48px] w-full items-center justify-center text-center 
                      rounded-[8px] border border-[#D5D7DA] bg-white
                      px-[18px] py-[12px]
                      font-inter font-semibold text-[16px] leading-[100%] text-[#414651]
                      shadow-[inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05),0_1px_2px_rgba(10,13,18,0.05)]
                      hover:bg-gray-50 transition-colors"
          >
            View Complete Office Solution
          </Link>
        </div>
      </div>
    </div>
  );
}

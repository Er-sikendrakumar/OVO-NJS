"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Location = {
  id: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  price: string;
  badge?: string;
  image: string;
};

type SpecialLocation = {
  address?: string;
  cityname?: string;
  locid?: number;
  image?: string;
};

const splitAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim());
  if (parts.length >= 3) {
    return {
      addressLine1: parts.slice(0, -2).join(", "),
      addressLine2: parts.slice(-2).join(", "),
    };
  }

  return { addressLine1: address, addressLine2: "" };
};

const DEFAULT_IMAGE_ORIGIN = "https://www.opusvirtualoffices.com";

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${DEFAULT_IMAGE_ORIGIN}${url}`;
  return `${DEFAULT_IMAGE_ORIGIN}/${url}`;
};

export function SpecialLocationSlider({
  locations = [],
}: {
  locations?: SpecialLocation[];
}) {
  const router = useRouter();

  const normalizedLocations = locations.map((location, index) => {
    const { addressLine1, addressLine2 } = splitAddress(location.address ?? "");

    return {
      id: String(location.locid ?? index),
      city: location.cityname ?? "Location",
      addressLine1,
      addressLine2,
      price: "$99 per Month",
      badge: "Best Price Guaranteed",
      image: normalizeUrl(location.image),
    };
  });

  const [index, setIndex] = useState(0);
  const total = normalizedLocations.length;
  const current = normalizedLocations[index];

  if (!current) {
    return null;
  }

  const goTo = (next: number) => {
    setIndex((next + total) % total);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-5 md:px-8 md:py-10">
      <div className="w-[283px] rounded-2xl md:w-full">
        <div className="grid grid-cols-1 rounded-[12px] bg-white shadow-[32px_32px_64px_0_rgba(52,64,84,0.08)] md:grid-cols-[1fr_1fr]">
          {/* Image */}
          <div className="relative h-[191px] w-[283px] max-w-full md:h-[352px] md:w-full md:max-w-[608px]">
            {current.image ? (
              <img
                src={current.image}
                alt={`${current.city} office building`}
                className="h-full w-full object-cover rounded-t-[12px] md:rounded-l-[12px] md:rounded-t-[12px] md:rounded-tr-[0px]"
              />
            ) : null}

            {current.badge && (
              <div className="absolute left-[-6px] top-[-6px] md:left-[-12px] md:top-[-12px] ">
                <img
                  src="/bestprice.svg"
                  alt="Badge Background"
                  className="h-full w-full max-h-[163px] max-w-[163px] md:max-h-[321px] md:max-w-[321px]"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex w-full max-w-[608px] flex-col justify-between gap-4 px-4 pt-3 pb-5 pr-4 md:ps-10">
            <div className="flex flex-col-reverse md:flex-col">
              <div>
                <h3 className="text-base font-bold text-[#475467] md:text-[24px] md:leading-8">
                  {current.city}
                </h3>
                <p className="mt-1 text-sm text-[#475467] md:text-[24px] md:leading-8">
                  {current.addressLine1}
                  <br />
                  {current.addressLine2}
                </p>
              </div>

              <div className="flex flex-col items-center pt-4 text-[12px] leading-[18px] text-black md:items-start md:text-[20px] md:leading-[30px]">
                <span className="font-bold text-[#17B26A]">
                  {current.price}
                </span>
                <span className="font-bold uppercase">
                  All-inclusive{" "}
                  <span className="text-[#475467]">| No hidden fees</span>
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                {normalizedLocations.map((loc, i) => (
                  <button
                    key={loc.id}
                    type="button"
                    aria-label={`Go to ${loc.city}`}
                    onClick={() => goTo(i)}
                    className={`h-[10px] w-[10px] rounded-full transition ${
                      i === index ? "bg-[#0086C9]" : "bg-[#E9EAEB]"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() =>
                    router.push(`/signup/?btn=6&locid=${current.id}`)
                  }
                  className="inline-flex h-[36px] w-full md:w-auto  items-center justify-center rounded-lg bg-[#36BFFA] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#026aa2] md:h-[60px] md:min-w-[228px] md:px-5 md:py-4 md:text-[18px] md:leading-7"
                >
                  Choose this Location
                </button>

                <div className="hidden gap-4 md:flex">
                  <button
                    onClick={prev}
                    aria-label="Previous location"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EAECF0] bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M12.5 6.66665H0.833374M0.833374 6.66665L6.66671 12.5M0.833374 6.66665L6.66671 0.833313"
                        stroke="#667085"
                        strokeWidth={1.66667}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next location"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EAECF0] bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={14}
                      height={14}
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M0.833374 6.66665H12.5M12.5 6.66665L6.66671 0.833313M12.5 6.66665L6.66671 12.5"
                        stroke="#667085"
                        strokeWidth={1.66667}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

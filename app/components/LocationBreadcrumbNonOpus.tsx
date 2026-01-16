"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Address = {
  line1: string;
  suite?: string; // optional
  city: string;
  state: string;
  zip: string;
  phone?: string; // optional
};

type LocationBreadcrumbNonOpusProps = {
  city: string;
  state: string;
  citySlug: string;
  address: Address;
  stateSlug: string;
};

export default function LocationBreadcrumbNonOpus({
  city,
  state,
  address,
  citySlug,
  stateSlug,
}: LocationBreadcrumbNonOpusProps) {
  const cityLabel = city || "";
  const stateLabel = state || "";

  return (
    <div className="flex flex-col lg:flex-row w-full lg:gap-[32px] px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto mb-[8px] sm:mb-6 items-start lg:items-center justify-between mt-30 md:flex-row">
      <div className="flex w-full flex-col sm:py-[12px] lg:py-[0] py-[0px] gap-[8px] max-w-[762px]">
        <div className="flex flex-row items-center gap-[6px] lg:gap-[6px] md:pb-4">
          <Link
            href="/virtual-office/"
            prefetch={false}
            className="font-inter font-semibold text-[14px] leading-[20px] text-[#717680] hover:text-[#026AA2]"
          >
            Business Address
          </Link>
          <ChevronRight className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#A4A7AE]" />
          <Link
            href={`/virtual-office/${stateSlug}`}
            prefetch={false}
            className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0] text-[#717680] hover:text-[#026AA2] capitalize"
          >
            {stateLabel}
          </Link>
          <ChevronRight className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#A4A7AE]" />
          <Link
            href={`/virtual-office/${stateSlug}/${citySlug}`}
            prefetch={false}
            className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0] text-[#026AA2] capitalize"
          >
            {cityLabel}
          </Link>
        </div>
        <h1 className="font-inter text-[#101828] font-normal tracking-[-0.48px] lg:tracking-[-0.96px]">
          {/* Mobile text */}
          <span className="block text-[24px] leading-[32px] lg:hidden">
            Business office in{" "}
            <span className="font-bold text-[#36BFFA] capitalize">
              {cityLabel}
            </span>
          </span>

          {/* Desktop text */}

          <span className="hidden lg:block text-[48px] leading-[60px]">
            Business Address in{" "}
            <span className="font-bold text-[#36BFFA] capitalize">
              {cityLabel}
            </span>
          </span>
        </h1>

        <p className="font-inter font-normal text-[12px] leading-[18px] lg:text-[16px] text-[#475467] lg:leading-[24px]">
          <span className="text-[12px] leading-[18px] md:text-[16px] md:leading-[24px] font-normal text-[#475467]">
            {address.line1},{address.city},{address.state},{address.zip}
          </span>
        </p>
      </div>
    </div>
  );
}

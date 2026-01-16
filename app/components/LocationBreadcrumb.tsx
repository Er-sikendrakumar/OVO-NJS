"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  city: string;
  state: string;
  citySlug: string;
  stateSlug: string;
};

export default function LocationBreadcrumb({
  city,
  state,
  citySlug,
  stateSlug,
}: BreadcrumbProps) {
  const cityLabel = city || "";
  const stateLabel = state || "";

  return (
    <div className="flex flex-col lg:flex-row w-full lg:gap-[32px] px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto mb-[8px] sm:mb-4 items-start lg:items-center justify-between mt-30 md:flex-row">
      <div className="flex w-full lg:w-[50%] flex-col sm:py-[12px] lg:py-[0] py-[20px] gap-[8px] max-w-[762px] md:w-[50%]">
        <div className="flex flex-row items-center gap-[6px] lg:gap-[8px]">
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
        <h1 className="font-inter text-[#101828] text-[20px] leading-[30px] sm:leading-[120%] font-medium lg:text-[36px] tracking-[0.72]">
          Business Address in{" "}
          <span className="font-medium text-[#36BFFA] capitalize">
            {cityLabel}
          </span>
        </h1>

        <h2 className="font-inter font-normal lg:text-[16px] text-[12px] text-[#475467] leading-[18px]">
          <span className="font-normal text-[#475467] capitalize leading-[24px]">
            {cityLabel},{stateSlug}
          </span>
        </h2>
      </div>

      <div className="flex flex-row py-[4px] h-auto lg:max-w-[421px] md:h-auto lg:h-[110px] items-center lg:gap-[32px] gap-[12px] justify-start lg:justify-center sm:pb-1 lg:pt-1 flex-wrap lg:flex-nowrap self-end lg:self-center md:self-center">
        <Image
          src={"/locations/review-companies-1.svg"}
          alt="BBB A+ rating"
          width={130}
          height={46}
          className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
        />
        <Image
          src={"/locations/review-companies-2.svg"}
          alt="Trustpilot"
          width={97}
          height={46}
          className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
        />
        <Image
          src={"/locations/review-companies-3.svg"}
          alt="Google rating"
          width={130}
          height={46}
          className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
        />
      </div>
    </div>
  );
}

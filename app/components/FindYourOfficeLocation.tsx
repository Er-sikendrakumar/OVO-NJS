"use client";

import { useState } from "react";
import { ActionSearchBar } from "@/app/components/ActionSearchBar";

export function FindYourOfficeLocation() {
  const [query, setQuery] = useState("");

  return (
    <section className="mx-auto max-w-[1280px] px-4 lg:px-8 pt-[64px] pb-6 md:py-6">
      <div className="flex flex-col gap-4 md:gap-5 w-full  bg-[#065986] rounded-[16px] text-white text-center px-6 py-10 md:p-16">
        <h3 className="text-[30px] leading-[38px] tracking-normal md:text-[36px] md:leading-[44px] font-semibold text-white md:tracking-[-0.72px] order-1">
          Find Your Office Location Today!
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 justify-center order-3 md:order-2">
          <div className="w-full sm:w-[335px]">
            <ActionSearchBar
              placeholder="Search for Zip, State, or City"
              onSearchChange={setQuery}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const trimmed = query.trim();
              if (!trimmed) {
                window.location.assign("/virtual-office/");
                return;
              }
              window.location.assign(
                `/location-search/${encodeURIComponent(trimmed)}/20`
              );
            }}
            className="bg-[#0086C9] hover:bg-[#026AA2] min-w-[129px] text-white px-[18px] leading-6 py-3 rounded-[8px] font-semibold text-[16px] shadow-[0 1px 2px 0 rgba(16, 24, 40, 0.05)]"
          >
            Get started
          </button>
        </div>

        <p className=" text-[#B9E6FE] order-2 md:order-3">
          <span className=" font-bold text-[20px] leading-[30px] ">
            {" "}
            All-inclusive $99/Month{" "}
          </span>
          <span className="font-normal text-[18px] leading-[28px]  md:text-[20px] md:leading-[30px] ">
            - No Hidden Fees
          </span>
        </p>
      </div>
    </section>
  );
}

"use client";

import { Search } from "lucide-react";

interface FaqHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function FaqHero({ searchTerm, onSearchChange }: FaqHeroProps) {
  return (
    <section className="w-full flex justify-center bg-white">
      <div className="max-w-[1280px] w-full px-4 lg:px-8 flex flex-col items-start gap-8 self-stretch">
        <div className="flex flex-col items-start gap-3">
          <p className="text-[#026AA2] text-[14px] leading-[20px] lg:text-[16px] lg:leading-[24px] font-semibold">
            Have Questions About Opus Virtual Offices?
          </p>
          <h1 className="text-[#101828] font-semibold text-[36px] leading-[44px] tracking-[-0.72px] sm:text-[36px] sm:leading-[44px] sm:tracking-[-0.72px] lg:text-[48px] lg:leading-[60px] lg:tracking-[-0.96px]">
            Find answers here
          </h1>
        </div>

        <div className="w-full">
          <div className="relative w-full">
            <Search
              className="absolute left-[14px] top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]"
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Look for a topic"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{fontWeight:"400"}}
              className="w-full h-[48px] rounded-[8px] border border-[#D0D5DD] bg-white py-[12px] pl-[42px] pr-[14px] text-[16px] leading-[24px] text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus:outline-none focus:ring-0 focus:border-[#D0D5DD]
               [appearance:textfield]
               [&::-webkit-search-cancel-button]:hidden
               [&::-webkit-search-decoration]:hidden
               [&::-webkit-search-results-button]:hidden
               [&::-webkit-search-results-decoration]:hidden"
              aria-label="Search frequently asked questions"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

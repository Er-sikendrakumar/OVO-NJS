import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  stateLabel: string;
  cityLabel?: string; // optional now
}

export default function Breadcrumb({ stateLabel, cityLabel }: BreadcrumbProps) {
  return (
     <div className="flex flex-row items-left gap-[6px]">

      {/* Static "Locations" */}
      <span className="font-inter  font-semibold text-[14px] leading-[20px] text-[#717680]">Locations</span>

      <ChevronRight className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#A4A7AE]" />

      {/* State */}
      <span className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0] text-[#026AA2] capitalize">
        {stateLabel}
      </span>

      {/* City only if available */}
      {cityLabel && (
        <>
          <ChevronRight className="w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[#A4A7AE]" />
          <span className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0] text-[#026AA2] capitalize">
            {cityLabel}
          </span>
        </>
      )}
    </div>
  );
}

import React from "react";

export interface OverviewTextWithMapProps {
  overviewData: any;
  reversed?: boolean;
}

export default function OverviewTextWithMap({ overviewData, reversed = false }: OverviewTextWithMapProps) {
  const mapZoom = overviewData.map?.zoom ?? 14;
  const lat = overviewData.map?.lat ?? 28.5384;
  const lng = overviewData.map?.lng ?? -81.3789;

  return (
    <section className="flex pt-[20px] max-w-[1280px] w-full mx-auto lg:pt-[0px] pb-[30px]">
      <div
        className={`lg:px-[32px] md:flex-row px-[16px] flex flex-col lg:gap-[64px] gap-[32px] w-full ${
          reversed ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* LEFT COLUMN */}
        <div className="w-full max-w-full md:max-w-[48%] lg:max-w-[592px] flex flex-col">
          <span className="font-inter font-semibold lg:text-[36px] pb-[24px] text-[30px] leading-[38px] lg:leading-[44px] lg:tracking-[-0.72px] text-[#101828]">
            {overviewData.heading}
          </span>
          <p className="font-inter font-normal lg:text-[18px] text-[18px] leading-[28px] text-[#535862]">
            {overviewData.body}
          </p>
        </div>

        {/* MAP */}
        <div className="w-full max-w-full md:max-w-[48%] lg:max-w-[560px] flex flex-col bg-[#F2F4F7] p-[16px] lg:p-[32px]">
          <iframe
            title={`Map of ${overviewData.map?.city || overviewData.heading}`}
            className="w-full h-full border-0 sm:min-h-[224px] lg:min-h-[300px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${lat},${lng}&z=${mapZoom}&output=embed`}
          />
        </div>
      </div>
    </section>
  );
}

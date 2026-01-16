"use client";

import Image from "next/image";

interface FeaturesBoxLocationsNonOpusProps {
  features: string[];
}

const FEATURE_ICONS = [
  "/assets/locarion-map-icon.svg",
  "/assets/mail-box-icon.svg",
  "/assets/profile-card-icon.svg",
];

export const FeaturesBoxLocationsNonOpus = ({
  features,
}: FeaturesBoxLocationsNonOpusProps) => {

  return (
    <div className="inline-flex flex-col w-full lg:max-w-[592px] self-stretch items-start gap-3 md:gap-[24px] px-4 md:px-0 md:pl-0 md:pr-0 py-3">
      <p className="text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-normal text-[#475467]">
        Secure a premier address for your business, boosting its image and
        privacy without sacrificing your convenience or security. No hidden
        fees.
      </p>

      <div className="flex w-full gap-auto flex-row lg:items-start lg:justify-between">
        <div className="flex w-full flex-col gap-6 max-w-[460px]">
          <div className="features-list flex flex-col gap-[8px] md:gap-[12px] md:w-full">
            {features.map((feature, index) => {
              // On mobile: hide items after index 2 unless showAll is true
              // On desktop (lg+): always show all items
              const iconSrc = FEATURE_ICONS[index] ?? FEATURE_ICONS[0];

              return (
                <div
                  key={`${feature}-${index}`}
                  className="flex items-center gap-[4px] md:gap-[10px] min-h-[25px] md:min-h-auto"
                >
                  <div className="flex-shrink-0 h-6 w-6 md:w-8 md:h-8 rounded-full flex items-center justify-center">
                    <Image
                      src={iconSrc}
                      alt="Check Icon"
                      loading="lazy"
                      width={32}
                      height={32}
                      className="lg:min-w-[32px] lg:min-h-[32px] lg:w-[32px] lg:h-[32px]
                        min-w-[23px] min-h-[23px] w-[23px] h-[23px]
                        object-contain
                        lg:max-w-[32px] lg:max-h-[32px]
                        max-w-[24px] max-h-[24px]"
                    />
                  </div>
                  <span className="text-[15px] leading-[22.5px] lg:text-lg font-normal text-[#475467]">
                    {feature}
                  </span>
                </div>
              );
            })}           
          </div>
          <span className="hidden sm:inline font-semibold text-[24px] leading-[32px] text-[#475467]">
            All for only <span className="text-[#0086C9] font-bold">$59</span>
            /month
          </span>
        </div>

        <div className="flex flex-col py-[4px]  items-start gap-[12px] lg:gap-auto  justify-start lg:justify-center sm:pb-1 lg:pt-1 min-w-[78px]">
          <Image
            src="/locations/review-companies-1.svg"
            alt="BBB A+ rating"
            width={130}
            height={46}
            className="w-[78px] h-[27px] lg:w-[131px] lg:h-[46px]"
          />
          <Image
            src="/locations/review-companies-2.svg"
            alt="Trustpilot"
            width={131}
            height={61}
            className="w-[78px] h-[36px] lg:w-[131px] lg:h-[61px]"
          />
          <Image
            src="/locations/review-companies-3.svg"
            alt="Google rating"
            width={130}
            height={46}
            className="w-[78px] h-[28px] lg:w-[131px] lg:h-[46px]"
          />
        </div>
      </div>
    </div>
  );
};

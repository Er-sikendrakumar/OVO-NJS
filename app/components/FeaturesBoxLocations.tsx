'use client';
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface FeaturesBoxLocationsProps {
  features: string[];
}

export const FeaturesBoxLocations = ({ features }: FeaturesBoxLocationsProps) => {
  const [showAll, setShowAll] = useState(false);

  // Check if there are more than 3 features to show the button
  const hasMoreFeatures = features.length > 3;

  return (
    <div className="inline-flex flex-col w-full lg:max-w-[418px] self-stretch items-start gap-3 sm:gap-2.5 pl-0 pr-0 py-0">
      <p className="font-text-sm-text-md-regular font-[number:var(--text-sm-text-md-regular-font-weight)] text-gray-600 text-[length:var(--text-sm-text-md-regular-font-size)] tracking-[var(--text-sm-text-md-regular-letter-spacing)] leading-[var(--text-sm-text-md-regular-line-height)] [font-style:var(--text-sm-text-md-regular-font-style)]">
        When We Say <span className="font-semibold">All-Inclusive,</span><br />We Mean <span className="font-semibold">ALL-INCLUSIVE:</span>
      </p>

      <div className="features-list flex flex-col gap-[14px] mt-[10px] w-full">
        {features.map((feature, index) => {
          // On mobile: hide items after index 2 unless showAll is true
          // On desktop (lg+): always show all items
          const isHiddenOnMobile = !showAll && index >= 3;

          return (
            <div
              key={index}
              className={`feature-item flex items-center gap-3 ${isHiddenOnMobile ? 'lg:flex hidden' : 'flex'}`}
              data-testid={`feature-${index}`}
            >
              <Image
                className="feature-icon w-[22px] h-[22px] flex-shrink-0 object-contain opacity-100"
                alt="Check icon"
                src="/figmaAssets/check-icon.svg"
                width="22"
                height="22"
                loading="eager"
              />
              <span className="font-normal text-gray-600 text-base sm:text-sm md:text-[18px] leading-normal">
                {feature}
              </span>
            </div>
          );
        })}

        {/* Show All Features Button - Only visible on mobile when there are more than 3 features */}
        {hasMoreFeatures && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="see-all-features feature-item lg:hidden flex items-center gap-3 text-[#475467] text-base font-normal hover:text-[#026AA2] transition-colors"
            data-testid="see-all-features-button"
          >
            <Image
              src="/locations/chevron-down-double.svg"
              alt="Chevron Down"
              width="22"
              height="22"
              className="feature-icon w-[22px] h-[22px] opacity-80 object-contain flex-shrink-0"
            />
            <span>See All Features</span>
          </button>
        )}
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import { CirclePlus, MinusCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Feature = {
  title: string;
  description: string;
};
interface VirtualOfficeFeaturesProps {
  title: string;
  heading: string;
  content: string;
  contentHtml?: string;
  imagepath: string;
  features: Feature[];
}
export function VirtualOfficeFeatures({
  title,
  heading,
  content,
  contentHtml,
  imagepath,
  features,
}: VirtualOfficeFeaturesProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleFeature = (index: number) => {
    setActiveIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="w-full flex justify-center bg-white mb-[8px] lg:mb-[0px]">
      <div className="w-full max-w-[1280px] px-8 py-5 lg:py-10 mx-auto flex flex-col lg:flex-col gap-16 lg:gap-16 items-start">
        <div className="w-full  max-w-[768px] flex flex-col lg:flex-col gap-5 lg:gap-5 items-start">
          <div className="flex flex-col gap-3">
            <p className="text-[16px] font-semibold leading-[24px] text-[#026AA2]">
              {title}
            </p>

            <h2 className="text-[36px] leading-[44px] font-semibold tracking-[-0.72px] pb-2 text-[var(--colors-text-text-primary-900,#181D27)] [font-family:var(--Font-family-font-family-display,Inter)]">
              {heading}
            </h2>

            {contentHtml ? (
              <div
                className="text-[20px] leading-[30px] font-normal text-[#535862] [font-family:var(--Font-family-font-family-body,Inter)]"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <p className="text-[20px] leading-[30px] font-normal text-[#535862] [font-family:var(--Font-family-font-family-body,Inter)]">
                {content}
              </p>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row gap-16 lg:gap-16 flex-shrink-0 self-start">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col  gap-8  divide-y divide-[#E9EAEB]  border-[#E9EAEB]">
              {features.map((feature, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={feature.title}
                    className={`${index == 0 ? "pt-0" : "pt-6"}`}
                  >
                    <button
                      type="button"
                      className="w-full flex items-start justify-between gap-4 text-left cursor-pointer leading-[24px]"
                      onClick={() => toggleFeature(index)}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[#181D27] font-inter text-[16px] font-semibold leading-[24px]">
                          {feature.title}
                        </span>
                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.p
                              key="content"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.25, 0.1, 0.25, 1],
                              }}
                              className="text-[16px] font-normal leading-[24px] text-[#535862] lg:max-w-[536px] w-full"
                            >
                              {feature.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="flex h-6 !w-6 items-center justify-center text-[#A4A7AE]">
                        {isActive ? (
                          <MinusCircle className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <CirclePlus className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-full h-auto lg:h-full lg:max-w-[576px] flex-shrink-0 self-start">
            <div
              className="
                relative w-full min-h-[366px] lg:min-h-[348px] h-full rounded-[16px] bg-[#F5F5F5] mx-auto
                bg-cover bg-center bg-no-repeat
              "
              style={{ backgroundImage: `url(${imagepath})` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}

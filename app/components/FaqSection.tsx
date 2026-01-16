"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus, MinusCircle } from "lucide-react";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data?: FAQItem[];
}

export function FaqSection({ data = [] }: FaqSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="flex pt-[0px] flex-col w-full max-w-[1280px] sm:px-8 py-0 justify-center items-center gap-6 md:gap-8 px-[16px] lg:px-[32px] lg:pt-[30px] pb-[30px] md:pb-[40px] lg:pb-[30px]">
      <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[64px] w-full">
        {/* Left side */}
        <div className="w-full flex flex-col gap-[16px] lg:gap-[20px]">
          <div className="flex flex-col gap-[12px]">
            <span className="font-semibold font-inter lg:text-[16px] text-[14px] text-[#026AA2] leading-[24px] tracking-[0]">
              Curious About Renting a Virtual Office?
            </span>
            <h3 className="text-[#101828] font-semibold font-inter lg:text-[36px] text-[30px] leading-[44px] tracking-[-0.725px]">
              FAQs
            </h3>
          </div>

          <p className="text-[#475467] font-normal font-inter text-[18px] leading-[28px] tracking-[0]">
            Explore how a virtual office can elevate your business presence while offering unparalleled flexibility. Tailored solutions await you.
          </p>

          <div className="flex-row gap-[20px] items-center lg:flex hidden">
            <Link
              href="tel:+18888989868"
              className="flex items-center justify-center text-center text-white font-semibold font-inter text-[16px] leading-[100%] tracking-[0] py-[12px] px-[20px] min-h-[48px] rounded-[8px] bg-[#36BFFA] hover:bg-[#026AA2] transition-colors"
            >
              <span>Call Us</span>
            </Link>
            <span className="text-[#475467] font-inter font-semibold leading-[24px] tracking-[0] text-[16px]">
              1 (888) 898 - 9868
            </span>
          </div>
        </div>

        {/* Right side (FAQ list) */}
        <div className="w-full flex flex-col gap-[24px] lg:gap-[32px]">
          {data.length === 0 ? (
            <p className="text-[#475467] font-normal font-inter text-[16px] leading-[140%] tracking-[0]">
              No FAQs available at this time.
            </p>
          ) : (
            data.map(({ question, answer }, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className="flex flex-col gap-[12px]">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex flex-row gap-[24px] justify-between items-start lg:items-center cursor-pointer focus:outline-none"
                  >
                    <span className="font-medium font-inter text-[18px] text-[#101828] leading-[28px] text-left">
                      {question}
                    </span>
                    {isActive ? (
                      <MinusCircle className="text-[#98A2B3] w-[24px] h-[24px] min-w-[24px] min-h-[24px] transition-transform duration-300" />
                    ) : (
                      <CirclePlus className="text-[#98A2B3] w-[24px] h-[24px] min-w-[24px] min-h-[24px] transition-transform duration-300" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <p className="text-[#475467] font-normal font-inter text-[16px] leading-[140%] tracking-[0] mt-[8px]">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        <div className="flex-col gap-[20px] items-center lg:hidden flex">
          <Link
            href="tel:+18888989868"
            className="text-white w-full justify-center text-center font-semibold font-inter text-[16px] leading-[100%] tracking-[0] py-[12px] px-[20px] rounded-[8px] bg-[#36BFFA] hover:bg-[#026AA2] transition-colors"
          >
            Call Us
          </Link>
          <span className="text-[#475467] font-inter font-semibold leading-[100%] tracking-[0] text-[16px]">
            1 (888) 898 - 9868
          </span>
        </div>
      </div>
    </section>
  );
}


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CirclePlus, MinusCircle } from "lucide-react";
import Link from "next/link";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FaqSectionForSupportProps {
  data?: FAQItem[];
}

export function FaqSectionForSupport({ data = [] }: FaqSectionForSupportProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="flex w-full  flex-col py-8 justify-center items-center bg-[#F2F4F7] gap-6 md:gap-8 md:py-8 ">
      <div className=" max-w-[1280px] flex flex-col gap-[48px] lg:gap-[48px] w-full px-[16px] lg:px-[32px]">
        {/* Left side */}
        <div className="w-full flex flex-col gap-[16px]">
          <div className="flex flex-col gap-3">
            <span className="font-semibold font-inter text-[14px] text-[#026AA2] leading-[20px]">
              Support
            </span>
            <h3 className="text-[#101828] font-semibold font-inter text-[30px] leading-[38px]">
              FAQs
            </h3>
          </div>

          <p className="text-[#475467] font-normal font-inter text-[18px] leading-[28px]">
            Explore how a virtual office can elevate your business presence
            while offering unparalleled flexibility. Tailored solutions await
            you.
          </p>
        </div>

        {/* Right side (FAQ list) */}
        <div className="w-full flex flex-col gap-[32px]">
          {data.length === 0 ? (
            <p className="text-[#475467] font-normal font-inter text-[16px] leading-[140%]">
              No FAQs available at this time.
            </p>
          ) : (
            data.map(({ question, answer }, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className="flex flex-col gap-[8px]">
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
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        <p className="text-[#475467] font-normal font-inter text-[16px] leading-[24px] tracking-[0]">
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
      </div>
    </section>
  );
}

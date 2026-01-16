'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const MinusCircleIcon = '/assets/minus-circle-icon.svg';
const CirclePlusIcon = '/assets/plus-circle-icon.svg';

export interface FAQItem {
  question: string;
  answer: string;
  linkText?: string;
  linkUrl?: string;
}

interface FAQSectionProps {
  data?: FAQItem[];
}

export function FAQSection({ data = [] }: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Render answer as HTML (already cleaned server-side)
  const renderAnswer = (answer: string) => {
    return (
      <div
        className="font-normal text-[#B9E6FE] text-[16px] leading-[24px] mt-[4px] w-[calc(100%-32px)] [&_p]:mb-2 [&_a]:underline [&_a]:hover:no-underline"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    );
  };

  return (
    <section className="flex w-full bg-[#065986] py-[64px] md:py-20 lg:py-24">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row w-full gap-[48px] lg:gap-[64px]">
          {/* Left side - Title and Description */}
          <div className="flex flex-col gap-0 w-full lg:flex-1">
            <div className="flex flex-col gap-0">
              <span className="font-semibold text-[14px] text-[#B9E6FE] leading-[20px] mb-[12px] lg:text-[16px] lg:leading-[24px]">
                Support
              </span>
              <h2 className="font-semibold text-[30px] text-[#FFFFFF] leading-[38px] mb-[16px] lg:text[36px] lg:leading-[44px] lg:tracking-[-0.72px] lg:mb-[20px]">
                FAQs
              </h2>
              <p className="font-normal text-[18px] text-[#B9E6FE] leading-[28px] mb-[0px]">
                Everything you need to know about securing your corporate business presence.
              </p>
            </div>
          </div>

          {/* Right side - FAQ list */}
          <div className="flex flex-col gap-[16px] w-full lg:flex-1 lg:gap-[0px]">
            {data.length === 0 ? (
              <p className="font-semibold text-white text-[16px] leading-[24px] m-[0px]">
                No FAQs available at this time.
              </p>
            ) : (
              data.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={`flex flex-col rounded-[16px] transition-colors ${
                      isActive
                        ? 'bg-[#026AA2] p-[28px] lg:p-[32px]'
                        : 'p-[20px] lg:p-[24px]'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex flex-row gap-[8px] justify-between items-start cursor-pointer focus:outline-none w-full text-left"
                    >
                      <span
                        className={`font-semibold text-white text-[16px] leading-[24px] m-[0px] ${
                          isActive ? 'text-white' : ''
                        }`}
                      >
                        {item.question}
                      </span>
                      <div className="flex-shrink-0">
                        {isActive ? (
                           <Image
                              src={MinusCircleIcon}
                              alt="Get Your Office Solution"
                              height={24}
                              width={24}
                            />
                        ) : (
                           <Image
                              src={CirclePlusIcon}
                              alt="Get Your Office Solution"
                              height={24}
                              width={24}
                            />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className="overflow-hidden"
                        >
                          {renderAnswer(item.answer)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


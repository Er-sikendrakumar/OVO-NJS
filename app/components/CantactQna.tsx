"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { MinusCircle, PlusCircle } from "lucide-react";

export type ContactFaq = { question: string; answer: string };

export function CantactQna({
  btnText = "",
  faqs = [],
}: {
  btnText?: string;
  faqs?: ContactFaq[];
}) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="flex flex-col w-full gap-8 sm:gap-12 md:gap-16 px-0 py-10 sm:py-8 md:py-[40px] lg:py-10 bg-basewhite items-center">
      <motion.div
        className="flex flex-col lg:flex-row items-start gap-16 md:gap-8 sm:gap-16 lg:gap-16 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col w-full lg:max-w-screen-md items-start gap-5 flex-1"
          variants={fadeInUp}
        >
          <div className="flex flex-col items-start gap-3 w-full">
            <h3 className="text-[24px] leading-[32px] md:text-[36px] md:leading-[44px] tracking-normal md:tracking-[-0.72px] max-w-full lg:max-w-[480px] w-full text-[#181d27] font-semibold">
              Curious About Renting a Virtual Office?
            </h3>
          </div>

          <p className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)]">
            Explore how a virtual office can elevate your business presence
            while offering unparalleled flexibility. Tailored solutions await
            you.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full">
            <a href="tel:+18888989868" className="w-full sm:w-auto">
              <Button
                className=" h-[36px] md:h-[48px] inline-flex items-center justify-center gap-1.5 px-3 md:px-[18px] py-2 md:py-3 w-full sm:w-auto bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] font-semibold text-white"
                data-testid="button-talk-expert"
              >
                {btnText || "Talk to an expert"}
              </Button>
            </a>

            <div className="gap-2 inline-flex items-center justify-center">
              <a
                href="tel:+18888989868"
                className="font-text-xl-semibold font-[number:var(--text-xl-semibold-font-weight)] text-gray-600 text-[length:var(--text-xl-semibold-font-size)] tracking-[var(--text-xl-semibold-letter-spacing)] leading-[var(--text-xl-semibold-line-height)] [font-style:var(--text-xl-semibold-font-style)] hover:text-[#181d27] transition-colors"
              >
                1 (888) 898 - 9868
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col w-full items-start gap-6 sm:gap-8 flex-1"
          variants={fadeInUp}
        >
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-8  w-full"
          >
            {(faqs || []).map((item, index) => (
              <AccordionItem
                key={`${item.question}-${index}`}
                value={`item-${index}`}
                className="border-0"
                data-testid={`faq-${index}`}
              >
                <AccordionTrigger className="flex items-start justify-between gap-6 w-full hover:no-underline py-0 [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
                  <p className="font-text-xl-medium font-[number:var(--text-xl-medium-font-weight)] text-[#181d27] text-[length:var(--text-xl-medium-font-size)] tracking-[var(--text-xl-medium-letter-spacing)] leading-[var(--text-xl-medium-line-height)] [font-style:var(--text-xl-medium-font-style)] text-left flex-1">
                    {item.question}
                  </p>
                  <div className="relative inline-flex items-start pt-0.5 pb-0 px-0 shrink-0 w-6 h-6">
                    <PlusCircle className="plus-icon w-6 h-6 text-[#98A2B3] absolute top-0 left-0" />
                    <MinusCircle className="minus-icon w-6 h-6 text-[#98A2B3] absolute top-0 left-0" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-0 max-w-[calc(100%-48px)] md:max-w-[528px] w-full">
                  <p className="text-base text-[#475467] font-normal">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}

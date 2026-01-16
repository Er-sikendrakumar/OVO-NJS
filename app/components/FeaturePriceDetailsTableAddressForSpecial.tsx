"use client";
import Link from "next/link";

import {
  ComparisonData,
  ComparisonTableSpecial,
} from "./SpecialFeatureComparisonTable";
import { useRouter } from "next/navigation";

type Testimonial = {
  author: string;
  source: string;
  avatar: string;
  content: string;
};

type AnalysisBlock = {
  type: string;
  content: string;
};

type Cta = {
  title: string;
  pricing_text: string;
  pricing_subtitle: string;
  button_text: string;
  secondary_button_text?: string;
  secondary_button_url?: string;
};

type FeaturePriceDetailsTableAddressProps = {
  isSpecial?: boolean;
  content: {
    testimonial: Testimonial;
    analysis: AnalysisBlock[];
    comparison: ComparisonData;
    footnote?: string;
    cta: Cta;
  };
};

export function FeaturePriceDetailsTableAddressForSpecial({
  isSpecial,
  content,
}: FeaturePriceDetailsTableAddressProps) {
  const { testimonial, analysis, comparison, footnote, cta } = content;
  const IMAGE_URL = "https://www.opusvirtualoffices.com";
  const ctaLabel = cta.secondary_button_text || cta.button_text;
  const ctaHref = cta.secondary_button_url || "#";
  const router = useRouter();

  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-8 pb-[10px] md:pt-10 md:pb-[50px]">
      <div className="w-full">
        <div className="flex flex-col gap-[18px] md:gap-8 items-start w-full pt-[40px] md:pt-0">
          <div className="flex items-center gap-4">
            {!isSpecial && (
              <div className="h-14 w-14 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={IMAGE_URL + testimonial.avatar}
                  alt={testimonial.author}
                  width="56"
                  height="56"
                  className="h-14 w-14 object-cover"
                />
              </div>
            )}

            <div className={isSpecial ? "flex flex-col gap-4" : ""}>
              <div
                className={`${
                  isSpecial
                    ? "text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-[#101828]"
                    : "text-[18px] leading-[28px] font-semibold text-[#101828]"
                }`}
              >
                {isSpecial ? "Competitor Comparison" : testimonial.author}
              </div>
              <div
                className={`${
                  isSpecial
                    ? "text-[18px] leading-7 font-normal text-[#475467]"
                    : "text-[16px] leading-6 font-normal text-[#475467]"
                }`}
              >
                {isSpecial
                  ? "See how we beat the competition"
                  : testimonial.source}
              </div>
            </div>
          </div>
          {!isSpecial && (
            <p className="text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-normal text-[#475467] tracking-[-0.01px]">
              {testimonial.content}
            </p>
          )}
          <div className="max-w-full w-full">
            <ComparisonTableSpecial
              comparison={comparison}
              footnote={footnote}
            />
            <div className="flex w-full justify-center">
              <button
                onClick={() => router.push("/signup/?btn=104")}
                className="w-full md:w-auto rounded-[8px] bg-[#36BFFA] py-2 md:py-4 px-3  md:px-5 text-[14px] font-semibold leading-[20px] md:text-[18px] md:font-semibold md:leading-[28px] text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#026aa2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/50"
              >
                Get Started
              </button>
            </div>
          </div>
          <div
            className={
              isSpecial
                ? "hidden"
                : "w-full flex flex-col gap-[12px] md:gap-[18px]"
            }
          >
            {footnote ? (
              <p className="text-[18px] leading-7 text-[#475467]">{footnote}</p>
            ) : null}
            {analysis.map((entry, index) => (
              <p
                key={`${entry.type}-${index}`}
                className={`text-[18px] leading-[28px] font-normal text-[#475467] ${
                  index === 0 ? "tracking-[-0.1px]" : ""
                }`}
              >
                {entry.content}
              </p>
            ))}
          </div>
          <Link
            href={ctaHref}
            className={
              isSpecial
                ? "hidden"
                : `w-auto bg-[#36BFFA] hover:bg-[#026aa2] text-white text-[16px] leading-6 font-semibold rounded-[8px] px-4 py-[10px]`
            }
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

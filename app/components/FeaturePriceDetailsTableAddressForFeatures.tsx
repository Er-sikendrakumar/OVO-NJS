import Link from "next/link";

import { ComparisonData, ComparisonTable } from "./FeatureComparisonTableForFeatures";

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
  content: {
    testimonial: Testimonial;
    analysis: AnalysisBlock[];
    comparison: ComparisonData;
    footnote?: string;
    cta: Cta;
  };
};

export function FeaturePriceDetailsTableAddress({
  content,
}: FeaturePriceDetailsTableAddressProps) {
  const { testimonial, analysis, comparison, footnote, cta } = content;
  const IMAGE_URL = "https://www.opusvirtualoffices.com";
  const ctaLabel = cta.secondary_button_text || cta.button_text;
  const ctaHref = cta.secondary_button_url || "#";

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-8 pb-6 lg:pt-10">
      <div className="w-full">
        <div className="flex flex-col gap-6 items-start w-full">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={IMAGE_URL + testimonial.avatar}
                alt={testimonial.author}
                width="56"
                height="56"
                className="h-14 w-14 object-cover"
              />
            </div>

            <div>
              <div className="text-[18px] leading-[28px] font-semibold text-[#101828]">
                {testimonial.author}
              </div>
              <div className="text-[16px] leading-6 font-normal text-[#475467]">
                {testimonial.source}
              </div>
            </div>
          </div>

          <p className="text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-normal text-[#475467] tracking-[-0.01px]">
            {testimonial.content}
          </p>
          <div className="max-w-full w-full">
            <ComparisonTable comparison={comparison} footnote={footnote} />
          </div>
          <div className="w-full flex flex-col gap-[12px] md:gap-[18px]">
            {footnote ? (
              <p className="text-[18px] leading-7 text-[#475467]">
                {footnote}
              </p>
            ) : null}
            {analysis.map((entry, index) => (
              <p
                key={`${entry.type}-${index}`}
                className={`text-[18px] leading-[28px] font-normal text-[#475467] ${index === 0 ? "tracking-[-0.1px]" : ""}`}
              >
                {entry.content}
              </p>
            ))}
          </div>
          <Link
            href={ctaHref}
            className="w-auto bg-[#36BFFA] hover:bg-[#026AA2] text-white text-[16px] leading-6 font-semibold rounded-[8px] px-4 py-[10px]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

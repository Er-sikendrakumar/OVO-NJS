'use client';

import svgPaths from "./svg-8oti69iwwe";
import imgImage from "figma:asset/0a73891abf8f061a7ac27b17aacca13aad5f2eea.png";

function HeadingAndSupportingText() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[20px] grow items-start max-w-[768px] min-h-px min-w-[480px] not-italic relative shrink-0" data-name="Heading and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[44px] relative shrink-0 text-[#181d27] text-[36px] tracking-[-0.72px] w-full">Top Premium Locations</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#535862] text-[20px] w-full">Browse our most popular prestigious virtual office locations throughout the USA.</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-start flex flex-wrap gap-[32px] items-start justify-between relative shrink-0 w-full" data-name="Content">
      <HeadingAndSupportingText />
    </div>
  );
}

function NameAndStars() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Name and stars">
      <p className="font-['Inter:Semibold',sans-serif] leading-[32px] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]">{`{city}, {stateAbbr}`}</p>
    </div>
  );
}

function TextAndSupportingText() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic relative shrink-0 text-white w-full" data-name="Text and supporting text">
      <p className="font-['Inter:Semibold',sans-serif] leading-[24px] relative shrink-0 text-[16px] w-full">
        {`{address_line1}`}
        <br aria-hidden="true" />
        {`{suite#}`}
      </p>
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] w-full">{`{city}, {state} {zip}`}</p>
    </div>
  );
}

function AttributionCard() {
  return (
    <div className="backdrop-blur-md backdrop-filter bg-[rgba(255,255,255,0.3)] relative rounded-[16px] shrink-0 w-full" data-name="Attribution card">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start p-[20px] relative w-full">
          <NameAndStars />
          <TextAndSupportingText />
        </div>
      </div>
    </div>
  );
}

function QuoteImageBottomPanel() {
  return (
    <div className="absolute bg-gradient-to-b bottom-0 box-border content-stretch flex flex-col from-[rgba(0,0,0,0)] items-center justify-center left-0 pb-[16px] pt-[96px] px-[16px] right-0 to-[rgba(0,0,0,0.4)]" data-name="_Quote image bottom panel">
      <AttributionCard />
    </div>
  );
}

function Image() {
  return (
    <div className="h-[480px] relative shrink-0 w-[360px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
      <QuoteImageBottomPanel />
    </div>
  );
}

function Testimonials() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Testimonials">
      {[...Array(6).keys()].map((_, i) => (
        <Image key={i} />
      ))}
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-left">
          <path d={svgPaths.pbf7d180} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TestiomonialCarouselArrow() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="_Testiomonial carousel arrow">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <ArrowLeft />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow-right">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow-right">
          <path d={svgPaths.p39396800} id="Icon" stroke="var(--stroke-0, #A4A7AE)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function TestiomonialCarouselArrow1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative rounded-[9999px] shrink-0 size-[56px]" data-name="_Testiomonial carousel arrow">
      <div aria-hidden="true" className="absolute border border-[#e9eaeb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <ArrowRight />
    </div>
  );
}

function Arrows() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-name="Arrows">
      <TestiomonialCarouselArrow />
      <TestiomonialCarouselArrow1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-name="Content">
      <Testimonials />
      <Arrows />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="max-w-inherit size-full">
        <div className="box-border content-stretch flex flex-col gap-[64px] items-start max-w-inherit px-[32px] py-0 relative w-full">
          <Content />
          <Content1 />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[40px] relative size-full" data-name="Testimonial section">
      <Container />
    </div>
  );
}
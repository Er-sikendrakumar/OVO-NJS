import Link from "next/link";

const googleMapsIcon = "/assets/google-maps-icon.svg";

interface IndustryHeroBannerProps {
  heading: string;
  descriptionHtml: string;
  image: string;
}

export function IndustryHeroBanner({
  heading,
  descriptionHtml,
  image,
}: IndustryHeroBannerProps) {
  return (
    <section className="flex w-full justify-center bg-white pt-5 pb-2 md:pt-10 md:pb-12">
      <div className="flex w-full max-w-[1280px] mx-auto flex-col gap-16 lg:flex-row lg:items-center md:gap-8 lg:gap-8 px-4 lg:px-8">
        <div className="flex flex-col gap-8 lg:gap-12 lg:max-w-[672px] w-full">
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-6">
            <h1 className="text-[36px] leading-[44px] tracking-[-0.72px] font-semibold text-[#181d27] md:text-[48px] md:leading-[56px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.2px]">
              {heading}
            </h1>
            <div
              className="max-w-full md:max-w-[560px] w-full text-[18px] leading-[28px] text-[#535862] md:text-[20px] md:leading-[30px]"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>

          <div className="max-w-full md:max-w-[540px] flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:gap-4">
              <div className="relative flex-1">
                <label htmlFor="location-search" className="sr-only">
                  Search for Zip, State, or City
                </label>
                <div className="flex items-center rounded-[8px] border border-[#d0d5dd] bg-white px-[14px] h-[48px] py-[12px] text-base text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                  <img src={googleMapsIcon} alt="" className="h-5 w-5" loading="lazy" />
                  <input
                    id="location-search"
                    type="text"
                    placeholder="Search for Zip, State, or City"
                    className="ml-3 w-full border-none bg-transparent text-[16px] leading-[24px] text-[#475467] placeholder:text-[#667085] focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-[48px] items-center justify-center hidden md:block rounded-[10px] bg-[#36BFFA] py-3 px-[18px] text-[16px] font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#0f9cdc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f9cdc] sm:w-auto"
              >
                Get Started
              </button>
            </div>
            <Link
              href="/our-top-locations/"
              prefetch={false}
              className="text-[14px] font-bold leading-[20px] text-[#475467] transition-colors hover:text-[#2e3a4b]"
            >
              Browse Our Top Locations
            </Link>
          </div>
        </div>

        <div className="max-w-full lg:max-w-[512px] w-full h-[510px] md:h-[640px] relative flex justify-center lg:justify-end">
          <div className="relative w-full rounded-none ">
            <img
              src={image}
              alt="Industry hero visual"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute lg:-bottom-[92px] xl:-bottom-[10px] lg:-left-[30px] xl:-left-[130px] hidden lg:block">
              <img
                src="/Hand-drawn-arrow.webp"
                alt="Arrow pointing to hero"
                className=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

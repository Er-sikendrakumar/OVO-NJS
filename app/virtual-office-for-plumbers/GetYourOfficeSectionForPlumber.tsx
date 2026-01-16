import Image from "next/image";
import Link from "next/link";

export function GetYourOfficeSectionForPlumber() {
  return (
    <section className="flex w-full pt-[60px] pb-[70px] md:py-20 lg:pt-[68px] lg:pb-[70px]">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse md:flex-row w-full bg-[#065986] rounded-[16px] md:rounded-[24px] overflow-hidden lg:min-h-[348px] lg:shadow-[0px_3px_3px_-1.5px_rgba(10,13,18,0.04),0px_8px_8px_-4px_rgba(10,13,18,0.03)]">
          {/* Content Section */}
          <div className="flex flex-col sm:gap-0 justify-center w-full lg:flex-1 p-6 py-[40px] px-[16px] pb-[40px] lg:py-[40px] lg:px-[64px]">
            <h2 className="font-semibold text-white text-[36px] leading-[44px] sm:text-[32px] tracking-[-0.72px] lg:text-[48px] sm:leading-[40px] lg:leading-[60px] lg:font-bold lg:tracking-[-0.96px] mb-[20px] lg:mb-[20px]">
              Get Your Office <br /> Solution Today!
            </h2>
            <p className="mb-[20px] text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] font-[600] text-[#B9E6FE] lg:mb-[20px] max-w-[540px]">
              Use promo code{" "}
              <span className="text-[#A6EF67] font-[700]">PLUMBER100</span> at
              the checkout and save{" "}
              <span className="text-white font-[700]">$100</span> setup fee.
            </p>

            <div>
              <Link
                href="/signup/?btn=967"
                prefetch={false}
                className="w-full sm:w-auto"
              >
                <button className="w-full h-[48px] sm:w-auto py-[12px] px-[18px] min-w-[129px] bg-white text-[#344054] font-semibold text-[16px] rounded-[8px] shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                  Get started
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-[40%] lg:w-[480px] min-h-[222px] md:min-h-[280px] lg:h-[348px]  sm:min-h-[350px] lg:min-h-full relative">
            <Image
              src="/plumberCta.webp"
              alt="Get Your Office Solution"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

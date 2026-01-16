import Image from "next/image";
import Link from "next/link";

export function GetYourOfficeSection() {
  return (
    <section className="flex w-full py-[64px] md:py-20 lg:py-[96px]">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row w-full bg-[#065986] rounded-[16px] md:rounded-[24px] overflow-hidden lg:min-h-[400px] lg:shadow-[0px_3px_3px_-1.5px_rgba(10,13,18,0.04),0px_8px_8px_-4px_rgba(10,13,18,0.03)]">
          {/* Content Section */}
          <div className="flex flex-col sm:gap-0 justify-center w-full lg:flex-1 p-6 py-[40px] px-[24px] pb-[48px] lg:py-[64px] lg:px-[64px]">
            <h2 className="font-semibold text-white text-[30px] sm:text-[32px] lg:text-[36px] leading-[38px] sm:leading-[40px] lg:leading-[44px] lg:tracking-[-0.72px] mb-[16px] lg:mb-[20px]">
              Get Your Office Solution Today!
            </h2>
            <p className="text-[#B9E6FE] font-[700] text-[20px] leading-[30px] tracking-[0px] mb-[32px] lg:mb-[48px]">
              Business Address for only $59/Month{" "}
              <span className=" font-[400]">- No Hidden Fees</span>
            </p>
            <div>
              <Link
                href="/signup/?btn=9471&sutype=mail"
                prefetch={false}
                className="w-full sm:w-auto"
              >
                <button className="w-full h-[48px] sm:w-auto py-[12px] px-[20px] min-w-[129px] bg-white text-[#344054] font-semibold text-[16px] rounded-[8px]">
                  Get started
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-shrink-0 w-full md:w-[40%] lg:w-[480px] min-h-[280px] lg:h-[400px]  sm:min-h-[350px] lg:min-h-[400px] relative">
            <Image
              src="/assets/getoffer.webp"
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

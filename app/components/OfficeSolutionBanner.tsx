"use client";

import Image from "next/image";
import { ReactNode } from "react";

type OfficeSolutionBannerProps = {
  title?: string;
  description?: ReactNode;
};

export default function OfficeSolutionBanner({
  title = "Looking for a full corporate presence?",
  description = "Go with our all-inclusive $99/mo Ultimate Office solution",
}: OfficeSolutionBannerProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <section className="w-full flex justify-center">
        <div className="max-w-[1280px] w-full px-8 flex justify-center items-center">
          <div className="w-full flex rounded-[24px] overflow-hidden shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03),0_3px_3px_-1.5px_rgba(10,13,18,0.04)] max-md:flex-col">
            <div
              className="flex flex-col justify-center items-start gap-[48px] md:gap-[32px] lg:gap-[48px] flex-1 md:px-[32px] lg:px-[64px] py-0 bg-[#065986] text-white 
                            pt-10 px-6 pb-12 lg:pb-[48px]  xl:py-[64px] max-md:gap-[32px]"
            >
              <div className="flex flex-col items-start gap-[16px] lg:gap-[20px] self-stretch">
                <h2 className="text-[30px] leading-[38px] tracking-normal lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px] font-semibold text-white max-md:text-[30px] max-md:leading-[38px] max-md:font-semibold">
                  {title}
                </h2>

                {description ? (
                  <p className="text-[20px] font-normal leading-[30px]">
                    <span className="text-[20px] font-bold text-[#B9E6FE] md:font-bold leading-[30px]">
                      {description}
                    </span>
                  </p>
                ) : (
                  <p className="text-[20px] font-normal leading-[30px]">
                    <span className="text-[20px] font-bold text-[#B9E6FE] md:font-bold leading-[30px]">
                      All-inclusive $99/Month <span></span>
                    </span>
                    <span className="text-[#B9E6FE] text-[18px] leading-[28px] md:text-[20px]  lg:text-[20px] md:leading-[30px] !lg:leading-[30px]">
                      – No Hidden Fees
                    </span>
                  </p>
                )}
              </div>

              <a
                href="/virtual-office/"
                className="flex h-[48px] leading-[24px] justify-center items-center px-[18px] py-[12px] gap-[6px] rounded-[8px] border border-[#D0D5DD] bg-white
                                 shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-[#344054] text-[16px] font-semibold max-md:w-full max-md:text-[#414651]
                                 max-md:font-medium max-md:border-[#D5D7DA] max-md:shadow-[0_0_0_1px_rgba(10,13,18,0.18)_inset,0_-2px_0_rgba(10,13,18,0.05)_inset,0_1px_2px_rgba(10,13,18,0.05)]"
              >
                <span className={"hidden md:block"}>Get started</span>
                <span className={"md:hidden block"}>Learn more</span>
              </a>
            </div>

            <div className="w-full max-w-[480px] md:w-[50%]  min-h-[280px] lg:min-h-[400px] self-stretch relative max-md:w-full max-md:h-[280px]">
              <Image
                src="/opusOffice.webp"
                alt="Opus Virtual Office Building"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

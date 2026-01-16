"use client";

import Link from "next/link";
import { useState } from "react";

type PlumberVideoPlayerProps = {
  src: string;
  title?: string;
};

export function PlumberVideoPlayer({
  title = "Plumber service video",
  src = "",
}: PlumberVideoPlayerProps) {
  const [showAllMobile, setShowAllMobile] = useState(false);
  const features = [
    "Professional Live Call Answering",
    "Personalized Call Transferring",
    "Prestigious Business Address",
    "Business Phone/Fax Number",
    "Professional Mail Receipt",
    "Voicemail/Fax Converted to Email",
  ];
  const embedSrc = src || "https://www.youtube.com/embed/UwE4xFcg6nw?rel=0&modestbranding=1&autohide=1";

  return (
    <section className="w-full flex justify-center flex-col px-4 md:px-4 md:pb-[40px]">
      <div className="w-full max-w-[1024px] mx-auto pb-4 md:pb-5">
        <h1 className="order-1 md:order-1 text-[36px] leading-[44px] tracking-[-0.72px] md:text-[48px] md:leading-[60px] md:tracking-[-0.96px] text-[#0B4A6F] font-semibold text-start md:text-center">
          Never miss a call again. Grow your business
        </h1>
        <h2 className="order-1 md:order-1 text-[30px] leading-[38px] tracking-[-0.72px] font-medium md:text-[36px] md:leading-[44px] md:tracking-[-0.76px] text-[#0B4A6F] md:font-semibold text-start md:text-center">
          Watch video and see why every plumber needs this.
        </h2>
      </div>
      <div className="w-full max-w-[1024px] mx-auto md:px-8 flex flex-col gap-4 md:gap-6">
        <div className="order-2 md:order-2 w-full mx-auto md:pb-[12px]">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[12px] border border-black/10 bg-[lightgray] bg-cover bg-center bg-no-repeat shadow-[0_32px_64px_-12px_rgba(10,13,18,0.14),0_5px_5px_-2.5px_rgba(10,13,18,0.04)]">
            <iframe
              className="h-full w-full text-[20px] leading-[30px] font-normal"
              src={embedSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="order-5 md:order-3 w-full sm:hidden mt-4 md:mt-0">
          <div className="grid grid-cols-1 gap-y-2 md:gap-y-3 text-left text-[#334155]">
            {(showAllMobile ? features : features.slice(0, 3)).map(
              (feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E6F6FF] text-[#0EA5E9]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect width={24} height={24} rx={12} fill="#E0F2FE" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.0964 7.39004L9.93641 14.3L8.03641 12.27C7.68641 11.94 7.13641 11.92 6.73641 12.2C6.34641 12.49 6.23641 13 6.47641 13.41L8.72641 17.07C8.94641 17.41 9.32641 17.62 9.75641 17.62C10.1664 17.62 10.5564 17.41 10.7764 17.07C11.1364 16.6 18.0064 8.41004 18.0064 8.41004C18.9064 7.49004 17.8164 6.68004 17.0964 7.38004V7.39004Z"
                        fill="#36BFFA"
                      />
                    </svg>
                  </span>
                  <span className="text-[16px] leading-[24px]">{feature}</span>
                </div>
              )
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowAllMobile((current) => !current)}
            className="mt-2 md:mt-3 flex items-center gap-3 text-[#334155]"
            aria-expanded={showAllMobile}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center text-[#94A3B8] transition ${
                showAllMobile ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={12}
                height={14}
                viewBox="0 0 12 14"
                fill="none"
              >
                <path
                  d="M1 8L6 13L11 8M1 1L6 6L11 1"
                  stroke="#535862"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[16px] leading-[24px]">
              {showAllMobile ? "Hide Features" : "See All Features"}
            </span>
          </button>
        </div>

        <div className="order-4 md:order-4 hidden w-full grid-cols-1 gap-y-2 text-[#334155] py-2 sm:grid sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 justify-start"
            >
              <span className="flex items-start justify-center rounded-full bg-[#E6F6FF] text-[#0EA5E9]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect width={24} height={24} rx={12} fill="#E0F2FE" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.0964 7.39004L9.93641 14.3L8.03641 12.27C7.68641 11.94 7.13641 11.92 6.73641 12.2C6.34641 12.49 6.23641 13 6.47641 13.41L8.72641 17.07C8.94641 17.41 9.32641 17.62 9.75641 17.62C10.1664 17.62 10.5564 17.41 10.7764 17.07C11.1364 16.6 18.0064 8.41004 18.0064 8.41004C18.9064 7.49004 17.8164 6.68004 17.0964 7.38004V7.39004Z"
                    fill="#36BFFA"
                  />
                </svg>
              </span>
              <span className="text-[16px] leading-[24px]">{feature}</span>
            </div>
          ))}
        </div>

        <div className="order-5 w-full flex justify-center md:order-5">
          <div className="flex w-full max-w-[408px] md:max-w-[1024px] flex-col md:flex-row px-[0px] pt-[16px] md:pt-[12px] md:pb-[20px] items-center justify-center gap-8 md:gap-[8px]">
            <h2 className="w-full max-w-[408px] md:max-w-[678px] flex-1 font-inter text-[24px] leading-[32px]  md:text-[36px] font-semibold md:leading-[44px] md:tracking-[-0.72px] text-[#0B4A6F]">
              Live Call Answering,
              <span className="text-[#0086C9]"> Business Address </span>
              and more.
              <span className="text-[#17B26A]"> Only $99/mo. </span>
              No hidden fees.
            </h2>
            <Link
              href="/signup/?btn=966"
              className="h-[48px] max-w-full md:max-w-[274px] w-full flex md:h-[60px] items-center justify-center gap-[6px] rounded-[8px] bg-[#36BFFA] px-[18px] py-[12px] md:px-[20px] md:py-[16px] font-inter text-[16px] leading-6 md:text-[18px] font-semibold md:leading-[28px] text-white whitespace-nowrap"
            >
              Get started
            </Link>
          </div>
        </div>

        <p className="hidden order-3 md:order-6 text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-[#414651] max-w-[768px] mx-auto text-start md:text-center">
          Unlock your plumbing business's full potential with an Opus Virtual
          Offices! <br className="hidden md:none lg:block" /> All for $99 per
          month, all inclusive. Use code{" "}
          <span className="font-bold">plumber100</span> to waive the setup fee.
        </p>

        <div className="hidden order-6  flex-col items-center justify-center mt-4 md:mt-0 gap-3 md:gap-6 sm:flex-row">
          <a
            href="/signup/?btn=966"
            className="inline-flex min-w-[130px] h-12 items-center justify-center rounded-[8px] w-full md:w-auto bg-[#36BFFA] py-3 px-[18px] text-[16px] leading-6 font-semibold text-white  transition hover:bg-[#0EA5E9]"
          >
            Get Started
          </a>
          <a
            href="/virtual-office/"
            className=" inline-flex h-12 items-center justify-center rounded-[8px] w-full md:w-auto border border-[#D5D7DA] bg-white py-3 px-[18px] text-[16px] leading-6 font-semibold text-[#414651]
              shadow-[inset_0_0_0_1px_rgba(10,13,18,0.18),inset_0_-2px_0_rgba(10,13,18,0.05),0_1px_2px_rgba(10,13,18,0.05)] transition hover:border-[#94A3B8]"
          >
            Find your office location
          </a>
        </div>
      </div>

      <div className="flex max-w-[1053px] w-full mx-auto pt-3 md:pt-4 items-center justify-center">
        <h3 className="text-center text-[18px] leading-[28px] md:text-[36px] md:leading-[44px] tracking-[-0.72px] font-medium text-[#0086C9]">
          Use promo code <span className="font-bold">Plumber100</span> at signup
          to <br className="md:hidden"/> waive $100 setup fee
        </h3>{" "}
      </div>
    </section>
  );
}

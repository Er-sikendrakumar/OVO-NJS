"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

type LiveReceptionistHeroProps = {
  companyName?: string;
  priceText?: string;
  features?: string[];
  partnerCopy?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

const defaultFeatures = [
  "Never Miss a Call Again",
  "Professional Image for your Company",
  "Dedicated US-Based Live Receptionist",
  "Premium Call Transferring",
];

export default function LiveReceptionistHero({
  companyName: companyNameProp = "",
  priceText = "$79",
  features = defaultFeatures,
  partnerCopy = "Developed in partnership with Opus VO, this service will enable you to take your business to the next level.",
  primaryCta = {
    label: "Sign Up Now",
    href: "/sign-up/?locid=776&sutype=phone&acode=bocaexec",
  },
  secondaryCta = { label: "See Features", href: "#included-features" },
}: LiveReceptionistHeroProps) {
  const pathname = usePathname();
  const companyNameFromRoute = useMemo(() => {
    if (!pathname) {
      return "";
    }

    const segments = pathname.split("/").filter(Boolean);
    const liveIndex = segments.indexOf("live-receptionist");
    if (liveIndex === -1) {
      return "";
    }

    const rawName = segments[liveIndex + 1] ?? "";
    const decodedName = decodeURIComponent(rawName);
    const companyNameMap: Record<string, string> = {
      bocaexec: "Boca Exec",
    };
    const mappedName = companyNameMap[decodedName.toLowerCase()];
    const normalizedName = mappedName ?? decodedName.replace(/-/g, " ");
    if (!normalizedName) {
      return "";
    }

    return normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1);
  }, [pathname]);

  const companyName = companyNameProp || companyNameFromRoute;

  return (
    <section
      className="
    w-full py-[20px]
    bg-none
    lg:bg-[linear-gradient(270deg,rgba(255,255,255,0)_60.56%,#FFFFFF_81.18%),url('/hero2.png')]
    lg:bg-no-repeat
    lg:bg-[length:cover]
   lg:bg-[position:center]
  "
    >
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex w-full max-w-full md:max-w-[505px] gap-3 md:py-[52px] flex-col items-start md:gap-[20px]">
            <h1 className="text-[30px] leading-[38px] tracking-normal md:text-[36px] font-semibold md:leading-[44px] md:tracking-[-0.72px] text-[#182230]">
              {companyName} is now offering Live Call Answering as an additional
              service for only{" "}
              <span className="text-[#079455]">{priceText}</span>/month!
            </h1>

            <ul className="flex flex-col gap-0 list-disc pl-5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="font-inter text-[18px] leading-7 md:text-[20px] font-semibold md:leading-[30px] text-[#475467]"
                >
                  {feature}
                </li>
              ))}
            </ul>

            <p className="font-inter text-sm md:text-[18px] font-normal md:leading-[28px] text-[#475467]">
              {partnerCopy}
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 flex-col w-full md:w-auto md:flex-row">
              <a
                href={secondaryCta.href}
                className="flex items-center justify-center gap-[6px] px-[16px] py-[10px] rounded-[8px] border border-[#D0D5DD]
                  bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] h-11 text-[16px] font-semibold leading-[24px] text-[#344054]
                  hover:bg-gray-50 transition"
                onClick={(event) => {
                  const targetId = secondaryCta.href.replace("#", "");
                  const target = document.getElementById(targetId);
                  if (!target) {
                    return;
                  }
                  event.preventDefault();
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                {secondaryCta.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.5 10H7.5M17.5 5H7.5M17.5 15H7.5M4.17 10a.83.83 0 1 1-1.67 0 .83.83 0 0 1 1.67 0ZM4.17 5a.83.83 0 1 1-1.67 0 .83.83 0 0 1 1.67 0ZM4.17 15a.83.83 0 1 1-1.67 0 .83.83 0 0 1 1.67 0Z"
                    stroke="#344054"
                    strokeWidth="1.6667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              {/* Sign Up Now */}
              <a
                href={primaryCta.href}
                className="flex items-center justify-center gap-[6px] px-[16px] py-[10px] rounded-[8px] border border-[#079455] hover:border-[#cc181f]
                  bg-[#079455] shadow-[0_1px_2px_rgba(16,24,40,0.05)] h-11 text-[16px] font-semibold leading-[24px] text-white
                  hover:bg-[#cc181f] transition"
              >
                {primaryCta.label}
              </a>
            </div>
          </div>

          <div className="flex-1 hidden lg:block" />
        </div>
      </div>
    </section>
  );
}

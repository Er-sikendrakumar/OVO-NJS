import { Footer } from "@/app/components/Footer";
import LiveReceptionistDetails from "@/app/components/LiveReceptionist.Details";
import LiveReceptionistCTA from "@/app/components/LiveReceptionistCTA";
import LiveReceptionistHero from "@/app/components/LiveReceptionisthero";
import IncludedFeatures from "@/app/components/IncludedFeatures";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const metadata: Metadata = {
  title: "Live Receptionist – Opus Virtual Offices",
  description:
    "Professional live receptionist service from Opus Virtual Offices — expert call answering, message handling, and customer support starting at $79/month.",
};

type Affiliate = {
  acode: string;
  company_name: string;
  company_logo: string;
  locid: string;
  signup_link: string;
  page_url: string;
};

type AffiliateResponse = {
  success: boolean;
  data?: {
    affiliates?: Affiliate[];
  };
};

type OptionalUpgrade = {
  id?: number | string;
  title?: string;
  description?: string;
  order?: string | number;
};

async function loadAffiliateData() {
  const filePath = path.join(
    process.cwd(),
    "newsite/json/live-receptionist-affiliate.json"
  );
  const fileContents = await readFile(filePath, "utf-8");
  return JSON.parse(fileContents) as AffiliateResponse;
}

async function loadServicesData() {
  const filePath = path.join(process.cwd(), "newsite/json/services.json");
  const fileContents = await readFile(filePath, "utf-8");
  return JSON.parse(fileContents) as {
    data?: { optional_upgrades?: OptionalUpgrade[] };
  };
}

export default async function LiveReceptionistPage({
  params,
}: {
  params: Promise<{ companyname?: string }>;
}) {
  const { companyname = "" } = await params;
  const normalizedAcode = decodeURIComponent(companyname).toLowerCase();
  const affiliateData = await loadAffiliateData();
  const affiliates = affiliateData?.data?.affiliates ?? [];
  const matchedAffiliate = affiliates.find(
    (affiliate) => affiliate.acode.toLowerCase() === normalizedAcode
  );
  if (!matchedAffiliate) {
    notFound();
  }

  const servicesData = await loadServicesData();
  const optionalUpgrades = servicesData?.data?.optional_upgrades ?? [];
  const signupLink = matchedAffiliate.signup_link;
  const companyName = matchedAffiliate.company_name?.trim() || "";

  return (
    <main className="w-full bg-white pt-[72px] lg:pt-[104px]">
      <LiveReceptionistHero
        companyName={companyName}
        primaryCta={{ label: "Sign Up Now", href: signupLink }}
      />
      <LiveReceptionistCTA phoneNumber="866-993-2850" />
      <IncludedFeatures optionalUpgrades={optionalUpgrades} />
      <section
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-2.webp')",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-[64px] md:py-[40px]">
          <div className="flex flex-col gap-8 md:gap-6 lg:flex-row items-center lg:justify-between">
            <div className="max-w-[720px] flex flex-col items-left lg:items-start ">
              <h2 className="text-white text-[30px] leading-[38px] md:text-[36px] font-semibold md:leading-[44px] md:tracking-[-0.72px]">
                Never Miss a Call Again
              </h2>

              <p className="mt-4 md:mt-1 text-[#EAECF0] text-[18px] text-left lg:text-left leading-7 md:text-[20px] font-normal md:leading-[30px]">
                Enhance your business image with live call answering
              </p>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full md:w-auto">
              <a
                href="tel:+18669932850"
                className="flex items-center justify-center px-[22px] py-[16px] rounded-[8px] border border-[#D0D5DD] bg-white
                        shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-[#344054] h-[60px] text-[18px] font-semibold leading-[28px]
                        hover:bg-gray-100 transition w-full md:w-auto"
              >
                {" "}
                Call Us
              </a>

              <a
                href={signupLink}
                className="flex items-center justify-center gap-[10px] px-[22px] py-[16px] rounded-[8px] border border-[#079455] hover:border-[#cc181f]
                        bg-[#079455] shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-white text-[18px] h-[60px] font-semibold leading-[28px]
                        hover:bg-[#cc181f] transition w-full md:w-auto"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>

      <LiveReceptionistDetails />
      <section
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg-2.webp')",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-[32px] md:py-[45px]">
          <div className="flex flex-col gap-3 md:gap-6 lg:flex-row md:items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row items-center gap-1 md:gap-3">
              <h2 className="text-white text-[20px] leading-[30px] md:text-[30px] font-semibold md:leading-[38px]">
                Live Receptionist for only $79/month{" "}
              </h2>
              <p className="text-white text-sm md:text-[20px] md:leading-[30px] font-medium">
                no hidden fees
              </p>
            </div>

            <div className="flex flex-col items-center md:flex-row gap-4">
              <a
                href={signupLink}
                className="flex items-center justify-center w-fit gap-[10px] px-[16px] py-[10px] h-11 rounded-[8px] border border-[#079455]
                        bg-[#079455] shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-white text-[16px] font-semibold leading-[24px] hover:border-[#cc181f]
                        hover:bg-[#cc181f] transition"
              >
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

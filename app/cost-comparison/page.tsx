import { CompetitorPricingComparison } from "../components/CompetitorPricingComparison";
import { FindYourOfficeLocation } from "../components/FindYourOfficeLocation";
import { PriceDetailsTableAddress } from "../components/PriceDetailsTableAddress";
import { Footer } from "../components/Footer";
import fs from "fs";
import path from "path";
import BundleAndSaveForCostComparison from "../components/BundleAndSaveForCostComparison";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Opus Cost Comparison - Opus Virtual Offices",
  description:
    "Compare virtual vs. traditional office costs. See how Opus Virtual Offices saves you money while offering a professional business presence.",
};

export default function Page() {
  const phonebundlesdata = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/bundles_vo.json"),
      "utf-8"
    )
  );
  return (
    <main className="bg-white text-[#101828] pt-[72px] lg:pt-[104px]">
      <div className=" w-full pt-5 md:pt-10">
        <BundleAndSaveForCostComparison phonebundlesdata={phonebundlesdata} />
      </div>
      <CompetitorPricingComparison />
      <PriceDetailsTableAddress />
      <div className="pb-4 md:pb-[56px]">
        <FindYourOfficeLocation />
      </div>
      <Footer />
    </main>
  );
}

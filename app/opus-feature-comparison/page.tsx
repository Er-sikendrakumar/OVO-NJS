import { FeatureCompetitorComparison } from "../components/FeatureCompetitorComparison";
import { FeaturePriceDetailsTableAddress } from "../components/FeaturePriceDetailsTableAddressForFeatures";
import { Footer } from "../components/Footer";
import { FindYourOfficeLocation } from "../components/FindYourOfficeLocation";
import { FeatureComparisonFile } from "../lib/types/featureComparison";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default function Page() {
  const featureComparisonJson = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "newsite/json/feature-comparison.json"), "utf-8")
  ) as FeatureComparisonFile;
  const { data: featureComparisonContent } = featureComparisonJson;
  return (
    <main className="bg-white text-[#101828] pt-[72px] lg:pt-[104px]">
      <FeatureCompetitorComparison
        content={featureComparisonContent}
      />
      <FeaturePriceDetailsTableAddress
        content={featureComparisonContent}
      />
      <div className="pb-4 md:pb-[56px]">
        <FindYourOfficeLocation />
      </div>
      <Footer />
    </main>
  );
}

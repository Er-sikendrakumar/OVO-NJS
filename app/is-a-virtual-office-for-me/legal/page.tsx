import { EbookBanner } from "@/app/components/EbookBanner";
import { Footer } from "@/app/components/Footer";
import { IndustryDetails } from "@/app/components/IndustryDetails";
import { IndustryHeroBanner } from "@/app/components/IndustryHeroBanner";
import Padding from "@/app/components/ui/Padding";
import { VirtualOfficeFeatures } from "@/app/components/VirtualOfficeFeatures";
import { readFile } from "fs/promises";
import path from "path";

type Feature = {
  title: string;
  description: string;
};

const normalizeCopy = (value: string) =>
  value
    .replace(/\u0192\?T/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\u2019/g, "'");

export default async function Page() {
  // Read JSON file at runtime
  const jsonPath = path.join(process.cwd(), "newsite/json/industry/legal.json");
  const jsonContent = await readFile(jsonPath, "utf-8");
  const legalData = JSON.parse(jsonContent);

  const FEATURES: Feature[] = legalData.features.map((feature: any) => ({
    title: normalizeCopy(feature.title),
    description: normalizeCopy(feature.description),
  }));

  const INDUSTRY_SECTIONS = legalData.industry_content.map((section: any) => ({
    main_heading: normalizeCopy(section.main_heading),
    industry_paragraph: normalizeCopy(section.industry_paragraph),
  }));

  const heroHeading = normalizeCopy(legalData.hero.heading);
  const heroDescriptionHtml = normalizeCopy(legalData.hero.description);
  const heroImage = legalData.hero.image;

  const servicesHeading = normalizeCopy(legalData.services.heading);
  const servicesDescriptionHtml = normalizeCopy(
    legalData.services.description
  );
  const servicesImage = legalData.services.image;

  return (
    <section className="max-w-full w-full pt-[72px] lg:pt-[104px]">
      <IndustryHeroBanner
        heading={heroHeading}
        descriptionHtml={heroDescriptionHtml}
        image={heroImage}
      />
      <VirtualOfficeFeatures
        title="Services"
        heading={servicesHeading}
        content={servicesDescriptionHtml}
        contentHtml={servicesDescriptionHtml}
        imagepath={servicesImage}
        features={FEATURES}
      />
      <IndustryDetails
        servicesHeading={servicesHeading}
        servicesDescriptionHtml={servicesDescriptionHtml}
        sections={INDUSTRY_SECTIONS}
      />

      <Padding desktop="0px" mobile="8px" />
      <Padding desktop="60px" mobile="40px" />
      <EbookBanner />
      <Padding desktop="80px" mobile="40px" />
      <Footer />
    </section>
  );
}

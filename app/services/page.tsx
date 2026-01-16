import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "../components/PopularLocations";
import IncludedVirtualOfficeFeatures, {
  FeatureItem,
} from "../components/IncludedVirtualOfficeFeatures";
import OptionalVirtualOfficeUpgrades, {
  UpgradeItem,
} from "../components/OptionalVirtualOfficeUpgrades";
import { EbookBanner } from "../components/EbookBanner";
import { Reviews } from "../components/Reviews";
import OfficeSolutionBanner from "../components/OfficeSolutionBanner";
import Padding from "../components/ui/Padding";
import { CantactQna } from "../components/CantactQna";
import { fetchTestimonials } from "../lib/api/testimonials";
import fs from "fs";
import path from "path";

export default async function Page() {
  // Read JSON at runtime instead of bundling at build time
  const servicesData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "newsite/json/services.json"), "utf-8")
  );

  const sanitize = (html: string) =>
    (html || "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&#8217;|&rsquo;/gi, "'")
      .replace(/&amp;/gi, "&")
      .replace(/[^\x00-\x7F]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const raw = (servicesData as any).data ?? {};
  const regularServices: FeatureItem[] = Array.isArray(raw.regular_services)
    ? raw.regular_services
        .slice()
        .sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
        .map((item: any) => ({
          title: item.title ?? "",
          description: sanitize(item.description),
          href: item.read_more_link || null,
          iconUrl: item.icon || null,
        }))
    : [];

  const optionalUpgrades: UpgradeItem[] = Array.isArray(raw.optional_upgrades)
    ? raw.optional_upgrades
        .slice()
        .sort((a: any, b: any) => Number(a?.order ?? 0) - Number(b?.order ?? 0))
        .map((item: any) => ({
          title: item.title || "",
          price: "", // preserve title as-is; no separate price parsing
          body: sanitize(item.description),
        }))
    : [];

  const contactFaqs =
    Array.isArray(raw.faqs) && raw.faqs.length > 0
      ? raw.faqs.map((faq: any) => ({
          question: sanitize(faq.question),
          answer: sanitize(faq.answer),
        }))
      : [];

  // Fetch testimonials
  const testimonials = await fetchTestimonials(4);

  return (
    <section className="max-w-full w-full pt-[72px] lg:pt-[104px]">
      <div className="w-full">
        <IncludedVirtualOfficeFeatures items={regularServices} />
        <OptionalVirtualOfficeUpgrades items={optionalUpgrades} />
        <CantactQna faqs={contactFaqs} />
        <Padding desktop="40px" mobile="20px" />
        <OfficeSolutionBanner />
        <Padding desktop="40px" mobile="20px" />
        <Padding desktop="40px" mobile="20px" />
        <div className="flex w-full h-full flex-col items-start">
          <PopularLocations />
          <Padding desktop="50px" mobile="10px" />
          <Reviews testimonials={testimonials} />
          <Padding desktop="40px" mobile="20px" />
          <Padding desktop="40px" mobile="20px" />
          <Padding desktop="0px" mobile="20px" />
          <EbookBanner />
          <Padding desktop="80px" mobile="40px" />
        </div>
      </div>
      <Footer />
    </section>
  );
}

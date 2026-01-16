import { Footer } from "../components/Footer";
import OfficeSolutionBanner from "../components/OfficeSolutionBanner";
import { PopularLocations } from "../components/PopularLocations";
import { SectionSpacer } from "../components/SectionSpacer";
import Padding from "../components/ui/Padding";
import { FaqCategory } from "./components/FaqTwoColumn";
import { FaqPageClient } from "./components/FaqPageClient";
import fs from "fs";
import path from "path";

const cleanupText = (text: string) =>
  (text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8217;|&rsquo;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/[^\x00-\x7F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeCategories = (faqData: any): FaqCategory[] => {
  const rawCategories = Array.isArray((faqData as any).data) ? (faqData as any).data : [];

  const mapped = rawCategories.map((category: any, idx: number) => {
    const items = Array.isArray(category.faqs)
      ? category.faqs.map((faq: any) => ({
          question: cleanupText(faq.title),
          answer: cleanupText(faq.answer),
        }))
      : [];

    return {
      id: String(category.category_id ?? idx),
      label: cleanupText(category.category_name ?? "FAQs"),
      order: Number(category.category_order ?? idx),
      items,
    };
  });

  return mapped
    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
    .map(({ order, ...rest }: { order: number }) => rest as FaqCategory);
};

export default async function FAQPage() {
  // Read JSON at runtime instead of bundling at build time
  const faqData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "newsite/json/faq.json"), "utf-8")
  );

  const faqCategories = normalizeCategories(faqData);

  // Generate FAQ schema for all categories
  const allFaqItems = faqCategories.flatMap(category => category.items);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-white pt-[72px] lg:pt-[104px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="relative bg-white pt-5 lg:pt-10 sm:pt-8 md:pt-10 pb-0 overflow-visible">
        <FaqPageClient categories={faqCategories} />
        <Padding desktop="40px" mobile="20px" />
        <Padding desktop="40px" mobile="20px" />
        <OfficeSolutionBanner />
        <Padding desktop="40px" mobile="20px" />
        <Padding desktop="40px" mobile="20px" />
        <PopularLocations
          title="Most Popular Cities"
          description="From the skyscrapers of NYC to the valleys of California, you'll be sure to find the perfect new business address in all major cities across the country."
          count={16}
          align="center"
        />
      </section>
      <SectionSpacer />
      <Footer />
    </div>
  );
}

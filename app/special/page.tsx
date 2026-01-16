import { Footer } from "@/app/components/Footer";
import { SpecialSearchFeature } from "./components/SpecialSearchFeature.client";
import { SpecialLocationSlider } from "../components/SpecialSlider";
import { FeaturePriceDetailsTableAddressForSpecial } from "../components/FeaturePriceDetailsTableAddressForSpecial";
import { Reviews } from "../components/Reviews";
import { CantactQna } from "../components/CantactQna";
import fs from "fs";
import path from "path";
import { fetchTestimonials } from "../lib/api/testimonials";
import type { Metadata } from "next";
import { FeatureComparisonFile } from "../lib/types/featureComparison";
import MobileLocationSlider from "../components/MobileLocationSlider";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "special",
  description: "https://www.opusvirtualoffices.com/",
};

export default async function Page() {
  const featureComparisonJson = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/feature-comparison.json"),
      "utf-8"
    )
  ) as FeatureComparisonFile;
  const { data: featureComparisonContent } = featureComparisonJson;
  const servicesData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/services.json"),
      "utf-8"
    )
  );
  const specialLocationsJson = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/special.json"),
      "utf-8"
    )
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
  const features = [
    { id: "live-call-answering", text: "Live Call Answering" },
    { id: "prestigious-address", text: "Prestigious Business Address" },
    { id: "company-phone", text: "Company Phone/Fax Number" },
    { id: "call-transferring", text: "Premium Call Transferring" },
    { id: "voicemail", text: "Voicemail/Fax Converted to Email" },
  ];
  const specialLocations = specialLocationsJson?.data?.locations ?? [];
  const contactFaqs =
    Array.isArray(raw.faqs) && raw.faqs.length > 0
      ? raw.faqs.map((faq: any) => ({
          question: sanitize(faq.question),
          answer: sanitize(faq.answer),
        }))
      : [];

  const testimonials = await fetchTestimonials(4);

  return (
    <section className="max-w-full w-full pt-[72px] lg:pt-[104px]">
      <div className="w-full justify-center flex">
        <SpecialSearchFeature
          searchPlaceholder="Search Over 650+ locations"
          helperText="Type the City or State"
          features={features}
          rating={{ score: "4.8", label: "stars, 831 reviews" }}
        />
      </div>
      <div className="hidden lg:block">
        <SpecialLocationSlider locations={specialLocations} />
      </div>
      <MobileLocationSlider locations={specialLocations} />
      <FeaturePriceDetailsTableAddressForSpecial
        isSpecial={true}
        content={featureComparisonContent}
      />
      <Reviews testimonials={testimonials} />
      <div className="md:pb-10" />
      <CantactQna faqs={contactFaqs} />
      <div className="md:pb-10" />
      <Footer />
    </section>
  );
}

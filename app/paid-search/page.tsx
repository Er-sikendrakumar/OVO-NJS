import { Footer } from "@/app/components/Footer";
import { unstable_noStore as noStore } from "next/cache";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Reviews } from "../components/Reviews";
import { CantactQna } from "../components/CantactQna";
import { SpecialLocationSlider } from "../components/PaidSearchSlider";
import PaidSearchMobileSlider from "../components/PaidSearchMobileSlider";
import { FeaturePriceDetailsTableAddress } from "../components/PaidSearchFeaturePrice";
import { fetchTestimonials } from "../lib/api/testimonials";
import { PaidSearchFeatureHeroForPaidSearch } from "../components/PaidSearchFeatureHeroForPaidSearch";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
type PaidSearchSeo = {
  title?: string;
  meta_description?: string;
  canonical?: string;
  og?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    image?: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const paidSearchJson = await loadJson<any>("newsite/json/paid-search.json");
  const seo: PaidSearchSeo | undefined = paidSearchJson?.seo;
  const og = seo?.og;
  const canonical = seo?.canonical;

  return {
    title: seo?.title ?? "paid-search",
    description: seo?.meta_description ?? "",
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: og?.title ?? seo?.title ?? "",
      description: og?.description ?? seo?.meta_description ?? "",
      url: og?.url ?? canonical,
      type: (og?.type ?? "website") as
        | "website"
        | "article"
        | "book"
        | "profile"
        | "music.song"
        | "music.album"
        | "music.playlist"
        | "music.radio_station"
        | "video.movie"
        | "video.episode"
        | "video.tv_show"
        | "video.other",
      images: og?.image ? [{ url: og.image }] : undefined,
    },
  };
}

const loadJson = async <T,>(relativePath: string): Promise<T> => {
  const filePath = path.join(process.cwd(), relativePath);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
};

export default async function Page() {
  noStore();
  const paidSearchJson = await loadJson<any>("newsite/json/paid-search.json");
  const popularLocationsJson = await loadJson<any>(
    "newsite/json/popular-slider.json"
  );
  const specialLocationsJson = await loadJson<any>("newsite/json/special.json");

  const hero = paidSearchJson?.data?.hero;
  const locationCard = paidSearchJson?.data?.location_card;
  const faqSection = paidSearchJson?.data?.faq_section;
  const rawComparison = paidSearchJson?.data?.competitor_comparison;
  const competitorComparison = rawComparison
    ? {
        ...rawComparison,
        providers: (rawComparison.providers ?? []).map((provider: any) => ({
          ...provider,
          is_featured: provider.is_featured ?? provider.is_best_value,
        })),
      }
    : null;
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
  const locationMatches = popularLocationsJson?.data?.all_popular ?? [];
  const specialLocations = specialLocationsJson?.data?.locations ?? [];
  const contactFaqs =
    Array.isArray(faqSection?.faqs) && faqSection.faqs.length > 0
      ? faqSection.faqs.map((faq: any) => ({
          question: sanitize(faq.question),
          answer: sanitize(faq.answer),
        }))
      : [];
  const testimonials = await fetchTestimonials(4);

  return (
    <section className="max-w-full w-full pt-[72px] lg:pt-[104px]">
      <div className="w-full justify-center flex">
        <PaidSearchFeatureHeroForPaidSearch
          hero={hero}
          locations={locationMatches}
        />
      </div>
      <div className="hidden lg:block">
        <SpecialLocationSlider
          locations={specialLocations}
          badgeImageSrc={locationCard?.guarantee_badge}
        />
      </div>
      <PaidSearchMobileSlider locations={specialLocations} />
      <Reviews testimonials={testimonials} />
      {competitorComparison && (
        <FeaturePriceDetailsTableAddress comparison={competitorComparison} />
      )}
      <CantactQna btnText={faqSection?.cta_text ?? ""} faqs={contactFaqs} />
      <div className="md:pb-10" />
      <Footer />
    </section>
  );
}

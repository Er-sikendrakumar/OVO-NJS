import type { Metadata } from "next";
import { headers } from "next/headers";
import ClientsBenefit from "../components/ClientsBenefit";
import CuratedGrowth from "../components/CuratedGrowth";
import { Footer } from "../components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') || 'www.opusvirtualoffices.com';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const canonicalUrl = `${protocol}://${host}/clientbenefits/`;

  return {
    title: "Client Benefits - Opus Virtual Offices",
    description: "Discover unbeatable offers tailored for your new venture. Unlock exclusive discounts and resources to help your startup thrive. Marketing Tools. Startups...",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ClientBenefitsPage() {
  return (
    <main className="w-full bg-white pt-[72px] lg:pt-[104px]">
      <div className="w-full pb-5 lg:pb-10">
        <ClientsBenefit />
        <CuratedGrowth />
      </div>
        <Footer />
    </main>
   
  );
}

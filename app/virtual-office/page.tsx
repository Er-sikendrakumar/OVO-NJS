import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { EbookBanner } from "@/app/components/EbookBanner";
import { Reviews } from "@/app/components/Reviews";
import { StatesList } from "@/app/components/StatesList";
import { TopPremiumSlider } from "@/app/components/TopPremiumSlider";
import { SearchWithAction } from "@/app/components/SearchWithAction";
import { FeaturesBoxLocations } from "@/app/components/FeaturesBoxLocations";
import { SectionSpacer } from "@/app/components/SectionSpacer";
import Image from "next/image";
import { fetchStates } from "@/app/lib/api/states";
import { fetchPopularSlider } from "@/app/lib/api/popularSlider";
import { fetchTestimonials } from "@/app/lib/api/testimonials";

const FEATURES = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
  "Business Phone/Fax Number",
  "Professional Mail Receipt",
  "Voicemail/Fax Converted to Email"
];

export default async function VirtualOfficePage() {
  // Fetch all data server-side
  const [statesData, popularSliderData, testimonials] = await Promise.all([
    fetchStates(),
    fetchPopularSlider(),
    fetchTestimonials(4),
  ]);

  return (
    <div className="min-h-screen bg-white pt-[72px] lg:pt-[104px]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-white pt-6 sm:pt-8 md:pt-10 pb-0 overflow-visible">
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden" aria-hidden="true">
          <Image
            src="/dots.svg"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,768px)_1fr] gap-3 lg:gap-[32px]">
            {/* Left Column - Heading and Search */}
            <div className="flex flex-col lg:gap-10 lg:max-w-[768px]">
              <div className="flex flex-col">
                <h1 className="text-[24px] leading-[32px] font-normal tracking-tight text-[#101828] lg:text-[48px] lg:leading-[60px] lg:tracking-[-0.96px]">
                  Virtual Office Locations
                </h1>
                <h2 className="text-[24px] leading-[32px] font-normal tracking-tight text-[#101828] lg:text-[48px] lg:leading-[60px] lg:tracking-[-0.96px]">
                  <span>Choose from over </span>
                  <span className="font-bold text-[#0BA5EC]">650+</span>
                  <span> Virtual Office Locations Nationwide for only </span>
                  <span className="font-bold text-[#17B26A]">$99</span>
                </h2>
              </div>

              <SearchWithAction className="mt-5 lg:mt-6" />
            </div>

            {/* Right Column - Features List */}
            <div className="w-full max-w-[416px] mt-3 lg:mt-0 lg:pl-4">
              <FeaturesBoxLocations features={FEATURES} />
            </div>
          </div>
        </div>
      </section>

      <SectionSpacer />

      {/* State Selection Sections - Loaded from API */}
      <StatesList statesData={statesData} />

      {/*<SectionSpacer />

      <TopPremiumSlider locations={popularSliderData.data.top_premium} />*/}

      <SectionSpacer />

      {/* Most Popular Cities */}
      <PopularLocations
        title="Most Popular Cities"
        description="From the skyscrapers of NYC to the valleys of California, you'll be sure to find the perfect new business address in all major cities across the country."
        count={16}
        align="center"
      />

      <SectionSpacer />

      {/* Reviews Section */}
      <Reviews testimonials={testimonials} />

      <SectionSpacer />

      {/* CTA Section */}
      <EbookBanner />

      <SectionSpacer />

      <Footer />
    </div>
  );
}

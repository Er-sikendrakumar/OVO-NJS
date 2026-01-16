import { EbookBanner } from "../components/EbookBanner";
import { Footer } from "../components/Footer";
import { PopularLocations } from "../components/PopularLocations";
import Padding from "../components/ui/Padding";
import { IntroSection } from "../components/IntroSection";
import { VirtualOfficeFeatures } from "../components/VirtualOfficeFeatures";
import BusinessSection from "../components/BusinessSection";

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: "Prestigious Business Address",
    description:
      "Select one of our Virtual Offices locations as your primary business address and use it to receive all your mail and packages.",
  },
  {
    title: "Live Call Answering",
    description:
      "Ensure every caller speaks with a real person trained to greet them professionally and route calls appropriately.",
  },
  {
    title: "Premium Call Transferring",
    description:
      "Keep your business nimble with seamless call transfers to your preferred devices or team members—no missed opportunities.",
  },
  {
    title: "Company Phone and Fax Number",
    description:
      "Establish credibility with dedicated business phone and fax lines that keep personal contact details private.",
  },
  {
    title: "Voicemail & Fax converted to Email",
    description:
      "Stay responsive with voicemails and faxes delivered straight to your inbox so you can review and reply on the go.",
  },
];

export default function isitformePage() {
  return (
    <section className="max-w-full pt-[72px] lg:pt-[104px]">
      <IntroSection />
      <Padding desktop="0px" mobile="60px" />
      <BusinessSection />
      <VirtualOfficeFeatures
      title="Features"
        heading="Unlock your business’s full potential with our all-inclusive
              virtual office package."
        content="Empower your business with a complete suite of tools — from a
              prestigious address to live call answering — designed to enhance
              your image and streamline operations."
        imagepath="/potentialpackage.webp"
        features={FEATURES}
      />
      <Padding desktop="40px" mobile="20px" />
      <PopularLocations
        title="Top Premium Locations"
        description="Browse our most popular prestigious virtual office locations throughout the USA."
      />
      <Padding desktop="40px" mobile="20px" />
      <Padding desktop="0px" mobile="8px" />
      <Padding desktop="60px" mobile="40px" />
      <EbookBanner />
      <Padding desktop="80px" mobile="40px" />
      <Footer />
    </section>
  );
}

import { Footer } from "../components/Footer";
import { PlumberVideoPlayer } from "../components/PlumberVideoPlayer";
import { Reviews } from "../components/Reviews";
import { VirtualOfficeFeatures } from "../components/VirtualOfficeFeatures";
import { fetchTestimonials } from "../lib/api/testimonials";
import { GetYourOfficeSectionForPlumber } from "./GetYourOfficeSectionForPlumber";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Virtual Office for Plumbers | Never Miss a Service Call",
  description:
    "Missed calls mean missed jobs. Get a professional business address and live call answering built for plumbers. Starting at just $99/month.",
};

type Feature = {
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    title: "Live Call Answering",
    description:
      "Monday through Friday from 8:30am to 5:30pm (in PST timezone 8am to 5pm) a live receptionist will be answering all incoming calls on behalf of your company.",
  },
  {
    title: "Prestigious Business Address",
    description:
      "Select one of our Virtual Offices locations as your primary business address and use it to receive all your mail and packages.",
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

export default async function PlumberPage() {
  const testimonials = await fetchTestimonials(4);

  return (
    <main className="pt-[72px] lg:pt-[104px] ">
      <div className="w-full pb-[40px] lg:pb-[80px]  pt-[20px] lg:pt-[40px]">
        <PlumberVideoPlayer src="https://www.youtube.com/embed/UwE4xFcg6nw?rel=0&modestbranding=1&autohide=1" />
        <VirtualOfficeFeatures
          title="Features"
          heading="Maximize your plumbing business's potential with our comprehensive virtual office package."
          content="Elevate your plumbing brand with our complete toolkit — featuring a prime address and live call answering — crafted to boost your reputation and simplify your workflow."
          imagepath="/plumber.webp"
          features={FEATURES}
        />
        <GetYourOfficeSectionForPlumber />
        <Reviews testimonials={testimonials} />
      </div>
      <Footer />
    </main>
  );
}

import { fetchTestimonials } from "@/app/lib/api/testimonials";
import { HomePageClient } from "@/app/components/HomePageClient";
import Script from "next/script";

// Server component that fetches data and passes to client
export default async function Page() {
  const testimonials = await fetchTestimonials(4);

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is included in our package?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For just $99/month, Opus Virtual Offices offers an all-inclusive package with no hidden fees. This package provides a live receptionist to professionally handle calls, a prestigious corporate mailing address, dedicated company phone and fax numbers, and the convenience of voicemail and fax conversions sent directly to your email. Additionally, they offer premium call transferring, ensuring you're always connected,. All these features are designed to give businesses a professional edge at an affordable rate."
        }
      },
      {
        "@type": "Question",
        "name": "How does a virtual office manage mail and package handling?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With a virtual office, your mail and packages are sent to the office's address. They safely store your items until you're ready to pick them up. You can either collect them in person or have them forwarded to a different address."
        }
      },
      {
        "@type": "Question",
        "name": "Are there physical meeting rooms available for use",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! virtual offices offer physical meeting rooms for when you need to get together with your team, want to work in a quiet space or have client meetings and contracts to sign."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePageClient testimonials={testimonials} />
    </>
  );
}

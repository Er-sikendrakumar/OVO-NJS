import type { Metadata } from 'next';
import { getSeoMetadata } from '@/app/lib/seo';
import { cleanWordPressHtml } from '@/app/lib/utils';
import { PrestigiousBusinessAddressClient } from '@/app/components/PrestigiousBusinessAddressClient';
import { readFile } from 'fs/promises';
import path from 'path';

interface FAQ {
  question: string;
  answer: string;
}

interface PrestigiousBusinessAddressData {
  success: boolean;
  data: {
    faqs: FAQ[];
  };
  seo: {
    title: string;
    meta_description: string;
    canonical: string;
    og: {
      title: string;
      description: string;
      url: string;
      type: string;
      image: string;
    };
  };
}

// Fetch SEO metadata from prestigious-business-address.json
export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('prestigious-business-address');
}

// Generate FAQ schema from FAQ data
function generateFaqSchema(faqs: FAQ[]) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Helper to strip all HTML tags for plain text (for schema)
function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

// Server component that fetches data and passes to client
export default async function PrestigiousBusinessAddressPage() {
  // Read JSON file server-side
  const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', 'prestigious-business-address.json');
  const fileContent = await readFile(jsonFilePath, 'utf-8');
  const data: PrestigiousBusinessAddressData = JSON.parse(fileContent);

  // Clean WordPress block HTML from FAQ answers (for display)
  const faqs = (data.data?.faqs || []).map(faq => ({
    ...faq,
    answer: cleanWordPressHtml(faq.answer)
  }));

  // Generate FAQ schema with plain text answers (strip all HTML)
  const faqsForSchema = (data.data?.faqs || []).map(faq => ({
    question: faq.question,
    answer: stripHtmlTags(cleanWordPressHtml(faq.answer))
  }));
  const faqSchema = generateFaqSchema(faqsForSchema);

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <PrestigiousBusinessAddressClient faqs={faqs} />
    </>
  );
}

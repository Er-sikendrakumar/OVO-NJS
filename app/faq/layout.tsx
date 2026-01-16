import type { Metadata } from 'next';
import { getSeoMetadata } from '@/app/lib/seo';

// Force dynamic rendering to fetch SEO on every request
export const dynamic = 'force-dynamic';

// Fetch SEO metadata from faq.json
export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('faq');
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
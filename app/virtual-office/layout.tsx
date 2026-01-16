import type { Metadata } from 'next';
import { getSeoMetadata } from '@/app/lib/seo';

// Force dynamic rendering to fetch SEO on every request
export const dynamic = 'force-dynamic';

// Fetch SEO metadata from virtual-office.json
export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('virtual-office');
}

export default function VirtualOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

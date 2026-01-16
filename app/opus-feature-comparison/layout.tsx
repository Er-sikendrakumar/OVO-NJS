import type { Metadata } from 'next';
import { getSeoMetadata } from '@/app/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('feature-comparison');
}

export default function OpusFeatureComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

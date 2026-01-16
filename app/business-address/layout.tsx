import type { Metadata } from 'next';
import { getSeoMetadata } from '@/app/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('business-address-ba');
}

export default function BusinessAddressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

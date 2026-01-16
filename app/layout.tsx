import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/app/components/ui/toaster';
import { Navbar } from '@/app/components/Navbar';
import { NoSurprisePopup } from '@/app/components/NoSurprisePopup';
import { PromotionPopup } from '@/app/components/PromotionPopup';
import { GlobalLoadingOverlay } from '@/app/components/GlobalLoadingOverlay';
import { Tracking } from '@/app/components/Tracking';
import { TrackingCodeCapture } from '@/app/components/TrackingCodeCapture';
import { getSeoMetadata } from '@/app/lib/seo';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Force dynamic rendering to fetch SEO on every request
export const dynamic = 'force-dynamic';

// Fetch SEO metadata from homepage.json
export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('homepage');
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="4kpcWX3peGrFFSMS4qDbV1KOAUTrwNJw0wz6eyqZOTk" />

        {/* Preconnect to Google services */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5QFL4GSM');
            `,
          }}
        />

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QFL4GSM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Providers>
          <Tracking />
          <Suspense fallback={null}>
            <TrackingCodeCapture />
          </Suspense>
          <GlobalLoadingOverlay>
            <Navbar />
            {children}
            <Toaster />
            <NoSurprisePopup />
            <PromotionPopup />
          </GlobalLoadingOverlay>
        </Providers>
      </body>
    </html>
  );
}

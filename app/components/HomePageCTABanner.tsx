'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export function HomePageCTABanner() {
  return (
    <motion.section
      className="flex flex-col w-full items-center justify-center px-0 py-10 sm:py-12 md:py-[60px] bg-basewhite"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <div className="max-w-screen-xl w-full px-4 sm:px-6 md:px-8">
        <style dangerouslySetInnerHTML={{
          __html: `
            .homepage-cta-banner {
              align-items: center;
              border-radius: 16px;
              background: url(/vos-cta-bg-dsk.webp) center center / cover no-repeat, #fff;
              box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
            }
            .homepage-cta-banner .cta-content {
              display: flex;
              padding: 20px 64px;
              width: 100%;
              justify-content: space-between;
              align-items: center;
            }
            .homepage-cta-banner .cta-text-wrapper {
              display: flex;
              flex-direction: column;
              gap: 12px;
              align-items: flex-start;
              justify-content: center;
              flex: 1;
            }
            .homepage-cta-banner .cta-heading h2 {
              color: #181D27;
            }
            .homepage-cta-banner .cta-heading p {
              color: #535862;
            }
            .homepage-cta-banner .cta-button-wrapper {
              flex-shrink: 0;
            }
            .homepage-cta-banner .cta-button-wrapper a {
              padding: 16px 56px;
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: 28px;
              height: 60px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;
            }
            @media (max-width: 767px) {
              .homepage-cta-banner {
                border-radius: 16px;
                background: url(/vos-mobile.webp) center center / cover no-repeat, #fff;
                box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
              }
              .homepage-cta-banner .cta-content {
                padding: 20px 16px !important;
                flex-direction: column;
                gap: 20px;
              }
              .homepage-cta-banner .cta-text-wrapper {
                align-items: center;
                text-align: center;
              }
              .homepage-cta-banner .cta-button-wrapper {
                width: 100%;
              }
              .homepage-cta-banner .cta-button-wrapper a {
                width: 100%;
                padding: 8px 12px;
                font-size: 14px;
                line-height: 20px;
                height: 36px;
                min-width: auto;
              }
              .homepage-cta-banner .cta-heading h2 {
                text-align: center;
              }
              .homepage-cta-banner .cta-heading p {
                text-align: center;
              }
            }
          `
        }} />
        <div className="homepage-cta-banner flex flex-col md:flex-row">
          <div className="cta-content">
            <div className="cta-text-wrapper">
              <div className="cta-heading flex flex-col gap-[12px]">
                <h2 className="font-semibold text-[#181D27] lg:text-[36px] text-[30px] leading-[120%] tracking-[-0.72px]">
                  Establish your business presence
                </h2>
                <p className="font-normal lg:text-[20px] text-[18px] leading-[140%] tracking-[0] text-[#535862]">
                  All-Inclusive Virtual Office Services for <strong>Only $99</strong>
                </p>
              </div>
            </div>
            <div className="cta-button-wrapper">
              <Link
                href="/signup/?btn=902"
                className="btn-brand-blue bg-[#5BC0EB] hover:bg-[#4AA8D4] text-white rounded-lg transition-colors font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

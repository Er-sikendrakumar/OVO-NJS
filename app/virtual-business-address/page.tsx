"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog";
import { FeaturesBox } from "../components/FeaturesBox";
import { SearchWithAction } from "../components/SearchWithAction";
import { motion } from "framer-motion";
import { PopularLocations } from "../components/PopularLocations";
import VirtualBusinessAddressCompany from "../components/VirtualBusinessAddressCompany";
import FeatureSectionVirtualAdd from "../components/FeatureSectionVirtualAdd";
import BenefitsVirtualBusinessAddress from "../components/BenefitsVirtualBusinessAddress";
import SuccessSeekersVirtualBusinessAddress from "../components/SuccessSeekersVirtualBusinessAddress";
import GetVirtualBusinessAddress from "../components/GetVirtualBusinessAddress";
import FaqAllVirtualBusinessAddress from "../components/FaqAllVirtualBusinessAddress";
import CtaVirtualBusinessAdd from "../components/CtaVirtualBusinessAdd";

const officeBuildingImg = "/office-building_1761587957783.webp";
const businessAddressBg = "/business-address-bg_1761590800705.webp";
const bgCtaImg = "/bg-cta_1761591194000.webp";
const virtualAddressImage = "/virtualAddressImage.webp";
const man_holding_tablet = "/man-holding-tablet.webp";
const receptionistCardBg = "/receptionist-card-bg_1761593285326.webp";
const cashHandsHoldingBg = "/cash-hands-holding_1761593304143.webp";
const multipleProfessionalsBg = "/multiple-professionals_1761593320843.webp";
const newYorkAerialView = "/new-york-aerial-view_1761593422460.webp";
const promoVideo = "/Opus VO - 45 Sec Promo - 1920x1080_1761681440103.mp4";
const playerCover = "/player-cover_1761748637474.webp";

export default function VirtualBusinessAddressPage() {
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  const includedFeatures = [
    "Prestigious Business Address",
    "Professional Live Call Answering",
    "Personalized Call Transferring",
    "Business Phone/Fax Number",
    "Professional Mail Receipt",
    "Voicemail/Fax Converted to Email",
  ];
  const interactiveCards = [
    {
      bgClass:
        "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%),linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]",
      bgImage: receptionistCardBg,
      text: "Click to view demo",
      hasButton: true,
      href: undefined,
      isNextJs: false,
    },
    {
      bgClass:
        "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
      bgImage: cashHandsHoldingBg,
      text: "Bundle & Save",
      hasButton: false,
      href: "/cost-comparison/",
      isNextJs: false,
    },
    {
      bgClass:
        "bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
      bgImage: multipleProfessionalsBg,
      text: "Is a virtual office for me?",
      hasButton: false,
      href: "/is-a-virtual-office-for-me/",
      isNextJs: false,
    },
    {
      bgClass:
        "bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
      bgImage: businessAddressBg,
      text: "Address Only",
      hasButton: false,
      href: "/prestigious-business-address/",
      isNextJs: true,
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <section className="max-w-full w-full pt-[72px] lg:pt-[104px]">
      <div className="w-full">
        {/* Hero Section */}
        <section className="flex flex-col items-center w-full bg-basewhite">
          <div className="flex flex-col w-full items-center gap-6 md:gap-8 px-0 py-5  sm:py-8 md:py-10">
            <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0">
              <motion.div
                className="flex flex-col flex-1 items-start justify-start h-full w-full"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
              >
                <div className="flex flex-col items-start gap-3 sm:gap-6 w-full lg:max-w-[784px]">
                  <div className="flex flex-col w-full">
                    <h1 className="w-full text-[#101828] text-[24px] leading-[32px] font-medium sm:text-[48px] sm:leading-[60px] sm:font-normal lg:tracking-[-0.96px]">
                    The Ultimate Virtual Office Solution. <span className="font-bold text-blue-light400 tracking-[-.26px] md:tracking-[-0.96px]">All-Inclusive </span>with no long-term contracts for only<span className="font-bold text-blue-light400"> $99</span>/month.
                    </h1>
                  </div>

                  <p className="font-normal text-gray-600 text-[18px] md:text-[20px] md:leading-[30px] tracking-[0] leading-relaxed">
                    With 650+ locations throughout the USA
                  </p>
                </div>

                <SearchWithAction
                  className="mt-4 sm:mt-6"
                  searchContainerClassName="sm:max-w-[394px]"
                  onSelect={(location) => {
                    console.log("Selected location:", location);
                  }}
                  browseLink={{
                    href: "/our-top-locations/",
                    label: "Browse Our Top Locations",
                  }}
                />
              </motion.div>

              <div className="flex w-full lg:w-auto">
                <FeaturesBox features={includedFeatures} />
              </div>
            </div>

            <div className="flex flex-col items-start justify-center gap-6 w-full ">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 py-[11px] sm:gap-4 md:gap-[29px] max-w-[1280px] w-full px-4 sm:px-6 md:px-8 mx-auto">
                {interactiveCards.map((card, index) => {
                  const cardContent = (
                    <motion.div
                      className={`flex items-end gap-2 ${card.bgClass} flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative bg-cover bg-center cursor-pointer`}
                      style={
                        card.bgImage
                          ? {
                              backgroundImage: `url(${card.bgImage})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : undefined
                      }
                      whileHover={{ scaleY: 1.1, scaleX: 1.1 }}
                      transition={{ duration: 0.3 }}
                      onClick={
                        card.hasButton
                          ? () => setIsVideoDialogOpen(true)
                          : undefined
                      }
                    >
                      {card.bgImage && (
                        <motion.div
                          className="absolute inset-0 z-0"
                          style={{
                            background:
                              "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(119,119,119,1) 100%)",
                          }}
                          initial={{ opacity: 1 }}
                          whileHover={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2 z-10">
                        <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs leading-[18px] sm:text-[16px] sm:leading-[24px]">
                          {card.text}
                        </p>
                      </div>
                      {card.hasButton && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+4px)] w-[68px] h-[68px] bg-[#00000000] rounded-[100000000px] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] z-10">
                          <img
                            className="w-full h-full"
                            alt="Button"
                            src="/figmaAssets/button.svg"
                            width="68"
                            height="68"
                            loading="eager"
                          />
                        </div>
                      )}
                    </motion.div>
                  );

                  return (
                    <div
                      key={index}
                      className={`flex w-full items-start h-[128px] md:h-[130px]  ${
                        index === 0 ? "hidden sm:flex" : ""
                      }`}
                      data-testid={`card-interactive-${index}`}
                    >
                      {card.href ? (
                        card.isNextJs ? (
                          <Link href={card.href} className="flex flex-1 h-full">
                            {cardContent}
                          </Link>
                        ) : (
                          <a href={card.href} className="flex flex-1 h-full">
                            {cardContent}
                          </a>
                        )
                      ) : (
                        cardContent
                      )}
                    </div>
                  );
                })}

                <div
                  className="flex w-full items-start h-[128px] md:h-[130px]"
                  data-testid="card-pricing"
                >
                  <a href="/signup/?btn=902" className="flex flex-1 h-full">
                    <motion.div
                      className="flex items-end gap-2 bg-[linear-gradient(180deg,rgba(54,191,250,1)_0%,rgba(3,137,209,1)_100%),linear-gradient(0deg,rgba(54,191,250,1)_0%,rgba(54,191,250,1)_100%)] flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative cursor-pointer group"
                      initial="rest"
                      whileHover="hover"
                      variants={{
                        rest: { scaleY: 1, scaleX: 1 },
                        hover: { scaleY: 1.1, scaleX: 1.1 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute top-0 inset-x-0 flex items-center justify-center pt-3"
                        variants={{
                          rest: { opacity: 1 },
                          hover: { opacity: 1 },
                        }}
                      >
                        <p className="font-medium text-[#ffffff] text-xs sm:text-sm text-center tracking-[0] leading-normal whitespace-nowrap">
                          ALL-INCLUSIVE
                        </p>
                      </motion.div>

                      {/* Mobile version - always visible */}
                      <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <p className="font-bold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-4xl">
                          $99/mo
                        </p>
                        <p className="font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-xs">
                          No Hidden Fees
                        </p>
                      </div>

                      {/* Desktop version - hover animation */}
                      <motion.div
                        className="hidden lg:flex absolute top-[24px] left-0 right-0 bottom-[42px] flex-col items-center justify-center"
                        variants={{
                          rest: { gap: 1 },
                          hover: { gap: 12 },
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.p
                          className="font-semibold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-[48px] leading-[60px]"
                          variants={{
                            rest: { y: 0 },
                            hover: { y: 4 },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          $99/mo
                        </motion.p>
                        <motion.p
                          className="font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-sm"
                          variants={{
                            rest: { opacity: 0, height: "0px", y: 0 },
                            hover: { opacity: 1, height: "auto", y: -4 },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          NO HIDDEN FEES
                        </motion.p>
                      </motion.div>

                      <motion.div
                        className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[43px] px-2"
                        variants={{
                          rest: { opacity: 1 },
                          hover: { opacity: 1 },
                        }}
                      >
                        <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs leading-[18px] sm:text-[16px] sm:leading-[24px]">
                          Sign Up Now
                        </p>
                      </motion.div>
                    </motion.div>
                  </a>
                </div>
              </div>

              <div
                className="sm:hidden w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1280px] flex flex-col items-center gap-2"
                data-testid="video-promo-mobile"
              >
                <video
                  className="w-full rounded-xl shadow-shadows-shadow-lg"
                  controls
                  preload="none"
                  poster={playerCover}
                >
                  <source src={promoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="font-bold text-[14px] leading-5 text-gray-600 text-center">
                  Click to view demo
                </p>
              </div>
            </div>

            <motion.div
              className="hidden lg:flex flex-col items-center gap-4 sm:gap-6 md:gap-8 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div
                className="w-full h-[283px] rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${newYorkAerialView})` }}
              />
            </motion.div>
          </div>

          <motion.div
            className="inline-flex flex-col items-center px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#535862] md:text-[#181D27] text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-center tracking-[var(--text-xl-regular-letter-spacing)] [font-style:var(--text-xl-regular-font-style)]">
              See below if a virtual office is{" "}
              <br className="block md:hidden" /> a good fit for you
            </p>
            <img
              className="w-5 h-5"
              alt="Section icon"
              src="/figmaAssets/section-icon.svg"
              width="20"
              height="20"
              loading="eager"
            />
          </motion.div>
        </section>
        <section className="mx-auto items-center pt-5 md:pt-0 px-[32px]">
          <Image
            alt="Call to Action Background"
            src={virtualAddressImage}
            width={1216}
            height={437}
            className="w-full h-auto rounded-none max-w-[311px] md:max-w-[1216px] m-auto"
            priority
          />
        </section>

        <VirtualBusinessAddressCompany />
        <FeatureSectionVirtualAdd />
        <BenefitsVirtualBusinessAddress />
        <SuccessSeekersVirtualBusinessAddress />

        <section className="mx-auto items-center pt-5 md:pt-10 pb-5 md:pb-[40px]">
          <PopularLocations
            title="Nationwide Coverage"
            description="Opus offers 650+ locations across the U.S., including:"
            align="center"
          />
        </section>

        <GetVirtualBusinessAddress />
        <FaqAllVirtualBusinessAddress />
        <CtaVirtualBusinessAdd />

        <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
          <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-0 ">
            <DialogTitle>Video Demo</DialogTitle>
            <video
              className="w-full h-auto"
              controls
              autoPlay
              preload="metadata"
              poster={playerCover}
            >
              <source src={promoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </section>
  );
}

'use client';
import { useState } from "react";
import Link from "next/link";
import { MailIcon, MapPinIcon, PlusCircle, MinusCircle } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion";
import { FeaturesBox } from "@/app/components/FeaturesBox";
import { SearchWithAction } from "@/app/components/SearchWithAction";
import { Footer } from "@/app/components/Footer";
import { HomePopularLocations } from "@/app/components/HomePopularLocations";
import { CTABanner } from "@/app/components/CTABanner";
import { EbookBanner } from "@/app/components/EbookBanner";
import { HomePageCTABanner } from "@/app/components/HomePageCTABanner";
import { Reviews, type ReviewItem } from "@/app/components/Reviews";
import { SectionSpacer } from "@/app/components/SectionSpacer";
import { motion } from "framer-motion";

const officeBuildingImg = "/office-building_1761587957783.webp";
const businessAddressBg = "/business-address-bg_1761590800705.webp";
const bgCtaImg = "/bg-cta_1761591194000.webp";
const bgCtaPromoImg = "/bg-cta-promo_1761591480531.webp";
const man_holding_tablet = "/man-holding-tablet.webp";
const receptionistCardBg = "/receptionist-card-bg_1761593285326.webp";
const cashHandsHoldingBg = "/cash-hands-holding_1761593304143.webp";
const multipleProfessionalsBg = "/multiple-professionals_1761593320843.webp";
const newYorkAerialView = "/new-york-aerial-view_1761593422460.webp";
const promoVideo = "/Opus VO - 45 Sec Promo - 1920x1080_1761681440103.mp4";
const playerCover = "/player-cover_1761748637474.webp";

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

const benefitTypes = [
  {
    title: "Consultants:",
    description:
      "Professionals who travel frequently and require a consistent address for correspondence.",
    position: "row-[1_/_2] col-[1_/_2]",
  },
  {
    title: "Remote Teams:",
    description:
      "Organizations with employees working from various locations, needing a centralized business address.",
    position: "row-[1_/_2] col-[2_/_3]",
  },
  {
    title: "Startups:",
    description:
      "Young companies looking to save on overheads while establishing a professional image.",
    position: "row-[2_/_3] col-[1_/_2]",
  },
  {
    title: "International Companies:",
    description:
      "Firms wanting a presence in a new country or region without setting up a physical office.",
    position: "row-[2_/_3] col-[2_/_3]",
  },
  {
    title: "Freelancers:",
    description:
      "Independent professionals seeking a business address and phone number separate from their personal ones.",
    position: "row-[3_/_4] col-[1_/_2]",
  },
  {
    title: "E-commerce Businesses:",
    description:
      "Online retailers that need a physical address for returns and correspondence but don't have a brick-and-mortar store.",
    position: "row-[3_/_4] col-[2_/_3]",
  },
];

const featureCards = [
  {
    title: "Always Connected",
    description:
      "Never miss a vital business opportunity again. With a virtual office, every call is answered promptly and professionally, reflecting your company's commitment to excellence.",
    bgClass: "bg-[#ffffff9e]",
  },
  {
    title: "Brand Elevation",
    description:
      "A virtual office boosts your brand's credibility. With a prime business address and dedicated services, you instantly elevate your company's image, fostering trust among clients and partners.",
    bgClass: "bg-[#ffffffbd]",
  },
];

const faqItems = [
  {
    question: "What is included in our package?",
    answer: "For just $99/month, Opus Virtual Offices offers an all-inclusive package with no hidden fees. This package provides a live receptionist to professionally handle calls, a prestigious corporate mailing address, dedicated company phone and fax numbers, and the convenience of voicemail and fax conversions sent directly to your email. Additionally, they offer premium call transferring, ensuring you're always connected,. All these features are designed to give businesses a professional edge at an affordable rate.",
  },
  {
    question: "How does a virtual office manage mail and package handling?",
    answer: "With a virtual office, your mail and packages are sent to the office's address. They safely store your items until you're ready to pick them up. You can either collect them in person or have them forwarded to a different address.",
  },
  {
    question: "Are there physical meeting rooms available for use",
    answer: "Yes! virtual offices offer physical meeting rooms for when you need to get together with your team, want to work in a quiet space or have client meetings and contracts to sign.",
  },
];

const virtualOfficeFaqs = [
  {
    question: "What is a virtual office?",
    answer: "A virtual office is an actual physical business address and telephone number that allows you to have a complete business presence no matter where you are actually working, without the high cost of a full-time office and receptionist. Think of it as an 'office on demand', which is a much more flexible alternative for those who do not need to go into the office on a daily basis. It is not a coworking space, but rather an actual physical office with meeting rooms which you can pay to use as needed based on your business needs.",
  },
  {
    question: "How should I choose a virtual office address?",
    answer: "You can choose a virtual office address from one of many different virtual office locations that we have around the country. You might pick an address that is located close to your home if you anticipate having meetings in the office or picking up mail at your office on a regular basis. Alternatively, you might opt for a more prestigious location, such as on Broadway in New York City or a location in a business-friendly state such as Delaware or Florida. The decision really depends on your individual needs and preferences.",
  },
  {
    question: "Can I get a virtual office near me?",
    answer: "At Opus, we have locations in a variety of different cities. You can create a virtual office near you, or you can opt for one in a global network that will give your business access to many more clients.",
  },
  {
    question: "What are the best cities for virtual office addresses?",
    answer: "Virtual office addresses give you instant access to a wide customer base when you pick a popular city. Some of our most popular locations include Atlanta, Austin, Beverly Hills, Boca Raton, Brooklyn, Delaware, Ft Lauderdale, Chicago, Dallas, Houston, Los Angeles, Miami, Nashville, New York City, Orlando and Tampa. There are many other options as well.",
  },
  {
    question: "Can I receive mail at my virtual office?",
    answer: "One of the most common purposes of a virtual office is to receive mail. This is an important way to keep your home address private and use your company name and business address to receive mail instead. At Opus, we receive all of your mail and packages for you, which you can pick up or have forwarded (additional charges may apply for mail forwarding).",
  },
  {
    question: "Is a virtual office in a coworking space?",
    answer: "Some virtual office addresses may be located in a coworking space, while others are located in prestigious office buildings, and some may even be located at postal service centers, such as a UPS store. The address you choose depends on your individual needs, such as proximity to your home versus prestige and professional presence.",
  },
  {
    question: "Will I get a local phone number with a virtual office?",
    answer: "Yes, you will receive a local phone number that matches your chosen address when you sign up for an Opus virtual office. You can then set up personalized call features, such as a voicemail box that states your business name.",
  },
  {
    question: "Does a virtual office require a long-term lease?",
    answer: "At Opus, our virtual office plans have an initial three-month commitment. After that, clients can terminate with only 30-day's notice. Most of our competitors require 6-24 month commitments.",
  },
  {
    question: "Why is a virtual office better than a traditional office space?",
    answer: "With traditional private offices, there are typically long-term commitments and much higher overhead costs that can be difficult for small businesses to afford. A virtual office, on the other hand, gives your business an instant presence without sacrificing your bottom line. A virtual office provides you with an actual physical business address and telephone number that allows you to have a complete business presence, without the high cost of a full-time office and receptionist. Think of it as an 'office on demand', which is a much more flexible alternative for those who do not need to go into the office on a daily basis. You can reap all of the benefits of a physical location and access premier administrative services for your business without high costs and long-term commitments.",
  },
  {
    question: "Can I open a bank account with a virtual office location?",
    answer: "Yes, you can typically use your virtual office to open a business bank account. Your business name will be registered to this address, so you should be able to use the address for all business activities. That said, we do not control the banks and cannot make any guarantees in regard to an individual bank's decision-making process. We can confidently say that we have thousands of customers who have successfully opened bank accounts while using our virtual office locations.",
  },
  {
    question: "How does virtual office package receiving work?",
    answer: "With an Opus virtual office, we will take care of all of your mail handling needs in a secure and professional environment. You simply choose one of our professional business addresses to be your primary business mailing address, and we will accept all of your letters and packages on your behalf (package restrictions such as size and weight limitations may exist based on individual location rules and regulations).",
  },
  {
    question: "Can I use my virtual office for business registration?",
    answer: "Yes, you can typically use your virtual office to register your business. This is an ideal option for an LLC or other small business if you do not want to utilize your personal residence to register your company. That said, registrations are handled on an individual basis and some professions or types of businesses may be precluded from registering their business utilizing a virtual office address. We can confidently say that we have thousands of customers who have successfully registered their businesses throughout the United States while using our virtual office locations. We recommend calling one of our customer service representatives to discuss your individual situation if you have any concerns.",
  },
  {
    question: "What makes Opus a lower cost virtual office option?",
    answer: "At under $100 per month, Opus offers low-cost virtual office services to help your business access all of the business and communication services you need to succeed. With a full-time physical location, you will have to spend much more in order to maintain an office environment, with costs like utilities, rent, internet, cleaning, and staffing quickly adding up. Opus's virtual office plans start at $99 per month, and you can add any additional features you need to access individually, meaning you only pay for what you need and do not pay for anything you don't.",
  },
  {
    question: "Can I work remotely with a virtual office?",
    answer: "Having a virtual office allows modern professionals to work remotely, saving money on full-time private offices and traditional in-person spots. Your chosen virtual office partner will handle mail, answering phones, receiving packages, and many more logistical services to make your life easier.",
  },
  {
    question: "Can I meet clients in my virtual office?",
    answer: "Yes, you can typically pay by the hour or day to reserve meeting space at your chosen virtual office address. Virtual offices enable you to enhance your company's reputation and make it easier to manage communications, without committing to long-term contracts or the high costs associated with renting office space on a full-time basis.",
  },
  {
    question: "Is a virtual office the same as a registered agent address?",
    answer: "No, a Registered Agent is typically a separate service whereby all certified legal notices can be received on your behalf during normal business hours. That said, many of our Opus locations offer registered agent services at an additional charge.",
  },
  {
    question: "Why should I invest in a business address?",
    answer: "Investing in a business address helps keep your personal information safe so that malevolent actors cannot access it on the internet. You can use services like Opus to purchase a business address used for mail, packages, call answering, and more. This also helps create a professional appearance for your company when prospective customers search for you online.",
  },
  {
    question: "How does mail handling work with a virtual office?",
    answer: "With a virtual office, your mail will be sent to the address of the office you choose, where professional receptionists will receive it under your company name in a secure and professional environment. You can then pick it up at the address or have it forwarded to your home or other location of your choice (additional charges may apply for mail forwarding).",
  },
];

const leftColumnFaqs = virtualOfficeFaqs.slice(0, Math.ceil(virtualOfficeFaqs.length / 2));
const rightColumnFaqs = virtualOfficeFaqs.slice(Math.ceil(virtualOfficeFaqs.length / 2));

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface HomePageClientProps {
  testimonials: ReviewItem[];
}

export function HomePageClient({ testimonials }: HomePageClientProps) {
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  return (
    <div className="w-full flex pt-[72px] lg:pt-[104px]">
      <div className="flex w-full h-full flex-col items-start">
        <section className="flex flex-col items-center w-full bg-basewhite">
          <div className="flex flex-col w-full items-center gap-4 sm:gap-6 md:gap-8 px-0 py-6 sm:py-8 md:py-10">
            <div className="flex flex-col lg:flex-row items-start gap-6 md:gap-8 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0">
              <motion.div
                className="flex flex-col flex-1 items-start justify-start h-full w-full"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
              >
                <div className="flex flex-col items-start gap-4 sm:gap-6 w-full lg:max-w-[780px]">
                  <div className="flex flex-col w-full">
                    <h1 className="w-full text-[24px] leading-[32px] font-medium sm:text-[48px] sm:leading-[60px] sm:font-normal lg:tracking-[-0.96px]">
                      <span className="text-[#101828]">The Ultimate Virtual Office Solution.</span>
                    </h1>
                    <h2 className="w-full text-[24px] leading-[32px] font-medium sm:text-[48px] sm:leading-[60px] sm:font-normal lg:tracking-[-0.96px]">
                      <span className="font-bold text-blue-light400">All-Inclusive</span>
                      <span className="text-[#101828]"> with no long-term contracts for only </span>
                      <span className="font-bold text-blue-light400">$99</span>
                      <span className="text-[#101828]">/month.</span>
                    </h2>
                  </div>

                  <p className="font-normal text-gray-600 text-[18px] md:text-[20px] tracking-[0] leading-relaxed">
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

            <div className="flex flex-col items-start justify-center gap-2 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-[1280px] w-full px-4 sm:px-6 md:px-8 mx-auto">
                {interactiveCards.map((card, index) => {
                  const cardContent = (
                    <motion.div
                      className={`flex items-end gap-2 ${card.bgClass} flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative bg-cover bg-center cursor-pointer`}
                      style={card.bgImage ? { backgroundImage: `url(${card.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                      whileHover={{ scaleY: 1.1, scaleX: 1.1 }}
                      transition={{ duration: 0.3 }}
                      onClick={card.hasButton ? () => setIsVideoDialogOpen(true) : undefined}
                    >
                      {card.bgImage && (
                        <motion.div
                          className="absolute inset-0 z-0"
                          style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(119,119,119,1) 100%)' }}
                          initial={{ opacity: 1 }}
                          whileHover={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2 z-10">
                        <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] leading-[var(--text-sm-text-md-bold-line-height)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs sm:text-sm">
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
                      className={`flex w-full items-start h-[130px] ${index === 0 ? 'hidden sm:flex' : ''}`}
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
                  className="flex w-full items-start h-[130px]"
                  data-testid="card-pricing"
                >
                  <a href="/signup/?btn=902" className="flex flex-1 h-full">
                    <motion.div
                      className="flex items-end gap-2 bg-[linear-gradient(180deg,rgba(54,191,250,1)_0%,rgba(3,137,209,1)_100%),linear-gradient(0deg,rgba(54,191,250,1)_0%,rgba(54,191,250,1)_100%)] flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative cursor-pointer group"
                      initial="rest"
                      whileHover="hover"
                      variants={{
                        rest: { scaleY: 1, scaleX: 1, },
                        hover: { scaleY: 1.1, scaleX: 1.1 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                    <motion.div
                      className="absolute top-0 inset-x-0 flex items-center justify-center pt-3"
                      variants={{
                        rest: { opacity: 1 },
                        hover: { opacity: 1 }
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
                        rest: { gap: 1, },
                        hover: { gap: 12 }

                      }}

                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className="font-bold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-[48px]"
                        variants={{
                          rest: { y: 0 },
                          hover: { y: 4 }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        $99/mo
                      </motion.p>
                      <motion.p
                        className="font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-sm"
                        variants={{
                          rest: { opacity: 0, height: "0px", y: 0 },
                          hover: { opacity: 1, height: "auto", y: -4 }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        NO HIDDEN FEES
                      </motion.p>
                    </motion.div>

                    <motion.div
                      className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2"
                      variants={{
                        rest: { opacity: 1 },
                        hover: { opacity: 1 }
                      }}
                    >
                      <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] leading-[var(--text-sm-text-md-bold-line-height)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs sm:text-sm">
                        Sign Up Now
                      </p>
                    </motion.div>
                    </motion.div>
                  </a>
                </div>
              </div>

              <div
                className="sm:hidden w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1280px] flex flex-col items-center gap-3"
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
                <p className="font-semibold text-gray-600 text-center">
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
              <div className="w-full h-[283px] rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${newYorkAerialView})` }} />
            </motion.div>
          </div>

          <motion.div
            className="inline-flex flex-col items-center px-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] text-center tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)]">
              See below if a virtual office is a good fit for you
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

        <section className="flex flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-[81px] px-0 py-6 sm:py-8 md:py-10 w-full bg-[#ffffff]">
          <motion.div
            className="flex flex-col lg:flex-row max-w-screen-xl items-start justify-center gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-0 w-full"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex flex-col items-start gap-5 flex-1 w-full"
              variants={fadeInUp}
            >
              <Badge
                variant="secondary"
                className="font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[#016aa2] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] [font-style:var(--text-md-semibold-font-style)] bg-transparent border-0 p-0 h-auto"
              >
                Success Seekers
              </Badge>

              <div className="inline-flex flex-col items-start gap-4 sm:gap-5">
                <h2 className="font-display-md-semibold font-[number:var(--display-md-semibold-font-weight)] text-[#181d27] text-[length:var(--display-md-semibold-font-size)] tracking-[var(--display-md-semibold-letter-spacing)] leading-[var(--display-md-semibold-line-height)] [font-style:var(--display-md-semibold-font-style)] text-2xl sm:text-3xl md:text-4xl">
                  Who Truly Benefits
                  <br />
                  from a Virtual Office?
                </h2>

                <p className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)]">
                  From budding entrepreneurs to established enterprises, a
                  virtual office elevates professionalism and flexibility,
                  setting the stage for success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-[8px_32px] md:auto-rows-fr">
                {benefitTypes.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="w-full md:w-[310px] h-full flex flex-col items-start gap-1 justify-start"
                    data-testid={`benefit-${index}`}
                    variants={fadeInUp}
                  >
                    <h3 className="font-display-xs-semibold font-[number:var(--display-xs-semibold-font-weight)] text-[#181d27] text-[length:var(--display-xs-semibold-font-size)] tracking-[var(--display-xs-semibold-letter-spacing)] leading-[var(--display-xs-semibold-line-height)] [font-style:var(--display-xs-semibold-font-style)] flex-shrink-0">
                      {benefit.title}
                    </h3>
                    <p className="font-text-lg-regular font-[number:var(--text-lg-regular-font-weight)] text-[#181d27] text-[length:var(--text-lg-regular-font-size)] tracking-[var(--text-lg-regular-letter-spacing)] leading-[var(--text-lg-regular-line-height)] [font-style:var(--text-lg-regular-font-style)] flex-1">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col w-screen lg:w-[500px] self-stretch items-center justify-center gap-5 sm:gap-[29px] -ml-4 -mr-4 px-4 py-5 sm:-ml-6 sm:-mr-6 sm:px-6 md:-ml-8 md:-mr-8 md:px-8 lg:ml-0 lg:mr-0 lg:p-[30px] bg-cover bg-center"
              style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${officeBuildingImg})` }}
              variants={fadeInUp}
            >
              {featureCards.map((card, index) => (
                <Card
                  key={index}
                  className={`flex flex-col items-start justify-center gap-3 sm:gap-[17px] p-5 sm:p-[30px] flex-1 w-full ${card.bgClass} rounded-lg shadow-[0px_4px_4px_#00000040] border-0`}
                  data-testid={`feature-card-${index}`}
                >
                  <CardContent className="flex flex-col items-start gap-2 w-full p-0">
                    <div className="inline-flex flex-col items-start gap-3.5">
                      {index === 0 && (
                        <img
                          className="w-[35px] h-[37px]"
                          alt="Headset icon"
                          src="/headset-icon.svg"
                          width="35"
                          height="37"
                          loading="eager"
                        />
                      )}
                      {index === 1 && (
                        <img
                          className="w-[35px] h-[34px]"
                          alt="Star icon"
                          src="/star-icon.svg"
                          width="35"
                          height="34"
                          loading="eager"
                        />
                      )}
                      <h3 className="font-display-xs-semibold font-[number:var(--display-xs-semibold-font-weight)] text-[#181d27] text-[length:var(--display-xs-semibold-font-size)] tracking-[var(--display-xs-semibold-letter-spacing)] leading-[var(--display-xs-semibold-line-height)] [font-style:var(--display-xs-semibold-font-style)]">
                        {card.title}
                      </h3>
                      <img
                        className="w-[53px] h-[3px]"
                        alt="Vector"
                        src="/figmaAssets/vector-3.svg"
                        width="53"
                        height="3"
                        loading="eager"
                      />
                    </div>
                    <p className="font-text-lg-regular font-[number:var(--text-lg-regular-font-weight)] text-[#181d27] text-[length:var(--text-lg-regular-font-size)] tracking-[var(--text-lg-regular-letter-spacing)] leading-[var(--text-lg-regular-line-height)] [font-style:var(--text-lg-regular-font-style)]">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <CTABanner />

        <section className="flex flex-col w-full gap-8 sm:gap-12 md:gap-16 px-0 py-10 sm:py-12 md:py-[60px] bg-basewhite items-center">
          <motion.div
            className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 md:gap-16 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex flex-col w-full lg:max-w-screen-md items-start gap-4 sm:gap-5 flex-1"
              variants={fadeInUp}
            >
              <div className="flex flex-col items-start gap-3 w-full">
                <h2 className="font-[number:var(--display-sm-display-md-semibold-font-weight)] text-[#181d27] text-[length:var(--display-sm-display-md-semibold-font-size)] tracking-[var(--display-sm-display-md-semibold-letter-spacing)] leading-[var(--display-sm-display-md-semibold-line-height)] font-display-sm-display-md-semibold [font-style:var(--display-sm-display-md-semibold-font-style)] text-2xl sm:text-3xl md:text-4xl">
                  Curious About Renting a Virtual Office?
                </h2>
              </div>

              <p
                className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)]"
              >
                Explore how a virtual office can elevate your business presence
                while offering unparalleled flexibility. Tailored solutions
                await you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center w-full">
                <a href="tel:+18888989868" className="w-full sm:w-auto">
                  <Button className="h-auto inline-flex items-center justify-center gap-1.5 px-[18px] py-3 w-full sm:w-auto bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]" data-testid="button-talk-expert">
                    Talk to an expert
                  </Button>
                </a>

                <div className="gap-2 inline-flex items-center justify-center">
                  <a href="tel:+18888989868" className="font-text-xl-semibold font-[number:var(--text-xl-semibold-font-weight)] text-gray-600 text-[length:var(--text-xl-semibold-font-size)] tracking-[var(--text-xl-semibold-letter-spacing)] leading-[var(--text-xl-semibold-line-height)] [font-style:var(--text-xl-semibold-font-style)] hover:text-[#181d27] transition-colors">
                    1 (888) 898 - 9868
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col w-full items-start gap-6 sm:gap-8 flex-1"
              variants={fadeInUp}
            >
              <Accordion type="single" collapsible className="w-full space-y-6">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-0"
                    data-testid={`faq-${index}`}
                  >
                    <AccordionTrigger className="flex items-start justify-between gap-4 sm:gap-6 w-full hover:no-underline py-0 [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
                      <p className="font-text-xl-medium font-[number:var(--text-xl-medium-font-weight)] text-[#181d27] text-[length:var(--text-xl-medium-font-size)] tracking-[var(--text-xl-medium-letter-spacing)] leading-[var(--text-xl-medium-line-height)] [font-style:var(--text-xl-medium-font-style)] text-left flex-1">
                        {item.question}
                      </p>
                      <div className="relative inline-flex items-start pt-0.5 pb-0 px-0 shrink-0 w-6 h-6">
                        <PlusCircle className="plus-icon w-6 h-6 text-[#667085] absolute top-0 left-0" />
                        <MinusCircle className="minus-icon w-6 h-6 text-[#667085] absolute top-0 left-0" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4 pb-0">
                      <p className="font-text-lg-regular font-[number:var(--text-lg-regular-font-weight)] text-[#181d27] text-[length:var(--text-lg-regular-font-size)] tracking-[var(--text-lg-regular-letter-spacing)] leading-[var(--text-lg-regular-line-height)] [font-style:var(--text-lg-regular-font-style)]">
                        {item.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </section>

        <HomePopularLocations />

        <section className="flex flex-col w-full gap-8 sm:gap-12 md:gap-16 px-0 py-10 sm:py-12 md:py-[60px] bg-basewhite items-center">
          <motion.div
            className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex flex-col items-center gap-4 sm:gap-5 w-full text-center"
              variants={fadeInUp}
            >
              <h2 className="font-[number:var(--display-md-semibold-font-weight)] text-[#181D27] text-[length:var(--display-md-semibold-font-size)] tracking-[var(--display-md-semibold-letter-spacing)] leading-[var(--display-md-semibold-line-height)] font-display-md-semibold [font-style:var(--display-md-semibold-font-style)] text-center">
                Curious About Renting a Virtual Office?
              </h2>

              <p
                className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#535862] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)] text-center max-w-[768px]"
              >
                Explore how a virtual office can elevate your business presence while offering unparalleled flexibility. Tailored solutions await you.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col lg:flex-row w-full items-start gap-6 sm:gap-8"
              variants={fadeInUp}
            >
              <div className="flex flex-col w-full lg:w-1/2 gap-6">
                <Accordion type="single" collapsible className="w-full space-y-6">
                  {leftColumnFaqs.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`virtual-office-faq-${index}`}
                      className="border-0"
                      data-testid={`virtual-office-faq-${index}`}
                    >
                      <AccordionTrigger className="flex items-start justify-between gap-4 sm:gap-6 w-full hover:no-underline py-0 [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
                        <p className="font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[#181D27] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] [font-style:var(--text-md-semibold-font-style)] text-left flex-1">
                          {item.question}
                        </p>
                        <div className="relative inline-flex items-start pt-0.5 pb-0 px-0 shrink-0 w-6 h-6">
                          <PlusCircle className="plus-icon w-6 h-6 text-[#667085] absolute top-0 left-0" />
                          <MinusCircle className="minus-icon w-6 h-6 text-[#667085] absolute top-0 left-0" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-0">
                        <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[#535862] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="flex flex-col w-full lg:w-1/2 gap-6">
                <Accordion type="single" collapsible className="w-full space-y-6">
                  {rightColumnFaqs.map((item, index) => (
                    <AccordionItem
                      key={index + leftColumnFaqs.length}
                      value={`virtual-office-faq-${index + leftColumnFaqs.length}`}
                      className="border-0"
                      data-testid={`virtual-office-faq-${index + leftColumnFaqs.length}`}
                    >
                      <AccordionTrigger className="flex items-start justify-between gap-4 sm:gap-6 w-full hover:no-underline py-0 [&[data-state=open]_.plus-icon]:hidden [&[data-state=closed]_.minus-icon]:hidden">
                        <p className="font-text-md-semibold font-[number:var(--text-md-semibold-font-weight)] text-[#181D27] text-[length:var(--text-md-semibold-font-size)] tracking-[var(--text-md-semibold-letter-spacing)] leading-[var(--text-md-semibold-line-height)] [font-style:var(--text-md-semibold-font-style)] text-left flex-1">
                          {item.question}
                        </p>
                        <div className="relative inline-flex items-start pt-0.5 pb-0 px-0 shrink-0 w-6 h-6">
                          <PlusCircle className="plus-icon w-6 h-6 text-[#667085] absolute top-0 left-0" />
                          <MinusCircle className="minus-icon w-6 h-6 text-[#667085] absolute top-0 left-0" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4 pb-0">
                        <p className="font-text-md-regular font-[number:var(--text-md-regular-font-weight)] text-[#535862] text-[length:var(--text-md-regular-font-size)] tracking-[var(--text-md-regular-letter-spacing)] leading-[var(--text-md-regular-line-height)] [font-style:var(--text-md-regular-font-style)]">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <HomePageCTABanner />

        <Reviews testimonials={testimonials} />

        <SectionSpacer />

        <EbookBanner />

        <div className="py-6 sm:py-8 md:py-10"></div>

        <Footer />
      </div>

      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-0">
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
  );
}

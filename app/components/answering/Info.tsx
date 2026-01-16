"use client";
import { motion } from "framer-motion";
import { WhoBenefitsSection } from "../WhoBenefitsSection";
import { CTABanner } from "../CTABanner";
import { Reviews, type ReviewItem } from "../Reviews";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useIsMobile } from "@/app/hooks/use-mobile";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

interface InfoProps {
  testimonials: ReviewItem[];
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Sanitizes HTML content by removing WordPress comments and cleaning up the HTML
 */
function sanitizeHtml(html: string): string {
  // Remove WordPress comments (<!-- wp:... --> and <!-- /wp:... -->)
  let cleaned = html.replace(/<!--\s*\/?wp:[^>]*-->/g, "");

  // Clean up extra whitespace and newlines
  cleaned = cleaned.replace(/\n\s*\n/g, "\n").trim();

  return cleaned;
}

const faqItems = [
  {
    question: "Can I use my existing company phone number",
    answer:
      "<!-- wp:paragraph -->\n<p>Yes, there are 2 ways you are able to keep your existing company phone number:</p>\n<!-- /wp:paragraph -->\n\n<!-- wp:paragraph -->\n<p>1. By setting up call forwarding from your current carrier to the phone number you choose with Opus Virtual Offices (this process works instantly)<br>2. By porting your current company phone number from your existing carrier to the Opus Virtual Offices carrier (this process takes about 10 business days)</p>\n<!-- /wp:paragraph -->",
  },
  {
    question:
      "Do you use an automated phone service or a receptionist to answer?",
    answer:
      "We offer a live, personalized receptionist to transfer your calls during business hours Monday to Friday. Calls made after hours will be met with a professional voicemail.",
  },
  {
    question: "How do virtual office phone answering and call forwarding work?",
    answer:
      "Yes. At Opus VO, we understand the importance of continuity. Why have a business number for incoming calls only? With our live call answering service, for an additional $10 per month, add our call out feature, where we give you the capability to make calls directly from your cell phone using your business number. This ensures your client communications remain seamless and professional every time, while keeping your personal cell phone number private.",
  },
];

const phoneServices = [
  {
    imageSrc: "/assets/info/Avatar1.png",
    imageAlt: "Live Receptionist",
    title: "Live Receptionist <br /> Answering Calls",
    description:
      "Our Live Receptionist service ensures your calls are professionally managed. Available Monday to Friday, 8:30am to 5:30pm PST (8am to 5pm in PST), our skilled receptionists will handle incoming calls, providing a seamless and professional experience for your clients.",
    gap: "gap-[32px]",
  },
  {
    imageSrc: "/assets/info/Avatar2.png",
    imageAlt: "Premium Call Transferring",
    title: "Premium <br /> Call Transferring",
    description:
      "With our Premium Call Transferring service, never miss a call. Calls to your personal extension are forwarded to up to four numbers you designate. If unanswered, they go to your personal voicemail, ensuring you're always reachable.",
    gap: "gap-[32px]",
  },
  {
    imageSrc: "/assets/info/Avatar3.png",
    imageAlt: "Voicemail to Email",
    title: "Voicemail <br /> Converted to Email",
    description:
      "Stay connected with our Voicemail-to-Email service. Voicemails are converted to WAV files and sent to your email, allowing you to access messages anytime, anywhere, and maintain constant communication.",
    gap: "gap-[32px]",
  },
  {
    imageSrc: "/assets/info/Avatar4.png",
    imageAlt: "Company Phone and Fax",
    title: "Company Phone <br /> and Fax Number",
    description:
      "Choose a local phone and fax number as your primary company line with our Phone and Fax Number service. You can also forward your existing number to the selected one for professional handling, ensuring a consistent and professional image for your business.",
    gap: "gap-[32px]",
  },
];

export function Info({ testimonials }: InfoProps) {
  const isMobile = useIsMobile();
  return (
    <div className="mb-[40px]">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center justify-center">
        {!isMobile && (
          <motion.div
            className="inline-flex flex-col items-center px-4 mt-[40px] pb-[41px]"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <p className="relative font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] text-center tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)]">
              See below if a virtual office is a good fit for you
              <Image
                src="/assets/info/star.svg"
                alt="Section Icon"
                width={24}
                height={24}
                className="absolute bottom-[31px] right-[36%] translate-x-[50%]"
              />
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
        )}
        <WhoBenefitsSection />
      </div>
      <CTABanner
        title={
          <>
            Ready to Elevate Your
            <br /> Business Communication?
          </>
        }
        description="Don't Miss This Opportunity!"
        buttonText="Sign up Now!"
        buttonHref="/signup/?btn=903"
      />
      <section className="max-w-[1280px] mx-auto px-[10px] md:px-[32px] flex flex-col items-center justify-center my-[20px] md:my-[40px]">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center"
        >
          <h4 className="text-[#026AA2] text-[16px] font-semibold">
            Boost your professional image
          </h4>
          <h2 className="text-[36px] font-semibold text-primary mt-[10px] leading-[44px] text-center">
            Phone Answering Services
          </h2>
          <p className="text-[16px] font-normal text-primary mt-[10px] text-center">
            Join the multitude of satisfied clients who have transformed <br />{" "}
            their business communication with our services.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[72px] gap-y-[40px] mt-[44px] w-full max-w-[1152px]">
          {phoneServices.map((service, index) => (
            <motion.div
              key={index}
              className={`flex flex-col md:flex-row items-center md:items-start ${service.gap}`}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="w-[138px] h-[138px] rounded-full overflow-hidden bg-gray-100 flex-shrink-0 md:self-center">
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={138}
                  height={138}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[20px] flex-1 text-center md:text-left">
                <h3
                  className="font-semibold text-[#3E465A] text-[24px] tracking-[0] leading-[32px]"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />
                <p className="text-[16px] font-normal text-[#3E465A] tracking-[0] leading-[24px]">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
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
                Curious About Our Phone Answering Service?
              </h2>
            </div>

            <p className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)]">
              Explore how a phone answering service can elevate your business
              presence while offering unparalleled flexibility. Tailored
              solutions await you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center w-full">
              <a href="tel:+18888989868" className="w-full sm:w-auto">
                <Button
                  className="h-auto inline-flex items-center justify-center gap-1.5 px-[18px] py-3 w-full sm:w-auto bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]"
                  data-testid="button-talk-expert"
                >
                  Talk to an expert
                </Button>
              </a>

              <div className="gap-2 inline-flex items-center justify-center">
                <a
                  href="tel:+18888989868"
                  className="font-text-xl-semibold font-[number:var(--text-xl-semibold-font-weight)] text-gray-600 text-[length:var(--text-xl-semibold-font-size)] tracking-[var(--text-xl-semibold-letter-spacing)] leading-[var(--text-xl-semibold-line-height)] [font-style:var(--text-xl-semibold-font-style)] hover:text-[#181d27] transition-colors"
                >
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
                    <div
                      className="font-text-lg-regular font-[number:var(--text-lg-regular-font-weight)] text-[#181d27] text-[length:var(--text-lg-regular-font-size)] tracking-[var(--text-lg-regular-letter-spacing)] leading-[var(--text-lg-regular-line-height)] [font-style:var(--text-lg-regular-font-style)]"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtml(item.answer),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </section>
      <Reviews testimonials={testimonials} />
    </div>
  );
}

'use client';
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

interface CTABannerProps {
  title?: string | React.ReactNode;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundImage?: string;
}

export function CTABanner({
  title = "Over 650 Locations Across the USA",
  description = "All-Inclusive Virtual Office Services for Only $99/mo.",
  buttonText = "Sign Up Now",
  buttonHref = "/signup/?btn=903",
  backgroundImage = "/bg-cta_1761591194000.webp"
}: CTABannerProps) {
  return (
    <motion.section
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <h2 className="font-semibold text-[#181d27] text-[30px] leading-[38px] sm:text-2xl sm:leading-tight md:text-3xl tracking-[0] text-center">
        {title}
      </h2>

      <p className="font-text-xl-regular font-[number:var(--text-xl-regular-font-weight)] text-[#181d27] text-[length:var(--text-xl-regular-font-size)] tracking-[var(--text-xl-regular-letter-spacing)] leading-[var(--text-xl-regular-line-height)] [font-style:var(--text-xl-regular-font-style)] text-center">
        {description}
      </p>

      <a href={buttonHref}>
        <Button className="h-auto gap-1.5 px-[18px] py-3 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]" data-testid="button-sign-up">
          {buttonText}
        </Button>
      </a>
    </motion.section>
  );
}

"use client";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";

const officeBuildingImg = "/office-building_1761587957783.webp";

export const benefitTypes = [
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

export const featureCards = [
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function WhoBenefitsSection() {
  return (
    <section className="flex flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 lg:gap-[81px] px-0 py-6 sm:py-8 md:py-10 w-full bg-[#ffffff] overflow-x-hidden">
      <motion.div
        className="flex flex-col lg:flex-row max-w-screen-xl items-start justify-center gap-6 md:gap-8 px-4 sm:px-6 md:px-8 py-0 w-full"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col items-start gap-5 flex-1 w-full min-w-0"
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
              From budding entrepreneurs to established enterprises, a virtual
              office elevates professionalism and flexibility, setting the stage
              for success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 md:gap-x-8 md:gap-y-2 md:auto-rows-fr">
            {benefitTypes.map((benefit, index) => (
              <motion.div
                key={index}
                className="w-full min-w-0 h-full flex flex-col items-start gap-1 justify-start"
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
          className="flex flex-col w-full lg:w-[500px] lg:flex-shrink-0 self-stretch items-center justify-center gap-5 sm:gap-[29px] px-4 py-5 sm:px-6 md:px-8 lg:p-[30px] bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${officeBuildingImg})`,
          }}
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
  );
}

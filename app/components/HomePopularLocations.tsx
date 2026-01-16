'use client';
import Link from "next/link";
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

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const popularLocations = [
  { name: "Atlanta, GA", image: "/atlanta.webp", href: "/virtual-office/georgia/atlanta/location-684/" },
  { name: "Chicago, IL", image: "/chicago.webp", href: "/virtual-office/illinois/chicago/location-1430/" },
  { name: "Dallas, TX", image: "/dallas.webp", href: "/virtual-office/texas/dallas/location-1255/" },
  { name: "Houston, TX", image: "/houston.webp", href: "/virtual-office/texas/houston/location-1323/" },
  { name: "Los Angeles, CA", image: "/los-angeles.webp", href: "/virtual-office/california/los-angeles/location-1362/" },
  { name: "Miami, FL", image: "/miami.webp", href: "/virtual-office/florida/miami/location-1285/" },
  { name: "New York, NY", image: "/new-york.webp", href: "/virtual-office/new-york/new-york/location-1450/" },
  { name: "Tampa, FL", image: "/tampa.webp", href: "/virtual-office/florida/tampa/location-885/" },
];

interface HomePopularLocationsProps {
  title?: string;
  description?: string;
  showViewAllLink?: boolean;
  count?: number;
  align?: 'left' | 'center';
}

export function HomePopularLocations({
  title = "Most Popular Locations",
  description,
  showViewAllLink = true,
  count = 8,
  align = 'center'
}: HomePopularLocationsProps) {
  const displayedLocations = popularLocations.slice(0, count);
  const alignClass = align === 'left' ? 'items-start' : 'items-center';
  const textAlignClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <section className={`w-full ${alignClass} gap-6 sm:gap-8 px-0 py-8 sm:py-10 bg-[#ffffff] flex flex-col`}>
      <motion.div
        className={`flex flex-col ${alignClass} gap-6 sm:gap-8 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0 mx-auto`}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className={`flex flex-col ${alignClass} gap-6 sm:gap-8 w-full`}>
          <div className={`max-w-screen-md ${alignClass} flex flex-col gap-4 sm:gap-5 w-full`}>
            <div className={`flex flex-col ${alignClass} gap-3 w-full`}>
              <h2 className={`font-[number:var(--display-md-semibold-font-weight)] text-gray-900 text-[length:var(--display-md-semibold-font-size)] ${textAlignClass} tracking-[var(--display-md-semibold-letter-spacing)] leading-[var(--display-md-semibold-line-height)] font-display-md-semibold [font-style:var(--display-md-semibold-font-style)] text-2xl sm:text-3xl md:text-4xl`}>
                {title}
              </h2>
              {description && (
                <p className={`text-gray-600 text-xl leading-[30px] ${textAlignClass} max-w-[768px]`}>
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0 mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
          {displayedLocations.map((location, index) => (
            <Link key={index} href={location.href} prefetch={false}>
              <motion.div
                className="flex flex-col items-start gap-4 sm:gap-6"
                data-testid={`location-${index}`}
                variants={fadeInUp}
              >
                <div
                  className="w-full aspect-square sm:h-[200px] sm:aspect-auto rounded-lg bg-cover bg-center relative overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundImage: `url(${location.image})` }}
                >
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-center sm:justify-start p-3 sm:p-4" style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)' }}>
                    <h3 className="sm:hidden font-semibold text-white text-base tracking-[0] leading-normal text-center">
                      {location.name}
                    </h3>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-start w-full">
                  <h3 className="font-semibold text-gray-900 text-lg sm:text-xl tracking-[0] leading-normal hover:text-blue-light400 transition-colors">
                    {location.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {showViewAllLink && (
          <div className="max-w-screen-xl justify-center gap-2 px-0 py-0 w-full flex flex-col items-center">
            <Link href="/virtual-office/" prefetch={true}>
              <p className="font-normal text-gray-600 text-base sm:text-lg md:text-xl tracking-[0] leading-relaxed text-center hover:text-blue-light400 transition-colors cursor-pointer">
                <span className="font-text-xl-regular [font-style:var(--text-xl-regular-font-style)] tracking-[var(--text-xl-regular-letter-spacing)] text-[length:var(--text-xl-regular-font-size)] font-semibold">
                  View All Locations
                </span>
              </p>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}

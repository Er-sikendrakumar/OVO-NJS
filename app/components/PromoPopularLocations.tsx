"use client";
import Link from "next/link";
import Image from "next/image";

type PopularLocation = {
  name: string;
  image?: string;
  location_image_url?: string;
  city_featured_image_url?: string;
  city?: string;
  state?: string;
  state_abbr?: string;
  href?: string;
  link?: string;
};

const popularLocations: PopularLocation[] = [
  {
    name: "Atlanta, GA",
    image: "/atlanta.webp",
    href: "/virtual-office/georgia/atlanta/location-684/",
  },
  {
    name: "Austin, TX",
    image: "/austin.webp",
    href: "/virtual-office/texas/austin/location-1475/",
  },
  {
    name: "Beverly Hills, CA",
    image: "/beverly-hills.webp",
    href: "/virtual-office/california/beverly-hills/location-936/",
  },
  {
    name: "Boca Raton, FL",
    image: "/boca-raton.webp",
    href: "/virtual-office/florida/boca-raton/location-776/",
  },
  {
    name: "Brooklyn, NY",
    image: "/brooklyn.webp",
    href: "/virtual-office/new-york/brooklyn/location-1477/",
  },
  {
    name: "Chicago, IL",
    image: "/chicago.webp",
    href: "/virtual-office/illinois/chicago/location-1430/",
  },
  {
    name: "Dallas, TX",
    image: "/dallas.webp",
    href: "/virtual-office/texas/dallas/location-1255/",
  },
  {
    name: "Fort Lauderdale, FL",
    image: "/fort-lauderdale.webp",
    href: "/virtual-office/florida/fort-lauderdale/location-803/",
  },
  {
    name: "Houston, TX",
    image: "/houston.webp",
    href: "/virtual-office/texas/houston/location-1323/",
  },
  {
    name: "Los Angeles, CA",
    image: "/los-angeles.webp",
    href: "/virtual-office/california/los-angeles/location-1362/",
  },
  {
    name: "Miami, FL",
    image: "/miami.webp",
    href: "/virtual-office/florida/miami/location-1285/",
  },
  {
    name: "Nashville, TN",
    image: "/nashville.webp",
    href: "/virtual-office/tennessee/nashville/location-1476/",
  },
  {
    name: "New York, NY",
    image: "/new-york.webp",
    href: "/virtual-office/new-york/new-york/location-1450/",
  },
  {
    name: "Orlando, FL",
    image: "/orlando.webp",
    href: "/virtual-office/florida/orlando/location-1499/",
  },
  {
    name: "Tampa, FL",
    image: "/tampa.webp",
    href: "/virtual-office/florida/tampa/location-885/",
  },
  {
    name: "Wilmington, DE",
    image: "/delaware.webp",
    href: "/virtual-office/delaware/wilmington/location-942/",
  },
];

interface PopularLocationsProps {
  isba?: boolean;
  title?: string;
  description?: string;
  showViewAllLink?: boolean;
  count?: number;
  align?: "left" | "center";
  locations?: PopularLocation[];
}

const mobileLocationOrder = [
  // Priority locations (keep these first)
  "Atlanta, GA",
  "Chicago, IL",
  "Dallas, TX",
  "Houston, TX",
  "Los Angeles, CA",
  "New York, NY",
  "Miami, FL",
  "Tampa, FL",

  // Remaining locations
  "Austin, TX",
  "Beverly Hills, CA",
  "Boca Raton, FL",
  "Brooklyn, NY",
  "Fort Lauderdale, FL",
  "Nashville, TN",
  "Orlando, FL",
  "Wilmington, DE",
];

const IMAGE_URL = "https://www.opusvirtualoffices.com";
const mobileLocations = mobileLocationOrder
  .map((name) => popularLocations.find((location) => location.name === name))
  .filter((location): location is PopularLocation => Boolean(location));

export function PromoPopularLocations({
  count = 16,
  align = "left",
  locations,
}: PopularLocationsProps) {
  const sourceLocations = locations?.length ? locations : popularLocations;
  const displayedLocations = sourceLocations.slice(0, count);
  const mobileLocationsData = locations?.length
    ? displayedLocations
    : mobileLocations;
  const resolveImage = (location: PopularLocation, index: number) =>
    location.image ??
    location.location_image_url ??
    location.city_featured_image_url ??
    popularLocations[index % popularLocations.length]?.image ??
    "";

  // When align is 'center', add mx-auto to center the main container
  const containerClass =
    align === "center"
      ? "flex w-full flex-col items-start mx-auto"
      : "flex w-full  flex-col items-start ";

  return (
    <div className="flex w-full py-0 px-0 flex-col items-center bg-white">
      {/* Mobile layout */}
      <div className="popular-locations-mobile md:hidden w-full">
        <div className="popular-locations-mobile__list !px-0 !gap-[18px] !sm:grid sm:grid-cols-3 ">
          {mobileLocationsData.map((location, index) => (
            <Link
              key={location.name}
              href={location.href ?? location.link ?? "#"}
              prefetch={false}
              className="popular-locations-mobile__card"
            >
              <div className="relative h-[130px] w-full overflow-hidden rounded-lg flex flex-col justify-end">
                <Image
                  src={IMAGE_URL + resolveImage(location, index)}
                  alt={location.name}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 w-full flex flex-col items-center justify-end pb-[2px] lg:pb-3 lg:px-3">
                  <span className="text-white md:font-bold md:text-[8px] md:leading-[12px] text-sm font-semibold text-center w-full">
                    {location.city && location.state_abbr
                      ? `${location.city}, ${location.state_abbr}`
                      : location.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className={`${containerClass} hidden md:flex`}>
        <div className="flex items-start content-start gap-x-[18px] gap-y-[18px] md:gap-x-[14px] md:gap-y-[12px] w-full flex-wrap">
          {displayedLocations.map((location, index) => (
            <Link
              key={index}
              href={location.href ?? location.link ?? "#"}
              prefetch={false}
              className="flex min-w-[195px] md:min-w-[99px] flex-col items-start gap-0 flex-1 basis-0"
            >
              <div className="h-[130px] md:h-[80px] self-stretch rounded-lg overflow-hidden relative">
                <img
                  src={IMAGE_URL + resolveImage(location, index)}
                  alt={location.city}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col items-start relative w-full">
                <div className="flex flex-col items-center w-full">
                  <h3 className="text-white md:text-[8px] md:leading-[12px] md:font-bold  text-sm font-semibold text-center -mt-3 w-full">
                    {location.city && location.state_abbr
                      ? `${location.city}, ${location.state_abbr}`
                      : location.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

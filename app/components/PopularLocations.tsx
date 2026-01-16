'use client';
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
  { name: "Atlanta, GA", image: "/atlanta.webp", href: "/virtual-office/georgia/atlanta/location-684/" },
  { name: "Austin, TX", image: "/austin.webp", href: "/virtual-office/texas/austin/location-1475/" },
  { name: "Beverly Hills, CA", image: "/beverly-hills.webp", href: "/virtual-office/california/beverly-hills/location-936/" },
  { name: "Boca Raton, FL", image: "/boca-raton.webp", href: "/virtual-office/florida/boca-raton/location-776/" },
  { name: "Brooklyn, NY", image: "/brooklyn.webp", href: "/virtual-office/new-york/brooklyn/location-1477/" },
  { name: "Chicago, IL", image: "/chicago.webp", href: "/virtual-office/illinois/chicago/location-1430/" },
  { name: "Dallas, TX", image: "/dallas.webp", href: "/virtual-office/texas/dallas/location-1255/" },
  { name: "Fort Lauderdale, FL", image: "/fort-lauderdale.webp", href: "/virtual-office/florida/fort-lauderdale/location-803/" },
  { name: "Houston, TX", image: "/houston.webp", href: "/virtual-office/texas/houston/location-1323/" },
  { name: "Los Angeles, CA", image: "/los-angeles.webp", href: "/virtual-office/california/los-angeles/location-1362/" },
  { name: "Miami, FL", image: "/miami.webp", href: "/virtual-office/florida/miami/location-1285/" },
  { name: "Nashville, TN", image: "/nashville.webp", href: "/virtual-office/tennessee/nashville/location-1476/" },
  { name: "New York, NY", image: "/new-york.webp", href: "/virtual-office/new-york/new-york/location-1450/" },
  { name: "Orlando, FL", image: "/orlando.webp", href: "/virtual-office/florida/orlando/location-1499/" },
  { name: "Tampa, FL", image: "/tampa.webp", href: "/virtual-office/florida/tampa/location-885/" },
  { name: "Wilmington, DE", image: "/delaware.webp", href: "/virtual-office/delaware/wilmington/location-942/" },
];

interface PopularLocationsProps {
  isba?: boolean;
  title?: string;
  description?: string;
  description2?: string;
  showViewAllLink?: boolean;
  count?: number;
  align?: 'left' | 'center';
  locations?: PopularLocation[];
}

const mobileLocationOrder = [
  "Atlanta, GA",
  "Chicago, IL",
  "Dallas, TX",
  "Houston, TX",
  "Los Angeles, CA",
  "New York, NY",
  "Miami, FL",
  "Tampa, FL",
];

// Helper to normalize image URLs - use relative paths to avoid hydration mismatches
const normalizeImageUrl = (url: string) => {
  if (!url) return '';

  // If already a relative path (starts with /), return as-is
  if (url.startsWith('/')) return url;

  // If it's an absolute URL, return as-is (already normalized from server)
  if (url.startsWith('http://') || url.startsWith('https://')) return url;

  // Otherwise, make it relative by prepending /
  return `/${url}`;
};

const mobileLocations = mobileLocationOrder
  .map((name) => popularLocations.find((location) => location.name === name))
  .filter((location): location is (typeof popularLocations)[number] => Boolean(location));

export function PopularLocations({
  isba,
  title = "Most Popular Cities",
  description = "From the skyscrapers of NYC to the valleys of California, you'll be sure to find the perfect new business address in all major cities across the country.",
  description2 = "",
  showViewAllLink = false,
  count = 16,
  align = 'left',
  locations,
}: PopularLocationsProps) {
  const sourceLocations = locations?.length ? locations : popularLocations;
  const displayedLocations = sourceLocations.slice(0, count);
  const mobileLocationsData = locations?.length ? displayedLocations : mobileLocations;

  // Helper function to convert URLs from /virtual-office/ to /business-address/
  const convertUrl = (url: string) => {
    if (isba && url) {
      return url.replace('/virtual-office/', '/business-address/');
    }
    return url;
  };

  const resolveImage = (location: PopularLocation, index: number) =>
    location.image
    ?? location.location_image_url
    ?? location.city_featured_image_url
    ?? popularLocations[index % popularLocations.length]?.image
    ?? "";

  // When align is 'center', add mx-auto to center the main container
  const containerClass = align === 'center' ? 'flex max-w-[1280px] w-full px-8 flex-col items-start gap-16 mx-auto' : 'flex max-w-[1280px] w-full px-8 flex-col items-start gap-16';

  return (
    <div className="flex w-full py-0 px-0 flex-col items-center bg-white">
      {/* Mobile layout */}
      <div className="popular-locations-mobile md:hidden w-full">
        <div className="flex flex-col gap-4 w-full px-4 pb-[44px] md:pb-6">
          <h2 className="text-gray-900 text-3xl lg:text-2xl font-semibold leading-[38px] lg:leading-8 tracking-[-0.48px]">
            {title}
          </h2>
          <p className="text-gray-600 text-[18px] lg:text-base font-normal leading-[28px] lg:leading-6 pb-6">
            {description}
            {description2 && (
              <>
                <br />
                {description2}
              </>
            )}
          </p>
        </div>
        <div className="popular-locations-mobile__list our-top ">
          {mobileLocationsData.map((location, index) => (
            <Link
              key={location.name}
              href={convertUrl(location.href ?? location.link ?? "#")}
              prefetch={false}
              className="popular-locations-mobile__card"
            >
              <div className="relative h-[200px] w-full overflow-hidden rounded-lg flex flex-col justify-end">
                <Image
                  src={normalizeImageUrl(resolveImage(location, index))}
                  alt={location.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" aria-hidden="true" />
                <div className="relative z-10 w-full flex flex-col items-center justify-end pb-[4px] lg:pb-3 lg:px-3">
                  <span className="text-white text-base font-bold leading-[24px] lg:leading-6 text-center w-full">
                    {location.city && location.state_abbr ? `${location.city}, ${location.state_abbr}` : location.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className={`${containerClass} hidden md:flex`}>
        <div className="flex flex-col items-start gap-8">
          <div className="flex max-w-[768px] flex-col items-start gap-5">
            <h2 className="text-gray-900 text-4xl font-semibold leading-[44px] tracking-[-0.72px]">
              {title}
            </h2>
            {isba ? (
              <p className="text-gray-600 text-[20px] font-normal leading-6">
                Over 100 Locations Across the USA <br />
                Prestigious Business Address for Only $59/mo
              </p>
            ) : (
              <p className="text-gray-600 text-[20px] font-normal leading-6">
                {description}
                {description2 && (
                  <>
                    <br />
                    {description2}
                  </>
                )}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start content-start gap-x-8 gap-y-12 w-full flex-wrap">
          {displayedLocations.map((location, index) => (
            <Link
              key={index}
              href={convertUrl(location.href ?? location.link ?? "#")}
              prefetch={false}
              className="flex min-w-[240px] flex-col items-start gap-6 flex-1 basis-0"
            >
              <div className="h-[200px] self-stretch rounded-lg overflow-hidden relative">
                <img
                  src={normalizeImageUrl(resolveImage(location, index))}
                  alt={location.city}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <div className="flex flex-col items-start gap-1 self-stretch">
                    <h3 className="self-stretch text-gray-900 text-xl font-semibold leading-[30px]">
                      {location.city && location.state_abbr ? `${location.city}, ${location.state_abbr}` : location.name}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

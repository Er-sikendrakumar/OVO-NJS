"use client";

import Link from "next/link";

type PopularLocation = {
  id: string;
  city: string;
  state_abbr: string;
  link: string;
  location_image_url?: string;
  city_featured_image_url?: string;
};

interface OurTopLocationsProps {
  locationsData?: any;
}

const getImageOrigin = () => {
  if (typeof window === 'undefined') return 'https://www.opusvirtualoffices.com';

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocalhost) return 'https://njs.opusvirtualoffices.com';

  return `${window.location.protocol}//${window.location.host}`;
};

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  const origin = getImageOrigin();
  if (url.startsWith("/")) return `${origin}${url}`;
  return `${origin}/${url}`;
};

export function OurTopLocations({ locationsData }: OurTopLocationsProps) {
  const locations: PopularLocation[] = Array.isArray(
    locationsData?.data?.all_popular
  )
    ? locationsData.data.all_popular
    : [];
  return (
    <section className="flex w-full bg-white py-[20px] md:py-[40px] lg:py-[40px]">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col w-full gap-[24px] md:gap-12 lg:gap-[64px]">
          {/* Header Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-[30px] sm:text-[32px] md:text-[36px] lg:text-[36px] font-[600] leading-[38px] lg:leading-[44px] lg:tracking-[-0.72px] text-[#101828] mb-[16px] lg:mb-[20px]">
              Most Popular Virtual Office Locations
            </h2>
            <div className="flex flex-col max-w-[758px] w-full">
              <p className="text-[18px] lg:text-[20px] font-normal leading-[28px] lg:leading-[30px] text-[#475467]">
                Our philosophy is simple - hire a team of diverse, passionate
                people and foster a culture that empowers you to do your best
                work.
              </p>
            </div>
          </div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-6 lg:gap-x-[32px] lg:gap-y-[48px] py-5 md:py-0 w-full">
            {locations.map((location) => {
              const image = normalizeUrl(location.city_featured_image_url);

              return (
                <Link
                  key={location.id}
                  href={location.link}
                  prefetch={false}
                  className="flex flex-col md:gap-[16px] lg:gap-[24px] group cursor-pointer relative "
                >
                  <div
                    className="relative w-full aspect-[4/3] rounded-lg overflow-hidden h-[160px] lg:h-[200px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                  <div className="absolute rounded-[8px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_76.25%,#000000_100%)] md:hidden"></div>
                  <div className="flex w-full flex-col py-[4px] md:p-[0px] items-center md:items-start absolute md:static bottom-0 md:bottom-auto">
                    <h3 className="text-[16px] lg:text-[20px] font-bold md:font-semibold leading-[24px] lg:leading-[30px] text-[#ffffff] md:text-[#101828] text-center transition-colors">
                      {location.city}, {location.state_abbr}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

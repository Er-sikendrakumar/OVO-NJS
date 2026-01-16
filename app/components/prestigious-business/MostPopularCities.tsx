'use client';

import Image from "next/image";
import Link from "next/link";

const cities = [
  {
    name: "Atlanta",
    state: "GA",
    image: "/atlanta.webp",
    href: "/business-address/georgia/atlanta/location-684/",
  },
  {
    name: "Chicago",
    state: "IL",
    image: "/chicago.webp",
    href: "/business-address/illinois/chicago/location-1430/",
  },
  {
    name: "Dallas",
    state: "TX",
    image: "/dallas.webp",
    href: "/business-address/texas/dallas/location-1255/",
  },
  {
    name: "Houston",
    state: "TX",
    image: "/houston.webp",
    href: "/business-address/texas/houston/location-1323/",
  },
  {
    name: "Los Angeles",
    state: "CA",
    image: "/los-angeles.webp",
    href: "/business-address/california/los-angeles/location-1362/",
  },
  {
    name: "Miami",
    state: "FL",
    image: "/miami.webp",
    href: "/business-address/florida/miami/location-1285/",
  },
  {
    name: "New York",
    state: "NY",
    image: "/new-york.webp",
    href: "/business-address/new-york/new-york/location-1450/",
  },
  {
    name: "Tampa",
    state: "FL",
    image: "/tampa.webp",
    href: "/business-address/florida/tampa/location-885/",
  },
];

export function MostPopularCities() {
  return (
    <section className="flex w-full bg-white py-[20px] md:py-[40px] lg:py-[40px]">
      <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col w-full gap-[24px] md:gap-12 lg:gap-[64px]">
          {/* Header Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-[30px] sm:text-[32px] md:text-[36px] lg:text-[36px] font-[600] leading-[38px] lg:leading-[44px] lg:tracking-[-0.72px] text-[#101828] mb-[16px] lg:mb-[20px]">
             Most Popular Cities
            </h2>
            <div className="flex flex-col">
              <p className="text-[18px] lg:text-[20px] font-normal leading-[28px] lg:leading-[30px] text-[#475467]">
                Over 100 Locations Across the USA <br /> Prestigious Business Address for Only $59/mo
              </p>
            </div>
          </div>

          {/* City Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-[12px] sm:gap-6 lg:gap-x-[32px] lg:gap-y-[48px] w-full">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={city.href}
                prefetch={false}
                className="flex flex-col md:gap-[16px] lg:gap-[24px] group cursor-pointer relative "
              >
                <div
                  className="relative w-full aspect-[4/3] rounded-lg overflow-hidden h-[160px] lg:h-[200px] transition-transform duration-300 hover:scale-105 bg-cover bg-center"
                  style={{ backgroundImage: `url(${city.image})` }}
                >
                </div>
                <div className="absolute rounded-[8px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_76.25%,#000000_100%)] md:hidden"></div>
                <div className="flex w-full flex-col p-[4px] md:p-[0px] items-center md:items-start absolute md:static bottom-0 md:bottom-auto">
                  <h3 className="text-[16px] lg:text-[20px] font-semibold leading-[24px] lg:leading-[30px] text-[#ffffff] md:text-[#101828] text-center transition-colors">
                    {city.name}, {city.state}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



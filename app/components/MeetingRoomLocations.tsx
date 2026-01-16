"use client";
import Link from "next/link";
import Image from "next/image";

type MeetingRoomLocation = {
  name: string;
  image?: string;
  location_image_url?: string;
  city_featured_image_url?: string;
  image_alt?: string;
  url?: string;
  link?: string;
  href?: string;
  city?: string;
  state_abbr?: string;
};

interface MeetingRoomLocationsProps {
  title: string;
  description: string;
  locations: MeetingRoomLocation[];
  align?: "left" | "center";
  count?: number;
}

const IMAGE_URL = "https://www.opusvirtualoffices.com";

export function MeetingRoomLocations({
  title,
  description,
  locations,
  align = "left",
  count = locations.length,
}: MeetingRoomLocationsProps) {
  const displayedLocations = locations.slice(0, count);

  const resolveImage = (location: MeetingRoomLocation) =>
    location.image ??
    location.location_image_url ??
    location.city_featured_image_url ??
    "";

  const resolveImageUrl = (imagePath: string) => {
    if (!imagePath) {
      return "/assets/mail-center.webp";
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    if (imagePath === "/assets/wilmington.webp") {
      return "/delaware.webp";
    }
    if (imagePath.startsWith("/assets/")) {
      return imagePath.replace("/assets/", "/");
    }
    return `${IMAGE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  const resolveLink = (location: MeetingRoomLocation) =>
    location.url ?? location.href ?? location.link ?? "#";

  const containerClass =
    align === "center"
      ? "flex max-w-[1280px] w-full px-8 flex-col items-start gap-16 mx-auto"
      : "flex max-w-[1280px] w-full px-8 flex-col items-start gap-16";

  return (
    <div className="flex w-full pt-5 md:py-0 px-0 flex-col items-center bg-white md:pt-10">
      {/* Mobile layout */}
      <div className="popular-locations-mobile md:hidden w-full">
        <div className="flex flex-col gap-4 w-full px-4">
          <h2 className="text-gray-900 text-3xl lg:text-2xl font-semibold leading-[38px] lg:leading-8 tracking-normal lg:tracking-[-0.48px]">
            {title}
          </h2>
          <p className="text-gray-600 text-[18px] lg:text-base font-normal leading-[28px] lg:leading-6 pb-6">
            {description}
          </p>
        </div>
        <div className="meeting_locations-mobile__list">
          {displayedLocations.map((location) => (
            <Link
              key={location.name}
              href={resolveLink(location)}
              prefetch={false}
              className="popular-locations-mobile__card"
            >
              <div className="relative h-[160px] md:h-[200px] w-full overflow-hidden rounded-lg flex flex-col justify-end">
                <Image
                  src={resolveImageUrl(resolveImage(location))}
                  alt={location.name}
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative z-10 w-full flex flex-col items-center justify-end pb-[4px] lg:pb-3 lg:px-3">
                  <span className="text-white text-base font-bold leading-[24px] lg:leading-6 text-center w-full">
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
        <div className="flex flex-col items-start gap-8">
          <div className="flex max-w-[788px] flex-col items-start gap-5">
            <h2 className="text-gray-900 text-4xl font-semibold leading-[44px] tracking-[-0.72px]">
              {title}
            </h2>
            <p className="text-gray-600 text-[20px] font-normal leading-[30px]">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-start content-start gap-x-8 gap-y-12 w-full flex-wrap">
          {displayedLocations.map((location, index) => (
            <Link
              key={index}
              href={resolveLink(location)}
              prefetch={false}
              className="flex min-w-[240px] flex-col items-start gap-6 flex-1 basis-0"
            >
              <div className="h-[200px] self-stretch rounded-lg overflow-hidden relative">
                <img
                  src={resolveImageUrl(resolveImage(location))}
                  alt={location.image_alt ?? location.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start gap-6 self-stretch">
                <div className="flex flex-col items-start gap-4 self-stretch">
                  <div className="flex flex-col items-start gap-1 self-stretch">
                    <h3 className="self-stretch text-gray-900 text-xl font-semibold leading-[30px]">
                      {location.city && location.state_abbr
                        ? `${location.city}, ${location.state_abbr}`
                        : location.name}
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

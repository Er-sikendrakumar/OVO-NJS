import Image from "next/image";

interface OverviewData {
  heading?: string;
  body?: string;
  map?: {
    lat: number;
    lng: number;
    zoom: number;
    city?: string;
  };
  pointsOfInterest?: string[];
}

interface OverviewSectionProps {
  data: OverviewData;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyAZHHLeM0rXyFTg75Vye0fF9uDVfHdCZAw";

function getStaticMapUrl(lat: number, lng: number, zoom: number, width: number, height: number) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=color:red%7C${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
}

export function OverviewSection({ data }: OverviewSectionProps) {
  if (!data.heading && !data.body) {
    return null;
  }

  const mapData = data.map;
  const desktopMapUrl = mapData
    ? getStaticMapUrl(mapData.lat, mapData.lng, mapData.zoom, 496, 312)
    : null;
  const mobileMapUrl = mapData
    ? getStaticMapUrl(mapData.lat, mapData.lng, mapData.zoom, 320, 224)
    : null;

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-[1280px] px-4 sm:px-6 md:px-8 mt-[60px] gap-8 lg:gap-12">
      {/* Text content - left side */}
      <div className="flex flex-col flex-1 gap-4">
        {data.heading && (
          <h2 className="font-inter font-semibold text-[30px] lg:text-[36px] leading-[44px] tracking-[-0.72px] text-[#101828]">
            {data.heading}
          </h2>
        )}
        {data.body && (
          <p className="font-inter font-normal text-[16px] lg:text-[18px] leading-[24px] lg:leading-[28px] text-[#535862]">
            {data.body}
          </p>
        )}
      </div>

      {/* Map - right side */}
      {mapData && (
        <div className="flex flex-col justify-center items-center gap-2 flex-shrink-0 self-stretch
          h-[265px] p-5
          lg:w-[560px] lg:p-8 lg:h-auto">
          {/* Desktop map */}
          <div className="hidden lg:block">
            <Image
              src={desktopMapUrl!}
              alt={`Map of ${mapData.city || 'location'}`}
              width={496}
              height={312}
              className="rounded-lg"
              unoptimized
            />
          </div>
          {/* Mobile map */}
          <div className="block lg:hidden">
            <Image
              src={mobileMapUrl!}
              alt={`Map of ${mapData.city || 'location'}`}
              width={320}
              height={224}
              className="rounded-lg"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}

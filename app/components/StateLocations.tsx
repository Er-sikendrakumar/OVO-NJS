"use client";

import Image from "next/image";

interface LocationCard {
    city: string;
    address1: string;
    address2: string;
    image: string;
    premium?: boolean;
}

interface MapData {
    lat: number;
    lng: number;
    zoom: number;
    city: string;
}

export default function StateLocations({
    popular,
    additional,
    state,
    map
}: {
    popular: LocationCard;
    additional: LocationCard[];
    state: string;
    map?: MapData;
}) {
    // Create your map URL
    const getMapIframeUrl = () => {
        if (!map) return "";
        const { lat, lng, zoom } = map;
        return `https://www.google.com/maps?q=26.3772,-80.1016&z=${zoom}&output=embed`;
    };

    return (
        <section className="w-full flex justify-center py-10">
            <div className="flex w-[1280px] px-8 items-start gap-8">

                {/* LEFT SCROLLABLE LIST */}
                <div
                    className="
            flex flex-col 
            w-[50%]
            max-h-[600px]
            overflow-y-auto
            rounded-[12px]
            shadow-[0_12px_16px_-4px_rgba(10,13,18,0.08),
                    0_4px_6px_-2px_rgba(10,13,18,0.03),
                    0_2px_2px_-1px_rgba(10,13,18,0.04)]
            p-4
            gap-6
          "
                >
                    <h2 className="text-[#101828] text-xl font-semibold">
                        Most Popular Virtual Office Location in {state}
                    </h2>

                    <LocationCardItem data={popular} highlight />

                    <h2 className="text-[#101828] text-xl font-semibold mt-4">
                        Additional Virtual Office Locations in {state}
                    </h2>

                    {additional.map((loc, idx) => (
                        <LocationCardItem key={idx} data={loc} />
                    ))}
                </div>

                {/* RIGHT SIDE — YOUR GOOGLE MAP */}
                {map && (
                    <div className="flex-1 h-[600px] bg-[#F2F4F7] rounded-lg p-5">
                        <div className="w-full h-full overflow-hidden rounded-lg">
                            <iframe
                                src={getMapIframeUrl()}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map of ${map.city}`}
                                className="w-full h-full rounded-lg"
                            />
                        </div>
                    </div>
                )}


            </div>
        </section>
    );
}

function LocationCardItem({ data, highlight }: { data: LocationCard; highlight?: boolean }) {
    return (
        <div
            className={`
        flex flex-row w-full rounded-[12px] bg-white
        shadow-[0_1px_2px_rgba(16,24,40,0.05)]
        ${highlight ? "border border-blue-300 shadow-lg" : ""}
      `}
        >
            <div className="w-[180px] h-[140px] relative">
                <Image
                    src={data.image}
                    alt={data.city}
                    fill
                    className="object-cover rounded-l-[12px]"
                />
            </div>

            <div className="flex flex-col p-4 justify-between flex-1">
                <div className="flex flex-col gap-1">
                    {highlight && (
                        <div className="flex gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-xs font-semibold">
                                Most
                            </span>
                            <span className="px-2 py-0.5 bg-red-500 text-white rounded text-xs font-semibold">
                                Popular
                            </span>
                        </div>
                    )}

                    <span className="text-[#101828] text-[18px] font-semibold">{data.city}</span>
                    <span className="text-[#344054] text-[14px] leading-[20px]">{data.address1}</span>
                    <span className="text-[#344054] text-[14px] leading-[20px]">{data.address2}</span>

                    <div className="flex gap-2 mt-2">
                        {data.premium && (
                            <span className="px-2 py-0.5 border border-green-600 text-green-700 rounded-full text-[12px] font-medium">
                                Premium
                            </span>
                        )}
                        <span className="px-2 py-0.5 border border-blue-600 text-blue-700 rounded-full text-[12px] font-medium">
                            Location
                        </span>
                    </div>
                </div>

                <button className="mt-3 bg-[#36BFFA] text-white py-2 rounded-md font-semibold">
                    Learn More
                </button>
            </div>
        </div>
    );
}
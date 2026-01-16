import React from 'react'

interface OverviewData {
    heading: string;
    body: string;
    map?: {
        lat: number;
        lng: number;
        zoom: number;
        city: string;
    };
    pointsOfInterest?: Array<any>;
}

interface TextWithMapsProps {
    data: OverviewData;
}

export const TextWithMaps = ({ data }: TextWithMapsProps) => {
    // Generate Google Maps embed URL
    const getMapIframeUrl = () => {
        if (!data.map) return '';
        const { lat, lng, zoom } = data.map;
        // Using Google Maps embed without API key (works for basic embeds)
        return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`;
    };

    return (
        <section className="max-w-screen-xl mx-auto py-[60px]">
            <div className="lg:px-[32px] px-[16px] flex flex-col lg:flex-row lg:gap-[64px] gap-[20px]">
                {/* Left side - Text content */}
                <div className="flex flex-col gap-[24px] w-full">
                    <span className="font-inter font-semibold lg:text-[36px] text-[30px] leading-[120%] tracking-[-2%] text-[#101828]">
                        {data.heading}
                    </span>
                    <p className="font-inter font-normal lg:text-[20px] text-[18px] leading-[140%] tracking-[0] text-[#535862]">
                        {data.body}
                    </p>
                </div>

                {/* Right side - Map */}
                {data.map && (
                    <div className="w-full lg:max-w-[560px] bg-[#F2F4F7] lg:p-[32px] p-[20px]">
                        <div className="w-full overflow-hidden relative lg:min-h-[312px] min-h-[214px] h-full rounded-lg">
                            <iframe
                                src={getMapIframeUrl()}
                                width="100%"
                                height="312"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Map of ${data.map.city}`}
                                className="w-full h-full min-h-[214px] lg:min-h-[312px]"
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
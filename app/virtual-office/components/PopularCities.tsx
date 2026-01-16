import Link from 'next/link'
import React from 'react'

interface City {
    name: string;
    url: string;
}

interface PopularCitiesProps {
    state: string;
    cities: City[];
}

function PopularCities({ state, cities }: PopularCitiesProps) {
    const popularCities = cities.slice(0, 6);

    if (popularCities.length === 0) {
        return null;
    }

    return (
        <div className='max-w-screen-xl mx-auto px-[16px] lg:px-[32px] pb-[20px] pt-[44px] lg:pb-0 lg:pt-[59px] lg:py-[32px] flex flex-col gap-[24px]'>
            <h2 className='font-inter font-semibold text-[20px] lg:text-[24px] leading-[120%] tracking-normal text-[#101828]'>
                Popular Cities in {state}
            </h2>

            <div className='flex flex-row items-center gap-[8px] lg:gap-[12px] flex-wrap'>
                {popularCities.map((city) => (
                    <Link
                        key={city.name}
                        href={city.url}
                        className='px-[12px] py-[4px] border-[1.5px] border-[#475467] rounded-full flex justify-center items-center text-center
                        font-inter font-medium text-[14px] leading-[100%] tracking-[0] text-[#344054] hover:bg-[#F9FAFB] transition-colors'
                    >
                        {city.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularCities
import Link from 'next/link'
import React from 'react'

interface VirtualOffice {
    name: string;
    url: string;
}

interface PopularVirtualOfficesProps {
    state: string;
    virtualOffices: VirtualOffice[];
}

function PopularVirtualOffices({ state, virtualOffices }: PopularVirtualOfficesProps) {
    const popularVirtualOffices = virtualOffices.slice(0, 6);

    if (popularVirtualOffices.length === 0) {
        return null;
    }

    return (
        <div className='max-w-screen-xl mx-auto px-[16px] lg:px-[32px] pb-[20px] pt-[44px] lg:pb-0 lg:pt-0 lg:py-[32px] flex flex-col gap-[24px]'>
            <span className='font-inter font-semibold text-[20px] lg:text-[24px] leading-[120%] tracking-normal text-[#101828]'>
                Popular Cities in {state}
            </span>

            <div className='flex flex-row items-center gap-[8px] lg:gap-[12px] flex-wrap'>
                {popularVirtualOffices.map((office) => (
                    <Link
                        key={office.name}
                        href={office.url}
                        className='px-[12px] py-[4px] border-[1.5px] border-[#475467] rounded-full flex justify-center items-center text-center
                        font-inter font-medium text-[14px] leading-[100%] tracking-[0] text-[#344054] hover:bg-[#F9FAFB] transition-colors'
                    >
                        {office.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default PopularVirtualOffices
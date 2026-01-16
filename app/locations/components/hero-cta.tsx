import Link from 'next/link'
import React from 'react'

interface HeroCtaProps {
    locId?: string;
}

export const HeroCta = ({ locId }: HeroCtaProps) => {
    const signupUrl = locId
        ? `/signup/?btn=912&locid=${locId}`
        : '/signup/?btn=912';

    return (
        <section className='max-w-screen-xl mx-auto pb-[30px] lg:pb-[30px] pt-[30px] lg:pt-[40px]'>
            <div className='lg:px-[32px] px-[16px] flex flex-col gap-[32px] justify-center items-center text-center'>
                <div className='flex flex-col gap-[20px]'>
                    <span className='font-inter font-semibold lg:text-[36px] text-[30px] leading-[120%] tracking-[-2%] text-[#181D27]'>Start Your Business Expansion Journey</span>
                    <span className='font-inter font-normal lg:text-[20px] text-[18px] leading-[120%] tracking-[0] text-[#535862]'>Join over 20,000+ businesses already growing with Opus VO.</span>
                </div>

                <Link
                    href={signupUrl}
                    prefetch={false}
                    className='py-[18px] px-[20px] w-[] items-center justify-center text-center rounded-[8px] bg-[#36BFFA] text-white
                            font-inter font-semibold text-[18px] leading-[100%] tracking-[0] hover:bg-[#026AA2] transition-colors'>
                    Select This Location
                </Link>
            </div>
        </section>
    )
}
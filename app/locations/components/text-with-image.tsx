import Image from 'next/image'
import React from 'react'

export const TextWithImage = ({ reversed = false, title, body, image }: { reversed?: boolean, title: string, body: string, image: string }) => {
    return (
        <section className={`max-w-screen-xl mx-auto pt-[30px] pb-[30px]`}>
            <div className={`lg:px-[32px] px-[16px] flex flex-col lg:gap-[64px] gap-[32px] ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                <div className='flex flex-col gap-[24px] w-full'>
                    <h2 className='font-inter font-semibold lg:text-[36px] text-[30px] leading-[44px] tracking-[-0.72px] text-[#101828]'>{title}</h2>
                    <div className='rendered-html-content font-inter font-normal lg:text-[20px] text-[18px] leading-[140%] tracking-[0] text-[#535862]' dangerouslySetInnerHTML={{ __html: body }} />
                </div>

                <div className='w-full max-w-[560px] bg-[#F2F4F7] p-[32px]'>
                    <div className='max-w-[496px] w-full overflow-hidden relative lg:min-h-[312px] min-h-[236px] h-full'>
                        <Image
                            src={image}
                            alt='Virtual Office Image'
                            fill
                            unoptimized={image.includes('/wp-content/')}
                            className='w-full max-w-[496px] lg:min-h-[312px] min-h-[236px] h-full object-cover'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
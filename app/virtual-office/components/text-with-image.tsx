import Image from 'next/image'
import React from 'react'

export const TextWithImage = ({ reversed = false, title, body, image }: { reversed?: boolean, title: string, body: string, image: string }) => {
    // Replace <br> and <br></br> with newline characters
    let processedText = body
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<br><\/br>/gi, '\n');

    // Split by double newlines for paragraph breaks
    const paragraphs = processedText.split('\n\n').filter(p => p.trim().length > 0);

    return (
        <section className={`max-w-screen-xl mx-auto lg:pt-[30px] lg:pb-[30px] pt-[16px] pb-[16px]`}>
            <div className={`lg:px-[32px] px-[16px] flex flex-col lg:gap-[64px] gap-[32px] ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                <div className='flex flex-col gap-[24px] w-full'>
                    <span className='font-inter font-semibold lg:text-[36px] text-[30px] leading-[120%] tracking-[-2%] text-[#101828]'>{title}</span>
                    <div className='font-inter font-normal text-[18px] leading-[140%] tracking-[0] text-[#535862] flex flex-col gap-[16px]'>
                        {paragraphs.map((paragraph, index) => {
                            // Split by single newlines for <br> breaks within paragraphs
                            const lines = paragraph.split('\n').filter(line => line.trim().length > 0);

                            return (
                                <p key={index}>
                                    {lines.map((line, lineIndex) => (
                                        <React.Fragment key={lineIndex}>
                                            {line.trim()}
                                            {lineIndex < lines.length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                            );
                        })}
                    </div>
                </div>

                <div className='w-full max-w-[560px] bg-[#F2F4F7] lg:p-[32px] p-[16px]'>
                    <div className='max-w-[496px] w-full overflow-hidden relative lg:min-h-[312px] min-h-[236px] h-full'>
                        <Image
                            src={image}
                            alt='Virtual Office Image'
                            fill
                            className='w-full max-w-[496px] lg:min-h-[312px] min-h-[236px] h-full object-cover'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
import React from 'react'

// Helper function to render text with <br> tags and paragraph breaks
const renderTextWithBreaks = (text: string) => {
    if (!text) return null;

    // Replace <br> and <br></br> with newline characters
    let processedText = text
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<br><\/br>/gi, '\n');

    // Split by double newlines for paragraphs
    const paragraphs = processedText.split('\n\n').filter(p => p.trim().length > 0);

    return (
        <div className="flex flex-col gap-[16px]">
            {paragraphs.map((paragraph, index) => {
                // Split by single newlines for <br> breaks within paragraphs
                const lines = paragraph.split('\n').filter(line => line.trim().length > 0);

                return (
                    <p key={index} className="text-[#475467] font-normal font-inter text-[18px] leading-[140%] tracking-[0]">
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
    );
};

const LocationsContent = ({ heading, description, body }: { heading: string, description: string, body: string }) => {
    return (
        <section className="max-w-screen-xl mx-auto lg:py-[30px] py-[16px]">
            <div className="w-full lg:px-[32px] px-[16px] lg:gap-[64px] gap-[32px] flex lg:flex-row flex-col">
                <div className="flex flex-col gap-[24px] w-full">
                    <h2 className="font-inter font-semibold lg:text-[36px] text-[30px] leading-[120%] tracking-[-2%] text-[#101828]">{heading}</h2>
                    {renderTextWithBreaks(description)}
                </div>
                <div className="w-full">
                    {renderTextWithBreaks(body)}
                </div>
            </div>
        </section>
    )
}

export default LocationsContent;
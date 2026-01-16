const LocationsContent = ({ heading, description, body }: { heading: string, description: string, body: string }) => {
    return (
        <section className="max-w-screen-xl mx-auto py-[30px]">
            <div className="w-full lg:px-[32px] px-[16px] lg:gap-[64px] gap-[32px] flex lg:flex-row flex-col">
                <div className="flex flex-col gap-[24px] w-full">
                    <h2 className="font-inter font-semibold lg:text-[36px] text-[30px] leading-[44px] tracking-[-0.72px] text-[#101828]">{heading}</h2>
                    <div className="rendered-html-content text-[#475467] font-normal font-inter text-[18px] leading-[140%] tracking-[0]" dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className="w-full">
                    <div className="rendered-html-content text-[#475467] font-normal font-inter text-[18px] leading-[140%] tracking-[0]" dangerouslySetInnerHTML={{ __html: body }} />
                </div>
            </div>
        </section>
    )
}

export default LocationsContent;
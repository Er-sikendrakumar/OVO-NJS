type IndustrySection = {
  main_heading: string;
  industry_paragraph: string;
};

interface IndustryDetailsProps {
  servicesHeading: string;
  servicesDescriptionHtml: string;
  sections: IndustrySection[];
}

export function IndustryDetails({
  servicesHeading,
  servicesDescriptionHtml,
  sections,
}: IndustryDetailsProps) {
  return (
    <section className="bg-white">
      <div className="max-w-[1280px] w-full mx-auto px-4 py-5 lg:py-10 md:px-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-5">
            <h2 className="text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-[#181D27] pt-10">
              {servicesHeading}
            </h2>

            <div
              className="text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#535862] font-normal [&>p]:mb-4 [&>p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: servicesDescriptionHtml }}
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {sections.map((section) => (
              <div
                key={section.main_heading}
                className="flex flex-col gap-4 md:gap-5"
              >
                <div
                  className="text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-[#181D27]"
                  dangerouslySetInnerHTML={{ __html: section.main_heading }}
                />
                {section.industry_paragraph && (
                  <div
                    className="flex flex-col gap-[16px] md:gap-[18px] text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#535862] font-normal"
                    dangerouslySetInnerHTML={{
                      __html: section.industry_paragraph,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

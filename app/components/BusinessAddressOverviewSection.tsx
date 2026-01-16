"use client";

type BusinessAddressOverviewSectionProps = {
  city: string;
  stateAbbr: string;
  imageSrc: string;
  heading?: string;
  description?: string;
};

export default function BusinessAddressOverviewSection({
  city,
  stateAbbr,
  imageSrc,
  heading,
  description,
}: BusinessAddressOverviewSectionProps) {
  const title = heading || `Why choose a Business Address in ${city}?`;
  const intro =
    description ||
    "Discover the benefits of establishing your company in this vibrant city, known for its thriving business community and upscale amenities.";

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1280px] py-[64px] px-8 lg:py-[60px] flex flex-col items-start gap-12 md:gap-16">
        <div className="max-w-[768px] w-full flex flex-col gap-3">
          <span className="text-[#026AA2] text-[14px] leading-[20px] md:text-[16px] font-semibold md:leading-[24px]">
            Why we’re different
          </span>

          <h2 className="text-[#181D27] text-[30px] font-semibold leading-[38px] pb-1 md:pb-2">
            {title}
          </h2>

          <p className="text-[#535862] text-[16px] leading-[24px] md:text-[18px] font-normal md:leading-[28px]">
            {intro}
          </p>
        </div>
        <div className="w-full flex flex-wrap items-start gap-[48px] md:gap-x-16 md:gap-y-16">
          <div className="flex flex-col gap-4 md:gap-5 max-w-[576px]">
            <p className="text-[#535862] text-[16px] leading-[24px] md:text-[18px] font-normal md:leading-[28px]">
              Choosing a business address in {city}, {stateAbbr}, offers
              unparalleled advantages for your company. This vibrant city is
              renowned for its upscale amenities and a thriving business
              community, making it an ideal location for establishing your
              corporate presence. With a prestigious address, you enhance your
              brand's image and credibility, attracting clients and partners
              alike. {city}'s strategic location provides easy access to major
              highways and airports, facilitating seamless connectivity for your
              business operations. Additionally, the city's supportive
              environment fosters networking opportunities, allowing you to
              connect with like-minded professionals and potential
              collaborators.
            </p>

            <h2 className="text-[#181D27] text-[30px] font-semibold leading-[38px] pt-4 md:pt-5">
              Why choose Opus for your business address?
            </h2>

            <p className="text-[#535862] text-[16px] leading-[24px] md:text-[18px] font-normal md:leading-[28px]">
              Our services provide you with a prestigious location in {city},
              enhancing your professional image without the overhead costs of a
              physical office. With Opus, you gain access to essential business
              services, including mail handling and meeting room availability,
              all designed to support your growth and success.
            </p>
          </div>

          <div className="w-full max-w-full md:max-w-[576px] h-[240px] md:h-[560px] overflow-hidden">
            <img
              src={imageSrc}
              alt={`Business location in ${city}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

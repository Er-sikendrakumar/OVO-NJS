type BookingCTAProps = {
  title: string;
  description: string;
  features: string[];
  image: string;
  image_alt?: string;
  cta: {
    text: string;
    url: string;
  };
};

const IMAGE_BASE = "https://www.opusvirtualoffices.com";

export function BookingCTA({
  title,
  description,
  features,
  image,
  image_alt,
  cta,
}: BookingCTAProps) {
  return (
    <section className="w-full max-w-[1280px] px-4 py-5 md:px-8 md:py-10 mx-auto">
      <div className="flex flex-row items-center justify-center ">
        <div className="flex items-center justify-center pt-[20px] md:pt-[40px] relative">
          <div className="flex flex-col md:flex-row items-stretch w-full gap-[32px] md:gap-[64px]">
            {/* Image Container - responsive height */}
            <div className="w-full md:max-w-[576px] md:max-h-[376px] md:basis-0 md:grow md:shrink-0 md:min-w-0 md:min-h-0 ">
              <div className="w-full md:basis-0 md:grow md:shrink-0">
                <div
                  className="relative w-full h-full min-h-[200px] md:min-h-[376px] rounded-[11.84px] bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE}${image})`,
                  }}
                  role="img"
                  aria-label={image_alt ?? "Modern office meeting room"}
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full  md:basis-0 md:grow md:shrink-0 xl:min-w-[576px] md:min-h-0 flex flex-col gap-6 md:gap-[24px] items-start">
              <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[44px] not-italic relative shrink-0 text-[#3e465a] text-[36px] tracking-[-0.72px] w-full">
                {title}
              </h2>
              <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#3e465a] text-[16px] w-full tracking-[0.4px]">
                {description}
              </p>
              <ul className="list-disc pl-[24px] font-['Inter:Regular',sans-serif] font-normal text-[#3e465a] text-[16px]">
                {features.map((feature) => (
                  <li key={feature} className="leading-[24px]">
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="content-stretch flex items-start relative shrink-0 w-full">
                <a
                  className="inline-flex w-auto items-center justify-center gap-[8px] rounded-[8px] border border-[#3E4784] bg-[#3E465A] px-[18px]  py-3 text-[16px] leading-[24px] md:text-[14px] md:leading-[20px] lg:text-[16px] lg:leading-[24px]  font-semibold  text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#2f3446] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111827]  h-[48px]"
                  href={cta.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex items-center justify-center rounded-full bg-white/10">
                    <svg
                      aria-hidden
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="20"
                      viewBox="0 0 22 20"
                      fill="none"
                    >
                      <path
                        d="M6.5 9H3.6C3.03995 9 2.75992 9 2.54601 9.10899C2.35785 9.20487 2.20487 9.35785 2.10899 9.54601C2 9.75992 2 10.0399 2 10.6V19M15.5 9H18.4C18.9601 9 19.2401 9 19.454 9.10899C19.6422 9.20487 19.7951 9.35785 19.891 9.54601C20 9.75992 20 10.0399 20 10.6V19M15.5 19V4.2C15.5 3.0799 15.5 2.51984 15.282 2.09202C15.0903 1.71569 14.7843 1.40973 14.408 1.21799C13.9802 1 13.4201 1 12.3 1H9.7C8.57989 1 8.01984 1 7.59202 1.21799C7.21569 1.40973 6.90973 1.71569 6.71799 2.09202C6.5 2.51984 6.5 3.0799 6.5 4.2V19M21 19H1M10 5H12M10 9H12M10 13H12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{cta.text}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

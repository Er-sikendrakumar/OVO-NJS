"use client";

type AboutAddressProps = {
  address: string;
  city: string;
  state: string;
  overviewBody?: string;
};

export default function AboutAddress({
  address,
  city,
  state,
  overviewBody,
}: AboutAddressProps) {
  const hasOverviewBody = Boolean(overviewBody?.trim());

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1280px] px-8 pt-10 md:pt-5 pb-3 flex flex-col gap-4">
        {/* Heading */}
        <h2
          className="text-[#101828] font-inter text-[30px] font-semibold leading-[38px]"
        >
          About {address}
        </h2>

        {/* Content */}
        <div className="flex flex-col gap-[18px]">
          <p className="text-[#475467] font-inter text-[18px] font-semibold leading-[28px]">
            A place for your business to thrive
          </p>

          {hasOverviewBody ? (
            <p className="text-[#475467] font-inter text-[18px] font-normal leading-[28px]">
              {overviewBody}
            </p>
          ) : (
            <>
              <p className="text-[#475467] font-inter text-[18px] font-normal leading-[28px]">
                Enhance your business presence with a Business Address at {address},{" "}
                {city}, {state}. This prestigious location situates your company in
                the heart of {city}’s esteemed business district, boosting your
                professional image and credibility. Impress clients and partners
                with an address that reflects your commitment to excellence and
                success.
              </p>

              <p className="text-[#475467] font-inter text-[18px] font-normal leading-[28px]">
                A Business Address at {address} offers essential services, including
                mail handling and access to meeting rooms when needed. This
                flexibility allows you to maintain a strong business presence in{" "}
                {city} while working from anywhere. Elevate your companyƒ?Ts reputation
                and seize the networking opportunities that come with being part of a
                vibrant business community. Make {address} your business address and
                position your company for growth and success.
              </p>
            </>
          )}
        </div>
        <a href="#" className="text-[#344054] md:hidden flex items-center gap-1 font-inter text-[16px] font-semibold leading-[24px]">
            Learn More About {address} 
            <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M9 12L12 9M12 9L9 6M12 9H6M5.85 15.75H12.15C13.4101 15.75 14.0402 15.75 14.5215 15.5048C14.9448 15.289 15.289 14.9448 15.5048 14.5215C15.75 14.0402 15.75 13.4101 15.75 12.15V5.85C15.75 4.58988 15.75 3.95982 15.5048 3.47852C15.289 3.05516 14.9448 2.71095 14.5215 2.49524C14.0402 2.25 13.4101 2.25 12.15 2.25H5.85C4.58988 2.25 3.95982 2.25 3.47852 2.49524C3.05516 2.71095 2.71095 3.05516 2.49524 3.47852C2.25 3.95982 2.25 4.58988 2.25 5.85V12.15C2.25 13.4101 2.25 14.0402 2.49524 14.5215C2.71095 14.9448 3.05516 15.289 3.47852 15.5048C3.95982 15.75 4.58988 15.75 5.85 15.75Z"
                    stroke="#344054"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
            </span>
          </a>
      </div>
    </section>
  );
}

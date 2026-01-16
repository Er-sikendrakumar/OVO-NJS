type ZipSearchHeaderProps = {
  zipLabel?: string;
};

export default function ZipSearchHeader({
  zipLabel = "{zip}",
}: ZipSearchHeaderProps) {
  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[16px] px-[16px] pt-[20px] lg:gap-[24px] lg:px-[32px]">
        <div className="flex items-center gap-[10px] text-[14px] font-medium text-[#667085]">
          <span>Business Address</span>
          <span className="text-[#98A2B3]">›</span>
          <span className="text-[#1D4ED8]">{zipLabel}</span>
        </div>

        <div className="flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-[24px] font-semibold leading-[32px] text-[#0F172A] lg:text-[32px] lg:leading-[40px]">
            Virtual Office Locations within 20 miles of{" "}
            <span className="text-[#1D4ED8]">{zipLabel}</span>
          </h1>

          <div className="flex flex-row py-[4px] h-auto lg:max-w-[421px] md:h-auto lg:h-[110px] items-center lg:gap-[32px] gap-[12px] justify-start lg:justify-center sm:pb-1 lg:pt-1 flex-wrap lg:flex-nowrap self-end lg:self-center md:self-center">
            <img
              alt="BBB A+ rating"
              loading="lazy"
              width={130}
              height={46}
              decoding="async"
              className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
              src="/locations/review-companies-1.svg"
            />
            <img
              alt="Trustpilot"
              loading="lazy"
              width={97}
              height={46}
              decoding="async"
              className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
              src="/locations/review-companies-2.svg"
            />
            <img
              alt="Google rating"
              loading="lazy"
              width={130}
              height={46}
              decoding="async"
              className="lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]"
              src="/locations/review-companies-3.svg"
            />
          </div>
        </div>

        <button
          type="button"
          className="flex w-full max-w-[460px] items-center justify-between rounded-[10px] border border-[#D0D5DD] bg-white px-[16px] py-[12px] text-left text-[16px] font-medium text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.08)]"
        >
          <span className="flex items-center gap-[12px]">
            <span className="flex h-[24px] w-[24px] items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="h-[20px] w-[20px]"
              >
                <path
                  d="M12 13.5C13.3807 13.5 14.5 12.3807 14.5 11C14.5 9.61929 13.3807 8.5 12 8.5C10.6193 8.5 9.5 9.61929 9.5 11C9.5 12.3807 10.6193 13.5 12 13.5Z"
                  stroke="#475467"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21C16 17 19 14.3137 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 14.3137 8 17 12 21Z"
                  stroke="#475467"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Select Radius
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="h-[20px] w-[20px]"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#475467"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

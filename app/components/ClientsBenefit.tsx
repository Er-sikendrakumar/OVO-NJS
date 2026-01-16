'use client';

export default function ClientsBenefit() {
  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col items-center py-[20px] md:py-[40px] gap-[64px] bg-[#0C111D]">
        <div className="flex flex-col items-center w-full max-w-[1280px] px-[16px] md:px-[32px]">
          <p className="text-[#EAECF0] text-center font-inter text-[14px] md:text-[16px] font-semibold leading-[20px] md:leading-[24px] mb-[12px]">
            Client Benefits
          </p>

          <h1 className="max-w-full md:max-w-[768px] w-full text-white text-center font-inter font-semibold text-[36px] md:text-[48px] leading-[44px] md:leading-[60px] tracking-[-0.72px] md:tracking-[-0.96px] mb-[16px] md:mb-6">
            Unlock exclusive perks just for
            being an Opus client
          </h1>

          <p className="text-[#EAECF0] text-center font-inter text-[16px] md:text-[20px] font-normal leading-[24px] md:leading-[30px] max-w-[768px]">
            We've partnered with top-tier service providers to bring you exclusive deals that
            help grow and support your business. From marketing tools to essential services,
            your membership gives you access to benefits you won't find anywhere else.
          </p>
        </div>
      </div>
    </section>
  );
}

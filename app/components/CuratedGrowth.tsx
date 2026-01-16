"use client";

import { useRouter } from "./GlobalLoadingOverlay";

export default function CuratedGrowth() {
  const router = useRouter();
  const cards = [
    {
      img: "/smiling-professional.webp",
      title1: "Business",
      title2: "Tools",
      badge: "Startups",
    },
    {
      img: "/mkttool.webp",
      title1: "Marketing",
      title2: "Tools",
      badge: "Startups",
    },
    {
      img: "/computer-screen.webp",
      title1: "Setup",
      title2: "Tools",
      badge: "Startups",
    },
    {
      img: "/package.webp",
      title1: "Shipping",
      title2: "Deals",
      badge: "Startups",
    },
  ];

  return (
    <>
      <section className="w-full flex justify-center items-center">
        <div className="max-w-[1280px]  py-5 w-full md:py-10 px-4 md:px-8 gap-8 flex flex-col md:flex-col lg:flex-row relative">
          {/*Left Section*/}
          <div className="flex flex-col items-start max-w-[366px] w-full md:max-w-full lg:max-w-[320px] lg:w-full xl:max-w-[360px]">
            <p className="text-[#026AA2] font-inter text-[16px] font-semibold leading-[24px]">
              Why These Benefits Matter
            </p>

            <h2 className="mt-[12px] text-[#101828] font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
              Curated for Your <br /> Growth
            </h2>

            <p className="mt-[20px] text-[#475467] font-inter text-[16px] leading-[24px] md:text-[20px] font-normal md:leading-[30px]">
              We’ve selected partners who understand what entrepreneurs and
              business owners need most. These offers are handpicked to add real
              value to your business journey—saving you time, money, and effort.
            </p>

            <button
              onClick={() => router.push("/all-client-benefits")}
              className="mt-[32px] justify-center items-center gap-[4px] px-[12px] py-[8px] rounded-[8px] bg-[#36BFFA] text-white font-inter text-[14px] font-semibold leading-[20px] hover:bg-[#026aa2] hidden md:block"
            >
              Explore All Benefits
            </button>
          </div>
          {/*Right Section*/}
          <div className="max-w-[824px] w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group p-0 first:p-[6.2px] md:p-[6.2px] rounded-[19px] bg-white max-w-[400px] h-[400px]"
                >
                  <div className="relative w-full h-full rounded-[16px] overflow-hidden">
                    <img
                      src={card.img}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t "></div>

                    <div
                      className="absolute bottom-0 left-0 w-full flex flex-col justify-end items-start px-4 gap-0 py-4 md:py-[14px] 
                  bg-gradient-to-t 
                  backdrop-blur-[6px] rounded-b-[16px] group-hover:h-[208px] transition-all duration-400 ease-out"
                    >
                      <span
                        className="px-2 py-[2px] h-[22px] rounded-[16px] border border-[#EAECF0] bg-[#F9FAFB] 
                    text-[12px] font-medium leading-[18px] text-[#344054]"
                      >
                        {card.badge}
                      </span>

                      <div className="flex w-full justify-between items-center">
                        <h2 className="text-[36px] leading-[44px] tracking-[-0.72px] font-bold  lg:text-[30px] lg:leading-[38px] xl:text-[36px] xl:leading-[44px] xl:*:tracking-[-0.72px]  mt-2">
                          <span className="text-white">{card.title1}</span>{" "}
                          <br />
                          <span className="text-[#CDCDCD]">{card.title2}</span>
                        </h2>

                        <button
                          onClick={() => router.push("/all-client-benefits")}
                          className="flex justify-center items-center  gap-[4px] px-[12px] py-[8px] rounded-[8px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] bg-[#FFF] md:bg-[#36BFFA] md:shadow-none text-[#344054] md:text-white text-[14px] font-semibold leading-[20px] md:hover:bg-[#026aa2]"
                        >
                          See Deals
                        </button>
                      </div>

                      <div
                        className="
                        max-h-0 overflow-hidden
                        transition-all duration-300 ease-out
                        group-hover:max-h-[90px]
                      "
                      >
                        <p
                          className="
                          text-white font-inter text-[12px] mt-2 font-normal leading-[18px]
                          
                        "
                        >
                          Discover unbeatable offers tailored for your new
                          venture. Unlock exclusive discounts and resources to
                          help your startup thrive.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => router.push("/all-client-benefits")}
              className="mt-[40px] flex justify-center items-center gap-[4px] px-[12px] py-[8px] rounded-[8px] bg-[#36BFFA] text-white text-[14px] font-semibold leading-[20px] md:hidden hover:bg-[#026aa2]"
            >
              Explore All Benefits
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

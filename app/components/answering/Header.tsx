"use client";
import { useIsMobile } from "@/app/hooks/use-mobile";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const buttons = [
    {
      text: "Watch the Demo",
      icon: "/assets/answering/Play.svg",
    },
    {
      text: "Compare Prices",
      icon: "/assets/answering/Dollar.svg",
      onClick: () => {
        router.push("/cost-comparison//");
      },
    },
    {
      text: "See testimonials",
      icon: "/assets/answering/Star.svg",
      onClick: () => {
        router.push("/reviews/");
      },
    },
    {
      text: "In the news",
      icon: "/assets/answering/Book.svg",
      onClick: () => {
        router.push("/phone-bundles/");
      },
    },
  ];

  const isMobile = useIsMobile();
  return (
    <div className="relative w-full h-contain">
      <Image
        src="/assets/answering/Header.png"
        alt="Live Answering Service Header"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="relative max-w-[1280px] mx-auto pt-[112px] md:pt-[164px] z-10 px-4 md:px-[32px]">
        <div className="px-0 md:px-[32px] flex flex-row items-center gap-[46px]">
          <div className="flex flex-col items-center justify-start">
            <h1 className="text-white md:text-[48px] text-[32px] font-semibold tracking-[-1.2px]">
              LIVE ANSWERING SERVICES
            </h1>

            <h2 className="text-white text-[24px] font-normal mt-[21px]">
              The answering service your business needs at the price you want
            </h2>

            <ul className="list-disc list-outside text-white text-[24px] font-normal text-left pl-6 w-full mt-[12px] md:mt-[32px]">
              <li className="leading-[32px]">
                Only{" "}
                <span className="text-[48px] text-[#36BFFA] font-semibold leading-none inline-block align-bottom">
                  $79
                </span>
                /Month
              </li>
              <li>No per minute charges</li>
              <li>Flat monthly fee</li>
            </ul>
            <div className="mt-[12px] flex-wrap md:mt-[32px] flex flex-row gap-[16px] text-left justify-start items-center w-full text-white text-[24px] font-normal">
              <Image
                src="/assets/answering/Phone.svg"
                alt="Header"
                width={24}
                height={24}
              />
              <span className="font-semibold">Call Us</span>
              <span>+1 (888) 898-9868</span>
            </div>
            <div className="mt-[12px] md:mt-[32px] w-full justify-start">
              <button
                className="bg-[#36BFFA] text-white rounded-[8px] text-[16px] px-[18px] py-[12px]"
                onClick={() => {
                  router.push(
                    "/sign-up/?sutype=phone&uid=1765220880-911965548&c=set"
                  );
                }}
              >
                Sign up Now!
              </button>
              <button
                className="bg-transparent text-white rounded-[8px] text-[16px] px-[18px] py-[12px]"
                onClick={() => {
                  router.push("/virtual-office/");
                }}
              >
                Learn More
              </button>
            </div>
          </div>
          {!isMobile && (
            <div className="flex flex-row items-center justify-center w-[503px] ">
              <Image
                src="/assets/answering/Recepcionist.png"
                alt="Recipient"
                width={503}
                height={503}
                className="object-cover w-full h-full "
              />
            </div>
          )}
        </div>
      </div>
      <div className="mt-[32px] md:mt-[60px] pb-[40px] flex-wrap justify-start max-w-[1280px] mx-auto relative z-10 flex flex-row gap-[16px] md:justify-between px-[16px] md:px-[32px]">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="flex flex-row items-center justify-center text-white gap-[10px] text-[14px] md:text-[24px] font-normal rounded-[50px] border-[1px] border-white py-[10px] px-[12px]"
            onClick={button.onClick}
          >
            <Image
              src={button.icon}
              alt={button.text}
              width={37.35}
              height={37.35}
            />
            <span>{button.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

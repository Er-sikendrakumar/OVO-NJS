"use client";

import Image from "next/image";
import forbusiness from "../../public/forbusiness.webp";

export default function BusinessSection() {
  const items = [
    {
      title: "Business Services:",
      desc: "Marketing firms, IT Pros, Trucking & Logistics, Realtors, Insurance, and more",
      img: "/isitforme1.webp",
      color: "bg-[#FFB800]",
      hoverBg: "hover:bg-[#FFF4CC]",
      link: "/is-a-virtual-office-for-me/business-service",
    },
    {
      title: "Legal:",
      desc: "Attorneys, Small Firms, and other Legal Professionals",
      img: "/isitforme2.webp",
      color: "bg-[#8B5CF6]",
      hoverBg: "hover:bg-[#F0E8FF]",
      link: "/is-a-virtual-office-for-me/legal",
    },
    {
      title: "Home Service Professionals:",
      desc: "Plumbers, HVAC, Roofers, Landscapers, and more",
      img: "/isitforme3.webp",
      color: "bg-[#22C55E]",
      hoverBg: "hover:bg-[#E6FFED]",
      link: "/is-a-virtual-office-for-me/home-services",
    },
    {
      title: "Freelancers",
      desc: "Consultants, Graphic designers, Writers, Photographers, Etc.",
      img: "/isitforme4.webp",
      color: "bg-[#EC4899]",
      hoverBg: "hover:bg-[#FFE6F0]",
      link: "/is-a-virtual-office-for-me/freelancers",
    },
    {
      title: "Small Businesses",
      desc: "Home-based business, Startups, Solo/Entrepreneurs",
      img: "/isitforme5.webp",
      color: "bg-[#F43F5E]",
      hoverBg: "hover:bg-[#FFE6E9]",
      link: "/is-a-virtual-office-for-me/small-business",
    },
  ];

  const getCardCorners = (index, total) => {
    if (index === 0) return "lg:rounded-tl-[60px] lg:rounded-bl-[60px] md:rounded-tl-[60px] md:rounded-bl-[60px]";
    if (index === total - 1) return "lg:rounded-tr-[60px] lg:rounded-br-[60px] md:rounded-tr-[60px] md:rounded-br-[60px]";
    return "";
  };

  return (
    <section className="relative w-full bg-white lg:pt-[60px]">
      {/* Hero positioned across the blue/white split */}
      <div className="relative max-w-[1280px] mx-auto lg:px-8 px-4 z-20 pb-[53px] lg:pb-[0px]">
        <div
          className="relative flex items-center justify-center h-[407px]  lg:max-w-[1216px] w-full gap-2 rounded-br-[60px] rounded-tl-[60px] bg-cover bg-center bg-no-repeat overflow-hidden shadow-lg"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.20), rgba(0,0,0,0.20)), url(${forbusiness.src})`,
          }}
        >
          <h2 className="text-white text-[48px] leading-[60px] tracking-[0.96px] font-semibold text-center px-4">
            Designed for businesses just like yours.
          </h2>
        </div>
      </div>

      {/* BLUE BACKGROUND */}
      <div className="bg-[#065986] -mt-[240px] sm:-mt-[160px] md:-mt-[190px] pt-[240px] sm:pt-[240px] md:pt-[240px] xl:pt-[214px] pb-20">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8  flex flex-col md:flex-row xl:flex-nowrap md:flex-nowrap md:justify-center lg:flex-row xl:items-start items-center gap-2 lg:gap-4">
          {items.map((item, index) => {
            const corners = getCardCorners(index, items.length);
            const isBottom = index % 2 === 0;
            const topCorners =
              index === items.length - 1 ? "rounded-tr-[60px]" : "";
            const bottomCorners = index === 0 ? "rounded-bl-[60px]" : "";
            const hoverClass =
              index % 2 !== 0 ? "hover:-translate-y-4" : "hover:translate-y-4";

            const topbotomClass = index % 2 !== 0 ? "-mt-[24px]" : "mt-[24px]";
            const isEven = index % 2 === 0;
            const paddingClass = isEven
              ? "pt-0 pb-0 lg:pt-0 lg:pb-0"
              : "pt-0 pb-10 lg:pt-[30px] lg:pb-[10px]";
            return (
              <div
                key={index}
                className={`business-item-service w-full ${paddingClass} pb-[40px] lg:pb-[40px]`}
              >
                <div
                  className={`bg-white max-h-[700px] md:max-h-[720px] rounded-[16px] lg:rounded-[0px] md:rounded-[0px] business-item-service ${item.hoverBg} max-w-full business-item-new md:max-w-[230px] md:w-auto lg:w-auto lg:max-w-[240px] lg:pb-[0px] h-fit pb-[0px] shadow-lg overflow-hidden 
                   transform transition-all duration-300 ease-in-out ${corners} transform-gpu will-change-transform ${hoverClass}`}
                >
                  <div className={`${item.color} h-[10px] w-full lg:hidden md:hidden`} />
                  {!isBottom && (
                    <div
                      className={`${item.color} h-[10px] w-full hidden lg:block md:block ${topCorners}`}
                    />
                  )}
                  <div
                    className="relative flex flex-col items-start gap-2 w-full h-[250px] p-2 self-stretch rounded-tl-[60px] rounded-br-[60px] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover lg:rounded-br-[60px] md:rounded-br-[60px] z-10"
                    />
                  </div>

                  <div className="px-4 lg:px-2 flex flex-col">
                    <h3 className="text-[24px] leading-[32px] md:max-w-[120px]  md:text-[18px] md:leading-[28px] lg:text-[24px] lg:leading-[32px] lg:md:max-w-full font-semibold text-[#535862] [font-family:var(--Font-family-font-family-display,Inter)] mb-3 pt-4 lg:pt-16">
                      {item.title}
                    </h3>

                    <p className="text-[20px] leading-[30px] md:text-[14px] md:leading-[20px] lg:text-[20px] lg:leading-[30px]   tracking-[0.01px] lg:tracking-normal font-normal text-[#535862] [font-family:var(--Font-family-font-family-body,Inter)] flex-1 pb-4 lg:pb-16">
                      {item.desc}
                    </p>

                    <div className="pt-2 pb-8 w-full">
                      <button
                        onClick={() => (window.location.href = item.link)}
                        className="flex  w-full lg:mx-auto lg:w-auto items-center justify-center gap-[4px] px-[12px] py-[8px]  text-[14px] leading-[20px] md:text-[12px] md:leading-[18px] lg:text-[14px] lg:leading-[20px] font-semibold text-[var(--Colors-Text-text-white,#FFF)] bg-[var(--Colors-Background-bg-brand-solid,#36BFFA)] rounded-[8px] [font-family:var(--Font-family-font-family-body,Inter)]"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>

                  {isBottom && (
                    <div
                      className={`${item.color} bottom-0 hidden lg:block md:block h-[10px] w-full lg:${bottomCorners} md:${bottomCorners}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

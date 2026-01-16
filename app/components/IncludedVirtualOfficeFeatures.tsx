import React from "react";

const IconPhone = ({ className = "w-6 h-6 text-[#026AA2]" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
    <path
      d="M19 16V10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10V16M3.5 19C2.11929 19 1 17.8807 1 16.5V14.5C1 13.1193 2.11929 12 3.5 12C4.88071 12 6 13.1193 6 14.5V16.5C6 17.8807 4.88071 19 3.5 19ZM16.5 19C15.1193 19 14 17.8807 14 16.5V14.5C14 13.1193 15.1193 12 16.5 12C17.8807 12 19 13.1193 19 14.5V16.5C19 17.8807 17.8807 19 16.5 19Z"
      stroke="#0086C9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13"
      stroke="#0086C9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconInbox = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M8.38028 8.85323C9.07627 10.3028 10.0251 11.6615 11.2266 12.8631C12.4282 14.0646 13.7869 15.0134 15.2365 15.7094C15.3612 15.7693 15.4235 15.7992 15.5024 15.8222C15.7828 15.904 16.127 15.8453 16.3644 15.6752C16.4313 15.6274 16.4884 15.5702 16.6027 15.4559C16.9523 15.1063 17.1271 14.9315 17.3029 14.8172C17.9658 14.3862 18.8204 14.3862 19.4833 14.8172C19.6591 14.9315 19.8339 15.1063 20.1835 15.4559L20.3783 15.6508C20.9098 16.1822 21.1755 16.448 21.3198 16.7333C21.6069 17.3009 21.6069 17.9712 21.3198 18.5387C21.1755 18.8241 20.9098 19.0898 20.3783 19.6213L20.2207 19.7789C19.6911 20.3085 19.4263 20.5733 19.0662 20.7756C18.6667 21 18.0462 21.1614 17.588 21.16C17.1751 21.1588 16.8928 21.0787 16.3284 20.9185C13.295 20.0575 10.4326 18.433 8.04466 16.045C5.65668 13.6571 4.03221 10.7947 3.17124 7.76131C3.01103 7.19687 2.93092 6.91464 2.9297 6.5017C2.92833 6.04347 3.08969 5.42298 3.31411 5.02348C3.51636 4.66345 3.78117 4.39863 4.3108 3.86901L4.46843 3.71138C4.99987 3.17993 5.2656 2.91421 5.55098 2.76987C6.11854 2.4828 6.7888 2.4828 7.35636 2.76987C7.64174 2.91421 7.90747 3.17993 8.43891 3.71138L8.63378 3.90625C8.98338 4.25585 9.15819 4.43065 9.27247 4.60643C9.70347 5.26932 9.70347 6.1239 9.27247 6.78679C9.15819 6.96257 8.98338 7.13738 8.63378 7.48698C8.51947 7.60129 8.46231 7.65845 8.41447 7.72526C8.24446 7.96269 8.18576 8.30695 8.26748 8.5873C8.29048 8.6662 8.32041 8.72854 8.38028 8.85323Z"
      stroke="#0086C9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconPremiumCall = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M17.4996 3L20.9996 6.5M20.9996 6.5L17.4996 10M20.9996 6.5H12.9996M10.2266 13.8631C9.02506 12.6615 8.07627 11.3028 7.38028 9.85323C7.32041 9.72854 7.29048 9.66619 7.26748 9.5873C7.18576 9.30695 7.24446 8.96269 7.41447 8.72526C7.46231 8.65845 7.51947 8.60129 7.63378 8.48698C7.98338 8.13737 8.15819 7.96257 8.27247 7.78679C8.70347 7.1239 8.70347 6.26932 8.27247 5.60643C8.15819 5.43065 7.98338 5.25585 7.63378 4.90624L7.43891 4.71137C6.90747 4.17993 6.64174 3.91421 6.35636 3.76987C5.7888 3.4828 5.11854 3.4828 4.55098 3.76987C4.2656 3.91421 3.99987 4.17993 3.46843 4.71137L3.3108 4.86901C2.78117 5.39863 2.51636 5.66344 2.31411 6.02348C2.08969 6.42298 1.92833 7.04347 1.9297 7.5017C1.93092 7.91464 2.01103 8.19687 2.17124 8.76131C3.03221 11.7947 4.65668 14.6571 7.04466 17.045C9.43264 19.433 12.295 21.0575 15.3284 21.9185C15.8928 22.0787 16.1751 22.1588 16.588 22.16C17.0462 22.1614 17.6667 22 18.0662 21.7756C18.4263 21.5733 18.6911 21.3085 19.2207 20.7789L19.3783 20.6213C19.9098 20.0898 20.1755 19.8241 20.3198 19.5387C20.6069 18.9712 20.6069 18.3009 20.3198 17.7333C20.1755 17.448 19.9098 17.1822 19.3783 16.6508L19.1835 16.4559C18.8339 16.1063 18.6591 15.9315 18.4833 15.8172C17.8204 15.3862 16.9658 15.3862 16.3029 15.8172C16.1271 15.9315 15.9523 16.1063 15.6027 16.4559C15.4884 16.5702 15.4313 16.6274 15.3644 16.6752C15.127 16.8453 14.7828 16.904 14.5024 16.8222C14.4235 16.7992 14.3612 16.7693 14.2365 16.7094C12.7869 16.0134 11.4282 15.0646 10.2266 13.8631Z"
      stroke="#0086C9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconEmail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
    <path
      d="M1.00006 4L9.16498 9.71544C9.82615 10.1783 10.1567 10.4097 10.5163 10.4993C10.834 10.5785 11.1662 10.5785 11.4838 10.4993C11.8434 10.4097 12.174 10.1783 12.8351 9.71544L21.0001 4M5.80006 17H16.2001C17.8802 17 18.7203 17 19.362 16.673C19.9265 16.3854 20.3855 15.9265 20.6731 15.362C21.0001 14.7202 21.0001 13.8802 21.0001 12.2V5.8C21.0001 4.11984 21.0001 3.27976 20.6731 2.63803C20.3855 2.07354 19.9265 1.6146 19.362 1.32698C18.7203 1 17.8802 1 16.2001 1H5.80006C4.1199 1 3.27982 1 2.63809 1.32698C2.0736 1.6146 1.61466 2.07354 1.32704 2.63803C1.00006 3.27976 1.00006 4.11984 1.00006 5.8V12.2C1.00006 13.8802 1.00006 14.7202 1.32704 15.362C1.61466 15.9265 2.0736 16.3854 2.63809 16.673C3.27982 17 4.1199 17 5.80006 17Z"
      stroke="#0086C9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type FeatureItem = {
  iconUrl?: string | null;
  title: string;
  description: string;
  href: string | null;
};

const defaultIcons = [IconPhone, IconMail, IconInbox, IconPremiumCall, IconEmail, IconEmail];

export default function IncludedVirtualOfficeFeatures({ items = [] }: { items?: FeatureItem[] }) {
  const features = items.length > 0 ? items : [];

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-5 pb-10 lg:py-10">
        <div className="flex gap-16 flex-col">
          <header className="flex gap-[12px] flex-col">
            <h1 className="text-[30px] leading-[38px] tracking-normal md:text-[48px] font-bold text-[#181D27] md:leading-[60px] md:tracking-[-0.96px]">
              Our Virtual Office All-Inclusive Services
            </h1>
            <h2 className="text-[24px] leading-[32px] tracking-normal lg:text-[36px] md:text-[36px] md:leading-[44px] md:tracking-[-0.72px] lg:leading-[44px] lg:tracking-[-0.72px] text-[#101828] font-semibold">
              Included Virtual Office Features
            </h2>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[32px] md:gap-y-[64px] ">
            {features.map((feature, index) => {
              const IconComponent = defaultIcons[index % defaultIcons.length];
              return (
                <article key={`${feature.title}-${index}`} className="flex flex-col gap-4 items-start">
                  <span className="inline-flex items-center justify-center">
                    <IconComponent />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-[#181D27]">{feature.title}</h3>
                    <p className="text-[16px] leading-[24px] text-[#535862]">{feature.description}</p>
                  </div>
                  {feature.href && feature.href.trim().length > 0 && (
                    <a
                      href={feature.href}
                      className="group flex gap-[6px] items-center text-[#026AA2] hover:text-[#015D89] text-[16px] leading-[24px] font-semibold transition-colors"
                    >
                      Learn more
                      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-[2px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M4.16667 9.99999H15.8333M15.8333 9.99999L10 4.16666M15.8333 9.99999L10 15.8333"
                            stroke="currentColor"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { MapPin, Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ActionSearchBar } from "@/app/components/ActionSearchBar";
import { MostPopularCities } from "@/app/components/prestigious-business/MostPopularCities";
const LocationAddressIcon = '/assets/locarion-map-icon.svg';
const MailIcon = '/assets/mail-box-icon.svg';
const PrivacyIcon = '/assets/profile-card-icon.svg';
import { GetYourOfficeSection } from "./prestigious-business/GetYourOfficeSection";
import { FAQSection } from "./prestigious-business/FAQSection";
import { Footer } from "./Footer";
const FeatureIconOne = '/assets/featured-round-icon1.svg';
const FeatureIconTwo = '/assets/featured-round-icon2.svg';
const FeatureIconThree = '/assets/featured-round-icon3.svg';

interface FAQ {
  question: string;
  answer: string;
}

interface PrestigiousBusinessAddressClientProps {
  faqs: FAQ[];
}

export function PrestigiousBusinessAddressClient({ faqs }: PrestigiousBusinessAddressClientProps) {
  const features = [
    {
      icon: LocationAddressIcon,
      text: "Prestigious Business Address",
    },
    {
      icon: MailIcon,
      text: "Professional Mail Receipt",
    },
    {
      icon: PrivacyIcon,
      text: "Privacy & Safety",
    },
  ];

  return (
    <div className="w-full flex pt-[72px] lg:pt-[104px]">
      <div className="flex w-full h-full flex-col items-start">
        {/* Business Address Hero */}
        <section className="flex w-full bg-white pt-[40px] pb-[40px] lg:pt-[40px] lg:pb-[60px]">
          <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row w-full gap-[64px] items-start">
              {/* Left Section - Text and UI Elements */}
              <div className="flex w-full lg:w-[613px] py-0 lg:justify-start">
                <div className="flex flex-col">
                  {/* Headline with Price */}
                  <div className="flex flex-col">
                    <h2 className="text-[30px] md:text-[36px] lg:text-[48px] font-medium lg:tracking-[-0.96px] text-[#101828] mb-[12px] leading-[38px] md:leading-[44px] lg:leading-[60px]">
                      Establish your corporate presence with a Business Address-Only {" "}
                      <span className="text-[#0086C9]">
                        $59
                      </span>/mo
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="w-auto lg:max-w-[560px] text-[20px] font-normal leading-[30px] text-[#475467] mb-[32px]">
                    Secure a premier address for your business, boosting  <br /> its image and privacy without sacrificing your convenience < br className="block md:hidden" /> or security. No hidden fees.
                  </p>

                  {/* Features List */}
                  <div className="flex flex-col gap-[8px] w-full mb-[32px]">
                    {features.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <div key={index} className="flex items-center gap-[10px]">
                          <div className="flex-shrink-0">
                            <Image
                            src={feature.icon}
                            alt={"location icon"}
                            height={32.5}
                            width={30}
                            className="h-[32.5px]"
                            />
                          </div>
                          <span className="text-[17.5px] font-normal leading-[25px] text-[#344054]">
                            {feature.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Search Input and Button */}
                  <div className="flex flex-col gap-[12px] w-full">
                    <div className="flex w-full flex-col items-start gap-[12px] lg:gap-[16px] sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex-1 w-full">
                        <ActionSearchBar
                          mode="business-address"
                          placeholder="Search for Zip, State, or City"
                        />
                      </div>
                      <Link
                        href="/business-address/"
                        prefetch={false}
                        className="h-[50px] w-full sm:w-auto min-w-[129px] px-[20px] py-[12px] rounded-[8px] border border-solid border-[#36BFFA] bg-[#36BFFA] text-white shadow-none transition-colors hover:border-[#026aa2] hover:bg-[#026aa2] font-[600] text-[16px] hidden lg:flex sm:items-center sm:justify-center whitespace-nowrap"
                      >
                        Get started
                      </Link>
                    </div>
                    <div className="w-full flex">
                      <a className="inline-flex" href="/business-address/">
                        <p className="cursor-pointer text-[14px] font-[700] text-[#475467] leading-[20px] hover:text-[#475467]">
                          Browse Our Top Locations
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Image */}
              <div className="hidden lg:flex relative">
                <div className="relative w-[539px] h-[539.5px] max-w-[560px] rounded-tl-none rounded-tr-[64px] rounded-bl-[64px] rounded-br-none overflow-hidden">
                  <Image
                    src="/assets/rightBuilding.webp"
                    alt="New York City skyline with Empire State Building"
                    fill
                    className="object-cover rounded-tl-none rounded-tr-[64px] rounded-bl-[64px] rounded-br-none"
                    priority
                    sizes="539px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Most Popular Cities */}
        <MostPopularCities />

        {/* Prestigious Corporate Business Address */}
        <section className="flex w-full bg-white py-[20px] md:py-[40px] lg:py-[60px]">
          <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex flex-col w-full">
              <h2 className="font-semibold text-[36px] leading-[44px] tracking-[-0.72px] text-[#101828] mb-[20px]">
               Prestigious Corporate Business Address
              </h2>
              <div className="flex flex-col gap-[18px]">
                <p className="font-normal text-[18px] leading-[28px] text-[#475467]">
                  A prestigious business address is ideal for businesses wanting to project a professional image to clients and partners. With a prestigious business address, flexibility is key. You can choose the location you want. Whether it's a Brickell penthouse by the beach in Miami, or a towering skyscraper in New York, a prestigious business address gives your business the legitimacy and safety that a home or PO box address doesn't. Having an elegant space associated with your business enhances your company's image, and it can positively impact how others perceive your business.
                </p>
                <p className="font-normal text-[18px] leading-[28px] text-[#475467]">
                  Safety and privacy are key when running a business. Using your home address as your business address opens your home to unwanted visitors, unhappy clients, process servers, or even porch pirates looking for a quick score. You also won't have to worry about your mailbox being stuffed with scams and junk mail. All of your business-related mail and packages will be delivered and will be kept safe and secure. In the event your business gets sued, your home and assets can become vulnerable. With a prestigious business address, your home, mail, and personal assets are safe.
                </p>
                <p className="font-normal text-[18px] leading-[28px] text-[#475467]">
                 A prestigious business address will also save you thousands in overhead costs. With a prestigious business address, there's no lease payments and no utility or maintenance payments. The money you save can then be allocated into growing and expanding your business. You'll also save time commuting as you won't need to travel to your office every day. A prestigious business address gives you and your employees the freedom and flexibility to work from anywhere without being stuck in a back-and-forth commute.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="flex w-full bg-white py-[20px] md:py-[40px] lg:py-[60px]">
          <div className="flex w-full max-w-[1280px] mx-auto px-4 md:px-8">
            <div className="flex flex-col w-full gap-[32px] lg:gap-[32px]">
              {/* Feature 1: Prestigious Business Address */}
              <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-[64px] items-center justify-between">
                {/* Content */}
                <div className="flex flex-col align-start gap-0 w-full lg:w-[560px]">
                  <div className="flex-shrink-0 rounded-full flex items-center justify-start">
                    <Image
                      src={FeatureIconOne}
                      alt={"fueature icon"}
                      height={56}
                      width={56}
                      />
                  </div>
                  <h3 className="font-semibold text-[30px] leading-[38px] tracking-[0px] text-[#101828] mt-[24px] mb-[16px]">
                    Prestigious Business Address
                  </h3>
                  <p className="font-normal text-[20px] leading-[30px] tracking-[0px] text-[#475467]">
                    Select one of our prestigious locations as your primary business address and use it to receive all your mail and packages.
                  </p>
                </div>
                {/* Image - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:flex w-full lg:w-[560px] lg:h-[400px] bg-[#F2F4F7] px-8 items-center justify-center">
                  <div className="relative w-full max-w-[496px] h-[400px] overflow-hidden">
                    <Image
                      src="/assets/addImg1.webp"
                      alt="Prestigious Business Address"
                      fill
                      className="object-cover"
                      sizes="496px"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2: Professional Mail Receipt */}
              <div className="flex flex-col lg:flex-row-reverse w-full gap-6 lg:gap-[64px] items-center justify-between">
                {/* Content */}
                <div className="flex flex-col align-start gap-0 w-full lg:w-[560px]">
                  <div className="flex-shrink-0 rounded-full flex items-center justify-start">
                    <Image
                      src={FeatureIconTwo}
                      alt={"fueature icon"}
                      height={56}
                      width={56}
                      />
                  </div>
                  <h3 className="font-semibold text-[30px] leading-[38px] tracking-[0px] text-[#101828] mt-[24px] mb-[16px]">
                    Professional Mail Receipt
                  </h3>
                  <p className="font-normal text-[20px] leading-[30px] tracking-[0px] text-[#475467]">
                   Never Miss A Delivery - Our receptionists are there for you to receive any mail or packages, even when a signature is required.
                  </p>
                </div>
                {/* Image - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:flex w-full lg:w-[560px] lg:h-[400px] bg-[#F2F4F7] px-8 items-center justify-center">
                  <div className="relative w-full max-w-[496px] h-[400px] overflow-hidden">
                    <Image
                      src="/assets/addImg2.webp"
                      alt="Professional Mail Receipt"
                      fill
                      className="object-cover"
                      sizes="496px"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 3: Asset Protection */}
              <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-[64px] items-center justify-between">
                {/* Content */}
                <div className="flex flex-col align-start gap-0 w-full lg:w-[560px]">
                  <div className="flex-shrink-0 rounded-full flex items-center justify-start">
                    <Image
                      src={FeatureIconThree}
                      alt={"fueature icon"}
                      height={56}
                      width={56}
                      />
                  </div>
                  <h3 className="font-semibold text-[30px] leading-[38px] tracking-[0px] text-[#101828] mt-[24px] mb-[16px]">
                    Asset Protection
                  </h3>
                  <p className="font-normal text-[20px] leading-[30px] tracking-[0px] text-[#475467]">
                   Using your home address as your business address could leave your home vulnerable if the business is sued and a judge deems it appropriate to pierce the corporate veil.
                  </p>
                </div>
                {/* Image - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:flex w-full lg:w-[560px] lg:h-[400px] bg-[#F2F4F7] px-8 items-center justify-center">
                  <div className="relative w-full max-w-[496px] h-[400px] overflow-hidden">
                    <Image
                      src="/assets/addImg3.webp"
                      alt="Asset Protection"
                      fill
                      className="object-cover"
                      sizes="496px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Your Office Section */}
        <GetYourOfficeSection />

        {/* FAQ Section */}
        <FAQSection data={faqs} />

        {/* Footer */}
        <Footer />

      </div>
    </div>
  );
}

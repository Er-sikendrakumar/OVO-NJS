"use client";

import { Footer } from "../components/Footer";
import { PromoPopularLocations } from "../components/PromoPopularLocations";

export default function OpusMeetingRooms() {
  return (
    <main className="w-full pt-[72px] lg:pt-[104px]">
      <section className="w-full flex  py-0 lg:pt-[40px]  lg:pb-[80px] justify-center items-center">
        <div
          className="flex max-w-[1080px] w-full flex-col justify-center items-center gap-2 md:gap-8 px-4 py-5 pb-10 md:p-4 md:rounded-[24px] bg-white 
                    shadow-[0_20px_24px_-4px_rgba(10,13,18,0.08),0_8px_8px_-4px_rgba(10,13,18,0.03),0_3px_3px_-1.5px_rgba(10,13,18,0.04)]"
        >
          <div className="flex flex-col justify-center items-center gap-[8px] py-[20px] px-[32px] md:py-[40px] md:px-[28px] self-stretch">
            <div className="w-full max-w-[701px] h-[38px] sm:h-[78px] md:h-[78px]">
              <img
                src="/opusmeetingrooms.webp"
                alt="Meeting"
                className="object-cover "
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:px-[16px] md:py-3 items-start gap-2 md:gap-[64px] self-stretch">
            {/*Left Side */}
            <div className="flex flex-col items-start gap-3 max-w-full md:max-w-[514px] pb-5 md:pb-[13px] md:py-0 w-full">
              <h1 className="text-[#026AA2] text-[24px] font-semibold leading-[32px] md:text-[36px] md:leading-[44px] md:tracking-[-0.72px]">
                Get your complimentary meeting room time in a premier location
                throughout the USA!
              </h1>
              <p className="text-[#535862] text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] font-semibold">
                Hold your meetings in a prestigious building. Enjoy 5 hours of
                complimentary meeting room time as we are confident ou will come
                back for more…
              </p>
              <p className="text-[#535862] text-[12px] leading-[18px] md:text-[14px] md:leading-[20px]">
                If you are looking to hold meaningful conversations with clients
                but aren’t sure where to start, we have the perfect solution.
                Rent one of our 16 meeting and conference room facilities in
                major cities throughout the U.S. Our executive rooms are brand
                new and designed to provide business owners with a professional
                and upscale environment to hold important corporate meetings.
                Enjoy quiet time to enhance your productivity and close on your
                next deal.
              </p>
              <div className="flex flex-row gap-[22px] w-full pb-[8px] md:pb-[6px]">
                <ul className="flex flex-col gap-[9px] md:gap-[7px] list-disc ps-4 w-[50%]">
                  <li className="text-[#535862] text-[12px] leading-[18px] md:text-sm">
                    Air Conditioning
                  </li>
                  <li className="text-[#535862] text-[12px] leading-[18px] md:text-sm">
                    Business Center
                  </li>
                  <li className="text-[#535862] text-[12px] leading-[18px] md:text-sm">
                    Free WiFi Access
                  </li>
                </ul>
                <ul className="flex flex-col gap-[9px] md:gap-[7px] list-disc ps-4 w-[50%]">
                  <li className="text-[#535862] text-[12px] leading-[18px] md:text-sm">
                    Coffee & Water
                  </li>
                  <li className="text-[#535862] text-[12px] leading-[18px] md:text-sm">
                    Guest Parking
                  </li>
                  <li className="text-[#535862] text-[12px] leading-[18px] md:text-sm">
                    Video Conferencing
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2 ">
                <h3 className="text-[#535862] text-[14px] font-semibold leading-[20px] md:text-[18px] md:leading-[28px]">
                  Meeting Rooms Location
                </h3>
                <p className="text-[#535862] text-[12px] leading-[18px] md:text-[14px] md:leading-[20px] tracking-[-0.01px] md:tracking-normal">
                  Book your next meeting in key cities including Atlanta, New
                  York, Dallas, Chicago, Los Angeles, Tampa, and more...
                </p>
                <a
                  href="tel:+18669680808"
                  className="text-[#026AA2] text-[12px] md:text-[16px] leading-[20px] hover:underline"
                >
                  (866) 968-0808
                </a>
              </div>
              <div className="flex flex-col gap-3 items-center md:gap-1 w-full">
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href =
                      "https://book.opusmeetingrooms.com/reg.php?c=gt3b")
                  }
                  className="flex hover:bg-[#026aa2] h-[40px] md:h-[60px] px-[14px] py-[10px] md:px-[20px] md:py-[16px] justify-center items-center gap-[6px] self-stretch rounded-[8px] bg-[#36BFFA] text-[#FFF] text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] font-semibold"
                >
                  Click here to reserve your complimentary time
                </button>

                <p className="text-[#535862] text-[14px] leading-[20px]">
                  *5 Free hours will be automatically applied.
                </p>
              </div>
            </div>

            {/*Right Side*/}
            <div className="flex flex-col max-w-full md:max-w-[438px] w-full gap-10 md:gap-5 pt-5 md:py-0">
              <div className="w-full min-h-[346px] md:min-h-[371px]">
                <img
                  src="https://www.opusvirtualoffices.com/newsite/wp-content/themes/ThemeDec23/assets/images/meeting-rooms/5hours-promo.gif"
                  alt=""
                  className="object-cover w-full min-h-[346px] md:min-h-[371px]"
                />
              </div>
              <div className="w-full">
                <PromoPopularLocations />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

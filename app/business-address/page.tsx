import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { StatesList } from "@/app/components/StatesList";
import Image from "next/image";
import { SearchWithAction } from "../components/SearchWithAction";
import Padding from "../components/ui/Padding";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function BusinessAddressPage() {
  // Read JSON at runtime instead of bundling at build time
  const allSatesData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/all-states_ba.json"),
      "utf-8"
    )
  );
  const allpopularSliderData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/business-address-ba.json"),
      "utf-8"
    )
  );

  return (
    <div className="min-h-screen bg-white pt-[72px] lg:pt-[104px]">
      <Navbar />

      {/* Hero Section */}
      <section className=" bg-white ">
        <div className="inset-0  opacity-100" aria-hidden="true">
          {/* <Image
            src="/dots.svg"
            alt=""
            fill
            priority
            className="object-cover scale-[1.35]"
          /> */}

          <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col items-center  pt-[20px] lg:pt-[40px] sm:pt-16 sm:pb-12 lg:pb-[60px]  gap-6 lg:gap-6 bg-[url('https://blitsec-testing-env.vercel.app/dots.svg')] bg-center bg-no-repeat">
            <div className="w-full">
              <h1
                className="text-left lg:text-center text-[20px] leading-[30px] font-semibold tracking-normal lg:font-500 text-[#101828]
              sm:text-[32px] sm:leading-[42px] sm:tracking-[-0.32px]
              lg:text-[48px] lg:leading-[60px] lg:tracking-[-0.96px] lg:font-medium"
              >
                Establish Your Business Presence:{" "}
                <br className="hidden lg:block" />
                Over 100 Locations – Affordable Prestigious Business Addresses
                for Just <span className="text-[#0BA5EC]">$59</span>/Month
              </h1>
            </div>

            {/* Search Input and Button */}
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex w-full flex-col items-center justify-center gap-[12px] lg:gap-[16px] sm:flex-row sm:items-center sm:gap-4">
                <SearchWithAction
                  className="w-full"
                  searchContainerClassName="w-full lg:max-w-[655px]"
                  placeholder="Search for Zip, State, or City"
                  zipRedirectBase="/business-address"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Padding desktop="40px" mobile="40px" />
      {/* <SectionSpacer /> */}

      {/* State Selection Sections - Loaded from API */}
      <StatesList isba={true} statesData={allSatesData} />
      <Padding desktop="40px" mobile="20px" />
      {/* <SectionSpacer /> */}
      <Padding desktop="40px" mobile="20px" />

      {/* Most Popular Cities */}
      <PopularLocations
        isba={true}
        title="Most Popular Cities"
        description="From the skyscrapers of NYC to the valleys of California, you'll be sure to find the perfect new business address in all major cities across the country."
        count={16}
        align="center"
      />
      <Padding desktop="80px" mobile="20px" />
      <Footer />
    </div>
  );
}

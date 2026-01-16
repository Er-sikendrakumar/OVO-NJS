"use client";
import Link from "next/link";
import { type StatesResponse } from "@/app/lib/api/states";

interface StatesListProps {
  isba?: boolean;
  statesData?: StatesResponse;
}

export function StatesList({ isba =false, statesData }: StatesListProps) {
  // Extract countries from API data
  const usaData = statesData?.data.find(
    (country) => country.country_abbr === "US"
  );
  const canadaData = statesData?.data.find(
    (country) => country.country_abbr === "CA"
  );
  const puertoRicoData = statesData?.data.find(
    (country) => country.country_abbr === "PR"
  );

  // Determine URL prefix based on page type
  const urlPrefix = isba ? "/business-address" : "/virtual-office";

  return (
    <>
      {/* State Selection Section */}
      <section className={`bg-white pt-0 ${isba ? "pb-0" : "pb-5"}`}>
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col gap-8">
              {/* United States */}
              <div>
                <div className="flex flex-col gap-5 max-w-[768px] mb-10">
                  <h2 className="text-gray-900 text-[36px] leading-[44px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                    {!isba && <span>United States -</span>}
                    {!isba && <br className="block lg:hidden" />}
                    <span> Select Your State</span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-start gap-[28px] lg:gap-6">
                  {usaData?.states.map((state) => (
                    <Link
                      key={state.state_id}
                      href={`${urlPrefix}/${state.state_name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      prefetch={false}
                      className="flex items-center gap-2"
                    >
                      <span className="text-gray-600 text-base font-semibold leading-6 tracking-normal lg:tracking-[0.1px] !text-[#535862] hover:text-[#181d27] transition-colors">
                        {state.state_name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canada Section */}
      {!isba && (
        <section className="bg-white py-5">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="max-w-[1280px] mx-auto px-8">
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex flex-col gap-5 max-w-[768px] mb-5 lg:mb-10">
                    <h2 className="text-gray-900 text-[30px] leading-[38px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                      <span>Canada -</span>
                      <br className="lg:hidden" />
                      <span> Select Your Province</span>
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-start gap-5">
                    {canadaData?.states.map((province) => (
                      <Link
                        key={province.state_id}
                        href={`${urlPrefix}/${province.state_name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        prefetch={false}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-600 text-base font-semibold leading-6 hover:text-blue-light400 transition-colors">
                          {province.state_name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Puerto Rico Section */}
      {!isba && (
        <section className="bg-white pt-5 pb-0">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="max-w-[1280px] mx-auto px-8">
              <div className="flex flex-col gap-8">
                <div>
                  <div className="flex flex-col gap-5 max-w-[768px] mb-5 lg:mb-10">
                    <h2 className="text-gray-900 text-[30px] leading-[38px] font-semibold tracking-[-0.6px] lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]">
                      <span>Puerto Rico -</span>
                      <br className="lg:hidden" />
                      <span> Select Your City</span>
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-start gap-5">
                    {puertoRicoData?.states.map((city) => (
                      <Link
                        key={city.state_id}
                        href={`${urlPrefix}/puerto-rico/${city.state_name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        prefetch={false}
                        className="flex items-center gap-2"
                      >
                        <span className="text-gray-600 text-base font-semibold leading-6 hover:text-blue-light400 transition-colors">
                          {city.state_name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

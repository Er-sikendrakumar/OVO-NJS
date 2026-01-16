import React from "react";
import Link from "next/link";

export type UpgradeItem = {
  title: string;
  price: string;
  body: string;
};

export default function OptionalVirtualOfficeUpgrades({
  items = [],
}: {
  items?: UpgradeItem[];
}) {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto  py-10">
        <div className="px-4 md:px-0">
          <h2 className=" px-0 md:px-8 text-[36px] leading-[44px] tracking-[-0.72px] text-[#101828] mb-3 md:mb-8 font-semibold">
            Optional Virtual Office Upgrades
          </h2>

          <div className="bg-gray-100 rounded-md py-8 px-4 md:px-8 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[32px] gap-y-[32px] md:gap-y-[64px]">
              {(items || []).map((item, index) => {
                const hasDisclaimer = item.body.includes("*");
                const [mainText, disclaimer] = hasDisclaimer
                  ? item.body.split("*")
                  : [item.body, null];
                return (
                  <div key={item.title} className="p-0">
                    <h3 className="text-[20px] leading-[30px] font-semibold text-[#101828]">
                      {item.title}
                    </h3>

                    {/* Main Body */}
                    <p className="mt-1 text-[16px] leading-[24px] text-[#475467] whitespace-pre-line">
                      {mainText}
                    </p>

                    {/* Disclaimer Line */}
                    {disclaimer && (
                      <p className="text-[16px] leading-[24px] text-[#475467] mt-[16px]">
                        *{disclaimer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

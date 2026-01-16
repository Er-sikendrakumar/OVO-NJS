"use client";
import { ComparisonTable } from "./ComparisonTable";
import { useRouter } from "next/navigation";

export function PriceDetailsTableAddress() {
  const router = useRouter();

  return (
    <section className="max-w-[1280px] mx-auto px-4 lg:px-8 pb-6">
      <div className=" w-full">
        {/* Quote Box */}
        <div className="flex flex-col gap-6 items-start w-full">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full flex items-center justify-center">
              <img
                src="/av.webp"
                alt="Contrast border"
                width="56"
                height="56"
              />
            </div>

            <div>
              <div className="text-[18px] leading-[28px] font-semibold text-[#101828]">
                Elliot Sterling
              </div>
              <div className="text-[16px] leading-6 font-normal text-[#475467]">
                USAVirtualOffices.org
              </div>
            </div>
          </div>

          <p className="text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] font-normal text-[#475467]">
            The world of virtual offices can be extremely difficult to evaluate,
            as I have found there to be a lot of misleading pricing and hidden
            fees. In order to try to do a fair ‘apples-to-apples’ comparison
            between the top 4 providers, I looked at 6 of the top markets. As
            part of my comparison, I tried to get addresses as close as
            possible, and always within the same zip code. As you will see from
            the pricing comparison below, there is one very clear winner in all
            situations throughout the USA, and that is Opus Virtual Offices. As
            the saying goes, “numbers don’t lie.”
          </p>
          <div className="max-w-full w-full">
            <ComparisonTable />
          </div>
          <div className="w-full flex flex-col gap-[18px]">
            <p className="text-[18px] leading-[28px] font-normal text-[#475467]">
              {" "}
              Unlike the other three virtual office providers, Opus Virtual
              Offices promotes very clear pricing with no hidden fees, and their
              ‘All-Inclusive’ price beat the competition in ALL 6 locations
              researched. To be honest, I started my analysis with only 3
              locations, but then expanded it to 6 locations just to see if my
              results would hold up, or if any of the other competitors would
              ever beat Opus Virtual Offices. Much to my surprise, Opus Virtual
              Offices beat the competition every single time, and it wasn’t even
              close!
            </p>
            <p className="text-[18px] leading-[28px] font-normal text-[#475467] tracking-[0.006px] md:tracking-normal">
              The gap becomes even greater if you want your mail forwarded
              rather than picking it up. While these Opus Virtual Office
              locations only charge for the postage associated with forwarding
              your mail, the other three providers all charge a ‘handling fee’
              on top of the postage, ranging from $10-$95 per month, depending
              on the provider and the frequency of the mail forwarding. The same
              was true for the call answering services, as Opus and Regus both
              provide UNLIMITED call answering, while Davinci Virtual Office
              Solutions and Alliance Virtual Offices only include 50 minutes in
              the price listed.
            </p>
            <p className="text-[18px] leading-[28px] font-normal text-[#475467]">
              Lastly, is the minimum contract length. While Opus Virtual
              Offices’ pricing is for a 3-month minimum contract period, the
              pricing for the other three competitors is based upon a 6-month
              contract. Regus actually advertises pricing based upon a 2-year
              contract, but I used their 6-month contract pricing in order to
              provide a more realistic comparison. That said, if you think that
              Regus is a better solution for you and you don’t mind committing
              to a 2-year contract, then know that you could pay approximately
              $25-$35/mo lower than what is detailed in the pricing comparison
              below.
            </p>
            <p className="text-[18px] leading-[28px] font-normal text-[#475467]">
              Given the pricing disparity outlined herein, when would it ever
              make sense to consider Regus, Davinci or Alliance rather than
              Opus? The answer to this question lies in my opening paragraph.
              Specifically, Opus is typically the best choice throughout the USA
              and in some parts of Canada and Puerto Rico; however, if you are
              looking for an office outside of these areas, then Regus, Davinci,
              or to a lesser extent, Alliance, may be your only alternatives. It
              is for that reason, that Regus is often the preferred choice for
              very large multinational corporations with big budgets, as they
              prefer to deal with one vendor that can accommodate their
              employees worldwide.
            </p>
          </div>
          <button
            onClick={() => router.push(`/opus-feature-comparison/`)}
            className="w-auto bg-[#36BFFA] hover:bg-[#026AA2] text-white text-[14px] leading-5 md:text-[16px] md:leading-6 md:underline font-semibold rounded-[8px] px-3 py-2"
          >
            See Features Comparison
          </button>
        </div>
      </div>
    </section>
  );
}

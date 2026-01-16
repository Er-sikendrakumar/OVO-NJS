import { AffiliateFeatureList } from "./AffiliateFeatureList";

export function AffiliateHeroText() {
  return (
    <div className="flex flex-col items-start max-w-full md:max-w-[751px] w-full self-stretch px-4 md:px-6 lg:px-8">
      <div className="flex flex-col pe-0  xl:pe-8 gap-3 md:gap-8">
        <div className="w-auto flex flex-col items-start gap-3 md:gap-6 self-stretch">
          <h1
            className="
            w-auto text-[#3E465A] font-semibold 
            text-[36px] leading-[44px] tracking-[-0.72px]
             lg:text-[48px] lg:leading-[58px] lg:tracking-[-0.72px]
            xl:text-[60px] xl:leading-[72px] xl:tracking-[-1.2px]
          "
          >
            Welcome To Our <span className="text-[#0BA5EC]">Affiliate</span>{" "}
            Program
          </h1>

          <p
            className="
            w-auto text-[#475467] font-normal max-w-full
            text-[14px] leading-[20px]
            sm:text-[18px] sm:leading-[28px]
            lg:text-[20px] lg:leading-[30px]
          "
          >
            Join for free, no tech skills needed—just share, drive sales, and
            earn commissions. Simple, rewarding, and built for you!
          </p>
        </div>

        <div className="w-full">
          <AffiliateFeatureList />
        </div>
      </div>
    </div>
  );
}

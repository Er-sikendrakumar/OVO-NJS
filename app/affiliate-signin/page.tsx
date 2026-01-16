import { Navbar } from "../components/Navbar";
import { AffiliateHeroText } from "../components/AffiliateHeroText";
import { AffiliateLoginCard } from "../components/AffiliateLoginCard";
import { Footer } from "../components/Footer";

export default function AffiliateSignInPage() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-[72px] lg:pt-[104px]">
      <section className="w-full h-[560px] md:h-[820px] lg:h-[560px]  bg-[url(/affiliate-signin-banner.webp)] bg-cover bg-center bg-no-repeat">
        <div className="mx-auto flex max-w-[1280px] pt-5 pb-10 lg:pt-10 lg:pb-20  flex-col items-center  lg:flex-row gap-[24px] md:gap-[32px] xl:gap-[64px]">
          <AffiliateHeroText />
          <AffiliateLoginCard />
        </div>
        <Footer />
      </section>
    </main>
    </>
  );
}
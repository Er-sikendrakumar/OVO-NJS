import ContactUs from "../components/CantactUs";
import { Footer } from "../components/Footer";

export default function ContactUsPage() {
  return (
    <>
      <main className="w-full pt-[72px] lg:pt-[104px]">
        <div className="pb-5 md:pb-10">
          <ContactUs />
        </div>
        <Footer />
      </main>
    </>
  );
}

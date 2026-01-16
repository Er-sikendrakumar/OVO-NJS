import { Footer } from "../components/Footer";
import { PopularLocations } from "../components/PopularLocations";

export default async function OurTopVertualOfficeLocationsPage() {
  return (
    <main className="pt-[72px] lg:pt-[104px]">
      <div className="w-full pb-[40px] lg:pb-[80px] pt-[20px] lg:pt-[40px]">
        <PopularLocations
          title="Most Popular Virtual Office Locations"
          description="Our philosophy is simple - hire a team of diverse, passionate people and foster a culture that empowers you to do your best work."
          align="center"
        />
      </div>
      <Footer />
    </main>
  );
}
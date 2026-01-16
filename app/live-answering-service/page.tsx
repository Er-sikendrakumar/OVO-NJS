import { Header } from "../components/answering/Header";
import { Info } from "../components/answering/Info";
import { fetchTestimonials } from "@/app/lib/api/testimonials";
import { Footer } from "../components/Footer";

export default async function Page() {
  const testimonials = await fetchTestimonials(4);

  return (
    <>
      <div>
        <Header />
        <Info testimonials={testimonials} />
      </div>
      <Footer />
    </>
  );
}

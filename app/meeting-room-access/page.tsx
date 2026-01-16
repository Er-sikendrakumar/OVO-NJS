import { Footer } from "@/app/components/Footer";
import { Booking } from "../components/Booking";
import { BookingCTA } from "../components/BookingCTA";
import { MeetingRoomLocations } from "../components/MeetingRoomLocations";
import { MeetingRoom } from "../components/MeetingHero";
import fs from "fs/promises";
import path from "path";
import { cache } from "react";

export const dynamic = "force-dynamic";
type MeetingRoomJson = {
  data?: {
    locations?: Array<{
      city?: string;
      image?: string;
      alt?: string;
      booking_url?: string;
    }>;
    content?: {
      hero_section?: {
        badge?: string;
        main_heading_desktop?: string;
        main_heading_mobile?: string;
        description_desktop?: string;
        description_mobile?: string;
        free_hours_text?: string;
        cta_button_text?: string;
        cta_button_url?: string;
        disclaimer?: string;
      };
      locations_section?: {
        heading?: string;
        subheading?: string;
        select_button_text?: string;
      };
      right_cities_section?: {
        heading?: string;
        description?: string;
        features?: string[];
        cta_button_text?: string;
        cta_button_url?: string;
      };
      book_section?: {
        heading?: string;
        description?: string;
        button_text?: string;
        button_url?: string;
      };
      highlight_text?: string;
      images?: {
        banner1?: string;
        banner2?: string;
        banner3?: string;
        banner4?: string;
        right_city_1?: string;
      };
    };
    seo?: {
      title?: string;
      meta_description?: string;
      canonical?: string;
      og?: {
        title?: string;
        description?: string;
        url?: string;
        type?: string;
        image?: string;
      };
    };
  };
};

const loadMeetingRoomData = cache(async () => {
  const raw = await fs.readFile(
    path.join(process.cwd(), "newsite/json/meeting-room-access.json"),
    "utf-8"
  );
  const parsed = JSON.parse(raw) as MeetingRoomJson;
  const data = parsed?.data ?? {};
  const content = data.content ?? {};
  const heroSection = content.hero_section ?? {};
  const locationsSection = content.locations_section ?? {};
  const rightSection = content.right_cities_section ?? {};
  const bookSection = content.book_section ?? {};
  const images = content.images ?? {};

  return {
    seo: data.seo ?? {},
    hero: {
      did_you_know_badge: heroSection.badge ?? "",
      title: {
        desktop: heroSection.main_heading_desktop ?? "",
        mobile: heroSection.main_heading_mobile ?? "",
      },
      description: {
        desktop: heroSection.description_desktop ?? "",
        mobile: heroSection.description_mobile ?? "",
      },
      subtitle: heroSection.free_hours_text ?? "",
      cta: {
        text: heroSection.cta_button_text ?? "",
        url: heroSection.cta_button_url ?? "",
        disclaimer: heroSection.disclaimer ?? "",
      },
      highlight_text: content.highlight_text ?? "",
      banner_images: [
        images.banner1,
        images.banner2,
        images.banner3,
        images.banner4,
      ].filter(Boolean) as string[],
    },
    locations: {
      title: locationsSection.heading ?? "",
      subtitle: locationsSection.subheading ?? "",
      cities: Array.isArray(data.locations)
        ? data.locations.map((location) => ({
            name: location.city ?? "",
            city: location.city ?? "",
            image: location.image ?? "",
            image_alt: location.alt ?? "",
            href: location.booking_url ?? "",
          }))
        : [],
    },
    rightSection: {
      heading: rightSection.heading ?? "",
      description: rightSection.description ?? "",
      features: rightSection.features ?? [],
      cta: {
        text: rightSection.cta_button_text ?? "",
        url: rightSection.cta_button_url ?? "",
      },
      image: images.right_city_1 ?? "",
    },
    finalCta: {
      title: bookSection.heading ?? "",
      subtitle: bookSection.description ?? "",
      button_text: bookSection.button_text ?? "",
      button_url: bookSection.button_url ?? "",
    },
  };
});

export async function generateMetadata() {
  const { seo } = await loadMeetingRoomData();
  const title = seo?.title ?? "Meeting Room Access";
  const description = seo?.meta_description ?? "Meeting Room Access";
  const canonical = seo?.canonical;
  const og = seo?.og ?? {};

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: og.title ?? title,
      description: og.description ?? description,
      url: og.url ?? canonical,
      type: og.type ?? "website",
      images: og.image ? [og.image] : undefined,
    },
  };
}

export default async function MeetingRoomAccessPage() {
  const { hero, locations, rightSection, finalCta } = await loadMeetingRoomData();

  return (
    <section className="w-full pt-[72px] lg:pt-[104px] flex flex-col items-center">
      <div className="p-2 md:p-[0px]">
        <MeetingRoom hero={hero} />
        <MeetingRoomLocations
          title={locations.title}
          description={locations.subtitle}
          locations={locations.cities}
          align="center"
        />
        <BookingCTA
          title={rightSection.heading}
          description={rightSection.description}
          features={rightSection.features}
          image={rightSection.image}
          cta={rightSection.cta}
        />
        <Booking
          title={finalCta.title}
          subtitle={finalCta.subtitle}
          buttonText={finalCta.button_text}
          buttonUrl={finalCta.button_url}
        />
      </div>

      <Footer />
    </section>
  );
}

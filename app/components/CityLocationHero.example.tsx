/**
 * Example usage of CityLocationHero component
 *
 * This file demonstrates how to use the CityLocationHero component
 * in a Next.js page with sample data.
 *
 * To use this component in your page:
 * 1. Import the component: import CityLocationHero from '@/app/components/CityLocationHero'
 * 2. Pass the required props as shown in the example below
 * 3. Optionally fetch data from WordPress API and map to the component props
 */

import CityLocationHero from "./CityLocationHero";

// Example 1: Orlando, Florida location
export function OrlandoExample() {
  return (
    <CityLocationHero
      city="Orlando"
      state="Florida"
      stateAbbrev="FL"
      address={{
        street: "200 E Robinson Street, Suite 1120",
        city: "Orlando",
        state: "FL",
        zip: "32801",
        phone: "(407) 559-2000",
      }}
      price="$99/mo"
      companyName="Web Design Agency"
      // image="/path/to/orlando-office.jpg" // Optional image URL
    />
  );
}

// Example 2: New York location with image
export function NewYorkExample() {
  return (
    <CityLocationHero
      city="New York"
      state="New York"
      stateAbbrev="NY"
      address={{
        street: "1120 Avenue of the Americas, 4th Floor",
        city: "New York",
        state: "NY",
        zip: "10036",
        phone: "(212) 555-0100",
      }}
      price="$149/mo"
      companyName="Tech Startup Inc"
      image="/public/images/ny-office.jpg"
    />
  );
}

// Example 3: Dynamic usage with API data
// This is how you would use it in a real page with data from WordPress
export async function CityLocationPageExample({ params }: { params: { city: string } }) {
  // In a real implementation, you would fetch this data from WordPress API
  // const locationData = await fetch(`/wp-json/opus/v1/locations/${params.city}`).then(r => r.json())

  // Sample data structure you would receive from the API
  const locationData = {
    city: "Miami",
    state: "Florida",
    stateAbbrev: "FL",
    address: {
      street: "1395 Brickell Avenue, Suite 800",
      city: "Miami",
      state: "FL",
      zip: "33131",
      phone: "(305) 555-0123",
    },
    price: "$99/mo",
    image: "/images/miami-office.jpg",
    companyName: "Marketing Agency",
  };

  return (
    <div>
      <CityLocationHero {...locationData} />

      {/* Add more sections below the hero */}
      {/* e.g., FAQ section, pricing details, testimonials, etc. */}
    </div>
  );
}

// Example 4: Usage in App Router dynamic route
// File: app/locations/[state]/[city]/page.tsx
/*
import CityLocationHero from '@/app/components/CityLocationHero';

export default async function CityPage({
  params
}: {
  params: { state: string; city: string }
}) {
  // Fetch location data from WordPress
  const locationData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/opus/v1/locations/${params.state}/${params.city}`
  ).then(r => r.json());

  return (
    <main>
      <CityLocationHero
        city={locationData.city}
        state={locationData.state}
        stateAbbrev={locationData.stateAbbrev}
        address={locationData.address}
        price={locationData.price}
        image={locationData.featuredImage}
        companyName={locationData.businessName}
      />
    </main>
  );
}
*/

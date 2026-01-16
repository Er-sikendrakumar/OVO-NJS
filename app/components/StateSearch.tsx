'use client';
import React, { useState } from 'react'
import Breadcrumb from './Breadcrumbs';
import CitySelectDropdown from './CitySelectDropdown';
import PopularCities from './ui/PopularCities';
import LocationSection from './LocationSection';
import type { LocationResult, LocationMap } from './LocationResultsWithMap';
import Padding from './ui/Padding';

interface LocationData {
    state: string;
    image: string;
    locations?: LocationResult[];
    map?: LocationMap;
}
const cities = [
    "Atlanta",
    "Savannah",
    "Augusta",
    "Columbus",
    "Macon",
    "Athens",
    "Albany",
    "Sandy Springs",
    "Roswell",
];
function StateSearch({ data }: { data: LocationData }) {
    const { image, state, locations = [], map } = data;
    const [city, setCity] = useState("");
    console.log("data:", data);

    return (
        <section className="flex flex-col items-center justify-center w-full bg-basewhite px-4 sm:px-6 lg:px-8 max-w-[767px] sm:max-w-[767px] md:max-w-[1023px] lg:max-w-[1280px] mx-auto">
            <Padding mobile="20px" desktop="40px" />
            <LocationSection
                state={state}
                city={city}
                cities={cities}
                dropdownOptions={["Atlanta", "Savannah", "Augusta", "Columbus"]}
                onCityChange={setCity}
                locations={locations}
                map={map}
            />


        </section>
    )
}

export default StateSearch;

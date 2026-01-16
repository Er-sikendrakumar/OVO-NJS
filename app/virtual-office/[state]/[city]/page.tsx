import React from 'react'
import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RepeaterItem } from '@/app/locations/components/repeater';
import CityPageClient from './CityPageClient';
import { log404 } from '@/app/lib/log404';

interface LocationData {
    id: string;
    name: string;
    locname: string;
    address: string;
    city: string;
    state: string;
    state_english: string;
    abbr: string;
    phone: string;
    premium: string;
    opusowned: string;
    showpopular: string;
    point_x: string;
    point_y: string;
    url: string;
    image: {
        url: string;
        alttext: string | null;
    };
}

interface CityAllResponse {
    success: boolean;
    state: string;
    city: string;
    wp_city_post_id: string | null;
    locations: LocationData[];
    popular_locations: LocationData[];
    premium_locations: LocationData[];
    regular_locations: LocationData[];
    sections?: RepeaterItem[];
    faqs?: Array<{ question: string; answer: string }>;
    meta: {
        locations_count: number;
        popular_locations_count: number;
        premium_locations_count: number;
        regular_locations_count: number;
        state_cities_count: number;
        sections_count: number;
        faqs_count: number;
    };
    seo: {
        title: string;
        meta_description: string;
        canonical: string;
        og: {
            title: string;
            description: string;
            url: string;
            type: string;
            image: string;
        };
    };
}

interface StateCitiesResponse {
    success: boolean;
    count: number;
    state: string;
    data: Array<{
        id: string;
        name: string;
        popular: string;
    }>;
}

function formatStateName(stateSlug: string): string {
    return stateSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatCityName(citySlug: string): string {
    return citySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ state: string; city: string }> }): Promise<Metadata> {
    const { state: stateSlug, city: citySlug } = await params;
    const jsonPath = path.join(process.cwd(), 'newsite', 'json', 'states', stateSlug, citySlug, `${citySlug}_all_vo.json`);

    try {
        const fileContents = await fs.readFile(jsonPath, 'utf8');
        const data = JSON.parse(fileContents) as CityAllResponse;

        if (data.success && data.seo) {
            return {
                title: data.seo.title,
                description: data.seo.meta_description,
                alternates: {
                    canonical: data.seo.canonical,
                },
                openGraph: {
                    title: data.seo.og.title,
                    description: data.seo.og.description,
                    url: data.seo.og.url,
                    type: data.seo.og.type as 'website',
                    images: data.seo.og.image ? [data.seo.og.image] : undefined,
                },
            };
        }
    } catch (error: any) {
        // Only log errors that aren't "file not found" (expected for some cities)
        if (error?.code !== 'ENOENT') {
            console.error(`Error reading SEO data for ${stateSlug}/${citySlug}:`, error);
        }
    }

    // Fallback metadata
    const cityName = formatCityName(citySlug);
    const stateName = formatStateName(stateSlug);
    return {
        title: `Virtual Office in ${cityName}, ${stateName} | Locations Available`,
        description: `Find the ultimate office solution with Opus Virtual Offices in ${cityName}, ${stateName}.`,
    };
}

async function CityPage({ params }: { params: Promise<{ state: string; city: string }> }) {
    const { state: stateSlug, city: citySlug } = await params;

    // Read from city-specific JSON file
    const cityJsonPath = path.join(process.cwd(), 'newsite', 'json', 'states', stateSlug, citySlug, `${citySlug}_all_vo.json`);
    const citiesJsonPath = path.join(process.cwd(), 'newsite', 'json', 'states', stateSlug, `${stateSlug}_citiesvirtual.json`);

    let cityData: CityAllResponse | null = null;
    let cities: Array<{ name: string; url: string }> = [];
    let stateName = formatStateName(stateSlug);
    let cityName = formatCityName(citySlug);

    // Read city data
    try {
        const fileContents = await fs.readFile(cityJsonPath, 'utf8');
        cityData = JSON.parse(fileContents) as CityAllResponse;

        if (cityData.success && cityData.locations && cityData.locations.length > 0) {
            // Get city name and state from the first location
            cityName = cityData.locations[0]?.name || cityName;
            stateName = cityData.locations[0]?.state_english || stateName;
        }
    } catch (error) {
        console.error(`Error reading city data for ${stateSlug}/${citySlug}:`, error);

        // Log 404 and return not found
        await log404({
            path: `/virtual-office/${stateSlug}/${citySlug}`,
            type: 'city',
            params: { state: stateSlug, city: citySlug },
            error: error instanceof Error ? error.message : String(error),
        });

        notFound();
    }

    // Read cities list for dropdown
    try {
        const citiesFileContents = await fs.readFile(citiesJsonPath, 'utf8');
        const citiesData = JSON.parse(citiesFileContents) as StateCitiesResponse;

        // Convert cities data to the format needed
        if (citiesData.success && citiesData.data) {
            cities = citiesData.data.map(city => ({
                name: city.name,
                url: `/virtual-office/${stateSlug}/${city.name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')}`
            }));
        }
    } catch (error) {
        console.error(`Error reading cities data for ${stateSlug}:`, error);
    }


    // Normalize city data to match state data structure
    const normalizedLocations = cityData?.locations.map(loc => ({
        id: parseInt(loc.id),
        location_name: loc.locname,
        city: loc.name,
        state: loc.state_english,
        state_abbr: loc.abbr,
        address: loc.address,
        premium: parseInt(loc.premium),
        showpopular: parseInt(loc.showpopular),
        opusowned: parseInt(loc.opusowned),
        point_x: parseFloat(loc.point_x),
        point_y: parseFloat(loc.point_y),
        image: typeof loc.image === 'string'
            ? { url: loc.image, alttext: null }
            : loc.image,
        url: loc.url,
        phone: loc.phone
    })) || [];

    return (
        <>
            {cityData && normalizedLocations.length > 0 ? (
                <CityPageClient
                    state={stateName}
                    stateSlug={stateSlug}
                    city={cityName}
                    citySlug={citySlug}
                    cities={cities}
                    locations={normalizedLocations}
                    repeaterItems={cityData.sections || []}
                    faqs={cityData.faqs || []}
                />
            ) : null}
        </>
    )
}

export default CityPage;
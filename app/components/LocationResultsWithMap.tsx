"use client";

import Image from "next/image";
import { type ReactNode, useCallback, useMemo, useState } from "react";
import ImageCard from './ImageCard';
import { FeaturesBoxLocations } from './FeaturesBoxLocations';

export type LocationResult = {
	id?: string;
	city: string;
	name?: string;
	address?: string;
	abbr?: string;
	showpopular?: string;
	point_x?: string;
	point_y?: string;
	image?: string;
	link?: string;
};

export type LocationMap = {
	lat?: number;
	lng?: number;
	zoom?: number;
};

export interface LocationResultsWithMapProps {
	state: string;
	locations?: LocationResult[];
	map?: LocationMap;
}

const INCLUDED_FEATURES = [
	'Prestigious Business Address',
	'Professional Live Call Answering',
	'Personalized Call Transferring',
	'Business Phone/Fax Number',
	'Professional Mail Receipt',
	'Voicemail/Fax Converted to Email',
];

const toNumber = (value?: string | number) => {
	if (typeof value === 'number') return value;
	if (!value) return undefined;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeImageSrc = (src?: string) => {
	if (!src) return '/locations/default.webp';
	if (src.startsWith('http')) return src;
	return src.startsWith('/') ? src : `/${src}`;
};

const SectionHeading = ({ children }: { children: ReactNode }) => (
	<span className="text-[20px] font-semibold text-[#101828] leading-[30px] capitalize">
		{children}
	</span>
);

export default function LocationResultsWithMap({
	state,
	locations = [],
	map,
}: LocationResultsWithMapProps) {
	const popularLocations = useMemo(
		() => locations.filter((location) => location.showpopular === '1'),
		[locations],
	);
	const additionalLocations = useMemo(
		() => locations.filter((location) => location.showpopular !== '1'),
		[locations],
	);

	const firstLocationWithCoords = useMemo(
		() =>
			popularLocations.find(
				(location) => location.point_x && location.point_y,
			) ?? additionalLocations.find((location) => location.point_x && location.point_y),
		[popularLocations, additionalLocations],
	);

	const defaultLocation = useMemo(
		() => popularLocations[0] ?? additionalLocations[0],
		[popularLocations, additionalLocations],
	);

	const locationCoordinates = useMemo(
		() =>
			locations
				.map((location) => {
					const latitude = toNumber(location.point_x);
					const longitude = toNumber(location.point_y);
					if (latitude === undefined || longitude === undefined) return undefined;
					return { lat: latitude, lng: longitude };
				})
				.filter((coords): coords is { lat: number; lng: number } => Boolean(coords)),
		[locations],
	);

	const [activeLocation, setActiveLocation] = useState<LocationResult | undefined>(
		undefined,
	);

	const handleLocationHover = useCallback(
		(location: LocationResult) => () => setActiveLocation(location),
		[],
	);

	const handleMouseLeave = useCallback(() => {
		setActiveLocation(undefined);
	}, []);

	const lat =
		map?.lat ??
		toNumber(activeLocation?.point_x) ??
		toNumber(firstLocationWithCoords?.point_x) ??
		toNumber(defaultLocation?.point_x);
	const lng =
		map?.lng ??
		toNumber(activeLocation?.point_y) ??
		toNumber(firstLocationWithCoords?.point_y) ??
		toNumber(defaultLocation?.point_y);
	const mapZoom = map?.zoom ?? 12;
	const markerQueries = locationCoordinates.map(
		({ lat: markerLat, lng: markerLng }) => `loc:${markerLat},${markerLng}`,
	);
	const fallbackSearch =
		lat !== undefined && lng !== undefined
			? `${lat},${lng}`
			: `${state} virtual office locations`;
	const mapQueryParams = markerQueries.length
		? markerQueries
			.map((marker) => `q=${encodeURIComponent(marker)}`)
			.join('&')
		: `q=${encodeURIComponent(fallbackSearch)}`;
	const mapSrc = `https://www.google.com/maps?${mapQueryParams}&z=${mapZoom}&output=embed`;

	const mapOverlayLocation = activeLocation;

	return (
		<>
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-[1280px] px-4 md:px-8">
			{/* Locations Column */}
			<div
				className="flex flex-col w-full md:max-h-[924px] gap-6 overflow-y-auto no-scrollbar location-scroll-container"
				style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
				onMouseLeave={handleMouseLeave}
			>
				<div className="w-full flex gap-6 flex-col">
					{popularLocations.length > 0 && (
						<>
							<SectionHeading>
								Most Popular Virtual Office Location in {state}
							</SectionHeading>
							{popularLocations.map((location) => (
								<div
									key={location.id ?? `${location.city}-${location.address}`}
									onMouseEnter={handleLocationHover(location)}
									className="w-full"
								>
									<ImageCard
										imageSrc={normalizeImageSrc(location.image)}
										imageAlt={`Virtual office in ${location.city}, ${state}`}
										cityName={`${location.city}${location.abbr ? `, ${location.abbr}` : ''}`}
										address={location.name ?? location.address ?? ''}
										subAddress={location.address}
										isHighlight
									/>
								</div>
							))}
						</>
					)}

					{additionalLocations.length > 0 && (
						<>
							<SectionHeading>
								Additional Virtual Office Locations in {state}
							</SectionHeading>
							{additionalLocations.map((location) => (
								<div
									key={location.id ?? `${location.city}-${location.address}`}
									onMouseEnter={handleLocationHover(location)}
									className="w-full"
								>
									<ImageCard
										imageSrc={normalizeImageSrc(location.image)}
										imageAlt={`Virtual office in ${location.city}, ${state}`}
										cityName={`${location.city}${location.abbr ? `, ${location.abbr}` : ''}`}
										address={location.name ?? location.address ?? ''}
										subAddress={location.address}
									/>
								</div>
							))}
						</>
					)}
				</div>
			</div>

			{/* Map Column */}
			<div className="flex flex-col gap-8 w-full h-full">
				<div className="relative hidden md:block">
					<iframe
						src={mapSrc}
						width="100%"
						height="600"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title={`Map of ${state}`}
						className="w-full min-h-[214px] h-[600px]"
					/>

					{mapOverlayLocation && (
						<div className="absolute top-6 left-6 bg-white rounded-[16px] shadow-xl border border-[#EAECF0] max-w-[260px] overflow-hidden">
							<div className="relative w-full h-[150px]">
								<Image
									src={normalizeImageSrc(mapOverlayLocation.image)}
									alt={`Virtual office in ${mapOverlayLocation.city}`}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col gap-2 p-4">
								<div className="flex flex-col gap-1">
									<span className="text-[16px] font-semibold text-[#101828] leading-[24px]">
										{mapOverlayLocation.city}
									</span>
									<p className="text-[13px] text-[#475467] leading-[18px]">
										{mapOverlayLocation.name ?? mapOverlayLocation.address}
									</p>
								</div>
								<div className="bg-[#ECFDF3] border flex gap-2 items-center border-[#ABEFC6] py-1 pr-2 pl-1 text-[10px] rounded-full w-fit">
									<span className="border border-[#ABEFC6] px-2 py-[2px] rounded-full bg-white text-[#067647] leading-[18px] capitalize">
										Premium
									</span>
									<span className="text-[#067647] capitalize">location</span>
								</div>
							</div>
						</div>
					)}
				</div>

				<FeaturesBoxLocations features={INCLUDED_FEATURES} />
			</div>
		</div>
		<style jsx>{`
			.location-scroll-container::-webkit-scrollbar {
				display: none;
			}
		`}</style>
		</>
	);
}
import Breadcrumb from "./Breadcrumbs";
import CitySelectDropdown from "./CitySelectDropdown";
import LocationResultsWithMap, {
    LocationMap,
    LocationResult,
} from "./LocationResultsWithMap";
import { RepeaterItem, RepeaterSection } from "./RepeaterSection";
import Padding from "./ui/Padding";
import PopularCities from "./ui/PopularCities";
import { EbookBanner } from "./EbookBanner";

interface LocationSectionProps {
    state: string;
    city: string;
    cities: string[];
    dropdownOptions: string[];
    onCityChange: (value: string) => void;
    locations?: LocationResult[];
    map?: LocationMap;
    repeaterData?: RepeaterItem[];
    overviewData?: any;
    headerData?: any;
}

export default function LocationSection({
    state,
    city,
    cities,
    dropdownOptions,
    onCityChange,
    locations = [],
    map,
    repeaterData = [],
    overviewData = {},
    headerData = {},
}: LocationSectionProps) {

    const locId = headerData?.signupUrl?.match(/locid=(\d+)/)?.[1] || '776';

    return (
        <section className="flex w-full flex-col items-center">
            {/* Breadcrumb */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <Breadcrumb stateLabel={state} cityLabel={city} />
            </div>
            <Padding mobile="24px" desktop="24px" />
            {/* Heading */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <h1 className="
                font-inter text-[#101828] font-semibold
                text-[24px] leading-[32px] tracking-[-0.48px]
                lg:text-[36px] lg:leading-[44px] lg:tracking-[-0.72px]
                ">
                    Virtual office Locations in{" "}
                    <span className="font-semibold text-[#101828] capitalize">{state}</span>
                </h1>
            </div>
            <Padding mobile="24px" desktop="24px" />
            {/* Dropdown */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <CitySelectDropdown
                    options={dropdownOptions}
                    value={city}
                    onChange={onCityChange}
                />
            </div>
            <Padding mobile="24px" desktop="27px" />
            {/* Cities Section */}
            <div className="w-full max-w-screen-xl flex flex-col gap-4">
                <PopularCities state={state} cities={cities} />
            </div>

            {locations.length > 0 && (
                <>
                    <Padding mobile="32px" desktop="27px" />
                    <LocationResultsWithMap
                        state={state}
                        locations={locations}
                        map={map}
                    />
                </>
            )}

            <Padding mobile="24px" desktop="30px" />

            <RepeaterSection
                items={repeaterData}
                overviewData={overviewData}
                cityName={city}
                locId={locId}
                price={headerData?.price}
            />
            <EbookBanner />
            
        </section>
    );
}

import StateSearch from "@/app/components/StateSearch";
import fs from "fs";
import path from "path";

export default function StateSearchPage({ params }: { params: { state: string } }) {
  // Read JSON at runtime instead of bundling at build time
  const StateData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "api-responses/location-page/state-search-result.json"), "utf-8")
  );
  const CitySearchData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "api-responses/location-page/city-search-result.json"), "utf-8")
  );

  // Extract the first location from your JSON
  const stateLocation = StateData.result.locations[0];
  const cityLocations = CitySearchData.result.locations;
  const firstCity = cityLocations[0];
  const map =
    firstCity && firstCity.point_x && firstCity.point_y
      ? {
        lat: Number(firstCity.point_x),
        lng: Number(firstCity.point_y),
      }
      : undefined;
  const location = {
    ...stateLocation,
    locations: cityLocations,
    map,
  };

  return <StateSearch data={location} />;
}

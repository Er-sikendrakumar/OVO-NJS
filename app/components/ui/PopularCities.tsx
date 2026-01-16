interface PopularCitiesProps {
  state: string;
  cities: string[];
}

export default function PopularCities({ state, cities }: PopularCitiesProps) {
  return (
    <div className="flex flex-col gap-[24px] py-[20px] lg:py-[32px]">
      {/* Heading */}
      <h2 className="font-inter text-[#101828] text-[20px] font-semibold leading-[24px]">
        Popular Cities in {state}
      </h2>

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {cities.map((city, idx) => (
          <span
            key={idx}
            className="
        flex items-center
        px-[12px] py-[4px]
        rounded-[16px]
        border-[1.5px] border-[#475467]
        text-[#344054]
        text-[14px]
        font-medium
        leading-[20px]
      "
          >
            {city}
          </span>
        ))}
      </div>

    </div>
  );
}

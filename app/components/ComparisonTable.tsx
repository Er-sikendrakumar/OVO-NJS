type ComparisonRow = {
  address: string;
  opus: string;
  alliance: string;
  davinci: string;
  regus: string;
};

type ComparisonColumn = {
  key: keyof Omit<ComparisonRow, "address">;
  label: string;
  logo: string;
  logoClassName: string;
};

const columns: ComparisonColumn[] = [
  {
    key: "opus",
    label: "Opus",
    logo: "/opus.svg",
    logoClassName: "w-[143px] h-[35px]",
  },
  {
    key: "alliance",
    label: "Alliance",
    logo: "/alliance.svg",
    logoClassName: "w-[117px]",
  },
  {
    key: "davinci",
    label: "Davinci",
    logo: "/davic.svg",
    logoClassName: "w-[95px]",
  },
  {
    key: "regus",
    label: "Regus",
    logo: "/regus.svg",
    logoClassName: "w-[107px] h-[55px]",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    address: "NYC-Heart of the Financial District (zip 10004)",
    opus: "$99 / Month",
    alliance: "$174 / Month",
    davinci: "$179 / Month",
    regus: "$312 / Month",
  },
  {
    address: "Chicago-Michigan Ave area (zip 60603)",
    opus: "$99 / Month",
    alliance: "$194 / Month",
    davinci: "$198 / Month",
    regus: "$234 / Month",
  },
  {
    address: "Miami-Brickell (zip 33131)",
    opus: "$99 / Month",
    alliance: "$224 / Month",
    davinci: "$214 / Month",
    regus: "$330 / Month",
  },
  {
    address: "LA-Downtown LA (zip 90017)",
    opus: "$99 / Month",
    alliance: "$175 / Month",
    davinci: "$179 / Month",
    regus: "$256 / Month",
  },
  {
    address: "Dallas-Oak Lawn area (zip 75219)",
    opus: "$99 / Month",
    alliance: "$190 / Month",
    davinci: "$194 / Month",
    regus: "$267 / Month",
  },
  {
    address: "Wilmington, DE (zip 19801)",
    opus: "$99 / Month",
    alliance: "$224 / Month",
    davinci: "$228 / Month",
    regus: "$289 / Month",
  },
];

export function ComparisonTable() {
  return (
    <div className="bg-white">
      {/* Desktop table */}
      <div className="hidden overflow-hidden md:block md:pb-[19px]">
        <div
          className="flex overflow-y-auto"
          role="table"
          aria-label="Compare virtual office pricing"
        >
          <div
            className="flex w-[451px] flex-col flex-shrink-0"
            role="rowgroup"
          >
            <div className="flex h-[72px] items-center gap-2 border-b border-[#EAECF0] bg-[#F9FAFB] px-6 py-3">
              <span className="text-[20px] font-bold leading-[30px] text-[#475467]">
                Address
              </span>
            </div>

            {comparisonRows.map((row) => (
              <div
                key={row.address}
                role="row"
                className="flex h-[72px] items-center border-b border-gray-200 px-6 py-4 hover:bg-[#F9FAFB]"
              >
                <span className="text-[14px] leading-5 text-[#101828]">
                  {row.address}
                </span>
              </div>
            ))}
          </div>

          {columns.map((col) => (
            <div
              className="flex w-[170px] flex-shrink-0 flex-col"
              key={col.key}
              role="rowgroup"
            >
              <div className="flex h-[72px] items-center justify-center border-b border-gray-200 px-6 py-4">
                <img
                  src={col.logo}
                  alt={col.label}
                  className={`${col.logoClassName} object-contain`}
                />
              </div>

              {comparisonRows.map((row) => (
                <div
                  key={row.address}
                  role="row"
                  className="flex h-[72px] items-center justify-center border-b border-gray-200 px-6 py-4 hover:bg-[#F9FAFB]"
                >
                  <span className="text-[14px] font-normal leading-5 text-[#475467]">
                    {row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile stacked cards */}
      <div className="flex flex-col gap-[64px] md:gap-6 md:hidden py-2">
        {comparisonRows.map((row) => (
          <div key={row.address} className="overflow-hidden bg-white">
            <div className="flex items-center justify-between bg-[#F9FAFB]   md:px-4 md:py-3 border-b border-[#EAECF0] ">
              <span className="text-[14px] font-semibold leading-5 text-[#101828] max-w-full  w-[67%] px-6 py-4">
                {row.address}
              </span>
              <span className="text-[14px] leading-[20px] font-bold text-[#475467] max-w-full  w-[33%] px-6 py-4 whitespace-nowrap text-left flex justify-center">
                Price Per Month
              </span>
            </div>

            <div className="flex flex-col divide-y divide-[#EAECF0] border-b border-[#EAECF0]">
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="flex items-center justify-between h-[72px] overflow-hidden"
                >
                  <div className="flex items-center gap-3 max-w-full h-[72px]   w-[67%] px-6 py-4">
                    <img
                      src={col.logo}
                      alt={col.label}
                      className={`${col.logoClassName} object-contain w-[107px] h-[40px]`}
                    />
                  </div>
                  <span className="text-[14px] font-normal leading-5 text-[#475467] max-w-full  w-[33%] px-6 py-4 whitespace-nowrap text-left flex justify-center">
                    {row[col.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

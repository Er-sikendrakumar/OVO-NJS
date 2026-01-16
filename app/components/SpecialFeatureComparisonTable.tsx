type FeatureValue = string | boolean;

type ProviderFeatures = {
  unlimited_live_call_answer: FeatureValue;
  corporate_mailing_address: FeatureValue;
  local_business_number: FeatureValue;
  unlimited_call_transfer: FeatureValue;
  callout_services: FeatureValue;
  unlimited_toll_free_calls: FeatureValue;
  unlimited_texting: FeatureValue;
  contract_length: FeatureValue;
  setup_fee: FeatureValue;
  monthly_cost: FeatureValue;
  monthly_cost_subtitle?: string;
};

export type ComparisonProvider = {
  name: string;
  logo: string;
  is_featured?: boolean;
  features_data: ProviderFeatures;
};

export type ComparisonData = {
  features: string[];
  providers: ComparisonProvider[];
};

type ComparisonTableProps = {
  comparison: ComparisonData;
  footnote?: string;
};

type FeatureKey = Exclude<keyof ProviderFeatures, "monthly_cost_subtitle">;
const IMAGE_URL = "https://www.opusvirtualoffices.com";
const resolveLogoSrc = (logo: string) => {
  if (logo.startsWith("http://") || logo.startsWith("https://")) {
    return logo;
  }
  if (logo.startsWith("/newsite/") || logo.startsWith("/wp-content/")) {
    return `${IMAGE_URL}${logo}`;
  }
  if (logo.startsWith("/")) {
    return logo;
  }
  return `${IMAGE_URL}/${logo}`;
};

const providerLogoSizes: Record<string, string> = {
  "Opus Virtual Offices": "w-[82px] h-[20px] md:w-[175px] md:h-[35px]",
  "Alliance Virtual Offices": "w-[117px] h-[35px] md:w-[158px] md:h-[47px]",
  "Davinci Virtual": "w-[125px] h-[53px]",
  Regus: "w-[80px] h-[41px]",
};

const getProviderLogoClassName = (name: string) =>
  providerLogoSizes[name] || "w-[143px] h-[55px]";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 28 28"
    fill="none"
    aria-hidden
  >
    <path
      d="M8.75 14L12.25 17.5L19.25 10.5M25.6666 14C25.6666 20.4433 20.4433 25.6666 14 25.6666C7.55666 25.6666 2.33331 20.4433 2.33331 14C2.33331 7.55666 7.55666 2.33331 14 2.33331C20.4433 2.33331 25.6666 7.55666 25.6666 14Z"
      stroke="#079455"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 28 28"
    fill="none"
    aria-hidden
  >
    <path
      d="M17.5 10.5L10.5 17.5M10.5 10.5L17.5 17.5M25.6666 14C25.6666 20.4433 20.4433 25.6666 14 25.6666C7.55666 25.6666 2.33331 20.4433 2.33331 14C2.33331 7.55666 7.55666 2.33331 14 2.33331C20.4433 2.33331 25.6666 7.55666 25.6666 14Z"
      stroke="#FF1E27"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const renderFeatureValue = (
  value: FeatureValue | undefined,
  options?: { highlight?: boolean }
) => {
  if (typeof value === "boolean") {
    return value ? <CheckIcon /> : <CloseIcon />;
  }

  if (value === undefined || value === null) {
    return "\u2014";
  }

  const isDollarValue = typeof value === "string" && value.includes("$");

  return (
    <span
      className={
        options?.highlight
          ? "text-[#079455] text-[12px] leading-[18px] font-medium md:font-medium "
          : isDollarValue
          ? "text-[12px] leading-[18px] font-medium text-[#475467] text-center"
          : "text-[12px] leading-[18px] font-medium text-[#475467] text-center"
      }
    >
      {value}
    </span>
  );
};

export function BestValuePill() {
  return (
    <div className="p-2 md:p-4 flex max-w-[110px] md:max-w-[280px] justify-center bg-[#ECFDF3]">
      <div className="inline-flex h-[30px] items-center gap-[8px] rounded-[16px] border border-[#ABEFC6] bg-[#ECFDF3] px-[10px] py-[4px] pl-[4px]">
        <span className="inline-flex items-center rounded-[16px] border border-[#ABEFC6] bg-[#079455] px-[8px] py-[2px] text-[12px] font-medium leading-[18px] text-white">
          Best
        </span>
        <span className="text-[12px] font-medium leading-[18px] text-[#067647]">
          Value
        </span>
      </div>
    </div>
  );
}

const staticComparison: ComparisonData = {
  features: [
    "Unlimited Live Call Answer",
    "Corporate Mailing Address",
    "Callout Services*",
    "Unlimited Toll Free Calls*",
    "Unlimited Texting*",
    "Short Term Contract",
    "Setup Fee",
    "Cost Per Mo.",
  ],
  providers: [
    {
      name: "Opus Virtual Offices",
      logo: "/opusLogo.svg",
      is_featured: true,
      features_data: {
        unlimited_live_call_answer: true,
        corporate_mailing_address: true,
        local_business_number: true,
        unlimited_call_transfer: true,
        callout_services: true,
        unlimited_toll_free_calls: true,
        unlimited_texting: true,
        contract_length: "3 Months",
        setup_fee: "$100",
        monthly_cost: "$99 / Month",
        monthly_cost_subtitle: "All Locations",
      },
    },
    {
      name: "Davinci Virtual",
      logo: "/davinci.svg",
      features_data: {
        unlimited_live_call_answer: "50 Min. Included",
        corporate_mailing_address: true,
        local_business_number: true,
        unlimited_call_transfer: true,
        callout_services: false,
        unlimited_toll_free_calls: "50 Min. Included",
        unlimited_texting: false,
        contract_length: "6 Months",
        setup_fee: "$199",
        monthly_cost: "$179 - $228",
        monthly_cost_subtitle: "per month",
      },
    },
    {
      name: "Alliance Virtual Offices",
      logo: "/alliance.svg",
      features_data: {
        unlimited_live_call_answer: "50 Min. Included",
        corporate_mailing_address: true,
        local_business_number: true,
        unlimited_call_transfer: true,
        callout_services: false,
        unlimited_toll_free_calls: "50 Min. Included",
        unlimited_texting: false,
        contract_length: "6 Months",
        setup_fee: "$200",
        monthly_cost: "$174 - $224",
        monthly_cost_subtitle: "per month",
      },
    },

    {
      name: "Regus",
      logo: "/newsite/wp-content/uploads/2024/reg.png",
      features_data: {
        unlimited_live_call_answer: true,
        corporate_mailing_address: true,
        local_business_number: true,
        unlimited_call_transfer: true,
        callout_services: false,
        unlimited_toll_free_calls: false,
        unlimited_texting: false,
        contract_length: "6 Months",
        setup_fee: "$99",
        monthly_cost: "$234 - $330",
        monthly_cost_subtitle: "per month",
      },
    },
  ],
};

export function ComparisonTableSpecial({ comparison }: ComparisonTableProps) {
  const comparisonData = staticComparison;
  const featureRows: Array<{ key: FeatureKey; label: string }> = [
    { key: "unlimited_live_call_answer", label: "Unlimited Live Call Answer" },
    { key: "corporate_mailing_address", label: "Corporate Mailing Address" },
    { key: "callout_services", label: "Callout Services*" },
    { key: "unlimited_toll_free_calls", label: "Unlimited Toll Free Calls*" },
    { key: "unlimited_texting", label: "Unlimited Texting*" },
    { key: "contract_length", label: "Short Term Contract" },
    { key: "setup_fee", label: "Setup Fee" },
    { key: "monthly_cost", label: "Cost Per Mo." },
  ];

  return (
    <div
      className="flex overflow-hidden"
      role="table"
      aria-label="Compare virtual office features"
    >
      {/* FIXED: Features + First Provider */}
      <div className="flex flex-shrink-0 pb-[18px] md:pb-[32px]">
        {/* Features column */}
        <div
          className="flex md:w-[336px] w-[110px] flex-col flex-shrink-0"
          role="rowgroup"
        >
          <div className="flex h-[72px] items-center gap-2 border-b border-[#EAECF0] bg-[#F9FAFB] px-2 md:px-2 py-3 md:py-3">
            <span className="text-[16px] md:text-[20px] md:leading-[30px] font-semibold md:font-semibold text-[#475467]">
              Features
            </span>
          </div>

          {featureRows.map((row) => (
            <div
              key={row.key}
              role="row"
              className="flex h-[72px] items-center border-b border-gray-200 px-2 py-4 md:px-2 md:py-4"
            >
              <span className="text-[12px] leading-[18px] font-medium md:font-normal md:text-[20px] md:leading-[30px] text-[#101828] text-left">
                {row.label}
              </span>
            </div>
          ))}
        </div>

        {/* First provider (fixed) */}
        {comparisonData.providers.slice(0, 1).map((provider) => (
          <div
            key={provider.name}
            className="flex w-[110px] md:w-[220px] flex-col flex-shrink-0"
            role="rowgroup"
          >
            <div className="flex h-[72px] items-center justify-center border-b bg-[#F9FAFB] p-4">
              <img
                src={resolveLogoSrc(provider.logo)}
                alt={provider.name}
                className={`${getProviderLogoClassName(
                  provider.name
                )} object-contain`}
              />
            </div>

            {featureRows.map((row, index) => {
              const value = provider.features_data[row.key];
              const subtitle =
                row.key === "monthly_cost"
                  ? provider.features_data.monthly_cost_subtitle
                  : undefined;
              const highlightPrice =
                provider.is_featured && row.key === "monthly_cost";

              return (
                <div
                  key={row.key}
                  role="row"
                  className={`flex h-[72px] flex-col items-center justify-center border-b border-gray-200 px-4 md:px-4 py-4 ${
                    provider.is_featured ? "bg-[#ECFDF3]" : ""
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {renderFeatureValue(value, { highlight: highlightPrice })}
                    {subtitle && (
                      <span className="text-[12px] leading-[18px] text-[#079455] font-medium">
                        {subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {comparisonData?.providers[0]?.is_featured && <BestValuePill />}
          </div>
        ))}
      </div>

      {/* SCROLLABLE: Remaining Providers */}
      <div className="flex overflow-x-auto overflow-y-hidden scrollbar-hide">
        {comparisonData?.providers?.slice(1).map((provider) => (
          <div
            key={provider.name}
            className="flex w-[110px] md:w-[220px] flex-col flex-shrink-0"
            role="rowgroup"
          >
            <div className="flex h-[72px] items-center justify-center border-b bg-[#F9FAFB] p-4">
              <img
                src={resolveLogoSrc(provider.logo)}
                alt={provider.name}
                className={`${getProviderLogoClassName(
                  provider.name
                )} object-contain`}
              />
            </div>

            {featureRows.map((row) => {
              const value = provider.features_data[row.key];
              const subtitle =
                row.key === "monthly_cost"
                  ? provider.features_data.monthly_cost_subtitle
                  : undefined;

              return (
                <div
                  key={row.key}
                  role="row"
                  className="flex h-[72px] flex-col items-center justify-center border-b p-4"
                >
                  {renderFeatureValue(value)}
                  {subtitle && (
                    <span className="text-[12px] leading-[18px] text-[#475467] font-medium">
                      {subtitle}
                    </span>
                  )}
                </div>
              );
            })}
            {provider.is_featured && <BestValuePill />}
          </div>
        ))}
      </div>
    </div>
  );
}

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

const featureKeys: FeatureKey[] = [
  "unlimited_live_call_answer",
  "corporate_mailing_address",
  "local_business_number",
  "unlimited_call_transfer",
  "callout_services",
  "unlimited_toll_free_calls",
  "unlimited_texting",
  "contract_length",
  "setup_fee",
  "monthly_cost",
];

const defaultFeatureLabels: Record<FeatureKey, string> = {
  unlimited_live_call_answer: "Unlimited Live Call Answer",
  corporate_mailing_address: "Corporate Mailing Address",
  local_business_number: "Local Business Number",
  unlimited_call_transfer: "Unlimited Call Transfer",
  callout_services: "Callout Services*",
  unlimited_toll_free_calls: "Unlimited Toll-Free Calls*",
  unlimited_texting: "Unlimited Texting*",
  contract_length: "Short Term Contract",
  setup_fee: "Setup Fee",
  monthly_cost: "Cost Per Mo.",
};

const providerLogoSizes: Record<string, string> = {
  "Opus Virtual Offices": "w-[143px] h-[35px]",
  "Alliance Virtual Offices": "w-[117px] h-[35px] md:h-[40px]",
  "Davinci Virtual": "w-[95px] h-[40px]",
  Regus: "w-[107px] h-[55px]",
};

const getProviderLogoClassName = (name: string) =>
  providerLogoSizes[name] || "w-[143px] h-[55px]";

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M8.75 14L12.25 17.5L19.25 10.5M25.67 14C25.67 20.44 20.44 25.67 14 25.67C7.56 25.67 2.33 20.44 2.33 14C2.33 7.56 7.56 2.33 14 2.33C20.44 2.33 25.67 7.56 25.67 14Z"
      stroke="#079455"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path
      d="M17.5 10.5L10.5 17.5M10.5 10.5L17.5 17.5M25.67 14C25.67 20.44 20.44 25.67 14 25.67C7.56 25.67 2.33 20.44 2.33 14C2.33 7.56 7.56 2.33 14 2.33C20.44 2.33 25.67 7.56 25.67 14Z"
      stroke="#FF1E27"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const renderFeatureValue = (
  value: FeatureValue | undefined,
  options?: { highlight?: boolean }
) => {
  if (typeof value === "boolean") return value ? <CheckIcon /> : <CloseIcon />;
  if (value == null) return "—";

  const isDollar = value.includes("$");

  return (
    <span
      className={
        options?.highlight
          ? "text-[#079455] font-bold text-[18px] leading-[28px]"
          : isDollar
          ? "text-[18px] leading-[28px] text-[#475467]"
          : "text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#475467]"
      }
    >
      {value}
    </span>
  );
};

export function ComparisonTable({ comparison }: ComparisonTableProps) {
  const featureRows = featureKeys.map((key, index) => ({
    key,
    label: comparison.features[index] ?? defaultFeatureLabels[key],
  }));

  return (
    <div className="bg-white">
      {/* Desktop */}
      <div className="hidden md:block overflow-hidden">
        <div className="flex overflow-y-auto">
          <div className="w-[336px] flex-shrink-0">
            <div className="h-[72px] flex items-center bg-[#F9FAFB] border-b px-6 font-bold text-[#475467]">
              Features
            </div>

            {featureRows.map((row) => (
              <div key={row.key} className="h-[72px] flex items-center border-b px-6 text-[#101828]">
                {row.label}
              </div>
            ))}
          </div>

          {comparison.providers.map((provider) => (
            <div key={provider.name} className="w-[220px] flex-shrink-0">
              <div className="h-[72px] flex items-center justify-center bg-[#F9FAFB] border-b">
                <img
                  src={IMAGE_URL + provider.logo}
                  alt={provider.name}
                  className={`${getProviderLogoClassName(provider.name)} object-contain`}
                />
              </div>

              {featureRows.map((row) => {
                const value = provider.features_data[row.key];
                const subtitle =
                  row.key === "monthly_cost"
                    ? provider.features_data.monthly_cost_subtitle
                    : undefined;
                const highlight = provider.is_featured && row.key === "monthly_cost";

                return (
                  <div key={row.key} className="h-[72px] flex flex-col items-center justify-center border-b">
                    {renderFeatureValue(value, { highlight })}
                    {subtitle && (
                      <span className={highlight ? "text-[#079455] font-bold" : "text-[#475467]"}>
                        {subtitle}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-10 py-2">
        {featureRows.map((row) => (
          <div key={row.key}>
            <div className="bg-[#F9FAFB] border-b px-6 py-4 font-semibold">
              {row.label}
            </div>

            {comparison.providers.map((provider) => {
              const value = provider.features_data[row.key];
              const subtitle =
                row.key === "monthly_cost"
                  ? provider.features_data.monthly_cost_subtitle
                  : undefined;
              const highlight = provider.is_featured && row.key === "monthly_cost";

              return (
                <div key={provider.name} className="flex border-b h-[72px]">
                  <div className="w-[67%] px-6 flex items-center">
                    <img
                      src={IMAGE_URL + provider.logo}
                      alt={provider.name}
                      className="w-[107px] h-[35px] object-contain"
                    />
                  </div>
                  <div className="w-[33%] px-6 flex flex-col justify-center items-center">
                    {renderFeatureValue(value, { highlight })}
                    {subtitle && (
                      <span className={highlight ? "text-[#079455] font-bold" : "text-[#475467]"}>
                        {subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

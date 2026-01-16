import Image from "next/image";

type FeatureValue = string | boolean;

type ProviderFeatures = {
  unlimited_live_call_answer?: FeatureValue;
  corporate_mailing_address?: FeatureValue;
  local_business_number?: FeatureValue;
  unlimited_call_transfer?: FeatureValue;
  callout_services?: FeatureValue;
  unlimited_toll_free_calls?: FeatureValue;
  unlimited_texting?: FeatureValue;
  contract_length?: FeatureValue;
  setup_fee?: FeatureValue;
  monthly_cost?: FeatureValue;
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

const IMAGE_URL = "https://www.opusvirtualoffices.com/newsite";

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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 28 28"
    fill="none"
  >
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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 28 28"
    fill="none"
  >
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
  if (value == null) return "";

  const isDollar = typeof value === "string" && value.includes("$");
  const formatPriceDuration = (value?: string) => {
    if (typeof value !== "string") return value;
    return value.replace(/\/\s*(month|monthly)/i, "/ Mo");
  };

  return (
    <span
      className={
        options?.highlight
          ? "text-[#079455] font-bold text-[18px] leading-[28px] whitespace-nowrap"
          : isDollar
          ? "text-[18px] leading-[28px] text-[#475467] whitespace-nowrap"
          : "text-[16px] leading-[24px] md:text-[18px] md:leading-[28px] text-[#475467]"
      }
    >
      {formatPriceDuration(value)}
    </span>
  );
};

export function FeatureComparisonTablePaidSearch({
  comparison,
}: ComparisonTableProps) {
  const labelToKey: Record<string, FeatureKey> = {
    "Unlimited Live Call Answer": "unlimited_live_call_answer",
    "Corporate Mailing Address": "corporate_mailing_address",
    "Local Business Number": "local_business_number",
    "Unlimited Call Transfer": "unlimited_call_transfer",
    "Callout Services*": "callout_services",
    "Unlimited Toll-Free Calls*": "unlimited_toll_free_calls",
    "Unlimited Texting*": "unlimited_texting",
    "Short Term Contract": "contract_length",
    "Setup Fee": "setup_fee",
    "Cost Per Mo.": "monthly_cost",
  };

  const mappedRows = (comparison.features ?? [])
    .map((label) => ({
      label,
      key: labelToKey[label],
    }))
    .filter((row): row is { label: string; key: FeatureKey } =>
      Boolean(row.key)
    );

  const featureRows =
    mappedRows.length > 0
      ? mappedRows
      : featureKeys.map((key) => ({
          key,
          label: defaultFeatureLabels[key],
        }));
  const hasBestValue = comparison.providers?.some(
    (provider) => provider.is_featured
  );

  return (
    <div className="bg-white">
      {/* Desktop */}
      <div className="hidden md:block overflow-hidden">
        <div className="flex overflow-y-auto">
          <div className=" max-w-[400px] w-full flex-shrink-0">
            <div className="h-[72px] flex items-center bg-[#F9FAFB] border-b px-6 py-3 font-bold text-[#475467] text-[20px] leading-[30px]">
              Features
            </div>

            {featureRows.map((row) => (
              <div
                key={row.key}
                className="h-[72px] flex items-center border-b pl-6 py-4 text-[#101828] justify-between text-[20px] leading-[30px] font-normal"
              >
                {row.label}
                {row.key === "monthly_cost" && hasBestValue && (
                  <div className="flex flex-row md:h-[36px] items-center justify-center gap-[5.196px] px-[12.991px] py-[5.196px] pl-[15.589px] rounded-[20.785px] border border-[#ABEFC6] bg-[#ECFDF3]">
                    <p className="text-[18.187px] leading-[25.981px] font-medium text-[#067647]">
                      Best Value
                    </p>
                    <Image
                      src="/rightIcon.svg"
                      alt="Best Value"
                      width={15.589}
                      height={15.589}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {comparison.providers.map((provider) => (
            <div key={provider.name} className="w-[220px] flex-shrink-0">
              <div className="h-[72px] flex items-center justify-center bg-[#F9FAFB] border-b py-4 px-6">
                <img
                  src={IMAGE_URL + provider.logo}
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
                const highlight =
                  provider.is_featured && row.key === "monthly_cost";

                return (
                  <div
                    key={row.key}
                    className="h-[72px] flex flex-col items-center justify-center border-b px-6 py-4"
                  >
                    <div
                      className={
                        row.key === "monthly_cost"
                          ? "flex flex-col text-[18px] leading-[28px]"
                          : " text-[18px] leading-[28px]"
                      }
                    >
                      {renderFeatureValue(value, { highlight })}
                      {subtitle && (
                        <span
                          className={
                            highlight
                              ? "text-[#079455] font-bold text-[18px] leading-[28px]"
                              : "text-[#475467] text-[18px] leading-[28px]"
                          }
                        >
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

      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-10 pb-2 pt-[28px] ">
        {featureRows.map((row) => (
          <div key={row.key}>
            <div className="bg-[#F9FAFB] border-b px-6 py-4 font-semibold">
              <h3 className="max-w-[226px] md:max-w-auto text-[18px] leading-[28px] font-semibold">
                {row.label}
              </h3>
            </div>

            {comparison.providers.map((provider) => {
              const value = provider.features_data[row.key];
              const subtitle =
                row.key === "monthly_cost"
                  ? provider.features_data.monthly_cost_subtitle
                  : undefined;
              const highlight =
                provider.is_featured && row.key === "monthly_cost";
              const isRegPng = provider.logo.endsWith("reg.png");
              return (
                <div
                  key={provider.name}
                  className={`flex border-b ${
                    isRegPng ? "h-[73px]" : "h-[73px]"
                  }`}
                >
                  {/* Logo column */}
                  <div
                    className={`w-[67%] px-6 flex ${
                      isRegPng ? "py-2" : "py-4"
                    }`}
                  >
                    <img
                      src={IMAGE_URL + provider.logo}
                      alt={provider.name}
                      className={` object-contain ${
                        isRegPng ? "w-[107px] h-[55px]" : "h-[35px]"
                      }`}
                    />
                  </div>

                  {/* Value column (keep centered) */}
                  <div className="w-[33%] py-4 flex flex-col justify-center items-center">
                    <div
                      className={
                        row.key === "monthly_cost"
                          ? "flex flex-col text-[18px] leading-[28px]"
                          : " text-[18px] leading-[28px]"
                      }
                    >
                      {renderFeatureValue(value, { highlight })}
                      {subtitle && (
                        <span
                          className={
                            highlight
                              ? "text-[#079455] font-bold text-[18px] leading-[28px]"
                              : "text-[#475467] text-[18px] leading-[28px]"
                          }
                        >
                          {subtitle}
                        </span>
                      )}
                    </div>
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

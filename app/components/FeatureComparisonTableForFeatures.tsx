import Image from "next/image";

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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    aria-hidden
  >
    <path
      d="M8.74998 14L12.25 17.5L19.25 10.5M25.6666 14C25.6666 20.4433 20.4433 25.6666 14 25.6666C7.55666 25.6666 2.33331 20.4433 2.33331 14C2.33331 7.55666 7.55666 2.33331 14 2.33331C20.4433 2.33331 25.6666 7.55666 25.6666 14Z"
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
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    aria-hidden
  >
    <path
      d="M17.5 10.5L10.5 17.5M10.5 10.5L17.5 17.5M25.6666 14C25.6666 20.4433 20.4433 25.6666 14 25.6666C7.55666 25.6666 2.33331 20.4433 2.33331 14C2.33331 7.55666 7.55666 2.33331 14 2.33331C20.4433 2.33331 25.6666 7.55666 25.6666 14Z"
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
          ? "text-[#079455] font-bold text-[18px] leading-[28px]"
          : isDollarValue
          ? "text-[18px] leading-[28px] font-normal text-[#475467]"
          : "text-[16px] leading-[24px] md:text-[18px] font-normal md:leading-[28px] text-[#475467]"
      }
    >
      {value}
    </span>
  );
};

export function ComparisonTable({
  comparison,
  footnote,
}: ComparisonTableProps) {
  const featureRows = featureKeys.map((key, index) => ({
    key,
    label: comparison.features[index] ?? defaultFeatureLabels[key],
  }));

  return (
    <div className="bg-white">
      <div className="hidden overflow-hidden md:block">
        <div
          className="flex overflow-y-auto"
          role="table"
          aria-label="Compare virtual office features"
        >
          <div
            className="flex w-[336px] flex-col flex-shrink-0"
            role="rowgroup"
          >
            <div className="flex h-[72px] items-center gap-2 border-b border-[#EAECF0] bg-[#F9FAFB] px-6 py-3">
              <span className="text-[20px] font-bold leading-[30px] text-[#475467]">
                Features
              </span>
            </div>

             {featureRows.map((row) => (
              <div
                key={row.key}
                className={`h-[72px] flex items-center border-b ${row.key === "monthly_cost" ? "pl-6":"px-6"} py-4 text-[#101828] justify-between text-[20px] leading-[30px] font-normal`}
              >
                {row.label}
                {row.key === "monthly_cost" && (
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
            <div
              className="flex w-[220px] flex-shrink-0 flex-col"
              key={provider.name}
              role="rowgroup"
            >
              <div className="flex h-[72px] items-center justify-center border-b border-[#EAECF0] bg-[#F9FAFB] px-6 py-4">
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
                const highlightPrice =
                  provider.is_featured && row.key === "monthly_cost";

                return (
                  <div
                    key={row.key}
                    role="row"
                    className="flex h-[72px] flex-col items-center justify-center border-b border-gray-200 px-6 py-4"
                  >
                    <div className="flex flex-col items-start">
                      <div className="flex items-center justify-center h-[28px] text-[18px] leading-[28px] text-[#475467] font-normal">
                        {renderFeatureValue(value, {
                          highlight: highlightPrice,
                        })}
                      </div>
                      {subtitle ? (
                        <span
                          className={
                            highlightPrice
                              ? "text-[#079455] font-bold text-[18px] leading-[28px] text-center"
                              : "text-[18px] leading-[28px] text-[#475467] text-center"
                          }
                        >
                          {subtitle}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[40px] md:gap-6 md:hidden py-2">
        {featureRows.map((row) => (
          <div key={row.key} className="overflow-hidden bg-white">
            <div className="flex items-center justify-between bg-[#F9FAFB] md:px-4 md:py-3 border-b border-[#EAECF0]">
              <span className="text-[18px] font-semibold leading-7 text-[#101828] max-w-full w-[67%] px-6 py-4">
                {row.label}
              </span>
              {/* <span className="text-[20px] leading-[30px] font-bold text-[#101828] max-w-full w-[33%] px-6 py-4 whitespace-nowrap text-left flex justify-center">
                Providers
              </span> */}
            </div>

            <div className="flex flex-col divide-y divide-[#EAECF0] border-b border-[#EAECF0]">
              {comparison.providers.map((provider) => {
                const value = provider.features_data[row.key];
                const subtitle =
                  row.key === "monthly_cost"
                    ? provider.features_data.monthly_cost_subtitle
                    : undefined;
                const highlightPrice =
                  provider.is_featured && row.key === "monthly_cost";

                return (
                  <div
                    key={`${provider.name}-${row.key}`}
                    className="flex items-center justify-between h-[72px] overflow-hidden"
                  >
                    <div className="flex items-center gap-3 max-w-full h-[72px] w-[67%] px-6 py-4">
                      <img
                        src={IMAGE_URL + provider.logo}
                        alt={provider.name}
                        className={`${getProviderLogoClassName(
                          provider.name
                        )} object-contain w-[107px] h-[35px]`}
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center text-[16px] leading-[24px] md:text-[18px] font-normal md:leading-[28px] text-[#475467] max-w-full w-[33%] px-6 py-4 whitespace-nowrap text-left">
                      <div className="flex items-center justify-center h-[28px] ">
                        {renderFeatureValue(value, {
                          highlight: highlightPrice,
                        })}
                      </div>
                      {subtitle ? (
                        <span
                          className={
                            highlightPrice
                              ? "text-[#079455] font-bold text-[18px] leading-[28px] -ms-12 md:-ms-0"
                              : "text-[18px] leading-[28px] text-[#475467] -ms-2"
                          }
                        >
                          {subtitle}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

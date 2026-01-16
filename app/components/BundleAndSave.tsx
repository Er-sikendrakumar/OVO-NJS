"use client";

import { useRouter } from "next/navigation";
import type phoneBundlesJson from "../../newsite/json/bundles_ba.json";
import Link from "next/link";

type ServiceMap = Record<string, string | undefined>;

type Bundle = {
  id: string;
  bundlename: string;
  bundleshort: string;
  bundlephantom: string;
  bundleprice: string;
  services: ServiceMap | string[] | null | undefined;
};

type PhoneBundleData = Partial<typeof phoneBundlesJson> & {
  data?: {
    bundles?: Bundle[];
    all_services?: ServiceMap;
    description?: string;
    optional_features?: string[];
  };
};

type BundleAndSaveProps = {
  phonebundlesdata?: PhoneBundleData;
  mode?: 'phone' | 'default';
};

const accentColors: Record<string, string> = {
  PLUS: "text-[#FF692E]",
  PRO: "text-[#3E4784]",
  PREMIUM: "text-[#079455]",
};

const defaultIncludedServices = ["Live Call Answering", "Call Transferring"];
const servicesDisplayOrder = [
  "Callout",
  "Tollfree",
  "Call Logs",
  "Supervised Transfer",
  "Message Taking",
];

function formatPrice(value?: string) {
  if (!value) return "";
  const priceNumber = Number.parseFloat(value);

  if (Number.isNaN(priceNumber)) {
    return value;
  }

  const formatted =
    Number.isInteger(priceNumber) && priceNumber < 1000
      ? priceNumber.toFixed(0)
      : priceNumber.toFixed(2);

  return `$${formatted}`;
}

function normalizeServices(services: Bundle["services"]) {
  if (!services) {
    return [];
  }

  const values = Array.isArray(services) ? services : Object.values(services);

  return values.filter((value): value is string => typeof value === "string");
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4.16667 10H15.8333"
        stroke="#A4A7AE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-6 w-6"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#0BA5EC"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0964 7.39004L9.93641 14.3L8.03641 12.27C7.68641 11.94 7.13641 11.92 6.73641 12.2C6.34641 12.49 6.23641 13 6.47641 13.41L8.72641 17.07C8.94641 17.41 9.32641 17.62 9.75641 17.62C10.1664 17.62 10.5564 17.41 10.7764 17.07C11.1364 16.6 18.0064 8.41004 18.0064 8.41004C18.9064 7.49004 17.8164 6.68004 17.0964 7.38004V7.39004Z"
        fill="#F2F4F7"
      />
    </svg>
  );
}

export default function BundleAndSave({
  phonebundlesdata,
  mode = 'default',
}: BundleAndSaveProps) {
  const {
    bundles = [],
    all_services = {},
    description,
    optional_features,
  } = phonebundlesdata?.data ?? {};
  const router = useRouter();
  const allServicesOrder = normalizeServices(all_services);

  const optionalFeatures = (optional_features ?? []).filter(
    (feature): feature is string => typeof feature === "string"
  );

  const plans = bundles.map((bundle) => {
    const accent =
      bundle.bundleshort?.toUpperCase() === "SOLUTION"
        ? null
        : bundle.bundleshort;

    const accentKey = accent?.toUpperCase() ?? "";
    const price = formatPrice(bundle.bundleprice);
    const oldPrice =
      bundle.bundlephantom && bundle.bundlephantom !== bundle.bundleprice
        ? formatPrice(bundle.bundlephantom)
        : null;

    // Generate buttonLink based on mode
    const buttonLink = mode === 'phone'
      ? `/signup/?btn=2&sutype=phone&bundle=${bundle.id}`
      : `/signup/?btn=2&bundle=${bundle.id}`;

    return {
      id: bundle.id,
      label: bundle.bundlename,
      labelColor: "bg-[#0BA5EC]",
      title: accent ? "Live Call Answering " : "Live Call Answering Solution",
      accent,
      accentColor: accentColors[accentKey] ?? "",
      price,
      oldPrice,
      buttonLink,
      per: "per month",
      buttonColor: "bg-[#0BA5EC] hover:bg-[#026aa2]",
      includedFeatures: normalizeServices(bundle.services),
    };
  });

  return (
    <section className="mx-auto max-w-[1280px] w-full flex flex-col md:gap-8 px-4 md:px-8">
      <div className="max-w-[768px] mx-auto w-full text-center pb-5 md:pb-0 ">
        <h1 className="font-semibold text-[#101828] text-[36px] leading-[44px] tracking-[-0.72px]">
          Phone Bundle & Save
        </h1>
        <p className="mt-5 text-[14px] leading-[20px] font-normal text-[#475467]">
          {description}
        </p>
      </div>

      <div className="py-5 flex gap-8 flex-col md:flex-row md:flex-wrap md:justify-center md:py-10">
        {plans.map((plan,index) => {
          const includedSet = new Set([
            ...(plan.includedFeatures ?? []),
            ...defaultIncludedServices,
          ]);
          const orderedFeatures = [
            ...defaultIncludedServices,
            ...servicesDisplayOrder.filter(
              (feature) =>
                allServicesOrder.includes(feature) &&
                !defaultIncludedServices.includes(feature)
            ),
          ];

          return (
            <article
              key={plan.id}
              className="flex h-full flex-col md:max-w-[280px] md:w-full overflow-hidden  rounded-[16px]
    border border-[#EAECF0] bg-white shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),_0_4px_6px_-2px_rgba(16,24,40,0.03)]"
            >
              <div
                className={`flex h-[37px] items-center justify-center px-4 text-[16px] leading-6 font-semibold text-white ${plan.labelColor}`}
              >
                {plan.label}
              </div>

              <div className="flex flex-1 flex-col px-4 py-8 gap-8">
                <div className="w-full">
                  <h3 className="text-[24px] font-normal leading-[32px] text-[#475467]">
                    {plan.title}
                    {plan.accent ? " " : ""}
                    {plan.accent ? (
                      <span className={`${plan.accentColor} font-semibold`}>
                        {plan.accent}
                      </span>
                    ) : null}
                  </h3>

                  <div className="mt-4 flex items-flex items-end gap-1">
                    <span className="text-[60px] leading-[72px] tracking-[-1.2px] font-semibold text-[#101828]">
                      {plan.price}
                    </span>

                    <div className="flex flex-col pb-2">
                      {plan.oldPrice && (
                        <span className="text-[30px] leading-[38px] font-semibold text-[#ED1C24] line-through">
                          {plan.oldPrice}
                        </span>
                      )}
                      <span className="text-[16px] leading-[24px] font-medium text-[#475467]">
                        {plan.per}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href={plan.buttonLink}
                  className={`hover:bg-[#ed1c24] flex items-center justify-center w-full rounded-md px-[18px] py-3 text-[16px] leading-[24px] font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006ca8] ${plan.buttonColor}`}
                >
                  Select Bundle
                </Link>
                {/* <button
                  onClick={() => router.push(plan.buttonLink)}
                  className={`hover:bg-[#ed1c24] w-full rounded-md px-[18px] py-3 text-[16px] leading-[24px] font-semibold text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006ca8] ${plan.buttonColor}`}
                >
                  Select Bundle
                </button> */}
              </div>

              <div className="border-t border-[#EAECF0] px-4 pb-10 pt-8">
                <ul className="flex flex-col gap-4 items-start">
                  {orderedFeatures.map((feature) => {
                    const isIncluded = includedSet.has(feature);

                    return (
                      <li
                        key={`${plan.id}-${feature}`}
                        className="flex items-start gap-3 text-[16px] leading-[24px] text-[#535862]"
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full ${
                            isIncluded ? "bg-[#e6f6ff]" : "bg-transparent"
                          }`}
                        >
                          {isIncluded ? <CheckIcon /> : <MinusIcon />}
                        </span>
                        <span>{feature}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="max-w-[878px] mx-auto w-full flex flex-col gap-8 pt-5 md:pt-10">
        <h2 className="text-center text-[20px] font-normal uppercase leading-[30px] text-[#475467]">
          Optional Features Available
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {optionalFeatures.map((feature) => (
            <span
              key={feature}
              className="rounded-[6px] border border-[#D0D5DD] bg-white px-2.5 py-1 text-sm font-medium h-7 text-[#344054] shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
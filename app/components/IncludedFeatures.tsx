"use client";

import { useMemo, useState } from "react";

type OptionalUpgrade = {
  id?: number | string;
  title?: string;
  description?: string;
  order?: string | number;
};

type IncludedFeaturesProps = {
  optionalUpgrades?: OptionalUpgrade[];
};

const sanitizeText = (value: string) =>
  (value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8217;|&rsquo;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/[^\x00-\x7F]+/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .trim();

export default function IncludedFeatures({
  optionalUpgrades = [],
}: IncludedFeaturesProps) {
  const [showOptionalUpgrades, setShowOptionalUpgrades] = useState(false);
  const upgrades = useMemo(() => {
    return optionalUpgrades
      .map((upgrade) => ({
        id: upgrade.id ?? upgrade.title ?? "upgrade",
        title: upgrade.title ?? "Optional Upgrade",
        description: sanitizeText(upgrade.description ?? ""),
        order: Number.parseInt(String(upgrade.order ?? "0"), 10) || 0,
      }))
      .sort((a, b) => a.order - b.order);
  }, [optionalUpgrades]);

  return (
    <section id="included-features">
      <div
      className="w-full py-5 md:py-[40px] bg-cover bg-center "
      style={{
        backgroundImage: `
            linear-gradient(
                0deg,
                rgba(255, 255, 255, 92%) 5%,
                #ffffffed 5%
            ),
            url('/bg-3.webp')
            `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col items-center gap-[40px]">
        {/* TITLE */}
        <h2 className="text-center text-[30px] leading-[38px] md:text-[48px] font-semibold md:leading-[60px] md:tracking-[-0.96px] text-black">
          Included Features
        </h2>

        {/* GRID */}
        <div className="flex flex-wrap md:items-center md:justify-center lg:grid lg:grid-cols-2 lg:gap-8 xl:flex xl:flex-wrap justify-between gap-y-[40px] xl:gap-y-[40px] w-full">
          <FeatureItem
            icon={<HeadphoneIcon />}
            title="Live Call Answering"
            text="Professional live receptionists manage your calls with personalized care, ensuring a professional experience for every caller."
          />

          <FeatureItem
            icon={<PhoneOutgoingIcon />}
            title="Premium Call Transferring"
            text="Maximize call efficiency with our premium transferring, ensuring important calls reach you or your voicemail seamlessly."
          />

          <FeatureItem
            icon={<PhoneIcon />}
            title="Company Phone & Fax Number"
            text="Choose a local phone and fax number from our available options or we can port your existing number(s) to maintain continuity."
          />

          <FeatureItem
            icon={<VoicemailIcon />}
            title="2 Voicemail Boxes"
            text="Organize communications with tailored voicemail boxes, featuring individual greetings for a professional touch."
          />

          <FeatureItem
            icon={<EmailIcon />}
            title="Voicemail / Fax to Email"
            text="Effortlessly manage your communications with voicemails and faxes converted to email in digital formats."
          />

          {/* OPTIONAL UPGRADE */}
          <div
            className="flex w-full md:max-w-[590px] h-auto md:h-[220px] lg:h-[100%] xl:h-[220px] p-[20px] flex-col items-start gap-[12px] rounded-[12px] bg-cover bg-center"
            style={{
              backgroundImage: `
            linear-gradient(
                0deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(0,0,0,0.8) 0%
            ),
            url('/bg-4.webp')
            `,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h3 className="font-inter text-[30px] font-bold leading-[38px] text-white">
              Optional Upgrades
            </h3>

            <p className="text-[20px] leading-[30px] md:text-[24px] font-normal md:leading-[32px] text-white">
              Aside from the included features, we also offer the following:
              callout feature, additional extensions, toll free number, and
              others.
            </p>

            <p className="text-[18px] font-normal leading-[28px] text-white">
              <button
                type="button"
                className="underline leading-[28px]"
                onClick={() => {
                  setShowOptionalUpgrades(true);
                  const target = document.getElementById(
                    "optional-upgrades-features"
                  );
                  
                }}
              >
                Click here
              </button>{" "}
              to see all features
            </p>
          </div>
        </div>
      </div>
        </div>

      {showOptionalUpgrades && upgrades.length > 0 ? (
        <div
          id="optional-upgrades-features"
          className="max-w-[1280px] mx-auto mb-6 px-4 lg:px-8 mt-0 md:mb-10"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
            {upgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                className="rounded-[5px] border border-[#9d9d9d] bg-white p-5"
              >
                <h3 className="text-[18px] md:text-[20px] font-bold leading-[28px] md:leading-[30px] text-[#2a3547]">
                  {upgrade.title}
                </h3>
                {upgrade.description
                  .split("\n\n")
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p
                      key={`${upgrade.id}-${index}`}
                      className="mt-2 text-[14px] md:text-[16px] leading-[24px] text-[#000]"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ---------------- FEATURE CARD ---------------- */

function FeatureItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="flex w-full h-auto flex-col md:flex-row md:max-w-[590px] md:h-[220px] lg:h-[100%] xl:h-[220px] p-[20px] gap-[24px]
      rounded-[12px] border border-[#A6A6A6]"
    >
      <div className="flex h-[75px] md:shrink-0">
        <span className="p-0 md:p-[0px]">{icon}</span>
      </div>

      <div className="flex flex-col gap-[12px]">
        <h3 className="text-[30px] font-semibold leading-[38px] text-black tracking-[-0.008px]">
          {title}
        </h3>
        <p className="text-[20px] leading-[30px] md:text-[24px] font-normal md:leading-[32px] text-black tracking-[-0.08px]">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ---------------- ICONS ---------------- */

function HeadphoneIcon() {
  return (
    <svg width="75" height="75" viewBox="0 0 75 75" fill="none">
      <path
        d="M65.625 56.25V37.5C65.625 21.967 53.033 9.375 37.5 9.375C21.967 9.375 9.375 21.967 9.375 37.5V56.25M17.1875 65.625C12.8728 65.625 9.375 62.1272 9.375 57.8125V51.5625C9.375 47.2478 12.8728 43.75 17.1875 43.75C21.5022 43.75 25 47.2478 25 51.5625V57.8125C25 62.1272 21.5022 65.625 17.1875 65.625ZM57.8125 65.625C53.4978 65.625 50 62.1272 50 57.8125V51.5625C50 47.2478 53.4978 43.75 57.8125 43.75C62.1272 43.75 65.625 47.2478 65.625 51.5625V57.8125C65.625 62.1272 62.1272 65.625 57.8125 65.625Z"
        stroke="black"
        strokeWidth="6.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneOutgoingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M65.6238 25V9.375M65.6238 9.375H49.9988M65.6238 9.375L46.8738 28.125M31.9583 43.3221C28.2033 39.5672 25.2384 35.3214 23.0634 30.7913C22.8763 30.4017 22.7827 30.2069 22.7109 29.9603C22.4555 29.0842 22.6389 28.0084 23.1702 27.2664C23.3197 27.0577 23.4983 26.879 23.8556 26.5218C24.9481 25.4293 25.4943 24.883 25.8515 24.3337C27.1983 22.2622 27.1983 19.5916 25.8515 17.5201C25.4943 16.9708 24.9481 16.4245 23.8556 15.332L23.2466 14.723C21.5858 13.0623 20.7555 12.2319 19.8636 11.7808C18.09 10.8837 15.9954 10.8837 14.2218 11.7808C13.33 12.2319 12.4996 13.0623 10.8388 14.723L10.3462 15.2157C8.69117 16.8707 7.86363 17.6983 7.23161 18.8234C6.5303 20.0718 6.02604 22.0109 6.0303 23.4428C6.03414 24.7333 6.28446 25.6152 6.78511 27.3791C9.47564 36.8585 14.5521 45.8033 22.0146 53.2658C29.477 60.7282 38.4219 65.8047 47.9012 68.4952C49.6651 68.9959 50.5471 69.2462 51.8375 69.25C53.2695 69.2543 55.2085 68.75 56.457 68.0487C57.5821 67.4167 58.4096 66.5892 60.0647 64.9341L60.5573 64.4415C62.2181 62.7807 63.0484 61.9504 63.4995 61.0585C64.3966 59.2849 64.3966 57.1903 63.4995 55.4167C63.0484 54.5249 62.218 53.6945 60.5573 52.0338L59.9483 51.4248C58.8558 50.3323 58.3095 49.786 57.7602 49.4289C55.6887 48.082 53.0181 48.082 50.9466 49.4289C50.3973 49.786 49.851 50.3323 48.7585 51.4248C48.4013 51.782 48.2227 51.9606 48.0139 52.1101C47.2719 52.6414 46.1961 52.8249 45.32 52.5695C45.0735 52.4976 44.8787 52.4041 44.489 52.217C39.9589 50.042 35.7132 47.077 31.9583 43.3221Z"
        stroke="currentColor"
        strokeWidth="6.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M26.1884 27.6664C28.3634 32.1964 31.3283 36.4422 35.0833 40.1971C38.8382 43.952 43.0839 46.917 47.614 49.092C48.0037 49.2791 48.1985 49.3726 48.445 49.4445C49.3211 49.6999 50.3969 49.5164 51.1389 48.9851C51.3477 48.8356 51.5263 48.657 51.8835 48.2998C52.976 47.2073 53.5223 46.661 54.0716 46.3039C56.1431 44.957 58.8137 44.957 60.8852 46.3039C61.4345 46.661 61.9808 47.2073 63.0733 48.2998L63.6823 48.9088C65.343 50.5695 66.1734 51.3999 66.6245 52.2917C67.5216 54.0653 67.5216 56.1599 66.6245 57.9336C66.1734 58.8254 65.3431 59.6558 63.6823 61.3165L63.1897 61.8091C61.5346 63.4642 60.7071 64.2917 59.582 64.9237C58.3335 65.6251 56.3945 66.1293 54.9625 66.1251C53.6721 66.1212 52.7901 65.8709 51.0262 65.3702C41.5469 62.6797 32.602 57.6032 25.1396 50.1408C17.6771 42.6784 12.6006 33.7335 9.91011 24.2541C9.40946 22.4902 9.15914 21.6083 9.1553 20.3178C9.15104 18.8859 9.6553 16.9468 10.3566 15.6984C10.9886 14.5733 11.8162 13.7457 13.4712 12.0907L13.9638 11.5981C15.6246 9.93731 16.455 9.10693 17.3468 8.65585C19.1204 7.75876 21.215 7.75876 22.9886 8.65585C23.8805 9.10693 24.7108 9.93731 26.3716 11.5981L26.9806 12.207C28.0731 13.2996 28.6193 13.8458 28.9765 14.3951C30.3233 16.4666 30.3233 19.1372 28.9765 21.2087C28.6193 21.7581 28.0731 22.3043 26.9806 23.3968C26.6233 23.7541 26.4447 23.9327 26.2952 24.1415C25.7639 24.8834 25.5805 25.9592 25.8359 26.8353C25.9077 27.0819 26.0013 27.2767 26.1884 27.6664Z"
        stroke="currentColor"
        strokeWidth="6.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VoicemailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18.75 50L56.25 50M18.75 50C25.6536 50 31.25 44.4036 31.25 37.5C31.25 30.5964 25.6536 25 18.75 25C11.8464 25 6.25 30.5964 6.25 37.5C6.25 44.4036 11.8464 50 18.75 50ZM56.25 50C63.1536 50 68.75 44.4036 68.75 37.5C68.75 30.5964 63.1536 25 56.25 25C49.3464 25 43.75 30.5964 43.75 37.5C43.75 44.4036 49.3464 50 56.25 50Z"
        stroke="currentColor"
        strokeWidth="6.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.25 21.875L31.7654 39.7358C33.8315 41.1821 34.8646 41.9052 35.9883 42.1853C36.9809 42.4328 38.0191 42.4328 39.0117 42.1853C40.1354 41.9052 41.1685 41.1821 43.2346 39.7358L68.75 21.875M21.25 62.5H53.75C59.0005 62.5 61.6257 62.5 63.6312 61.4782C65.3952 60.5794 66.8294 59.1452 67.7282 57.3812C68.75 55.3757 68.75 52.7505 68.75 47.5V27.5C68.75 22.2495 68.75 19.6243 67.7282 17.6188C66.8294 15.8548 65.3952 14.4206 63.6312 13.5218C61.6257 12.5 59.0005 12.5 53.75 12.5H21.25C15.9995 12.5 13.3743 12.5 11.3688 13.5218C9.60482 14.4206 8.17063 15.8548 7.27181 17.6188C6.25 19.6243 6.25 22.2495 6.25 27.5V47.5C6.25 52.7505 6.25 55.3757 7.27181 57.3812C8.17063 59.1452 9.60482 60.5794 11.3688 61.4782C13.3743 62.5 15.9995 62.5 21.25 62.5Z"
        stroke="currentColor"
        strokeWidth="6.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

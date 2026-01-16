import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Choose your city from our list of 650+ U.S. locations",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="76"
        height="76"
        viewBox="0 0 57 70"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M28.5 36.4165C33.7467 36.4165 38 32.1632 38 26.9165C38 21.6698 33.7467 17.4165 28.5 17.4165C23.2533 17.4165 19 21.6698 19 26.9165C19 32.1632 23.2533 36.4165 28.5 36.4165Z"
          stroke="black"
          strokeWidth="6.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.5 66.4998C34.8333 53.8332 53.8333 45.6577 53.8333 28.4998C53.8333 14.5086 42.4912 3.1665 28.5 3.1665C14.5088 3.1665 3.16666 14.5086 3.16666 28.4998C3.16666 45.6577 22.1667 53.8332 28.5 66.4998Z"
          stroke="black"
          strokeWidth="6.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Sign up online in minutes — no setup fees or deposits",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="76"
        height="76"
        viewBox="0 0 76 76"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9.49998 50.6665V22.7998C9.49998 19.2528 9.49998 17.4793 10.1903 16.1246C10.7975 14.9329 11.7663 13.964 12.958 13.3568C14.3128 12.6665 16.0863 12.6665 19.6333 12.6665H56.3666C59.9136 12.6665 61.6871 12.6665 63.0419 13.3568C64.2336 13.964 65.2025 14.9329 65.8097 16.1246C66.5 17.4793 66.5 19.2528 66.5 22.7998V50.6665H49.5987C48.8241 50.6665 48.4369 50.6665 48.0724 50.754C47.7493 50.8316 47.4404 50.9595 47.1571 51.1331C46.8375 51.329 46.5637 51.6028 46.016 52.1505L45.8173 52.3492C45.2696 52.8969 44.9958 53.1707 44.6762 53.3665C44.3929 53.5402 44.084 53.6681 43.7609 53.7457C43.3964 53.8332 43.0092 53.8332 42.2346 53.8332H33.7653C32.9908 53.8332 32.6035 53.8332 32.2391 53.7457C31.916 53.6681 31.6071 53.5402 31.3237 53.3665C31.0042 53.1707 30.7303 52.8969 30.1827 52.3492L29.984 52.1505C29.4363 51.6028 29.1625 51.329 28.8429 51.1331C28.5596 50.9595 28.2507 50.8316 27.9275 50.754C27.5631 50.6665 27.1758 50.6665 26.4013 50.6665H9.49998ZM9.49998 50.6665C7.75108 50.6665 6.33331 52.0843 6.33331 53.8332V54.8887C6.33331 56.852 6.33331 57.8336 6.54912 58.639C7.13474 60.8246 8.84188 62.5317 11.0275 63.1174C11.8328 63.3332 12.8145 63.3332 14.7778 63.3332H61.2222C63.1855 63.3332 64.1671 63.3332 64.9725 63.1174C67.1581 62.5317 68.8652 60.8246 69.4508 58.639C69.6666 57.8336 69.6666 56.852 69.6666 54.8887C69.6666 53.9071 69.6666 53.4163 69.5587 53.0136C69.2659 51.9208 68.4124 51.0672 67.3196 50.7744C66.9169 50.6665 66.4261 50.6665 65.4444 50.6665H63.3333"
          stroke="black"
          strokeWidth="6.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title:
      "Start using your address immediately for your LLC, website, or client communications",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="76"
        height="76"
        viewBox="0 0 57 42"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M53.8333 3.1665L19 37.9998L3.16663 22.1665"
          stroke="black"
          strokeWidth="6.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function GetVirtualBusinessAddress() {
  const router = useRouter();

  return (
    <section className="bg-white py-10">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-8 px-4 sm:px-8">
        <h2 className="w-full text-center text-[#3E465A] font-inter text-[30px] leading-[38px] md:text-[48px] font-semibold md:leading-[60px] md:tracking-[-0.96px]">
          How To Get A Virtual Business Address
        </h2>

        <div className="grid w-full gap-[64px] md:grid-cols-3 pt-8">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-6 text-center max-w-[344px] mx-auto md:max-w-full"
            >
              <div className="min-h-[76px]">{step.icon}</div>
              <p className="text-[#3E465A] font-inter text-[20px] font-normal leading-[30px]">
                {step.title}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push("/signup/?btn=841")}
          className="
            flex items-center justify-center gap-[10px]
            px-[12px] py-[8px] md:px-[22px] md:py-[16px]
            rounded-[8px] h-[36px] md:h-[60px]
            border border-[#0086C9] hover:border-[#026aa2]
            bg-[#0086C9]
            text-white text-[14px] font-semibold leading-[20px]
            font-inter md:text-[18px] md:font-semibold md:leading-[28px]
            shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]
            hover:bg-[#026aa2]
            transition-colors
          "
        >
          Start Your Virtual Business Address Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M7.5 11H4.6C4.03995 11 3.75992 11 3.54601 11.109C3.35785 11.2049 3.20487 11.3578 3.10899 11.546C3 11.7599 3 12.0399 3 12.6V21M16.5 11H19.4C19.9601 11 20.2401 11 20.454 11.109C20.6422 11.2049 20.7951 11.3578 20.891 11.546C21 11.7599 21 12.0399 21 12.6V21M16.5 21V6.2C16.5 5.0799 16.5 4.51984 16.282 4.09202C16.0903 3.71569 15.7843 3.40973 15.408 3.21799C14.9802 3 14.4201 3 13.3 3H10.7C9.57989 3 9.01984 3 8.59202 3.21799C8.21569 3.40973 7.90973 3.71569 7.71799 4.09202C7.5 4.51984 7.5 5.0799 7.5 6.2V21M22 21H2M11 7H13M11 11H13M11 15H13"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

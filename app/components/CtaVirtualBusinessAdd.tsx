import { useRouter } from "next/navigation";

export default function CtaVirtualBusinessAdd() {
  const router = useRouter();

  return (
    <section className="bg-white pt-[64px] pb-10 lg:pt-24 lg:pb-[80px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-4 sm:px-8">
        <div className="flex flex-col gap-12 md:gap-16 md:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-8 md:gap-12 max-w-full lg:max-w-[576px] w-full">
            <div className="flex flex-col gap-4 md:gap-6">
              <h2 className="text-[#101828] font-inter text-[30px] leading-[38px] md:text-[48px] font-semibold md:leading-[60px] md:tracking-[-0.96px]">
                Ready to Grow With Confidence?
              </h2>
              <p className="text-[#475467] font-inter text-[18px] leading-[28px] md:text-[20px] font-normal md:leading-[30px]">
                A virtual business address is the easiest way to take your
                business to the next level—whether you&apos;re protecting your
                privacy, registering a new company, or expanding into new
                markets.
              </p>
            </div>

            <button
              onClick={() => router.push("/signup/?btn=842")}
              type="button"
              className="flex h-12 w-fit items-center justify-center gap-1.5 rounded-lg border border-[#D0D5DD] hover:border-[#026aa2] md:border-[#0086C9] bg-white md:bg-[#0086C9] hover:bg-[#026aa2] text-[#344054] md:text-white px-[18px] py-3 text-[16px] font-semibold leading-[24px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] max-sm:w-full"
            >
              Start Your Virtual Office Today
            </button>
          </div>

          <div className="w-full lg:w-auto">
            <img
              src="https://www.opusvirtualoffices.com/newsite/wp-content/themes/ThemeDec23/assets/images/grow-with.webp"
              alt="Modern city building"
              className="h-[280px] max-w-full md:h-[450px] lg:h-[592px] !w-full md:max-w-[576px] object-cover lg:min-w-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

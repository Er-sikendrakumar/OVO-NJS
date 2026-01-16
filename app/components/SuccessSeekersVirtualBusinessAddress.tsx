const successSeekers = [
  {
    title: "Consultants:",
    description:
      "Professionals who travel frequently and require a consistent address for correspondence.",
  },
  {
    title: "Remote Teams:",
    description:
      "Organizations with employees working from various locations, needing a centralized business address.",
  },
  {
    title: "Startups",
    description:
      "Young companies looking to save on overheads while establishing a professional image.",
  },
  {
    title: "International Companies:",
    description:
      "Firms wanting a presence in a new country or region without setting up a physical office.",
  },
  {
    title: "Freelancers:",
    description:
      "Independent professionals seeking a business address and phone number separate from their personal ones.",
  },
  {
    title: "E-commerce Businesses:",
    description:
      "Online retailers that need a physical address for returns and correspondence but don't have a brick-and-mortar store.",
  },
];

export default function SuccessSeekersVirtualBusinessAddress() {
  return (
    <section className="bg-[#F2F4F7] py-5 md:py-[60px]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 md:gap-8 px-4 sm:px-8">
        <div className="flex flex-col gap-3">
          <span className="text-[#026AA2] font-inter text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] font-semibold">
            Success Seekers
          </span>
          <div className="flex flex-col gap-4 md:gap-5">
            <h2 className="text-[#101828] font-inter text-[30px] leading-[38px] md:text-[36px] md:leading-[44px] tracking-[-0.72px] font-semibold ">
              Who Truly Benefits
              <br />
              from a Virtual Office?
            </h2>
            <p className="text-[#475467] font-inter text-[18px] font-normal leading-[28px] md:text-[20px] md:leading-[30px]">
              From budding entrepreneurs to established enterprises, a virtual
              office elevates professionalism and flexibility, setting the stage
              for success.
            </p>
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-10 md:gap-y-8 md:grid-cols-2">
          {successSeekers.map((item) => (
            <div key={item.title} className="flex flex-col gap-1 md:gap-2 md:max-w-[550px]">
              <h3 className="text-[#101828] font-inter text-[18px] font-semibold leading-[28px] md:text-[20px] md:font-bold md:leading-[30px]">
                {item.title}
              </h3>
              <p className="text-[#475467] font-inter text-[16px] font-normal leading-[24px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

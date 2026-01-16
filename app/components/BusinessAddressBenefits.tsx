type BenefitItem = {
  title: string;
  description: string;
};

const defaultItems: BenefitItem[] = [
  {
    title: "Prestigious Business Address",
    description:
      "Select one of our Virtual Offices locations as your primary business address and use it to receive all your mail and packages.",
  },
  {
    title: "Professional Mail Receipt",
    description:
      "Never Miss A Delivery - Our receptionists are there for you to receive any mail or packages, even when a signature is required.",
  },
  {
    title: "Privacy & Safety",
    description:
      "Ability to keep your cell phone number and home address private, so you can avoid unwanted visitors or solicitations. It also protects your packages and mail from theft.",
  },
];

type BusinessAddressBenefitsProps = {
  items?: BenefitItem[];
};

export default function BusinessAddressBenefits({
  items,
}: BusinessAddressBenefitsProps) {
  const displayItems =
    items && items.length > 0 ? items : defaultItems;

  return (
    <section className="w-full max-w-full bg-[#065986] py-16 lg:py-24 my-5 md:my-10">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 lg:gap-16 px-8 lg:flex-row">
        <div className="flex flex-col items-start gap-8 max-w-[360px] w-full">
          <h2 className="max-w-full text-[30px] leading-[38px] md:text-[36px] font-semibold md:leading-[44px] md:tracking-[-0.72px] text-white lg:max-w-[360px]">
            Establish your Corporate Presence with Opus
          </h2>
        </div>
        <div className="flex flex-col items-start gap-10 md:gap-8 max-w-[792px] w-full">
          {displayItems.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start gap-1"
            >
              <h4 className="text-[18px] font-semibold leading-[28px] text-white">
                {item.title}
              </h4>
              <p className="text-[16px] font-normal leading-[24px] text-[#B9E6FE]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

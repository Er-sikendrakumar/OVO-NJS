"use client";

type BenefitItem = {
  title: string;
  description: string;
};

type LiveReceptionistDetailsProps = {
  heading?: string;
  intro?: string;
  benefits?: BenefitItem[];
  imageSrc?: string;
  insetImageSrc?: string;
};

const leadBenefit: BenefitItem = {
  title: "Reliable Accessibility:",
  description:
    "Opus ensures that your business is always within reach, with live receptionists ready to answer your calls. With Opus VO's Live Call Answering Service you'll never miss another call, whether you're with a client, on the job or on the beach.",
};

const defaultBenefits: BenefitItem[] = [
  {
    title: "Professional Interaction:",
    description:
      "The service ensures that your calls will be handled with the highest level of professionalism and courtesy by live receptionists. This enhances the image and reliability of your business, helping to establish a strong and trustworthy presence.",
  },
  {
    title: "Communication Expertise:",
    description:
      "With a dedicated US-based live receptionist, your business is equipped with a professional voice at the front line. These receptionists specialize in effectively managing inbound calls, ensuring that your calls are answered promptly and transferred to the appropriate party anywhere throughout the world seamlessly.",
  },
];

export default function LiveReceptionistDetails({
  heading = "Benefits:",
  intro = "We're thrilled to announce a dynamic new partnership with Opus VO, bringing you the revolutionary Opus Live Call Answering Service. This collaboration is set to transform your business communications, combining our commitment to excellence with Opus's renowned expertise. Get ready to experience a new standard in client interaction and call management!",

  benefits = defaultBenefits,
  imageSrc = "/img-1.webp",
}: LiveReceptionistDetailsProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-5 md:py-20 lg:px-8">
      <div className="flex flex-col gap-5 md:gap-10">
        <div>
          {intro && (
            <p className="text-[24px] font-normal leading-8 text-black">
              {intro}
            </p>
          )}
        </div>
        <div className="grid gap-5 md:gap-8 lg:grid-cols-[1.2fr,1fr] lg:items-center">
          <div className="max-w-full md:max-w-[594px] flex flex-col gap-4 md:gap-8 text-[#2E323C] pb-5">
            <h2 className="font-inter text-[30px] font-semibold leading-[38px]">
              {heading}
            </h2>
            <p className="font-inter text-[24px] leading-8">
              <span className="font-bold text-[#63A1D7]">
                {leadBenefit.title}{" "}
              </span>
              <span className="font-normal text-[#2E323C] tracking-[-0.05px]">
                {leadBenefit.description}
              </span>
            </p>

            <ul className="space-y-5 font-inter">
              {benefits.map((benefit, index) => (
                <li key={benefit.title + index} className="relative pl-10 ">
                  <span className="absolute left-[12px] top-3 h-[6px] w-[6px] rounded-full bg-[#63A1D7]" />
                  <p className="text-[24px] font-bold leading-8 text-[#63A1D7]">
                    {benefit.title}

                    <span className="mt-1 text-[24px] font-normal leading-8 text-[#2E323C] tracking-[-0.15px] md:tracking-normal">
                      {benefit.description}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto flex max-w-full items-center justify-center lg:max-w-full">
            <div className="relative h-[303px] w-[303px] overflow-hidden shadow-[0px 0px 0 #00000070] md:h-[483px] md:w-[491px] xl:h-[583px] xl:w-[591px]">
              <img
                src={imageSrc}
                alt="Receptionist"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

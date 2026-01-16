const benefitItems = [
  {
    title: "🧑 Legal Professionals ",
    description:
      "Attorneys, paralegals, and notaries use virtual business addresses to maintain client trust and comply with privacy laws—without listing their home address.",
  },
  {
    title: "💼 Consultants & Freelancers",
    description:
      "Whether you're a marketing strategist or IT expert, a virtual address gives your business instant credibility, especially when pitching corporate clients.",
  },
  {
    title: "🛒 E-commerce & Online Sellers",
    description:
      "Use your address for business registration, returns, and shipping documentation—without dealing with customer mail at your home.",
  },
  {
    title: "🧘 Therapists & Coaches",
    description:
      "Keep your sessions virtual while still maintaining a compliant and professional business presence.",
  },
  {
    title: "📦 Real Estate Agents & Field-Based Teams",
    description:
      "Use a virtual address as your central hub for communications, client materials, and document processing.",
  },
];

export default function BenefitsVirtualBusinessAddress() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-5 sm:px-8 sm:py-10">
        <h3 className="text-[#3E465A] font-inter text-[30px] font-semibold leading-[38px]">
          Who Benefits From a Virtual Business Address?
        </h3>

        <div className="flex flex-col gap-4">
          {benefitItems.map((item, index) => (
            <div key={item.title} className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <p className="text-[#3E465A] font-inter text-[20px] font-semibold leading-[30px]">
                  {item.title}
                </p>
                <p className="text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
                  {item.description}
                </p>
              </div>

              {index < benefitItems.length - 1 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1216"
                  height="1"
                  viewBox="0 0 1216 1"
                  fill="none"
                  className="w-full"
                  aria-hidden="true"
                >
                  <path d="M0 0.5H1216" stroke="#D0D5DD" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

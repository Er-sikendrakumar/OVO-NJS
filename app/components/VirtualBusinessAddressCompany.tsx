const benefits = [
  "✅ Appear credible to banks, clients, and Google",
  "✅ Register your LLC or Corporation in any state",
  "✅ Separate your personal and business life",
  "✅ Stay compliant with business license regulations",
  "✅ Expand into new markets easily",
];

const includedItems = [
  "📍 A real commercial address (not a P.O. Box)",
  "☎️ A unique business phone number",
  "📨 Business voicemail to email",
  "👩‍💼 Live receptionist services",
  "📠 Fax number with email forwarding",
  "💼 Optional meeting room access in select locations",
  "🗂️ Mail forwarding, scanning, or pick-up options",
];

export default function VirtualBusinessAddressCompany() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 pt-[40px] pb-[40px] sm:px-8 sm:py-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-[#3E465A] font-inter text-[48px] font-semibold leading-[60px] tracking-[-0.96px]">
            Virtual Business Address for Your Company
          </h2>
          <p className="text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
            Establish credibility, protect your privacy, and simplify your business operations
            with a virtual business address from Opus Virtual Offices. Whether you&apos;re a
            solopreneur, a growing remote team, or an established enterprise looking to expand
            into new markets, a virtual address gives your business the presence it needs—without
            the overhead of a physical office.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[#3E465A] font-inter text-[30px] font-semibold leading-[38px]">
            What Is a Virtual Business Address?
          </h3>
          <div className="flex flex-col gap-[18px]">
          <p className="text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
            A virtual business address is a real, commercial street address you can use as your
            company&apos;s official business location. Unlike a P.O. Box, it&apos;s accepted by state
            and federal entities for business registration, bank accounts, and licensing. And
            unlike a home address, it protects your personal privacy and boosts your brand image.
          </p>
          <p className="text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
            With Opus, your virtual address includes professional mail handling, access to
            business phone and fax services, and the option to add on meeting rooms or live
            reception when needed.
          </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[#3E465A] font-inter text-[30px] font-semibold leading-[38px]">
            Why Use a Virtual Business Address?
          </h3>
          <div className="flex flex-col gap-[18px]">
          <p className="text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
            Opus helps you establish a professional presence in any city—without leasing office
            space or hiring a receptionist.
          </p>
          <ul className="flex flex-col gap-[12px] md:gap-[18px]">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[#3E465A] font-inter text-[30px] font-semibold leading-[38px]">
            Included With Every Opus Virtual Office Plan
          </h3>
           <div className="flex flex-col gap-[18px]">
          <p className="text-[#3E465A] font-inter text-[18px] font-normal leading-[28px]">
            Every Opus virtual business address includes much more than just mail handling:
          </p>
          <ul className="flex flex-col gap-[18px]">
            {includedItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3E465A] font-inter text-[18px] font-normal tracking-[-0.2px]  md:tracking-normal leading-[28px]">
                <span>{item}</span>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

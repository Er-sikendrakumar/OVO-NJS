type BookingProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonUrl: string;
};

export function Booking({
  title,
  subtitle,
  buttonText,
  buttonUrl,
}: BookingProps) {
  return (
    <section className="w-full max-w-[1280px] px-4 pb-10 pt-5 md:px-8 md:pt-10 md:pb-[80px] mx-auto">
      <div
        className="relative overflow-hidden rounded-[16px] border-[0px] border-[#273246]/50"
        style={{
          backgroundImage: `
                  linear-gradient(rgba(62,70,90,0.95), rgba(62,70,90,0.90)),
                  url(/booking.webp)
                `,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center 82%",
          backgroundSize: "cover",
        }}
      >
        {/* Background image */}
        <div className="" />

        {/* Dark overlay */}
        <div className="" />

        {/* Content */}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-y-8 py-10 px-6 md:px-16 md:py-16 text-white">
          <div className="flex flex-col gap-4 max-w-[720px]">
            <h2 className="text-[30px] leading-[38px] font-semibold">
              {title}
            </h2>
            <p className="text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] text-white/90">
              {subtitle}
            </p>
          </div>

          <a
            className="h-[60px] rounded-[8px] w-full md:w-auto bg-white px-[22px] py-4 text-[18px] leading-7 font-semibold text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-center !border !border-[#D0D5DD]"
            href={buttonUrl}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}

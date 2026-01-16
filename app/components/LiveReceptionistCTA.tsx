"use client";

type LiveReceptionistCTAProps = {
  headline?: string;
  callLabel?: string;
  phoneNumber?: string;
  backgroundImage?: string;
};

export default function LiveReceptionistCTA({
  headline = "Live Receptionist for only $79/month",
  callLabel = "CALL US",
  phoneNumber = "",
  backgroundImage = "/bg-2.webp",
}: LiveReceptionistCTAProps) {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  const telValue =
    digitsOnly.length === 10
      ? `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
      : phoneNumber.replace(/[^\d-+]/g, "");

  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="mx-auto max-w-[1280px] px-4 py-5 md:py-[40px] lg:px-8">
        <div className="flex flex-col gap-1 md:gap-4 lg:flex-row items-center md:justify-between md:min-h-[54px]">
          <h3
            id="included-features"
            className="font-inter text-[20px] leading-[30px] font-semibold md:leading-[38px] text-white md:text-[30px]"
          >
            {headline}
          </h3>

          <a
            href={`tel:+18669932850`}
            className="font-semibold text-[#88FFA2] transition text-[24px] leading-8"
          >
            {callLabel}&nbsp; {phoneNumber}
          </a>
        </div>
      </div>
    </section>
  );
}

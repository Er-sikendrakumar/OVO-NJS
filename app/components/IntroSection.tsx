export function IntroSection() {
  return (
    <section className="w-full flex justify-center bg-white">
      <div className="w-full max-w-[1280px] px-8 pt-5 lg:pt-10 pb-12 mx-auto text-center">
        {/* Small Label */}
        <p
          className="
            text-[14px] lg:text-[16px]
            font-semibold
            leading-[20px] lg:leading-[24px]
            text-[#026AA2]
            [font-family:var(--Font-family-font-family-body,Inter)]
            mb-3"
        >
          Is it for me?
        </p>

        {/* Main Heading */}
        <h1
          className="
          max-w-[768px] mx-auto
             text-[36px] lg:text-[48px] sm:text-[40px] md:text-[48px]
            leading-[44px] lg:leading-[60px] sm:leading-[50px] md:leading-[60px]
            font-semibold
            tracking-[-0.72px] lg:tracking-[-0.96px]
            text-[#181D27]
            [font-family:var(--Font-family-font-family-display,Inter)]
           mb-4 lg:mb-6 
          "
        >
          If you’re ready to elevate your business image and cut costs, it’s
          made for you.
        </h1>

        {/* Description */}
        <p
          className="
          mx-auto max-w-[766px]
          text-center
          text-[18px] lg:text-[20px]
          leading-[28px] lg:leading-[30px]
          font-normal
          text-[#535862]
          [font-family:var(--Font-family-font-family-body,Inter)]"
        >
          Opus provides freelancers, small business owners, and professionals in
          legal, business, or home services with the structure they need to
          grow, complete with a prestigious business address, professional live
          call answering, and business phone tools that help you look
          established from day one — all for less than the cost of hiring a
          single employee.
        </p>
      </div>
    </section>
  );
}

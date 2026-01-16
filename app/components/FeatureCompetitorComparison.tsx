type FeatureCompetitorComparisonProps = {
  content: {
    hero: {
      title: string;
      subtitle: string;
    };
  };
};

export function FeatureCompetitorComparison({
  content,
}: FeatureCompetitorComparisonProps) {
  const { title, subtitle } = content.hero;

  return (
    <section className="max-w-[1280px] m-auto px-4 lg:px-8 pt-[20px] pb-[40px] md:py-[40px] text-center">
      <div className="w-full max-w-[768px] m-auto flex flex-col text-center justify-center gap-3">
        <h1 className="text-[#101828] text-center font-semibold text-[36px] leading-[44px] tracking-[-0.72px] md:text-[48px] md:leading-[60px] md:tracking-[-0.96px]">
          {title}
        </h1>

        <p className="text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] font-normal text-[#475467] w-full max-w-[568px] m-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

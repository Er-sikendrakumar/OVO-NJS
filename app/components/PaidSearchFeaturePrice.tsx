import { ComparisonData } from "./FeatureComparisonTable";
import { FeatureComparisonTablePaidSearch } from "./FeatureComparisonTablePaidSearch";

type FeaturePriceDetailsTableAddressProps = {
  comparison: ComparisonData;
};

export function FeaturePriceDetailsTableAddress({
  comparison,
}: FeaturePriceDetailsTableAddressProps) {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-0 pb-[20px] md:pt-20 md:pb-[40px]">
      <div className="w-full">
        <div className="flex flex-col gap-[18px] md:gap-8 items-start w-full">
          <div className="w-full">
            <FeatureComparisonTablePaidSearch comparison={comparison} />
          </div>
        </div>
      </div>
    </section>
  );
}

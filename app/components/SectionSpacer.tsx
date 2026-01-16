interface SectionSpacerProps {
  size?: 'default';
}

export function SectionSpacer({ size = 'default' }: SectionSpacerProps) {
  return <div className="h-[40px] lg:h-[80px] w-full" aria-hidden="true" />;
}

// components/ui/Spacing.tsx
import React from "react";

type SpacingProps = {
  /** Same vertical spacing for top & bottom */
  vertical?: number;

  /** Same horizontal spacing for left & right */
  horizontal?: number;

  /** Individual side spacing overrides */
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;

  /** Optional: render as block, inline-block, etc */
  display?: React.CSSProperties["display"];
};

const Spacing: React.FC<SpacingProps> = ({
  vertical,
  horizontal,
  top,
  right,
  bottom,
  left,
  display = "block",
}) => {
  return (
    <div
      style={{
        display,
        marginTop: top ?? vertical ?? 0,
        marginBottom: bottom ?? vertical ?? 0,
        marginLeft: left ?? horizontal ?? 0,
        marginRight: right ?? horizontal ?? 0,
      }}
    />
  );
};

export default Spacing;

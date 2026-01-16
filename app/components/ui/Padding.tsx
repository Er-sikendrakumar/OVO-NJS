"use client";

import { useEffect, useState } from "react";

interface PaddingProps {
  mobile?: string;   // "12px"
  desktop?: string;  // "24px"
}

export default function Padding({
  mobile = "0px",
  desktop = "0px",
}: PaddingProps) {
  const [padding, setPadding] = useState(mobile); // initial SSR-safe value

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setPadding(desktop);
    } else {
      setPadding(mobile);
    }
  }, [mobile, desktop]);

  return <div style={{ paddingTop: padding }} />;
}

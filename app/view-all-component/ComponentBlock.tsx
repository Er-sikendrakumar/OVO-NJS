"use client";

import React from "react";
import { useComponentFilter } from "@/app/view-all-component/ComponentFilterContext";

type ComponentBlockProps = {
  name: string;
  jsonName: string;
  children: React.ReactNode;
};

export function ComponentBlock({ name, jsonName, children }: ComponentBlockProps) {
  const { activeComponent } = useComponentFilter();

  if (activeComponent && activeComponent !== name) {
    return null;
  }

  return (
    <div className="component-block w-full py-5 border border-[#0BA5EC] px-[10px]">
      <h2 className="md:text-[36px] md:leading-[44px] md:tracking-[-0.72px] justify-center flex flex-col md:flex-row font-semibold text-center text-[#026aa2] pb-[20px]">
        Component Name: "{name}"
      </h2>
      <h4 className="text-[20px] leading-[30px] md:text-[36px] md:leading-[44px] tracking-[-0.72px] font-semibold text-center text-[#026aa2] pb-[12px]">
        JSON Name : "{jsonName}"
      </h4>
      {children}
    </div>
  );
}

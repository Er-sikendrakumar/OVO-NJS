"use client";

import React, { useState } from "react";
import { ComponentsShowcaseA } from "@/app/view-all-component/ComponentsShowcaseA";
import { ComponentsShowcaseB } from "@/app/view-all-component/ComponentsShowcaseB";
import { ComponentFilterProvider } from "@/app/view-all-component/ComponentFilterContext";
import { componentGroups } from "@/app/view-all-component/component-list";

export default function ViewAllComponentPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const totalComponents = componentGroups.reduce(
    (count, group) => count + group.items.length,
    0
  );

  const handleSelect = (name: string | null) => {
    setActiveComponent(name);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="w-full px-4 py-8 flex flex-col gap-10 pt-[72px] lg:pt-[104px]">
      <div className="w-full py-5 max-w-[1280px] m-auto px-4 md:px-8 flex items-center flex-col justify-center gap-4">
        <h1 className="text-[48px] leading-[60px] tracking-[-0.96px] font-bold text-center">
          All Components
        </h1>
      </div>

      <div className="w-full max-w-[1680px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10 px-4 md:px-8">
        <aside className="lg:w-[320px] w-full lg:sticky lg:top-[96px] h-fit border border-[#0BA5EC] rounded-[12px] p-4 bg-white">
          <div className="flex flex-col gap-3 pb-4 border-b border-[#E2E8F0]">
            <div className="text-[18px] font-semibold text-[#026aa2]">Component List</div>
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className="w-full rounded-[8px] border border-[#0BA5EC] px-3 py-2 text-left font-semibold text-[#026aa2] hover:bg-[#E6F7FF]"
            >
              Show All Components ({totalComponents})
            </button>
            {activeComponent ? (
              <div className="text-[14px] text-[#475467]">
                Showing: <span className="font-semibold">{activeComponent}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
            {componentGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-2">
                <div className="text-[14px] uppercase tracking-[0.08em] text-[#667085] font-semibold">
                  {group.title}
                </div>
                <div className="flex flex-col gap-1">
                  {group.items.map((name) => {
                    const isActive = activeComponent === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleSelect(name)}
                        className={`text-left px-2 py-1 rounded-[6px] text-[14px] ${
                          isActive
                            ? "bg-[#0BA5EC] text-white font-semibold"
                            : "text-[#0F172A] hover:bg-[#F1F5F9]"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex-1 flex flex-col gap-10 overflow-hidden">
          <ComponentFilterProvider activeComponent={activeComponent}>
            <ComponentsShowcaseA />
            <ComponentsShowcaseB />
          </ComponentFilterProvider>
        </div>
      </div>
    </main>
  );
}

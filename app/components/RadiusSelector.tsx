"use client";

import { ChevronDown, MapPin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type RadiusOption = {
  value: number;
  label: string;
};

const DEFAULT_OPTIONS: RadiusOption[] = [
  { value: 5, label: "5 Miles Radius" },
  { value: 10, label: "10 Miles Radius" },
  { value: 15, label: "15 Miles Radius" },
  { value: 20, label: "20 Miles Radius" },
  { value: 50, label: "50 Miles Radius" },
];

interface RadiusSelectorProps {
  options?: RadiusOption[];
  placeholder?: string;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

function RadiusSelector({
  options = DEFAULT_OPTIONS,
  placeholder = "Select Radius",
  defaultValue,
  value,
  onChange,
}: RadiusSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedRadius] = useState<string | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<number | null>(
    defaultValue ?? null
  );

  useEffect(() => {
    if (value !== undefined) return;
    setUncontrolledValue(defaultValue ?? null);
  }, [defaultValue, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const activeValue = value ?? uncontrolledValue;
  const selected =
    options.find((option) => option.value === activeValue) ?? null;

  const handleSelect = (option: RadiusOption) => {
    console.log("value:", option);

    setSelectedRadius(option.label); // ✅ ALWAYS set local state

    setIsOpen(false);

    if (onChange) {
      onChange(option.value);
    }
  };

  return (
    <div className="max-w-[514px] w-full relative" ref={dropdownRef}>
      <div
        className="font-inter font-medium text-[25.7px] leading-[38.55px] text-[#101828] w-full lg:h-[71.13px] h-[56.13px] border-[1.61px] border-[#D0D5DD] rounded-[12.85px] px-[22px] py-[16px] gap-[12px] flex items-center cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapPin className="lg:w-[32.13px] lg:h-[32.13px] w-[23.13px] h-[23.13px] text-[#667085] flex-shrink-0" />

        <span className="flex-1 font-inter font-medium text-[20.82px] lg:text-[25.7px] leading-[38.55px] text-[#101828]">
          {selectedValue ? selectedValue : placeholder}
        </span>

        <ChevronDown
          className={`lg:w-[33px] lg:h-[33px] w-[23.13px] h-[23.13px] text-[#667085] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`absolute top-full left-0 right-0 mt-[10px] bg-white border border-[#caced1] rounded-[12.85px] shadow-[0_10px_25px_rgba(0,0,0,0.2)] z-50 max-h-[200px] overflow-y-auto transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-[20px] py-[12px] hover:bg-[#f5f7fa] cursor-pointer font-inter font-medium text-[18px] text-[#101828]"
            >
              {option.label}
            </div>
          ))
        ) : (
          <div className="px-[20px] py-[12px] text-center font-inter text-[#667085]">
            No options available
          </div>
        )}
      </div>
    </div>
  );
}

export default RadiusSelector;

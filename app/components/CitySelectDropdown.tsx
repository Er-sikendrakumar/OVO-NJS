'use client';

import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";

interface CitySelectDropdownProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function CitySelectDropdown({
  options,
  placeholder = "Select Your City",
  value,
  onChange,
}: CitySelectDropdownProps) {

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-sm lg:max-w-[514px]">

      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
    flex items-center justify-between
    w-full 
    px-[22.488px] py-[16.063px]
    gap-[12.85px]
    rounded-[12.85px]
    border-[1.606px] border-[#D0D5DD]
    bg-white
    shadow-[0_1.606px_3.213px_rgba(16,24,40,0.05)]
    text-[15px] font-medium text-[#1A1F36]
  "
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#5A6474]" />
          <span className={value ? "text-[#1A1F36]" : "text-[#5A6474]"}>
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-[#5A6474] transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>


      {/* Dropdown Menu */}
      {open && (
        <ul
          className="
            absolute left-0 right-0 mt-2
            bg-white border border-[#E2E4EA]
            rounded-xl shadow-md z-20
            max-h-60 overflow-y-auto
          "
        >
          {options.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No cities available</li>
          )}

          {options.map((city) => (
            <li
              key={city}
              onClick={() => {
                onChange?.(city);
                setOpen(false);
              }}
              className="
                px-4 py-2 cursor-pointer
                hover:bg-gray-100 rounded-lg
              "
            >
              {city}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

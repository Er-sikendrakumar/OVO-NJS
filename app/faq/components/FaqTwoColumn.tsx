"use client";

import { useMemo, useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import Padding from "@/app/components/ui/Padding";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

interface FaqCategoryNavProps {
  categories: FaqCategory[];
  activeId: string;
  onSelect: (id: string) => void;
}

interface FaqAccordionListProps {
  items: FAQItem[];
}

function FaqCategoryNav({
  categories,
  activeId,
  onSelect,
}: FaqCategoryNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="w-full lg:max-w-[343px]">
      <div className="block lg:hidden lg:pb-3">
        <div className="rounded-[8px]  lg:rounded-[12px] border-[#EAECF0] bg-white overflow-hidden flex flex-col gap-1 shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),0_4px_6px_-2px_rgba(16,24,40,0.03)]">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full h-[44px] lg:h-[60px] flex items-center justify-between bg-[#36BFFA] text-white px-4 py-[10px] rounded-[8px] text-[16px] lg:text-[18px] font-semibold leading-[24px] lg:leading-[28px]"
            aria-expanded={isOpen}
          >
            <span>
              {categories.find((c) => c.id === activeId)?.label ??
                "Select a category"}
            </span>
            <span className="w-[20px] h-[20px]">
            <svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
>
  <path
    d="M10 2V18M10 18L17 11M10 18L3 11"
    stroke="#7CD4FD"
    strokeWidth="1.66667"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

            </span>
          </button>

          {isOpen && (
            <div className="bg-white rounded-[8px] shadow-[0_10px_25px_-10px_rgba(16,24,40,0.35)] overflow-hidden py-1">
              {categories
                .filter((category) => category.id !== activeId)
                .map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleSelect(category.id)}
                    className="w-full  text-left px-4 py-[10px] text-[14px] leading-[20px] lg:text-[16px] lg:leading-[24px] font-medium text-[#344054]"
                  >
                    {category.label}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-col gap-2 py-2 w-full pb-2">
        {categories.map((category) => {
          const isActive = category.id === activeId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className={`w-full  rounded-[8px] border text-left lg:h-[60px] px-5 py-4 text-[18px] leading-[28px] font-semibold transition-colors ${
                isActive
                  ? "bg-[#36BFFA] text-white hover:bg-[#026AA2] hover:text-white border-transparent shadow-[0_10px_15px_-3px_rgba(11,165,236,0.2)] lg:shadow-none"
                  : "bg-white text-[#414651] border-[#D5D7DA] hover:border-[#D0D5DD] hover:bg-[#026AA2] hover:text-white"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FaqAccordionList({ items }: FaqAccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  console.log("items:", items);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="lg:px-8 w-full">
      <div className="flex flex-col w-full bg-white rounded-[12px] overflow-hidden gap-[16px] lg:gap-[4px] lg:divide-y divide-[#E9EAEB]">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="flex flex-col ">
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className={`
                  w-full flex items-start justify-between gap-[8px] lg:gap-6 text-left focus:outline-none rounded-[16px] p-5 lg:p-0 lg:rounded-[0px] ${
                    isOpen && "bg-[#F9FAFB] lg:bg-white"
                  }
                  ${index === 0 ? "lg:pt-[12px]" : "lg:pt-6"}
                  ${index === items.length - 1 ? "lg:pb-[12px]" : "lg:pb-6"}
                `}
                aria-expanded={isOpen}
              >
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex flex-row justify-between">
                    <span className="text-[#101828] text-[18px] font-medium leading-[28px]">
                      {item.question}
                    </span>
                  </div>
                  {isOpen && (
                    <span className="text-[#475467] text-[16px] leading-[24px] font-normal">
                      {item.answer}
                    </span>
                  )}
                </div>
               <span className="mt-[2px]">
                {isOpen ? (
                  <MinusCircle
                    className="w-6 h-6 text-[#98A2B3]"
                    aria-hidden="true"
                  />
                ) : (
                  <PlusCircle
                    className="w-6 h-6 text-[#98A2B3]"
                    aria-hidden="true"
                  />
                )}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface FaqTwoColumnProps {
  categories: FaqCategory[];
  searchResults?: FAQItem[] | null;
}

export function FaqTwoColumn({ categories, searchResults }: FaqTwoColumnProps) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");

  const isSearchMode = searchResults !== null && searchResults !== undefined;

  const itemsToShow = useMemo(() => {
    if (isSearchMode) {
      return searchResults;
    }
    return categories.find((category) => category.id === activeId)?.items ?? [];
  }, [isSearchMode, searchResults, activeId, categories]);

  return (
    <section className="w-full flex justify-center bg-white">
      <div className="max-w-[1280px] w-full ">
        <div className="flex-col flex lg:flex-row px-8 lg:px-8 gap-12 lg:gap-6">
          {!isSearchMode && (
            <FaqCategoryNav
              categories={categories}
              activeId={activeId}
              onSelect={setActiveId}
            />
          )}

          <div className="w-full">
            {isSearchMode && (
              <h2 className="text-[#101828] font-semibold text-[24px] leading-[32px] lg:text-[30px] lg:leading-[38px] mb-6 lg:mb-8">
                Search Results ({itemsToShow.length} found)
              </h2>
            )}

            {itemsToShow.length > 0 ? (
              <FaqAccordionList items={itemsToShow} />
            ) : isSearchMode ? (
              <div className="lg:px-8 w-full">
                <div className="flex flex-col items-center justify-center py-12 px-6 bg-[#F9FAFB] rounded-[12px]">
                  <p className="text-[#475467] text-[16px] leading-[24px] text-center">
                    No FAQs match your search. Try different keywords.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

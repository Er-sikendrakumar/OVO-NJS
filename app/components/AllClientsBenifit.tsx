"use client";

import { useEffect, useMemo, useState } from "react";
import { DealsPagination } from "./DealsPagination";

export interface DealItem {
  name: string;
  category: string;
  offer: string;
  description: string;
  image: string;
  url: string;
}
export interface AllClientsBenefitProps {
  deals: DealItem[];
}

const DEALS_PER_PAGE = 8;

function normalizeCategory(category: string) {
  return category.trim().toLowerCase();
}

function formatCategoryLabel(category: string) {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getCategoryColor(category: string): string {
  const normalized = normalizeCategory(category);
  const colorMap: Record<string, string> = {
    "business tools": "#47CD89",
    "setup your business": "#7A5AFF",
    "marketing tools": "#F38744",
    "shipping deals": "#53B1FD",
    "travel": "#f6041c",
  };
  return colorMap[normalized] || "#47CD89"; // Default to green if category not found
}

function getPaginationItems(totalPages: number, currentPage: number) {
  const items: Array<number | "ellipsis"> = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page += 1) {
      items.push(page);
    }
    return items;
  }

  items.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) {
    items.push("ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < totalPages - 1) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items;
}

export default function AllClientsBenifit({ deals }: AllClientsBenefitProps) {
  const categories = useMemo(
    () =>
      [...new Set(deals.map((item) => normalizeCategory(item.category)))].map(
        (category) => formatCategoryLabel(category)
      ),
    [deals]
  );

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredDeals = useMemo(
    () =>
      activeCategory === "all"
        ? deals
        : deals.filter(
            (deal) => normalizeCategory(deal.category) === activeCategory
          ),
    [activeCategory, deals]
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredDeals.length / DEALS_PER_PAGE)),
    [filteredDeals.length]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedDeals = useMemo(() => {
    const startIndex = (currentPage - 1) * DEALS_PER_PAGE;
    return filteredDeals.slice(startIndex, startIndex + DEALS_PER_PAGE);
  }, [currentPage, filteredDeals]);

  const paginationItems = useMemo(
    () => getPaginationItems(totalPages, currentPage),
    [currentPage, totalPages]
  );

  const handleCategorySelect = (category: string) => {
    setActiveCategory(normalizeCategory(category));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage((prev) => {
      const nextPage = Math.min(Math.max(pageNumber, 1), totalPages);
      return nextPage === prev ? prev : nextPage;
    });
  };

  return (
    <main className="w-full pt-[72px] lg:pt-[104px]">
      <section className="w-full flex justify-center items-center pt-0 lg:pt-10 lg:py-10  lg:bg-[#EAECF0] bg-white">
        <div className="flex flex-col items-center justify-center pt-5 md:pt-8 pb-10 md:pb-12 px-4 md:px-8 lg:px-16 bg-[#FFF] max-w-[1280px] w-full ">
          <div className="flex flex-col gap-8 w-full lg:max-w-[1152px] ">
            <div className="flex flex-col gap-1">
              <h1 className="text-[30px] font-semibold font-inter leading-[38px] text-[#101828]">
                Opus Benefits
              </h1>
              <p className="md:text-[16px] font-normal font-inter md:leading-[24px] text-[#475467]">
                We've selected partners who understand what entrepreneurs and
                business owners need most. These offers are handpicked to add
                real value to your business journey - saving you time, money,
                and effort.
              </p>
            </div>
            <div className="w-full flex flex-col gap-6">
              <div
                className=" flex items-center w-max border border-[#D0D5DD]  shadow-[0_1px_2px_rgba(16,24,40,0.05)] rounded-[8px]
                  max-w-full overflow-x-auto whitespace-nowrap scrollbar-hide "
              >
                <button
                  type="button"
                  onClick={() => handleCategorySelect("all")}
                  className={`px-4 py-2 text-[14px] font-semibold  leading-[20px] border-r border-[#D0D5DD] ${
                    activeCategory === "all"
                      ? "bg-[#fff] text-[#182230]"
                      : "bg-[#fff] text-[#344054] hover:bg-[#F2F4F7]"
                  }`}
                  aria-pressed={activeCategory === "all"}
                >
                  All
                </button>
                {categories.map((category) => {
                  const normalized = normalizeCategory(category);
                  const isActive = activeCategory === normalized;
                  return (
                    <button
                      type="button"
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-4 py-2 text-[14px] font-semibold h-[38px] leading-[20px] border-r border-[#D0D5DD] ${
                        !isActive
                          ? "bg-[#fff] text-[#182230] opacity-30"
                          : "bg-[#F2F4F7] text-[#182230] hover:bg-[#EAECF0]"
                      }`}
                      aria-pressed={isActive}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {filteredDeals.length === 0 ? (
                <div className="py-8 text-center text-[14px] text-[#475467]">
                  No deals available for this category.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                    {paginatedDeals.map((card, index) => {
                      const categoryColor = getCategoryColor(card.category);
                      return (
                      <div
                        key={index}
                        className="md:max-w-[276px] flex flex-col gap-3 p-3 items-center rounded-[20px] shadow-[0_4px_8px_-2px_rgba(16,24,40,0.10),0_2px_4px_-2px_rgba(16,24,40,0.06)] w-full h-full"
                      >
                        <div className="flex w-full flex-col justify-center ">
                          <div className="w-full bg-white rounded-tl-[16px] rounded-tr-[16px] shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)] p-2 flex justify-center items-center">
                            <div className="flex items-center gap-[14px] py-8 w-full justify-center h-[205px] md:h-[123px]">
                              <img
                                src={card.image}
                                alt={card.name}
                                className="cover"
                              />
                            </div>
                          </div>

                          {/* Category Label */}
                          <div
                            className="text-center text-white text-[12px] font-bold font-inter leading-[18px] rounded-bl-[16px] rounded-br-[16px] px-2"
                            style={{ backgroundColor: categoryColor }}
                          >
                            <p className="text-[12px] leading-[18px] font-bold">
                              {formatCategoryLabel(card.category)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-[6px] justify-center items-center flex-grow">
                          <span className="px-3  py-1 h-[28px] rounded-[16px] border border-[#EAECF0] bg-[#F9FAFB] text-[14px] font-medium leading-[20px] text-[#344054]">
                            {card.offer}
                          </span>

                          <p className="text-[13.187px] leading-[19.63px] md:text-[13.087px] font-inter font-medium md:leading-[19.63px] text-[#98A2B3] text-start">
                            {card.description}
                          </p>
                        </div>

                        <a
                          href={card.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-center items-center gap-[4px] px-[12px] py-[8px] rounded-[8px] bg-[#36BFFA] text-white font-semibold text-[14px] font-inter leading-[20px] hover:bg-[#026aa2] mt-auto"
                        >
                          Get Deal
                        </a>
                      </div>
                      );
                    })}
                  </div>
                  <DealsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    paginationItems={paginationItems}
                    goToPage={goToPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

interface DealsPaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItems: Array<number | "ellipsis">;
  goToPage: (page: number) => void;
}

export function DealsPagination({
  currentPage,
  totalPages,
  paginationItems,
  goToPage,
}: DealsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="w-full">
      <nav
        aria-label="Deals pagination"
        className="flex w-full items-center justify-between pt-4 md:pt-5 border-t border-[#EAECF0] md:hidden"
      >
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-[6px] text-[14px] leading-[20px] font-semibold text-[#475467] p-2 border border-[#D0D5DD] rounded-[8px] h-9 disabled:text-[#D0D5DD]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.8333 9.99996H4.16667M4.16667 9.99996L10 15.8333M4.16667 9.99996L10 4.16663"
              className={`${currentPage === 1 ? "opacity-30" : ""}`}
              stroke="#475467"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            className="text-[14px] leading-[20px] font-medium text-[#182230] transition-colors"
          >
            Page {currentPage} of {totalPages}
          </button>
        </div>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 text-[14px] leading-[20px] font-semibold text-[#475467] p-2 border border-[#D0D5DD] rounded-[8px] h-9 disabled:text-[#D0D5DD]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4.16663 9.99996H15.8333M15.8333 9.99996L9.99996 4.16663M15.8333 9.99996L9.99996 15.8333"
              className={`${currentPage === totalPages ? "opacity-30" : ""}`}
              stroke="#475467"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>

      <nav
        aria-label="Deals pagination"
        className="w-full items-center justify-between pt-4 md:pt-5 border-t border-[#EAECF0] hidden md:flex"
      >
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-[6px] text-[14px] leading-[20px] font-semibold text-[#475467] disabled:text-[#D0D5DD]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.8333 9.99996H4.16667M4.16667 9.99996L10 15.8333M4.16667 9.99996L10 4.16663"
              className={`${currentPage === 1 ? "opacity-30" : ""}`}
              stroke="#475467"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-[2px]">
          {paginationItems.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 text-[14px] text-[#475467]"
              >
                ...
              </span>
            ) : (
              <button
                type="button"
                key={`page-${item}`}
                onClick={() => goToPage(item)}
                aria-current={currentPage === item ? "page" : undefined}
                className={`h-10 w-10 p-2 rounded-full text-[14px] leading-[20px] font-medium text-[#182230] transition-colors ${
                  currentPage === item
                    ? "bg-[#F2F4F7] shadow-inner"
                    : "hover:bg-[#F2F4F7]"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-[6px] text-[14px] leading-[20px] font-semibold text-[#475467] disabled:text-[#D0D5DD]"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M4.16663 9.99996H15.8333M15.8333 9.99996L9.99996 4.16663M15.8333 9.99996L9.99996 15.8333"
              className={`${currentPage === totalPages ? "opacity-30" : ""}`}
              stroke="#475467"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
}

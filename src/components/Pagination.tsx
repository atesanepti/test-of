import { cn } from "@/lib/utils";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalFound: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalFound,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalFound / 10);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 4; // Number of pages to display at a time
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          onClick={() => handlePageChange(1)}
          className={cn(
            "text-xs text-white cursor-pointer rounded-md  hover:bg-muted-foreground transition-colors px-2 py-1"
          )}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots-start" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={cn(
            "text-xs text-white cursor-pointer rounded-md  hover:bg-muted-foreground transition-colors px-2 py-1",
            `${currentPage == i && "bg-muted-foreground"}`
          )}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots-end" className="px-2">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 m-1 rounded-md bg-gray-200"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };
  return (
    <div className="flex items-center justify-center my-10">
      <div className="flex gap-1 items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-xs text-white cursor-pointer rounded-md bg-muted-foreground hover:bg-muted-foreground/90 transition-colors px-2 py-1 disabled:opacity-50"
        >
          <ChevronLeftCircle className="w-4 h-4" />
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-xs text-white cursor-pointer rounded-md bg-muted-foreground hover:bg-muted-foreground/90 transition-colors px-2 py-1 disabled:opacity-50"
        >
          <ChevronRightCircle className="w-4 h-4 " />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

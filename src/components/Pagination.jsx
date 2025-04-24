
import React from "react";
import { Button } from "@/components/ui/button";

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex justify-center gap-2 flex-wrap">
      <Button
        onClick={() => onPageChange(1)}
        variant="outline"
        disabled={currentPage === 1}
      >
        Primeira
      </Button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNum;
        if (totalPages <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }
        return (
          <Button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            variant={currentPage === pageNum ? "default" : "outline"}
            className={currentPage === pageNum ? "bg-[#37a76f]" : ""}
          >
            {pageNum}
          </Button>
        );
      })}
      <Button
        onClick={() => onPageChange(totalPages)}
        variant="outline"
        disabled={currentPage === totalPages}
      >
        Última
      </Button>
    </div>
  );
});

export default Pagination;

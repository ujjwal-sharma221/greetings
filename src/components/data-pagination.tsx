import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DataPagination({
  page,
  totalPages,
  onPageChange,
}: DataPaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex-1 text-sm">
        Page {page} of {totalPages ?? 1}
      </div>
      <div className="flex items-center justify-end gap-x-2 py-4">
        <Button
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="group"
          variant="outline"
        >
          <ArrowLeftIcon
            className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          size="sm"
          disabled={page === totalPages || totalPages === 0}
          className="group"
        >
          Next
          <ArrowRightIcon
            className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}

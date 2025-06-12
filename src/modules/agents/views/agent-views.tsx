"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import { useAgentsFilters } from "../hooks/use-agent-filters";

export function AgentsView() {
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions(filters));

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
}

interface DataPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function DataPagination({
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

"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";

import { DEFAULT_PAGE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { NewAgentDialog } from "./new-agent-dialog";
import { SearchFilter } from "./agents-search-filter";
import { LuxeButton } from "@/components/custom-buttons";
import { useAgentsFilters } from "../hooks/use-agent-filters";

export function ListHeader() {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE });
  };

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My agents</h5>
          <LuxeButton
            onClick={() => setIsDialogOpen(true)}
            variant="rotate-border"
            className="text-black"
          >
            New Agent
          </LuxeButton>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <SearchFilter />
          {isAnyFilterModified && (
            <Button variant="outline" size="sm" onClick={onClearFilters}>
              <XIcon />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

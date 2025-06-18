"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusFilter } from "./status-filters";
import { AgentIdFilter } from "./agent-id-filter";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { LuxeButton } from "@/components/custom-buttons";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { useMeetingsFilter } from "../hooks/use-meetings-filters";

export function MeetingListHeader() {
  const [filters, setFilters] = useMeetingsFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: 1,
    });
  };

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <LuxeButton
            onClick={() => setIsDialogOpen(true)}
            variant="rotate-border"
            className="text-black"
          >
            New Meeting
          </LuxeButton>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <MeetingsSearchFilter />
          <StatusFilter />
          <AgentIdFilter />

          {isAnyFilterModified && (
            <Button variant="outline" onClick={onClearFilters}>
              <XCircle className="size-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

import { LuxeButton } from "@/components/custom-buttons";
import { NewMeetingDialog } from "./new-meeting-dialog";

export function MeetingListHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      </div>
    </>
  );
}

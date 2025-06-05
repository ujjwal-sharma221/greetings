"use client";

import { useState } from "react";

import { NewAgentDialog } from "./new-agent-dialog";
import { LuxeButton } from "@/components/custom-buttons";

export function ListHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My agents</h5>
          <LuxeButton
            onClick={() => setIsDialogOpen(true)}
            variant="rotate-border"
          >
            New Agent
          </LuxeButton>
        </div>
      </div>
    </>
  );
}

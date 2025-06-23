"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { CallProvider } from "../components/call-provider";

export function CallView({ meetingId }: { meetingId: string }) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  if (data.status === "completed") {
    return (
      <div className="h-screen">
        <ErrorState
          title="This meeting has ended"
          description="You can't join an ended meeting"
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
}

"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      Meetings view
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

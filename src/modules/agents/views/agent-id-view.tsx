"use client";

import { VideoIcon } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { LuxeBadge } from "@/components/custom-badge";
import { GeneratedAvatar } from "@/components/generated-avatars";
import { AgentIdViewHeader } from "../components/agent-id-view-header";

interface AgentIdViewProps {
  agentId: string;
}

export function AgentIdView({ agentId }: AgentIdViewProps) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="rounded-lg border">
        <div className="col-span-5 flex flex-col gap-y-4 px-4 py-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variants="dylan"
              seed={data.name}
              className="size-10"
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
            <LuxeBadge
              variant="shine"
              className="flex items-center gap-x-2 text-white [&>svg]:size-4"
            >
              <VideoIcon />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </LuxeBadge>
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-medium">Instructions</p>
            <p>{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

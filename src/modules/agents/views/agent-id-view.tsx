"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { useConfirm } from "@/hooks/use-confirm";
import { LuxeBadge } from "@/components/custom-badge";
import { UpdateDialog } from "../components/update-agent-dialog";
import { GeneratedAvatar } from "@/components/generated-avatars";
import { AgentIdViewHeader } from "../components/agent-id-view-header";

interface AgentIdViewProps {
  agentId: string;
}

export function AgentIdView({ agentId }: AgentIdViewProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );
        router.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove ${data.meetingCount} associated meetings`,
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }

    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
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
    </>
  );
}

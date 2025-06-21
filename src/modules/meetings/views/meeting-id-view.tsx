"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";

interface MeetingIdViewProps {
  meetingId: string;
}

export function MeetingIdView({ meetingId }: MeetingIdViewProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  const [updateMeetingDialog, setUpdateMeetingDialog] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "The following action is irreversible and will remove the meeting",
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    }),
  );

  const handleMeetingRemove = async () => {
    console.log("HANDLE_REMOVE_MEETING_TRIGGERED");

    const ok = await confirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialog}
        onOpenChange={setUpdateMeetingDialog}
        initialValues={data}
      />
      <div className="flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialog(true)}
          onRemove={handleMeetingRemove}
        />
        {JSON.stringify(data, null, 2)}
      </div>
    </>
  );
}

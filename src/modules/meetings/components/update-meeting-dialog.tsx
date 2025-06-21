import { useRouter } from "next/navigation";

import { MeetingsGetOne } from "../types";
import { MeetingForm } from "./meeting-form";
import { ResponsiveDialog } from "@/components/responsive-dialog";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
}

export function UpdateMeetingDialog({
  onOpenChange,
  open,
  initialValues,
}: UpdateMeetingDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the Meeting details"
      onOpenChange={onOpenChange}
      open={open}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}

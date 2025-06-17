import { useRouter } from "next/navigation";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewMeetingDialog({
  onOpenChange,
  open,
}: NewMeetingDialogProps) {
  const router = useRouter();

  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new Meeting"
      onOpenChange={onOpenChange}
      open={open}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
          router.push(`meetings/${id}`);
        }}
        onCancel={() => onOpenChange}
      />
    </ResponsiveDialog>
  );
}

import { AgentGetOne } from "../types";
import { AgentForm } from "./agent-form";
import { ResponsiveDialog } from "@/components/responsive-dialog";

interface UpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export function UpdateDialog({
  onOpenChange,
  open,
  initialValues,
}: UpdateDialogProps) {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      onOpenChange={onOpenChange}
      open={open}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}

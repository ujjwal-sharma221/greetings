import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SquareDashedBottomCode } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AgentInsertSchemaValues,
  agentsInsertSchema,
} from "@/modules/models/schema";
import { useTRPC } from "@/trpc/client";
import { AgentGetOne } from "../types";
import { Button } from "@/components/ui/button";
import { LuxeButton } from "@/components/custom-buttons";
import { GeneratedAvatar } from "@/components/generated-avatars";
import { useAppForm } from "@/modules/auth/components/forms/form-components";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
}

export function AgentForm({
  onCancel,
  onSuccess,
  initialValues,
}: AgentFormProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }

        onSuccess?.();
      },

      onError: (error) => {
        toast.error(error.message);
        onSuccess?.();
      },
    }),
  );

  const form = useAppForm({
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
    validators: { onChange: agentsInsertSchema },

    onSubmit: ({ value }) => onSubmit(value),
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: AgentInsertSchemaValues) => {
    if (isEdit) {
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <form
      className="min-w-[40rem] space-y-4 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppField
        name="name"
        children={(field) => (
          <div className="">
            <GeneratedAvatar
              seed={field.state.value ?? ""}
              variants="dylan"
              className="size-16 border"
            />
            <field.TextField Icon={SquareDashedBottomCode} label="Name" />
          </div>
        )}
      />

      <form.AppField
        name="instructions"
        children={(field) => (
          <div className="">
            <field.TextAreaField label="Instructions" />
          </div>
        )}
      />

      <div className="flex items-center justify-between">
        {onCancel && (
          <Button
            onClick={() => onCancel()}
            disabled={isPending}
            type="button"
            variant="outline"
          >
            Cancel
          </Button>
        )}
        <LuxeButton
          type="submit"
          disabled={isPending}
          variant="glitch-brightness"
          className="rounded-md"
        >
          {isEdit ? "update" : "create"}
        </LuxeButton>
      </div>
    </form>
  );
}

import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SquareDashedBottomCode } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  meetingsInsertSchema,
  MeetingsInsertSchemaValues,
} from "@/modules/models/schema";
import { useTRPC } from "@/trpc/client";
import { MeetingsGetOne } from "../types";
import { Button } from "@/components/ui/button";
import { LuxeButton } from "@/components/custom-buttons";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatars";
import UnderlineToBackground from "@/components/ui/underline-to-background";
import { useAppForm } from "@/modules/auth/components/forms/form-components";
import { NewAgentDialog } from "@/modules/agents/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingsGetOne;
}

export function MeetingForm({
  onCancel,
  onSuccess,
  initialValues,
}: MeetingFormProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [agentSearch, setAgentSearch] = useState("");
  const [openNewAgent, setOpenNewAgentDialog] = useState(false);
  const agents = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );
        onSuccess?.(data.id);
      },

      onError: (error) => {
        toast.error(error.message);
        onSuccess?.();
      },
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id }),
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
      agentId: initialValues?.agentId ?? "",
    },
    validators: { onChange: meetingsInsertSchema },

    onSubmit: ({ value }) => onSubmit(value),
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: MeetingsInsertSchemaValues) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgent}
        onOpenChange={setOpenNewAgentDialog}
      />
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
              <field.TextField Icon={SquareDashedBottomCode} label="Name" />
            </div>
          )}
        />

        <form.AppField
          name="agentId"
          children={(field) => (
            <div className="">
              <CommandSelect
                options={(agents.data?.items ?? []).map((agent) => ({
                  id: agent.id,
                  value: agent.id,
                  children: (
                    <div className="flex items-center gap-x-2">
                      <GeneratedAvatar
                        seed={agent.name}
                        variants="dylan"
                        className="size-6 border"
                      />
                      <span>{agent.name}</span>
                    </div>
                  ),
                }))}
                value={field.state.value}
                onSelect={field.handleChange}
                onSearch={setAgentSearch}
                placeholder="Select an agent"
              />
              <button
                onClick={() => setOpenNewAgentDialog(true)}
                type="button"
                className="text-primary hover:underline"
              ></button>
            </div>
          )}
        />

        <div className="text-mut` text-xs">
          Not found what you were looking for?
          <button
            type="button"
            className="ml-2"
            onClick={() => setOpenNewAgentDialog(true)}
          >
            <UnderlineToBackground
              targetTextColor="#f0f0f0"
              className="cursor-pointer"
            >
              Create a new agent
            </UnderlineToBackground>
          </button>
        </div>

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
    </>
  );
}

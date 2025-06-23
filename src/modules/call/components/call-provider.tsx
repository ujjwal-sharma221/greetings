"use client";

import { Loader } from "lucide-react";

import { CallConnect } from "./call-connect";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";

interface Props {
  meetingId: string;
  meetingName: string;
}

export function CallProvider({ meetingId, meetingName }: Props) {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial">
        <Loader className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
      userName={data.user.name}
    />
  );
}

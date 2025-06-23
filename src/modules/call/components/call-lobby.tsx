import Link from "next/link";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
  onJoin: () => void;
}

export function CallLobby({ onJoin }: Props) {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasMicrophonePermission } =
    useMicrophoneState();

  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission =
    hasCameraPermission && hasMicrophonePermission;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to Join?</h6>
            <p className="text-sm">Setup your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission
                ? DisabledVidePreview
                : AllowBrowserPermission
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex w-full justify-between gap-x-2">
            <Button asChild variant="destructive">
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoin}>Join</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisabledVidePreview() {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
}

function AllowBrowserPermission() {
  return (
    <div className="text-sm">
      Please grant microphone and camera permissions from your browser
    </div>
  );
}

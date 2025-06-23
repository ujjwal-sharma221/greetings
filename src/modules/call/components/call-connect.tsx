import {
  Call,
  CallingState,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCall,
} from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { CallLobby } from "./call-lobby";
import { CallEnded } from "./call-ended";
import { CallActive } from "./call-active";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export function CallConnect({
  meetingId,
  meetingName,
  userId,
  userImage,
  userName,
}: Props) {
  const trpc = useTRPC();
  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions(),
  );

  const [client, setClient] = useState<StreamVideoClient>();

  useEffect(() => {
    const _client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: generateToken,
    });

    setClient(_client);

    return () => {
      _client.disconnectUser();
      setClient(undefined);
    };
  }, [userId, userName, userImage, generateToken]);

  const [call, setCall] = useState<Call>();
  useEffect(() => {
    if (!client) return;

    const _call = client.call("default", meetingId);
    _call.camera.disable();
    _call.microphone.disable();
    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();
        setCall(undefined);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial">
        <Loader className="size-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
}

interface CallUIProps {
  meetingName: string;
}
function CallUI({ meetingName }: CallUIProps) {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) return;

    await call.join();
    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) return;

    if (call.state.callingState === CallingState.LEFT) {
      setShow("ended");
      return;
    }

    await call.leave();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "ended" && <CallEnded />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
    </StreamTheme>
  );
}

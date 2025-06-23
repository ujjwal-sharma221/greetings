import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

import Logo from "@/assets/logo.svg";

interface Props {
  onLeave: () => void;
  meetingName: string;
}

export function CallActive({ onLeave, meetingName }: Props) {
  return (
    <div className="flex h-full flex-col justify-between p-4 text-white">
      <div className="flex items-center gap-4 rounded-full bg-[#101213] p-4">
        <Link
          href="/"
          className="flex w-fit items-center justify-center rounded-full bg-white p-1"
        >
          <Image src={Logo} width={26} height={24} alt="logo" />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="rounded-full px-4">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
}

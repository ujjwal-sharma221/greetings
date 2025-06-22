import Link from "next/link";
import { BanIcon, VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import VariableFontHoverByLetter from "@/components/variable-font-hover-by-letter";

interface UpcomingStateProps {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export function UpcomingState({
  meetingId,
  isCancelling,
  onCancelMeeting,
}: UpcomingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg px-4 py-5 text-3xl">
      <VariableFontHoverByLetter
        label="Not Started Yet!"
        fromFontVariationSettings="'wght' 400, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        staggerFrom={"last"}
      />
      <div className="mt-4 flex w-full items-center justify-center gap-2 lg:flex-row">
        <Button
          disabled={isCancelling}
          onClick={onCancelMeeting}
          variant="secondary"
          className=""
        >
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button disabled={isCancelling} asChild className="">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
}

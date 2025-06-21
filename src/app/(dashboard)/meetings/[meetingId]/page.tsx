import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorState } from "@/components/error-state";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { LoadingState } from "@/components/loading-state";
import { ErrorBoundary } from "react-error-boundary";
import { MeetingIdView } from "@/modules/meetings/views/meeting-id-view";

interface MeetingIdProps {
  params: Promise<{ meetingId: string }>;
}

const MeetingIdPage = async ({ params }: MeetingIdProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }
  const { meetingId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading meeting"
            description="This may take some time"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Something went wrong while fetching meeting"
              description="Please try again"
            />
          }
        >
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default MeetingIdPage;

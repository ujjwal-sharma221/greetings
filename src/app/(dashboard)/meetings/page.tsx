import { Suspense } from "react";
import { headers } from "next/headers";
import type { SearchParams } from "nuqs";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { loadSearchParams } from "@/modules/meetings/hooks/params";
import { MeetingsView } from "@/modules/meetings/views/meetings-view";
import { MeetingListHeader } from "@/modules/meetings/components/meeting-list-header";

interface MeetingsPageProps {
  searchParams: Promise<SearchParams>;
}

const MeetingsPage = async ({ searchParams }: MeetingsPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const params = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...params }),
  );

  return (
    <>
      <MeetingListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <LoadingState
              title="Loading Meetings"
              description="This may take some time"
            />
          }
        >
          <ErrorBoundary
            fallback={
              <ErrorState
                title="Error while loading meetings"
                description="Please try again later"
              />
            }
          >
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
export default MeetingsPage;

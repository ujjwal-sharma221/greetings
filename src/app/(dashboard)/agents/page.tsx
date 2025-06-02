import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { getQueryClient, trpc } from "@/trpc/server";
import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/views/agent-views";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";

const AgentsPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <LoadingState
            title="Loading agents"
            description="This may take a while"
          />
        }
      >
        <ErrorBoundary
          fallback={
            <ErrorState
              title="Something went wrong while fetching agents"
              description="Please try again"
            />
          }
        >
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default AgentsPage;

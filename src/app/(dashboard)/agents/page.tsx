import { Suspense } from "react";
import { headers } from "next/headers";
import type { SearchParams } from "nuqs";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { AgentsView } from "@/modules/agents/views/agent-views";
import { loadSearchParams } from "@/modules/agents/hooks/params";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ListHeader } from "@/modules/agents/components/list-header";

interface AgentPageProps {
  searchParams: Promise<SearchParams>;
}

const AgentsPage = async ({ searchParams }: AgentPageProps) => {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  const { page, search } = filters;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({
      page,
      search,
    }),
  );

  return (
    <>
      <ListHeader />
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
                description="Please try again "
              />
            }
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};
export default AgentsPage;

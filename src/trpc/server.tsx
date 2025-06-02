import "server-only"; // <-- ensure this file cannot be imported from the client
import { cache } from "react";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

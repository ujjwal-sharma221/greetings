import { z } from "zod/v4";
import { eq } from "drizzle-orm";

import db from "@/db";
import { agents } from "@/db/schema";
import { agentsInsertSchema } from "@/modules/models/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));

      return existingAgent;
    }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, instructions } = input;
      const { auth } = ctx;

      const [cratedAgent] = await db
        .insert(agents)
        .values({ instructions, name, userId: auth.user.id })
        .returning();

      return cratedAgent;
    }),
});

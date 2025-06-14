import { z } from "zod/v4";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { error: "Name of agent is required" }),
  instructions: z.string().min(1, { error: "Instructions can not be empty" }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { error: "id is required" }),
});

export type AgentInsertSchemaValues = z.infer<typeof agentsInsertSchema>;

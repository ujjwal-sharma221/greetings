import { z } from "zod/v4";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { error: "Name of agent is required" }),
  instructions: z.string().min(1, { error: "Instructions can not be empty" }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { error: "id is required" }),
});

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { error: "Name of meeting is required" }),
  agentId: z.string().min(1, { error: "Meeting Id is required" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { error: "id is required" }),
});

export type AgentInsertSchemaValues = z.infer<typeof agentsInsertSchema>;
export type MeetingsInsertSchemaValues = z.infer<typeof meetingsInsertSchema>;

import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { CallSessionStartedEvent } from "@stream-io/node-sdk";

import db from "@/db";
import { agents, meetings } from "@/db/schema";
import streamVideo from "@/lib/stream-video";

const verifySign = (body: string, sign: string) => {
  return streamVideo.verifyWebhook(body, sign);
};

export async function POST(req: NextRequest) {
  const sign = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!sign || !apiKey) {
    return NextResponse.json(
      { error: "Missing sign or API key" },
      { status: 400 },
    );
  }

  const body = await req.text();
  if (!verifySign(body, sign)) {
    return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: "missing meetingId" }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing")),
        ),
      );

    if (!existingMeeting)
      return NextResponse.json({ error: "meeting not found" }, { status: 404 });

    await db
      .update(meetings)
      .set({ status: "active", startedAt: new Date() })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent)
      return NextResponse.json({ error: "agent not found" }, { status: 404 });

    const call = streamVideo.video.call("default", meetingId);
  }

  return NextResponse.json({ status: "ok" });
}

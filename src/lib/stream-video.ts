import { StreamClient } from "@stream-io/node-sdk";

const streamVideo = new StreamClient(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.NEXT_PUBLIC_STREAM_SECRET_KEY!,
);

export default streamVideo;

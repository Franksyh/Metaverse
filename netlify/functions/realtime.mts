import { getStore } from "@netlify/blobs";
import {
  DEFAULT_ROOM_ID,
  applyRealtimeAction,
  createInitialState,
  normalizeState,
  pruneState,
  snapshot,
  text,
} from "../../realtime-core.js";

const ROOM_KEY = "rooms";

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "Content-Type, Accept",
  "access-control-max-age": "86400",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders,
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function preflight() {
  return new Response("", { status: 204, headers: corsHeaders });
}

async function readState(store) {
  const saved = await store.get(ROOM_KEY, { type: "json" });
  return normalizeState(saved && typeof saved === "object" ? saved : createInitialState());
}

export default async (req) => {
  if (req.method === "OPTIONS") return preflight();

  const url = new URL(req.url);
  const roomId = text(url.searchParams.get("roomId"), DEFAULT_ROOM_ID, 80);
  const sessionId = text(url.searchParams.get("sessionId"), "", 120);
  const store = getStore("pair-room-live", { consistency: "strong" });
  const now = new Date();
  const state = pruneState(await readState(store), now.getTime());

  if (req.method === "GET") {
    const body = snapshot(state, roomId, sessionId, now.getTime());
    await store.setJSON(ROOM_KEY, state);
    return json(body);
  }

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let payload = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const body = applyRealtimeAction(state, payload, now);
  await store.setJSON(ROOM_KEY, state);
  return json(body);
};

export const config = {
  path: "/api/realtime",
};

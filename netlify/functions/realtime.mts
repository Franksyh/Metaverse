import { getStore } from "@netlify/blobs";

const ROOM_KEY = "rooms";
const MAX_MESSAGES = 80;
const ONLINE_WINDOW_MS = 45_000;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function text(value, fallback = "") {
  return String(value || fallback)
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 500);
}

function getDevice(value) {
  const normalized = text(value, "web").toLowerCase();
  if (["mobile", "desktop", "tablet", "web"].includes(normalized)) return normalized;
  return "web";
}

function emptyState() {
  return {
    participants: [],
    messages: [
      {
        id: "system-welcome",
        roomId: "late-night",
        sessionId: "system",
        name: "系統",
        text: "多人連線已啟用。不同裝置開啟同一個網址，就能在這裡看到共享房間訊息。",
        device: "web",
        at: new Date().toISOString(),
      },
    ],
  };
}

async function readState(store) {
  const saved = await store.get(ROOM_KEY, { type: "json" });
  const state = saved && typeof saved === "object" ? saved : emptyState();
  state.participants = Array.isArray(state.participants) ? state.participants : [];
  state.messages = Array.isArray(state.messages) ? state.messages : [];
  return state;
}

function pruneState(state, nowMs) {
  state.participants = state.participants.filter((participant) => {
    const seenAt = Date.parse(participant.lastSeen || "");
    return Number.isFinite(seenAt) && nowMs - seenAt <= ONLINE_WINDOW_MS;
  });
  state.messages = state.messages.slice(-MAX_MESSAGES);
  return state;
}

function snapshot(state, roomId) {
  const participants = state.participants.filter((participant) => participant.roomId === roomId);
  const messages = state.messages.filter((message) => message.roomId === roomId).slice(-40);

  return {
    ok: true,
    roomId,
    generatedAt: new Date().toISOString(),
    allOnline: state.participants.length,
    participants,
    messages,
  };
}

async function updatePresence(state, payload, now) {
  const sessionId = text(payload.sessionId);
  if (!sessionId) return;

  const participant = {
    sessionId,
    roomId: text(payload.roomId, "late-night"),
    name: text(payload.name, "訪客"),
    photo: text(payload.photo),
    device: getDevice(payload.device),
    lastSeen: now.toISOString(),
  };

  const index = state.participants.findIndex((item) => item.sessionId === sessionId);
  if (index >= 0) {
    state.participants[index] = participant;
  } else {
    state.participants.push(participant);
  }
}

function addMessage(state, payload, now) {
  const sessionId = text(payload.sessionId);
  const roomId = text(payload.roomId, "late-night");
  const messageText = text(payload.text);
  if (!sessionId || !messageText) return;

  state.messages.push({
    id: `msg_${now.getTime().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    roomId,
    sessionId,
    name: text(payload.name, "訪客"),
    text: messageText.slice(0, 240),
    device: getDevice(payload.device),
    at: now.toISOString(),
  });
}

export default async (req) => {
  const url = new URL(req.url);
  const roomId = text(url.searchParams.get("roomId"), "late-night");
  const store = getStore("pair-room-live", { consistency: "strong" });
  const now = new Date();
  const state = pruneState(await readState(store), now.getTime());

  if (req.method === "GET") {
    await store.setJSON(ROOM_KEY, state);
    return json(snapshot(state, roomId));
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let payload = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const action = text(payload.action, "heartbeat");
  if (action === "leave") {
    const sessionId = text(payload.sessionId);
    state.participants = state.participants.filter((participant) => participant.sessionId !== sessionId);
  } else {
    await updatePresence(state, payload, now);
    if (action === "message") {
      addMessage(state, payload, now);
    }
  }

  pruneState(state, now.getTime());
  await store.setJSON(ROOM_KEY, state);
  return json(snapshot(state, text(payload.roomId, roomId)));
};

export const config = {
  path: "/api/realtime",
};

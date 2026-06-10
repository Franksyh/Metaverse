const MAX_MESSAGES = 80;
const ONLINE_WINDOW_MS = 45_000;
const DEFAULT_ROOM_ID = "late-night";

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, status, data) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(status).json(data);
}

function text(value, fallback = "", limit = 500) {
  return String(value || fallback)
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, limit);
}

function getDevice(value) {
  const normalized = text(value, "web").toLowerCase();
  if (["mobile", "desktop", "tablet", "web"].includes(normalized)) return normalized;
  return "web";
}

function getRoomId(req) {
  const host = req.headers?.host || "localhost";
  const url = new URL(req.url || "/", `https://${host}`);
  const value = req.query?.roomId || url.searchParams.get("roomId");
  return text(Array.isArray(value) ? value[0] : value, DEFAULT_ROOM_ID, 80);
}

function createInitialState() {
  return {
    participants: [],
    messages: [
      {
        id: "system-welcome",
        roomId: DEFAULT_ROOM_ID,
        sessionId: "system",
        name: "系統",
        text: "歡迎來到多人房間，傳送一則訊息就能讓其他在線用戶即時看到。",
        device: "web",
        at: new Date().toISOString(),
      },
    ],
  };
}

function liveState() {
  globalThis.__PAIR_ROOM_LIVE_STATE__ ||= createInitialState();
  const state = globalThis.__PAIR_ROOM_LIVE_STATE__;
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
  return {
    ok: true,
    roomId,
    generatedAt: new Date().toISOString(),
    allOnline: state.participants.length,
    participants: state.participants.filter((participant) => participant.roomId === roomId),
    messages: state.messages.filter((message) => message.roomId === roomId).slice(-40),
  };
}

function updatePresence(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  if (!sessionId) return;

  const photo = text(payload.photo, "", 5000);
  const participant = {
    sessionId,
    roomId: text(payload.roomId, DEFAULT_ROOM_ID, 80),
    name: text(payload.name, "訪客", 80),
    photo: photo.length <= 5000 ? photo : "",
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
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const messageText = text(payload.text, "", 240);
  if (!sessionId || !messageText) return;

  state.messages.push({
    id: `msg_${now.getTime().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    roomId,
    sessionId,
    name: text(payload.name, "訪客", 80),
    text: messageText,
    device: getDevice(payload.device),
    at: now.toISOString(),
  });
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();

  const now = new Date();
  const state = pruneState(liveState(), now.getTime());
  const roomId = getRoomId(req);

  if (req.method === "GET") {
    return sendJson(res, 200, snapshot(state, roomId));
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  let payload = {};
  try {
    payload = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON" });
  }

  const action = text(payload.action, "heartbeat", 40);
  if (action === "leave") {
    const sessionId = text(payload.sessionId, "", 120);
    state.participants = state.participants.filter((participant) => participant.sessionId !== sessionId);
  } else {
    updatePresence(state, payload, now);
    if (action === "message") addMessage(state, payload, now);
  }

  pruneState(state, now.getTime());
  return sendJson(res, 200, snapshot(state, text(payload.roomId, roomId, 80)));
}

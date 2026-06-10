import { getStore } from "@netlify/blobs";

const ROOM_KEY = "rooms";
const MAX_MESSAGES = 120;
const MAX_MATCHES = 50;
const MAX_GAME_ANSWERS = 60;
const ONLINE_WINDOW_MS = 60_000;
const DEFAULT_ROOM_ID = "late-night";

const GAME_PROMPTS = [
  "用一句話形容你今天的心情。",
  "第一次聊天時，你最喜歡被問什麼問題？",
  "如果週末只安排一個約會行程，你會選咖啡、電影、散步還是遊戲？",
  "分享一個你最近覺得生活變亮的小事。",
  "你希望理想對象具備哪一個很小但很重要的習慣？",
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function text(value, fallback = "", limit = 500) {
  return String(value || fallback)
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, limit);
}

function bool(value) {
  return value === true || value === "true";
}

function clampNumber(value, min = 0, max = 100) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
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
        roomId: DEFAULT_ROOM_ID,
        sessionId: "system",
        name: "系統",
        text: "歡迎來到真人多人房間。你可以聊天、上麥、邀請配對，也可以一起玩破冰題。",
        device: "web",
        at: new Date().toISOString(),
      },
    ],
    matches: [],
    games: {},
  };
}

function normalizeState(state) {
  state.participants = Array.isArray(state.participants) ? state.participants : [];
  state.messages = Array.isArray(state.messages) ? state.messages : [];
  state.matches = Array.isArray(state.matches) ? state.matches : [];
  state.games = state.games && typeof state.games === "object" ? state.games : {};
  return state;
}

async function readState(store) {
  const saved = await store.get(ROOM_KEY, { type: "json" });
  return normalizeState(saved && typeof saved === "object" ? saved : emptyState());
}

function roomGame(state, roomId) {
  if (!state.games[roomId]) {
    state.games[roomId] = {
      roomId,
      round: 1,
      prompt: GAME_PROMPTS[0],
      answers: [],
      updatedAt: new Date().toISOString(),
    };
  }
  state.games[roomId].answers = Array.isArray(state.games[roomId].answers) ? state.games[roomId].answers : [];
  return state.games[roomId];
}

function pruneState(state, nowMs) {
  state.participants = state.participants.filter((participant) => {
    const seenAt = Date.parse(participant.lastSeen || "");
    return Number.isFinite(seenAt) && nowMs - seenAt <= ONLINE_WINDOW_MS;
  });
  state.messages = state.messages.slice(-MAX_MESSAGES);
  state.matches = state.matches.slice(-MAX_MATCHES);
  Object.values(state.games).forEach((game) => {
    game.answers = Array.isArray(game.answers) ? game.answers.slice(-MAX_GAME_ANSWERS) : [];
  });
  return state;
}

function snapshot(state, roomId) {
  return {
    ok: true,
    roomId,
    generatedAt: new Date().toISOString(),
    allOnline: state.participants.length,
    participants: state.participants.filter((participant) => participant.roomId === roomId),
    messages: state.messages.filter((message) => message.roomId === roomId).slice(-60),
    matches: state.matches.filter((match) => match.roomId === roomId).slice(-20),
    game: roomGame(state, roomId),
    capabilities: {
      chat: true,
      matching: true,
      games: true,
      voicePresence: true,
      realtimeMode: "netlify-blobs",
    },
  };
}

function participantFromPayload(payload, now, existing = {}) {
  const photo = text(payload.photo, existing.photo || "", 5000);
  return {
    ...existing,
    sessionId: text(payload.sessionId, existing.sessionId || "", 120),
    roomId: text(payload.roomId, existing.roomId || DEFAULT_ROOM_ID, 80),
    name: text(payload.name, existing.name || "訪客", 80),
    photo: photo.length <= 5000 ? photo : "",
    device: getDevice(payload.device || existing.device),
    lastSeen: now.toISOString(),
  };
}

function updatePresence(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  if (!sessionId) return null;

  const index = state.participants.findIndex((item) => item.sessionId === sessionId);
  const existing = index >= 0 ? state.participants[index] : {};
  const participant = participantFromPayload(payload, now, existing);

  if (index >= 0) {
    state.participants[index] = participant;
  } else {
    state.participants.push(participant);
  }
  return participant;
}

function addMessage(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const messageText = text(payload.text, "", 360);
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

function setVoice(state, payload, now, joined) {
  const participant = updatePresence(state, payload, now);
  if (!participant) return;

  const voice = payload.voice || {};
  participant.voice = {
    joined,
    muted: bool(voice.muted),
    speaking: bool(voice.speaking),
    level: clampNumber(voice.level),
    updatedAt: now.toISOString(),
  };
}

function addMatchInvite(state, payload, now) {
  const fromSessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  if (!fromSessionId) return;

  const roomParticipants = state.participants.filter((item) => item.roomId === roomId && item.sessionId !== fromSessionId);
  const target =
    roomParticipants.find((item) => item.sessionId === text(payload.toSessionId, "", 120)) ||
    roomParticipants[Math.floor(Math.random() * roomParticipants.length)];

  state.matches.push({
    id: `match_${now.getTime().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    roomId,
    fromSessionId,
    fromName: text(payload.name, "訪客", 80),
    toSessionId: target?.sessionId || "",
    toName: target?.name || "下一位在線使用者",
    status: target ? "pending" : "open",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  });
}

function acceptMatch(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const matchId = text(payload.matchId, "", 120);
  const match = state.matches.find((item) => item.id === matchId);
  if (!match) return;
  if (match.toSessionId && match.toSessionId !== sessionId && match.fromSessionId !== sessionId) return;

  match.status = "accepted";
  if (!match.toSessionId) {
    match.toSessionId = sessionId;
    match.toName = text(payload.name, "訪客", 80);
  }
  match.updatedAt = now.toISOString();
}

function addGameAnswer(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const answer = text(payload.answer, "", 280);
  if (!sessionId || !answer) return;

  const game = roomGame(state, roomId);
  game.answers.push({
    id: `answer_${now.getTime().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    round: game.round,
    sessionId,
    name: text(payload.name, "訪客", 80),
    answer,
    at: now.toISOString(),
  });
  game.updatedAt = now.toISOString();
}

function nextGameRound(state, payload, now) {
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const game = roomGame(state, roomId);
  game.round += 1;
  game.prompt = GAME_PROMPTS[(game.round - 1) % GAME_PROMPTS.length];
  game.updatedAt = now.toISOString();
}

export default async (req) => {
  const url = new URL(req.url);
  const roomId = text(url.searchParams.get("roomId"), DEFAULT_ROOM_ID, 80);
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

  const action = text(payload.action, "heartbeat", 40);
  if (action === "leave") {
    const sessionId = text(payload.sessionId, "", 120);
    state.participants = state.participants.filter((participant) => participant.sessionId !== sessionId);
  } else {
    updatePresence(state, payload, now);
    if (action === "message") addMessage(state, payload, now);
    if (action === "voice-join") setVoice(state, payload, now, true);
    if (action === "voice-update") setVoice(state, payload, now, true);
    if (action === "voice-leave") setVoice(state, payload, now, false);
    if (action === "match-invite") addMatchInvite(state, payload, now);
    if (action === "match-accept") acceptMatch(state, payload, now);
    if (action === "game-answer") addGameAnswer(state, payload, now);
    if (action === "game-next") nextGameRound(state, payload, now);
  }

  pruneState(state, now.getTime());
  await store.setJSON(ROOM_KEY, state);
  return json(snapshot(state, text(payload.roomId, roomId, 80)));
};

export const config = {
  path: "/api/realtime",
};

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

const CHEMISTRY_ROUNDS = [
  { prompt: "第一次見面，你比較想去哪裡？", options: ["安靜咖啡店", "一起玩遊戲"] },
  { prompt: "訊息聊天時，你喜歡哪種節奏？", options: ["想到再慢慢回", "即時有來有往"] },
  { prompt: "週末臨時多出三小時，你會選？", options: ["城市散步", "宅家看電影"] },
  { prompt: "遇到心動的人，你通常會？", options: ["主動丟出話題", "先觀察對方反應"] },
  { prompt: "關係中你更重視哪一項？", options: ["生活默契", "共同成長"] },
];
const DOODLE_PROMPTS = ["一起畫出理想約會", "一起完成一座夢想小屋", "一起畫今晚的心情", "一起畫一份完美早餐"];
const GAME_MODES = new Set(["chemistry", "truth", "reaction", "doodle", "spark"]);

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
      mode: "chemistry",
      round: 1,
      answers: [],
      scores: [],
      drawing: [],
      updatedAt: new Date().toISOString(),
    };
  }
  const game = state.games[roomId];
  game.mode = GAME_MODES.has(game.mode) ? game.mode : "chemistry";
  game.round = Math.max(1, Number(game.round || 1));
  game.answers = Array.isArray(game.answers) ? game.answers : [];
  game.scores = Array.isArray(game.scores) ? game.scores : [];
  game.drawing = Array.isArray(game.drawing) ? game.drawing : [];
  configureGameRound(game);
  return game;
}

function resetSparkTarget(game, nowMs = Date.now()) {
  game.target = {
    id: `spark_${nowMs.toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    x: Math.round(8 + Math.random() * 84),
    y: Math.round(10 + Math.random() * 80),
  };
}

function configureGameRound(game) {
  const index = Math.max(0, game.round - 1);
  if (game.mode === "chemistry") {
    const item = CHEMISTRY_ROUNDS[index % CHEMISTRY_ROUNDS.length];
    game.prompt = item.prompt;
    game.options = item.options;
  } else if (game.mode === "truth") {
    game.prompt = GAME_PROMPTS[index % GAME_PROMPTS.length];
    game.options = [];
  } else if (game.mode === "reaction") {
    game.prompt = "燈亮後立刻按下心動按鈕，太早按不算。";
    game.options = [];
    game.targetAt ||= Date.now() + 2800;
  } else if (game.mode === "doodle") {
    game.prompt = DOODLE_PROMPTS[index % DOODLE_PROMPTS.length];
    game.options = [];
  } else {
    game.prompt = "搶先點中共享光點，累積本房最高分。";
    game.options = [];
    if (!game.target?.id) resetSparkTarget(game);
  }
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
    game.scores = Array.isArray(game.scores) ? game.scores.slice(-60) : [];
    game.drawing = Array.isArray(game.drawing) ? game.drawing.slice(-600) : [];
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
  if (game.mode === "chemistry" && !game.options.includes(answer)) return;
  if (!["chemistry", "truth"].includes(game.mode)) return;
  game.answers = game.answers.filter((item) => item.sessionId !== sessionId || item.round !== game.round);
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

function selectGameMode(state, payload, now) {
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80));
  const mode = text(payload.mode, "chemistry", 30);
  if (!GAME_MODES.has(mode)) return;
  game.mode = mode;
  game.round = 1;
  game.answers = [];
  game.scores = [];
  game.drawing = [];
  game.target = null;
  game.targetAt = mode === "reaction" ? now.getTime() + 2500 + Math.floor(Math.random() * 1800) : null;
  game.updatedAt = now.toISOString();
  configureGameRound(game);
}

function recordGameBuzz(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80));
  if (!sessionId || game.mode !== "reaction" || !game.targetAt || now.getTime() < game.targetAt) return;
  const elapsed = Math.max(0, now.getTime() - game.targetAt);
  const entry = { sessionId, name: text(payload.name, "訪客", 80), score: elapsed, updatedAt: now.toISOString() };
  const existing = game.scores.findIndex((item) => item.sessionId === sessionId);
  if (existing < 0) game.scores.push(entry);
  else if (elapsed < Number(game.scores[existing].score || Infinity)) game.scores[existing] = entry;
  game.answers = game.answers.filter((item) => item.sessionId !== sessionId || item.round !== game.round);
  game.answers.push({ ...entry, id: `buzz_${now.getTime().toString(36)}_${sessionId}`, round: game.round, answer: `${elapsed} ms`, at: now.toISOString() });
  game.updatedAt = now.toISOString();
}

function addDrawingLines(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80));
  if (!sessionId || game.mode !== "doodle" || !Array.isArray(payload.lines)) return;
  const lines = payload.lines.slice(0, 80).map((line) => ({
    x1: clampNumber(line.x1, 0, 1),
    y1: clampNumber(line.y1, 0, 1),
    x2: clampNumber(line.x2, 0, 1),
    y2: clampNumber(line.y2, 0, 1),
    color: /^#[0-9a-f]{6}$/i.test(String(line.color || "")) ? String(line.color) : "#172124",
    width: clampNumber(line.width, 1, 12),
    sessionId,
  }));
  game.drawing.push(...lines);
  game.drawing = game.drawing.slice(-600);
  game.updatedAt = now.toISOString();
}

function clearDrawing(state, payload, now) {
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80));
  if (game.mode !== "doodle") return;
  game.drawing = [];
  game.updatedAt = now.toISOString();
}

function recordSparkTap(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80));
  const targetId = text(payload.targetId, "", 120);
  if (!sessionId || game.mode !== "spark" || !targetId || targetId !== game.target?.id) return;
  const existing = game.scores.find((item) => item.sessionId === sessionId);
  if (existing) {
    existing.score = Number(existing.score || 0) + 1;
    existing.updatedAt = now.toISOString();
  } else {
    game.scores.push({ sessionId, name: text(payload.name, "訪客", 80), score: 1, updatedAt: now.toISOString() });
  }
  resetSparkTarget(game, now.getTime());
  game.updatedAt = now.toISOString();
}

function nextGameRound(state, payload, now) {
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const game = roomGame(state, roomId);
  game.round += 1;
  game.answers = [];
  game.drawing = [];
  if (["reaction", "spark"].includes(game.mode)) game.scores = [];
  game.targetAt = game.mode === "reaction" ? now.getTime() + 2500 + Math.floor(Math.random() * 1800) : null;
  if (game.mode === "spark") resetSparkTarget(game, now.getTime());
  configureGameRound(game);
  game.updatedAt = now.toISOString();
}

export default async (req) => {
  if (req.method === "OPTIONS") return preflight();

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
    if (action === "game-select") selectGameMode(state, payload, now);
    if (action === "game-buzz") recordGameBuzz(state, payload, now);
    if (action === "game-draw") addDrawingLines(state, payload, now);
    if (action === "game-clear") clearDrawing(state, payload, now);
    if (action === "game-tap") recordSparkTap(state, payload, now);
  }

  pruneState(state, now.getTime());
  await store.setJSON(ROOM_KEY, state);
  return json(snapshot(state, text(payload.roomId, roomId, 80)));
};

export const config = {
  path: "/api/realtime",
};

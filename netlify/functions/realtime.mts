import { getStore } from "@netlify/blobs";

const ROOM_KEY = "rooms";
const MAX_MESSAGES = 120;
const MAX_MATCHES = 50;
const MAX_GAME_ANSWERS = 60;
const ONLINE_WINDOW_MS = 60_000;
const DEFAULT_ROOM_ID = "late-night";

const GAME_PROMPTS = [
  "如果今晚只能帶一個人私奔一小時，你最想做什麼？",
  "剛配對成功時，你最希望收到哪一種開場白？",
  "聊到凌晨還不想睡時，你最想聽見對方說哪句話？",
  "分享一個最近讓你突然心軟的小瞬間。",
  "如果房內有人和你很合拍，你會想先一起完成什麼？",
];

const CHEMISTRY_ROUNDS = [
  { prompt: "第一次見面，你比較想去哪裡？", options: ["深夜散步", "找間小店續攤"] },
  { prompt: "配對成功後，你更想先做什麼？", options: ["先語音聽聲音", "先文字慢慢聊"] },
  { prompt: "今晚有人約你，你更吃哪一套？", options: ["有點壞的幽默", "很真誠的關心"] },
  { prompt: "曖昧升溫時，你比較喜歡？", options: ["直接一點", "慢慢試探"] },
  { prompt: "深夜聊天最加分的是？", options: ["會接梗", "會接住情緒"] },
];
const VIBE_ROUNDS = [
  { prompt: "現在有人約你馬上出門，你最想去哪裡？", options: ["夜景散步", "深夜語音", "桌遊局", "咖啡續攤"] },
  { prompt: "剛配對成功，你最想收到哪種開場？", options: ["一句直接稱讚", "一個有梗問題", "語音邀請", "分享歌單"] },
  { prompt: "房內有人跟你同頻，你會先怎麼示好？", options: ["先丟表情包", "先問今天過得如何", "直接邀請玩下一局", "分享自己的小秘密"] },
  { prompt: "今晚最適合的曖昧節奏？", options: ["快節奏來回", "慢慢試探", "先一起玩遊戲", "先聽聲音再聊"] },
];
const STORY_PROMPTS = [
  "用 8 到 20 個字接下去：如果今晚的房間像一部愛情片，開場會是…",
  "接一句：有人在語音房先笑了一聲，結果整個房間突然…",
  "接一句：如果今晚真的約成，最可能先發生的是…",
  "接一句：這局玩完之後，房裡最有可能出現的一句話是…",
];
const DOODLE_PROMPTS = ["畫出你理想約會的第一站", "畫出此刻房內最像的一種天氣", "畫出讓你一秒心動的小動作", "畫出今晚房間的 vibe 吉祥物"];
const ORBIT_TARGET_MS = 1400;
const GAME_MODES = new Set(["chemistry", "vibe", "truth", "story", "reaction", "doodle", "spark", "orbit"]);

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
      target: null,
      targetAt: null,
      targetExpiresAt: null,
      targetDuration: null,
      updatedAt: new Date().toISOString(),
    };
  }
  const game = state.games[roomId];
  game.mode = GAME_MODES.has(game.mode) ? game.mode : "chemistry";
  game.round = Math.max(1, Number(game.round || 1));
  game.answers = Array.isArray(game.answers) ? game.answers : [];
  game.scores = Array.isArray(game.scores) ? game.scores : [];
  game.drawing = Array.isArray(game.drawing) ? game.drawing : [];
  game.target = game.target && typeof game.target === "object" ? game.target : null;
  game.targetAt = Number(game.targetAt || 0) || null;
  game.targetExpiresAt = Number(game.targetExpiresAt || 0) || null;
  game.targetDuration = Number(game.targetDuration || 0) || null;
  configureGameRound(game, Date.now());
  return game;
}

function resetSparkTarget(game, nowMs = Date.now()) {
  game.target = {
    id: `spark_${nowMs.toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    x: Math.round(8 + Math.random() * 84),
    y: Math.round(10 + Math.random() * 80),
  };
}

function resetOrbitTarget(game, nowMs = Date.now()) {
  game.target = {
    id: `orbit_${nowMs.toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    x: Math.round(8 + Math.random() * 84),
    y: Math.round(10 + Math.random() * 80),
  };
  game.targetDuration = ORBIT_TARGET_MS;
  game.targetExpiresAt = nowMs + ORBIT_TARGET_MS;
}

function configureGameRound(game, nowMs = Date.now()) {
  const index = Math.max(0, game.round - 1);
  if (game.mode === "chemistry") {
    const item = CHEMISTRY_ROUNDS[index % CHEMISTRY_ROUNDS.length];
    game.prompt = item.prompt;
    game.options = item.options;
  } else if (game.mode === "vibe") {
    const item = VIBE_ROUNDS[index % VIBE_ROUNDS.length];
    game.prompt = item.prompt;
    game.options = item.options;
  } else if (game.mode === "truth") {
    game.prompt = GAME_PROMPTS[index % GAME_PROMPTS.length];
    game.options = [];
  } else if (game.mode === "story") {
    game.prompt = STORY_PROMPTS[index % STORY_PROMPTS.length];
    game.options = [];
  } else if (game.mode === "reaction") {
    game.prompt = "燈亮後立刻按下心動按鈕，太早按不算。";
    game.options = [];
    game.targetAt ||= nowMs + 2800;
  } else if (game.mode === "doodle") {
    game.prompt = DOODLE_PROMPTS[index % DOODLE_PROMPTS.length];
    game.options = [];
  } else if (game.mode === "spark") {
    game.prompt = "看見心動光點就搶，節奏像輕量 .io，適合語音房暖場。";
    game.options = [];
    if (!game.target?.id) resetSparkTarget(game);
  } else {
    game.prompt = "光點會自己亂跳，所有人一起追光搶分。";
    game.options = [];
    const expired = !game.target?.id || !game.targetExpiresAt || nowMs >= game.targetExpiresAt;
    if (expired) {
      resetOrbitTarget(game, nowMs);
      game.updatedAt = new Date(nowMs).toISOString();
    }
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
  if (["chemistry", "vibe"].includes(game.mode) && !game.options.includes(answer)) return;
  if (!["chemistry", "vibe", "truth", "story"].includes(game.mode)) return;
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
  game.targetExpiresAt = null;
  game.targetDuration = null;
  game.updatedAt = now.toISOString();
  configureGameRound(game, now.getTime());
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
  if (!sessionId || !["spark", "orbit"].includes(game.mode) || !targetId || targetId !== game.target?.id) return;
  if (game.mode === "orbit" && now.getTime() >= Number(game.targetExpiresAt || 0)) return;
  const existing = game.scores.find((item) => item.sessionId === sessionId);
  if (existing) {
    existing.score = Number(existing.score || 0) + 1;
    existing.updatedAt = now.toISOString();
  } else {
    game.scores.push({ sessionId, name: text(payload.name, "訪客", 80), score: 1, updatedAt: now.toISOString() });
  }
  if (game.mode === "spark") resetSparkTarget(game, now.getTime());
  else resetOrbitTarget(game, now.getTime());
  game.updatedAt = now.toISOString();
}

function nextGameRound(state, payload, now) {
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const game = roomGame(state, roomId);
  game.round += 1;
  game.answers = [];
  game.drawing = [];
  if (["reaction", "spark", "orbit"].includes(game.mode)) game.scores = [];
  game.targetAt = game.mode === "reaction" ? now.getTime() + 2500 + Math.floor(Math.random() * 1800) : null;
  game.targetExpiresAt = null;
  game.targetDuration = null;
  if (game.mode === "spark") resetSparkTarget(game, now.getTime());
  if (game.mode === "orbit") resetOrbitTarget(game, now.getTime());
  configureGameRound(game, now.getTime());
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
    const body = snapshot(state, roomId);
    await store.setJSON(ROOM_KEY, state);
    return json(body);
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
  const body = snapshot(state, text(payload.roomId, roomId, 80));
  await store.setJSON(ROOM_KEY, state);
  return json(body);
};

export const config = {
  path: "/api/realtime",
};

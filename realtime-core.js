export const MAX_MESSAGES = 120;
export const MAX_MATCHES = 50;
export const MAX_GAME_ANSWERS = 60;
export const ONLINE_WINDOW_MS = 60_000;
export const DEFAULT_ROOM_ID = "late-night";
export const ORBIT_TARGET_MS = 1400;
export const MEMORY_REVEAL_MS = 1500;

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

const QUIZ_ROUNDS = [
  {
    prompt: "哪個功能最適合第一次破冰？",
    options: ["吹牛骰", "靜態個人介紹", "搶點骰", "派對問答"],
    answer: "派對問答",
  },
  {
    prompt: "多人交友房最適合哪種節奏？",
    options: ["等很久才回", "輪流互動", "一直沉默", "只看不玩"],
    answer: "輪流互動",
  },
  {
    prompt: "免費派對桌遊最重要的是？",
    options: ["不用儲值", "一定要黑畫面", "只能單人", "不能聊天"],
    answer: "不用儲值",
  },
  {
    prompt: "哪一種最像房內一起暖場的小遊戲？",
    options: ["記憶配對", "關閉麥克風", "退出房間", "空白頁面"],
    answer: "記憶配對",
  },
];

const GAME_MODES = new Set([
  "chemistry",
  "vibe",
  "truth",
  "story",
  "reaction",
  "doodle",
  "spark",
  "orbit",
  "liar",
  "highroll",
  "rushdice",
  "highcard",
  "oldmaid",
  "texas",
  "rummy",
  "uno",
  "monopoly",
  "memory",
  "quiz",
  "roulette",
  "slots",
  "mahjong",
]);

const CARD_SUITS = ["S", "H", "D", "C"];
const CARD_RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const UNO_COLORS = ["R", "Y", "G", "B"];
const MEMORY_SYMBOLS = ["A", "B", "C", "D", "E", "F"];
const SLOT_SYMBOLS = ["Cherry", "Bell", "Heart", "Star", "Seven"];
const ROULETTE_REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);
const MAHJONG_SUITS = [
  { suit: "dot", label: "筒" },
  { suit: "bam", label: "條" },
  { suit: "char", label: "萬" },
];
const MONOPOLY_TILES = [
  { name: "Start", coins: 2 },
  { name: "Cafe", coins: 3 },
  { name: "Tax", coins: -2 },
  { name: "Arcade", coins: 4 },
  { name: "Storm", coins: -3 },
  { name: "Market", coins: 2 },
  { name: "Park", coins: 1 },
  { name: "Bonus", coins: 5 },
  { name: "Detour", coins: -1 },
  { name: "Cinema", coins: 3 },
  { name: "Surprise", coins: 0 },
  { name: "Station", coins: 2 },
];

export function text(value, fallback = "", limit = 500) {
  return String(value || fallback)
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, limit);
}

export function bool(value) {
  return value === true || value === "true";
}

export function clampNumber(value, min = 0, max = 100) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.max(min, Math.min(max, number));
}

export function getDevice(value) {
  const normalized = text(value, "web").toLowerCase();
  if (["mobile", "desktop", "tablet", "web"].includes(normalized)) return normalized;
  return "web";
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function uniqueId(prefix, nowMs = Date.now()) {
  return `${prefix}_${nowMs.toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function participantNameMap(roomParticipants) {
  return new Map(roomParticipants.map((participant) => [participant.sessionId, participant.name]));
}

function nameForSession(roomParticipants, sessionId, fallback = "訪客") {
  return participantNameMap(roomParticipants).get(sessionId) || fallback;
}

function activeSessions(roomParticipants) {
  return roomParticipants.map((participant) => participant.sessionId);
}

function cycleIndex(length, index) {
  if (!length) return 0;
  return ((index % length) + length) % length;
}

function nextTurn(game) {
  if (!game.turnOrder.length) return;
  game.turnIndex = cycleIndex(game.turnOrder.length, Number(game.turnIndex || 0) + 1);
}

function currentTurnSession(game) {
  if (!game.turnOrder.length) return "";
  return game.turnOrder[cycleIndex(game.turnOrder.length, Number(game.turnIndex || 0))] || "";
}

function syncTurnOrder(game, roomParticipants) {
  const currentIds = activeSessions(roomParticipants);
  const existing = Array.isArray(game.turnOrder) ? game.turnOrder.filter((sessionId) => currentIds.includes(sessionId)) : [];
  currentIds.forEach((sessionId) => {
    if (!existing.includes(sessionId)) existing.push(sessionId);
  });
  game.turnOrder = existing;
  game.turnIndex = cycleIndex(game.turnOrder.length || 1, Number(game.turnIndex || 0));
}

function baseGame(roomId) {
  return {
    roomId,
    mode: "chemistry",
    round: 1,
    prompt: "",
    options: [],
    answers: [],
    scores: [],
    drawing: [],
    target: null,
    targetAt: null,
    targetExpiresAt: null,
    targetDuration: null,
    targetTotal: null,
    correctAnswer: "",
    deck: [],
    hands: {},
    revealedHands: {},
    communityCards: [],
    topCard: null,
    board: [],
    matched: [],
    flipped: [],
    flipExpiresAt: null,
    turnOrder: [],
    turnIndex: 0,
    bid: null,
    positions: {},
    coins: {},
    bets: {},
    spinResult: null,
    lastSummary: "",
    updatedAt: new Date().toISOString(),
  };
}

export function createInitialState() {
  return {
    participants: [],
    messages: [
      {
        id: "system-welcome",
        roomId: DEFAULT_ROOM_ID,
        sessionId: "system",
        toSessionId: "",
        matchId: "",
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

export function normalizeState(state) {
  state.participants = Array.isArray(state.participants) ? state.participants : [];
  state.messages = Array.isArray(state.messages) ? state.messages : [];
  state.matches = Array.isArray(state.matches) ? state.matches : [];
  state.games = state.games && typeof state.games === "object" ? state.games : {};
  return state;
}

function createStandardDeck() {
  return shuffle(
    CARD_SUITS.flatMap((suit) =>
      CARD_RANKS.map((rank) => ({
        id: `${rank}${suit}`,
        rank,
        suit,
        label: formatCard({ rank, suit }),
      })),
    ),
  );
}

function formatCard(card) {
  const label = { 11: "J", 12: "Q", 13: "K", 14: "A" }[card.rank] || String(card.rank);
  return `${label}${card.suit}`;
}

function cardValue(rank) {
  return Math.min(rank, 10);
}

function rollDice(count = 2) {
  return Array.from({ length: count }, () => randomInt(1, 6));
}

function createUnoDeck() {
  const cards = [];
  UNO_COLORS.forEach((color) => {
    for (let value = 0; value <= 9; value += 1) cards.push(`${color}${value}`);
    cards.push(`${color}SKIP`);
    cards.push(`${color}D2`);
  });
  return shuffle(cards);
}

function parseUnoCard(card) {
  const color = card.slice(0, 1);
  const value = card.slice(1);
  return { color, value };
}

function createOldMaidDeck() {
  const ranks = ["A", "A", "K", "K", "Q", "Q", "J", "J", "10", "10", "9", "9", "8", "8", "7", "7", "6", "6", "5", "5", "JK"];
  return shuffle(ranks);
}

function createMahjongWall() {
  const tiles = [];
  MAHJONG_SUITS.forEach(({ suit, label }) => {
    for (let rank = 1; rank <= 9; rank += 1) {
      for (let copy = 1; copy <= 4; copy += 1) {
        tiles.push({
          id: `${suit}-${rank}-${copy}`,
          suit,
          rank,
          label: `${rank}${label}`,
        });
      }
    }
  });
  return shuffle(tiles);
}

function createMemoryBoard() {
  return shuffle([...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]);
}

function createGameScoreList(roomParticipants) {
  return roomParticipants.map((participant) => ({
    sessionId: participant.sessionId,
    name: participant.name,
    score: 0,
    updatedAt: new Date().toISOString(),
  }));
}

function upsertScore(game, sessionId, name, score, now, mode = "replace") {
  const existing = game.scores.findIndex((item) => item.sessionId === sessionId);
  const entry = { sessionId, name, score, updatedAt: now.toISOString() };
  if (existing < 0) {
    game.scores.push(entry);
    return;
  }
  if (mode === "increment") game.scores[existing] = { ...entry, score: Number(game.scores[existing].score || 0) + Number(score || 0) };
  else if (mode === "min") {
    const best = Math.min(Number(game.scores[existing].score || Infinity), Number(score || Infinity));
    game.scores[existing] = { ...entry, score: Number.isFinite(best) ? best : Number(score || 0) };
  } else game.scores[existing] = entry;
}

function setAnswer(game, sessionId, name, answer, now) {
  game.answers = game.answers.filter((item) => item.sessionId !== sessionId || item.round !== game.round);
  game.answers.push({
    id: uniqueId("answer", now.getTime()),
    round: game.round,
    sessionId,
    name,
    answer,
    at: now.toISOString(),
  });
}

function ensureModeFields(game) {
  game.mode = GAME_MODES.has(game.mode) ? game.mode : "chemistry";
  game.round = Math.max(1, Number(game.round || 1));
  game.prompt = text(game.prompt, "", 240);
  game.options = Array.isArray(game.options) ? game.options : [];
  game.answers = Array.isArray(game.answers) ? game.answers : [];
  game.scores = Array.isArray(game.scores) ? game.scores : [];
  game.drawing = Array.isArray(game.drawing) ? game.drawing : [];
  game.target = game.target && typeof game.target === "object" ? game.target : null;
  game.targetAt = Number(game.targetAt || 0) || null;
  game.targetExpiresAt = Number(game.targetExpiresAt || 0) || null;
  game.targetDuration = Number(game.targetDuration || 0) || null;
  game.targetTotal = Number(game.targetTotal || 0) || null;
  game.correctAnswer = text(game.correctAnswer, "", 80);
  game.deck = Array.isArray(game.deck) ? game.deck : [];
  game.hands = game.hands && typeof game.hands === "object" ? game.hands : {};
  game.revealedHands = game.revealedHands && typeof game.revealedHands === "object" ? game.revealedHands : {};
  game.communityCards = Array.isArray(game.communityCards) ? game.communityCards : [];
  game.topCard = game.topCard || null;
  game.board = Array.isArray(game.board) ? game.board : [];
  game.matched = Array.isArray(game.matched) ? game.matched : [];
  game.flipped = Array.isArray(game.flipped) ? game.flipped : [];
  game.flipExpiresAt = Number(game.flipExpiresAt || 0) || null;
  game.turnOrder = Array.isArray(game.turnOrder) ? game.turnOrder : [];
  game.turnIndex = Number(game.turnIndex || 0);
  game.bid = game.bid && typeof game.bid === "object" ? game.bid : null;
  game.positions = game.positions && typeof game.positions === "object" ? game.positions : {};
  game.coins = game.coins && typeof game.coins === "object" ? game.coins : {};
  game.bets = game.bets && typeof game.bets === "object" ? game.bets : {};
  game.spinResult = game.spinResult && typeof game.spinResult === "object" ? game.spinResult : null;
  game.lastSummary = text(game.lastSummary, "", 320);
}

function resetGameTable(game) {
  game.options = [];
  game.answers = [];
  game.scores = [];
  game.drawing = [];
  game.target = null;
  game.targetAt = null;
  game.targetExpiresAt = null;
  game.targetDuration = null;
  game.targetTotal = null;
  game.correctAnswer = "";
  game.deck = [];
  game.hands = {};
  game.revealedHands = {};
  game.communityCards = [];
  game.topCard = null;
  game.board = [];
  game.matched = [];
  game.flipped = [];
  game.flipExpiresAt = null;
  game.turnOrder = [];
  game.turnIndex = 0;
  game.bid = null;
  game.positions = {};
  game.coins = {};
  game.bets = {};
  game.spinResult = null;
  game.lastSummary = "";
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

function dealHands(game, roomParticipants, count, deckFactory = createStandardDeck) {
  const sessions = activeSessions(roomParticipants);
  const deck = deckFactory();
  game.deck = deck;
  game.hands = {};
  sessions.forEach((sessionId) => {
    game.hands[sessionId] = [];
    for (let index = 0; index < count; index += 1) {
      if (!game.deck.length) game.deck.push(...deckFactory());
      game.hands[sessionId].push(game.deck.pop());
    }
  });
}

function initializeMonopoly(game, roomParticipants) {
  syncTurnOrder(game, roomParticipants);
  roomParticipants.forEach((participant) => {
    game.positions[participant.sessionId] = 0;
    game.coins[participant.sessionId] = 12;
  });
  game.scores = createGameScoreList(roomParticipants);
}

function initializeMemory(game, roomParticipants) {
  syncTurnOrder(game, roomParticipants);
  game.board = createMemoryBoard();
  game.matched = Array.from({ length: game.board.length }, () => false);
  game.flipped = [];
  game.flipExpiresAt = null;
  game.scores = createGameScoreList(roomParticipants);
}

function initializeUno(game, roomParticipants) {
  syncTurnOrder(game, roomParticipants);
  game.deck = createUnoDeck();
  game.hands = {};
  roomParticipants.forEach((participant) => {
    game.hands[participant.sessionId] = Array.from({ length: 5 }, () => game.deck.pop());
  });
  game.topCard = game.deck.pop();
  game.scores = createGameScoreList(roomParticipants);
}

function initializeLiar(game, roomParticipants) {
  syncTurnOrder(game, roomParticipants);
  game.hands = {};
  roomParticipants.forEach((participant) => {
    game.hands[participant.sessionId] = rollDice(5);
  });
  game.scores = createGameScoreList(roomParticipants);
}

function initializeHighCard(game, roomParticipants) {
  game.deck = createStandardDeck();
  game.hands = {};
  game.scores = [];
  roomParticipants.forEach((participant) => {
    game.hands[participant.sessionId] = [];
  });
}

function initializeTexas(game, roomParticipants) {
  const deck = createStandardDeck();
  game.communityCards = deck.splice(0, 5);
  game.hands = {};
  roomParticipants.forEach((participant) => {
    game.hands[participant.sessionId] = deck.splice(0, 2);
  });
  game.deck = deck;
  game.scores = [];
}

function initializeRushDice(game) {
  game.targetTotal = randomInt(4, 11);
  game.scores = [];
  game.lastSummary = "先擲出目標總點數的人會得分。";
}

function initializeOldMaid(game, roomParticipants) {
  dealHands(game, roomParticipants, 5, createOldMaidDeck);
  game.scores = [];
}

function initializeRummy(game, roomParticipants) {
  dealHands(game, roomParticipants, 7, createStandardDeck);
  game.scores = [];
}

function initializeRoulette(game, roomParticipants) {
  game.scores = createGameScoreList(roomParticipants);
  roomParticipants.forEach((participant) => {
    game.coins[participant.sessionId] = Number(game.coins[participant.sessionId] || 20);
  });
  game.bets = {};
  game.spinResult = null;
}

function initializeSlots(game, roomParticipants) {
  game.scores = createGameScoreList(roomParticipants);
}

function initializeMahjong(game, roomParticipants) {
  dealHands(game, roomParticipants, 14, createMahjongWall);
  game.scores = [];
}

function initializeQuiz(game) {
  const item = QUIZ_ROUNDS[(game.round - 1) % QUIZ_ROUNDS.length];
  game.prompt = item.prompt;
  game.options = item.options;
  game.correctAnswer = item.answer;
}

function maybeResetHandsForNewParticipants(game, roomParticipants, count, deckFactory) {
  const sessionIds = activeSessions(roomParticipants);
  const currentIds = Object.keys(game.hands || {});
  if (sessionIds.length && sessionIds.some((sessionId) => !currentIds.includes(sessionId))) {
    dealHands(game, roomParticipants, count, deckFactory);
  }
}

function configureGameRound(game, roomParticipants, nowMs = Date.now()) {
  ensureModeFields(game);
  syncTurnOrder(game, roomParticipants);
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
  } else if (game.mode === "story") {
    game.prompt = STORY_PROMPTS[index % STORY_PROMPTS.length];
  } else if (game.mode === "reaction") {
    game.prompt = "燈亮後立刻按下心動按鈕，太早按不算。";
    game.targetAt ||= nowMs + 2800;
  } else if (game.mode === "doodle") {
    game.prompt = DOODLE_PROMPTS[index % DOODLE_PROMPTS.length];
  } else if (game.mode === "spark") {
    game.prompt = "看見心動光點就搶，節奏像輕量 .io，適合語音房暖場。";
    if (!game.target?.id) resetSparkTarget(game);
  } else if (game.mode === "orbit") {
    game.prompt = "光點會自己亂跳，所有人一起追光搶分。";
    if (!game.target?.id || !game.targetExpiresAt || nowMs >= game.targetExpiresAt) resetOrbitTarget(game, nowMs);
  } else if (game.mode === "liar") {
    game.prompt = "免費吹牛骰：輪到你時加注，或直接喊抓包。";
    if (!Object.keys(game.hands || {}).length) initializeLiar(game, roomParticipants);
  } else if (game.mode === "highroll") {
    game.prompt = "比大小：每人擲兩顆骰，比總點數。";
  } else if (game.mode === "rushdice") {
    game.prompt = `搶點骰：先擲出 ${game.targetTotal || 7} 點的人得分。`;
    if (!game.targetTotal) initializeRushDice(game);
  } else if (game.mode === "highcard") {
    game.prompt = "撲克牌比大：抽一張牌，比誰最大。";
    if (!game.deck.length) initializeHighCard(game, roomParticipants);
  } else if (game.mode === "oldmaid") {
    game.prompt = "抽鬼牌派對版：整理手牌後，看鬼牌是否還留在手上。";
    if (!Object.keys(game.hands || {}).length) initializeOldMaid(game, roomParticipants);
    maybeResetHandsForNewParticipants(game, roomParticipants, 5, createOldMaidDeck);
  } else if (game.mode === "texas") {
    game.prompt = "德州撲克簡化版：直接發公共牌與手牌，免費比牌型。";
    if (!Object.keys(game.hands || {}).length || !game.communityCards.length) initializeTexas(game, roomParticipants);
  } else if (game.mode === "rummy") {
    game.prompt = "Rummy 配牌接龍：整理你的七張牌，湊出最多順子與刻子。";
    if (!Object.keys(game.hands || {}).length) initializeRummy(game, roomParticipants);
    maybeResetHandsForNewParticipants(game, roomParticipants, 7, createStandardDeck);
  } else if (game.mode === "uno") {
    game.prompt = "UNO 風格：輪到你時出同色或同數字，不用儲值也能一直玩。";
    if (!game.topCard) initializeUno(game, roomParticipants);
  } else if (game.mode === "monopoly") {
    game.prompt = "輕量大富翁：輪流擲骰前進，踩格子賺或掉代幣。";
    if (!Object.keys(game.positions || {}).length) initializeMonopoly(game, roomParticipants);
  } else if (game.mode === "memory") {
    game.prompt = "記憶配對：輪流翻牌，配到一組就得分。";
    if (!game.board.length) initializeMemory(game, roomParticipants);
  } else if (game.mode === "quiz") {
    initializeQuiz(game);
  } else if (game.mode === "roulette") {
    game.prompt = "幸運輪盤：先押區塊，再由房內任一人開盤，全房一起看結果。";
    if (!game.scores.length) initializeRoulette(game, roomParticipants);
  } else if (game.mode === "slots") {
    game.prompt = "777 老虎機：每個人都能免費拉霸，命中連線就累積籌碼。";
    if (!game.scores.length) initializeSlots(game, roomParticipants);
  } else if (game.mode === "mahjong") {
    game.prompt = "麻將配牌：免費發 14 張牌，整理出最多面子與將眼。";
    if (!Object.keys(game.hands || {}).length) initializeMahjong(game, roomParticipants);
    maybeResetHandsForNewParticipants(game, roomParticipants, 14, createMahjongWall);
  }
}

function clearExpiredTransientState(game, nowMs = Date.now()) {
  if (game.mode === "memory" && game.flipped.length === 2 && game.flipExpiresAt && nowMs >= game.flipExpiresAt) {
    game.flipped = [];
    game.flipExpiresAt = null;
  }
}

function roomParticipants(state, roomId) {
  return state.participants.filter((participant) => participant.roomId === roomId);
}

function roomGame(state, roomId, nowMs = Date.now()) {
  if (!state.games[roomId]) state.games[roomId] = baseGame(roomId);
  const game = state.games[roomId];
  ensureModeFields(game);
  const participants = roomParticipants(state, roomId);
  clearExpiredTransientState(game, nowMs);
  configureGameRound(game, participants, nowMs);
  return game;
}

function cloneGame(game) {
  return JSON.parse(JSON.stringify(game));
}

function hiddenHandCounts(game, participants, sessionId) {
  return participants.map((participant) => ({
    sessionId: participant.sessionId,
    name: participant.name,
    count: Array.isArray(game.hands?.[participant.sessionId]) ? game.hands[participant.sessionId].length : 0,
    isMe: participant.sessionId === sessionId,
  }));
}

function serializeGameForSession(game, participants, sessionId) {
  const view = cloneGame(game);
  const privateModes = new Set(["liar", "oldmaid", "texas", "rummy", "uno", "highcard", "mahjong"]);
  if (privateModes.has(view.mode)) {
    view.myHand = Array.isArray(view.hands?.[sessionId]) ? view.hands[sessionId] : [];
    view.handCounts = hiddenHandCounts(view, participants, sessionId);
    delete view.hands;
  }
  if (view.mode === "liar") {
    view.totalDice = participants.reduce((sum, participant) => sum + (Array.isArray(game.hands?.[participant.sessionId]) ? game.hands[participant.sessionId].length : 0), 0);
  }
  if (view.mode === "monopoly") {
    view.tileMeta = MONOPOLY_TILES;
  }
  return view;
}

export function snapshot(state, roomId, sessionId = "", nowMs = Date.now()) {
  const participants = roomParticipants(state, roomId);
  const messages = state.messages
    .filter((message) => {
      if (message.roomId !== roomId) return false;
      if (!message.toSessionId) return true;
      if (!sessionId) return false;
      return message.sessionId === sessionId || message.toSessionId === sessionId;
    })
    .slice(-80);
  const matches = state.matches.filter((match) => match.roomId === roomId).slice(-20);
  const game = serializeGameForSession(roomGame(state, roomId, nowMs), participants, sessionId);
  return {
    ok: true,
    roomId,
    generatedAt: new Date(nowMs).toISOString(),
    allOnline: state.participants.length,
    participants,
    messages,
    matches,
    game,
    capabilities: {
      chat: true,
      matching: true,
      games: true,
      voicePresence: true,
      realtimeMode: "polling-functions",
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
  const existingIndex = state.participants.findIndex((item) => item.sessionId === sessionId);
  const existing = existingIndex >= 0 ? state.participants[existingIndex] : {};
  const next = participantFromPayload(payload, now, existing);
  if (existingIndex >= 0) state.participants[existingIndex] = next;
  else state.participants.push(next);
  return next;
}

function addMessage(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const message = text(payload.text, "", 240);
  if (!sessionId || !message) return;
  const toSessionId = text(payload.toSessionId, "", 120);
  const matchId = text(payload.matchId, "", 120);
  if (toSessionId) {
    const acceptedMatch = state.matches.find(
      (match) =>
        match.roomId === roomId &&
        match.status === "accepted" &&
        (
          (match.fromSessionId === sessionId && match.toSessionId === toSessionId) ||
          (match.fromSessionId === toSessionId && match.toSessionId === sessionId)
        ) &&
        (!matchId || match.id === matchId),
    );
    if (!acceptedMatch) return;
  }
  state.messages.push({
    id: uniqueId("msg", now.getTime()),
    roomId,
    sessionId,
    toSessionId,
    matchId,
    name: text(payload.name, "訪客", 80),
    text: message,
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
  const roomParty = roomParticipants(state, roomId).filter((item) => item.sessionId !== fromSessionId);
  const target =
    roomParty.find((item) => item.sessionId === text(payload.toSessionId, "", 120)) ||
    roomParty[Math.floor(Math.random() * roomParty.length)];
  state.matches.push({
    id: uniqueId("match", now.getTime()),
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
  const game = roomGame(state, roomId, now.getTime());
  const roomParty = roomParticipants(state, roomId);
  const name = text(payload.name, nameForSession(roomParty, sessionId, "訪客"), 80);
  if (["chemistry", "vibe", "quiz"].includes(game.mode) && !game.options.includes(answer)) return;
  if (!["chemistry", "vibe", "truth", "story", "quiz"].includes(game.mode)) return;
  setAnswer(game, sessionId, name, answer, now);
  if (game.mode === "quiz" && answer === game.correctAnswer) upsertScore(game, sessionId, name, 1, now, "replace");
  game.updatedAt = now.toISOString();
}

function selectGameMode(state, payload, now) {
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const mode = text(payload.mode, "chemistry", 30);
  if (!GAME_MODES.has(mode)) return;
  const game = roomGame(state, roomId, now.getTime());
  game.mode = mode;
  game.round = 1;
  resetGameTable(game);
  if (mode === "reaction") game.targetAt = now.getTime() + 2500 + Math.floor(Math.random() * 1800);
  configureGameRound(game, roomParticipants(state, roomId), now.getTime());
  game.updatedAt = now.toISOString();
}

function nextGameRound(state, payload, now) {
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const game = roomGame(state, roomId, now.getTime());
  game.round += 1;
  resetGameTable(game);
  if (game.mode === "reaction") game.targetAt = now.getTime() + 2500 + Math.floor(Math.random() * 1800);
  configureGameRound(game, roomParticipants(state, roomId), now.getTime());
  game.updatedAt = now.toISOString();
}

function recordGameBuzz(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const roomParty = roomParticipants(state, roomId);
  const game = roomGame(state, roomId, now.getTime());
  if (!sessionId || game.mode !== "reaction" || !game.targetAt || now.getTime() < game.targetAt) return;
  const elapsed = Math.max(0, now.getTime() - game.targetAt);
  const name = text(payload.name, nameForSession(roomParty, sessionId, "訪客"), 80);
  upsertScore(game, sessionId, name, elapsed, now, "min");
  setAnswer(game, sessionId, name, `${elapsed} ms`, now);
  game.updatedAt = now.toISOString();
}

function addDrawingLines(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80), now.getTime());
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
  const game = roomGame(state, text(payload.roomId, DEFAULT_ROOM_ID, 80), now.getTime());
  if (game.mode !== "doodle") return;
  game.drawing = [];
  game.updatedAt = now.toISOString();
}

function recordSparkTap(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const targetId = text(payload.targetId, "", 120);
  const roomParty = roomParticipants(state, roomId);
  const game = roomGame(state, roomId, now.getTime());
  if (!sessionId || !["spark", "orbit"].includes(game.mode) || !targetId || targetId !== game.target?.id) return;
  if (game.mode === "orbit" && now.getTime() >= Number(game.targetExpiresAt || 0)) return;
  const name = text(payload.name, nameForSession(roomParty, sessionId, "訪客"), 80);
  upsertScore(game, sessionId, name, 1, now, "increment");
  if (game.mode === "spark") resetSparkTarget(game, now.getTime());
  else resetOrbitTarget(game, now.getTime());
  game.updatedAt = now.toISOString();
}

function canPlayUnoCard(card, topCard) {
  if (!topCard) return true;
  const next = parseUnoCard(card);
  const top = parseUnoCard(topCard);
  return next.color === top.color || next.value === top.value;
}

function pokerTupleToNumber(tuple) {
  return tuple.reduce((sum, item, index) => sum + Number(item) * 15 ** (tuple.length - index), 0);
}

function evaluateFiveCardHand(cards) {
  const ranks = cards.map((card) => card.rank).sort((a, b) => b - a);
  const suits = cards.map((card) => card.suit);
  const counts = new Map();
  ranks.forEach((rank) => counts.set(rank, (counts.get(rank) || 0) + 1));
  const groups = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0] - a[0]);
  const flush = suits.every((suit) => suit === suits[0]);
  const uniqueRanks = [...new Set(ranks)].sort((a, b) => b - a);
  let straightHigh = 0;
  if (uniqueRanks.length === 5) {
    const normal = uniqueRanks[0] - uniqueRanks[4] === 4;
    const wheel = JSON.stringify(uniqueRanks) === JSON.stringify([14, 5, 4, 3, 2]);
    if (normal) straightHigh = uniqueRanks[0];
    else if (wheel) straightHigh = 5;
  }
  if (flush && straightHigh) {
    return { score: pokerTupleToNumber([8, straightHigh, 0, 0, 0, 0]), label: straightHigh === 14 ? "皇家同花順" : "同花順" };
  }
  if (groups[0][1] === 4) {
    return { score: pokerTupleToNumber([7, groups[0][0], groups[1][0], 0, 0, 0]), label: "四條" };
  }
  if (groups[0][1] === 3 && groups[1][1] === 2) {
    return { score: pokerTupleToNumber([6, groups[0][0], groups[1][0], 0, 0, 0]), label: "葫蘆" };
  }
  if (flush) {
    return { score: pokerTupleToNumber([5, ...ranks]), label: "同花" };
  }
  if (straightHigh) {
    return { score: pokerTupleToNumber([4, straightHigh, 0, 0, 0, 0]), label: "順子" };
  }
  if (groups[0][1] === 3) {
    const kickers = groups.filter((group) => group[1] === 1).map((group) => group[0]).sort((a, b) => b - a);
    return { score: pokerTupleToNumber([3, groups[0][0], ...kickers, 0, 0]), label: "三條" };
  }
  if (groups[0][1] === 2 && groups[1][1] === 2) {
    const pairRanks = groups.filter((group) => group[1] === 2).map((group) => group[0]).sort((a, b) => b - a);
    const kicker = groups.find((group) => group[1] === 1)?.[0] || 0;
    return { score: pokerTupleToNumber([2, pairRanks[0], pairRanks[1], kicker, 0, 0]), label: "兩對" };
  }
  if (groups[0][1] === 2) {
    const kickers = groups.filter((group) => group[1] === 1).map((group) => group[0]).sort((a, b) => b - a);
    return { score: pokerTupleToNumber([1, groups[0][0], ...kickers, 0]), label: "一對" };
  }
  return { score: pokerTupleToNumber([0, ...ranks]), label: "高牌" };
}

function combinations(items, size) {
  if (size === 0) return [[]];
  if (items.length < size) return [];
  if (items.length === size) return [items];
  const [first, ...rest] = items;
  return [
    ...combinations(rest, size - 1).map((combo) => [first, ...combo]),
    ...combinations(rest, size),
  ];
}

function bestTexasHand(cards) {
  let best = { score: -1, label: "高牌" };
  combinations(cards, 5).forEach((combo) => {
    const candidate = evaluateFiveCardHand(combo);
    if (candidate.score > best.score) best = candidate;
  });
  return best;
}

function oldMaidResult(hand) {
  const counts = new Map();
  hand.forEach((card) => counts.set(card, (counts.get(card) || 0) + 1));
  let pairCount = 0;
  const leftovers = [];
  counts.forEach((count, rank) => {
    if (rank === "JK") {
      if (count % 2) leftovers.push(rank);
      return;
    }
    pairCount += Math.floor(count / 2);
    if (count % 2) leftovers.push(rank);
  });
  const hasJoker = leftovers.includes("JK");
  return {
    score: hasJoker ? 0 : pairCount,
    label: hasJoker ? "鬼牌留在手上" : pairCount ? `整理出 ${pairCount} 組，成功躲過鬼牌` : "沒有成對，但也沒抽到鬼牌",
  };
}

function rankOrderForRummy(card) {
  return card.rank === 14 ? 1 : card.rank;
}

function rummyCardLabel(card) {
  const rankLabel = { 11: "J", 12: "Q", 13: "K", 14: "A" }[card.rank] || String(card.rank);
  return `${rankLabel}${card.suit}`;
}

function rummyMelds(hand) {
  const melds = [];
  const byRank = new Map();
  hand.forEach((card) => {
    const key = String(card.rank);
    if (!byRank.has(key)) byRank.set(key, []);
    byRank.get(key).push(card);
  });
  byRank.forEach((cards) => {
    if (cards.length >= 3) melds.push({ kind: "set", cards: [...cards], score: cards.reduce((sum, card) => sum + cardValue(card.rank), 0) });
  });
  const bySuit = new Map();
  hand.forEach((card) => {
    if (!bySuit.has(card.suit)) bySuit.set(card.suit, []);
    bySuit.get(card.suit).push(card);
  });
  bySuit.forEach((cards) => {
    const sorted = [...cards].sort((a, b) => rankOrderForRummy(a) - rankOrderForRummy(b));
    for (let start = 0; start < sorted.length; start += 1) {
      let run = [sorted[start]];
      for (let index = start + 1; index < sorted.length; index += 1) {
        const previous = rankOrderForRummy(sorted[index - 1]);
        const current = rankOrderForRummy(sorted[index]);
        if (current === previous + 1) {
          run.push(sorted[index]);
          if (run.length >= 3) melds.push({ kind: "run", cards: [...run], score: run.reduce((sum, card) => sum + cardValue(card.rank), 0) });
        } else if (current !== previous) {
          break;
        }
      }
    }
  });
  return melds;
}

function bestRummyLayout(hand) {
  const meldOptions = rummyMelds(hand).map((meld) => ({
    ...meld,
    keys: new Set(meld.cards.map((card) => card.id)),
  }));
  let best = { score: 0, groups: [] };
  const visit = (index, chosen, usedKeys, score) => {
    if (score > best.score) best = { score, groups: chosen.map((item) => item.cards) };
    if (index >= meldOptions.length) return;
    visit(index + 1, chosen, usedKeys, score);
    const next = meldOptions[index];
    if ([...next.keys].some((key) => usedKeys.has(key))) return;
    const updated = new Set(usedKeys);
    next.keys.forEach((key) => updated.add(key));
    visit(index + 1, [...chosen, next], updated, score + next.score);
  };
  visit(0, [], new Set(), 0);
  const label = best.groups.length
    ? best.groups.map((group) => group.map((card) => rummyCardLabel(card)).join("-")).join(" / ")
    : "目前沒有完整三張以上順子或刻子";
  return { score: best.score, label };
}

function liarBidValue(count, face) {
  return (Number(count) - 1) * 6 + Number(face);
}

function nextLiarBid(current) {
  const next = liarBidValue(current.count, current.face) + 1;
  return { count: Math.floor((next - 1) / 6) + 1, face: ((next - 1) % 6) + 1 };
}

function rouletteColor(number) {
  if (number === 0) return "green";
  return ROULETTE_REDS.has(number) ? "red" : "black";
}

function rouletteBetLabel(bet) {
  return {
    red: "紅",
    black: "黑",
    odd: "單",
    even: "雙",
    low: "1-18",
    high: "19-36",
    "dozen-1": "1-12",
    "dozen-2": "13-24",
    "dozen-3": "25-36",
  }[bet] || "未下注";
}

function roulettePayout(bet, number) {
  if (number === 0) return 0;
  if ((bet === "red" && rouletteColor(number) === "red") || (bet === "black" && rouletteColor(number) === "black")) return 2;
  if ((bet === "odd" && number % 2 === 1) || (bet === "even" && number % 2 === 0)) return 2;
  if ((bet === "low" && number >= 1 && number <= 18) || (bet === "high" && number >= 19 && number <= 36)) return 2;
  if ((bet === "dozen-1" && number >= 1 && number <= 12) || (bet === "dozen-2" && number >= 13 && number <= 24) || (bet === "dozen-3" && number >= 25 && number <= 36)) return 4;
  return 0;
}

function slotSpinResult() {
  return Array.from({ length: 3 }, () => SLOT_SYMBOLS[randomInt(0, SLOT_SYMBOLS.length - 1)]);
}

function slotPayout(symbols) {
  const counts = new Map();
  symbols.forEach((symbol) => counts.set(symbol, (counts.get(symbol) || 0) + 1));
  const values = [...counts.values()].sort((a, b) => b - a);
  if (symbols.every((symbol) => symbol === "Seven")) return 10;
  if (values[0] === 3) return 6;
  if (values[0] === 2) return 3;
  if (symbols.includes("Heart")) return 1;
  return 0;
}

function mahjongTileKey(tile) {
  return `${tile.suit}:${tile.rank}`;
}

function parseMahjongKey(key) {
  const [suit, rank] = String(key).split(":");
  return { suit, rank: Number(rank) };
}

function bestMahjongLayout(hand) {
  const counts = new Map();
  hand.forEach((tile) => {
    const key = mahjongTileKey(tile);
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  const serialize = (map) =>
    [...map.entries()]
      .filter(([, count]) => count > 0)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, count]) => `${key}:${count}`)
      .join("|");
  const memo = new Map();
  const better = (left, right) => {
    if (!right) return left;
    if (left.melds !== right.melds) return left.melds > right.melds ? left : right;
    if (left.hasPair !== right.hasPair) return left.hasPair ? left : right;
    if (left.deadwood !== right.deadwood) return left.deadwood < right.deadwood ? left : right;
    return left;
  };
  const visit = (map, hasPair) => {
    const memoKey = `${serialize(map)}#${hasPair ? 1 : 0}`;
    if (memo.has(memoKey)) return memo.get(memoKey);
    const firstEntry = [...map.entries()].find(([, count]) => count > 0);
    if (!firstEntry) {
      const result = { melds: 0, hasPair, deadwood: 0 };
      memo.set(memoKey, result);
      return result;
    }
    const [firstKey, firstCount] = firstEntry;
    const { suit, rank } = parseMahjongKey(firstKey);
    const useTile = (changes) => {
      const next = new Map(map);
      changes.forEach(([key, delta]) => next.set(key, (next.get(key) || 0) + delta));
      return next;
    };
    let best = visit(useTile([[firstKey, -1]]), hasPair);
    best = { ...best, deadwood: best.deadwood + 1 };
    if (!hasPair && firstCount >= 2) {
      const candidate = visit(useTile([[firstKey, -2]]), true);
      best = better(candidate, best);
    }
    if (firstCount >= 3) {
      const candidate = visit(useTile([[firstKey, -3]]), hasPair);
      best = better({ ...candidate, melds: candidate.melds + 1 }, best);
    }
    if (rank <= 7) {
      const secondKey = `${suit}:${rank + 1}`;
      const thirdKey = `${suit}:${rank + 2}`;
      if ((map.get(secondKey) || 0) > 0 && (map.get(thirdKey) || 0) > 0) {
        const candidate = visit(
          useTile([
            [firstKey, -1],
            [secondKey, -1],
            [thirdKey, -1],
          ]),
          hasPair,
        );
        best = better({ ...candidate, melds: candidate.melds + 1 }, best);
      }
    }
    memo.set(memoKey, best);
    return best;
  };
  const best = visit(counts, false);
  const score = Math.max(0, best.melds * 6 + (best.hasPair ? 2 : 0) - best.deadwood);
  let label = `完成 ${best.melds} 組面子`;
  if (best.hasPair) label += " + 1 組將眼";
  if (best.melds >= 4 && best.hasPair) label += "，已接近胡牌";
  else if (best.melds >= 3) label += "，牌型很順";
  else label += "，再等等下一局";
  return { score, label };
}

function applyGameAction(state, payload, now) {
  const sessionId = text(payload.sessionId, "", 120);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  const move = text(payload.move, "", 40);
  if (!sessionId || !move) return;
  const roomParty = roomParticipants(state, roomId);
  const game = roomGame(state, roomId, now.getTime());
  const name = text(payload.name, nameForSession(roomParty, sessionId, "訪客"), 80);

  if (game.mode === "liar") {
    if (move === "bid") {
      if (currentTurnSession(game) !== sessionId) return;
      const count = clampNumber(payload.count, 1, 30);
      const face = clampNumber(payload.face, 1, 6);
      if (game.bid && liarBidValue(count, face) <= liarBidValue(game.bid.count, game.bid.face)) return;
      game.bid = { count, face, bySessionId: sessionId, byName: name };
      game.lastSummary = `${name} 叫了 ${count} 個 ${face} 點`;
      nextTurn(game);
      game.updatedAt = now.toISOString();
      return;
    }
    if (move === "challenge") {
      if (!game.bid || currentTurnSession(game) !== sessionId) return;
      const total = Object.values(game.hands || {}).flat().filter((die) => Number(die) === Number(game.bid.face)).length;
      const bidderWon = total >= Number(game.bid.count);
      const winnerId = bidderWon ? game.bid.bySessionId : sessionId;
      const winnerName = bidderWon ? game.bid.byName : name;
      upsertScore(game, winnerId, winnerName, 1, now, "increment");
      game.lastSummary = `${name} 抓包 ${game.bid.byName}，全場其實有 ${total} 顆 ${game.bid.face} 點，${winnerName} 這局拿下。`;
      game.revealedHands = { ...game.hands };
      game.updatedAt = now.toISOString();
      return;
    }
  }

  if (game.mode === "highroll" && move === "roll") {
    const dice = rollDice(2);
    const total = dice[0] + dice[1];
    upsertScore(game, sessionId, name, total, now, "replace");
    setAnswer(game, sessionId, name, `${dice[0]} + ${dice[1]} = ${total}`, now);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "rushdice" && move === "roll") {
    const dice = rollDice(2);
    const total = dice[0] + dice[1];
    setAnswer(game, sessionId, name, `${dice[0]} + ${dice[1]} = ${total}`, now);
    if (total === game.targetTotal) {
      upsertScore(game, sessionId, name, 1, now, "increment");
      game.lastSummary = `${name} 命中 ${game.targetTotal} 點，立刻拿下一分。`;
      game.targetTotal = randomInt(4, 11);
      game.prompt = `搶點骰：先擲出 ${game.targetTotal} 點的人得分。`;
    }
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "highcard" && move === "draw") {
    if (currentTurnSession(game) && currentTurnSession(game) !== sessionId && game.turnOrder.length) {
      const alreadyDrew = Array.isArray(game.hands?.[sessionId]) && game.hands[sessionId].length;
      if (!alreadyDrew) return;
    }
    if (!game.deck.length) game.deck = createStandardDeck();
    if (Array.isArray(game.hands?.[sessionId]) && game.hands[sessionId].length) return;
    const card = game.deck.pop();
    game.hands[sessionId] = [card];
    upsertScore(game, sessionId, name, Number(card.rank), now, "replace");
    setAnswer(game, sessionId, name, card.label, now);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "oldmaid" && move === "reveal") {
    const hand = Array.isArray(game.hands?.[sessionId]) ? game.hands[sessionId] : [];
    if (!hand.length) return;
    const result = oldMaidResult(hand);
    upsertScore(game, sessionId, name, result.score, now, "replace");
    setAnswer(game, sessionId, name, result.label, now);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "texas" && move === "reveal") {
    const hand = Array.isArray(game.hands?.[sessionId]) ? game.hands[sessionId] : [];
    if (hand.length !== 2 || game.communityCards.length !== 5) return;
    const best = bestTexasHand([...hand, ...game.communityCards]);
    upsertScore(game, sessionId, name, best.score, now, "replace");
    setAnswer(game, sessionId, name, best.label, now);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "rummy" && move === "meld") {
    const hand = Array.isArray(game.hands?.[sessionId]) ? game.hands[sessionId] : [];
    if (!hand.length) return;
    const best = bestRummyLayout(hand);
    upsertScore(game, sessionId, name, best.score, now, "replace");
    setAnswer(game, sessionId, name, best.label, now);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "mahjong" && move === "check") {
    const hand = Array.isArray(game.hands?.[sessionId]) ? game.hands[sessionId] : [];
    if (!hand.length) return;
    const best = bestMahjongLayout(hand);
    upsertScore(game, sessionId, name, best.score, now, "replace");
    setAnswer(game, sessionId, name, best.label, now);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "roulette") {
    if (move === "bet") {
      const bet = text(payload.bet, "", 20);
      if (!["red", "black", "odd", "even", "low", "high", "dozen-1", "dozen-2", "dozen-3"].includes(bet)) return;
      game.bets[sessionId] = bet;
      setAnswer(game, sessionId, name, `押 ${rouletteBetLabel(bet)}`, now);
      game.lastSummary = `${name} 已下注 ${rouletteBetLabel(bet)}。`;
      game.updatedAt = now.toISOString();
      return;
    }
    if (move === "spin") {
      const activeBets = Object.entries(game.bets || {}).filter(([, bet]) => Boolean(bet));
      if (!activeBets.length) return;
      const number = randomInt(0, 36);
      const color = rouletteColor(number);
      const winners = [];
      activeBets.forEach(([betSessionId, bet]) => {
        const betName = nameForSession(roomParty, betSessionId, "訪客");
        const reward = roulettePayout(bet, number);
        setAnswer(game, betSessionId, betName, `押 ${rouletteBetLabel(bet)} · 開 ${number}`, now);
        if (reward > 0) {
          upsertScore(game, betSessionId, betName, reward, now, "increment");
          winners.push(`${betName}+${reward}`);
        }
      });
      game.spinResult = { number, color, bySessionId: sessionId, byName: name, at: now.toISOString() };
      game.lastSummary = winners.length
        ? `${name} 開出 ${number} ${color === "green" ? "綠" : color === "red" ? "紅" : "黑"}，${winners.join("、")}。`
        : `${name} 開出 ${number} ${color === "green" ? "綠" : color === "red" ? "紅" : "黑"}，本輪沒有人中。`;
      game.updatedAt = now.toISOString();
      return;
    }
  }

  if (game.mode === "slots" && move === "spin") {
    const symbols = slotSpinResult();
    const reward = slotPayout(symbols);
    upsertScore(game, sessionId, name, reward, now, "increment");
    setAnswer(game, sessionId, name, `${symbols.join(" | ")}${reward ? ` · +${reward}` : ""}`, now);
    game.lastSummary = reward ? `${name} 拉出 ${symbols.join(" / ")}，拿下 ${reward} 籌碼。` : `${name} 拉出 ${symbols.join(" / ")}，差一點就連線。`;
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "uno") {
    if (currentTurnSession(game) !== sessionId) return;
    const hand = Array.isArray(game.hands?.[sessionId]) ? [...game.hands[sessionId]] : [];
    if (move === "draw") {
      if (!game.deck.length) game.deck = createUnoDeck();
      hand.push(game.deck.pop());
      game.hands[sessionId] = hand;
      game.lastSummary = `${name} 抽了一張牌。`;
      nextTurn(game);
      game.updatedAt = now.toISOString();
      return;
    }
    if (move === "play") {
      const card = text(payload.card, "", 20);
      const cardIndex = hand.findIndex((item) => item === card);
      if (cardIndex < 0 || !canPlayUnoCard(card, game.topCard)) return;
      hand.splice(cardIndex, 1);
      game.hands[sessionId] = hand;
      const played = parseUnoCard(card);
      game.topCard = card;
      if (!hand.length) {
        upsertScore(game, sessionId, name, 1, now, "increment");
        game.lastSummary = `${name} 率先出完所有牌，這局 UNO 風格獲勝。`;
      } else if (played.value === "SKIP") {
        nextTurn(game);
        nextTurn(game);
        game.lastSummary = `${name} 打出跳過牌。`;
      } else if (played.value === "D2") {
        nextTurn(game);
        const nextId = currentTurnSession(game);
        if (nextId) {
          if (!game.deck.length) game.deck = createUnoDeck();
          game.hands[nextId].push(game.deck.pop());
          if (!game.deck.length) game.deck = createUnoDeck();
          game.hands[nextId].push(game.deck.pop());
        }
        nextTurn(game);
        game.lastSummary = `${name} 打出 +2。`;
      } else {
        nextTurn(game);
        game.lastSummary = `${name} 打出 ${card}。`;
      }
      game.updatedAt = now.toISOString();
      return;
    }
  }

  if (game.mode === "monopoly" && move === "roll") {
    if (currentTurnSession(game) !== sessionId) return;
    const roll = randomInt(1, 6);
    const previous = Number(game.positions[sessionId] || 0);
    const next = (previous + roll) % MONOPOLY_TILES.length;
    const passedStart = previous + roll >= MONOPOLY_TILES.length;
    game.positions[sessionId] = next;
    const tile = MONOPOLY_TILES[next];
    const bonus = passedStart ? 2 : 0;
    const delta = tile.coins + bonus;
    game.coins[sessionId] = Number(game.coins[sessionId] || 12) + delta;
    upsertScore(game, sessionId, name, Number(game.coins[sessionId]), now, "replace");
    game.lastSummary = `${name} 擲出 ${roll}，停在 ${tile.name}，${delta >= 0 ? "獲得" : "失去"} ${Math.abs(delta)} 代幣。`;
    nextTurn(game);
    game.updatedAt = now.toISOString();
    return;
  }

  if (game.mode === "memory" && move === "flip") {
    if (currentTurnSession(game) !== sessionId) return;
    clearExpiredTransientState(game, now.getTime());
    const index = clampNumber(payload.index, 0, game.board.length - 1);
    if (game.matched[index] || game.flipped.includes(index)) return;
    game.flipped.push(index);
    if (game.flipped.length === 2) {
      const [first, second] = game.flipped;
      if (game.board[first] === game.board[second]) {
        game.matched[first] = true;
        game.matched[second] = true;
        game.flipped = [];
        upsertScore(game, sessionId, name, 1, now, "increment");
        game.lastSummary = `${name} 成功配到 ${game.board[first]}。`;
      } else {
        game.flipExpiresAt = now.getTime() + MEMORY_REVEAL_MS;
        game.lastSummary = `${name} 翻到 ${game.board[first]} 和 ${game.board[second]}，沒有配對成功。`;
        nextTurn(game);
      }
    }
    game.updatedAt = now.toISOString();
  }
}

export function pruneState(state, nowMs = Date.now()) {
  state.participants = state.participants.filter((participant) => {
    const seenAt = Date.parse(participant.lastSeen || "");
    return Number.isFinite(seenAt) && nowMs - seenAt <= ONLINE_WINDOW_MS;
  });
  state.messages = state.messages.slice(-MAX_MESSAGES);
  state.matches = state.matches.slice(-MAX_MATCHES);
  Object.values(state.games).forEach((game) => {
    ensureModeFields(game);
    clearExpiredTransientState(game, nowMs);
    game.answers = game.answers.slice(-MAX_GAME_ANSWERS);
    game.scores = game.scores.slice(-80);
    game.drawing = game.drawing.slice(-600);
  });
  return state;
}

export function applyRealtimeAction(state, payload, now = new Date()) {
  const action = text(payload.action, "heartbeat", 40);
  const roomId = text(payload.roomId, DEFAULT_ROOM_ID, 80);
  if (action === "leave") {
    const sessionId = text(payload.sessionId, "", 120);
    state.participants = state.participants.filter((participant) => participant.sessionId !== sessionId);
    return snapshot(state, roomId, sessionId, now.getTime());
  }
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
  if (action === "game-action") applyGameAction(state, payload, now);
  pruneState(state, now.getTime());
  return snapshot(state, roomId, text(payload.sessionId, "", 120), now.getTime());
}

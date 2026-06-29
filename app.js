const people = [
  {
    id: "mika",
    name: "Mika",
    age: 27,
    city: "台北",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    bio: "下班後會找一間安靜咖啡店，週末固定看獨立電影和玩桌遊。",
    tags: ["咖啡", "電影", "桌遊"],
    score: 94,
    mood: "慢熟但好聊",
    verified: "照片驗證",
    occupation: "UI 設計師",
    gender: "女性",
    height: 164,
    education: "大學",
    zodiac: "天秤座",
    distance: 2.4,
    smoking: "不抽菸",
    drinking: "偶爾小酌",
    goal: "穩定交往",
    lastActive: "5 分鐘前",
    online: true,
    chatStyle: "回覆溫柔，喜歡有內容的慢聊",
    dateIdea: "獨立書店、咖啡散步、週末電影",
  },
  {
    id: "yuri",
    name: "Yuri",
    age: 25,
    city: "新北",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    bio: "喜歡夜景、R&B、手沖咖啡，最近在學攝影和做甜點。",
    tags: ["夜景", "音樂", "甜點"],
    score: 88,
    mood: "溫柔直球",
    verified: "手機驗證",
    occupation: "甜點師",
    gender: "女性",
    height: 158,
    education: "專科",
    zodiac: "雙魚座",
    distance: 4.8,
    smoking: "不抽菸",
    drinking: "不喝酒",
    goal: "自然認識",
    lastActive: "線上",
    online: true,
    chatStyle: "直接但不壓迫，喜歡語音確認感覺",
    dateIdea: "夜景散步、甜點店、R&B 小酒館",
  },
  {
    id: "kai",
    name: "Kai",
    age: 29,
    city: "桃園",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
    bio: "健身、料理、露營都碰一點，想找能一起安排週末的人。",
    tags: ["健身", "露營", "料理"],
    score: 83,
    mood: "行動派",
    verified: "語音驗證",
    occupation: "軟體工程師",
    gender: "男性",
    height: 178,
    education: "研究所",
    zodiac: "牡羊座",
    distance: 12.1,
    smoking: "不抽菸",
    drinking: "偶爾小酌",
    goal: "先從朋友",
    lastActive: "18 分鐘前",
    online: false,
    chatStyle: "節奏明快，偏好約活動邊做邊聊",
    dateIdea: "料理課、健身體驗、週末露營市集",
  },
  {
    id: "nina",
    name: "Nina",
    age: 26,
    city: "台中",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    bio: "展覽、爵士、散步，喜歡把日常過得有一點儀式感。",
    tags: ["展覽", "爵士", "散步"],
    score: 91,
    mood: "細節控",
    verified: "照片驗證",
    occupation: "策展企劃",
    gender: "女性",
    height: 166,
    education: "大學",
    zodiac: "處女座",
    distance: 23.6,
    smoking: "不抽菸",
    drinking: "社交場合",
    goal: "認真交往",
    lastActive: "1 小時前",
    online: false,
    chatStyle: "重視細節和禮貌，會被真誠提問打動",
    dateIdea: "美術館、爵士 Live、河岸散步",
  },
];

const rooms = [
  {
    id: "late-night",
    title: "台北晚安聊天室",
    topic: "睡前輕聊、分享今天最開心的一件事",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    host: "Mika",
    active: 23,
    capacity: 40,
    tags: ["同城", "慢聊", "新手友善"],
    participants: ["mika", "yuri", "kai"],
  },
  {
    id: "movie",
    title: "電影約會提案所",
    topic: "從片單看價值觀，找下一次一起看電影的人",
    cover: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80",
    host: "Nina",
    active: 16,
    capacity: 30,
    tags: ["電影", "週末", "深聊"],
    participants: ["nina", "mika", "yuri"],
  },
  {
    id: "game",
    title: "破冰遊戲房",
    topic: "真心話、快問快答、翻牌配對，先玩再聊",
    cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
    host: "Kai",
    active: 31,
    capacity: 36,
    tags: ["遊戲", "歡樂", "語音"],
    participants: ["kai", "nina", "mika"],
  },
  {
    id: "coffee",
    title: "咖啡散步局",
    topic: "交換私藏店和城市散步路線",
    cover: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
    host: "Yuri",
    active: 12,
    capacity: 24,
    tags: ["咖啡", "散步", "生活感"],
    participants: ["yuri", "nina", "kai"],
  },
];

const prompts = [
  { type: "真心話", text: "你最容易被一個人的哪個小細節打動？" },
  { type: "二選一", text: "第一次約會你選深夜散步，還是週末早午餐？" },
  { type: "故事題", text: "說一件最近讓你覺得自己有變成熟的事。" },
  { type: "默契題", text: "如果現在有三小時空檔，你會想去哪裡？" },
  { type: "價值觀", text: "你希望另一半在關係裡最重視什麼？" },
];

const quizQuestions = [
  {
    question: "週五晚上比較想怎麼過？",
    options: ["安靜吃飯", "看現場表演", "打遊戲", "散步聊天"],
  },
  {
    question: "聊天最喜歡哪種節奏？",
    options: ["慢慢回也舒服", "即時來回", "語音最自然", "見面再聊"],
  },
  {
    question: "你對第一次見面的期待是？",
    options: ["輕鬆短約", "完整晚餐", "一起活動", "先語音確認"],
  },
];

const memoryValues = ["咖啡", "電影", "音樂", "料理", "展覽", "夜景"];
const STORAGE_KEY = "pair-room-state-v2";
const CONNECTION_KEY = "pair-room-connection-v1";
const PUBLIC_REMOTE_URL = "https://pair-room-dating-site.vercel.app";
const TRYSTERO_MODULE_URL = "https://esm.sh/trystero@0.25.2?bundle";
const TRYSTERO_APP_ID = "franksyh-pair-room-live";

const partyGameCatalog = {
  chemistry: {
    name: "默契二選一",
    icon: "heart-handshake",
    description: "同時選答案，看看房內誰和你最有默契。",
  },
  vibe: {
    name: "靈魂四選一",
    icon: "messages-square",
    description: "像 Litmatch 的 soul game，一題四選找今晚同頻的人。",
  },
  truth: {
    name: "心動快問",
    icon: "message-circle-question-mark",
    description: "一題一答，用真實回答自然開啟話題。",
  },
  story: {
    name: "曖昧接龍",
    icon: "pen-line",
    description: "每人接一句，把房間氣氛寫成今晚的小劇場。",
  },
  reaction: {
    name: "手速心跳",
    icon: "gauge",
    description: "等待訊號再搶按，挑戰房內最快反應。",
  },
  doodle: {
    name: "共創塗鴉",
    icon: "brush",
    description: "電腦滑鼠或手機觸控，共同完成一張畫。",
  },
  spark: {
    name: "心動搶點.io",
    icon: "crosshair",
    description: "全房真人搶同一顆光點，點中得分並刷新位置。",
  },
  orbit: {
    name: "追光亂鬥.io",
    icon: "disc-3",
    description: "光點會自己亂跳，房內所有人都能搶分衝榜。",
  },
  liar: {
    name: "吹牛骰",
    icon: "dice-5",
    description: "多人房輪流喊骰，抓包成功就拿分。",
  },
  highroll: {
    name: "骰子比大",
    icon: "dices",
    description: "免費擲兩顆骰，總點數最大的人領先。",
  },
  rushdice: {
    name: "搶點骰",
    icon: "target",
    description: "先擲出目標總點數的人立刻得分。",
  },
  highcard: {
    name: "比大",
    icon: "badge-plus",
    description: "每人抽一張牌，不下注也能比牌面大小。",
  },
  oldmaid: {
    name: "抽鬼牌",
    icon: "ghost",
    description: "整理手牌避開鬼牌，適合多人輕鬆玩。",
  },
  texas: {
    name: "德州撲克簡化版",
    icon: "club",
    description: "共享公共牌，免費比一次最佳牌型。",
  },
  rummy: {
    name: "Rummy 接龍",
    icon: "layers-3",
    description: "七張牌配順子與刻子，比誰整理得漂亮。",
  },
  mahjong: {
    name: "麻將配牌",
    icon: "gallery-vertical-end",
    description: "免費發牌湊面子與將眼，像麻將暖桌版。",
  },
  roulette: {
    name: "幸運輪盤",
    icon: "circle-dot",
    description: "押紅黑單雙或區段，全房一起開盤。",
  },
  slots: {
    name: "777 老虎機",
    icon: "cherry",
    description: "不用儲值就能拉霸，連線直接加分。",
  },
  uno: {
    name: "UNO 風格",
    icon: "paintbrush-vertical",
    description: "依顏色和數字出牌，先出完就贏。",
  },
  monopoly: {
    name: "輕量大富翁",
    icon: "map",
    description: "擲骰前進，踩格拿代幣或遇到小事件。",
  },
  memory: {
    name: "記憶配對",
    icon: "brain",
    description: "輪流翻牌配對，最適合多人輪著玩。",
  },
  quiz: {
    name: "派對問答",
    icon: "badge-help",
    description: "房內同步答題，看誰最先答對。",
  },
};

const userProfile = {
  name: "Frank",
  age: 30,
  city: "台北",
  occupation: "產品設計師",
  height: 176,
  education: "大學",
  zodiac: "雙子座",
  bio: "喜歡咖啡、電影和慢慢聊熟的關係。希望先從輕鬆語音和共同興趣開始認識。",
  interests: ["咖啡", "電影", "桌遊", "散步"],
  photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  genderPreference: "不限",
  ageMin: 24,
  ageMax: 34,
  distanceMax: 25,
  smoking: "不抽菸",
  drinking: "偶爾小酌",
  visibility: true,
  verifications: {
    phone: true,
    email: true,
    selfie: false,
    id: false,
  },
};

const defaultDiscoverFilters = {
  city: "全部",
  ageMin: 24,
  ageMax: 35,
  heightMin: 150,
  heightMax: 190,
  zodiac: "全部",
  education: "全部",
  smoking: "不限",
  drinking: "不限",
  goal: "全部",
  interest: "全部",
};

const moments = [
  {
    id: "moment-1",
    authorId: "mika",
    tag: "生活",
    time: "18 分鐘前",
    text: "今天在咖啡店遇到一首很適合雨天的歌，想找人交換各自的通勤歌單。",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    likes: 42,
    comments: ["這題我可以聊一整晚", "歌單交換很加分"],
  },
  {
    id: "moment-2",
    authorId: "nina",
    tag: "約會提案",
    time: "1 小時前",
    text: "週末想看展再去河岸散步，喜歡安靜行程的人應該會懂。",
    img: "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=900&q=80",
    likes: 36,
    comments: ["這個行程很舒服"],
  },
  {
    id: "moment-3",
    authorId: "kai",
    tag: "興趣",
    time: "2 小時前",
    text: "第一次做奶油蘑菇燉飯成功，料理真的很適合當破冰話題。",
    img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=80",
    likes: 29,
    comments: [],
  },
];

const launchChecklist = [
  {
    title: "公開網站",
    detail: "Netlify 與 Vercel 都可讓多人同時瀏覽同一個前端網站。",
    done: true,
  },
  {
    title: "候補表單",
    detail: "使用 Netlify Forms 收集測試者、合作與商務需求。",
    done: true,
  },
  {
    title: "本機狀態保存",
    detail: "個人檔案、動態與聊天示範資料會保存在同一台裝置。",
    done: true,
  },
  {
    title: "多人雲端連線",
    detail: "使用雲端 Functions 同步線上名單與共享房間訊息。",
    done: true,
  },
];

const usageSteps = [
  {
    icon: "id-card",
    title: "完成個人檔案",
    detail: "上傳照片、填寫興趣與交友目標，讓 AI 能判斷更適合的對象。",
    view: "profile",
    action: "編輯檔案",
  },
  {
    icon: "badge-check",
    title: "提高信任分數",
    detail: "手機、Email、自拍與身分驗證越完整，越容易進入高品質推薦池。",
    view: "safety",
    action: "前往驗證",
  },
  {
    icon: "sparkles",
    title: "看懂推薦原因",
    detail: "配對頁會說明共同興趣、互動節奏、信任狀態與適合的約會提案。",
    view: "match",
    action: "開始配對",
  },
  {
    icon: "radio",
    title: "加入多人房間",
    detail: "先用低壓語音房或多人文字同步互動，再決定是否一對一聊天。",
    view: "rooms",
    action: "進入房間",
  },
];

const marketAdvantages = [
  {
    title: "反無限滑卡",
    detail: "把推薦原因、約會路線與安全提示一起呈現，讓使用者知道為什麼值得聊。",
    score: 94,
  },
  {
    title: "信任優先排序",
    detail: "未來可把真人驗證、訊息禮貌度與檢舉紀錄納入推薦權重。",
    score: 88,
  },
  {
    title: "AI 約會副駕",
    detail: "每次配對都產生開場白、聊天節奏、公共地點提案與安全 check-in。",
    score: 91,
  },
  {
    title: "多人低壓互動",
    detail: "用房間、遊戲與動態廣場降低一對一破冰壓力，提高留存。",
    score: 86,
  },
];

const state = {
  activeView: "rooms",
  currentRoomId: "late-night",
  profileIndex: 0,
  activeConversationId: "late-night-chat",
  globalSearch: "",
  discoverFilters: { ...defaultDiscoverFilters },
  nearbyMode: "distance",
  momentFilter: "全部",
  aiTargetId: "mika",
  boostEndsAt: null,
  boostViews: 184,
  waitlistCount: 48,
  dynamicMode: "local",
  lastSyncAt: null,
  dynamicMetrics: null,
  dynamicRecommendations: [],
  sessionId: "",
  liveStatus: "connecting",
  liveParticipants: [],
  liveMessages: [],
  liveMatches: [],
  liveGame: null,
  liveCapabilities: null,
  liveOnlineCount: 0,
  liveLastSyncAt: null,
  serverTimeOffsetMs: 0,
  connectionBaseUrl: "",
  connectionReady: false,
  connectionWarning: "",
  dynamicSyncTimer: null,
  realtimeSyncTimer: null,
  gameSyncTimer: null,
  reactionUiTimer: null,
  drawingColor: "#172124",
  drawingBuffer: [],
  drawingActive: false,
  voiceLevel: 0,
  voiceSyncTimer: null,
  installPrompt: null,
  superLikes: 3,
  sensitiveFilter: true,
  slowMode: true,
  blockedCount: 2,
  micOn: false,
  muted: false,
  micStream: null,
  audioContext: null,
  analyser: null,
  waveTimer: null,
  voiceBridgeStatus: "idle",
  voiceBridgeModule: null,
  voiceBridgePromise: null,
  voiceRoom: null,
  voiceRoomId: "",
  voicePeerIds: [],
  voicePeerProfiles: {},
  voicePeerAudios: {},
  voicePeerMetaAction: null,
  promptIndex: 0,
  quizIndex: 0,
  quizAnswers: [],
  memoryCards: [],
  flipped: [],
  matched: new Set(),
  moves: 0,
};

const conversations = [
  {
    id: "late-night-chat",
    type: "room",
    title: "台北晚安聊天室",
    subtitle: "23 人在線",
    img: rooms[0].cover,
    unread: 2,
    messages: [
      { from: "Mika", time: "22:14", text: "今天大家都辛苦了，先用一句話形容今天吧。" },
      { from: "Frank", time: "22:16", text: "像一杯很濃但還算順口的咖啡。" },
      { from: "Yuri", time: "22:17", text: "這句可以，我今天像剛好趕上的末班車。" },
    ],
  },
  {
    id: "mika-chat",
    type: "match",
    title: "Mika",
    subtitle: "相似度 94%",
    img: people[0].img,
    unread: 1,
    messages: [
      { from: "Mika", time: "21:02", text: "你也喜歡桌遊嗎？我最近在找兩人也好玩的。" },
      { from: "Frank", time: "21:06", text: "可以試試合作類的，聊天壓力比較小。" },
    ],
  },
  {
    id: "game-chat",
    type: "room",
    title: "破冰遊戲房",
    subtitle: "31 人在線",
    img: rooms[2].cover,
    unread: 0,
    messages: [
      { from: "Kai", time: "20:41", text: "等等開一輪默契快問，想玩的先進語音。" },
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function personById(id) {
  return people.find((person) => person.id === id) || people[0];
}

function roomById(id) {
  return rooms.find((room) => room.id === id) || rooms[0];
}

function syncIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2600);
}

function saveAppState() {
  const snapshot = {
    userProfile,
    moments,
    conversations,
    state: {
      discoverFilters: state.discoverFilters,
      nearbyMode: state.nearbyMode,
      momentFilter: state.momentFilter,
      aiTargetId: state.aiTargetId,
      boostEndsAt: state.boostEndsAt,
      boostViews: state.boostViews,
      waitlistCount: state.waitlistCount,
      sessionId: state.sessionId,
      superLikes: state.superLikes,
      sensitiveFilter: state.sensitiveFilter,
      slowMode: state.slowMode,
      blockedCount: state.blockedCount,
    },
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage can be unavailable in private windows; the app still works without persistence.
  }
}

function scheduleSave() {
  window.clearTimeout(scheduleSave.timer);
  scheduleSave.timer = window.setTimeout(saveAppState, 180);
}

function ensureSessionId() {
  if (state.sessionId) return state.sessionId;
  let saved = "";
  try {
    saved = localStorage.getItem("pair-room-session-id");
  } catch {
    saved = "";
  }
  if (saved) {
    state.sessionId = saved;
    return saved;
  }
  const generated =
    window.crypto?.randomUUID?.() || `session-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  state.sessionId = generated;
  try {
    localStorage.setItem("pair-room-session-id", generated);
  } catch {
    // The in-memory session still supports the current visit.
  }
  return generated;
}

function currentDeviceType() {
  if (window.matchMedia("(max-width: 720px)").matches) return "mobile";
  if (window.matchMedia("(pointer: coarse)").matches) return "tablet";
  return "desktop";
}

function deviceLabel(device) {
  return {
    mobile: "手機",
    tablet: "平板",
    desktop: "電腦",
    web: "網頁",
  }[device] || "網頁";
}

function safePeerProfile(payload = {}) {
  return {
    name: String(payload.name || "訪客").trim().slice(0, 40) || "訪客",
    device: ["mobile", "tablet", "desktop", "web"].includes(payload.device) ? payload.device : "web",
    sessionId: String(payload.sessionId || "").trim().slice(0, 120),
  };
}

function voiceBridgeSummary() {
  if (!window.isSecureContext) return "語音房需要 HTTPS。請用 Vercel 公開連結或 HTTPS tunnel 開啟。";
  if (state.voiceBridgeStatus === "loading") return "正在建立 WebRTC 語音房，幾秒後會完成。";
  if (state.voiceBridgeStatus === "error") return "即時語音初始化失敗，文字、配對與遊戲仍可正常使用。";
  if (state.micOn && state.voicePeerIds.length) return `WebRTC 直連中，已接通 ${state.voicePeerIds.length} 位真人。`;
  if (state.micOn) return "已進入語音房，等待其他裝置用同房號加入。";
  return "點「真人上麥」後會建立 WebRTC 直連語音，不同 IP 與不同裝置都能通話。";
}

function voicePeerLabel(peerId) {
  const peer = state.voicePeerProfiles[peerId];
  if (peer?.name) return peer.name;
  return `Peer ${peerId.slice(0, 4)}`;
}

async function loadVoiceBridgeModule() {
  if (state.voiceBridgeModule?.joinRoom) return state.voiceBridgeModule;
  if (!state.voiceBridgePromise) {
    state.voiceBridgeStatus = "loading";
    state.voiceBridgePromise = import(TRYSTERO_MODULE_URL)
      .then((module) => {
        state.voiceBridgeModule = module;
        state.voiceBridgeStatus = "ready";
        return module;
      })
      .catch((error) => {
        state.voiceBridgePromise = null;
        state.voiceBridgeStatus = "error";
        throw error;
      });
  }
  return state.voiceBridgePromise;
}

function attachRemoteVoiceStream(peerId, stream) {
  const current = state.voicePeerAudios[peerId] || new Audio();
  current.autoplay = true;
  current.playsInline = true;
  current.srcObject = stream;
  state.voicePeerAudios[peerId] = current;
  current.play().catch(() => {});
}

function removeRemoteVoiceStream(peerId) {
  const audio = state.voicePeerAudios[peerId];
  if (audio) {
    audio.pause();
    audio.srcObject = null;
    delete state.voicePeerAudios[peerId];
  }
}

function updateVoicePeerList() {
  state.voicePeerIds = Object.keys(state.voicePeerProfiles);
}

async function broadcastVoicePeerMeta() {
  if (!state.voicePeerMetaAction?.send) return;
  await state.voicePeerMetaAction.send({
    name: userProfile.name,
    device: currentDeviceType(),
    sessionId: ensureSessionId(),
  });
}

async function teardownVoiceRoom(options = {}) {
  const keepStream = options.keepStream === true;
  const room = state.voiceRoom;
  const stream = state.micStream;
  if (room && stream) {
    try {
      await room.removeStream(stream);
    } catch {}
  }
  if (room?.leave) {
    try {
      await room.leave();
    } catch {}
  }
  Object.keys(state.voicePeerAudios).forEach(removeRemoteVoiceStream);
  state.voiceRoom = null;
  state.voiceRoomId = "";
  state.voicePeerMetaAction = null;
  state.voicePeerProfiles = {};
  state.voicePeerIds = [];
  if (!keepStream) state.voiceBridgeStatus = "idle";
}

async function ensureVoiceRoom() {
  if (!state.micStream) return null;
  if (state.voiceRoom && state.voiceRoomId === state.currentRoomId) return state.voiceRoom;
  await teardownVoiceRoom({ keepStream: true });
  const { joinRoom } = await loadVoiceBridgeModule();
  const room = joinRoom({ appId: TRYSTERO_APP_ID }, state.currentRoomId, {
    onJoinError: () => {
      state.voiceBridgeStatus = "error";
      renderMultiplayerPanel();
    },
  });
  state.voiceRoom = room;
  state.voiceRoomId = state.currentRoomId;
  state.voiceBridgeStatus = "ready";
  const voiceMeta = room.makeAction("voice-meta");
  state.voicePeerMetaAction = voiceMeta;

  room.onPeerJoin = async (peerId) => {
    state.voicePeerProfiles[peerId] ||= { name: `Peer ${peerId.slice(0, 4)}`, device: "web", sessionId: "" };
    updateVoicePeerList();
    renderMultiplayerPanel();
    await broadcastVoicePeerMeta();
    if (state.micStream) {
      try {
        await room.addStream(state.micStream, { target: peerId });
      } catch {}
    }
  };

  room.onPeerLeave = (peerId) => {
    delete state.voicePeerProfiles[peerId];
    updateVoicePeerList();
    removeRemoteVoiceStream(peerId);
    renderMultiplayerPanel();
  };

  room.onPeerStream = (stream, peerId, metadata) => {
    const peer = safePeerProfile(metadata || state.voicePeerProfiles[peerId]);
    state.voicePeerProfiles[peerId] = { ...state.voicePeerProfiles[peerId], ...peer };
    updateVoicePeerList();
    attachRemoteVoiceStream(peerId, stream);
    renderMultiplayerPanel();
  };

  voiceMeta.onMessage = (payload, { peerId }) => {
    state.voicePeerProfiles[peerId] = {
      ...state.voicePeerProfiles[peerId],
      ...safePeerProfile(payload),
    };
    updateVoicePeerList();
    renderMultiplayerPanel();
  };

  await room.addStream(state.micStream, {
    metadata: {
      name: userProfile.name,
      device: currentDeviceType(),
      sessionId: ensureSessionId(),
    },
  });
  await broadcastVoicePeerMeta();
  renderMultiplayerPanel();
  return room;
}

async function reconnectVoiceRoom() {
  if (!state.micStream) return;
  try {
    await ensureVoiceRoom();
  } catch {
    state.voiceBridgeStatus = "error";
    showToast("語音房重新連線失敗，請重新加入語音。");
    renderMultiplayerPanel();
  }
}

function defaultConnectionBaseUrl() {
  if (location.protocol === "http:" || location.protocol === "https:") {
    return location.origin;
  }
  return PUBLIC_REMOTE_URL;
}

function normalizeConnectionBaseUrl(value) {
  const raw = String(value || "").trim();
  const baseValue = raw || defaultConnectionBaseUrl();
  const withProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(baseValue) ? baseValue : `http://${baseValue}`;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Only http and https URLs can be used.");
  }
  if (!url.port && isPrivateNetworkHost(url.hostname) && !raw.includes("://") && !raw.includes("/")) {
    url.port = location.port || "5173";
  }
  url.pathname = "";
  url.search = "";
  url.hash = "";
  return url.origin;
}

function roomIdFromInput(value) {
  return (
    String(value || state.currentRoomId || "late-night")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "late-night"
  );
}

function connectionWarningFor(baseUrl) {
  try {
    const url = new URL(baseUrl);
    if (location.protocol === "https:" && url.protocol === "http:") {
      return "目前頁面是 HTTPS，瀏覽器會擋住 HTTP IP。請改用公開 HTTPS 網址，或直接用 http://IP:PORT 開啟網站。";
    }
    return "";
  } catch {
    return "連線網址格式不正確。";
  }
}

function connectionDisplayUrl() {
  return state.connectionBaseUrl || defaultConnectionBaseUrl();
}

function shortConnectionLabel() {
  try {
    const url = new URL(connectionDisplayUrl());
    return url.host;
  } catch {
    return "not set";
  }
}

function isSameOriginConnection(baseUrl = connectionDisplayUrl()) {
  try {
    return new URL(baseUrl).origin === location.origin;
  } catch {
    return true;
  }
}

function apiUrl(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = connectionDisplayUrl();
  if (isSameOriginConnection(baseUrl)) return normalizedPath;
  return `${baseUrl}${normalizedPath}`;
}

function saveConnectionSettings() {
  try {
    localStorage.setItem(
      CONNECTION_KEY,
      JSON.stringify({
        baseUrl: state.connectionBaseUrl,
        roomId: state.currentRoomId,
        name: userProfile.name,
      }),
    );
  } catch {
    // The connection still works for the current visit.
  }
}

function loadConnectionSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONNECTION_KEY) || "{}");
    state.connectionBaseUrl = normalizeConnectionBaseUrl(saved.baseUrl || defaultConnectionBaseUrl());
    if (saved.roomId) state.currentRoomId = roomIdFromInput(saved.roomId);
    if (saved.name) userProfile.name = String(saved.name).trim().slice(0, 40);
  } catch {
    state.connectionBaseUrl = normalizeConnectionBaseUrl(defaultConnectionBaseUrl());
  }
  const linkedRoom = new URLSearchParams(location.search).get("room");
  if (linkedRoom) state.currentRoomId = roomIdFromInput(linkedRoom);
  state.connectionWarning = connectionWarningFor(state.connectionBaseUrl);
}

function applyConnectionSettings(baseUrl, roomId, name, options = {}) {
  const previousRoomId = state.currentRoomId;
  state.connectionBaseUrl = normalizeConnectionBaseUrl(baseUrl);
  state.currentRoomId = roomIdFromInput(roomId);
  userProfile.name = String(name || "").trim().slice(0, 40) || "訪客";
  state.connectionWarning = connectionWarningFor(state.connectionBaseUrl);
  state.connectionReady = true;
  const currentUrl = new URL(location.href);
  currentUrl.searchParams.set("room", state.currentRoomId);
  history.replaceState(null, "", currentUrl);
  if (options.save !== false) saveConnectionSettings();
  document.body.classList.remove("connection-pending");
  syncProfileMini();
  renderConnectionGate();
  renderRooms(state.globalSearch);
  renderRoomStage();
  renderMultiplayerPanel();
  renderGuide();
  if (state.activeView === "growth") renderGrowth();
  closeConnectionGate();
  startLiveSyncLoops();
  if (state.micStream && previousRoomId !== state.currentRoomId) {
    reconnectVoiceRoom();
  } else if (state.micStream) {
    broadcastVoicePeerMeta().catch(() => {});
  }
}

function renderConnectionGate() {
  const gate = $("#connectionGate");
  if (!gate) return;
  const input = $("#connectionIpInput");
  const nameInput = $("#connectionNameInput");
  const roomInput = $("#connectionRoomInput");
  const currentLabel = $("#connectionCurrentLabel");
  const warning = $("#connectionWarning");
  if (nameInput && document.activeElement !== nameInput) nameInput.value = userProfile.name || "";
  if (input && document.activeElement !== input) input.value = connectionDisplayUrl();
  if (roomInput && document.activeElement !== roomInput) roomInput.value = state.currentRoomId;
  if (currentLabel) currentLabel.textContent = `${shortConnectionLabel()} / ${state.currentRoomId}`;
  if (warning) {
    warning.textContent =
      state.connectionWarning || "跨縣市或不同網路請使用公開網站與相同房號；只有同 Wi-Fi 才需要輸入 LAN IP。";
    warning.classList.toggle("is-warning", Boolean(state.connectionWarning));
  }
}

function openConnectionGate() {
  document.body.classList.add("connection-pending");
  renderConnectionGate();
  $("#connectionGate")?.classList.remove("is-hidden");
  window.setTimeout(() => $("#connectionNameInput")?.focus(), 60);
}

function closeConnectionGate() {
  $("#connectionGate")?.classList.add("is-hidden");
  document.body.classList.remove("connection-pending");
}

function startLiveSyncLoops() {
  syncDynamicData();
  syncRealtime("heartbeat");
  if (!state.dynamicSyncTimer) {
    state.dynamicSyncTimer = window.setInterval(syncDynamicData, 90000);
  }
  if (!state.realtimeSyncTimer) {
    state.realtimeSyncTimer = window.setInterval(syncRealtime, 15000);
  }
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.userProfile) {
      Object.assign(userProfile, saved.userProfile);
      userProfile.verifications = { ...userProfile.verifications, ...(saved.userProfile.verifications || {}) };
      userProfile.interests = Array.isArray(saved.userProfile.interests) ? saved.userProfile.interests : userProfile.interests;
    }
    if (Array.isArray(saved.moments)) {
      moments.splice(0, moments.length, ...saved.moments);
    }
    if (Array.isArray(saved.conversations)) {
      conversations.splice(0, conversations.length, ...saved.conversations);
    }
    if (saved.state) {
      Object.assign(state, saved.state);
      state.discoverFilters = { ...defaultDiscoverFilters, ...(saved.state.discoverFilters || {}) };
    }
    ensureSessionId();
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function setView(view) {
  state.activeView = view;
  if (view !== "games") stopGameSyncLoop();
  $$(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  $$(".view").forEach((section) => {
    section.classList.toggle("is-active", section.id === `${view}-view`);
  });
  if (view === "rooms") {
    renderMultiplayerPanel();
    syncRealtime("heartbeat");
  }
  if (view === "guide") {
    renderGuide();
  }
  if (view === "profile") {
    renderProfileEditor();
  }
  if (view === "match") {
    renderProfileCard();
  }
  if (view === "explore") {
    renderExplore();
  }
  if (view === "nearby") {
    renderNearby();
  }
  if (view === "chat") {
    renderChat();
  }
  if (view === "moments") {
    renderMoments();
  }
  if (view === "games") {
    renderPartyGames();
    startGameSyncLoop();
  }
  if (view === "ai") {
    renderAiBoost();
  }
  if (view === "growth") {
    renderGrowth();
  }
  if (view === "safety") {
    renderSafetyCenter();
  }
  syncIcons();
}

function dynamicModeIsLive() {
  return ["netlify-functions", "vercel-functions"].includes(state.dynamicMode);
}

function dynamicPlatformLabel() {
  if (state.dynamicMode === "vercel-functions") return "Vercel Functions";
  if (state.dynamicMode === "netlify-functions") return "Netlify Functions";
  return "本機示範資料";
}

function isPrivateNetworkHost(hostname = location.hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
}

function crossIpJoinUrl() {
  const url = new URL(PUBLIC_REMOTE_URL);
  url.searchParams.set("room", state.currentRoomId);
  return url.toString();
}

function renderGuide() {
  const completion = profileCompletion();
  const trust = verificationTrustScore();
  const activeRoom = roomById(state.currentRoomId);
  $("#guidePanel").innerHTML = `
    <div class="panel-title">
      <i data-lucide="compass"></i>
      <h3>3 分鐘上手流程</h3>
    </div>
    <div class="guide-hero">
      <div>
        <span class="eyebrow">Dating OS</span>
        <h3>先建立信任，再創造高品質互動</h3>
        <p>緣房間不是只讓你一直滑卡，而是把檔案完整度、驗證、安全、多人房間與 AI 約會建議放在同一條路徑中。</p>
      </div>
      <div class="guide-score">
        <span>目前準備度</span>
        <strong>${Math.round((completion + trust) / 2)}%</strong>
      </div>
    </div>
    <div class="use-step-grid">
      ${usageSteps
        .map(
          (step, index) => `
            <article class="use-step-card">
              <i data-lucide="${step.icon}"></i>
              <small>Step ${index + 1}</small>
              <h4>${step.title}</h4>
              <p>${step.detail}</p>
              <button class="ghost-action" type="button" data-guide-view="${step.view}">
                <span>${step.action}</span>
              </button>
            </article>
          `,
        )
        .join("")}
    </div>
    <div class="guide-current">
      <span><i data-lucide="radio"></i> 目前房間：${escapeHtml(activeRoom.title)}</span>
      <span><i data-lucide="shield-check"></i> 信任分數：${trust}%</span>
      <span><i data-lucide="cloud"></i> 不同 IP 加入：${escapeHtml(crossIpJoinUrl())}</span>
    </div>
  `;

  $("#advantagePanel").innerHTML = `
    <div class="panel-title">
      <i data-lucide="trophy"></i>
      <h3>超越市面交友軟體的方向</h3>
    </div>
    <div class="advantage-stack">
      ${marketAdvantages
        .map(
          (item) => `
            <article class="advantage-item">
              <div>
                <strong>${item.title}</strong>
                <span>${item.detail}</span>
              </div>
              <b>${item.score}</b>
            </article>
          `,
        )
        .join("")}
    </div>
    <div class="founder-note">
      <i data-lucide="lightbulb"></i>
      <p>不同網路、不同 IP 的使用者請用公開 HTTPS 網址加入；同 Wi-Fi 才使用本機 LAN IP。現在已可用同房號做多人聊天、配對、共玩與 WebRTC 語音，下一步再接正式資料庫、推播與真人審核，就能往營運版升級。</p>
    </div>
  `;

  $$("[data-guide-view]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.guideView));
  });
  syncIcons();
}

function applyDynamicData(data) {
  if (!data) return;
  state.dynamicMode = data.mode || "netlify-functions";
  state.lastSyncAt = data.generatedAt || new Date().toISOString();
  state.dynamicMetrics = data.metrics || null;
  state.dynamicRecommendations = Array.isArray(data.recommendations) ? data.recommendations : [];

  if (state.dynamicMetrics?.waitlistCount) {
    state.waitlistCount = state.dynamicMetrics.waitlistCount;
  }

  if (Array.isArray(data.rooms)) {
    data.rooms.forEach((liveRoom) => {
      const room = rooms.find((item) => item.id === liveRoom.id);
      if (room && Number.isFinite(liveRoom.active)) {
        room.active = Math.min(room.capacity, liveRoom.active);
      }
    });
  }

  renderRooms(state.globalSearch);
  renderRoomStage();
  if (state.activeView === "growth") renderGrowth();
  if (state.activeView === "ai") renderAiBoost();
}

async function syncDynamicData() {
  if (!state.connectionReady) return;
  try {
    const response = await fetch(apiUrl("/api/app-data"), {
      headers: { accept: "application/json" },
    });
    if (!response.ok) throw new Error("Dynamic API unavailable");
    const data = await response.json();
    applyDynamicData(data);
  } catch {
    state.dynamicMode = "local";
    if (state.activeView === "growth") renderGrowth();
  }
}

function multiplayerPayload(action = "heartbeat", extra = {}) {
  return {
    action,
    sessionId: ensureSessionId(),
    name: userProfile.name || "訪客",
    photo: userProfile.photo || "",
    roomId: state.currentRoomId,
    device: currentDeviceType(),
    ...extra,
  };
}

function voicePayload() {
  return {
    voice: {
      joined: state.micOn,
      muted: state.muted,
      speaking: state.micOn && !state.muted && state.voiceLevel > 18,
      level: state.voiceLevel,
    },
  };
}

function publishVoiceState(action = "voice-update") {
  return syncRealtime(action, voicePayload());
}

function startVoicePresenceLoop() {
  window.clearInterval(state.voiceSyncTimer);
  publishVoiceState("voice-join");
  state.voiceSyncTimer = window.setInterval(() => {
    if (!state.micOn) return;
    publishVoiceState("voice-update");
  }, 3000);
}

function stopVoicePresenceLoop() {
  window.clearInterval(state.voiceSyncTimer);
  state.voiceSyncTimer = null;
}

function applyRealtimeData(data) {
  if (!data?.ok) return;
  const previousGameUpdatedAt = state.liveGame?.updatedAt || "";
  state.liveStatus = "connected";
  state.liveParticipants = Array.isArray(data.participants) ? data.participants : [];
  state.liveMessages = Array.isArray(data.messages) ? data.messages : [];
  state.liveMatches = Array.isArray(data.matches) ? data.matches : [];
  state.liveGame = data.game && typeof data.game === "object" ? data.game : null;
  state.liveCapabilities = data.capabilities || null;
  state.liveOnlineCount = Number(data.allOnline || state.liveParticipants.length);
  state.liveLastSyncAt = data.generatedAt || new Date().toISOString();
  const serverTime = Date.parse(data.generatedAt || "");
  if (Number.isFinite(serverTime)) state.serverTimeOffsetMs = serverTime - Date.now();
  const statusText = $("#statusText");
  if (statusText) {
    statusText.textContent = `${state.currentRoomId} 房 · ${state.liveParticipants.length} 人在線`;
  }
  renderMultiplayerPanel();
  const isEditingAnswer = document.activeElement?.id === "partyAnswerInput";
  const gameChanged = previousGameUpdatedAt !== (state.liveGame?.updatedAt || "");
  if (state.activeView === "games" && gameChanged && !state.drawingActive && !isEditingAnswer) renderPartyGames();
  if (state.activeView === "chat") renderChat();
  if (state.activeView === "growth") renderGrowth();
}

async function syncRealtime(action = "heartbeat", extra = {}) {
  if (!state.connectionReady) return;
  try {
    const response = await fetch(apiUrl("/api/realtime"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(multiplayerPayload(action, extra)),
    });
    if (!response.ok) throw new Error("Realtime API unavailable");
    applyRealtimeData(await response.json());
  } catch {
    state.liveStatus = "offline";
    renderMultiplayerPanel();
  }
}

async function fetchRealtimeSnapshot() {
  if (!state.connectionReady) return;
  try {
    const response = await fetch(
      apiUrl(`/api/realtime?roomId=${encodeURIComponent(state.currentRoomId)}&sessionId=${encodeURIComponent(ensureSessionId())}`),
      {
      headers: { accept: "application/json" },
      },
    );
    if (!response.ok) throw new Error("Realtime API unavailable");
    applyRealtimeData(await response.json());
  } catch {
    state.liveStatus = "offline";
    renderMultiplayerPanel();
  }
}

async function sendLiveMessage(text) {
  const message = text.trim();
  if (!message) return;
  await syncRealtime("message", { text: message });
}

async function inviteLiveMatch(toSessionId = "") {
  await syncRealtime("match-invite", { toSessionId });
  showToast(toSessionId ? "已送出配對邀請" : "已發出隨機配對邀請");
}

async function acceptLiveMatch(matchId) {
  await syncRealtime("match-accept", { matchId });
  showToast("已接受配對邀請，可以開始一對一聊天");
  state.activeConversationId = `match:${matchId}`;
  setView("chat");
}

async function sendGameAnswer(answer) {
  const value = answer.trim();
  if (!value) return;
  await syncRealtime("game-answer", { answer: value });
}

async function nextLiveGameRound() {
  await syncRealtime("game-next");
}

async function selectPartyGame(mode) {
  if (!partyGameCatalog[mode]) return;
  await syncRealtime("game-select", { mode });
  showToast(`已切換到「${partyGameCatalog[mode].name}」`);
}

async function submitPartyAnswer(answer) {
  const value = String(answer || "").trim();
  if (!value) return;
  await syncRealtime("game-answer", { answer: value });
}

async function submitGameMove(move, extra = {}) {
  await syncRealtime("game-action", { move, ...extra });
}

function startGameSyncLoop() {
  window.clearInterval(state.gameSyncTimer);
  fetchRealtimeSnapshot();
  state.gameSyncTimer = window.setInterval(fetchRealtimeSnapshot, 1200);
}

function stopGameSyncLoop() {
  window.clearInterval(state.gameSyncTimer);
  window.clearInterval(state.reactionUiTimer);
  state.gameSyncTimer = null;
  state.reactionUiTimer = null;
}

function currentGameAnswer(game) {
  return (game.answers || []).find((answer) => answer.sessionId === state.sessionId && answer.round === game.round);
}

function currentRoundAnswers(game) {
  return (game.answers || []).filter((answer) => answer.round === game.round);
}

function formatLiveMessageTime(value) {
  const at = Date.parse(value || "");
  if (!Number.isFinite(at)) return currentTime();
  return new Date(at).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" });
}

function liveSharedMessages() {
  return (state.liveMessages || []).filter((message) => !message.toSessionId);
}

function currentUserAcceptedMatches() {
  return (state.liveMatches || []).filter(
    (match) =>
      match.status === "accepted" &&
      (match.fromSessionId === state.sessionId || match.toSessionId === state.sessionId),
  );
}

function matchPeerDetails(match) {
  const peerSessionId = match.fromSessionId === state.sessionId ? match.toSessionId : match.fromSessionId;
  const peerParticipant = state.liveParticipants.find((participant) => participant.sessionId === peerSessionId);
  return {
    peerSessionId,
    name: peerParticipant?.name || (match.fromSessionId === state.sessionId ? match.toName : match.fromName) || "已配對對象",
    photo: peerParticipant?.photo || userProfile.photo,
    subtitle: peerParticipant ? `${deviceLabel(peerParticipant.device)} · 真人即時聊天` : "已配對成功 · 真人即時聊天",
  };
}

function messageBelongsToMatch(message, match) {
  if (message.matchId && message.matchId === match.id) return true;
  const members = new Set([match.fromSessionId, match.toSessionId]);
  return Boolean(message.toSessionId) && members.has(message.sessionId) && members.has(message.toSessionId);
}

function liveConversationItems() {
  const room = roomById(state.currentRoomId);
  const roomMessages = liveSharedMessages().map((message) => ({
    id: message.id,
    from: message.name,
    time: formatLiveMessageTime(message.at),
    text: message.text,
    mine: message.sessionId === state.sessionId,
  }));
  const items = [
    {
      id: `room:${state.currentRoomId}`,
      type: "room",
      title: room.title,
      subtitle: `${state.liveParticipants.length} 人在線 · 房內共享聊天`,
      img: room.cover,
      unread: 0,
      messages: roomMessages,
    },
  ];
  currentUserAcceptedMatches().forEach((match) => {
    const peer = matchPeerDetails(match);
    items.push({
      id: `match:${match.id}`,
      type: "match",
      matchId: match.id,
      peerSessionId: peer.peerSessionId,
      title: peer.name,
      subtitle: peer.subtitle,
      img: peer.photo,
      unread: 0,
      messages: (state.liveMessages || [])
        .filter((message) => messageBelongsToMatch(message, match))
        .map((message) => ({
          id: message.id,
          from: message.name,
          time: formatLiveMessageTime(message.at),
          text: message.text,
          mine: message.sessionId === state.sessionId,
        })),
    });
  });
  return items;
}

function openMatchChat(matchId) {
  if (!matchId) return;
  state.activeConversationId = `match:${matchId}`;
  setView("chat");
}

function participantNameForSession(sessionId) {
  return state.liveParticipants.find((participant) => participant.sessionId === sessionId)?.name || "玩家";
}

function activeTurnName(game) {
  const sessionId = game.turnOrder?.[Number(game.turnIndex || 0)];
  return sessionId ? participantNameForSession(sessionId) : "等待玩家";
}

function usesScoreboard(game) {
  return new Set(["reaction", "spark", "orbit", "liar", "highroll", "rushdice", "highcard", "oldmaid", "texas", "rummy", "mahjong", "roulette", "slots", "uno", "monopoly", "memory", "quiz"]).has(game.mode);
}

function handItemLabel(item) {
  if (!item) return "";
  if (typeof item === "string") return item;
  if (typeof item === "object" && item.label) return item.label;
  return String(item);
}

function handItemTone(item) {
  const label = handItemLabel(item);
  return /[HD]|萬/.test(label) ? "warm" : /條/.test(label) ? "teal" : "";
}

function gameAnswerBySession(game, sessionId = state.sessionId) {
  return currentRoundAnswers(game).find((answer) => answer.sessionId === sessionId);
}

function renderTokenList(items, className = "card-chip") {
  return items
    .map((item) => `<span class="${className} ${handItemTone(item) ? `is-${handItemTone(item)}` : ""}">${escapeHtml(handItemLabel(item))}</span>`)
    .join("");
}

function renderHandCounts(game) {
  const counts = Object.entries(game.handCounts || {});
  if (!counts.length) return "";
  return `
    <div class="hand-counts">
      ${counts
        .map(
          ([sessionId, count]) => `
            <article>
              <strong>${escapeHtml(participantNameForSession(sessionId))}</strong>
              <span>${Number(count)} 張</span>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function liarBidOptions(game) {
  const start = game.bid ? Number(game.bid.count) * 6 + Number(game.bid.face) : 0;
  return Array.from({ length: 8 }, (_, index) => {
    const value = start + index + 1;
    return {
      count: Math.floor((value - 1) / 6) + 1,
      face: ((value - 1) % 6) + 1,
    };
  });
}

function partyAnswersHtml(game) {
  const answers = currentRoundAnswers(game);
  if (!answers.length) return `<p class="party-empty">還沒有人回答，邀請房內真人一起玩。</p>`;
  return `
    <div class="party-answer-list">
      ${answers
        .map(
          (answer) => `
            <article>
              <strong>${escapeHtml(answer.name)}</strong>
              <span>${escapeHtml(answer.answer)}</span>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderChemistryGame(game) {
  const myAnswer = currentGameAnswer(game)?.answer || "";
  const answers = currentRoundAnswers(game);
  const same = myAnswer ? answers.filter((answer) => answer.answer === myAnswer).length : 0;
  const matchText =
    myAnswer && answers.length > 1
      ? `目前有 ${Math.max(0, same - 1)} 位玩家和你同答案，這題很好開話題。`
      : "先選一個答案，看看今晚誰和你最同頻。";
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <div class="chemistry-options">
      ${(game.options || [])
        .map(
          (option) => `
            <button class="chemistry-option ${option === myAnswer ? "is-selected" : ""}" type="button" data-party-answer="${escapeHtml(option)}">
              ${escapeHtml(option)}
            </button>
          `,
        )
        .join("")}
    </div>
    <p class="reaction-result">${matchText}</p>
    ${myAnswer ? partyAnswersHtml(game) : `<p class="party-empty">還沒送出答案，按一個選項就會同步到整個房間。</p>`}
  `;
}

function renderVibeGame(game) {
  const myAnswer = currentGameAnswer(game)?.answer || "";
  const answers = currentRoundAnswers(game);
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <div class="vibe-options">
      ${(game.options || [])
        .map((option) => {
          const count = answers.filter((answer) => answer.answer === option).length;
          const percent = answers.length ? Math.round((count / answers.length) * 100) : 0;
          return `
            <button class="vibe-option ${option === myAnswer ? "is-selected" : ""}" type="button" data-party-answer="${escapeHtml(option)}">
              <strong>${escapeHtml(option)}</strong>
              <span>${count ? `${count} 人 · ${percent}%` : "搶先選這個"}</span>
            </button>
          `;
        })
        .join("")}
    </div>
    <p class="reaction-result">${myAnswer ? `你選了「${escapeHtml(myAnswer)}」，看看誰和你今晚最同 vibe。` : "這題會即時統計整個房內的氣氛走向。"}</p>
    ${answers.length ? partyAnswersHtml(game) : `<p class="party-empty">還沒有人投票，先幫這一局定調。</p>`}
  `;
}

function renderTruthGame(game) {
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <form class="party-answer-form" id="partyAnswerForm">
      <input id="partyAnswerInput" maxlength="180" autocomplete="off" placeholder="用一句真話接球，讓聊天室自然熱起來" />
      <button class="primary-action" type="submit"><i data-lucide="send"></i><span>送出</span></button>
    </form>
    ${partyAnswersHtml(game)}
  `;
}

function renderStoryGame(game) {
  const entries = currentRoundAnswers(game);
  const totalPlayers = Math.max(state.liveParticipants.length, entries.length);
  const remaining = Math.max(totalPlayers - entries.length, 0);
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <form class="party-answer-form" id="partyAnswerForm">
      <input id="partyAnswerInput" maxlength="120" autocomplete="off" placeholder="接一句，8 到 24 個字最剛好" />
      <button class="primary-action" type="submit"><i data-lucide="send"></i><span>接上</span></button>
    </form>
    <div class="story-lane">
      ${
        entries.length
          ? entries
              .map(
                (entry, index) => `
                  <article class="story-entry">
                    <span>${index + 1}</span>
                    <div>
                      <strong>${escapeHtml(entry.name)}</strong>
                      <p>${escapeHtml(entry.answer)}</p>
                    </div>
                  </article>
                `,
              )
              .join("")
          : `<p class="party-empty">還沒有人起頭，寫下房間今晚的第一句台詞。</p>`
      }
    </div>
    <p class="reaction-result">${remaining ? `還差 ${remaining} 人接龍，句子越亂越有話題。` : "這段故事已經成形，按下一局換一個新場景。"}</p>
  `;
}

function renderReactionGame(game) {
  const mine = currentGameAnswer(game);
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <div class="reaction-zone">
      <button class="reaction-button" type="button" id="reactionButton" disabled>等待訊號…</button>
      <p class="reaction-result" id="reactionResult">${mine ? `你的成績：${escapeHtml(mine.answer)}` : "燈亮之前先別按，房內所有人一起搶最快。"}</p>
    </div>
  `;
}

function renderDoodleGame(game) {
  const colors = ["#172124", "#087f7b", "#f56f63", "#c79125", "#6650a4"];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <div class="doodle-tools">
      ${colors
        .map(
          (color) => `
            <button class="doodle-color ${color === state.drawingColor ? "is-active" : ""}" type="button" data-doodle-color="${color}" style="--swatch:${color}" aria-label="選擇畫筆顏色 ${color}"></button>
          `,
        )
        .join("")}
      <button class="ghost-action doodle-clear" type="button" id="clearDoodleBtn"><i data-lucide="eraser"></i><span>清空畫布</span></button>
    </div>
    <canvas class="doodle-board" id="doodleBoard" width="900" height="506" aria-label="多人共創塗鴉畫布"></canvas>
  `;
}

function renderSparkGame(game) {
  const target = game.target || { id: "waiting", x: 50, y: 50 };
  const leader = [...(game.scores || [])].sort((a, b) => Number(b.score) - Number(a.score))[0];
  return `
    <div class="party-prompt">看見心動光點就搶，節奏像輕量 .io，適合語音房暖場。</div>
    <div class="orbit-status"><strong>${leader ? `目前領先：${escapeHtml(leader.name)} · ${Number(leader.score)} 分` : "目前還沒有人得分"}</strong></div>
    <div class="spark-arena" id="sparkArena">
      <button
        class="spark-target"
        id="sparkTarget"
        type="button"
        data-target-id="${escapeHtml(target.id)}"
        style="--target-x:${Number(target.x)}%;--target-y:${Number(target.y)}%"
        aria-label="搶下心動光點"
      ><i data-lucide="heart"></i></button>
      <span>滑鼠點擊或手指觸控</span>
    </div>
  `;
}

function renderOrbitGame(game) {
  const target = game.target || { id: "waiting", x: 50, y: 50 };
  const remaining = Math.max(0, Number(game.targetExpiresAt || 0) - (Date.now() + state.serverTimeOffsetMs));
  const duration = Math.max(1, Number(game.targetDuration || 1400));
  const progress = Math.max(0, Math.min(100, Math.round((remaining / duration) * 100)));
  return `
    <div class="party-prompt">光點會自己亂跳，所有人一起追光搶分，玩感更像多人 .io 派對房。</div>
    <div class="orbit-status">
      <strong>鎖定剩餘 <span id="orbitCountdownText">${(remaining / 1000).toFixed(1)}s</span></strong>
      <div class="orbit-progress" aria-hidden="true"><b id="orbitCountdownBar" style="width:${progress}%"></b></div>
    </div>
    <div class="spark-arena orbit-arena">
      <button
        class="spark-target orbit-target"
        id="orbitTarget"
        type="button"
        data-target-id="${escapeHtml(target.id)}"
        style="--target-x:${Number(target.x)}%;--target-y:${Number(target.y)}%"
        aria-label="搶下追光點"
      ><i data-lucide="zap"></i></button>
      <span>命中一次就會立刻換位置，房內所有裝置同步衝榜</span>
    </div>
  `;
}

function renderGameMetaGrid(items) {
  return `
    <div class="game-meta-grid">
      ${items
        .map(
          (item) => `
            <article class="game-stat">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.value)}</strong>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderLiarGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  const isMyTurn = game.turnOrder?.[Number(game.turnIndex || 0)] === state.sessionId;
  const bidLabel = game.bid ? `${Number(game.bid.count)} 顆 ${Number(game.bid.face)} 點` : "尚未叫骰";
  const revealed = Object.entries(game.revealedHands || {});
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "輪到", value: activeTurnName(game) },
      { label: "目前叫骰", value: bidLabel },
      { label: "你的骰子", value: `${mine.length} 顆` },
    ])}
    <div class="private-hand">${mine.length ? renderTokenList(mine.map((value) => `${value}點`), "dice-chip") : `<p class="party-empty">等待本局骰子同步。</p>`}</div>
    <div class="action-grid">
      ${liarBidOptions(game)
        .map(
          (option) => `
            <button class="ghost-action stretch" type="button" data-game-move="bid" data-count="${option.count}" data-face="${option.face}" ${isMyTurn ? "" : "disabled"}>
              <span>${option.count} 顆 ${option.face} 點</span>
            </button>
          `,
        )
        .join("")}
      <button class="primary-action stretch" type="button" data-game-move="challenge" ${isMyTurn && game.bid ? "" : "disabled"}>
        <i data-lucide="siren"></i><span>抓包</span>
      </button>
    </div>
    ${renderHandCounts(game)}
    ${
      revealed.length
        ? `
          <div class="party-answer-list">
            ${revealed
              .map(
                ([sessionId, dice]) => `
                  <article>
                    <strong>${escapeHtml(participantNameForSession(sessionId))}</strong>
                    <span>${escapeHtml((dice || []).map((value) => `${value}點`).join(" / "))}</span>
                  </article>
                `,
              )
              .join("")}
          </div>
        `
        : ""
    }
  `;
}

function renderHighRollGame(game) {
  const mine = gameAnswerBySession(game)?.answer || "還沒擲骰";
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的結果", value: mine },
      { label: "目前在線", value: `${state.liveParticipants.length} 人` },
    ])}
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="roll"><i data-lucide="dices"></i><span>擲骰</span></button>
    </div>
    ${partyAnswersHtml(game)}
  `;
}

function renderRushDiceGame(game) {
  const mine = gameAnswerBySession(game)?.answer || "還沒出手";
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "目標總點數", value: `${Number(game.targetTotal || 0)} 點` },
      { label: "你的上一擲", value: mine },
    ])}
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="roll"><i data-lucide="target"></i><span>擲骰搶點</span></button>
    </div>
    ${partyAnswersHtml(game)}
  `;
}

function renderHighCardGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的牌", value: mine.length ? handItemLabel(mine[0]) : "尚未抽牌" },
      { label: "房內人數", value: `${state.liveParticipants.length} 人` },
    ])}
    <div class="private-hand">${mine.length ? renderTokenList(mine, "card-chip") : `<p class="party-empty">按下抽牌後才會看到你的手牌。</p>`}</div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="draw" ${mine.length ? "disabled" : ""}>
        <i data-lucide="badge-plus"></i><span>抽一張牌</span>
      </button>
    </div>
    ${renderHandCounts(game)}
    ${partyAnswersHtml(game)}
  `;
}

function renderOldMaidGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的手牌", value: `${mine.length} 張` },
      { label: "目標", value: "別讓鬼牌留在手上" },
    ])}
    <div class="private-hand">${mine.length ? renderTokenList(mine, "card-chip") : `<p class="party-empty">等待手牌同步。</p>`}</div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="reveal"><i data-lucide="eye"></i><span>整理並揭曉</span></button>
    </div>
    ${renderHandCounts(game)}
    ${partyAnswersHtml(game)}
  `;
}

function renderTexasGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "公共牌", value: `${(game.communityCards || []).length} 張` },
      { label: "你的手牌", value: `${mine.length} 張` },
    ])}
    <div class="shared-hand">
      <h4>公共牌</h4>
      <div class="private-hand">${renderTokenList(game.communityCards || [], "card-chip")}</div>
    </div>
    <div class="shared-hand">
      <h4>你的兩張牌</h4>
      <div class="private-hand">${mine.length ? renderTokenList(mine, "card-chip") : `<p class="party-empty">等待發牌。</p>`}</div>
    </div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="reveal"><i data-lucide="club"></i><span>比牌型</span></button>
    </div>
    ${renderHandCounts(game)}
    ${partyAnswersHtml(game)}
  `;
}

function renderRummyGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的手牌", value: `${mine.length} 張` },
      { label: "玩法", value: "找順子與刻子" },
    ])}
    <div class="private-hand">${mine.length ? renderTokenList(mine, "card-chip") : `<p class="party-empty">等待牌組同步。</p>`}</div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="meld"><i data-lucide="layers-3"></i><span>整理牌型</span></button>
    </div>
    ${renderHandCounts(game)}
    ${partyAnswersHtml(game)}
  `;
}

function renderMahjongGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的手牌", value: `${mine.length} 張` },
      { label: "目標", value: "湊面子與將眼" },
    ])}
    <div class="private-hand">${mine.length ? renderTokenList(mine, "tile-chip") : `<p class="party-empty">等待麻將牌同步。</p>`}</div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="check"><i data-lucide="gallery-vertical-end"></i><span>檢查牌型</span></button>
    </div>
    ${renderHandCounts(game)}
    ${partyAnswersHtml(game)}
  `;
}

function renderRouletteGame(game) {
  const myBet = game.bets?.[state.sessionId] || "";
  const result = game.spinResult;
  const options = [
    ["red", "紅"],
    ["black", "黑"],
    ["odd", "單"],
    ["even", "雙"],
    ["low", "1-18"],
    ["high", "19-36"],
    ["dozen-1", "1-12"],
    ["dozen-2", "13-24"],
    ["dozen-3", "25-36"],
  ];
  const resultText = result ? `${Number(result.number)} · ${result.color === "green" ? "綠" : result.color === "red" ? "紅" : "黑"}` : "尚未開盤";
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的下注", value: myBet ? myBet : "尚未下注" },
      { label: "上一顆球", value: resultText },
    ])}
    <div class="roulette-wheel">
      ${options
        .map(
          ([bet, label]) => `
            <button class="roulette-pocket ${bet === myBet ? "is-selected" : ""} ${bet === "red" ? "is-red" : bet === "black" ? "is-black" : ""}" type="button" data-game-move="bet" data-bet="${bet}">
              ${label}
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="spin"><i data-lucide="circle-dot"></i><span>開盤</span></button>
    </div>
    ${partyAnswersHtml(game)}
  `;
}

function renderSlotsGame(game) {
  const mine = gameAnswerBySession(game)?.answer || "還沒拉霸";
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "你的上一輪", value: mine },
      { label: "玩法", value: "三軸免費拉霸" },
    ])}
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="spin"><i data-lucide="cherry"></i><span>拉霸一次</span></button>
    </div>
    ${partyAnswersHtml(game)}
  `;
}

function renderUnoGame(game) {
  const mine = Array.isArray(game.myHand) ? game.myHand : [];
  const isMyTurn = game.turnOrder?.[Number(game.turnIndex || 0)] === state.sessionId;
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "輪到", value: activeTurnName(game) },
      { label: "桌面牌", value: handItemLabel(game.topCard) || "等待翻牌" },
      { label: "你的手牌", value: `${mine.length} 張` },
    ])}
    <div class="private-hand">
      ${
        mine.length
          ? mine
              .map(
                (card) => `
                  <button class="token-action card-chip ${handItemTone(card) ? `is-${handItemTone(card)}` : ""}" type="button" data-game-move="play" data-card="${escapeHtml(handItemLabel(card))}" ${isMyTurn ? "" : "disabled"}>
                    ${escapeHtml(handItemLabel(card))}
                  </button>
                `,
              )
              .join("")
          : `<p class="party-empty">你這局沒有手牌。</p>`
      }
    </div>
    <div class="action-grid">
      <button class="ghost-action stretch" type="button" data-game-move="draw" ${isMyTurn ? "" : "disabled"}>
        <i data-lucide="plus"></i><span>抽一張</span>
      </button>
    </div>
    ${renderHandCounts(game)}
    ${partyAnswersHtml(game)}
  `;
}

function renderMonopolyGame(game) {
  const myPosition = Number(game.positions?.[state.sessionId] || 0);
  const isMyTurn = game.turnOrder?.[Number(game.turnIndex || 0)] === state.sessionId;
  const tiles = Array.isArray(game.tileMeta) ? game.tileMeta : [];
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "輪到", value: activeTurnName(game) },
      { label: "你的籌碼", value: `${Number(game.coins?.[state.sessionId] || 12)} 枚` },
      { label: "目前位置", value: tiles[myPosition]?.name || "Start" },
    ])}
    <div class="monopoly-board">
      ${tiles
        .map((tile, index) => {
          const occupants = state.liveParticipants
            .filter((participant) => Number(game.positions?.[participant.sessionId] || 0) === index)
            .map((participant) => participant.name.slice(0, 1))
            .join(" ");
          return `
            <article class="monopoly-tile ${index === myPosition ? "is-current" : ""}">
              <strong>${escapeHtml(tile.name)}</strong>
              <span>${Number(tile.coins) >= 0 ? `+${Number(tile.coins)}` : Number(tile.coins)}</span>
              <small>${escapeHtml(occupants || "空位")}</small>
            </article>
          `;
        })
        .join("")}
    </div>
    <div class="action-grid">
      <button class="primary-action stretch" type="button" data-game-move="roll" ${isMyTurn ? "" : "disabled"}>
        <i data-lucide="dice-3"></i><span>擲骰前進</span>
      </button>
    </div>
  `;
}

function renderMemoryGame(game) {
  const isMyTurn = game.turnOrder?.[Number(game.turnIndex || 0)] === state.sessionId;
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    ${renderGameMetaGrid([
      { label: "輪到", value: activeTurnName(game) },
      { label: "已配對", value: `${(game.matched || []).filter(Boolean).length / 2} 組` },
    ])}
    <div class="memory-grid">
      ${(game.board || [])
        .map((symbol, index) => {
          const faceUp = Boolean(game.matched?.[index]) || (game.flipped || []).includes(index);
          return `
            <button class="memory-tile ${faceUp ? "is-face-up" : ""} ${game.matched?.[index] ? "is-matched" : ""}" type="button" data-game-move="flip" data-index="${index}" ${isMyTurn && !faceUp ? "" : "disabled"}>
              <span>${faceUp ? escapeHtml(symbol) : "?"}</span>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderQuizGame(game) {
  const myAnswer = gameAnswerBySession(game)?.answer || "";
  return `
    <div class="party-prompt">${escapeHtml(game.prompt)}</div>
    <div class="vibe-options">
      ${(game.options || [])
        .map(
          (option) => `
            <button class="vibe-option ${option === myAnswer ? "is-selected" : ""}" type="button" data-party-answer="${escapeHtml(option)}">
              <strong>${escapeHtml(option)}</strong>
              <span>${option === myAnswer ? "你已選擇" : "送出答案"}</span>
            </button>
          `,
        )
        .join("")}
    </div>
    <p class="reaction-result">${myAnswer ? `你這題選了「${escapeHtml(myAnswer)}」` : "答對的人會留下分數，答錯也能繼續聊天。"} </p>
    ${partyAnswersHtml(game)}
  `;
}

function renderPartyScoreboard(game) {
  const scores = [...(game.scores || [])].sort((a, b) =>
    game.mode === "reaction" ? Number(a.score) - Number(b.score) : Number(b.score) - Number(a.score),
  );
  const answers = currentRoundAnswers(game);
  const answersBySession = new Map(answers.map((answer) => [answer.sessionId, answer]));
  const title =
    game.mode === "reaction"
      ? "反應排行榜"
      : game.mode === "spark"
        ? "搶點排行榜"
        : game.mode === "orbit"
          ? "追光排行榜"
          : usesScoreboard(game)
            ? "房內戰績"
            : game.mode === "story"
            ? "接龍進度"
            : "本局進度";
  const unit = game.mode === "reaction" ? "ms" : ["roulette", "slots", "monopoly"].includes(game.mode) ? "籌碼" : "分";
  return `
    <aside class="party-scoreboard">
      <div class="panel-title"><i data-lucide="trophy"></i><h3>${title}</h3></div>
      ${game.lastSummary ? `<p class="party-summary">${escapeHtml(game.lastSummary)}</p>` : ""}
      <div class="party-score-list">
        ${
          usesScoreboard(game) && scores.length
            ? scores
                .map(
                  (score, index) => `<article><strong>${index + 1}. ${escapeHtml(score.name)}</strong><span>${Number(score.score)} ${unit}</span></article>`,
                )
                .join("")
            : state.liveParticipants.length
              ? state.liveParticipants
                  .map((participant) => {
                    const answer = answersBySession.get(participant.sessionId);
                    const status = answer
                      ? game.mode === "story"
                        ? "已接龍"
                        : game.mode === "truth"
                          ? "已回答"
                          : answer.answer
                      : game.mode === "doodle"
                        ? "一起共畫"
                        : "等待加入";
                    return `<article><strong>${escapeHtml(participant.name)}</strong><span>${escapeHtml(status)}</span></article>`;
                  })
                  .join("")
              : `<p class="party-empty">房內還沒有其他人，分享房號後會更好玩。</p>`
        }
      </div>
      <button class="ghost-action stretch" type="button" id="nextPartyRoundBtn"><i data-lucide="skip-forward"></i><span>下一局</span></button>
    </aside>
  `;
}

function renderPartyGames() {
  const arena = $("#partyGameArena");
  if (!arena) return;
  window.clearInterval(state.reactionUiTimer);
  state.reactionUiTimer = null;
  const game = state.liveGame || { mode: "chemistry", round: 1, prompt: "等待遊戲同步", options: [], answers: [], scores: [], drawing: [] };
  const mode = partyGameCatalog[game.mode] ? game.mode : "chemistry";
  const active = partyGameCatalog[mode];
  const stage = {
    chemistry: renderChemistryGame,
    vibe: renderVibeGame,
    truth: renderTruthGame,
    story: renderStoryGame,
    reaction: renderReactionGame,
    doodle: renderDoodleGame,
    spark: renderSparkGame,
    orbit: renderOrbitGame,
    liar: renderLiarGame,
    highroll: renderHighRollGame,
    rushdice: renderRushDiceGame,
    highcard: renderHighCardGame,
    oldmaid: renderOldMaidGame,
    texas: renderTexasGame,
    rummy: renderRummyGame,
    mahjong: renderMahjongGame,
    roulette: renderRouletteGame,
    slots: renderSlotsGame,
    uno: renderUnoGame,
    monopoly: renderMonopolyGame,
    memory: renderMemoryGame,
    quiz: renderQuizGame,
  }[mode](game);

  arena.innerHTML = `
    <div class="party-game-intro">
      <div><h3>真人多人免費賭場</h3><p>不用儲值，直接用同一個房號讓不同裝置、不同網路的玩家一起玩牌、玩骰子、玩麻將，玩完直接聊。</p></div>
      <span class="party-room-chip"><i data-lucide="users-round"></i>${escapeHtml(state.currentRoomId)} · ${state.liveParticipants.length} 人</span>
    </div>
    <div class="party-game-library">
      ${Object.entries(partyGameCatalog)
        .map(
          ([id, item]) => `
            <button class="party-game-mode ${id === mode ? "is-active" : ""}" type="button" data-party-mode="${id}">
              <span><i data-lucide="${item.icon}"></i></span>
              <span><strong>${item.name}</strong><small>${item.description}</small></span>
            </button>
          `,
        )
        .join("")}
    </div>
    <div class="party-game-layout">
      <section class="party-game-stage">
        <div class="party-stage-head"><div><h3>${active.name}</h3><p>${active.description}</p></div><span class="party-round">第 ${Number(game.round || 1)} 局</span></div>
        ${stage}
      </section>
      ${renderPartyScoreboard(game)}
    </div>
  `;

  $$('[data-party-mode]').forEach((button) => button.addEventListener("click", () => selectPartyGame(button.dataset.partyMode)));
  $$('[data-party-answer]').forEach((button) => button.addEventListener("click", () => submitPartyAnswer(button.dataset.partyAnswer)));
  $$("[data-game-move]").forEach((button) =>
    button.addEventListener("click", () => {
      const extra = {};
      if (button.dataset.card) extra.card = button.dataset.card;
      if (button.dataset.bet) extra.bet = button.dataset.bet;
      if (button.dataset.count) extra.count = Number(button.dataset.count);
      if (button.dataset.face) extra.face = Number(button.dataset.face);
      if (button.dataset.index !== undefined) extra.index = Number(button.dataset.index);
      submitGameMove(button.dataset.gameMove, extra);
    }),
  );
  $("#partyAnswerForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#partyAnswerInput");
    submitPartyAnswer(input.value);
    input.value = "";
  });
  $("#nextPartyRoundBtn")?.addEventListener("click", nextLiveGameRound);
  $("#sparkTarget")?.addEventListener("click", (event) => {
    event.currentTarget.disabled = true;
    syncRealtime("game-tap", { targetId: event.currentTarget.dataset.targetId });
  });
  $("#orbitTarget")?.addEventListener("click", (event) => {
    event.currentTarget.dataset.pending = "true";
    event.currentTarget.disabled = true;
    syncRealtime("game-tap", { targetId: event.currentTarget.dataset.targetId });
  });
  if (mode === "reaction") wireReactionGame(game);
  if (mode === "doodle") wireDoodleBoard(game);
  if (mode === "orbit") wireOrbitGame(game);
  syncIcons();
}

function wireReactionGame(game) {
  window.clearInterval(state.reactionUiTimer);
  const button = $("#reactionButton");
  const mine = currentGameAnswer(game);
  if (button && mine) {
    button.disabled = true;
    button.textContent = "本局已完成";
    return;
  }
  const update = () => {
    if (!button || mine) return;
    const ready = Date.now() + state.serverTimeOffsetMs >= Number(game.targetAt || Infinity);
    button.disabled = !ready;
    button.textContent = ready ? "現在按！" : "等待訊號…";
  };
  update();
  state.reactionUiTimer = window.setInterval(update, 80);
}

function wireOrbitGame(game) {
  window.clearInterval(state.reactionUiTimer);
  const button = $("#orbitTarget");
  const text = $("#orbitCountdownText");
  const bar = $("#orbitCountdownBar");
  const update = () => {
    if (!button) return;
    const remaining = Math.max(0, Number(game.targetExpiresAt || 0) - (Date.now() + state.serverTimeOffsetMs));
    const duration = Math.max(1, Number(game.targetDuration || 1400));
    const progress = Math.max(0, Math.min(100, Math.round((remaining / duration) * 100)));
    const pending = button.dataset.pending === "true";
    button.disabled = pending || remaining <= 0;
    if (text) text.textContent = `${(remaining / 1000).toFixed(1)}s`;
    if (bar) bar.style.width = `${progress}%`;
  };
  update();
  state.reactionUiTimer = window.setInterval(update, 80);
}

function drawDoodleLines(canvas, lines) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineCap = "round";
  context.lineJoin = "round";
  lines.forEach((line) => {
    context.strokeStyle = line.color || "#172124";
    context.lineWidth = Number(line.width || 4);
    context.beginPath();
    context.moveTo(Number(line.x1) * canvas.width, Number(line.y1) * canvas.height);
    context.lineTo(Number(line.x2) * canvas.width, Number(line.y2) * canvas.height);
    context.stroke();
  });
}

function wireDoodleBoard(game) {
  const canvas = $("#doodleBoard");
  if (!canvas) return;
  drawDoodleLines(canvas, game.drawing || []);
  let previous = null;
  const point = (event) => {
    const bounds = canvas.getBoundingClientRect();
    return { x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height };
  };
  const drawLocalLines = () => drawDoodleLines(canvas, [...(game.drawing || []), ...state.drawingBuffer]);
  canvas.addEventListener("pointerdown", (event) => {
    state.drawingActive = true;
    state.drawingBuffer = [];
    previous = point(event);
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!state.drawingActive || !previous) return;
    const next = point(event);
    const line = { x1: previous.x, y1: previous.y, x2: next.x, y2: next.y, color: state.drawingColor, width: 4 };
    state.drawingBuffer.push(line);
    drawLocalLines();
    previous = next;
  });
  const finish = async () => {
    if (!state.drawingActive) return;
    previous = null;
    const lines = state.drawingBuffer.splice(0);
    while (lines.length) {
      await syncRealtime("game-draw", { lines: lines.splice(0, 80) });
    }
    state.drawingActive = false;
    renderPartyGames();
  };
  canvas.addEventListener("pointerup", finish);
  canvas.addEventListener("pointercancel", finish);
  $$('[data-doodle-color]').forEach((button) => {
    button.addEventListener("click", () => {
      state.drawingColor = button.dataset.doodleColor;
      renderPartyGames();
    });
  });
  $("#clearDoodleBtn")?.addEventListener("click", () => syncRealtime("game-clear"));
}

function leaveRealtimeRoom() {
  if (!state.connectionReady) return;
  const payload = JSON.stringify(multiplayerPayload("leave"));
  const endpoint = apiUrl("/api/realtime");
  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([payload], { type: "application/json" }));
    return;
  }
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}

function renderMultiplayerPanel() {
  const panel = $("#multiplayerPanel");
  if (!panel) return;
  const room = roomById(state.currentRoomId);
  const isConnected = state.liveStatus === "connected";
  const participants = state.liveParticipants;
  const messages = liveSharedMessages();
  const voiceParticipants = participants.filter((participant) => participant.voice?.joined);
  const directVoicePeers = state.voicePeerIds;
  const matches = state.liveMatches;
  const acceptedMatches = currentUserAcceptedMatches();
  const game = state.liveGame || { round: 1, prompt: "用一句話形容你今天的心情。", answers: [] };
  const lastSync = state.liveLastSyncAt
    ? new Date(state.liveLastSyncAt).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
    : "尚未同步";

  panel.innerHTML = `
    <div class="panel-title">
      <i data-lucide="${isConnected ? "users-round" : "cloud-off"}"></i>
      <h3>真人多人互動房</h3>
    </div>
    <div class="multiplayer-status ${isConnected ? "is-connected" : ""}">
      <div>
        <span>${isConnected ? "雲端連線中" : "等待連線"}</span>
        <strong>${room.title}</strong>
      </div>
      <div>
        <span>全站在線</span>
        <strong>${state.liveOnlineCount || participants.length}</strong>
      </div>
      <div>
        <span>最後同步</span>
        <strong>${lastSync}</strong>
      </div>
      <div>
        <span>連線主機</span>
        <strong title="${escapeHtml(connectionDisplayUrl())}">${escapeHtml(shortConnectionLabel())}</strong>
      </div>
      <button class="ghost-action" type="button" id="refreshLiveBtn">
        <i data-lucide="refresh-cw"></i>
        <span>同步</span>
      </button>
    </div>
    <div class="live-room-tools">
      <button class="primary-action" type="button" id="voiceToggleBtn">
        <i data-lucide="${state.micOn ? "mic-off" : "mic"}"></i>
        <span>${state.micOn ? "離開語音" : "真人上麥"}</span>
      </button>
      <button class="ghost-action" type="button" id="voiceMuteLiveBtn" ${state.micOn ? "" : "disabled"}>
        <i data-lucide="${state.muted ? "volume-2" : "mic-2"}"></i>
        <span>${state.muted ? "取消靜音" : "靜音"}</span>
      </button>
      <button class="ghost-action" type="button" id="randomMatchBtn">
        <i data-lucide="heart-handshake"></i>
        <span>隨機配對真人</span>
      </button>
      <button class="ghost-action" type="button" id="nextGameBtn">
        <i data-lucide="shuffle"></i>
        <span>下一題</span>
      </button>
      <button class="ghost-action" type="button" id="openConnectionGateBtn">
        <i data-lucide="network"></i>
        <span>房號 / IP</span>
      </button>
      <button class="ghost-action" type="button" id="copyRoomLinkBtn">
        <i data-lucide="share-2"></i>
        <span>分享房間</span>
      </button>
    </div>
    <div class="multiplayer-grid">
      <section class="live-participants">
        <h4>此房在線</h4>
        <div>
          ${
            participants.length
              ? participants
                  .map(
                    (participant) => `
                      <article class="${participant.sessionId === state.sessionId ? "is-me" : ""}">
                        <img src="${escapeHtml(participant.photo || userProfile.photo)}" alt="${escapeHtml(participant.name)}" />
                        <span>
                          <strong>${escapeHtml(participant.name)}${participant.sessionId === state.sessionId ? "（你）" : ""}</strong>
                          <small>${deviceLabel(participant.device)} · ${participant.voice?.joined ? (participant.voice.muted ? "語音靜音" : "語音上麥") : "線上"}</small>
                        </span>
                        ${
                          participant.sessionId === state.sessionId
                            ? ""
                            : `<button class="mini-action" type="button" data-invite-session="${escapeHtml(participant.sessionId)}">配對</button>`
                        }
                      </article>
                    `,
                  )
                  .join("")
              : `<p>目前沒有其他使用者在線。用手機或另一台電腦開啟同一網址即可測試多人連線。</p>`
          }
        </div>
      </section>
      <section class="live-messages">
        <h4>共享訊息</h4>
        <div class="live-message-list" id="liveMessageList">
          ${
            messages.length
              ? messages
                  .map(
                    (message) => `
                      <article class="${message.sessionId === state.sessionId ? "mine" : ""}">
                        <span>${escapeHtml(message.name)} · ${deviceLabel(message.device)}</span>
                        <p>${escapeHtml(message.text)}</p>
                      </article>
                    `,
                  )
                  .join("")
              : `<article><span>系統</span><p>送出第一則共享訊息，其他裝置會在同步後看到。</p></article>`
          }
        </div>
        <form class="live-composer" id="liveMessageForm">
          <input id="liveMessageInput" type="text" maxlength="240" placeholder="輸入多人共享訊息" autocomplete="off" />
          <button class="primary-action" type="submit">
            <i data-lucide="send"></i>
            <span>送出</span>
          </button>
        </form>
      </section>
    </div>
    <div class="live-experience-grid">
      <section class="voice-channel-card">
        <div class="sub-panel-title">
          <i data-lucide="audio-lines"></i>
          <h4>語音房</h4>
        </div>
        <p>${escapeHtml(voiceBridgeSummary())}</p>
        ${
          directVoicePeers.length
            ? `
              <div class="voice-direct-peer-list">
                ${directVoicePeers
                  .map((peerId) => {
                    const peer = state.voicePeerProfiles[peerId] || {};
                    return `<span>${escapeHtml(voicePeerLabel(peerId))} · ${deviceLabel(peer.device)}</span>`;
                  })
                  .join("")}
              </div>
            `
            : ""
        }
        <div class="voice-speaker-list">
          ${
            voiceParticipants.length
              ? voiceParticipants
                  .map((participant) => {
                    const level = Math.max(6, Number(participant.voice?.level || 0));
                    return `
                      <article class="${participant.sessionId === state.sessionId ? "is-me" : ""}">
                        <span>
                          <strong>${escapeHtml(participant.name)}${participant.sessionId === state.sessionId ? "（你）" : ""}</strong>
                          <small>${participant.voice?.muted ? "靜音中" : participant.voice?.speaking ? "正在說話" : "上麥中"}</small>
                        </span>
                        <b style="--level:${level}%"></b>
                      </article>
                    `;
                  })
                  .join("")
              : directVoicePeers.length
                ? `<span class="empty-live-note">已建立 P2P 語音連線，等待對方完成上麥同步。</span>`
                : `<span class="empty-live-note">還沒有人上麥，點「真人上麥」開始語音房。</span>`
          }
        </div>
      </section>
      <section class="live-match-card">
        <div class="sub-panel-title">
          <i data-lucide="heart-handshake"></i>
          <h4>真人配對邀請</h4>
        </div>
        <div class="live-match-list">
          ${
            matches.length
              ? matches
                  .map((match) => {
                    const canAccept =
                      match.status !== "accepted" &&
                      match.fromSessionId !== state.sessionId &&
                      (!match.toSessionId || match.toSessionId === state.sessionId);
                    return `
                      <article>
                        <span>
                          <strong>${escapeHtml(match.fromName)} → ${escapeHtml(match.toName)}</strong>
                          <small>${match.status === "accepted" ? "已配對成功" : match.status === "open" ? "等待房內真人接受" : "等待接受"}</small>
                        </span>
                        ${
                          canAccept
                            ? `<button class="mini-action" type="button" data-accept-match="${escapeHtml(match.id)}">接受</button>`
                            : match.status === "accepted" && (match.fromSessionId === state.sessionId || match.toSessionId === state.sessionId)
                              ? `<button class="mini-action" type="button" data-open-match-chat="${escapeHtml(match.id)}">聊天</button>`
                              : ""
                        }
                      </article>
                    `;
                  })
                  .join("")
              : `<span class="empty-live-note">目前沒有配對邀請。可以對在線真人按「配對」。</span>`
          }
        </div>
        ${
          acceptedMatches.length
            ? `
              <div class="voice-direct-peer-list">
                ${acceptedMatches
                  .map((match) => {
                    const peer = matchPeerDetails(match);
                    return `<button class="mini-action" type="button" data-open-match-chat="${escapeHtml(match.id)}">${escapeHtml(peer.name)}</button>`;
                  })
                  .join("")}
              </div>
            `
            : ""
        }
      </section>
      <section class="live-game-card">
        <div class="sub-panel-title">
          <i data-lucide="gamepad-2"></i>
          <h4>${partyGameCatalog[game.mode]?.name || "多人免費賭場"} · 第 ${Number(game.round || 1)} 局</h4>
        </div>
        <p class="live-game-prompt">${escapeHtml(game.prompt)}</p>
        <button class="primary-action stretch" type="button" id="openPartyGamesBtn">
          <i data-lucide="play"></i><span>進入多人免費賭場</span>
        </button>
      </section>
    </div>
  `;

  $("#refreshLiveBtn")?.addEventListener("click", () => syncRealtime("heartbeat"));
  $("#voiceToggleBtn")?.addEventListener("click", toggleMic);
  $("#voiceMuteLiveBtn")?.addEventListener("click", toggleMute);
  $("#randomMatchBtn")?.addEventListener("click", () => inviteLiveMatch());
  $("#nextGameBtn")?.addEventListener("click", nextLiveGameRound);
  $("#openPartyGamesBtn")?.addEventListener("click", () => setView("games"));
  $("#openConnectionGateBtn")?.addEventListener("click", openConnectionGate);
  $("#copyRoomLinkBtn")?.addEventListener("click", copyRoomLink);
  $$("[data-invite-session]").forEach((button) => {
    button.addEventListener("click", () => inviteLiveMatch(button.dataset.inviteSession));
  });
  $$("[data-accept-match]").forEach((button) => {
    button.addEventListener("click", () => acceptLiveMatch(button.dataset.acceptMatch));
  });
  $$("[data-open-match-chat]").forEach((button) => {
    button.addEventListener("click", () => openMatchChat(button.dataset.openMatchChat));
  });
  $("#liveMessageForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = $("#liveMessageInput");
    sendLiveMessage(input.value);
    input.value = "";
  });
  const list = $("#liveMessageList");
  if (list) list.scrollTop = list.scrollHeight;
  syncIcons();
}

function renderRooms(filter = "") {
  const normalized = filter.trim().toLowerCase();
  const filteredRooms = rooms.filter((room) => {
    const content = `${room.title} ${room.topic} ${room.tags.join(" ")}`.toLowerCase();
    return content.includes(normalized);
  });

  $("#roomsGrid").innerHTML = filteredRooms
    .map((room) => {
      const avatars = room.participants
        .map((id) => `<img src="${personById(id).img}" alt="${personById(id).name}" />`)
        .join("");

      return `
        <article class="room-card">
          <img src="${room.cover}" alt="${room.title}" />
          <div class="room-card-body">
            <div>
              <h3>${room.title}</h3>
              <p>${room.topic}</p>
            </div>
            <div class="tag-row">
              ${room.tags.map((tag, index) => `<span class="tag ${index === 1 ? "gold" : ""}">${tag}</span>`).join("")}
            </div>
            <div class="room-meta">
              <span>主持 ${room.host}</span>
              <strong>${room.active}/${room.capacity}</strong>
            </div>
            <div class="room-footer">
              <div class="avatar-stack">${avatars}</div>
              <button type="button" data-join-room="${room.id}">${state.currentRoomId === room.id ? "房內" : "加入"}</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  $$("[data-join-room]").forEach((button) => {
    button.addEventListener("click", () => joinRoom(button.dataset.joinRoom));
  });
}

function renderRoomStage() {
  const room = roomById(state.currentRoomId);
  const rows = room.participants
    .map((id, index) => {
      const person = personById(id);
      return `
        <div class="participant-row">
          <div class="participant-person">
            <img src="${person.img}" alt="${person.name}" />
            <div>
              <strong>${person.name}</strong>
              <span>${index === 0 ? "主持中" : person.mood}</span>
            </div>
          </div>
          <span class="tag">${index === 0 ? "Host" : "Live"}</span>
        </div>
      `;
    })
    .join("");

  $("#roomStage").innerHTML = `
    <div class="stage-cover" style="background-image: url('${room.cover}')">
      <div class="stage-copy">
        <span class="tag gold">${room.active} 人正在聊</span>
        <h3>${room.title}</h3>
        <p>${room.topic}</p>
      </div>
    </div>
    <div class="stage-body">
      <div class="participant-list">${rows}</div>
      <div class="voice-controls">
        <div class="waveform" id="waveform">
          ${Array.from({ length: 18 }, () => `<span style="height: 8px"></span>`).join("")}
        </div>
        <div class="voice-buttons">
          <button class="primary-action" type="button" id="micBtn">
            <i data-lucide="${state.micOn ? "mic" : "mic-2"}"></i>
            <span>${state.micOn ? "離開語音" : "加入語音"}</span>
          </button>
          <button class="ghost-action" type="button" id="muteBtn" ${state.micOn ? "" : "disabled"}>
            <i data-lucide="${state.muted ? "mic-off" : "volume-2"}"></i>
            <span>${state.muted ? "取消靜音" : "靜音"}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  $("#micBtn").addEventListener("click", toggleMic);
  $("#muteBtn").addEventListener("click", toggleMute);
  drawIdleWave();
  syncIcons();
}

function joinRoom(roomId) {
  state.currentRoomId = roomId;
  renderRooms($("#globalSearch").value);
  renderRoomStage();
  renderMultiplayerPanel();
  syncRealtime("heartbeat");
  const room = roomById(roomId);
  $("#statusText").textContent = `你正在 ${room.title}`;
  showToast(`已切換到「${room.title}」`);
}

function profileCompletion() {
  const checks = [
    userProfile.photo,
    userProfile.name,
    userProfile.age,
    userProfile.occupation,
    userProfile.height,
    userProfile.education,
    userProfile.bio.length >= 24,
    userProfile.interests.length >= 3,
    userProfile.verifications.phone,
    userProfile.verifications.email,
    userProfile.verifications.selfie,
    userProfile.verifications.id,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function verificationTrustScore() {
  return Object.values(userProfile.verifications).filter(Boolean).length * 25;
}

function sharedInterestCount(profile) {
  return profile.tags.filter((tag) => userProfile.interests.includes(tag)).length;
}

function matchQualitySignals(profile) {
  const shared = sharedInterestCount(profile);
  const trust = verificationTrustScore();
  const intentAligned = userProfile.bio.includes("穩定") || profile.goal.includes("穩定");
  return [
    {
      label: "共同興趣",
      score: Math.min(98, 58 + shared * 18),
      detail: shared ? `有 ${shared} 個共同興趣：${profile.tags.filter((tag) => userProfile.interests.includes(tag)).join("、")}` : "可先用房間或遊戲建立共同話題",
    },
    {
      label: "信任安全",
      score: Math.min(100, trust + (profile.verified.includes("照片") ? 12 : 6)),
      detail: `${profile.verified}，你的驗證完成度 ${trust}%`,
    },
    {
      label: "關係目標",
      score: intentAligned ? 92 : 76,
      detail: `${profile.name} 目前偏向「${profile.goal}」，適合先確認期待`,
    },
    {
      label: "互動節奏",
      score: profile.online ? 89 : 78,
      detail: `${profile.chatStyle}，建議前 3 則訊息一問一分享`,
    },
  ];
}

function syncProfileMini() {
  const image = $(".profile-mini img");
  const name = $(".profile-mini strong");
  const status = $(".profile-mini span");
  if (image) image.src = userProfile.photo;
  if (image) image.alt = `${userProfile.name} 的個人照片`;
  if (name) name.textContent = userProfile.name;
  if (status) status.textContent = `${userProfile.city} · 線上`;
}

function updateProfileCompletion() {
  const completion = profileCompletion();
  const text = $("#profileCompletionText");
  const bar = $("#profileCompletionBar");
  if (text) text.textContent = `${completion}%`;
  if (bar) bar.style.width = `${completion}%`;
}

function renderProfileEditor() {
  const completion = profileCompletion();
  $("#profileEditor").innerHTML = `
    <div class="panel-title">
      <i data-lucide="id-card"></i>
      <h3>資料編輯</h3>
    </div>
    <div class="profile-upload-row">
      <img src="${escapeHtml(userProfile.photo)}" alt="${escapeHtml(userProfile.name)} 的預覽照片" />
      <div>
        <strong>${escapeHtml(userProfile.name)}</strong>
        <span>${escapeHtml(userProfile.city)} · ${escapeHtml(userProfile.occupation)}</span>
      </div>
      <label class="ghost-action upload-action" for="photoUpload">
        <i data-lucide="image-plus"></i>
        <span>上傳照片</span>
        <input id="photoUpload" type="file" accept="image/*" />
      </label>
    </div>
    <div class="completion-card">
      <div>
        <span>檔案完成度</span>
        <strong id="profileCompletionText">${completion}%</strong>
      </div>
      <div class="progress-track"><span id="profileCompletionBar" style="width: ${completion}%"></span></div>
    </div>
    <div class="profile-form-grid">
      <label>
        <span>暱稱</span>
        <input data-profile-field="name" value="${escapeHtml(userProfile.name)}" />
      </label>
      <label>
        <span>年齡</span>
        <input data-profile-field="age" type="number" min="18" max="80" value="${userProfile.age}" />
      </label>
      <label>
        <span>城市</span>
        <select data-profile-field="city">
          ${["台北", "新北", "桃園", "台中", "高雄"].map((city) => `<option ${city === userProfile.city ? "selected" : ""}>${city}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>職業</span>
        <input data-profile-field="occupation" value="${escapeHtml(userProfile.occupation)}" />
      </label>
      <label>
        <span>身高</span>
        <input data-profile-field="height" type="number" min="120" max="230" value="${userProfile.height}" />
      </label>
      <label>
        <span>學歷</span>
        <select data-profile-field="education">
          ${["高中", "專科", "大學", "研究所", "博士"].map((item) => `<option ${item === userProfile.education ? "selected" : ""}>${item}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>星座</span>
        <select data-profile-field="zodiac">
          ${["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"].map((item) => `<option ${item === userProfile.zodiac ? "selected" : ""}>${item}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>交友偏好</span>
        <select data-profile-field="genderPreference">
          ${["不限", "女性", "男性"].map((item) => `<option ${item === userProfile.genderPreference ? "selected" : ""}>${item}</option>`).join("")}
        </select>
      </label>
      <label>
        <span>年齡下限</span>
        <input data-profile-field="ageMin" type="number" min="18" max="80" value="${userProfile.ageMin}" />
      </label>
      <label>
        <span>年齡上限</span>
        <input data-profile-field="ageMax" type="number" min="18" max="80" value="${userProfile.ageMax}" />
      </label>
      <label>
        <span>距離上限 km</span>
        <input data-profile-field="distanceMax" type="number" min="1" max="200" value="${userProfile.distanceMax}" />
      </label>
      <label>
        <span>生活習慣</span>
        <select data-profile-field="smoking">
          ${["不抽菸", "偶爾", "會抽菸"].map((item) => `<option ${item === userProfile.smoking ? "selected" : ""}>${item}</option>`).join("")}
        </select>
      </label>
      <label class="full">
        <span>興趣愛好</span>
        <input data-profile-field="interests" value="${escapeHtml(userProfile.interests.join("、"))}" />
      </label>
      <label class="full">
        <span>自我介紹</span>
        <textarea data-profile-field="bio" rows="5">${escapeHtml(userProfile.bio)}</textarea>
      </label>
    </div>
    <label class="switch-row">
      <input data-profile-field="visibility" type="checkbox" ${userProfile.visibility ? "checked" : ""} />
      <span>讓我的檔案出現在推薦、附近的人與動態互動中</span>
    </label>
  `;

  $("#photoUpload").addEventListener("change", handlePhotoUpload);
  $$("#profileEditor [data-profile-field]").forEach((field) => {
    field.addEventListener("input", updateUserProfileFromField);
    field.addEventListener("change", updateUserProfileFromField);
  });

  renderProfilePreview();
  syncIcons();
}

function updateUserProfileFromField(event) {
  const field = event.target.dataset.profileField;
  if (field === "interests") {
    userProfile.interests = event.target.value
      .split(/[、,，]/)
      .map((item) => item.trim())
      .filter(Boolean);
  } else if (field === "visibility") {
    userProfile.visibility = event.target.checked;
  } else if (event.target.type === "number") {
    userProfile[field] = Number(event.target.value);
  } else {
    userProfile[field] = event.target.value;
  }
  syncProfileMini();
  updateProfileCompletion();
  renderProfilePreview();
  scheduleSave();
}

function handlePhotoUpload(event) {
  const [file] = event.target.files || [];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    userProfile.photo = reader.result;
    syncProfileMini();
    renderProfileEditor();
    scheduleSave();
    showToast("照片已更新");
  });
  reader.readAsDataURL(file);
}

function renderProfilePreview() {
  const trustScore = Object.values(userProfile.verifications).filter(Boolean).length * 25;
  $("#profilePreview").innerHTML = `
    <div class="preview-card">
      <img src="${escapeHtml(userProfile.photo)}" alt="${escapeHtml(userProfile.name)} 的個人卡片" />
      <div class="preview-body">
        <p class="eyebrow">${escapeHtml(userProfile.city)} · ${escapeHtml(userProfile.zodiac)}</p>
        <h3>${escapeHtml(userProfile.name)}, ${userProfile.age}</h3>
        <p>${escapeHtml(userProfile.bio)}</p>
        <div class="profile-tags">
          ${userProfile.interests.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
        </div>
        <div class="profile-stats">
          <div class="stat"><span>身高</span><strong>${userProfile.height} cm</strong></div>
          <div class="stat"><span>學歷</span><strong>${escapeHtml(userProfile.education)}</strong></div>
          <div class="stat"><span>信任度</span><strong>${trustScore}%</strong></div>
        </div>
      </div>
    </div>
    <div class="verification-strip">
      ${[
        ["phone", "手機"],
        ["email", "Email"],
        ["selfie", "自拍"],
        ["id", "身分證"],
      ]
        .map(
          ([key, label]) => `
            <span class="${userProfile.verifications[key] ? "is-done" : ""}">
              <i data-lucide="${userProfile.verifications[key] ? "badge-check" : "circle"}"></i>
              ${label}
            </span>
          `,
        )
        .join("")}
    </div>
  `;
  syncIcons();
}

async function toggleMic() {
  if (state.micOn) {
    await stopMic();
    syncRealtime("voice-leave", voicePayload());
    showToast("已離開語音");
    renderRoomStage();
    renderMultiplayerPanel();
    return;
  }

  if (!window.isSecureContext) {
    showToast("IP 模式可多人聊天、配對與遊戲；麥克風需 HTTPS，請用 Vercel 連結或 HTTPS tunnel。");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.micStream = stream;
    state.audioContext = new AudioContext();
    const source = state.audioContext.createMediaStreamSource(stream);
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 64;
    source.connect(state.analyser);
    state.micOn = true;
    state.muted = false;
    await ensureVoiceRoom();
    renderRoomStage();
    renderMultiplayerPanel();
    startWave();
    startVoicePresenceLoop();
    showToast("已加入語音房，其他裝置輸入同房號即可通話");
  } catch (error) {
    await stopMic();
    showToast("語音房初始化失敗，請確認麥克風權限或稍後再試");
  }
}

async function stopMic(options = {}) {
  const skipVoiceLeave = options.skipVoiceLeave === true;
  if (!skipVoiceLeave) {
    await teardownVoiceRoom();
  }
  if (state.micStream) {
    state.micStream.getTracks().forEach((track) => track.stop());
  }
  if (state.audioContext) {
    state.audioContext.close();
  }
  window.clearInterval(state.waveTimer);
  stopVoicePresenceLoop();
  state.micOn = false;
  state.muted = false;
  state.voiceLevel = 0;
  state.micStream = null;
  state.audioContext = null;
  state.analyser = null;
  renderMultiplayerPanel();
}

function toggleMute() {
  if (!state.micStream) return;
  state.muted = !state.muted;
  state.micStream.getAudioTracks().forEach((track) => {
    track.enabled = !state.muted;
  });
  renderRoomStage();
  renderMultiplayerPanel();
  publishVoiceState("voice-update");
  if (state.micOn) startWave();
  showToast(state.muted ? "已靜音" : "已恢復收音");
}

function drawIdleWave() {
  const bars = $$("#waveform span");
  bars.forEach((bar, index) => {
    const height = 8 + ((index * 7) % 24);
    bar.style.height = `${height}px`;
    bar.style.opacity = state.micOn ? "1" : "0.45";
  });
}

function startWave() {
  window.clearInterval(state.waveTimer);
  state.waveTimer = window.setInterval(() => {
    const bars = $$("#waveform span");
    if (!state.analyser || state.muted) {
      state.voiceLevel = 0;
      drawIdleWave();
      return;
    }
    const data = new Uint8Array(state.analyser.frequencyBinCount);
    state.analyser.getByteFrequencyData(data);
    const average = data.reduce((sum, value) => sum + value, 0) / Math.max(1, data.length);
    state.voiceLevel = Math.round(Math.max(0, Math.min(100, average / 2.55)));
    bars.forEach((bar, index) => {
      const value = data[index % data.length] || 8;
      bar.style.height = `${Math.max(8, Math.min(48, value / 3))}px`;
      bar.style.opacity = "1";
    });
  }, 120);
}

function renderProfileCard() {
  const profile = people[state.profileIndex % people.length];
  $("#currentScore").textContent = `${profile.score}%`;
  $("#profileCard").innerHTML = `
    <div class="profile-photo" style="background-image: url('${profile.img}')">
      <div class="profile-badge">
        <i data-lucide="badge-check"></i>
        <span>${profile.verified}</span>
      </div>
    </div>
    <div class="profile-info">
      <div>
        <p class="eyebrow">${profile.city} · ${profile.mood}</p>
        <h3>${profile.name}, ${profile.age}</h3>
      </div>
      <p>${profile.bio}</p>
      <div class="profile-tags">
        ${profile.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <div class="profile-stats">
        <div class="stat"><span>相似度</span><strong>${profile.score}%</strong></div>
        <div class="stat"><span>回覆率</span><strong>${86 + (state.profileIndex % 8)}%</strong></div>
        <div class="stat"><span>距離</span><strong>${2 + state.profileIndex} km</strong></div>
      </div>
      <div class="profile-actions">
        <button class="pass-btn" type="button" id="passBtn">
          <i data-lucide="x"></i>
          <span>略過</span>
        </button>
        <button class="super-btn" type="button" id="superBtn">
          <i data-lucide="star"></i>
          <span>超喜歡 ${state.superLikes}</span>
        </button>
        <button class="like-btn" type="button" id="likeBtn">
          <i data-lucide="heart"></i>
          <span>喜歡</span>
        </button>
      </div>
    </div>
  `;

  $("#passBtn").addEventListener("click", () => nextProfile("已略過"));
  $("#superBtn").addEventListener("click", () => likeProfile(true));
  $("#likeBtn").addEventListener("click", () => likeProfile(false));
  renderInsights(profile);
  renderMarketBreaker(profile);
  syncIcons();
}

function renderInsights(profile) {
  const insights = [
    ["共同興趣", profile.tags.slice(0, 2).join("、")],
    ["推薦開場", `問 ${profile.name} 最近最喜歡的${profile.tags[0]}`],
    ["適合房間", rooms.find((room) => room.tags.some((tag) => profile.tags.includes(tag)))?.title || rooms[0].title],
  ];

  $("#insightList").innerHTML = insights
    .map(
      ([title, value]) => `
        <div class="insight-item">
          <strong>${title}</strong>
          <span>${value}</span>
        </div>
      `,
    )
    .join("");
}

function renderMarketBreaker(profile) {
  const signals = matchQualitySignals(profile);
  const average = Math.round(signals.reduce((sum, signal) => sum + signal.score, 0) / signals.length);
  const nextRoom = rooms.find((room) => room.tags.some((tag) => profile.tags.includes(tag))) || rooms[0];

  $("#marketBreakerPanel").innerHTML = `
    <div class="panel-title compact-title">
      <i data-lucide="scan-heart"></i>
      <h3>品質配對雷達</h3>
    </div>
    <div class="quality-score">
      <span>深度適合度</span>
      <strong>${average}%</strong>
    </div>
    <div class="quality-signal-list">
      ${signals
        .map(
          (signal) => `
            <article>
              <div>
                <strong>${signal.label}</strong>
                <span>${signal.score}%</span>
              </div>
              <meter min="0" max="100" value="${signal.score}"></meter>
              <p>${signal.detail}</p>
            </article>
          `,
        )
        .join("")}
    </div>
    <div class="next-best-action">
      <i data-lucide="route"></i>
      <div>
        <strong>下一步建議</strong>
        <span>先邀請 ${profile.name} 到「${nextRoom.title}」，再用 AI 開場白降低尷尬。</span>
      </div>
    </div>
  `;
}

function renderOptions(options, selected) {
  return options.map((option) => `<option ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

function allInterests() {
  return [...new Set(people.flatMap((person) => person.tags).concat(userProfile.interests))];
}

function matchesDiscoverFilters(person) {
  const filters = state.discoverFilters;
  const search = state.globalSearch.trim().toLowerCase();
  const searchable = [
    person.name,
    person.city,
    person.occupation,
    person.zodiac,
    person.education,
    person.goal,
    person.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return (
    (!search || searchable.includes(search)) &&
    (filters.city === "全部" || person.city === filters.city) &&
    person.age >= filters.ageMin &&
    person.age <= filters.ageMax &&
    person.height >= filters.heightMin &&
    person.height <= filters.heightMax &&
    (filters.zodiac === "全部" || person.zodiac === filters.zodiac) &&
    (filters.education === "全部" || person.education === filters.education) &&
    (filters.smoking === "不限" || person.smoking === filters.smoking) &&
    (filters.drinking === "不限" || person.drinking === filters.drinking) &&
    (filters.goal === "全部" || person.goal === filters.goal) &&
    (filters.interest === "全部" || person.tags.includes(filters.interest))
  );
}

function renderExplore() {
  const filters = state.discoverFilters;
  $("#discoverFilters").innerHTML = `
    <div class="panel-title">
      <i data-lucide="sliders-horizontal"></i>
      <h3>篩選條件</h3>
    </div>
    <div class="filter-grid">
      <label>
        <span>地區</span>
        <select data-filter="city">${renderOptions(["全部", "台北", "新北", "桃園", "台中"], filters.city)}</select>
      </label>
      <label>
        <span>年齡下限</span>
        <input data-filter="ageMin" type="number" min="18" max="80" value="${filters.ageMin}" />
      </label>
      <label>
        <span>年齡上限</span>
        <input data-filter="ageMax" type="number" min="18" max="80" value="${filters.ageMax}" />
      </label>
      <label>
        <span>身高下限</span>
        <input data-filter="heightMin" type="number" min="120" max="230" value="${filters.heightMin}" />
      </label>
      <label>
        <span>身高上限</span>
        <input data-filter="heightMax" type="number" min="120" max="230" value="${filters.heightMax}" />
      </label>
      <label>
        <span>星座</span>
        <select data-filter="zodiac">${renderOptions(["全部", "牡羊座", "雙魚座", "處女座", "天秤座"], filters.zodiac)}</select>
      </label>
      <label>
        <span>學歷</span>
        <select data-filter="education">${renderOptions(["全部", "專科", "大學", "研究所"], filters.education)}</select>
      </label>
      <label>
        <span>交往目標</span>
        <select data-filter="goal">${renderOptions(["全部", "自然認識", "先從朋友", "穩定交往", "認真交往"], filters.goal)}</select>
      </label>
      <label>
        <span>抽菸</span>
        <select data-filter="smoking">${renderOptions(["不限", "不抽菸", "偶爾", "會抽菸"], filters.smoking)}</select>
      </label>
      <label>
        <span>喝酒</span>
        <select data-filter="drinking">${renderOptions(["不限", "不喝酒", "偶爾小酌", "社交場合"], filters.drinking)}</select>
      </label>
      <label class="full">
        <span>興趣</span>
        <select data-filter="interest">${renderOptions(["全部", ...allInterests()], filters.interest)}</select>
      </label>
    </div>
    <div class="filter-note">
      <i data-lucide="sparkles"></i>
      <span>搜尋欄可同時找暱稱、職業、城市與興趣。</span>
    </div>
  `;

  $$("#discoverFilters [data-filter]").forEach((control) => {
    control.addEventListener("input", updateDiscoverFilter);
    control.addEventListener("change", updateDiscoverFilter);
  });
  renderDiscoverResults();
  syncIcons();
}

function updateDiscoverFilter(event) {
  const field = event.target.dataset.filter;
  state.discoverFilters[field] = event.target.type === "number" ? Number(event.target.value) : event.target.value;
  renderDiscoverResults();
  scheduleSave();
}

function renderDiscoverResults() {
  const results = people.filter(matchesDiscoverFilters).sort((a, b) => b.score - a.score);
  $("#discoverResults").innerHTML = `
    <div class="result-toolbar">
      <div>
        <strong>${results.length} 位符合條件</strong>
        <span>${state.globalSearch ? `搜尋：${escapeHtml(state.globalSearch)}` : "依相似度排序"}</span>
      </div>
      <span class="tag gold">AI 已排序</span>
    </div>
    <div class="discover-grid">
      ${
        results.length
          ? results
              .map(
                (person) => `
                  <article class="discover-card">
                    <img src="${escapeHtml(person.img)}" alt="${escapeHtml(person.name)}" />
                    <div class="discover-card-body">
                      <div class="discover-card-title">
                        <div>
                          <p class="eyebrow">${escapeHtml(person.city)} · ${escapeHtml(person.occupation)}</p>
                          <h3>${escapeHtml(person.name)}, ${person.age}</h3>
                        </div>
                        <strong>${person.score}%</strong>
                      </div>
                      <p>${escapeHtml(person.bio)}</p>
                      <div class="fact-row">
                        <span>${person.height} cm</span>
                        <span>${escapeHtml(person.education)}</span>
                        <span>${escapeHtml(person.zodiac)}</span>
                        <span>${person.distance} km</span>
                      </div>
                      <div class="profile-tags">
                        ${person.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
                      </div>
                      <div class="discover-actions">
                        <button class="ghost-action" type="button" data-discover-action="chat" data-person="${person.id}">
                          <i data-lucide="message-circle"></i>
                          <span>打招呼</span>
                        </button>
                        <button class="ghost-action" type="button" data-discover-action="super" data-person="${person.id}">
                          <i data-lucide="star"></i>
                          <span>超喜歡</span>
                        </button>
                        <button class="primary-action" type="button" data-discover-action="like" data-person="${person.id}">
                          <i data-lucide="heart"></i>
                          <span>喜歡</span>
                        </button>
                      </div>
                    </div>
                  </article>
                `,
              )
              .join("")
          : `<div class="empty-state"><i data-lucide="search-x"></i><strong>沒有符合條件的人</strong><span>放寬年齡、距離或興趣條件再試一次。</span></div>`
      }
    </div>
  `;

  $$("[data-discover-action]").forEach((button) => {
    button.addEventListener("click", () => handleDiscoverAction(button.dataset.discoverAction, button.dataset.person));
  });
  syncIcons();
}

function handleDiscoverAction(action, personId) {
  const person = personById(personId);
  if (action === "chat") {
    startConversationWith(personId, `嗨 ${person.name}，我也對${person.tags[0]}很有興趣。`);
    return;
  }
  if (action === "super") {
    sendSuperLike(personId);
    return;
  }
  showToast(`已喜歡 ${person.name}，如果對方也喜歡你就會配對成功`);
}

function startConversationWith(personId, starter) {
  const person = personById(personId);
  const conversationId = `${person.id}-chat`;
  let conversation = conversations.find((item) => item.id === conversationId);
  if (!conversation) {
    conversation = {
      id: conversationId,
      type: "match",
      title: person.name,
      subtitle: `相似度 ${person.score}% · ${person.distance} km`,
      img: person.img,
      unread: 0,
      messages: [
        {
          from: person.name,
          time: currentTime(),
          text: `我們有 ${person.tags.slice(0, 2).join("、")} 的共同話題，可以慢慢聊。`,
        },
      ],
    };
    conversations.unshift(conversation);
  }
  if (starter) {
    conversation.messages.push({ from: "Frank", time: currentTime(), text: starter });
  }
  state.activeConversationId = conversationId;
  setView("chat");
  scheduleSave();
  showToast(`已開啟和 ${person.name} 的聊天室`);
}

function sendSuperLike(personId) {
  const person = personById(personId);
  if (state.superLikes <= 0) {
    showToast("今天的超級喜歡已用完，可到 AI/VIP 補充");
    return;
  }
  state.superLikes -= 1;
  startConversationWith(personId, `我送出超級喜歡，想先從你的${person.tags[0]}故事聽起。`);
}

function activeMinutes(person) {
  if (person.online || person.lastActive === "線上") return 0;
  const match = person.lastActive.match(/\d+/);
  if (!match) return 999;
  return person.lastActive.includes("小時") ? Number(match[0]) * 60 : Number(match[0]);
}

function nearbyPeople() {
  const sorted = [...people];
  if (state.nearbyMode === "online") {
    sorted.sort((a, b) => Number(b.online) - Number(a.online) || a.distance - b.distance);
  } else if (state.nearbyMode === "activity") {
    sorted.sort((a, b) => activeMinutes(a) - activeMinutes(b));
  } else {
    sorted.sort((a, b) => a.distance - b.distance);
  }
  return sorted;
}

function renderNearby() {
  const sorted = nearbyPeople();
  const positions = [
    ["54%", "45%"],
    ["38%", "62%"],
    ["68%", "32%"],
    ["61%", "72%"],
  ];

  $$("[data-nearby-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.nearbyMode === state.nearbyMode);
  });

  $("#nearbyMap").innerHTML = `
    <div class="nearby-rings" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="map-center">
      <img src="${escapeHtml(userProfile.photo)}" alt="${escapeHtml(userProfile.name)}" />
      <strong>你</strong>
    </div>
    ${sorted
      .map((person, index) => {
        const [left, top] = positions[index % positions.length];
        return `
          <button class="map-pin ${person.online ? "is-online" : ""}" style="left: ${left}; top: ${top}" type="button" data-map-person="${person.id}">
            <img src="${escapeHtml(person.img)}" alt="${escapeHtml(person.name)}" />
            <span>${person.distance} km</span>
          </button>
        `;
      })
      .join("")}
    <div class="map-caption">
      <strong>${sorted.filter((person) => person.online).length} 人在線</strong>
      <span>距離根據示範資料模擬</span>
    </div>
  `;

  $("#nearbyList").innerHTML = `
    <div class="panel-title">
      <i data-lucide="map-pin"></i>
      <h3>附近推薦</h3>
    </div>
    <div class="nearby-cards">
      ${sorted
        .map(
          (person) => `
            <article class="nearby-card">
              <img src="${escapeHtml(person.img)}" alt="${escapeHtml(person.name)}" />
              <div>
                <div class="nearby-card-head">
                  <strong>${escapeHtml(person.name)}, ${person.age}</strong>
                  <span class="${person.online ? "online-text" : ""}">${escapeHtml(person.online ? "線上" : person.lastActive)}</span>
                </div>
                <p>${escapeHtml(person.city)} · ${person.distance} km · ${escapeHtml(person.goal)}</p>
                <div class="profile-tags">
                  ${person.tags.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
                </div>
                <div class="nearby-actions">
                  <button class="ghost-action" type="button" data-nearby-action="wave" data-person="${person.id}">
                    <i data-lucide="hand"></i>
                    <span>打招呼</span>
                  </button>
                  <button class="primary-action" type="button" data-nearby-action="voice" data-person="${person.id}">
                    <i data-lucide="mic-2"></i>
                    <span>邀請語音</span>
                  </button>
                </div>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;

  $$("[data-map-person]").forEach((button) => {
    button.addEventListener("click", () => {
      const person = personById(button.dataset.mapPerson);
      showToast(`${person.name} 距離你 ${person.distance} km，最近狀態：${person.online ? "線上" : person.lastActive}`);
    });
  });
  $$("[data-nearby-action]").forEach((button) => {
    button.addEventListener("click", () => handleNearbyAction(button.dataset.nearbyAction, button.dataset.person));
  });
  syncIcons();
}

function handleNearbyAction(action, personId) {
  const person = personById(personId);
  if (action === "voice") {
    startConversationWith(personId, `看到你也在附近，要不要先用語音聊 5 分鐘？`);
    return;
  }
  startConversationWith(personId, `嗨 ${person.name}，我們離得滿近，也都有${person.tags[0]}這個興趣。`);
}

function likeProfile(isSuper) {
  const profile = people[state.profileIndex % people.length];
  if (isSuper && state.superLikes <= 0) {
    showToast("今天的超級喜歡已用完，可到 AI/VIP 補充");
    return;
  }
  if (isSuper) {
    state.superLikes -= 1;
  }
  const conversationId = `${profile.id}-chat`;
  if (!conversations.some((conversation) => conversation.id === conversationId)) {
    conversations.unshift({
      id: conversationId,
      type: "match",
      title: profile.name,
      subtitle: `相似度 ${profile.score}%`,
      img: profile.img,
      unread: 1,
      messages: [
        {
          from: profile.name,
          time: currentTime(),
          text: isSuper ? "你的超喜歡我收到了，先從一題破冰開始？" : "我們配對成功了，想從咖啡還是電影聊起？",
        },
      ],
    });
  }
  showToast(`${isSuper ? "超喜歡" : "配對"}成功，已建立聊天室`);
  state.activeConversationId = conversationId;
  scheduleSave();
  nextProfile();
}

function nextProfile(message) {
  state.profileIndex += 1;
  renderProfileCard();
  if (message) showToast(message);
}

function renderChat() {
  const conversations = liveConversationItems();
  if (!conversations.length) {
    $("#conversationList").innerHTML = "";
    $("#chatHeader").innerHTML = `
      <div class="chat-person">
        <img src="${userProfile.photo}" alt="${userProfile.name}" />
        <div>
          <strong>真人聊天室</strong>
          <span>先進入同房並完成配對</span>
        </div>
      </div>
    `;
    $("#messageList").innerHTML = `<article class="message"><div class="message-meta"><strong>系統</strong><span>${currentTime()}</span></div><p>到「真人多人互動房」邀請或接受配對後，這裡就會變成真人即時聊天。</p></article>`;
    syncIcons();
    return;
  }
  if (!conversations.some((conversation) => conversation.id === state.activeConversationId)) {
    state.activeConversationId = conversations[0].id;
  }
  $("#conversationList").innerHTML = conversations
    .map(
      (conversation) => `
        <button class="conversation-item ${conversation.id === state.activeConversationId ? "is-active" : ""}" type="button" data-conversation="${conversation.id}">
          <img src="${conversation.img}" alt="${conversation.title}" />
          <div class="conversation-copy">
            <strong>${conversation.title}</strong>
            <span>${conversation.subtitle}</span>
            <p>${conversation.messages.at(-1)?.text || ""}</p>
          </div>
          ${conversation.unread ? `<span class="unread-pill">${conversation.unread}</span>` : ""}
        </button>
      `,
    )
    .join("");

  $$("[data-conversation]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeConversationId = button.dataset.conversation;
      renderChat();
    });
  });

  const active = conversations.find((conversation) => conversation.id === state.activeConversationId) || conversations[0];
  $("#chatHeader").innerHTML = `
    <div class="chat-person">
      <img src="${active.img}" alt="${active.title}" />
      <div>
        <strong>${active.title}</strong>
        <span>${active.subtitle}</span>
      </div>
    </div>
    <button class="ghost-action" type="button">
      <i data-lucide="${active.type === "room" ? "radio" : "phone"}"></i>
      <span>${active.type === "room" ? "房內共享" : "配對私訊"}</span>
    </button>
  `;

  $("#messageList").innerHTML = active.messages.length
    ? active.messages
        .map(
          (message) => `
            <article class="message ${message.mine ? "mine" : ""}">
              <div class="message-meta">
                <strong>${message.from}</strong>
                <span>${message.time}</span>
              </div>
              <p>${message.text}</p>
            </article>
          `,
        )
        .join("")
    : `<article class="message"><div class="message-meta"><strong>系統</strong><span>${currentTime()}</span></div><p>${active.type === "room" ? "這裡會顯示房內所有人共享訊息。" : "這裡會顯示你和配對對象的私訊內容。"}</p></article>`;
  $("#messageList").scrollTop = $("#messageList").scrollHeight;
  const input = $("#chatInput");
  if (input) {
    input.placeholder = active.type === "room" ? "輸入房內共享訊息" : `傳訊息給 ${active.title}`;
  }
  syncIcons();
}

async function sendMessage(text) {
  const active = liveConversationItems().find((conversation) => conversation.id === state.activeConversationId);
  const value = String(text || "").trim();
  if (!active || !value) return;
  if (active.type === "room") {
    await sendLiveMessage(value);
    return;
  }
  if (!active.peerSessionId || !active.matchId) {
    showToast("這個聊天室還沒完成真人配對。");
    return;
  }
  await syncRealtime("message", { text: value, toSessionId: active.peerSessionId, matchId: active.matchId });
}

function momentAuthor(moment) {
  if (moment.authorId === "me") {
    return {
      id: "me",
      name: userProfile.name,
      img: userProfile.photo,
      city: userProfile.city,
      tags: userProfile.interests,
    };
  }
  return personById(moment.authorId);
}

function renderMoments() {
  const search = state.globalSearch.trim().toLowerCase();
  const visible = moments.filter((moment) => {
    const author = momentAuthor(moment);
    const content = `${moment.text} ${moment.tag} ${author.name} ${author.city} ${author.tags.join(" ")}`.toLowerCase();
    return (state.momentFilter === "全部" || moment.tag === state.momentFilter) && (!search || content.includes(search));
  });

  $$("[data-moment-filter]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.momentFilter === state.momentFilter);
  });

  $("#momentsFeed").innerHTML = visible.length
    ? visible
        .map((moment) => {
          const author = momentAuthor(moment);
          return `
            <article class="moment-card">
              <div class="moment-head">
                <img src="${escapeHtml(author.img)}" alt="${escapeHtml(author.name)}" />
                <div>
                  <strong>${escapeHtml(author.name)}</strong>
                  <span>${escapeHtml(author.city)} · ${escapeHtml(moment.time)}</span>
                </div>
                <span class="tag gold">${escapeHtml(moment.tag)}</span>
              </div>
              <p>${escapeHtml(moment.text)}</p>
              ${moment.img ? `<img class="moment-photo" src="${escapeHtml(moment.img)}" alt="${escapeHtml(author.name)} 的動態照片" />` : ""}
              <div class="moment-comments">
                ${moment.comments.map((comment) => `<span>${escapeHtml(comment)}</span>`).join("") || "<span>還沒有留言，成為第一個開話題的人。</span>"}
              </div>
              <div class="moment-actions">
                <button class="ghost-action" type="button" data-moment-action="like" data-moment="${moment.id}">
                  <i data-lucide="heart"></i>
                  <span>${moment.likes}</span>
                </button>
                <button class="ghost-action" type="button" data-moment-action="comment" data-moment="${moment.id}">
                  <i data-lucide="message-circle"></i>
                  <span>留言</span>
                </button>
                ${
                  author.id === "me"
                    ? `<button class="ghost-action" type="button" data-moment-action="boost" data-moment="${moment.id}">
                        <i data-lucide="rocket"></i>
                        <span>推廣</span>
                      </button>`
                    : `<button class="primary-action" type="button" data-moment-action="chat" data-moment="${moment.id}">
                        <i data-lucide="send"></i>
                        <span>聊這篇</span>
                      </button>`
                }
              </div>
            </article>
          `;
        })
        .join("")
    : `<div class="empty-state"><i data-lucide="image-off"></i><strong>沒有符合條件的動態</strong><span>切換分類或清除搜尋即可看見更多貼文。</span></div>`;

  $$("[data-moment-action]").forEach((button) => {
    button.addEventListener("click", () => handleMomentAction(button.dataset.momentAction, button.dataset.moment));
  });
  syncIcons();
}

function handleMomentAction(action, momentId) {
  const moment = moments.find((item) => item.id === momentId);
  if (!moment) return;
  const author = momentAuthor(moment);
  if (action === "like") {
    moment.likes += 1;
    renderMoments();
    scheduleSave();
    showToast("已按讚這則動態");
    return;
  }
  if (action === "comment") {
    moment.comments.push(`${userProfile.name}：這個話題我想多聽一點`);
    renderMoments();
    scheduleSave();
    showToast("已新增一則留言");
    return;
  }
  if (action === "boost") {
    startBoost();
    setView("ai");
    return;
  }
  startConversationWith(author.id, `我看到你的動態：「${moment.text.slice(0, 22)}...」想接著聊。`);
}

function handleMomentSubmit(event) {
  event.preventDefault();
  const text = $("#momentText").value.trim();
  const tag = $("#momentTag").value;
  const img = $("#momentImageUrl").value.trim();
  if (!text) {
    showToast("先寫一段動態內容再發布");
    return;
  }
  moments.unshift({
    id: `moment-${Date.now()}`,
    authorId: "me",
    tag,
    time: "剛剛",
    text,
    img,
    likes: 0,
    comments: [],
  });
  $("#momentForm").reset();
  state.momentFilter = "全部";
  renderMoments();
  scheduleSave();
  showToast("動態已發布");
}

function currentTime() {
  return new Intl.DateTimeFormat("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function boostIsActive() {
  return Boolean(state.boostEndsAt && Date.now() < state.boostEndsAt);
}

function boostRemainingText() {
  if (!boostIsActive()) return "未啟動";
  const minutes = Math.max(1, Math.ceil((state.boostEndsAt - Date.now()) / 60000));
  return `${minutes} 分鐘`;
}

function aiAdviceFor(person) {
  const trust = verificationTrustScore();
  const shared = person.tags.filter((tag) => userProfile.interests.includes(tag));
  return {
    opener: `看到你也喜歡${person.tags[0]}，我很好奇你最近一次因為這件事覺得生活變亮是什麼時候？`,
    plan: `${person.dateIdea}。建議先約 60 到 90 分鐘，保留彼此想再見面的空間。`,
    rhythm: `${person.chatStyle}。前 3 則訊息可以用一問一分享，避免像面試。`,
    safety: `${person.verified}，距離 ${person.distance} km。第一次見面建議選白天、人多、可自行離開的地點。`,
    checkin: `出門前把地點、時間與對方暱稱分享給信任的人；約會開始後 ${trust >= 75 ? "60" : "30"} 分鐘做一次安全確認。`,
    why: shared.length
      ? `你們可從「${shared.join("、")}」切入，這比外貌滑卡更容易產生持續聊天。`
      : `先用多人房間或破冰遊戲建立低壓共同經驗，再轉一對一聊天。`,
    nextStep: trust >= 75 ? "可進入一對一約會提案" : "先完成自拍或身分驗證，提高推薦權重",
  };
}

function renderAiBoost() {
  const target = personById(state.aiTargetId);
  const advice = aiAdviceFor(target);
  const active = boostIsActive();
  $("#aiCoachPanel").innerHTML = `
    <div class="panel-title">
      <i data-lucide="bot"></i>
      <h3>AI 配對建議</h3>
    </div>
    <div class="ai-target-row">
      <img src="${escapeHtml(target.img)}" alt="${escapeHtml(target.name)}" />
      <label>
        <span>分析對象</span>
        <select id="aiTargetSelect">
          ${people.map((person) => `<option value="${person.id}" ${person.id === target.id ? "selected" : ""}>${escapeHtml(person.name)} · ${person.score}%</option>`).join("")}
        </select>
      </label>
      <strong>${target.score}%</strong>
    </div>
    <div class="ai-advice-grid">
      <article>
        <span>開場白</span>
        <p>${escapeHtml(advice.opener)}</p>
        <button class="ghost-action" type="button" data-ai-action="send-opener">
          <i data-lucide="send"></i>
          <span>送到聊天</span>
        </button>
      </article>
      <article>
        <span>約會提案</span>
        <p>${escapeHtml(advice.plan)}</p>
      </article>
      <article>
        <span>聊天節奏</span>
        <p>${escapeHtml(advice.rhythm)}</p>
      </article>
      <article>
        <span>安全提醒</span>
        <p>${escapeHtml(advice.safety)}</p>
        <button class="ghost-action" type="button" data-ai-action="safety">
          <i data-lucide="shield-check"></i>
          <span>查看安全中心</span>
        </button>
      </article>
    </div>
    <div class="dating-os-panel">
      <div>
        <span class="eyebrow">Relationship OS</span>
        <h4>AI 約會副駕</h4>
        <p>${escapeHtml(advice.why)}</p>
      </div>
      <div class="date-plan-grid">
        <span><i data-lucide="map"></i>${escapeHtml(advice.plan)}</span>
        <span><i data-lucide="message-circle-heart"></i>${escapeHtml(advice.rhythm)}</span>
        <span><i data-lucide="shield-alert"></i>${escapeHtml(advice.checkin)}</span>
        <span><i data-lucide="move-right"></i>${escapeHtml(advice.nextStep)}</span>
      </div>
      <div class="dating-os-actions">
        <button class="primary-action" type="button" data-ai-action="date-plan">
          <i data-lucide="calendar-plus"></i>
          <span>送出約會提案</span>
        </button>
        <button class="ghost-action" type="button" data-ai-action="share-checkin">
          <i data-lucide="shield-check"></i>
          <span>開啟安全計畫</span>
        </button>
      </div>
    </div>
  `;

  $("#boostPanel").innerHTML = `
    <div class="panel-title">
      <i data-lucide="rocket"></i>
      <h3>曝光與額度</h3>
    </div>
    <div class="boost-status ${active ? "is-active" : ""}">
      <span>${active ? "Boost 進行中" : "Boost 未啟動"}</span>
      <strong>${boostRemainingText()}</strong>
      <p>${active ? "你的檔案會優先出現在附近與探索推薦。" : "啟動後 30 分鐘內提高檔案曝光。"}</p>
    </div>
    <div class="boost-stats">
      <div class="stat"><span>今日曝光</span><strong>${state.boostViews}</strong></div>
      <div class="stat"><span>超喜歡</span><strong>${state.superLikes}</strong></div>
      <div class="stat"><span>回覆率</span><strong>87%</strong></div>
    </div>
    <div class="premium-stack">
      <button class="primary-action stretch" type="button" data-ai-action="boost">
        <i data-lucide="rocket"></i>
        <span>${active ? "延長 Boost" : "啟動 Boost"}</span>
      </button>
      <button class="ghost-action stretch" type="button" data-ai-action="super-pack">
        <i data-lucide="star"></i>
        <span>補充 5 個超喜歡</span>
      </button>
      <button class="ghost-action stretch" type="button" data-ai-action="profile-tips">
        <i data-lucide="wand-sparkles"></i>
        <span>最佳化個人檔案</span>
      </button>
    </div>
  `;

  $("#aiTargetSelect").addEventListener("change", (event) => {
    state.aiTargetId = event.target.value;
    renderAiBoost();
  });
  $$("[data-ai-action]").forEach((button) => {
    button.addEventListener("click", () => handleAiAction(button.dataset.aiAction));
  });
  syncIcons();
}

function handleAiAction(action) {
  const target = personById(state.aiTargetId);
  const advice = aiAdviceFor(target);
  if (action === "send-opener") {
    startConversationWith(target.id, advice.opener);
    return;
  }
  if (action === "safety") {
    setView("safety");
    return;
  }
  if (action === "date-plan") {
    startConversationWith(target.id, advice.plan);
    return;
  }
  if (action === "share-checkin") {
    setView("safety");
    showToast("已切換到安全中心，可設定驗證與防騷擾功能");
    return;
  }
  if (action === "boost") {
    startBoost();
    return;
  }
  if (action === "super-pack") {
    state.superLikes += 5;
    renderAiBoost();
    scheduleSave();
    showToast("已補充 5 個超喜歡");
    return;
  }
  setView("profile");
  showToast("可從完成度與驗證狀態開始最佳化");
}

function startBoost() {
  state.boostEndsAt = Date.now() + 30 * 60 * 1000;
  state.boostViews += 96;
  if ($("#boostPanel")) renderAiBoost();
  scheduleSave();
  showToast("Boost 已啟動，接下來 30 分鐘提高曝光");
}

function renderGrowth() {
  const readyCount = launchChecklist.filter((item) => item.done).length;
  const onlineNow = state.dynamicMetrics?.onlineNow || rooms.reduce((sum, room) => sum + room.active, 0) + 128;
  const matchesToday = state.dynamicMetrics?.matchesToday || 64;
  const messagesPerHour = state.dynamicMetrics?.messagesPerHour || 420;
  const completion = profileCompletion();
  const cloudLive = dynamicModeIsLive();
  const platformName = dynamicPlatformLabel();
  $("#growthPanel").innerHTML = `
    <div class="panel-title">
      <i data-lucide="line-chart"></i>
      <h3>產品優化儀表板</h3>
    </div>
    <div class="dynamic-banner ${cloudLive ? "is-live" : ""}">
      <i data-lucide="${cloudLive ? "cloud-check" : "cloud-off"}"></i>
      <div>
        <strong>${cloudLive ? `已連線 ${platformName}` : "使用本機示範資料"}</strong>
        <span>${state.lastSyncAt ? `最後同步 ${new Date(state.lastSyncAt).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })}` : "部署後會自動讀取動態 API"}</span>
      </div>
      <button class="ghost-action" type="button" id="refreshDynamicBtn">
        <i data-lucide="refresh-cw"></i>
        <span>刷新</span>
      </button>
    </div>
    <div class="remote-access-panel">
      <div>
        <span class="eyebrow">Remote Access</span>
        <h3>不同 IP / 不同網路遠端連線</h3>
        <p>不同網路、不同 IP 的真人請使用 Vercel 公開 HTTPS 網址加入同一個房間；只有同 Wi-Fi 測試才使用本機 LAN IP。聊天、配對與遊戲會透過雲端 API 同步。</p>
      </div>
      <div class="remote-url-box">
        <input id="remoteUrlInput" value="${escapeHtml(crossIpJoinUrl())}" readonly />
        <button class="primary-action" type="button" id="copyRemoteUrlBtn">
          <i data-lucide="copy"></i>
          <span>複製不同 IP 連結</span>
        </button>
      </div>
      <div class="device-support-grid">
        <span><i data-lucide="smartphone"></i>手機版</span>
        <span><i data-lucide="monitor"></i>電腦版</span>
        <span><i data-lucide="globe-2"></i>不同 IP</span>
        <span><i data-lucide="wifi"></i>雲端 API</span>
      </div>
    </div>
    <div class="growth-metrics">
      <div class="metric-card">
        <span>模擬在線人數</span>
        <strong>${onlineNow}</strong>
        <p>由伺服器端 API 回傳，展示多人同時瀏覽與語音房熱度。</p>
      </div>
      <div class="metric-card">
        <span>今日配對</span>
        <strong>${matchesToday}</strong>
        <p>適合觀察配對漏斗和推薦排序成效。</p>
      </div>
      <div class="metric-card">
        <span>每小時訊息</span>
        <strong>${messagesPerHour}</strong>
        <p>可作為聊天室與防騷擾機制的容量指標。</p>
      </div>
      <div class="metric-card">
        <span>候補名單</span>
        <strong>${state.waitlistCount}</strong>
        <p>透過動態 API 與 Netlify Forms 收集測試者。</p>
      </div>
    </div>
    <div class="growth-metrics compact">
      <div class="metric-card">
        <span>檔案完成度</span>
        <strong>${completion}%</strong>
        <p>完成照片、興趣、介紹和驗證可提升配對品質。</p>
      </div>
      <div class="metric-card">
        <span>上線準備</span>
        <strong>${readyCount}/${launchChecklist.length}</strong>
        <p>前端、表單與動態 API 已就緒。</p>
      </div>
    </div>
    <div class="server-recommendations">
      ${(state.dynamicRecommendations.length ? state.dynamicRecommendations : ["部署到 Netlify 後，這裡會由 Functions 回傳即時營運建議。"])
        .map(
          (tip) => `
            <span>
              <i data-lucide="sparkles"></i>
              ${escapeHtml(tip)}
            </span>
          `,
        )
        .join("")}
    </div>
    <div class="launch-grid">
      <article>
        <h3>目前可多人使用的部分</h3>
        <p>任何人都可以透過公開網址同時瀏覽網站、進入同一個房間、看到線上名單，並使用共享房間訊息。</p>
      </article>
      <article>
        <h3>目前多人連線方式</h3>
        <p>使用 Netlify Functions 與 Blobs 做雲端同步，前端定時輪詢，不需安裝 App 即可跨手機、電腦、網頁使用。</p>
      </article>
      <article>
        <h3>建議下一步</h3>
        <p>若要正式商用，可再加入帳號登入、權限控管、照片儲存、封鎖名單與管理後台。</p>
      </article>
    </div>
    <div class="launch-checklist">
      ${launchChecklist
        .map(
          (item) => `
            <div class="${item.done ? "is-done" : ""}">
              <i data-lucide="${item.done ? "check-circle-2" : "circle-dashed"}"></i>
              <span>
                <strong>${item.title}</strong>
                <small>${item.detail}</small>
              </span>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
  $("#refreshDynamicBtn")?.addEventListener("click", () => {
    syncDynamicData();
    showToast("正在刷新動態資料");
  });
  $("#copyRemoteUrlBtn")?.addEventListener("click", copyRemoteUrl);
  syncIcons();
}

async function copyRemoteUrl() {
  const value = $("#remoteUrlInput")?.value || location.href;
  try {
    await navigator.clipboard.writeText(value);
    showToast("遠端連線網址已複製");
  } catch {
    showToast(`遠端網址：${value}`);
  }
}

async function copyRoomLink() {
  const value = crossIpJoinUrl();
  try {
    await navigator.clipboard.writeText(value);
    showToast(`房間 ${state.currentRoomId} 的連結已複製`);
  } catch {
    showToast(`分享連結：${value}`);
  }
}

async function handleWaitlistSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  try {
    const payload = Object.fromEntries(data.entries());
    const apiResponse = await fetch(apiUrl("/api/waitlist"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!apiResponse.ok) throw new Error("Dynamic waitlist unavailable");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    }).catch(() => {});

    state.waitlistCount += 1;
    form.reset();
    renderGrowth();
    scheduleSave();
    showToast("已送出候補資料，動態 API 已接收");
  } catch {
    showToast("送出失敗，請稍後再試");
  }
}

async function installApp() {
  if (!state.installPrompt) {
    showToast("瀏覽器尚未提供安裝提示，可先將網站加入書籤");
    return;
  }
  state.installPrompt.prompt();
  await state.installPrompt.userChoice;
  state.installPrompt = null;
}

function registerPwa() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.installPrompt = event;
    if (state.activeView === "growth") {
      showToast("此網站可以安裝到裝置");
    }
  });

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}

function renderSafetyCenter() {
  const steps = [
    ["phone", "手機驗證", "用一次性驗證碼確認本人持有門號"],
    ["email", "Email 驗證", "用信箱保留帳號復原管道"],
    ["selfie", "真人自拍驗證", "確認照片與本人一致"],
    ["id", "身分證驗證", "提高高信任互動與檢舉處理效率"],
  ];
  const completed = steps.filter(([key]) => userProfile.verifications[key]).length;

  $("#safetyGrid").innerHTML = `
    <article class="safety-item wide">
      <i data-lucide="badge-check"></i>
      <h3>身份驗證</h3>
      <p>完成越多驗證，配對卡、附近的人與聊天頁會顯示更高可信度。</p>
      <div class="verification-list">
        ${steps
          .map(
            ([key, title, detail]) => `
              <button class="${userProfile.verifications[key] ? "is-done" : ""}" type="button" data-verify-step="${key}">
                <span>
                  <strong>${title}</strong>
                  <small>${detail}</small>
                </span>
                <i data-lucide="${userProfile.verifications[key] ? "badge-check" : "circle"}"></i>
              </button>
            `,
          )
          .join("")}
      </div>
      <div class="trust-score">
        <span>信任分數</span>
        <strong>${completed * 25}%</strong>
      </div>
    </article>
    <article class="safety-item">
      <i data-lucide="message-square-warning"></i>
      <h3>敏感訊息過濾</h3>
      <p>自動弱化騷擾、詐騙、過度邀約等訊息，保留檢舉證據。</p>
      <button class="ghost-action" type="button" data-safety-action="sensitive">
        <i data-lucide="${state.sensitiveFilter ? "toggle-right" : "toggle-left"}"></i>
        <span>${state.sensitiveFilter ? "已開啟" : "已關閉"}</span>
      </button>
    </article>
    <article class="safety-item">
      <i data-lucide="timer-reset"></i>
      <h3>慢速聊天</h3>
      <p>新配對前 24 小時限制連續訊息節奏，讓對話不被壓迫感帶走。</p>
      <button class="ghost-action" type="button" data-safety-action="slow">
        <i data-lucide="${state.slowMode ? "toggle-right" : "toggle-left"}"></i>
        <span>${state.slowMode ? "已開啟" : "已關閉"}</span>
      </button>
    </article>
    <article class="safety-item">
      <i data-lucide="ban"></i>
      <h3>封鎖與檢舉</h3>
      <p>目前已處理 ${state.blockedCount} 筆封鎖或檢舉紀錄，聊天與房間都會同步套用。</p>
      <div class="safety-actions">
        <button class="ghost-action" type="button" data-safety-action="report">
          <i data-lucide="flag"></i>
          <span>新增檢舉</span>
        </button>
        <button class="ghost-action" type="button" data-safety-action="block">
          <i data-lucide="ban"></i>
          <span>封鎖示範帳號</span>
        </button>
      </div>
    </article>
    <article class="safety-item">
      <i data-lucide="siren"></i>
      <h3>緊急求助</h3>
      <p>約會中可快速傳送目前地點、對方檔案與最近聊天紀錄給信任聯絡人。</p>
      <button class="primary-action" type="button" data-safety-action="emergency">
        <i data-lucide="send"></i>
        <span>送出求助訊號</span>
      </button>
    </article>
  `;

  $$("[data-verify-step]").forEach((button) => {
    button.addEventListener("click", () => {
      userProfile.verifications[button.dataset.verifyStep] = true;
      renderSafetyCenter();
      renderProfilePreview();
      scheduleSave();
      showToast("驗證狀態已更新");
    });
  });
  $$("[data-safety-action]").forEach((button) => {
    button.addEventListener("click", () => handleSafetyAction(button.dataset.safetyAction));
  });
  syncIcons();
}

function handleSafetyAction(action) {
  if (action === "sensitive") {
    state.sensitiveFilter = !state.sensitiveFilter;
    renderSafetyCenter();
    scheduleSave();
    showToast(state.sensitiveFilter ? "敏感訊息過濾已開啟" : "敏感訊息過濾已關閉");
    return;
  }
  if (action === "slow") {
    state.slowMode = !state.slowMode;
    renderSafetyCenter();
    scheduleSave();
    showToast(state.slowMode ? "慢速聊天已開啟" : "慢速聊天已關閉");
    return;
  }
  if (action === "report") {
    state.blockedCount += 1;
    renderSafetyCenter();
    scheduleSave();
    showToast("已建立檢舉紀錄，安全團隊會優先審核");
    return;
  }
  if (action === "block") {
    state.blockedCount += 1;
    renderSafetyCenter();
    scheduleSave();
    showToast("已封鎖示範帳號並停止推薦");
    return;
  }
  showToast("已送出求助訊號與約會資訊給信任聯絡人");
}

function renderPrompt() {
  const prompt = prompts[state.promptIndex % prompts.length];
  $("#promptCard").innerHTML = `<span>${prompt.type}</span><p>${prompt.text}</p>`;
}

function renderQuiz() {
  if (state.quizIndex >= quizQuestions.length) {
    const favorite = state.quizAnswers.join("、") || "自然聊天";
    $("#quizBox").innerHTML = `
      <div class="quiz-question">默契結果：你適合先從「${favorite}」開始認識。</div>
      <button class="primary-action stretch" type="button" id="restartQuizBtn">
        <i data-lucide="rotate-ccw"></i>
        <span>再玩一次</span>
      </button>
    `;
    $("#restartQuizBtn").addEventListener("click", () => {
      state.quizIndex = 0;
      state.quizAnswers = [];
      renderQuiz();
    });
    syncIcons();
    return;
  }

  const quiz = quizQuestions[state.quizIndex];
  $("#quizBox").innerHTML = `
    <div class="quiz-question">${quiz.question}</div>
    <div class="quiz-options">
      ${quiz.options.map((option) => `<button class="quiz-option" type="button" data-quiz-option="${option}">${option}</button>`).join("")}
    </div>
    <div class="quiz-actions">
      <span>${state.quizIndex + 1}/${quizQuestions.length}</span>
      <span>${state.quizAnswers.length ? `已選：${state.quizAnswers.at(-1)}` : "選一個最像你的答案"}</span>
    </div>
  `;
  $$("[data-quiz-option]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quizAnswers.push(button.dataset.quizOption);
      state.quizIndex += 1;
      renderQuiz();
    });
  });
}

function shuffle(items) {
  return items
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function resetMemory() {
  state.memoryCards = shuffle([...memoryValues, ...memoryValues]).map((value, index) => ({
    id: `${value}-${index}`,
    value,
  }));
  state.flipped = [];
  state.matched = new Set();
  state.moves = 0;
  renderMemory();
}

function renderMemory() {
  $("#memoryStatus").innerHTML = `
    <span>步數 ${state.moves}</span>
    <strong>${state.matched.size / 2}/${memoryValues.length} 組完成</strong>
  `;
  $("#memoryBoard").innerHTML = state.memoryCards
    .map((card) => {
      const isFlipped = state.flipped.includes(card.id);
      const isMatched = state.matched.has(card.id);
      return `
        <button class="memory-card ${isFlipped ? "is-flipped" : ""} ${isMatched ? "is-matched" : ""}" type="button" data-memory="${card.id}">
          ${isFlipped || isMatched ? card.value : "Pair"}
        </button>
      `;
    })
    .join("");

  $$("[data-memory]").forEach((button) => {
    button.addEventListener("click", () => flipMemory(button.dataset.memory));
  });
}

function flipMemory(cardId) {
  if (state.flipped.length >= 2 || state.flipped.includes(cardId) || state.matched.has(cardId)) return;
  state.flipped.push(cardId);
  renderMemory();
  if (state.flipped.length !== 2) return;

  state.moves += 1;
  const [firstId, secondId] = state.flipped;
  const first = state.memoryCards.find((card) => card.id === firstId);
  const second = state.memoryCards.find((card) => card.id === secondId);
  window.setTimeout(() => {
    if (first.value === second.value) {
      state.matched.add(firstId);
      state.matched.add(secondId);
      if (state.matched.size === state.memoryCards.length) {
        showToast("興趣翻牌完成，可以邀請對方一起玩下一局");
      }
    }
    state.flipped = [];
    renderMemory();
  }, 650);
}

function resetGames() {
  state.promptIndex = 0;
  state.quizIndex = 0;
  state.quizAnswers = [];
  renderPrompt();
  renderQuiz();
  resetMemory();
  showToast("遊戲已重開");
}

function handleGlobalSearch(event) {
  state.globalSearch = event.target.value;
  if (state.activeView === "rooms") {
    renderRooms(state.globalSearch);
  }
  if (state.activeView === "explore") {
    renderDiscoverResults();
  }
  if (state.activeView === "moments") {
    renderMoments();
  }
}

function wireEvents() {
  $("#connectionForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const remember = true;
    try {
      const name = String($("#connectionNameInput")?.value || "").trim();
      if (!name) {
        state.connectionWarning = "請先輸入你的真人暱稱。";
        renderConnectionGate();
        return;
      }
      const normalized = normalizeConnectionBaseUrl($("#connectionIpInput")?.value);
      const warning = connectionWarningFor(normalized);
      if (warning) {
        state.connectionBaseUrl = normalized;
        state.connectionWarning = warning;
        renderConnectionGate();
        showToast("這個 IP 會被瀏覽器擋下，請改用 HTTPS 或直接開 http://IP:PORT");
        return;
      }
      applyConnectionSettings(normalized, $("#connectionRoomInput")?.value, name, { save: remember });
      showToast(`已連線到 ${shortConnectionLabel()}`);
    } catch {
      state.connectionWarning = "請輸入有效的 IP 或網址，例如 http://192.168.66.53:5173";
      renderConnectionGate();
    }
  });

  $$("[data-connection-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.dataset.connectionPreset === "public" ? PUBLIC_REMOTE_URL : defaultConnectionBaseUrl();
      const input = $("#connectionIpInput");
      if (input) input.value = value;
      state.connectionWarning = connectionWarningFor(value);
      const warning = $("#connectionWarning");
      if (warning) {
        warning.textContent =
          state.connectionWarning || "跨縣市或不同網路請使用公開網站與相同房號；只有同 Wi-Fi 才需要輸入 LAN IP。";
        warning.classList.toggle("is-warning", Boolean(state.connectionWarning));
      }
    });
  });

  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $("#profileSettingsBtn").addEventListener("click", () => setView("profile"));

  $("#quickMatchBtn").addEventListener("click", () => {
    setView("rooms");
    inviteLiveMatch();
  });

  $("#startGuideBtn").addEventListener("click", () => {
    setView("profile");
    showToast("先完成檔案，系統會給出更準的配對與約會建議");
  });

  $("#globalSearch").addEventListener("input", handleGlobalSearch);

  $("#saveProfileBtn").addEventListener("click", () => {
    renderProfileEditor();
    showToast("個人檔案已儲存");
  });

  $("#resetFiltersBtn").addEventListener("click", () => {
    state.discoverFilters = { ...defaultDiscoverFilters };
    renderExplore();
    showToast("篩選條件已重設");
  });

  $$("[data-nearby-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.nearbyMode = button.dataset.nearbyMode;
      renderNearby();
      scheduleSave();
    });
  });

  $$("[data-moment-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.momentFilter = button.dataset.momentFilter;
      renderMoments();
      scheduleSave();
    });
  });

  $("#chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage($("#chatInput").value);
    $("#chatInput").value = "";
  });

  $("#newChatBtn").addEventListener("click", () => {
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    $("#chatInput").value = prompt.text;
    $("#chatInput").focus();
  });

  $("#backToLiveRoomBtn")?.addEventListener("click", () => setView("rooms"));
  $("#partyGameArena")?.addEventListener("click", (event) => {
    const reactionButton = event.target.closest("#reactionButton");
    if (!reactionButton || reactionButton.disabled) return;
    reactionButton.disabled = true;
    window.clearInterval(state.reactionUiTimer);
    syncRealtime("game-buzz");
  });
  $("#momentForm").addEventListener("submit", handleMomentSubmit);
  $("#boostNowBtn").addEventListener("click", startBoost);
  $("#waitlistForm").addEventListener("submit", handleWaitlistSubmit);
  $("#installAppBtn").addEventListener("click", installApp);
  window.addEventListener("beforeunload", saveAppState);
}

function init() {
  loadSavedState();
  loadConnectionSettings();
  syncProfileMini();
  renderRooms();
  renderRoomStage();
  renderMultiplayerPanel();
  renderGuide();
  renderProfileEditor();
  renderProfileCard();
  renderExplore();
  renderNearby();
  renderChat();
  renderMoments();
  renderPartyGames();
  renderAiBoost();
  renderGrowth();
  renderSafetyCenter();
  wireEvents();
  registerPwa();
  openConnectionGate();
  window.addEventListener("pagehide", () => {
    leaveRealtimeRoom();
    teardownVoiceRoom().catch(() => {});
  });
  syncIcons();
}

init();

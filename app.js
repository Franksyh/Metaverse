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
    detail: "Netlify 可讓多人同時瀏覽同一個前端網站。",
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
    title: "真正多人資料同步",
    detail: "需要後端登入、資料庫與即時通訊才能讓不同使用者共享配對和聊天。",
    done: false,
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
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function setView(view) {
  state.activeView = view;
  $$(".nav-item").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  $$(".view").forEach((section) => {
    section.classList.toggle("is-active", section.id === `${view}-view`);
  });
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

  const onlineNow = state.dynamicMetrics?.onlineNow || 128;
  $("#statusText").textContent = `Netlify 動態同步中：${onlineNow} 位新朋友在線`;

  renderRooms(state.globalSearch);
  renderRoomStage();
  if (state.activeView === "growth") renderGrowth();
  if (state.activeView === "ai") renderAiBoost();
}

async function syncDynamicData() {
  try {
    const response = await fetch("/api/app-data", {
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
    stopMic();
    showToast("已離開語音");
    renderRoomStage();
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
    renderRoomStage();
    startWave();
    showToast("已加入語音房");
  } catch (error) {
    showToast("麥克風未開啟，請確認瀏覽器權限");
  }
}

function stopMic() {
  if (state.micStream) {
    state.micStream.getTracks().forEach((track) => track.stop());
  }
  if (state.audioContext) {
    state.audioContext.close();
  }
  window.clearInterval(state.waveTimer);
  state.micOn = false;
  state.muted = false;
  state.micStream = null;
  state.audioContext = null;
  state.analyser = null;
}

function toggleMute() {
  if (!state.micStream) return;
  state.muted = !state.muted;
  state.micStream.getAudioTracks().forEach((track) => {
    track.enabled = !state.muted;
  });
  renderRoomStage();
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
      drawIdleWave();
      return;
    }
    const data = new Uint8Array(state.analyser.frequencyBinCount);
    state.analyser.getByteFrequencyData(data);
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
      const conversation = conversations.find((item) => item.id === state.activeConversationId);
      if (conversation) conversation.unread = 0;
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
      <span>${active.type === "room" ? "進房" : "語音"}</span>
    </button>
  `;

  $("#messageList").innerHTML = active.messages
    .map(
      (message) => `
        <article class="message ${message.from === "Frank" ? "mine" : ""}">
          <div class="message-meta">
            <strong>${message.from}</strong>
            <span>${message.time}</span>
          </div>
          <p>${message.text}</p>
        </article>
      `,
    )
    .join("");
  $("#messageList").scrollTop = $("#messageList").scrollHeight;
  syncIcons();
}

function sendMessage(text) {
  const active = conversations.find((conversation) => conversation.id === state.activeConversationId);
  if (!active || !text.trim()) return;
  active.messages.push({ from: "Frank", time: currentTime(), text: text.trim() });
  renderChat();
  scheduleSave();
  window.setTimeout(() => {
    const replies = active.type === "room"
      ? ["這題很可以，等等也丟到房間一起聊。", "我想聽更多，這個方向滿有趣。", "有人也有類似經驗嗎？"]
      : ["我懂，這個答案有加分。", "那我們可以從這個安排第一次語音。", "我也喜歡這種自然的節奏。"];
    active.messages.push({
      from: active.type === "room" ? active.title : active.title,
      time: currentTime(),
      text: replies[Math.floor(Math.random() * replies.length)],
    });
    renderChat();
    scheduleSave();
  }, 700);
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
  return {
    opener: `看到你也喜歡${person.tags[0]}，我很好奇你最近一次因為這件事覺得生活變亮是什麼時候？`,
    plan: `${person.dateIdea}。建議先約 60 到 90 分鐘，保留彼此想再見面的空間。`,
    rhythm: `${person.chatStyle}。前 3 則訊息可以用一問一分享，避免像面試。`,
    safety: `${person.verified}，距離 ${person.distance} km。第一次見面建議選白天、人多、可自行離開的地點。`,
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
  $("#growthPanel").innerHTML = `
    <div class="panel-title">
      <i data-lucide="line-chart"></i>
      <h3>產品優化儀表板</h3>
    </div>
    <div class="dynamic-banner ${state.dynamicMode === "netlify-functions" ? "is-live" : ""}">
      <i data-lucide="${state.dynamicMode === "netlify-functions" ? "cloud-check" : "cloud-off"}"></i>
      <div>
        <strong>${state.dynamicMode === "netlify-functions" ? "已連線 Netlify Functions" : "使用本機示範資料"}</strong>
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
        <h3>手機、電腦、網頁版遠端連線</h3>
        <p>部署後使用同一個 Netlify 公開網址即可在手機瀏覽器、桌機瀏覽器與安裝式 PWA 開啟。動態資料會從雲端 API 同步。</p>
      </div>
      <div class="remote-url-box">
        <input id="remoteUrlInput" value="${escapeHtml(location.origin.startsWith("http") ? location.origin : "部署後顯示公開網址")}" readonly />
        <button class="primary-action" type="button" id="copyRemoteUrlBtn">
          <i data-lucide="copy"></i>
          <span>複製連結</span>
        </button>
      </div>
      <div class="device-support-grid">
        <span><i data-lucide="smartphone"></i>手機版</span>
        <span><i data-lucide="monitor"></i>電腦版</span>
        <span><i data-lucide="globe-2"></i>網頁遠端</span>
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
        <p>任何人都可以透過公開網址同時瀏覽網站、查看功能、填寫候補表單。這適合產品展示、找測試者與收集需求。</p>
      </article>
      <article>
        <h3>真正多人互動還需要</h3>
        <p>登入系統、資料庫、即時聊天室、配對紀錄、照片儲存、審核後台與隱私權設定。這些需要後端服務接入。</p>
      </article>
      <article>
        <h3>建議下一步</h3>
        <p>先用候補表單驗證需求，再加入 Supabase/Firebase 或 Netlify Blobs + Functions，讓配對、聊天和動態跨使用者同步。</p>
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

async function handleWaitlistSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  try {
    const payload = Object.fromEntries(data.entries());
    const apiResponse = await fetch("/api/waitlist", {
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
  $$(".nav-item").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  $("#profileSettingsBtn").addEventListener("click", () => setView("profile"));

  $("#quickMatchBtn").addEventListener("click", () => {
    setView("match");
    showToast("已切換到快速配對");
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

  $("#spinPromptBtn").addEventListener("click", () => {
    state.promptIndex += 1;
    renderPrompt();
  });

  $("#resetGamesBtn").addEventListener("click", resetGames);
  $("#momentForm").addEventListener("submit", handleMomentSubmit);
  $("#boostNowBtn").addEventListener("click", startBoost);
  $("#waitlistForm").addEventListener("submit", handleWaitlistSubmit);
  $("#installAppBtn").addEventListener("click", installApp);
  window.addEventListener("beforeunload", saveAppState);
}

function init() {
  loadSavedState();
  syncProfileMini();
  renderRooms();
  renderRoomStage();
  renderProfileEditor();
  renderProfileCard();
  renderExplore();
  renderNearby();
  renderChat();
  renderMoments();
  renderPrompt();
  renderQuiz();
  resetMemory();
  renderAiBoost();
  renderGrowth();
  renderSafetyCenter();
  wireEvents();
  registerPwa();
  syncDynamicData();
  window.setInterval(syncDynamicData, 90000);
  syncIcons();
}

init();

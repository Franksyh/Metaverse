const CONFIG_ENDPOINT = "/api/supabase-config";
import { SUPABASE_PUBLIC_CONFIG } from "./supabase-public-config.js";

const SUPABASE_MODULE_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
const MEMBER_REFRESH_MS = 60_000;
const PRESENCE_REFRESH_MS = 45_000;
const DEFAULT_AVATAR_URL = "https://api.dicebear.com/9.x/initials/svg";

let supabase = null;
let authUser = null;
let profileRecord = null;
let authMode = "signin";
let activationPromise = null;
let activationUserId = "";
let memberRefreshTimer = null;
let presenceRefreshTimer = null;
let accountGate = null;

const $ = (selector) => document.querySelector(selector);

function app() {
  return window.PairRoomSocial || null;
}

function fallbackSupabaseConfig() {
  const url = String(SUPABASE_PUBLIC_CONFIG?.url || "").trim();
  const anonKey = String(SUPABASE_PUBLIC_CONFIG?.anonKey || "").trim();
  return {
    enabled: /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && Boolean(anonKey),
    url,
    anonKey,
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function syncIcons() {
  window.lucide?.createIcons();
}

function showToast(message) {
  app()?.showToast?.(message);
}

function displayNameFromUser(user) {
  const candidate = String(user?.user_metadata?.display_name || user?.email?.split("@")[0] || "新會員").trim();
  return candidate.length >= 2 ? candidate.slice(0, 40) : "新會員";
}

function avatarFor(profile) {
  const value = String(profile?.avatar_url || "").trim();
  if (/^https?:\/\//i.test(value)) return value;
  return `${DEFAULT_AVATAR_URL}?seed=${encodeURIComponent(profile?.display_name || profile?.id || "member")}&backgroundColor=0d9488`;
}

function relativeActivity(value) {
  const timestamp = Date.parse(value || "");
  if (!Number.isFinite(timestamp)) return "最近加入";
  const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60_000));
  if (minutes < 2) return "剛剛";
  if (minutes < 60) return `${minutes} 分鐘前`;
  if (minutes < 24 * 60) return `${Math.floor(minutes / 60)} 小時前`;
  return `${Math.floor(minutes / (24 * 60))} 天前`;
}

function normalizeInterests(value) {
  return Array.isArray(value)
    ? [...new Set(value.map((item) => String(item || "").trim()).filter(Boolean))].slice(0, 8)
    : [];
}

function appProfileFromRecord(profile, user) {
  return {
    name: String(profile?.display_name || displayNameFromUser(user)).slice(0, 40),
    age: Number(profile?.age || 18),
    city: String(profile?.city || "未填寫"),
    occupation: String(profile?.occupation || "未填寫"),
    height: Number(profile?.height || 170),
    education: String(profile?.education || "未填寫"),
    zodiac: String(profile?.zodiac || "未填寫"),
    bio: String(profile?.bio || ""),
    interests: normalizeInterests(profile?.interests),
    photo: avatarFor(profile),
    genderPreference: String(profile?.gender_preference || "不限"),
    ageMin: Number(profile?.age_min || 18),
    ageMax: Number(profile?.age_max || 80),
    smoking: String(profile?.smoking || "未填寫"),
    drinking: String(profile?.drinking || "未填寫"),
    visibility: profile?.visibility !== false,
    verifications: {
      phone: false,
      email: Boolean(user?.email_confirmed_at),
      selfie: false,
      id: false,
    },
  };
}

function appPersonFromRecord(profile, myInterests, onlineIds) {
  const tags = normalizeInterests(profile.interests);
  const sharedInterests = tags.filter((tag) => myInterests.includes(tag));
  const isOnline = onlineIds.has(profile.id);

  return {
    id: profile.id,
    name: String(profile.display_name || "會員").slice(0, 40),
    age: Number(profile.age || 18),
    city: String(profile.city || "未填寫"),
    img: avatarFor(profile),
    bio: String(profile.bio || "這位會員尚未填寫自我介紹。"),
    tags,
    score: sharedInterests.length,
    sharedInterests,
    mood: String(profile.relationship_goal || "想認識新朋友"),
    verified: "公開檔案",
    occupation: String(profile.occupation || "未填寫"),
    gender: "未公開",
    height: Number(profile.height || 0),
    education: String(profile.education || "未填寫"),
    zodiac: String(profile.zodiac || "未填寫"),
    distance: null,
    smoking: String(profile.smoking || "未填寫"),
    drinking: String(profile.drinking || "未填寫"),
    goal: String(profile.relationship_goal || "想認識新朋友"),
    lastActive: isOnline ? "線上" : relativeActivity(profile.last_seen_at),
    online: isOnline,
    chatStyle: "先從公開資料與共同興趣開始認識。",
    dateIdea: "先在公開場所、短時間見面並告知信任的人。",
  };
}

function momentAuthorFromRecord(profile, fallbackId) {
  return {
    id: String(profile?.id || fallbackId || "member"),
    name: String(profile?.display_name || "會員").slice(0, 40),
    img: avatarFor(profile),
    city: String(profile?.city || "未填寫"),
    tags: normalizeInterests(profile?.interests),
  };
}

function appMomentFromRecord(post, profilesById, likedPostIds, commentsByPost) {
  const author = momentAuthorFromRecord(profilesById.get(post.author_id), post.author_id);
  return {
    id: post.id,
    authorId: post.author_id,
    author,
    tag: String(post.tag || "生活"),
    time: relativeActivity(post.created_at),
    text: String(post.body || ""),
    img: /^https?:\/\//i.test(String(post.image_url || "")) ? String(post.image_url) : "",
    likes: Number(post.like_count || 0),
    likedByMe: likedPostIds.has(post.id),
    comments: commentsByPost.get(post.id) || [],
    isRealPost: true,
  };
}

function updateAccountButton({ signedIn = false } = {}) {
  const button = $("#authAccountBtn");
  const label = $("#authAccountLabel");
  if (!button || !label) return;
  label.textContent = signedIn ? "登出帳號" : "會員登入";
  button.dataset.authenticated = signedIn ? "true" : "false";
}

function renderNotice({ tone, title, detail, actionLabel = "", action = "" }) {
  const notice = $("#realUserNotice");
  if (!notice) return;
  notice.dataset.tone = tone;
  notice.innerHTML = `
    <i data-lucide="${tone === "ready" ? "badge-check" : tone === "setup" ? "database-zap" : "lock-keyhole"}"></i>
    <div>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(detail)}</span>
    </div>
    ${actionLabel ? `<button class="ghost-action" type="button" data-account-notice-action="${escapeHtml(action)}">${escapeHtml(actionLabel)}</button>` : ""}
  `;
  notice.hidden = false;
  notice.querySelector("[data-account-notice-action]")?.addEventListener("click", () => showAccountGate(authMode));
  syncIcons();
}

function ensureAccountGate() {
  if (accountGate) return accountGate;
  accountGate = document.createElement("section");
  accountGate.id = "accountGate";
  accountGate.className = "account-gate is-hidden";
  accountGate.setAttribute("role", "dialog");
  accountGate.setAttribute("aria-modal", "true");
  document.body.append(accountGate);
  return accountGate;
}

function setGateMessage(message = "", tone = "") {
  const note = $("#accountGateNote");
  if (!note) return;
  note.textContent = message;
  note.dataset.tone = tone;
}

function renderAccountGate(mode = authMode) {
  authMode = mode;
  const gate = ensureAccountGate();
  const isRegister = mode === "signup";
  gate.innerHTML = `
    <div class="account-card">
      <button class="icon-button account-close" type="button" id="closeAccountGate" aria-label="關閉登入視窗">
        <i data-lucide="x"></i>
      </button>
      <div class="account-heading">
        <span class="eyebrow">REAL MEMBERS</span>
        <h2>${isRegister ? "建立真人會員帳號" : "登入真人會員"}</h2>
        <p>帳號與個人檔案會安全保存在你的會員資料庫中。</p>
      </div>
      <div class="account-tabs" role="tablist" aria-label="帳號操作">
        <button class="${isRegister ? "" : "is-active"}" type="button" data-auth-tab="signin">登入</button>
        <button class="${isRegister ? "is-active" : ""}" type="button" data-auth-tab="signup">註冊</button>
      </div>
      <form id="accountAuthForm" class="account-form">
        ${
          isRegister
            ? `<label><span>顯示名稱</span><input name="displayName" type="text" autocomplete="nickname" minlength="2" maxlength="40" required /></label>`
            : ""
        }
        <label><span>Email</span><input name="email" type="email" autocomplete="email" required /></label>
        <label><span>密碼</span><input name="password" type="password" autocomplete="${isRegister ? "new-password" : "current-password"}" minlength="8" required /></label>
        <p class="account-gate-note" id="accountGateNote" aria-live="polite"></p>
        <button class="primary-action stretch" type="submit" id="accountSubmitBtn">
          <i data-lucide="${isRegister ? "user-round-plus" : "log-in"}"></i>
          <span>${isRegister ? "建立帳號" : "登入"}</span>
        </button>
      </form>
    </div>
  `;

  gate.querySelectorAll("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => renderAccountGate(button.dataset.authTab));
  });
  $("#closeAccountGate")?.addEventListener("click", hideAccountGate);
  $("#accountAuthForm")?.addEventListener("submit", handleAccountSubmit);
  syncIcons();
}

function showAccountGate(mode = authMode) {
  renderAccountGate(mode);
  ensureAccountGate().classList.remove("is-hidden");
  window.setTimeout(() => $("#accountAuthForm input")?.focus(), 50);
}

function hideAccountGate() {
  ensureAccountGate().classList.add("is-hidden");
}

function setSubmitBusy(isBusy) {
  const submit = $("#accountSubmitBtn");
  if (!submit) return;
  submit.disabled = isBusy;
  const label = submit.querySelector("span");
  if (label) label.textContent = isBusy ? "處理中" : authMode === "signup" ? "建立帳號" : "登入";
}

async function ensureProfile(user) {
  const { data: existing, error: readError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (readError) throw readError;
  if (existing) return existing;

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      display_name: displayNameFromUser(user),
      avatar_url: String(user.user_metadata?.avatar_url || "").slice(0, 2000) || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function loadMembers() {
  if (!authUser || !profileRecord) return [];
  const now = new Date().toISOString();
  const [profilesResult, presenceResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("visibility", true)
      .neq("id", authUser.id)
      .order("last_seen_at", { ascending: false, nullsFirst: false })
      .limit(60),
    supabase.from("room_presence").select("user_id").gt("expires_at", now),
  ]);

  if (profilesResult.error) throw profilesResult.error;
  if (presenceResult.error) throw presenceResult.error;
  const onlineIds = new Set((presenceResult.data || []).map((item) => item.user_id));
  const myInterests = normalizeInterests(profileRecord.interests);
  return (profilesResult.data || []).map((profile) => appPersonFromRecord(profile, myInterests, onlineIds));
}

async function loadPosts() {
  if (!authUser) return [];
  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("id, author_id, body, tag, image_url, like_count, created_at")
    .order("created_at", { ascending: false })
    .limit(80);
  if (postsError) throw postsError;
  if (!posts?.length) return [];

  const postIds = posts.map((post) => post.id);
  const [commentsResult, likesResult] = await Promise.all([
    supabase
      .from("post_comments")
      .select("post_id, author_id, body, created_at")
      .in("post_id", postIds)
      .order("created_at", { ascending: true })
      .limit(320),
    supabase.from("post_likes").select("post_id").eq("user_id", authUser.id).in("post_id", postIds),
  ]);
  if (commentsResult.error) throw commentsResult.error;
  if (likesResult.error) throw likesResult.error;

  const comments = commentsResult.data || [];
  const profileIds = [...new Set([...posts.map((post) => post.author_id), ...comments.map((comment) => comment.author_id)])];
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, display_name, avatar_url, city, interests")
    .in("id", profileIds);
  if (profilesError) throw profilesError;

  const profilesById = new Map((profiles || []).map((profile) => [profile.id, profile]));
  const commentsByPost = new Map();
  comments.forEach((comment) => {
    const author = momentAuthorFromRecord(profilesById.get(comment.author_id), comment.author_id);
    const entries = commentsByPost.get(comment.post_id) || [];
    entries.push(`${author.name}：${String(comment.body || "")}`);
    commentsByPost.set(comment.post_id, entries);
  });

  const likedPostIds = new Set((likesResult.data || []).map((like) => like.post_id));
  return posts.map((post) => appMomentFromRecord(post, profilesById, likedPostIds, commentsByPost));
}

async function refreshMembers() {
  if (!authUser) return;
  try {
    app()?.replaceRealPeople?.(await loadMembers());
  } catch {
    // A background refresh should not interrupt the member's current screen.
  }
}

async function refreshPosts() {
  if (!authUser) return;
  try {
    app()?.replaceRealMoments?.(await loadPosts());
  } catch {
    // A background refresh should not interrupt the member's current screen.
  }
}

async function touchPresence() {
  if (!supabase || !authUser) return;
  const identity = app()?.getRealtimeIdentity?.();
  if (!identity?.sessionId || !identity?.roomId) return;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 2 * 60_000).toISOString();

  const [presenceResult, profileResult] = await Promise.all([
    supabase.from("room_presence").upsert(
      {
        session_id: identity.sessionId,
        user_id: authUser.id,
        room_id: identity.roomId,
        device: identity.device || "web",
        voice_joined: Boolean(identity.micOn),
        voice_muted: Boolean(identity.muted),
        expires_at: expiresAt,
      },
      { onConflict: "session_id" },
    ),
    supabase.from("profiles").update({ last_seen_at: now.toISOString() }).eq("id", authUser.id),
  ]);

  if (presenceResult.error) throw presenceResult.error;
  if (profileResult.error) throw profileResult.error;
}

function startAccountSync() {
  window.clearInterval(memberRefreshTimer);
  window.clearInterval(presenceRefreshTimer);
  memberRefreshTimer = window.setInterval(() => {
    refreshMembers();
    refreshPosts();
  }, MEMBER_REFRESH_MS);
  presenceRefreshTimer = window.setInterval(() => {
    touchPresence().catch(() => {});
  }, PRESENCE_REFRESH_MS);
}

function stopAccountSync() {
  window.clearInterval(memberRefreshTimer);
  window.clearInterval(presenceRefreshTimer);
  memberRefreshTimer = null;
  presenceRefreshTimer = null;
}

async function activateSession(user) {
  if (!user) return;
  if (activationPromise && activationUserId === user.id) return activationPromise;

  activationUserId = user.id;
  activationPromise = (async () => {
    authUser = user;
    profileRecord = await ensureProfile(user);
    await touchPresence();
    const [members, moments] = await Promise.all([loadMembers(), loadPosts()]);
    app()?.activateRealUsers?.({
      user,
      profile: appProfileFromRecord(profileRecord, user),
      people: members,
      moments,
    });
    updateAccountButton({ signedIn: true });
    renderNotice({
      tone: "ready",
      title: "真人會員已登入",
      detail: user.email_confirmed_at ? "Email 已驗證；探索頁只顯示已公開的真人檔案。" : "請完成 Email 驗證，以提高帳號可信度。",
    });
    hideAccountGate();
    startAccountSync();
  })();

  try {
    await activationPromise;
  } finally {
    activationPromise = null;
    activationUserId = "";
  }
}

function clearAuthenticatedState({ showGate = false } = {}) {
  authUser = null;
  profileRecord = null;
  stopAccountSync();
  app()?.setAuthMode?.({ enabled: true, authenticated: false });
  updateAccountButton({ signedIn: false });
  renderNotice({
    tone: "signin",
    title: "請登入真人會員帳號",
    detail: "探索與好友配對只顯示已註冊、已公開的會員資料。",
    actionLabel: "登入",
    action: "signin",
  });
  if (showGate) showAccountGate("signin");
}

function profilePayloadFromApp(profile) {
  const avatarUrl = /^https?:\/\//i.test(String(profile.photo || "")) ? String(profile.photo).slice(0, 2000) : undefined;
  const payload = {
    display_name: String(profile.name || "新會員").trim().slice(0, 40),
    bio: String(profile.bio || "").trim().slice(0, 400),
    city: String(profile.city || "").trim().slice(0, 80) || null,
    age: Number(profile.age) || null,
    occupation: String(profile.occupation || "").trim().slice(0, 80) || null,
    height: Number(profile.height) || null,
    education: String(profile.education || "").trim().slice(0, 40) || null,
    zodiac: String(profile.zodiac || "").trim().slice(0, 40) || null,
    interests: normalizeInterests(profile.interests),
    gender_preference: String(profile.genderPreference || "不限").trim().slice(0, 40),
    age_min: Number(profile.ageMin) || null,
    age_max: Number(profile.ageMax) || null,
    smoking: String(profile.smoking || "").trim().slice(0, 40) || null,
    drinking: String(profile.drinking || "").trim().slice(0, 40) || null,
    visibility: profile.visibility !== false,
  };
  if (avatarUrl) payload.avatar_url = avatarUrl;
  return payload;
}

async function saveProfileToDatabase(event) {
  if (!supabase || !authUser) return;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(profilePayloadFromApp(event.detail || {}))
      .eq("id", authUser.id)
      .select()
      .single();
    if (error) throw error;
    profileRecord = data;
    await refreshMembers();
    showToast("真人會員檔案已同步");
  } catch (error) {
    const message = String(error?.message || "");
    showToast(message.includes("Email verification") ? "請先完成 Email 驗證後再公開個人檔案" : "真人會員檔案暫時無法同步，請稍後再試");
  }
}

async function saveSwipeToDatabase(event) {
  if (!supabase || !authUser) return;
  const targetId = String(event.detail?.targetId || "");
  const action = event.detail?.action === "super" ? "superlike" : event.detail?.action;
  if (!targetId || !["pass", "like", "superlike"].includes(action)) return;
  try {
    const { data, error } = await supabase.rpc("record_swipe", {
      target_user_id: targetId,
      decision: action,
    });
    if (error) throw error;
    if (data?.matched) showToast("你們互相喜歡，已建立好友關係");
  } catch {
    showToast("配對結果暫時無法同步，請稍後再試");
  }
}

async function createPostInDatabase(event) {
  if (!supabase || !authUser) return;
  const text = String(event.detail?.text || "").trim();
  const tag = String(event.detail?.tag || "生活").trim().slice(0, 40) || "生活";
  const imageUrl = String(event.detail?.imageUrl || "").trim();
  if (!text || text.length > 800) return;
  if (!profileRecord?.visibility) {
    showToast("請先在個人檔案開啟公開狀態");
    return;
  }

  try {
    const { error } = await supabase.from("posts").insert({
      author_id: authUser.id,
      body: text,
      tag,
      image_url: imageUrl || null,
      visibility: "public",
    });
    if (error) throw error;
    await refreshPosts();
    showToast("真人動態已發布");
  } catch {
    showToast("動態暫時無法發布，請稍後再試");
  }
}

async function togglePostLikeInDatabase(event) {
  if (!supabase || !authUser) return;
  const postId = String(event.detail?.postId || "");
  if (!postId) return;
  try {
    const { data, error } = await supabase.rpc("toggle_post_like", { target_post_id: postId });
    if (error) throw error;
    await refreshPosts();
    showToast(data?.liked ? "已按讚這則真人動態" : "已取消按讚");
  } catch {
    showToast("按讚結果暫時無法同步，請稍後再試");
  }
}

async function addPostCommentInDatabase(event) {
  if (!supabase || !authUser) return;
  const postId = String(event.detail?.postId || "");
  const body = String(event.detail?.body || "").trim();
  if (!postId || !body || body.length > 280) return;
  if (!profileRecord?.visibility) {
    showToast("請先在個人檔案開啟公開狀態");
    return;
  }

  try {
    const { error } = await supabase.from("post_comments").insert({
      post_id: postId,
      author_id: authUser.id,
      body,
    });
    if (error) throw error;
    await refreshPosts();
    showToast("留言已發布");
  } catch {
    showToast("留言暫時無法發布，請稍後再試");
  }
}

async function requestFriendship(event) {
  if (!supabase || !authUser) return;
  const targetId = String(event.detail?.targetId || "");
  if (!targetId || targetId === authUser.id) return;

  try {
    const query = `and(requester_id.eq.${authUser.id},recipient_id.eq.${targetId}),and(requester_id.eq.${targetId},recipient_id.eq.${authUser.id})`;
    const { data: existing, error: existingError } = await supabase
      .from("friendships")
      .select("id, requester_id, recipient_id, status")
      .or(query)
      .maybeSingle();
    if (existingError) throw existingError;

    if (!existing) {
      const { error } = await supabase.from("friendships").insert({
        requester_id: authUser.id,
        recipient_id: targetId,
        status: "pending",
      });
      if (error) throw error;
      showToast("已送出認識邀請，等待對方回應");
      return;
    }

    if (existing.status === "accepted") {
      showToast("你們已是好友");
      return;
    }
    if (existing.status === "pending" && existing.recipient_id === authUser.id) {
      const { error } = await supabase.from("friendships").update({ status: "accepted" }).eq("id", existing.id);
      if (error) throw error;
      showToast("已接受對方的認識邀請");
      return;
    }
    if (existing.status === "pending") {
      showToast("認識邀請已送出，等待對方回應");
      return;
    }
    showToast("目前無法建立這個好友關係");
  } catch {
    showToast("認識邀請暫時無法同步，請稍後再試");
  }
}

async function handleAccountSubmit(event) {
  event.preventDefault();
  if (!supabase) return;
  const form = new FormData(event.currentTarget);
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const displayName = String(form.get("displayName") || "").trim();
  if (authMode === "signup" && displayName.length < 2) {
    setGateMessage("顯示名稱至少需要 2 個字。", "error");
    return;
  }
  if (password.length < 8) {
    setGateMessage("密碼至少需要 8 個字元。", "error");
    return;
  }

  setSubmitBusy(true);
  setGateMessage("");
  try {
    if (authMode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });
      if (error) throw error;
      if (data.user && !data.session) {
        setGateMessage("帳號已建立，請到 Email 信箱完成驗證後再登入。", "success");
        return;
      }
      await activateSession(data.user);
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await activateSession(data.user);
    }
  } catch (error) {
    setGateMessage(error?.message || "帳號操作失敗，請稍後再試。", "error");
  } finally {
    setSubmitBusy(false);
  }
}

async function bootstrapAccountSystem() {
  ensureAccountGate();
  $("#authAccountBtn")?.addEventListener("click", async () => {
    if (authUser) {
      await supabase?.auth.signOut();
      return;
    }
    if (!supabase) {
      showToast("真人會員資料庫尚未連線");
      return;
    }
    showAccountGate("signin");
  });
  window.addEventListener("pairroom:request-auth", () => showAccountGate("signin"));
  window.addEventListener("pairroom:profile-save", saveProfileToDatabase);
  window.addEventListener("pairroom:swipe", saveSwipeToDatabase);
  window.addEventListener("pairroom:post-create", createPostInDatabase);
  window.addEventListener("pairroom:post-like", togglePostLikeInDatabase);
  window.addEventListener("pairroom:post-comment", addPostCommentInDatabase);
  window.addEventListener("pairroom:friend-request", requestFriendship);
  window.addEventListener("pairroom:room-change", () => {
    touchPresence().catch(() => {});
  });
  window.addEventListener("pagehide", () => stopAccountSync());

  let config = null;
  try {
    const response = await fetch(CONFIG_ENDPOINT, { headers: { accept: "application/json" }, cache: "no-store" });
    if (!response.ok) throw new Error("設定服務無法連線");
    config = await response.json();
  } catch {}

  if (!config?.enabled || !config.url || !config.anonKey) {
    config = fallbackSupabaseConfig();
  }

  if (!config?.enabled || !config.url || !config.anonKey) {
    document.documentElement.dataset.realUsers = "setup";
    app()?.setAuthMode?.({ enabled: true, authenticated: false });
    app()?.closeConnectionGate?.();
    updateAccountButton({ signedIn: false });
    renderNotice({
      tone: "setup",
      title: "真人會員系統尚未連線",
      detail: "目前不會建立或顯示真人會員資料，完成資料庫連線後才會開放。",
    });
    return;
  }

  try {
    const { createClient } = await import(SUPABASE_MODULE_URL);
    supabase = createClient(config.url, config.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    });
  } catch {
    document.documentElement.dataset.realUsers = "setup";
    app()?.setAuthMode?.({ enabled: true, authenticated: false });
    app()?.closeConnectionGate?.();
    renderNotice({
      tone: "setup",
      title: "真人會員登入無法載入",
      detail: "真人會員資料不會在未連線狀態下顯示，請檢查網路後重新整理頁面。",
    });
    return;
  }

  document.documentElement.dataset.realUsers = "enabled";
  app()?.setAuthMode?.({ enabled: true, authenticated: false });
  updateAccountButton({ signedIn: false });
  renderNotice({
    tone: "signin",
    title: "登入真人會員帳號",
    detail: "探索與好友配對只顯示已註冊、已公開的會員資料。",
    actionLabel: "登入",
    action: "signin",
  });

  const { data } = await supabase.auth.getSession();
  if (data.session?.user) {
    try {
      await activateSession(data.session.user);
    } catch {
      clearAuthenticatedState({ showGate: true });
      setGateMessage("會員資料表尚未完成，請先套用資料庫 migration。", "error");
    }
  } else {
    showAccountGate("signin");
  }

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_OUT") {
      window.setTimeout(() => clearAuthenticatedState({ showGate: true }), 0);
      return;
    }
    if (session?.user && session.user.id !== authUser?.id) {
      window.setTimeout(() => {
        activateSession(session.user).catch(() => {
          clearAuthenticatedState({ showGate: true });
          setGateMessage("會員資料表尚未完成，請先套用資料庫 migration。", "error");
        });
      }, 0);
    }
  });
}

bootstrapAccountSystem();

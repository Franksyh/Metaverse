function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function liveNumber(seed, min, max) {
  const range = max - min + 1;
  return min + (seed % range);
}

function appData() {
  const now = new Date();
  const seed = Math.floor(now.getTime() / 60000);
  const hour = now.getHours();
  const eveningLift = hour >= 20 || hour <= 1 ? 28 : 0;

  return {
    generatedAt: now.toISOString(),
    mode: "netlify-functions",
    metrics: {
      onlineNow: liveNumber(seed * 7, 168, 286) + eveningLift,
      matchesToday: liveNumber(seed * 5, 42, 96),
      messagesPerHour: liveNumber(seed * 11, 320, 620),
      waitlistCount: liveNumber(seed * 3, 52, 88),
      safetyReviews: liveNumber(seed * 2, 4, 12),
    },
    rooms: [
      { id: "late-night", active: liveNumber(seed + 11, 24, 39) },
      { id: "movie", active: liveNumber(seed + 19, 14, 28) },
      { id: "game", active: liveNumber(seed + 31, 22, 36) },
      { id: "coffee", active: liveNumber(seed + 43, 10, 23) },
    ],
    recommendations: [
      "今晚 21:30 後語音房活躍度最高，適合推 Boost 活動。",
      "新使用者先完成自拍驗證，配對回覆率可提高。",
      "動態廣場的約會提案貼文，最容易帶動第一次聊天。",
    ],
  };
}

async function waitlist(req) {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let payload = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const email = String(payload.email || "").trim();
  const name = String(payload.name || "").trim();
  if (!email || !name) {
    return json({ error: "Name and email are required" }, 422);
  }

  return json({
    ok: true,
    id: `lead_${Date.now().toString(36)}`,
    receivedAt: new Date().toISOString(),
    message: "候補資料已由 Netlify Function 接收。",
  });
}

export default async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/api/waitlist") {
    return waitlist(req);
  }
  return json(appData());
};

export const config = {
  path: ["/api/app-data", "/api/waitlist"],
};

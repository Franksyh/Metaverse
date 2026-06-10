function sendJson(res, status, data) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(status).json(data);
}

function liveNumber(seed, min, max) {
  const range = max - min + 1;
  return min + (seed % range);
}

function buildAppData() {
  const now = new Date();
  const seed = Math.floor(now.getTime() / 60000);
  const hour = now.getHours();
  const eveningLift = hour >= 20 || hour <= 1 ? 28 : 0;

  return {
    generatedAt: now.toISOString(),
    mode: "vercel-functions",
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
      "先完成自拍與身分驗證，再進入高信任推薦池，能明顯提升回覆率。",
      "AI 約會副駕會同時產生開場白、約會路線與安全 check-in，比單純滑卡更有黏著度。",
      "今晚語音房活躍，建議先用多人房間破冰，再邀請高分配對一對一聊天。",
    ],
  };
}

export default function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  return sendJson(res, 200, buildAppData());
}

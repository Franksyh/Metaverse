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
      "今晚 21:30 語音房活躍，建議開啟 Boost 讓新用戶更快看到你。",
      "AI 推薦已依照興趣、距離與聊天節奏排序，優先顯示互動可能性高的對象。",
      "安全中心提醒新配對先在站內聊天，避免過早交換外部聯絡方式。",
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

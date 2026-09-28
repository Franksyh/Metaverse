function applyCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
  res.setHeader("Access-Control-Max-Age", "86400");
  return res;
}

function sendJson(res, status, data) {
  applyCors(res);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(status).json(data);
}

function buildAppData() {
  const now = new Date();

  return {
    generatedAt: now.toISOString(),
    mode: "database-required",
    metrics: {
      onlineNow: 0,
      matchesToday: 0,
      messagesPerHour: 0,
      waitlistCount: 0,
      safetyReviews: 0,
    },
    rooms: [],
    recommendations: ["真人會員統計會在資料庫連線後顯示。"],
  };
}

export default function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  return sendJson(res, 200, buildAppData());
}

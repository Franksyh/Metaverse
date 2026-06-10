async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return req.body ? JSON.parse(req.body) : {};

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, status, data) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(status).json(data);
}

function text(value, fallback = "", limit = 500) {
  return String(value || fallback)
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, limit);
}

function waitlistStore() {
  globalThis.__PAIR_ROOM_WAITLIST__ ||= [];
  return globalThis.__PAIR_ROOM_WAITLIST__;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  let payload = {};
  try {
    payload = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON" });
  }

  const name = text(payload.name, "", 80);
  const email = text(payload.email, "", 160);
  const goal = text(payload.goal, "", 240);

  if (!name || !email || !email.includes("@")) {
    return sendJson(res, 422, { error: "Name and valid email are required" });
  }

  const lead = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name,
    email,
    goal,
    receivedAt: new Date().toISOString(),
  };

  const leads = waitlistStore();
  leads.push(lead);
  leads.splice(0, Math.max(0, leads.length - 100));

  return sendJson(res, 200, {
    ok: true,
    id: lead.id,
    count: leads.length,
    receivedAt: lead.receivedAt,
    message: "已收到你的候補申請，Vercel Function 已完成動態提交。",
  });
}

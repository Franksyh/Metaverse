import {
  DEFAULT_ROOM_ID,
  applyRealtimeAction,
  createInitialState,
  normalizeState,
  pruneState,
  snapshot,
  text,
} from "../realtime-core.js";

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

function liveState() {
  globalThis.__PAIR_ROOM_LIVE_STATE__ ||= createInitialState();
  return normalizeState(globalThis.__PAIR_ROOM_LIVE_STATE__);
}

function getRoomId(req) {
  const host = req.headers?.host || "localhost";
  const url = new URL(req.url || "/", `https://${host}`);
  const value = req.query?.roomId || url.searchParams.get("roomId");
  return text(Array.isArray(value) ? value[0] : value, DEFAULT_ROOM_ID, 80);
}

function getSessionId(req) {
  const host = req.headers?.host || "localhost";
  const url = new URL(req.url || "/", `https://${host}`);
  const value = req.query?.sessionId || url.searchParams.get("sessionId");
  return text(Array.isArray(value) ? value[0] : value, "", 120);
}

export default async function handler(req, res) {
  applyCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();

  const now = new Date();
  const state = pruneState(liveState(), now.getTime());
  const roomId = getRoomId(req);
  const sessionId = getSessionId(req);

  if (req.method === "GET") {
    return sendJson(res, 200, snapshot(state, roomId, sessionId, now.getTime()));
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  let payload = {};
  try {
    payload = await readJsonBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid JSON" });
  }

  return sendJson(res, 200, applyRealtimeAction(state, payload, now));
}

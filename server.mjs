import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { networkInterfaces } from "node:os";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import appDataHandler from "./api/app-data.js";
import realtimeHandler from "./api/realtime.js";
import waitlistHandler from "./api/waitlist.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const startPort = Number(process.env.PORT || 5173);
const host = process.env.HOST || "0.0.0.0";
const publicRemoteUrl = "https://pair-room-dating-site.vercel.app";

const apiHandlers = new Map([
  ["/api/app-data", appDataHandler],
  ["/api/realtime", realtimeHandler],
  ["/api/waitlist", waitlistHandler],
]);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function safePath(requestUrl) {
  const url = new URL(requestUrl, "http://localhost");
  const rawPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const requested = resolve(root, normalize(rawPath).replace(/^([/\\])+/, ""));
  return requested.startsWith(root) ? requested : join(root, "index.html");
}

function queryFromUrl(requestUrl) {
  const url = new URL(requestUrl || "/", "http://localhost");
  return Object.fromEntries(url.searchParams.entries());
}

function vercelResponseAdapter(response) {
  let statusCode = 200;
  const headers = {};

  return {
    setHeader(key, value) {
      headers[key] = value;
      return this;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      headers["Content-Type"] ||= "application/json; charset=utf-8";
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(data));
      return this;
    },
    end(data = "") {
      response.writeHead(statusCode, headers);
      response.end(data);
      return this;
    },
  };
}

async function handleApi(request, response) {
  const url = new URL(request.url || "/", "http://localhost");
  const handler = apiHandlers.get(url.pathname);
  if (!handler) return false;

  request.query = queryFromUrl(request.url);

  try {
    await handler(request, vercelResponseAdapter(response));
  } catch (error) {
    response.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: "Local API error", message: error.message }));
  }

  return true;
}

function localNetworkUrls(port) {
  return Object.values(networkInterfaces())
    .flat()
    .filter((item) => item && item.family === "IPv4" && !item.internal)
    .map((item) => `http://${item.address}:${port}`);
}

function start(port) {
  const server = createServer(async (request, response) => {
    if (await handleApi(request, response)) return;

    const filePath = safePath(request.url || "/");
    const target = existsSync(filePath) ? filePath : join(root, "index.html");

    try {
      const info = await stat(target);
      response.writeHead(200, {
        "Content-Length": info.size,
        "Content-Type": types[extname(target)] || "application/octet-stream",
      });
      createReadStream(target).pipe(response);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && port < startPort + 20) {
      start(port + 1);
      return;
    }
    console.error(error);
    process.exitCode = 1;
  });

  server.listen(port, host, () => {
    console.log(`Pair Room local: http://localhost:${port}`);
    localNetworkUrls(port).forEach((url) => console.log(`Pair Room LAN:   ${url}`));
    console.log(`Pair Room public for different IPs: ${publicRemoteUrl}`);
    console.log("Same Wi-Fi users can open the LAN URL. Different-network users should open the public URL.");
    console.log("Chat, matching, and games work over LAN IP. Browser microphone access requires HTTPS.");
  });
}

start(startPort);

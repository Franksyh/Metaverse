import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const startPort = Number(process.env.PORT || 5173);

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

function start(port) {
  const server = createServer(async (request, response) => {
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

  server.listen(port, () => {
    console.log(`Pair Room running: http://localhost:${port}`);
  });
}

start(startPort);

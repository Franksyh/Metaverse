const CACHE_NAME = "pair-room-v13-social-app-shell";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./real-users.js",
  "./supabase-public-config.js",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((asset) => cache.add(new Request(new URL(asset, self.location.href), { cache: "reload" })))),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then((clients) => {
        clients.forEach((client) => client.navigate(client.url));
      }),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.startsWith("/api/")) return;
  const isAppShellAsset =
    requestUrl.origin === self.location.origin &&
    (requestUrl.pathname.endsWith("/") || /\.(?:css|html|js|json|mjs)$/i.test(requestUrl.pathname));
  const networkRequest = isAppShellAsset ? new Request(event.request, { cache: "no-store" }) : event.request;
  event.respondWith(
    fetch(networkRequest)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
  );
});

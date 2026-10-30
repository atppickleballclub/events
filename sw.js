// ATP Events service worker.
// Network-first: people always get the latest events list when online,
// and the last copy they saw if they're offline at the courts.
// Bump VERSION if you ever need to force-clear the cache.
const VERSION = "atp-events-v8";
const CORE = ["./", "index.html", "manifest.json", "icons/icon-192.png", "icons/icon-512.png", "icons/logo.png", "icons/dural.png", "icons/ps.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Only handle our own pages/files; links out to event sites go straight through.
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    // "no-cache" = always ask GitHub for the latest file (it only sends it
    // again if it changed), so new logos and events show up straight away.
    fetch(req.url, { cache: "no-cache", credentials: "same-origin" })
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("index.html")))
  );
});

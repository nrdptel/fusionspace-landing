// Service worker for offline use. FusionSpace is a static hub, so once it's been
// loaded online it should keep working with no connection — handy at a launch site
// where there's no cell signal.
//
// Strategy:
//   - navigations: network-first (an online visitor always gets fresh HTML), caching
//     each page under its own URL and falling back, when offline, to that page's
//     cached copy and then the home shell.
//   - other same-origin GETs (JS/CSS/fonts/icons/RSC payloads): stale-while-revalidate,
//     so assets load instantly and refresh in the background.
// The cache name is versioned; old caches are cleared on activate.

const CACHE = "fusionspace-v2";
const SHELL = "/";

self.addEventListener("install", (event) => {
  // No skipWaiting(): when a controller is already running (an updated visit), the new
  // worker waits so it can't swap assets out from under an open tab — the page shows a
  // "refresh" prompt and posts SKIP_WAITING below. A first-ever visit has no controller,
  // so the browser activates immediately. Best-effort precache of the home shell.
  event.waitUntil(caches.open(CACHE).then((c) => c.add(SHELL)).catch(() => {}));
});

// Posted by the page when the user accepts the update, letting the waiting worker take
// over; the page then reloads on controllerchange.
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        // Offline: this page's own cached copy, else the home shell.
        .catch(() =>
          caches
            .match(req, { ignoreSearch: true })
            .then((m) => m || caches.match(SHELL, { ignoreSearch: true })),
        ),
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        // Offline and not cached: a real 504 (not undefined, which would make
        // respondWith throw and surface as an opaque network error).
        .catch(() => cached || new Response("", { status: 504, statusText: "Offline" }));
      return cached || network;
    }),
  );
});

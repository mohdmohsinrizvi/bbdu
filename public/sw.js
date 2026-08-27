const CACHE_VERSION = "v1";
const STATIC_CACHE = `bbdu-static-${CACHE_VERSION}`;
const PAGES_CACHE = `bbdu-pages-${CACHE_VERSION}`;
const FONTS_CACHE = `bbdu-fonts-${CACHE_VERSION}`;
const IMAGES_CACHE = `bbdu-images-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = ["/", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) =>
              key !== STATIC_CACHE &&
              key !== PAGES_CACHE &&
              key !== FONTS_CACHE &&
              key !== IMAGES_CACHE
          )
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;

  // Skip chrome-extension and other non-http schemes
  if (!url.protocol.startsWith("http")) return;

  // Skip analytics and tracking
  if (
    url.hostname.includes("google-analytics.com") ||
    url.hostname.includes("googletagmanager.com") ||
    url.hostname.includes("googlesyndication.com") ||
    url.hostname.includes("doubleclick.net")
  ) {
    return;
  }

  // Skip YouTube video streams (but allow thumbnails and static)
  if (
    url.hostname.includes("youtube.com") &&
    (url.pathname.includes("/videoplayback") ||
      url.pathname.includes("/live_stream"))
  ) {
    return;
  }

  // Navigation requests: Network first, offline fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(PAGES_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Google Fonts stylesheets: Stale while revalidate
  if (url.hostname === "fonts.googleapis.com") {
    event.respondWith(
      caches.open(FONTS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetched = fetch(request)
            .then((response) => {
              cache.put(request, response.clone());
              return response;
            })
            .catch(() => cached);
          return cached || fetched;
        })
      )
    );
    return;
  }

  // Google Fonts.gstatic: Cache first (immutable font files)
  if (url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONTS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Static assets (_next/static): Cache first (immutable hashed files)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Images: Cache first with network fallback
  if (
    request.destination === "image" ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|avif)$/i)
  ) {
    event.respondWith(
      caches.open(IMAGES_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => cached);
        })
      )
    );
    return;
  }

  // YouTube thumbnails: Cache first
  if (
    url.hostname === "img.youtube.com" ||
    url.hostname === "i.ytimg.com"
  ) {
    event.respondWith(
      caches.open(IMAGES_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => cached);
        })
      )
    );
    return;
  }

  // Scripts and stylesheets: Stale while revalidate
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    url.pathname.match(/\.(js|css)$/i)
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetched = fetch(request)
            .then((response) => {
              if (response.ok) {
                cache.put(request, response.clone());
              }
              return response;
            })
            .catch(() => cached);
          return cached || fetched;
        })
      )
    );
    return;
  }

  // Everything else: Network first
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && request.method === "GET") {
          const clone = response.clone();
          caches.open(STATIC_CACHE).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Listen for messages from the app
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

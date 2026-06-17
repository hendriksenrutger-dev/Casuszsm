// Casustraining OM — Service Worker
// Network-first strategie: altijd verse versie ophalen, cache als fallback
const CACHE = 'casustraining';

const BESTANDEN = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BESTANDEN)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

// Network-first: haal altijd vers op, sla op in cache, val terug op cache bij geen internet
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const kopie = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, kopie));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

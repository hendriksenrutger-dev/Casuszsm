// Casustraining OM — Service Worker
// Versie verhogen bij elke update van index.html
const CACHE_NAAM = 'casustraining-v1';

const BESTANDEN = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
];

// Installatie: cache alle bestanden
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAAM).then(cache => cache.addAll(BESTANDEN))
  );
  self.skipWaiting();
});

// Activatie: verwijder oude caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAAM)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first strategie
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

// MarkerCode | Copyright (c) 2025 mitsof | Licensed under CC BY-NC 4.0
const CACHE_NAME = 'markercode-cache-v2'; // <-- bumped cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/privacy.html', // <-- added explicitly
  '/icon.png',
  'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css',
  'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activate immediately
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // delete old caches
          }
        })
      )
    )
  );
  self.clients.claim(); // take control of pages
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchResponse => {
          return fetchResponse;
        })
      );
    })
  );
});

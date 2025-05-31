// Service Worker para Fisioneo PWA
self.addEventListener('install', event => {
  self.skipWaiting();
  console.log('Service Worker instalado com sucesso');
});

self.addEventListener('activate', event => {
  self.clients.claim();
  console.log('Service Worker ativado');
});

self.addEventListener('fetch', function(event) {
  // Estratégia de cache simples: network first
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});

// Cache de recursos estáticos
const CACHE_NAME = 'fisioneo-cache-v1';
const urlsToCache = [
  '/',
  '/icons/baby-boy.png',
  '/icons/baby-icon-192.png',
  '/icons/baby-icon-512.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
}); 
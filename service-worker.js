const CACHE_NAME = 'auth-pwa-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.json',
  'images/icon-256x256.png',
  'images/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache preenchido');
        return cache.addAll(urlsToCache);
      });
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Servir do cache se disponível
        if (response) {
          return response;
        }
        // Caso contrário, buscar na rede
        return fetch(event.request);
      })
  );

});



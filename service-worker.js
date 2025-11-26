
const CACHE_NAME = 'auth-pwa-cache-v1';
const urlsToCache = [
  '/Pwa-FireBase/'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache preenchido');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.error(`Falha ao preencher o cache: ${error}`))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});





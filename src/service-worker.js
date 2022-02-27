const CACHE_NAME = 'offline'

const OFFLINE_URL = 'assets/offline.html'

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
    })()
  )
  // `skipWaiting()` необходим, потому что мы хотим активировать SW
  // и контролировать его сразу, а не после перезагрузки.
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  // self.clients.claim()` позволяет SW начать перехватывать запросы с самого начала,
  // это работает вместе с `skipWaiting()`, позволяя использовать `fallback` с самых первых запросов.
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request)
        return networkResponse
      } catch (error) {
        const cache = await caches.open(CACHE_NAME)
        const cachedResponse = await cache.match(OFFLINE_URL)
        return cachedResponse
      }
    })()
  )
})

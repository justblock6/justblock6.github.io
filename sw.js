self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
  // give page a moment then notify any clients
  setTimeout(() => {
    self.clients.matchAll().then(clients => {
      clients.forEach(c => {
        // message that will be forwarded by the iframe code to the parent
        c.postMessage("SW_MSG: alert('pwned-from-sw')");
      });
    });
  }, 500);
});

// also respond to messages from the page (optional)
self.addEventListener('message', ev => {
  // echo back
  ev.source.postMessage("SW_ECHO: " + JSON.stringify(ev.data));
});

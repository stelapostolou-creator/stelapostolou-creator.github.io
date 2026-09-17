/*  Καθαρίζει ό,τι έμεινε καταχωρημένο σε αυτό το scope από παλιότερη,
 *  εγκαταλελειμμένη έκδοση του site (γεμάτη εφαρμογή, πριν γίνει απλό
 *  redirect) — χωρίς αυτό, browsers που την είχαν ήδη εγκαταστήσει θα
 *  συνέχιζαν να βλέπουν το παλιό, cached περιεχόμενο επ' αόριστον. */
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (clients) { clients.forEach(function (c) { c.navigate(c.url); }); })
  );
});

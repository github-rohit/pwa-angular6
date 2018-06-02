importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

// Note: Ignore the error that Glitch raises about workbox being undefined.
workbox.skipWaiting();
workbox.clientsClaim();
workbox.routing.registerNavigationRoute('index.html', {
  whitelist: [
    new RegExp('/')
  ]
});

workbox.routing.registerRoute(
  new RegExp('http://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('http://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache'
  })
);

workbox.precaching.precacheAndRoute([]);

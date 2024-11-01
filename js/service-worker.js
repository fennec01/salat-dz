importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

// Precache index.html
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '7' },
  // Add other assets as needed
]);

// Serve index.html for all navigation requests with NetworkFirst strategy
const handler = async ({ event }) => {
  try {
    // Try network first
    return await workbox.strategies.networkFirst({
      cacheName: 'pages-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10
        }),
      ],
    }).handle({ event });
  } catch (error) {
    // If network fails, fallback to cache
    return caches.match('/index.html');
  }
};
const navigationRoute = new workbox.routing.NavigationRoute(handler);
workbox.routing.registerRoute(navigationRoute);

// Cache images
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
      }),
    ],
  })
);

// Cache scripts
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'script',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'scripts-cache',
  })
);

// Cache stylesheets
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'styles-cache',
  })
);

// Cache other assets like fonts
workbox.routing.registerRoute(
  ({ request }) =>
    request.destination === 'font' || request.destination === 'document',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20,
      }),
    ],
  })
);

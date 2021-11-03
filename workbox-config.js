module.exports = {
  globDirectory: 'dist',
  globPatterns: [
    '**/*.{html,js,css,png,svg,jpg,gif,json,woff,woff2,eot,ico,webmanifest,map}'
  ],
  swDest: 'dist/service-worker.js',
  clientsClaim: true,
  skipWaiting: true,
  cleanupOutdatedCaches: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
        }
      }
    },
    {
      urlPattern: /\.(?:css|js)$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'assets'
      }
    }
  ]
}

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) =>({
  mode: mode,
  base: mode === 'development' ? '/' : '/salat-dz/',  // <-- Set the correct base path for GitHub Pages deployment
  logLevel: 'info',
  define: {
    __DATE__: `'${new Date().toISOString()}'`,
  },
  build: {
    sourcemap: true,
  },
  plugins: [
    VitePWA({
      mode: mode,
      base: mode === 'development' ? '/' : '/salat-dz/',
      strategies: 'injectManifest',
      srcDir: './src/service-worker',
      filename: 'sw.js',
      injectRegister: false,
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,png,svg}'], //ensure Workbox hashes the files automatically and includes revision information
        minify: false,
        enableWorkboxModulesLogs: true,
      },
      manifest: {
        name: 'Salat DZ',
        short_name: 'Salat',
        theme_color: '#000000',
        background_color: '#000000',
        start_url: '/salat-dz/',  // Set start_url correctly for GitHub Pages
        scope: '/salat-dz/',      // Define the scope to match your base
        icons: [
          {
            src: 'pwa-192x192.png', // <== don't add slash, for testing
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png', // <== don't remove slash, for testing
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // <== don't add slash, for testing
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* when using generateSW the PWA plugin will switch to classic */
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
}));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  },

  modules: [
    "@vite-pwa/nuxt"
  ],

  css: [
    '~/assets/scss/main.scss'
  ],

  runtimeConfig: {
    MAPTILER_API_KEY: process.env.MAPTILER_API_KEY,
    MAPTILER_GEOCOD_API_BASEURL: process.env.MAPTILER_GEOCOD_API_BASEURL,
    MAPTILER_GEOLOC_API_BASEURL: process.env.MAPTILER_GEOLOC_API_BASEURL
  },

  pwa: {
    devOptions: {
      enabled: false
    },

    manifest: {
      name: "Nuxt3 PWA - User preferences",
      short_name: "Nuxt3 PWA - User preferences",
      description: "User preferences in Nuxt3 PWA",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      scope: '/',
      start_url: "/",
      icons: [
        {
          src: "/icons/icon-192.webp",
          sizes: "192x192",
          type: "image/webp",
        },
        {
          src: "/icons/icon-384.webp",
          sizes: "384x384",
          type: "image/webp",
        },
        {
          src: "/icons/icon-512.webp",
          sizes: "512x512",
          type: "image/webp",
        },
        {
          src: "/icons/icon-1024.webp",
          sizes: "1024x1024",
          type: "image/webp",
        },
        {
          src: "/icons/icon-512-maskable.webp",
          sizes: "512x512",
          type: "image/webp",
          "purpose": "maskable"
        },
      ],
    },

    registerType: "autoUpdate",
    workbox: {
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://api.maptiler.com',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'maptiler-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 24 * 60 * 60 // 1 giorno
            }
          }
        },
        {
          urlPattern: ({ request }) => request.destination === 'image',
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 giorni
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: ({ request }) => request.destination === 'style',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'css-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 1 settimana
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: ({ request }) => request.destination === 'script',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'js-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 7 * 24 * 60 * 60, // 1 settimana
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.startsWith('/icons/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'icon-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 giorni
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: ({ request }) => request.destination === 'document',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 24 * 60 * 60, // 1 giorno
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
  },
});

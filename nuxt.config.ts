import tailwindcss from '@tailwindcss/vite'
import site from './data/site.json'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      deployedAt: '',
    },
  },

  app: {
    head: {
      title: site.name,
      titleTemplate: `%s · ${site.name}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#080C14' },
        { name: 'description', content: site.seo.description },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: site.assets?.favicon ?? '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:ital,wght@0,400;0,500;1,400&display=swap',
        },
      ],
    },
  },
})

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  runtimeConfig: {
    githubToken: '',
    public: {
      siteUrl: 'http://localhost:3000',
      githubUsername: 'amiano4',
      contactEmail: ''
    }
  },
  app: {
    head: {
      title: 'Portfolio',
      titleTemplate: '%s · Almario',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'theme-color',
          content: '#0b1020'
        },
        {
          name: 'description',
          content:
            'Portfolio for a full-stack engineer focused on Laravel, Vue, pragmatic architecture, and AI-augmented delivery.'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  }
})

<script setup lang="ts">
import { site } from '~/utils/data'

const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || site.seo.siteUrl

useHead({
  script: [
    {
      id: 'ld-json-site',
      type: 'application/ld+json',
      textContent: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}#website`,
            url: siteUrl,
            name: site.fullName,
            description: site.seo.description,
          },
          {
            '@type': 'Person',
            '@id': `${siteUrl}#person`,
            name: site.fullName,
            url: siteUrl,
            email: site.contact.email,
            jobTitle: site.title,
            sameAs: [site.contact.github, site.contact.linkedin],
            knowsAbout: ['PHP', 'Laravel', 'Symfony', 'Vue', 'Nuxt', 'TypeScript'],
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/shared/site'

const runtimeConfig = useRuntimeConfig()
const contactEmail = computed(() => runtimeConfig.public.contactEmail)
</script>

<template>
  <footer class="mt-24 border-t hairline py-10">
    <div class="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="max-w-xl">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-muted">{{ siteConfig.shortTitle }}</p>
        <p class="mt-3 text-lg font-medium tracking-tight">{{ siteConfig.role }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-5 text-sm text-muted">
        <NuxtLink class="transition-colors hover:text-[color:var(--text)]" to="/projects">Projects</NuxtLink>
        <NuxtLink class="transition-colors hover:text-[color:var(--text)]" to="/blog">Blog</NuxtLink>
        <NuxtLink class="transition-colors hover:text-[color:var(--text)]" :to="siteConfig.githubUrl" target="_blank">GitHub</NuxtLink>
        <a v-if="contactEmail" class="transition-colors hover:text-[color:var(--text)]" :href="`mailto:${contactEmail}`">Email</a>
      </div>
    </div>
  </footer>
</template>

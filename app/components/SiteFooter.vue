<script setup lang="ts">
import { siteConfig } from '~~/shared/site'
</script>

<template>
  <footer class="border-t hairline">
    <div class="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p class="text-xs text-muted">© {{ new Date().getFullYear() }} Almario</p>
      <div class="flex items-center gap-4 text-xs text-muted">
        <NuxtLink class="transition hover:text-[color:var(--text)]" to="/projects">Projects</NuxtLink>
        <NuxtLink class="transition hover:text-[color:var(--text)]" to="/blog">Blog</NuxtLink>
        <NuxtLink class="transition hover:text-[color:var(--text)]" :to="siteConfig.githubUrl" target="_blank">GitHub</NuxtLink>
      </div>
    </div>
  </footer>
</template>

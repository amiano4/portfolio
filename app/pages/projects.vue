<script setup lang="ts">
import { siteConfig } from '~~/shared/site'

useSeoMeta({
  title: 'Projects',
  description: 'GitHub-powered portfolio projects curated from public repositories.',
  ogTitle: 'Projects · Almario',
  ogDescription: 'GitHub-powered portfolio projects curated from public repositories.'
})

const mode = usePortfolioMode()
const runtimeConfig = useRuntimeConfig()

const { data: projects, pending, error, refresh } = await useFetch('/api/projects', {
  default: () => []
})

const featuredProjects = computed(() => projects.value.filter((project) => project.featured))
const otherProjects = computed(() => projects.value.filter((project) => !project.featured))
</script>

<template>
  <div class="shell py-10 sm:py-14">
    <section class="frame rounded-[2rem] p-8 sm:p-10 lg:p-12">
      <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p class="eyebrow">Projects</p>
          <h1 class="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Public work from GitHub, refined with portfolio context.
          </h1>
          <p class="section-copy mt-5 max-w-3xl">
            Repositories are pulled from <span class="font-medium text-[color:var(--text)]">{{ runtimeConfig.public.githubUsername }}</span>, then curated locally to highlight the work that best represents product, systems, and tooling depth.
          </p>
        </div>

        <aside class="panel rounded-[1.75rem] p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Source</p>
          <div class="mt-4 space-y-3 text-sm text-muted">
            <p>Mode: <span class="font-medium text-[color:var(--text)]">{{ mode }}</span></p>
            <p>
              Profile:
              <a :href="siteConfig.githubUrl" target="_blank" class="text-[color:var(--brand)]">{{ siteConfig.githubUrl }}</a>
            </p>
          </div>
          <button type="button" class="button-secondary mt-6 w-full" @click="refresh()">Refresh data</button>
        </aside>
      </div>
    </section>

    <section class="mt-14">
      <div>
        <p class="eyebrow">Featured</p>
        <h2 class="section-title mt-4">The strongest signals first.</h2>
      </div>

      <div v-if="pending" class="mt-8 grid-card text-sm text-muted">Loading GitHub repositories...</div>
      <div v-else-if="error" class="mt-8 grid-card text-sm text-red-500 dark:text-red-300">
        Failed to load projects. Check the GitHub username or token configuration.
      </div>
      <div v-else class="mt-8 grid gap-5 lg:grid-cols-2">
        <ProjectCard v-for="project in featuredProjects" :key="project.name" :project="project" />
      </div>
    </section>

    <section class="mt-14">
      <div>
        <p class="eyebrow">Archive</p>
        <h2 class="section-title mt-4">Utilities, experiments, and foundations.</h2>
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-2">
        <ProjectCard v-for="project in otherProjects" :key="project.name" :project="project" />
      </div>
    </section>
  </div>
</template>

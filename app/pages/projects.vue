<script setup lang="ts">
import { formatDate } from '~/utils/format'
import { siteConfig } from '~~/shared/site'

useSeoMeta({
  title: 'Projects',
  description: 'GitHub-powered portfolio projects curated from public repositories.',
  ogTitle: 'Projects · Almario',
  ogDescription: 'GitHub-powered portfolio projects curated from public repositories.'
})

const mode = usePortfolioMode()
const runtimeConfig = useRuntimeConfig()
const activeCategory = ref('All')

const { data: projects, pending, error, refresh } = await useFetch('/api/projects', {
  default: () => []
})

const categories = computed(() => {
  const values = new Set<string>()

  for (const project of projects.value) {
    for (const category of project.categories) {
      values.add(category)
    }
  }

  return ['All', ...[...values].sort((left, right) => left.localeCompare(right))]
})

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects.value
  }

  return projects.value.filter((project) => project.categories.includes(activeCategory.value))
})

const featuredProjects = computed(() => filteredProjects.value.filter((project) => project.section === 'featured'))
const projectEntries = computed(() => filteredProjects.value.filter((project) => project.section === 'projects'))
const toolEntries = computed(() => filteredProjects.value.filter((project) => project.section === 'tools'))
</script>

<template>
  <div class="shell">
    <section class="list-page-hero">
      <p class="eyebrow">Projects</p>
      <h1 class="list-page-title mt-5">Curated projects from GitHub repos.</h1>
      <p class="section-copy mt-6 max-w-2xl">
        Repositories from <span class="font-medium text-[color:var(--text)]">{{ runtimeConfig.public.githubUsername }}</span>, enriched by optional <code>.portfolio/info.json</code> files, derived categories, and topic-based sectioning.
      </p>

      <div class="mt-8 flex flex-wrap gap-3">
        <span class="signal-badge">{{ mode === 'product' ? 'Product mode' : 'Developer mode' }}</span>
        <a :href="siteConfig.githubUrl" target="_blank" class="button-secondary">GitHub profile</a>
        <button type="button" class="button-secondary" @click="refresh()">Refresh data</button>
      </div>

      <div class="mt-8 flex flex-wrap gap-2">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="tag cursor-pointer transition-colors"
          :data-cat="activeCategory === category ? category : undefined"
          :class="activeCategory === category ? '' : '!bg-transparent'"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <section v-if="pending" class="section-block !pt-0">
      <div class="surface rounded-[1.5rem] p-6 text-sm text-muted">Loading GitHub repositories...</div>
    </section>

    <section v-else-if="error" class="section-block !pt-0">
      <div class="surface rounded-[1.5rem] p-6 text-sm text-red-500 dark:text-red-300">
        Failed to load projects. Check the GitHub username or token configuration.
      </div>
    </section>

    <section v-else-if="!filteredProjects.length" class="section-block !pt-0">
      <div class="surface rounded-[1.5rem] p-6 text-sm text-muted">No projects matched the selected category.</div>
    </section>

    <template v-else>
      <section v-if="featuredProjects.length" class="section-block !pt-0">
        <div>
          <p class="section-number">01</p>
          <p class="eyebrow mt-4">Featured Projects</p>
        </div>

        <div class="editorial-list grid gap-10 lg:grid-cols-2">
          <ProjectCard v-for="project in featuredProjects" :key="project.fullName" :project="project" />
        </div>
      </section>

      <section v-if="projectEntries.length" class="section-block pt-0">
        <div>
          <p class="section-number">02</p>
          <p class="eyebrow mt-4">Projects</p>
        </div>

        <div class="project-list mt-8">
          <div v-for="project in projectEntries" :key="project.fullName" class="project-row">
            <div>
              <p class="mono">{{ project.role || project.language || 'Repository' }}</p>
              <h3 class="mt-2">{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="category in project.categories.slice(0, 3)" :key="category" class="tag" :data-cat="category">{{ category }}</span>
              </div>
            </div>
            <div class="row-side">
              <div>{{ formatDate(project.updatedAt) }}</div>
              <a v-if="project.showGithubLink && project.githubUrl" :href="project.githubUrl" target="_blank" rel="noreferrer" class="archive-link mt-2">
                ↗
              </a>
              <div v-else class="mt-2">Private</div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="toolEntries.length" class="section-block pt-0">
        <div>
          <p class="section-number">03</p>
          <p class="eyebrow mt-4">Tools / Plugins</p>
        </div>

        <div class="project-list mt-8">
          <div v-for="project in toolEntries" :key="project.fullName" class="project-row">
            <div>
              <p class="mono">{{ project.role || project.language || 'Repository' }}</p>
              <h3 class="mt-2">{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="category in project.categories.slice(0, 3)" :key="category" class="tag" :data-cat="category">{{ category }}</span>
              </div>
            </div>
            <div class="row-side">
              <div>{{ formatDate(project.updatedAt) }}</div>
              <a v-if="project.showGithubLink && project.githubUrl" :href="project.githubUrl" target="_blank" rel="noreferrer" class="archive-link mt-2">
                ↗
              </a>
              <div v-else class="mt-2">Private</div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

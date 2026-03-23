<script setup lang="ts">
import type { ProjectSummary } from '~~/shared/types'
import { formatCompactNumber, formatDate } from '~/utils/format'

const props = defineProps<{
  project: ProjectSummary
}>()

const mode = usePortfolioMode()
</script>

<template>
  <article class="grid-card flex h-full flex-col gap-5">
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted">
          <span v-if="project.featured" class="chip">Featured</span>
          <span v-else-if="project.language">{{ project.language }}</span>
        </div>
        <div>
          <h3 class="text-2xl font-semibold tracking-tight">{{ project.name }}</h3>
          <p class="mt-3 text-sm leading-7 text-muted">{{ project.description }}</p>
        </div>
      </div>

      <a
        :href="project.url"
        target="_blank"
        rel="noreferrer"
        class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border hairline text-lg text-muted transition-colors hover:text-[color:var(--text)]"
        aria-label="Open GitHub repository"
      >
        ↗
      </a>
    </div>

    <div class="flex flex-wrap gap-2">
      <span v-for="tag in project.stack.slice(0, 4)" :key="tag" class="rounded-full border hairline px-3 py-1 text-[0.72rem] text-muted">
        {{ tag }}
      </span>
    </div>

    <div v-if="mode === 'developer' && project.highlights.length" class="rounded-[1.35rem] border hairline p-4">
      <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Engineering signals</p>
      <ul class="mt-3 space-y-2 text-sm text-muted">
        <li v-for="highlight in project.highlights" :key="highlight">• {{ highlight }}</li>
      </ul>
    </div>

    <div class="mt-auto flex items-end justify-between gap-4 border-t hairline pt-4 text-sm text-muted">
      <div>
        <p class="font-medium text-[color:var(--text)]">{{ project.role || project.language || 'Repository' }}</p>
        <p class="mt-1">Updated {{ formatDate(project.updatedAt) }}</p>
      </div>
      <div class="flex items-center gap-4 whitespace-nowrap">
        <span>★ {{ formatCompactNumber(project.stars) }}</span>
        <span>⑂ {{ formatCompactNumber(project.forks) }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ProjectSummary } from '~~/shared/types'
import { formatCompactNumber, formatDate } from '~/utils/format'

const props = defineProps<{
  project: ProjectSummary
}>()

const mode = usePortfolioMode()
</script>

<template>
  <article class="project-tile">
    <img
      v-if="props.project.previewImage"
      :src="props.project.previewImage"
      :alt="`${props.project.name} preview`"
      class="mb-5 h-48 w-full rounded-[1rem] border hairline object-cover"
    >

    <div class="project-tile-header">
      <div>
        <p class="mono">{{ props.project.role || props.project.language || 'Repository' }}</p>
        <h3 class="mt-3 text-2xl font-semibold tracking-tight">{{ props.project.name }}</h3>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-muted">{{ props.project.description }}</p>
      </div>

      <a
        v-if="props.project.showGithubLink && props.project.githubUrl"
        :href="props.project.githubUrl"
        target="_blank"
        rel="noreferrer"
        class="icon-link"
        aria-label="Open GitHub repository"
      >
        ↗
      </a>
      <span v-else class="tag-min">Private</span>
    </div>

    <div class="project-tile-tags">
      <span v-for="category in props.project.categories.slice(0, 2)" :key="category" class="tag-min">{{ category }}</span>
      <span v-for="tag in props.project.stack.slice(0, 4)" :key="tag" class="tag-min">{{ tag }}</span>
      <span v-if="props.project.isPrivate" class="tag-min">Private repo</span>
    </div>

    <div v-if="mode === 'developer' && props.project.highlights.length" class="mt-5 rounded-[1rem] border hairline p-4 text-sm text-muted">
      <p class="mono">Engineering signals</p>
      <ul class="mt-3 space-y-2">
        <li v-for="highlight in props.project.highlights" :key="highlight">• {{ highlight }}</li>
      </ul>
    </div>

    <div class="project-tile-footer">
      <span>Updated {{ formatDate(props.project.updatedAt) }}</span>
      <span>★ {{ formatCompactNumber(props.project.stars) }} · ⑂ {{ formatCompactNumber(props.project.forks) }}</span>
    </div>
  </article>
</template>

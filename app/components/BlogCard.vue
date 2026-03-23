<script setup lang="ts">
import { formatDate } from '~/utils/format'

const props = defineProps<{
  post: {
    path: string
    title: string
    description: string
    date: string
    tags?: string[]
    readingTime?: string
  }
}>()
</script>

<template>
  <NuxtLink :to="props.post.path" class="note-tile block">
    <div class="note-tile-header">
      <div>
        <p class="mono">{{ formatDate(props.post.date) }} · {{ props.post.readingTime || 'Short read' }}</p>
        <h3 class="mt-3 text-2xl font-semibold tracking-tight">{{ props.post.title }}</h3>
        <p class="mt-3 max-w-2xl text-sm leading-7 text-muted">{{ props.post.description }}</p>
      </div>
      <span class="icon-link" aria-hidden="true">↗</span>
    </div>

    <div class="note-tile-tags">
      <span v-for="tag in (props.post.tags || []).slice(0, 3)" :key="tag" class="tag-min">{{ tag }}</span>
    </div>
  </NuxtLink>
</template>

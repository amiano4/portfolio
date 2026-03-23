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
  <NuxtLink :to="props.post.path" class="grid-card block h-full transition-transform duration-200 hover:-translate-y-1">
    <div class="flex items-center justify-between gap-3 text-[0.72rem] uppercase tracking-[0.24em] text-muted">
      <span>{{ formatDate(props.post.date) }}</span>
      <span>{{ props.post.readingTime || 'Short read' }}</span>
    </div>
    <h3 class="mt-6 text-2xl font-semibold tracking-tight">{{ props.post.title }}</h3>
    <p class="mt-3 text-sm leading-7 text-muted">{{ props.post.description }}</p>
    <div class="mt-6 flex flex-wrap gap-2">
      <span v-for="tag in (props.post.tags || []).slice(0, 3)" :key="tag" class="rounded-full border hairline px-3 py-1 text-[0.72rem] text-muted">
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>

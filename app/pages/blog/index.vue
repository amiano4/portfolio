<script setup lang="ts">
import { formatDate } from '~/utils/format'

useSeoMeta({
  title: 'Blog',
  description: 'Short, practical writing on shipping software, Laravel/Vue patterns, and AI-assisted workflows.',
  ogTitle: 'Blog · Almario',
  ogDescription: 'Short, practical writing on shipping software, Laravel/Vue patterns, and AI-assisted workflows.'
})

const { data: blogEntries } = await useAsyncData('blog-index', () => queryCollection('blog').all())

const posts = computed(() => {
  const entries = [...(blogEntries.value || [])]
  return entries.sort((left, right) => +new Date(right.date) - +new Date(left.date))
})
</script>

<template>
  <div class="shell">
    <section class="list-page-hero">
      <p class="eyebrow">Blog</p>
      <h1 class="list-page-title mt-5">Short notes. Practical ideas.</h1>
      <p class="section-copy mt-6 max-w-2xl">
        Writing on delivery, systems, Laravel/Vue patterns, and AI-assisted workflows.
      </p>
    </section>

    <section class="section-block !pt-0">
      <div class="note-list">
        <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="note-row">
          <div>
            <p class="mono">{{ formatDate(post.date) }} · {{ post.readingTime || 'Short read' }}</p>
            <h3 class="mt-2">{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </div>
          <div class="row-side">
            <div>{{ (post.tags || []).slice(0, 2).join(' · ') }}</div>
            <div class="mt-2">↗</div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/format'

const route = useRoute()
const { data: blogEntries } = await useAsyncData(`blog-post:${route.path}`, () => queryCollection('blog').all())

const post = computed(() => blogEntries.value?.find((entry) => entry.path === route.path))

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.description,
  ogTitle: `${post.value.title} · Almario`,
  ogDescription: post.value.description
})
</script>

<template>
  <div class="shell py-12 sm:py-16">
    <article class="mx-auto max-w-3xl">
      <NuxtLink to="/blog" class="text-sm font-medium text-[color:var(--brand)]">← Back to blog</NuxtLink>

      <header class="mt-6 surface rounded-[2rem] p-8 sm:p-10">
        <p class="eyebrow">Blog post</p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{{ post?.title }}</h1>
        <p class="mt-4 text-base leading-8 text-muted">{{ post?.description }}</p>
        <div class="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{{ post?.date ? formatDate(post.date) : '' }}</span>
          <span>•</span>
          <span>{{ post?.readingTime || 'Short read' }}</span>
          <template v-for="tag in post?.tags || []" :key="tag">
            <span>•</span>
            <span>{{ tag }}</span>
          </template>
        </div>
      </header>

      <div class="surface mt-8 rounded-[2rem] p-8 sm:p-10">
        <ContentRenderer v-if="post" :value="post" class="prose-custom" />
      </div>
    </article>
  </div>
</template>

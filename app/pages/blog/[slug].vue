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
  <div class="shell py-10 sm:py-14">
    <article class="mx-auto max-w-4xl">
      <NuxtLink to="/blog" class="link-inline">← Back to blog</NuxtLink>

      <header class="frame mt-6 rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <p class="eyebrow">Blog post</p>
        <h1 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{{ post?.title }}</h1>
        <p class="section-copy mt-5 max-w-3xl">{{ post?.description }}</p>

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

      <div class="surface mt-8 rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <ContentRenderer v-if="post" :value="post" class="prose-custom" />
      </div>
    </article>
  </div>
</template>

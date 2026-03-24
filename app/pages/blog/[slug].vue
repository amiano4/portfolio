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
    <article class="mx-auto max-w-2xl">
      <NuxtLink to="/blog" class="link-arrow">← Back</NuxtLink>

      <header class="mt-8 border-b hairline pb-8">
        <p class="mono">{{ (post?.tags || []).slice(0, 2).join(' · ') || 'blog' }}</p>
        <h1 class="heading mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{{ post?.title }}</h1>
        <p class="mt-2 text-sm text-muted">{{ post?.description }}</p>
        <div class="mt-3 flex items-center gap-2 mono">
          <span>{{ post?.date ? formatDate(post.date) : '' }}</span>
          <span>·</span>
          <span>{{ post?.readingTime || 'Short read' }}</span>
        </div>
      </header>

      <div class="mt-8">
        <ContentRenderer v-if="post" :value="post" class="prose-custom" />
      </div>
    </article>
  </div>
</template>

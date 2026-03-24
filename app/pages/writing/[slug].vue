<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryCollection('blog')
    .path(`/blog/${route.params.slug}`)
    .first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <!-- Back -->
    <div class="mb-12">
      <NuxtLink
        to="/writing"
        class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors inline-flex items-center gap-2"
      >
        ← All Posts
      </NuxtLink>
    </div>

    <!-- Header -->
    <header class="mb-16 max-w-2xl">
      <div class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="tag in post?.tags"
          :key="tag"
          class="font-mono text-xs text-slate-500 border border-slate-800 px-2 py-0.5"
        >
          {{ tag }}
        </span>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-5">
        {{ post?.title }}
      </h1>
      <p class="text-slate-400 text-lg leading-relaxed mb-5">{{ post?.description }}</p>
      <p class="font-mono text-xs text-slate-600 uppercase tracking-widest">{{ post?.date }}</p>
    </header>

    <!-- Divider -->
    <div class="border-t border-slate-800 mb-16"></div>

    <!-- Content -->
    <div class="prose">
      <ContentRenderer v-if="post" :value="post" />
    </div>

    <!-- Footer -->
    <div class="mt-20 pt-10 border-t border-slate-800">
      <NuxtLink
        to="/writing"
        class="font-mono text-sm uppercase tracking-widest text-accent hover:text-slate-100 transition-colors inline-flex items-center gap-2"
      >
        ← Back to Writing
      </NuxtLink>
    </div>
  </div>
</template>

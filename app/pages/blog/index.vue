<script setup lang="ts">
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
  <div class="shell py-10 sm:py-14">
    <section class="frame rounded-[2rem] p-8 sm:p-10 lg:p-12">
      <p class="eyebrow">Blog</p>
      <h1 class="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        Notes on shipping well, keeping systems clean, and using AI deliberately.
      </h1>
      <p class="section-copy mt-5 max-w-3xl">
        Posts live as local markdown content, so writing stays simple while the site keeps clean routing and solid SEO.
      </p>
    </section>

    <section class="mt-14 grid gap-5 lg:grid-cols-3">
      <BlogCard v-for="post in posts" :key="post.path" :post="post" />
    </section>
  </div>
</template>

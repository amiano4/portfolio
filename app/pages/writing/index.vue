<script setup lang="ts">
import { site } from '~/utils/data'

useSeoMeta({
  title: 'Writing',
  description: site.pages.writing.description,
})
useScrollReveal()

const { data: posts } = await useAsyncData('all-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)

const headingLines = computed(() => site.pages.writing.heading.split('\n'))
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <!-- Page header -->
    <div data-reveal class="mb-20">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Writing</p>
      <h1 class="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">
        <template v-for="(line, i) in headingLines" :key="i">
          {{ line }}<br v-if="i < headingLines.length - 1" />
        </template>
      </h1>
      <p class="text-slate-400 max-w-xl leading-relaxed">
        {{ site.pages.writing.description }}
      </p>
    </div>

    <!-- Posts -->
    <template v-if="posts && posts.length > 0">
      <div data-reveal class="flex flex-col gap-px bg-slate-800">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="bg-canvas/50 backdrop-blur-sm hover:bg-canvas/80 relative z-10 transition-colors p-8 md:p-10 group flex flex-col md:flex-row md:items-start md:justify-between gap-6"
        >
          <div class="flex-1">
            <h2
              class="text-xl font-semibold text-slate-100 mb-2 group-hover:text-accent transition-colors"
            >
              {{ post.title }}
            </h2>
            <p class="text-slate-400 text-sm leading-relaxed mb-4">{{ post.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="font-mono text-xs text-slate-600 border border-slate-800 px-2 py-0.5"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <div class="shrink-0 md:pt-1">
            <span class="font-mono text-xs text-slate-600">{{ post.date }}</span>
          </div>
        </NuxtLink>
      </div>
    </template>

    <template v-else>
      <div data-reveal class="border border-slate-800 bg-canvas/50 backdrop-blur-sm relative z-10 p-16 text-center">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-slate-700 mb-3">
          Nothing here yet.
        </p>
        <p class="text-slate-500 text-sm">First post is in the works. Check back soon.</p>
      </div>
    </template>
  </div>
</template>

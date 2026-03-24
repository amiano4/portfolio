<script setup lang="ts">
useSeoMeta({
  title: 'Writing',
  description: 'Opinions on engineering, delivery, AI, and the cost of moving too fast.',
})

const { data: posts } = await useAsyncData('all-posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <!-- Page header -->
    <div class="mb-20">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Writing</p>
      <h1 class="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">
        Opinions.<br />Lessons. Process.
      </h1>
      <p class="text-slate-400 max-w-xl leading-relaxed">
        Occasional writing on software, engineering, and the things worth saying out loud.
      </p>
    </div>

    <!-- Posts -->
    <template v-if="posts && posts.length > 0">
      <div class="flex flex-col gap-px bg-slate-800">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          class="bg-canvas hover:bg-surface transition-colors p-8 md:p-10 group flex flex-col md:flex-row md:items-start md:justify-between gap-6"
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
      <div class="border border-slate-800 p-16 text-center">
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-slate-700 mb-3">
          Nothing here yet.
        </p>
        <p class="text-slate-500 text-sm">First post is in the works. Check back soon.</p>
      </div>
    </template>
  </div>
</template>

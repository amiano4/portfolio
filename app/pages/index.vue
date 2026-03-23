<script setup lang="ts">
import { siteConfig } from '~~/shared/site'

useSeoMeta({
  title: 'Home',
  ogTitle: siteConfig.title,
  description: siteConfig.role,
  ogDescription: siteConfig.role
})

const mode = usePortfolioMode()

const { data: projects, pending: projectsPending } = await useFetch('/api/projects', {
  query: {
    featured: true,
    limit: 3
  },
  default: () => []
})

const { data: blogEntries } = await useAsyncData('blog-home', () => queryCollection('blog').all())

const featuredPosts = computed(() => {
  const entries = [...(blogEntries.value || [])]

  return entries
    .sort((left, right) => +new Date(right.date) - +new Date(left.date))
    .filter((entry) => entry.featured)
    .slice(0, 3)
})

const modeNotes = computed(() => {
  if (mode.value === 'developer') {
    return ['Architecture signals stay visible', 'Repository highlights get more emphasis', 'Writing reads closer to engineering notes']
  }

  return ['Cleaner framing for recruiters and founders', 'Impact and product quality come first', 'Technical depth stays available, not loud']
})
</script>

<template>
  <div class="pb-8 sm:pb-12">
    <section class="shell pt-10 sm:pt-14">
      <div class="frame rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p class="eyebrow">Full-stack engineer · Laravel / Vue · AI-assisted workflows</p>
            <h1 class="hero-title mt-6 max-w-5xl">Elegant products. Clean systems. Fast delivery.</h1>
            <p class="lead mt-6 max-w-2xl">{{ siteConfig.intro }}</p>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink to="/projects" class="button-primary">View projects</NuxtLink>
              <NuxtLink to="/blog" class="button-secondary">Read the blog</NuxtLink>
            </div>

            <div class="mt-8 flex flex-wrap gap-3 text-sm text-muted">
              <span class="chip">{{ mode === 'product' ? 'Product mode' : 'Developer mode' }}</span>
              <span class="chip">{{ siteConfig.location }}</span>
              <span class="chip">Cmd/Ctrl + K</span>
            </div>
          </div>

          <aside class="panel rounded-[1.75rem] p-6 sm:p-7">
            <p class="eyebrow">At a glance</p>
            <div class="stat-list mt-4">
              <div v-for="metric in siteConfig.metrics" :key="metric.label" class="stat-item">
                <div>
                  <p class="text-sm font-medium text-[color:var(--text)]">{{ metric.label }}</p>
                  <p class="mt-1 text-xs text-muted">{{ metric.note }}</p>
                </div>
                <strong class="max-w-[11rem] text-right">{{ metric.value }}</strong>
              </div>
            </div>

            <div class="mt-6 rounded-[1.35rem] border hairline p-4">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Current framing</p>
              <ul class="mt-3 space-y-2 text-sm text-muted">
                <li v-for="note in modeNotes" :key="note">• {{ note }}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section class="shell mt-20">
      <div class="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p class="eyebrow">Approach</p>
          <h2 class="section-title mt-4">Product taste backed by engineering discipline.</h2>
          <p class="section-copy mt-5">
            The goal is simple: ship thoughtful work, move fast, and keep the system easy to evolve.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <article v-for="principle in siteConfig.principles" :key="principle.title" class="panel rounded-[1.6rem] p-5">
            <p class="text-lg font-semibold tracking-tight">{{ principle.title }}</p>
            <p class="mt-3 text-sm leading-7 text-muted">{{ principle.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="shell mt-20">
      <div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p class="eyebrow">Tooling</p>
          <h2 class="section-title mt-4">AI is part of the workflow, not the headline.</h2>
          <p class="section-copy mt-5">
            I use AI to reduce friction in research, debugging, implementation, and review — then keep final decisions deliberate.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <article v-for="tool in siteConfig.aiTools" :key="tool.name" class="panel rounded-[1.6rem] p-5">
            <p class="text-lg font-semibold tracking-tight">{{ tool.name }}</p>
            <p class="mt-3 text-sm leading-7 text-muted">{{ tool.purpose }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="shell mt-20">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 class="section-title mt-4">GitHub-backed projects, curated for clarity.</h2>
        </div>
        <NuxtLink to="/projects" class="link-inline hidden sm:inline-flex">All projects →</NuxtLink>
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
        <div v-if="projectsPending" class="grid-card text-sm text-muted">Loading projects...</div>
      </div>
    </section>

    <section class="shell mt-20">
      <div class="flex items-end justify-between gap-4">
        <div>
          <p class="eyebrow">Writing</p>
          <h2 class="section-title mt-4">Short notes on shipping, systems, and workflow.</h2>
        </div>
        <NuxtLink to="/blog" class="link-inline hidden sm:inline-flex">Open blog →</NuxtLink>
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <BlogCard v-for="post in featuredPosts" :key="post.path" :post="post" />
      </div>
    </section>
  </div>
</template>

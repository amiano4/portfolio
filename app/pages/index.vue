<script setup lang="ts">
import { formatDate, formatCompactNumber } from '~/utils/format'
import { siteConfig } from '~~/shared/site'

useSeoMeta({
  title: 'Home',
  ogTitle: siteConfig.title,
  description: siteConfig.role,
  ogDescription: siteConfig.role
})

const mode = usePortfolioMode()

const { data: projects, pending: projectsPending } = await useFetch('/api/projects', {
  query: { featured: true, limit: 4 },
  default: () => []
})

const { data: blogEntries } = await useAsyncData('blog-home', () => queryCollection('blog').all())

const featuredPosts = computed(() => {
  const entries = [...(blogEntries.value || [])]
  return entries.sort((l, r) => +new Date(r.date) - +new Date(l.date)).filter((e) => e.featured).slice(0, 3)
})
</script>

<template>
  <div>
    <section class="shell">
      <div class="hero">
        <p class="hero-label">Full-stack engineer · PHP / JS / Systems Architecture</p>
        <h1 class="hero-name mt-3">Almario</h1>
        <p class="hero-sub">I build across web, mobile, desktop, and connected systems.</p>
        <p class="hero-stack">laravel · vue · symfony · quasar · electron<span class="cursor" /></p>

        <div class="hero-actions">
          <NuxtLink to="/projects" class="button-primary">Projects</NuxtLink>
          <NuxtLink to="/blog" class="button-ghost">Notes</NuxtLink>
        </div>

        <dl class="hero-grid">
          <div class="hero-grid-cell">
            <dt>stack</dt>
            <dd>Laravel, Vue, Symfony</dd>
          </div>
          <div class="hero-grid-cell">
            <dt>workflow</dt>
            <dd>GitHub + AI-assisted</dd>
          </div>
          <div class="hero-grid-cell">
            <dt>
              <span class="inline-flex items-center gap-2">status <span class="live-dot" /></span>
            </dt>
            <dd>{{ mode === 'product' ? 'Product mode' : 'Developer mode' }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="shell section">
      <div class="section-head">
        <p class="section-num">01</p>
        <h2 class="section-title">Selected work</h2>
      </div>

      <div v-if="projectsPending" class="text-xs text-muted">Loading...</div>

      <div v-else class="project-grid">
        <div v-for="project in projects" :key="project.fullName" class="project-cell">
          <img
            v-if="project.previewImage"
            :src="project.previewImage"
            :alt="`${project.name} preview`"
            class="project-cell-preview"
          >

          <p class="project-cell-mono">{{ project.role || project.language || 'repo' }}</p>
          <h3 class="project-cell-name">{{ project.name }}</h3>
          <p class="project-cell-desc">{{ project.description }}</p>

          <div class="project-cell-tags">
            <span v-for="cat in project.categories.slice(0, 2)" :key="cat" class="tag" :data-cat="cat">{{ cat }}</span>
            <span v-for="tag in project.stack.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="project-cell-footer">
            <span>{{ formatDate(project.updatedAt) }}</span>
            <a v-if="project.showGithubLink && project.githubUrl" :href="project.githubUrl" target="_blank" class="archive-link">repo ↗</a>
            <span v-else-if="project.isPrivate">private</span>
            <span v-else>★ {{ formatCompactNumber(project.stars) }}</span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <NuxtLink to="/projects" class="link-arrow">All projects →</NuxtLink>
      </div>
    </section>

    <section class="shell section">
      <div class="section-head">
        <p class="section-num">02</p>
        <h2 class="section-title">How I work</h2>
      </div>

      <div class="p-grid">
        <article v-for="principle in siteConfig.principles" :key="principle.title" class="p-cell">
          <h3>{{ principle.title }}</h3>
          <p>{{ principle.description }}</p>
        </article>
      </div>
    </section>

    <section class="shell section">
      <div class="section-head">
        <p class="section-num">03</p>
        <h2 class="section-title">Notes</h2>
      </div>

      <div class="row-list">
        <NuxtLink v-for="post in featuredPosts" :key="post.path" :to="post.path" class="row-item">
          <div>
            <p class="mono">{{ formatDate(post.date) }}</p>
            <h3 class="mt-1">{{ post.title }}</h3>
            <p>{{ post.description }}</p>
          </div>
          <div class="row-side">{{ post.readingTime || 'Short read' }}</div>
        </NuxtLink>
      </div>

      <div class="mt-6">
        <NuxtLink to="/blog" class="link-arrow">All notes →</NuxtLink>
      </div>
    </section>
  </div>
</template>

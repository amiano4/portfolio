<script setup lang="ts">
import { formatDate } from '~/utils/format'
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
    limit: 4
  },
  default: () => []
})

const { data: blogEntries } = await useAsyncData('blog-home', () => queryCollection('blog').all())

const featuredProject = computed(() => projects.value[0])
const archiveProjects = computed(() => projects.value.slice(1, 4))

const featuredPosts = computed(() => {
  const entries = [...(blogEntries.value || [])]

  return entries
    .sort((left, right) => +new Date(right.date) - +new Date(left.date))
    .filter((entry) => entry.featured)
    .slice(0, 3)
})

const proofItems = [
  { title: 'Core stack', text: 'Laravel, Vue, Symfony' },
  { title: 'Workflow', text: 'GitHub-backed and AI-assisted' },
  { title: 'Focus', text: 'Product quality and maintainability' }
]
</script>

<template>
  <div>
    <section class="shell">
      <div class="hero-shell">
        <div class="hero-copy">
          <p class="eyebrow">Almario</p>
          <h1 class="hero-title mt-6">Full-stack engineer.</h1>
          <p class="hero-summary">PHP / JavaScript / Systems Architecture</p>

          <div class="mt-8 flex flex-wrap gap-3">
            <NuxtLink to="/projects" class="button-primary">View projects</NuxtLink>
            <NuxtLink to="/blog" class="button-secondary">Read notes</NuxtLink>
          </div>

          <div class="proof-line">
            <div v-for="item in proofItems" :key="item.title">
              <strong>{{ item.title }}</strong>
              <span>{{ item.text }}</span>
            </div>
          </div>
        </div>

        <aside class="hero-rail">
          <div class="signal-board">
            <div class="relative z-10 flex items-center justify-between gap-4">
              <div>
                <p class="mono">Current framing</p>
                <h2 class="mt-3 text-3xl font-semibold tracking-tight">{{ mode === 'product' ? 'Product mode' : 'Developer mode' }}</h2>
              </div>
              <span class="signal-badge">{{ siteConfig.location }}</span>
            </div>

            <div class="status-stack relative z-10">
              <div class="status-row">
                <strong>Default stack</strong>
                <span>Laravel · Vue</span>
              </div>
              <div class="status-row">
                <strong>Execution</strong>
                <span>Fast, deliberate</span>
              </div>
              <div class="status-row">
                <strong>Workflow</strong>
                <span>GitHub + AI tooling</span>
              </div>
            </div>

            <div class="micro-grid relative z-10 mt-6">
              <div class="micro-card">
                <p class="mono">01</p>
                <strong>Build</strong>
                <span>Product-grade delivery</span>
              </div>
              <div class="micro-card">
                <p class="mono">02</p>
                <strong>Refine</strong>
                <span>Tradeoffs stay visible</span>
              </div>
              <div class="micro-card">
                <p class="mono">03</p>
                <strong>Ship</strong>
                <span>Maintainable systems</span>
              </div>
            </div>

            <div class="orbital" aria-hidden="true">
              <span class="orbital-core" />
              <span class="orbital-dot -one" />
              <span class="orbital-dot -two" />
              <span class="orbital-dot -three" />
            </div>
          </div>
        </aside>
      </div>
    </section>

    <section class="shell section-block">
      <div class="section-grid">
        <div>
          <p class="section-number">01</p>
          <p class="eyebrow mt-4">Selected work</p>
          <h2 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Curated, not dumped from GitHub.</h2>
          <p class="section-copy">The strongest work goes first. Everything else lives in a cleaner archive.</p>
        </div>

        <div>
          <div v-if="projectsPending" class="surface rounded-[1.5rem] p-6 text-sm text-muted">Loading projects...</div>

          <template v-else>
            <div v-if="featuredProject" class="spotlight-shell">
              <div>
                <img
                  v-if="featuredProject.previewImage"
                  :src="featuredProject.previewImage"
                  :alt="`${featuredProject.name} preview`"
                  class="mb-5 h-56 w-full rounded-[1.25rem] border hairline object-cover"
                >

                <p class="mono">{{ featuredProject.isPrivate ? 'Private repository' : 'Featured repository' }}</p>
                <h3 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{{ featuredProject.name }}</h3>
                <p class="mt-5 max-w-2xl text-sm leading-7 text-muted">{{ featuredProject.description }}</p>

                <div class="spotlight-meta mt-6">
                  <span v-for="tag in featuredProject.stack.slice(0, 5)" :key="tag" class="meta-pill">{{ tag }}</span>
                  <span v-if="featuredProject.isPrivate" class="meta-pill">Private repo</span>
                </div>

                <a
                  v-if="featuredProject.showGithubLink && featuredProject.githubUrl"
                  :href="featuredProject.githubUrl"
                  target="_blank"
                  rel="noreferrer"
                  class="archive-link mt-8"
                >
                  Open repository →
                </a>
                <span v-else class="archive-link mt-8 opacity-70">Curated portfolio entry</span>
              </div>

              <div class="metric-stack">
                <div class="metric-box">
                  <span>Role</span>
                  <strong>{{ featuredProject.role || featuredProject.language }}</strong>
                </div>
                <div class="metric-box">
                  <span>Updated</span>
                  <strong>{{ formatDate(featuredProject.updatedAt) }}</strong>
                </div>
                <div class="metric-box">
                  <span>Signals</span>
                  <strong>★ {{ featuredProject.stars }} · ⑂ {{ featuredProject.forks }}</strong>
                </div>
              </div>
            </div>

            <div class="project-list mt-8">
              <div v-for="project in archiveProjects" :key="project.fullName" class="project-row">
                <div>
                  <p class="mono">{{ project.role || project.language || 'Repository' }}</p>
                  <h3 class="mt-2">{{ project.name }}</h3>
                  <p>{{ project.description }}</p>
                </div>
                <div class="row-side">
                  <div>{{ formatDate(project.updatedAt) }}</div>
                  <a v-if="project.showGithubLink && project.githubUrl" :href="project.githubUrl" target="_blank" rel="noreferrer" class="archive-link mt-2">
                    ↗
                  </a>
                  <div v-else class="mt-2">Private</div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <section class="shell section-block">
      <div class="section-grid">
        <div>
          <p class="section-number">02</p>
          <p class="eyebrow mt-4">How I work</p>
          <h2 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Fast delivery. Clear tradeoffs. Less noise.</h2>
        </div>

        <div class="principle-list">
          <article v-for="principle in siteConfig.principles" :key="principle.title" class="principle-item">
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="shell section-block">
      <div class="section-grid">
        <div>
          <p class="section-number">03</p>
          <p class="eyebrow mt-4">Notes</p>
          <h2 class="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Short writing with actual signal.</h2>
          <p class="section-copy">Delivery, systems, Laravel, Vue, and how I use AI tools without outsourcing engineering judgment.</p>
        </div>

        <div class="note-list">
          <NuxtLink v-for="post in featuredPosts" :key="post.path" :to="post.path" class="note-row">
            <div>
              <p class="mono">{{ formatDate(post.date) }} · {{ post.readingTime || 'Short read' }}</p>
              <h3 class="mt-2">{{ post.title }}</h3>
              <p>{{ post.description }}</p>
            </div>
            <div class="row-side">↗</div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

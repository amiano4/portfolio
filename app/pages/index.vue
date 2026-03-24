<script setup lang="ts">
import { projects, principles } from '~/utils/data'

const featuredProjects = computed(() => projects.filter((p) => p.featured))

const { data: latestPosts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(2).all(),
)

useSeoMeta({
  title: 'Almario — Full-Stack Developer',
  description:
    'Full-Stack Developer building systems that hold — from architecture to production, and everything after.',
})
</script>

<template>
  <div>
    <!-- ─── HERO ──────────────────────────────────────────────────────── -->
    <section class="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      <!-- Background glows -->
      <div class="absolute inset-0 pointer-events-none select-none">
        <div
          class="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style="background: radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)"
        ></div>
        <div
          class="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style="background: radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)"
        ></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <!-- Available badge -->
        <div class="flex items-center gap-2 mb-10">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400">
            Available for new opportunities
          </span>
        </div>

        <!-- Mono label -->
        <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6">
          Full-Stack Developer
        </p>

        <!-- Heading -->
        <h1
          class="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.0] tracking-tight text-slate-100 mb-8"
        >
          I build systems<br />
          <span class="text-slate-400">that hold.</span>
        </h1>

        <!-- Sub copy -->
        <p class="text-lg text-slate-400 max-w-xl leading-relaxed mb-12">
          From architecture to production — and everything after. Based in the Philippines,
          working remotely across timezones.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4">
          <NuxtLink
            to="/work"
            class="inline-flex items-center gap-2 bg-accent text-canvas font-mono text-sm uppercase tracking-widest px-7 py-3.5 hover:bg-accent-dim transition-colors"
          >
            View Work
            <span>→</span>
          </NuxtLink>
          <NuxtLink
            to="/#contact"
            class="inline-flex items-center gap-2 border border-slate-700 text-slate-400 font-mono text-sm uppercase tracking-widest px-7 py-3.5 hover:border-slate-500 hover:text-slate-100 transition-colors"
          >
            Get in Touch
            <span>↓</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span class="font-mono text-xs uppercase tracking-widest text-slate-700">Scroll</span>
        <div class="w-px h-10 bg-gradient-to-b from-slate-700 to-transparent"></div>
      </div>
    </section>

    <!-- ─── SELECTED WORK ─────────────────────────────────────────────── -->
    <section class="py-24">
      <div class="max-w-6xl mx-auto px-6">
        <SectionLabel number="01" label="Selected Work" />

        <div class="flex flex-col gap-5">
          <article
            v-for="project in featuredProjects"
            :key="project.slug"
            class="border border-slate-800 hover:border-slate-600 bg-surface transition-colors group overflow-hidden cursor-pointer"
            :aria-label="`View ${project.title} details`"
            role="link"
            tabindex="0"
            @click="navigateTo(`/work#${project.slug}`)"
            @keydown.enter="navigateTo(`/work#${project.slug}`)"
          >
            <!-- Cover image -->
            <div v-if="project.images?.length" class="w-full h-52 overflow-hidden border-b border-slate-800">
              <img
                :src="project.images[0]"
                :alt="project.title"
                class="w-full h-full object-cover object-top"
              />
            </div>

            <!-- Content -->
            <div class="p-8 md:p-10">
            <!-- Meta row -->
            <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs uppercase tracking-widest text-slate-500">
                  {{ project.role }}
                </span>
                <span class="text-slate-700">·</span>
                <span class="font-mono text-xs text-slate-600">{{ project.year }}</span>
                <span v-if="project.company" class="text-slate-700">·</span>
                <span v-if="project.company" class="font-mono text-xs text-slate-600">
                  {{ project.company }}
                </span>
              </div>
              <span
                class="font-mono text-xs flex items-center gap-2"
                :class="{
                  'text-emerald-400': project.status === 'live',
                  'text-amber-400': project.status === 'tenure-ended',
                  'text-slate-500': project.status === 'completed',
                }"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full inline-block"
                  :class="{
                    'bg-emerald-400': project.status === 'live',
                    'bg-amber-400': project.status === 'tenure-ended',
                    'bg-slate-500': project.status === 'completed',
                  }"
                ></span>
                {{
                  project.status === 'live'
                    ? 'Live'
                    : project.status === 'tenure-ended'
                      ? 'Tenure Ended'
                      : 'Completed'
                }}
              </span>
            </div>

            <!-- Title -->
            <h2
              class="text-2xl md:text-3xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors"
            >
              {{ project.title }}
            </h2>

            <!-- Tagline -->
            <p class="text-slate-400 mb-5 leading-relaxed">{{ project.tagline }}</p>

            <!-- Outcome callout -->
            <p class="text-sm text-slate-400 border-l-2 border-accent pl-4 mb-7 leading-relaxed">
              {{ project.outcome }}
            </p>

            <!-- Stack -->
            <div class="flex flex-wrap gap-2 mb-7">
              <span
                v-for="tag in project.stack"
                :key="tag"
                class="font-mono text-xs text-slate-500 border border-slate-800 px-3 py-1"
              >
                {{ tag }}
              </span>
            </div>

            <!-- CTA hint -->
            <p class="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
              View full details <span>→</span>
            </p>
            </div>
          </article>
        </div>

        <div class="mt-10">
          <NuxtLink
            to="/work"
            class="font-mono text-sm uppercase tracking-widest text-accent hover:text-slate-100 transition-colors inline-flex items-center gap-2"
          >
            View all work →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ─── HOW I WORK ────────────────────────────────────────────────── -->
    <section class="py-24 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6">
        <SectionLabel number="02" label="How I Work" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800">
          <div
            v-for="p in principles"
            :key="p.number"
            class="bg-canvas p-8 md:p-10 hover:bg-surface transition-colors group"
          >
            <span class="font-mono text-sm text-amber mb-5 block">{{ p.number }}</span>
            <h3 class="text-xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors">
              {{ p.title }}
            </h3>
            <p class="text-slate-400 leading-relaxed text-sm">{{ p.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── WRITING ───────────────────────────────────────────────────── -->
    <section class="py-24 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6">
        <SectionLabel number="03" label="Writing" />

        <template v-if="latestPosts && latestPosts.length > 0">
          <div class="flex flex-col gap-px bg-slate-800">
            <NuxtLink
              v-for="post in latestPosts"
              :key="post.path"
              :to="post.path"
              class="bg-canvas hover:bg-surface transition-colors p-8 group flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div class="flex-1">
                <h3
                  class="text-lg font-semibold text-slate-100 mb-2 group-hover:text-accent transition-colors"
                >
                  {{ post.title }}
                </h3>
                <p class="text-slate-400 text-sm leading-relaxed">{{ post.description }}</p>
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="font-mono text-xs text-slate-600 border border-slate-800 px-2 py-0.5"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              <div class="shrink-0">
                <span class="font-mono text-xs text-slate-600">{{ post.date }}</span>
              </div>
            </NuxtLink>
          </div>

          <div class="mt-10">
            <NuxtLink
              to="/writing"
              class="font-mono text-sm uppercase tracking-widest text-accent hover:text-slate-100 transition-colors inline-flex items-center gap-2"
            >
              All posts →
            </NuxtLink>
          </div>
        </template>

        <template v-else>
          <div class="border border-slate-800 p-10 text-center">
            <p class="font-mono text-sm text-slate-600 uppercase tracking-widest">
              First post coming soon.
            </p>
          </div>
        </template>
      </div>
    </section>

    <!-- ─── CONTACT CTA ───────────────────────────────────────────────── -->
    <section id="contact" class="py-24 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6">
        <SectionLabel number="04" label="Let's Talk" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Left: copy -->
          <div>
            <h2 class="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6">
              Open to the right<br />
              <span class="text-accent">opportunities.</span>
            </h2>
            <p class="text-slate-400 leading-relaxed mb-10">
              Remote full-time roles, freelance projects, and consulting engagements. If you have a
              problem worth solving, let's talk about it.
            </p>
            <div class="flex items-center gap-8">
              <a
                href="https://github.com/amiano4"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/almariomiano"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href="/resume.pdf"
                download
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                Résumé ↓
              </a>
            </div>
          </div>

          <!-- Right: form -->
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

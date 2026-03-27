<script setup lang="ts">
import { site, aiTools } from '~/utils/data'

usePageSeo({
  title: 'About',
  description: site.about.intro,
  path: '/about',
  image: site.seo.images.about,
  type: 'profile',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About · ${site.fullName}`,
    url: `${site.seo.siteUrl}/about`,
    about: {
      '@id': `${site.seo.siteUrl}#person`,
    },
  },
})
useScrollReveal()
</script>

<template>
  <div>
    <!-- ─── PAGE HEADER ───────────────────────────────────────────────── -->
    <div data-reveal class="max-w-6xl mx-auto px-6 py-20">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">About</p>
      <h1 class="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">Who I am.</h1>
      <p class="text-slate-400 max-w-2xl leading-relaxed text-lg">
        {{ site.about.intro }}
      </p>
    </div>

    <div class="border-t border-slate-800/50">
      <!-- ─── THE STORY ─────────────────────────────────────────────── -->
      <section class="py-20">
        <div data-reveal class="max-w-6xl mx-auto px-6">
          <SectionLabel number="01" label="The Story" />
          <div class="max-w-2xl space-y-5 text-slate-400 leading-relaxed">
            <p v-for="(paragraph, i) in site.about.story" :key="i">{{ paragraph }}</p>
          </div>
        </div>
      </section>

      <!-- ─── HOW I THINK ───────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div data-reveal class="max-w-6xl mx-auto px-6">
          <SectionLabel number="02" label="How I Think" />
          <div class="max-w-2xl space-y-5 text-slate-400 leading-relaxed">
            <p v-for="(paragraph, i) in site.about.philosophy" :key="i">{{ paragraph }}</p>
          </div>
        </div>
      </section>

      <!-- ─── STACK ─────────────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div data-reveal class="max-w-6xl mx-auto px-6">
          <SectionLabel number="03" label="Stack" />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div v-for="(items, category) in site.about.stack" :key="category">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">
                {{ category }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in items"
                  :key="item"
                  class="font-mono text-xs text-slate-400 border border-slate-800 px-3 py-1.5 hover:border-slate-600 hover:text-slate-100 transition-colors"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── AI TOOLING ─────────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div data-reveal class="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel number="04" label="AI Tooling" />

          <div class="border border-accent/20 bg-accent/5 backdrop-blur-md relative z-10 p-6 mb-5">
            <div class="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <p class="font-mono text-xs uppercase tracking-widest text-accent mb-1">Primary Agent</p>
                <h3 class="text-xl font-bold text-slate-100">{{ aiTools.primary.name }}</h3>
              </div>
              <span class="font-mono text-xs uppercase tracking-widest text-slate-600 border border-slate-800 px-3 py-1">
                {{ aiTools.primary.type }}
              </span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">{{ aiTools.primary.description }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/35 relative z-10">
            <div class="bg-canvas/28 backdrop-blur-md relative z-10 p-6">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">Also Use</p>
              <div class="flex flex-col gap-3">
                <div v-for="agent in aiTools.agents" :key="agent.name">
                  <p class="text-sm font-medium text-slate-200">{{ agent.name }}</p>
                  <p class="font-mono text-xs text-slate-600">{{ agent.note }}</p>
                </div>
              </div>
            </div>
            <div class="bg-canvas/28 backdrop-blur-md relative z-10 p-6">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">Models</p>
              <div class="flex flex-col gap-2">
                <span v-for="model in aiTools.models" :key="model" class="text-sm text-slate-400">{{ model }}</span>
              </div>
            </div>
            <div class="bg-canvas/28 backdrop-blur-md relative z-10 p-6">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">Editor</p>
              <div class="flex flex-col gap-2">
                <span v-for="editor in aiTools.editors" :key="editor" class="text-sm text-slate-400">{{ editor }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── CURRENTLY ─────────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div data-reveal class="max-w-6xl mx-auto px-6">
          <SectionLabel number="05" label="Currently" />
          <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/35 relative z-10">
            <div v-for="item in site.about.currently" :key="item.label" class="bg-canvas/28 backdrop-blur-md relative z-10 p-8">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">
                {{ item.label }}
              </p>
              <p class="text-slate-100 font-semibold mb-1">{{ item.value }}</p>
              <p class="text-slate-400 text-sm">{{ item.sub }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

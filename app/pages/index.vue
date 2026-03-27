<script setup lang="ts">
import { projects, principles, site, aiTools } from "~/utils/data";

const featuredProjects = computed(() => projects.filter((p) => p.featured));

const heroEl = ref<HTMLElement | null>(null)

const replayHero = () => {
  const el = heroEl.value
  if (!el) return
  el.classList.remove('hero-ready')
  // force reset so the stagger can replay on every visit
  void el.offsetHeight
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add('hero-ready')
    })
  })
}

onMounted(() => nextTick(replayHero))
onBeforeRouteLeave(() => {
  heroEl.value?.classList.remove('hero-ready')
})

useScrollReveal()

const { data: latestPosts } = await useAsyncData("latest-posts", () =>
  queryCollection("blog").order("date", "DESC").limit(2).all(),
);

useSeoMeta({
  title: `${site.name} — ${site.title}`,
  description: site.seo.description,
});
</script>

<template>
  <div>
    <!-- ─── HERO ──────────────────────────────────────────────────────── -->
    <section
      ref="heroEl"
      class="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
    >
      <!-- Background glows -->
      <div class="absolute inset-0 pointer-events-none select-none">
        <div
          class="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style="
            background: radial-gradient(
              circle,
              rgba(14, 165, 233, 0.07) 0%,
              transparent 70%
            );
          "
        ></div>
        <div
          class="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full"
          style="
            background: radial-gradient(
              circle,
              rgba(251, 191, 36, 0.05) 0%,
              transparent 70%
            );
          "
        ></div>
      </div>

      <div class="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <!-- Available badge -->
        <div class="hero-item flex items-center gap-2 mb-10" style="transition-delay: 0ms">
          <span
            class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
          ></span>
          <span
            class="font-mono text-xs uppercase tracking-[0.25em] text-emerald-400"
          >
            Available for new opportunities
          </span>
        </div>

        <!-- Mono label -->
        <p
          class="hero-item font-mono text-xs uppercase tracking-[0.3em] text-accent mb-6"
          style="transition-delay: 60ms"
        >
          {{ site.title }}
        </p>

        <!-- Heading -->
        <h1
          class="hero-item text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.0] tracking-tight text-slate-100 mb-8"
          style="transition-delay: 120ms"
        >
          {{ site.hero.heading }}<br />
          <span class="text-slate-400">{{ site.hero.headingAccent }}</span>
        </h1>

        <!-- Sub copy -->
        <p class="hero-item text-lg text-slate-400 max-w-xl leading-relaxed mb-12" style="transition-delay: 190ms">
          {{ site.hero.subheading }}
        </p>

        <!-- CTAs -->
        <div class="hero-item flex flex-wrap gap-4" style="transition-delay: 260ms">
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
      <div
        class="hero-item absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style="transition-delay: 350ms"
      >
        <span class="font-mono text-xs uppercase tracking-widest text-slate-700"
          >Scroll</span
        >
        <div
          class="w-px h-10 bg-gradient-to-b from-slate-700 to-transparent"
        ></div>
      </div>
    </section>

    <!-- ─── SELECTED WORK ─────────────────────────────────────────────── -->
    <section class="py-24">
      <div class="max-w-6xl mx-auto px-6">
        <SectionLabel number="01" label="Selected Work" />

        <div class="flex flex-col gap-5">
          <article
            v-for="(project, index) in featuredProjects"
            :key="project.slug"
            data-reveal
            :data-reveal-delay="index * 120"
            class="border border-slate-800 hover:border-slate-600 bg-surface/50 backdrop-blur-md hover:bg-surface/70 relative z-10 transition-colors group overflow-hidden cursor-pointer"
            :aria-label="`View ${project.title} details`"
            role="link"
            tabindex="0"
            @click="navigateTo(`/work#${project.slug}`)"
            @keydown.enter="navigateTo(`/work#${project.slug}`)"
          >
            <!-- Content -->
            <div class="p-8 md:p-10">
              <!-- Meta row -->
              <div
                class="flex flex-wrap items-center justify-between gap-3 mb-6"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="font-mono text-xs uppercase tracking-widest text-slate-500"
                  >
                    {{ project.role }}
                  </span>
                  <span class="text-slate-700">·</span>
                  <span class="font-mono text-xs text-slate-600">{{
                    project.year
                  }}</span>
                  <span v-if="project.company" class="text-slate-700">·</span>
                  <span
                    v-if="project.company"
                    class="font-mono text-xs text-slate-600"
                  >
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
                    project.status === "live"
                      ? "Live"
                      : project.status === "tenure-ended"
                        ? "Tenure Ended"
                        : "Completed"
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
              <p class="text-slate-400 mb-5 leading-relaxed">
                {{ project.tagline }}
              </p>

              <!-- Outcome callout -->
              <p
                class="text-sm text-slate-400 border-l-2 border-accent pl-4 mb-7 leading-relaxed"
              >
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
              <p
                class="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2 group-hover:gap-3 transition-all"
              >
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
      <div data-reveal class="max-w-6xl mx-auto px-6">
        <SectionLabel number="02" label="How I Work" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/35 relative z-10">
          <div
            v-for="p in principles"
            :key="p.number"
            class="bg-canvas/28 backdrop-blur-md p-8 md:p-10 hover:bg-canvas/45 relative z-10 transition-colors group"
          >
            <span class="font-mono text-sm text-amber mb-5 block">{{
              p.number
            }}</span>
            <h3
              class="text-xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors"
            >
              {{ p.title }}
            </h3>
            <p class="text-slate-400 leading-relaxed text-sm">{{ p.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── AI TOOLING ──────────────────────────────────────────────── -->
    <section class="py-24 border-t border-slate-800/50">
      <div data-reveal class="max-w-6xl mx-auto px-6 relative z-10">
        <SectionLabel number="03" label="AI Tooling" />

        <!-- Primary -->
        <div class="border border-accent/20 bg-accent/5 backdrop-blur-md relative z-10 p-8 mb-6">
          <div class="flex flex-wrap items-start justify-between gap-4 mb-3">
            <div>
              <p
                class="font-mono text-xs uppercase tracking-widest text-accent mb-1"
              >
                Primary Agent
              </p>
              <h3 class="text-2xl font-bold text-slate-100">
                {{ aiTools.primary.name }}
              </h3>
            </div>
            <span
              class="font-mono text-xs uppercase tracking-widest text-slate-600 border border-slate-800 px-3 py-1"
            >
              {{ aiTools.primary.type }}
            </span>
          </div>
          <p class="text-slate-400 leading-relaxed">
            {{ aiTools.primary.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/35 relative z-10">
          <!-- Other agents -->
          <div class="bg-canvas/28 backdrop-blur-md relative z-10 p-6 md:col-span-1">
            <p
              class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4"
            >
              Also Use
            </p>
            <div class="flex flex-col gap-3">
              <div v-for="agent in aiTools.agents" :key="agent.name">
                <p class="text-sm font-medium text-slate-200">
                  {{ agent.name }}
                </p>
                <p class="font-mono text-xs text-slate-600">{{ agent.note }}</p>
              </div>
            </div>
          </div>

          <!-- Models -->
          <div class="bg-canvas/28 backdrop-blur-md relative z-10 p-6 md:col-span-1">
            <p
              class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4"
            >
              Models
            </p>
            <div class="flex flex-col gap-2">
              <span
                v-for="model in aiTools.models"
                :key="model"
                class="text-sm text-slate-400"
                >{{ model }}</span
              >
            </div>
          </div>

          <!-- Editors -->
          <div class="bg-canvas/28 backdrop-blur-md relative z-10 p-6 md:col-span-1">
            <p
              class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4"
            >
              Editor
            </p>
            <div class="flex flex-col gap-2">
              <span
                v-for="editor in aiTools.editors"
                :key="editor"
                class="text-sm text-slate-400"
                >{{ editor }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─── WRITING ───────────────────────────────────────────────────── -->
    <section class="py-24 border-t border-slate-800/50">
      <div data-reveal class="max-w-6xl mx-auto px-6">
        <SectionLabel number="04" label="Writing" />

        <template v-if="latestPosts && latestPosts.length > 0">
          <div class="flex flex-col gap-px bg-slate-800">
            <NuxtLink
              v-for="post in latestPosts"
              :key="post.path"
              :to="post.path"
              class="bg-canvas/50 backdrop-blur-sm hover:bg-canvas/80 relative z-10 transition-colors p-8 group flex flex-col md:flex-row md:items-start md:justify-between gap-4"
            >
              <div class="flex-1">
                <h3
                  class="text-lg font-semibold text-slate-100 mb-2 group-hover:text-accent transition-colors"
                >
                  {{ post.title }}
                </h3>
                <p class="text-slate-400 text-sm leading-relaxed">
                  {{ post.description }}
                </p>
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
                <span class="font-mono text-xs text-slate-600">{{
                  post.date
                }}</span>
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
          <div class="border border-slate-800 bg-canvas/50 backdrop-blur-sm relative z-10 p-10 text-center">
            <p
              class="font-mono text-sm text-slate-600 uppercase tracking-widest"
            >
              First post coming soon.
            </p>
          </div>
        </template>
      </div>
    </section>

    <!-- ─── CONTACT CTA ───────────────────────────────────────────────── -->
    <section id="contact" class="py-24 border-t border-slate-800/50">
      <div data-reveal class="max-w-6xl mx-auto px-6">
        <SectionLabel number="05" label="Let's Talk" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Left: copy -->
          <div>
            <h2
              class="text-4xl md:text-5xl font-bold text-slate-100 leading-tight mb-6"
            >
              {{ site.pages.contact.heading }}<br />
              <span class="text-accent">{{
                site.pages.contact.headingAccent
              }}</span>
            </h2>
            <p class="text-slate-400 leading-relaxed mb-10">
              {{ site.pages.contact.description }}
            </p>
            <div class="flex items-center gap-8">
              <a
                :href="site.contact.github"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                GitHub ↗
              </a>
              <a
                :href="site.contact.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                :href="`mailto:${site.contact.email}`"
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                Email ↗
              </a>
              <a
                :href="site.assets.resume"
                target="_blank"
                rel="noopener noreferrer"
                class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
              >
                Resume ↗
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

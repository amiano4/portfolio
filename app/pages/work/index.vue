<script setup lang="ts">
import {
  projects,
  site,
  type WorkProject,
  type SideProject,
} from "~/utils/data";

const workProjects = computed(
  () => projects.filter((p) => p.type === "work") as WorkProject[],
);
const sideProjects = computed(
  () => projects.filter((p) => p.type === "project") as SideProject[],
);

useSeoMeta({
  title: "Work",
  description:
    "Selected projects — systems built, problems solved, outcomes delivered.",
});
useScrollReveal();

const lightbox = ref<{ images: string[]; index: number } | null>(null);

const openLightbox = (images: string[], index: number) => {
  lightbox.value = { images, index };
};

const getPreviewCardCount = (images: string[]) => Math.min(images.length, 4);

const getPreviewCards = (images: string[]) => {
  const visible = images.slice(0, getPreviewCardCount(images));

  return visible.map((src, index) => ({
    src,
    counterLabel:
      images.length >= 5 && index === visible.length - 1
        ? `+${images.length - 3}`
        : null,
  }));
};

// Pulse the target card after hash scroll completes
const route = useRoute();
onMounted(() => {
  if (!route.hash) return;
  const slug = route.hash.slice(1);
  // router scroll delay (400ms) + smooth scroll duration (~300ms)
  setTimeout(() => {
    const el = document.getElementById(slug);
    if (!el) return;
    el.classList.add("card-pulse");
    el.addEventListener(
      "animationend",
      () => el.classList.remove("card-pulse"),
      { once: true },
    );
  }, 700);
});
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <!-- Page header -->
    <div data-reveal class="mb-20">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
        Portfolio
      </p>
      <h1
        class="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-6"
      >
        Work.
      </h1>
      <p class="text-slate-400 max-w-xl leading-relaxed">
        {{ site.pages.work.description }}
      </p>
    </div>

    <!-- Projects -->
    <div class="flex flex-col gap-8">
      <article
        v-for="(project, index) in workProjects"
        :key="project.slug"
        data-reveal
        :data-reveal-delay="index * 80"
        :id="project.slug"
        class="border border-slate-800 hover:border-slate-600 bg-surface p-8 md:p-12 transition-colors group scroll-mt-24"
      >
        <!-- Meta row — full width -->
        <div class="flex flex-wrap items-center gap-3 mb-6">
          <span
            class="font-mono text-xs uppercase tracking-widest text-slate-500"
            >{{ project.role }}</span
          >
          <span class="text-slate-700">·</span>
          <span class="font-mono text-xs text-slate-600">{{
            project.year
          }}</span>
          <CollabIcon v-if="project.collab" class="text-slate-600" />
          <span v-if="project.company" class="text-slate-700">·</span>
          <span
            v-if="project.company"
            class="font-mono text-xs text-slate-600"
            >{{ project.company }}</span
          >
          <span
            class="font-mono text-xs flex items-center gap-2 ml-auto"
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

        <!-- Title + tagline — always full width -->
        <div class="mb-8">
          <h2
            class="text-3xl md:text-4xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors"
          >
            {{ project.title }}
          </h2>
          <p class="text-slate-400 leading-relaxed text-lg">
            {{ project.tagline }}
          </p>
        </div>

        <!-- Content + image stack -->
        <div
          :class="
            project.images?.length ? 'md:flex md:items-start md:gap-10' : ''
          "
        >
          <!-- Left: content -->
          <div class="flex-1 min-w-0">
            <!-- Problem / Outcome -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p
                  class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3"
                >
                  The Problem
                </p>
                <p class="text-slate-400 leading-relaxed text-sm">
                  {{ project.problem }}
                </p>
              </div>
              <div>
                <p
                  class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3"
                >
                  Outcome
                </p>
                <p
                  class="text-slate-400 leading-relaxed text-sm border-l-2 border-accent pl-4"
                >
                  {{ project.outcome }}
                </p>
              </div>
            </div>

            <!-- Highlights -->
            <div class="mb-8">
              <p
                class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4"
              >
                Highlights
              </p>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li
                  v-for="h in project.highlights"
                  :key="h"
                  class="flex items-start gap-2 text-sm text-slate-400"
                >
                  <span class="text-accent mt-0.5 shrink-0">—</span>{{ h }}
                </li>
              </ul>
            </div>

            <!-- Stack -->
            <div>
              <p
                class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3"
              >
                Stack
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.stack"
                  :key="tag"
                  class="font-mono text-xs text-slate-500 border border-slate-800 px-3 py-1"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right: image stack (only if images exist) -->
          <div
            v-if="project.images?.length"
            class="project-image-stack hidden md:block shrink-0"
          >
            <button
              v-for="(card, index) in getPreviewCards(project.images!)"
              :key="`${project.slug}-${card.src}-${index}`"
              class="stack-card border overflow-hidden bg-slate-800"
              :class="
                index === getPreviewCardCount(project.images!) - 1
                  ? 'border-slate-500'
                  : 'border-slate-700'
              "
              :style="{
                '--stack-index': index,
                '--stack-count': getPreviewCardCount(project.images!),
                zIndex: index + 10,
              }"
              @click="openLightbox(project.images!, 0)"
            >
              <AppImage
                :src="card.src"
                img-class="w-full h-full object-cover object-top"
              />
              <div
                v-if="card.counterLabel"
                class="absolute inset-0 bg-slate-900/30 flex items-center justify-center"
              >
                <span class="text-white font-bold text-2xl">{{
                  card.counterLabel
                }}</span>
              </div>
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- ─── PROJECTS ──────────────────────────────────────────────────── -->
    <div class="mt-24 pt-20 border-t border-slate-800/50">
      <div data-reveal class="mb-12">
        <SectionLabel number="" label="Projects" />
        <p class="text-slate-500 text-sm mt-2 max-w-lg">
          {{ site.pages.work.projectsDescription }}
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/50"
      >
        <div
          v-for="(project, index) in sideProjects"
          :key="project.slug"
          data-reveal
          :data-reveal-delay="index * 50"
          class="bg-canvas p-6 flex flex-col gap-4 hover:bg-surface transition-colors"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="font-semibold text-slate-100 leading-snug">
              {{ project.title }}
            </h3>
            <div class="flex items-center gap-1.5 shrink-0">
              <CollabIcon v-if="project.collab" class="text-slate-600" />
              <span class="font-mono text-xs text-slate-600">{{
                project.year
              }}</span>
            </div>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed flex-1">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in project.stack"
              :key="tag"
              class="font-mono text-[10px] uppercase tracking-widest text-slate-600 border border-slate-800 px-2 py-1"
            >
              {{ tag }}
            </span>
          </div>
          <a
            v-if="project.link"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-xs uppercase tracking-widest text-accent hover:text-white transition-colors mt-auto"
          >
            View Repo ↗
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Lightbox -->
  <ImageLightbox
    v-if="lightbox"
    :images="lightbox.images"
    :initial="lightbox.index"
    @close="lightbox = null"
  />
</template>

<style scoped>
.project-image-stack {
  --max-cards: 4;
  --card-width: 120px;
  --card-height: 236px;
  --step-x: 24px;
  --step-y: 10px;
  position: relative;
  width: calc(var(--card-width) + (var(--max-cards) - 1) * var(--step-x));
  height: calc(var(--card-height) + (var(--max-cards) - 1) * var(--step-y));
}

.stack-card {
  position: absolute;
  width: var(--card-width);
  height: var(--card-height);
  left: calc(
    (var(--stack-index) + (var(--max-cards) - var(--stack-count))) *
      var(--step-x)
  );
  top: calc((var(--stack-count) - 1 - var(--stack-index)) * var(--step-y));
}

@media (min-width: 1024px) {
  .project-image-stack {
    --card-width: 132px;
    --card-height: 258px;
    --step-x: 30px;
    --step-y: 12px;
  }
}
</style>

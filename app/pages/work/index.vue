<script setup lang="ts">
import { projects, site } from '~/utils/data'

useSeoMeta({
  title: 'Work',
  description: 'Selected projects — systems built, problems solved, outcomes delivered.',
})

const lightbox = ref<{ images: string[]; index: number } | null>(null)

const openLightbox = (images: string[], index: number) => {
  lightbox.value = { images, index }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-20">
    <!-- Page header -->
    <div class="mb-20">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">Portfolio</p>
      <h1 class="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">Work.</h1>
      <p class="text-slate-400 max-w-xl leading-relaxed">{{ site.pages.work.description }}</p>
    </div>

    <!-- Projects -->
    <div class="flex flex-col gap-8">
      <article
        v-for="project in projects"
        :key="project.slug"
        :id="project.slug"
        class="border border-slate-800 hover:border-slate-600 bg-surface p-8 md:p-12 transition-colors group scroll-mt-24"
      >
        <!-- Meta -->
        <div class="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div class="flex flex-wrap items-center gap-3">
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

        <!-- Title + tagline -->
        <h2
          class="text-3xl md:text-4xl font-bold text-slate-100 mb-3 group-hover:text-accent transition-colors"
        >
          {{ project.title }}
        </h2>
        <p class="text-slate-400 mb-8 leading-relaxed text-lg">{{ project.tagline }}</p>

        <!-- Problem / Outcome -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">
              The Problem
            </p>
            <p class="text-slate-400 leading-relaxed text-sm">{{ project.problem }}</p>
          </div>
          <div>
            <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">Outcome</p>
            <p class="text-slate-400 leading-relaxed text-sm border-l-2 border-accent pl-4">
              {{ project.outcome }}
            </p>
          </div>
        </div>

        <!-- Highlights -->
        <div class="mb-8">
          <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">Highlights</p>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li
              v-for="h in project.highlights"
              :key="h"
              class="flex items-start gap-2 text-sm text-slate-400"
            >
              <span class="text-accent mt-0.5 shrink-0">—</span>
              {{ h }}
            </li>
          </ul>
        </div>

        <!-- Stack -->
        <div :class="project.images?.length ? 'mb-8' : ''">
          <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">Stack</p>
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

        <!-- Snapshots -->
        <div v-if="project.images?.length">
          <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">Snapshots</p>
          <div class="flex gap-3 overflow-x-auto pb-2">
            <button
              v-for="(img, i) in project.images"
              :key="i"
              class="shrink-0 group/img relative"
              @click="openLightbox(project.images!, i)"
            >
              <img
                :src="img"
                :alt="`${project.title} screenshot ${i + 1}`"
                class="h-48 w-auto border border-slate-800 object-cover object-top group-hover/img:border-slate-600 transition-colors"
              />
              <div class="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                <span class="opacity-0 group-hover/img:opacity-100 transition-opacity font-mono text-xs text-white uppercase tracking-widest">
                  View
                </span>
              </div>
            </button>
          </div>
        </div>
      </article>
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

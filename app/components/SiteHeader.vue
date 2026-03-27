<script setup lang="ts">
import { site } from '~/utils/data'

const isMenuOpen = ref(false)

const links = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Writing', to: '/writing' },
]

const route = useRoute()
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  },
)
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-canvas/35 backdrop-blur-xl"
  >
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
      <!-- Logo -->
      <NuxtLink
        to="/"
        :aria-label="site.fullName"
        class="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
      >
        <img
          v-if="site.assets.logo"
          :src="site.assets.logo"
          :alt="`${site.fullName} logo`"
          class="h-7 w-auto shrink-0"
        />
        <span class="font-mono text-[15px] text-slate-100 tracking-[0.08em] uppercase">
          {{ site.fullName }}
        </span>
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="relative flex flex-col items-center gap-1.5 font-mono text-xs uppercase tracking-widest transition-colors pb-1"
          :class="route.path.startsWith(link.to) ? 'text-accent' : 'text-slate-400 hover:text-slate-100'"
        >
          {{ link.label }}
          <span
            class="absolute -bottom-0.5 left-0 right-0 h-px transition-all duration-300"
            :class="route.path.startsWith(link.to) ? 'bg-accent opacity-100' : 'bg-transparent opacity-0'"
          />
        </NuxtLink>
        <a
          :href="site.assets.resume"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-slate-100 transition-colors"
        >
          Resume ↗
        </a>
        <NuxtLink
          to="/#contact"
          class="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-canvas transition-all"
        >
          Contact
        </NuxtLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden text-slate-400 hover:text-slate-100 transition-colors p-1"
        :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="square" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="square" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="isMenuOpen"
      class="md:hidden border-t border-slate-800/50 bg-canvas/45 backdrop-blur-xl px-6 py-6 flex flex-col gap-5"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="font-mono text-sm uppercase tracking-widest transition-colors"
        :class="route.path.startsWith(link.to) ? 'text-accent' : 'text-slate-400 hover:text-slate-100'"
      >
        {{ link.label }}
      </NuxtLink>
      <a
        :href="site.assets.resume"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-sm uppercase tracking-widest text-slate-400"
      >
        Resume ↗
      </a>
      <NuxtLink
        to="/#contact"
        class="font-mono text-sm uppercase tracking-widest text-accent"
      >
        Contact
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const mode = usePortfolioMode()
const paletteOpen = useCommandPalette()

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' }
]

const isActive = (to: string) => (to === '/' ? route.path === to : route.path.startsWith(to))
</script>

<template>
  <header class="sticky top-0 z-40 border-b hairline bg-[color:var(--bg)]/74 backdrop-blur-2xl">
    <div class="shell flex h-18 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex min-w-0 items-center gap-4">
        <div class="flex h-10 w-10 items-center justify-center rounded-full border hairline text-xs font-semibold tracking-[0.22em]">
          A
        </div>
        <div class="min-w-0">
          <p class="truncate text-xs font-semibold uppercase tracking-[0.26em]">Almario</p>
          <p class="truncate text-xs text-muted">Full-stack engineer</p>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="text-xs font-semibold uppercase tracking-[0.22em] transition-colors"
          :class="isActive(item.to) ? 'text-[color:var(--text)]' : 'text-muted hover:text-[color:var(--text)]'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden rounded-full border hairline px-3 py-2 text-[0.72rem] font-medium text-muted transition-colors hover:text-[color:var(--text)] lg:inline-flex"
          @click="mode = mode === 'product' ? 'developer' : 'product'"
        >
          {{ mode === 'product' ? 'Product' : 'Developer' }}
        </button>
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border hairline px-3 py-2 text-[0.72rem] font-medium text-muted transition-colors hover:text-[color:var(--text)]"
          @click="paletteOpen = true"
        >
          <span>⌘K</span>
          <span class="hidden sm:inline">Open</span>
        </button>
      </div>
    </div>
  </header>
</template>

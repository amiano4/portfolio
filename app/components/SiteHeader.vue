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
  <header class="sticky top-0 z-40 border-b hairline bg-[color:var(--bg)]/72 backdrop-blur-2xl">
    <div class="shell flex h-20 items-center justify-between gap-4">
      <NuxtLink to="/" class="flex min-w-0 items-center gap-4">
        <div class="flex h-11 w-11 items-center justify-center rounded-full border hairline text-sm font-semibold text-[color:var(--text)]">
          A
        </div>
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold tracking-[0.18em] uppercase">Almario</p>
          <p class="truncate text-xs text-muted">Full-stack product engineering</p>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-medium transition-colors"
          :class="isActive(item.to) ? 'bg-[color:var(--brand-soft)] text-[color:var(--text)]' : 'text-muted hover:text-[color:var(--text)]'"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="hidden rounded-full border hairline px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-[color:var(--text)] lg:inline-flex"
          @click="mode = mode === 'product' ? 'developer' : 'product'"
        >
          {{ mode === 'product' ? 'Product' : 'Developer' }}
        </button>
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full border hairline px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-[color:var(--text)]"
          @click="paletteOpen = true"
        >
          <span>⌘K</span>
          <span class="hidden sm:inline">Navigate</span>
        </button>
      </div>
    </div>
  </header>
</template>

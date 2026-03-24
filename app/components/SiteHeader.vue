<script setup lang="ts">
const route = useRoute()
const mode = usePortfolioMode()
const paletteOpen = useCommandPalette()

const isActive = (to: string) => (to === '/' ? route.path === to : route.path.startsWith(to))
</script>

<template>
  <header class="sticky top-0 z-40 border-b hairline bg-[color:var(--bg)]/90 backdrop-blur-md">
    <div class="shell flex h-12 items-center justify-between gap-4">
      <NuxtLink to="/" class="text-sm font-semibold heading">Almario</NuxtLink>

      <div class="flex items-center gap-4">
        <nav class="hidden items-center gap-4 sm:flex">
          <NuxtLink
            to="/projects"
            class="text-xs transition-colors"
            :class="isActive('/projects') ? 'heading font-medium' : 'text-muted hover:text-[color:var(--text)]'"
          >
            Projects
          </NuxtLink>
          <NuxtLink
            to="/blog"
            class="text-xs transition-colors"
            :class="isActive('/blog') ? 'heading font-medium' : 'text-muted hover:text-[color:var(--text)]'"
          >
            Blog
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            class="hidden border hairline px-2 py-1 text-[0.62rem] text-muted transition hover:text-[color:var(--text)] lg:inline-flex"
            @click="mode = mode === 'product' ? 'developer' : 'product'"
          >
            {{ mode === 'product' ? 'PRD' : 'DEV' }}
          </button>
          <ThemeToggle />
          <button
            type="button"
            class="border hairline px-2 py-1 text-[0.62rem] text-muted transition hover:text-[color:var(--text)]"
            @click="paletteOpen = true"
          >
            ⌘K
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { siteConfig } from '~~/shared/site'

interface CommandAction {
  id: string
  label: string
  description: string
  keywords: string[]
  run: () => void | Promise<void>
}

const paletteOpen = useCommandPalette()
const mode = usePortfolioMode()
const colorMode = useColorMode()
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const actions = computed<CommandAction[]>(() => [
  {
    id: 'home',
    label: 'Go to Home',
    description: 'Hero, workflow, featured work',
    keywords: ['landing', 'index'],
    run: () => navigateTo('/')
  },
  {
    id: 'projects',
    label: 'Open Projects',
    description: 'GitHub-powered repository showcase',
    keywords: ['repos', 'github', 'work'],
    run: () => navigateTo('/projects')
  },
  {
    id: 'blog',
    label: 'Open Blog',
    description: 'Thoughts, patterns, and shipping notes',
    keywords: ['notes', 'writing', 'articles'],
    run: () => navigateTo('/blog')
  },
  {
    id: 'mode',
    label: mode.value === 'product' ? 'Switch to Developer mode' : 'Switch to Product mode',
    description: 'Toggle how the portfolio frames experience',
    keywords: ['toggle', 'mode', 'recruiter', 'developer'],
    run: () => {
      mode.value = mode.value === 'product' ? 'developer' : 'product'
    }
  },
  {
    id: 'theme',
    label: colorMode.value === 'dark' ? 'Switch to Light mode' : 'Switch to Dark mode',
    description: 'Toggle site theme',
    keywords: ['theme', 'dark', 'light'],
    run: toggleTheme
  },
  {
    id: 'github',
    label: 'Open GitHub profile',
    description: siteConfig.githubUrl,
    keywords: ['external', 'profile', 'repositories'],
    run: () => navigateTo(siteConfig.githubUrl, { external: true, open: { target: '_blank' } })
  }
])

const filteredActions = computed(() => {
  const term = query.value.trim().toLowerCase()

  if (!term) {
    return actions.value
  }

  return actions.value.filter((action) => {
    const haystack = [action.label, action.description, ...action.keywords].join(' ').toLowerCase()
    return haystack.includes(term)
  })
})

const close = () => {
  paletteOpen.value = false
  query.value = ''
  selectedIndex.value = 0
}

const runAction = async (action?: CommandAction) => {
  if (!action) {
    return
  }

  await action.run()
  close()
}

watch(paletteOpen, async (isOpen) => {
  if (!isOpen) {
    query.value = ''
    selectedIndex.value = 0
    return
  }

  await nextTick()
  inputRef.value?.focus()
})

watch(filteredActions, (value) => {
  if (selectedIndex.value > value.length - 1) {
    selectedIndex.value = 0
  }
})

const onKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    paletteOpen.value = !paletteOpen.value
    return
  }

  if (!paletteOpen.value) {
    return
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    selectedIndex.value = (selectedIndex.value + 1) % Math.max(filteredActions.value.length, 1)
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    selectedIndex.value =
      (selectedIndex.value - 1 + Math.max(filteredActions.value.length, 1)) % Math.max(filteredActions.value.length, 1)
  }

  if (event.key === 'Enter') {
    event.preventDefault()
    void runAction(filteredActions.value[selectedIndex.value])
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="paletteOpen" class="fixed inset-0 z-50 bg-slate-950/50 p-4 backdrop-blur-sm" @click.self="close">
        <div class="mx-auto mt-16 w-full max-w-2xl overflow-hidden rounded-3xl surface-strong">
          <div class="border-b hairline px-5 py-4">
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              class="w-full bg-transparent text-base outline-none placeholder:text-muted"
              placeholder="Jump to projects, blog, theme, mode..."
            >
          </div>
          <div class="max-h-[26rem] overflow-y-auto p-2">
            <button
              v-for="(action, index) in filteredActions"
              :key="action.id"
              type="button"
              class="flex w-full items-start justify-between rounded-2xl px-4 py-3 text-left transition-colors"
              :class="index === selectedIndex ? 'bg-[color:var(--brand-soft)]' : 'hover:bg-black/5 dark:hover:bg-white/5'"
              @mouseenter="selectedIndex = index"
              @click="runAction(action)"
            >
              <div>
                <p class="font-medium">{{ action.label }}</p>
                <p class="mt-1 text-sm text-muted">{{ action.description }}</p>
              </div>
              <span class="text-xs text-muted">↵</span>
            </button>

            <div v-if="!filteredActions.length" class="px-4 py-8 text-sm text-muted">
              No matches. Try “projects”, “blog”, or “theme”.
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

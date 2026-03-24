<script setup lang="ts">
import { siteConfig } from '~~/shared/site'

interface CommandAction {
  id: string
  label: string
  run: () => void | Promise<void>
}

const paletteOpen = useCommandPalette()
const mode = usePortfolioMode()
const colorMode = useColorMode()
const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const actions = computed<CommandAction[]>(() => [
  { id: 'home', label: 'Home', run: () => navigateTo('/') },
  { id: 'projects', label: 'Projects', run: () => navigateTo('/projects') },
  { id: 'blog', label: 'Blog', run: () => navigateTo('/blog') },
  { id: 'mode', label: mode.value === 'product' ? 'Switch to Developer' : 'Switch to Product', run: () => { mode.value = mode.value === 'product' ? 'developer' : 'product' } },
  { id: 'theme', label: colorMode.value === 'dark' ? 'Light mode' : 'Dark mode', run: () => { colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark' } },
  { id: 'github', label: 'GitHub', run: () => navigateTo(siteConfig.githubUrl, { external: true, open: { target: '_blank' } }) }
])

const filteredActions = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) return actions.value
  return actions.value.filter((a) => a.label.toLowerCase().includes(term))
})

const close = () => { paletteOpen.value = false; query.value = ''; selectedIndex.value = 0 }
const runAction = async (action?: CommandAction) => { if (!action) return; await action.run(); close() }

watch(paletteOpen, async (open) => {
  if (!open) { query.value = ''; selectedIndex.value = 0; return }
  await nextTick(); inputRef.value?.focus()
})
watch(filteredActions, (v) => { if (selectedIndex.value > v.length - 1) selectedIndex.value = 0 })

const onKeyDown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); paletteOpen.value = !paletteOpen.value; return }
  if (!paletteOpen.value) return
  if (event.key === 'Escape') { event.preventDefault(); close(); return }
  if (event.key === 'ArrowDown') { event.preventDefault(); selectedIndex.value = (selectedIndex.value + 1) % Math.max(filteredActions.value.length, 1) }
  if (event.key === 'ArrowUp') { event.preventDefault(); selectedIndex.value = (selectedIndex.value - 1 + Math.max(filteredActions.value.length, 1)) % Math.max(filteredActions.value.length, 1) }
  if (event.key === 'Enter') { event.preventDefault(); void runAction(filteredActions.value[selectedIndex.value]) }
}

onMounted(() => { window.addEventListener('keydown', onKeyDown) })
onUnmounted(() => { window.removeEventListener('keydown', onKeyDown) })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-100"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-75"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="paletteOpen" class="fixed inset-0 z-50 bg-black/50 p-4" @click.self="close">
        <div class="mx-auto mt-24 w-full max-w-md overflow-hidden border hairline bg-[color:var(--bg)]">
          <div class="border-b hairline px-4 py-3">
            <input ref="inputRef" v-model="query" type="text" class="w-full bg-transparent text-sm outline-none placeholder:text-muted" placeholder="Search...">
          </div>
          <div class="max-h-64 overflow-y-auto p-1">
            <button
              v-for="(action, index) in filteredActions"
              :key="action.id"
              type="button"
              class="flex w-full items-center justify-between px-3 py-2 text-left text-sm transition"
              :class="index === selectedIndex ? 'bg-[color:var(--bg-panel)]' : ''"
              @mouseenter="selectedIndex = index"
              @click="runAction(action)"
            >
              <span>{{ action.label }}</span>
              <span class="text-[0.62rem] text-muted">↵</span>
            </button>
            <div v-if="!filteredActions.length" class="px-3 py-4 text-xs text-muted">No results</div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

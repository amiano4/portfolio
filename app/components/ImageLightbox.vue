<script setup lang="ts">
const props = defineProps<{
  images: string[]
  initial: number
  alt?: string
}>()

const emit = defineEmits<{
  close: []
}>()

const current = ref(props.initial)

const prev = () => {
  current.value = (current.value - 1 + props.images.length) % props.images.length
}

const next = () => {
  current.value = (current.value + 1) % props.images.length
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <!-- Close -->
      <button
        class="absolute top-5 right-5 font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors flex items-center gap-2"
        @click="emit('close')"
      >
        Close <span class="text-base leading-none">✕</span>
      </button>

      <!-- Counter -->
      <div
        v-if="images.length > 1"
        class="absolute top-5 left-1/2 -translate-x-1/2 font-mono text-xs text-slate-600"
      >
        {{ current + 1 }} / {{ images.length }}
      </div>

      <!-- Prev -->
      <button
        v-if="images.length > 1"
        class="absolute left-4 md:left-8 text-slate-500 hover:text-slate-100 transition-colors p-3"
        @click="prev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="square" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Image -->
      <div class="max-w-3xl max-h-[85vh] mx-16 flex items-center justify-center">
        <img
          :src="images[current]"
          :alt="`${alt ?? 'Screenshot'} ${current + 1}`"
          class="max-w-full max-h-[85vh] object-contain border border-slate-800"
        />
      </div>

      <!-- Next -->
      <button
        v-if="images.length > 1"
        class="absolute right-4 md:right-8 text-slate-500 hover:text-slate-100 transition-colors p-3"
        @click="next"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="square" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <!-- Dot indicators -->
      <div
        v-if="images.length > 1"
        class="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <button
          v-for="(_, i) in images"
          :key="i"
          class="w-1.5 h-1.5 rounded-full transition-colors"
          :class="i === current ? 'bg-accent' : 'bg-slate-700'"
          @click="current = i"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  imgClass?: string
}>()

const loaded = ref(false)
const imgEl = ref<HTMLImageElement>()

onMounted(() => {
  // handle already-cached images where @load won't fire
  if (imgEl.value?.complete) loaded.value = true
})
</script>

<template>
  <div class="relative">
    <img
      ref="imgEl"
      :src="src"
      :alt="alt ?? ''"
      :class="imgClass"
      @load="loaded = true"
      @error="loaded = true"
    />
    <!-- Skeleton fades out once image is loaded -->
    <div
      class="absolute inset-0 bg-slate-800 animate-pulse transition-opacity duration-500 pointer-events-none"
      :class="loaded ? 'opacity-0' : 'opacity-100'"
    />
  </div>
</template>

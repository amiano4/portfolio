<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  imgClass?: string
}>()

const loaded = ref(false)
const imgEl = ref<HTMLImageElement>()

onMounted(() => {
  if (imgEl.value?.complete) loaded.value = true
})
</script>

<template>
  <div class="relative bg-slate-800/60">
    <img
      ref="imgEl"
      :src="src"
      :alt="alt ?? ''"
      :class="imgClass"
      @load="loaded = true"
      @error="loaded = true"
    />
  </div>
</template>

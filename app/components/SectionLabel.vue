<script setup lang="ts">
defineProps<{
  number: string
  label: string
}>()
</script>

<template>
  <div class="flex items-center gap-4 mb-16">
    <span class="font-mono text-sm font-medium text-accent shrink-0">{{ number }}</span>
    <div class="flex-1 h-px bg-slate-800"></div>
    <span class="font-mono text-xs uppercase tracking-[0.25em] text-slate-500 shrink-0">{{
      label
    }}</span>
  </div>
</template>

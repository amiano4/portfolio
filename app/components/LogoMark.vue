<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>

<template>
  <svg
    :width="size ?? 32"
    :height="size ?? 32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" fill="#0EA5E9" />
    <text
      x="16"
      y="22"
      font-family="'Space Grotesk', 'Inter', ui-sans-serif, sans-serif"
      font-weight="700"
      font-size="13"
      letter-spacing="-0.3"
      fill="#080C14"
      text-anchor="middle"
    >AM</text>
  </svg>
</template>

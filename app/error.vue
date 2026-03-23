<script setup lang="ts">
defineProps<{
  error: {
    statusCode?: number
    statusMessage?: string
    message?: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="shell flex min-h-screen items-center justify-center py-16">
    <div class="surface max-w-2xl rounded-[2rem] p-8 text-center sm:p-10">
      <p class="eyebrow">Something went wrong</p>
      <h1 class="mt-4 text-4xl font-semibold tracking-tight">
        {{ error.statusCode || 500 }}
      </h1>
      <p class="mt-4 text-base leading-8 text-muted">
        {{ error.statusMessage || error.message || 'Unexpected application error.' }}
      </p>
      <button type="button" class="button-primary mt-8" @click="handleError">Back home</button>
    </div>
  </div>
</template>

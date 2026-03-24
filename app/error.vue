<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number
    statusMessage: string
    message: string
  }
}>()
</script>

<template>
  <div class="min-h-screen bg-canvas flex flex-col items-center justify-center px-6 text-center">
    <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">
      Error {{ error.statusCode }}
    </p>
    <h1 class="text-5xl font-bold text-slate-100 mb-4">
      {{ error.statusCode === 404 ? 'Page not found.' : 'Something went wrong.' }}
    </h1>
    <p class="text-slate-400 mb-10 max-w-sm">
      {{
        error.statusCode === 404
          ? "That page doesn't exist or has been moved."
          : 'An unexpected error occurred.'
      }}
    </p>
    <NuxtLink
      to="/"
      class="font-mono text-sm uppercase tracking-widest px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-canvas transition-all"
    >
      ← Back Home
    </NuxtLink>
  </div>
</template>

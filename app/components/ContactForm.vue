<script setup lang="ts">
type State = 'idle' | 'loading' | 'success' | 'error'

const state = ref<State>('idle')

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const validate = () => {
  errors.name = form.name.trim() ? '' : 'Name is required.'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ? ''
    : 'A valid email is required.'
  errors.subject = form.subject.trim() ? '' : 'Subject is required.'
  errors.message = form.message.trim().length >= 10
    ? ''
    : 'Message must be at least 10 characters.'
  return !errors.name && !errors.email && !errors.subject && !errors.message
}

const submit = async () => {
  if (!validate()) return

  state.value = 'loading'

  // Simulate a network call — replace with real endpoint later
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // TODO: wire to actual API
  state.value = 'success'
}

const reset = () => {
  state.value = 'idle'
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  errors.name = ''
  errors.email = ''
  errors.subject = ''
  errors.message = ''
}
</script>

<template>
  <!-- Success state -->
  <div v-if="state === 'success'" class="border border-slate-800 p-10 flex flex-col items-start gap-5">
    <div class="flex items-center gap-3">
      <span class="w-8 h-8 rounded-full bg-emerald-400/10 flex items-center justify-center shrink-0">
        <svg class="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="square" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <p class="font-mono text-xs uppercase tracking-widest text-emerald-400">Message sent</p>
    </div>
    <p class="text-slate-300 leading-relaxed">
      Got it. I'll get back to you as soon as I can.
    </p>
    <button
      class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
      @click="reset"
    >
      Send another →
    </button>
  </div>

  <!-- Form -->
  <form v-else class="flex flex-col gap-6" @submit.prevent="submit" novalidate>
    <!-- Name + Email row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Name -->
      <div class="flex flex-col gap-2">
        <label class="font-mono text-xs uppercase tracking-widest text-slate-500">
          Name
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Your name"
          autocomplete="name"
          class="bg-surface border px-4 py-3 text-slate-100 placeholder:text-slate-700 font-sans text-sm outline-none transition-colors"
          :class="errors.name ? 'border-red-500/60 focus:border-red-400' : 'border-slate-800 focus:border-accent'"
        />
        <p v-if="errors.name" class="font-mono text-xs text-red-400">{{ errors.name }}</p>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-2">
        <label class="font-mono text-xs uppercase tracking-widest text-slate-500">
          Email
        </label>
        <input
          v-model="form.email"
          type="email"
          placeholder="your@email.com"
          autocomplete="email"
          class="bg-surface border px-4 py-3 text-slate-100 placeholder:text-slate-700 font-sans text-sm outline-none transition-colors"
          :class="errors.email ? 'border-red-500/60 focus:border-red-400' : 'border-slate-800 focus:border-accent'"
        />
        <p v-if="errors.email" class="font-mono text-xs text-red-400">{{ errors.email }}</p>
      </div>
    </div>

    <!-- Subject -->
    <div class="flex flex-col gap-2">
      <label class="font-mono text-xs uppercase tracking-widest text-slate-500">
        Subject
      </label>
      <input
        v-model="form.subject"
        type="text"
        placeholder="What's this about?"
        class="bg-surface border px-4 py-3 text-slate-100 placeholder:text-slate-700 font-sans text-sm outline-none transition-colors"
        :class="errors.subject ? 'border-red-500/60 focus:border-red-400' : 'border-slate-800 focus:border-accent'"
      />
      <p v-if="errors.subject" class="font-mono text-xs text-red-400">{{ errors.subject }}</p>
    </div>

    <!-- Message -->
    <div class="flex flex-col gap-2">
      <label class="font-mono text-xs uppercase tracking-widest text-slate-500">
        Message
      </label>
      <textarea
        v-model="form.message"
        rows="5"
        placeholder="What's on your mind?"
        class="bg-surface border px-4 py-3 text-slate-100 placeholder:text-slate-700 font-sans text-sm outline-none transition-colors resize-none"
        :class="errors.message ? 'border-red-500/60 focus:border-red-400' : 'border-slate-800 focus:border-accent'"
      />
      <p v-if="errors.message" class="font-mono text-xs text-red-400">{{ errors.message }}</p>
    </div>

    <!-- Submit -->
    <div class="flex items-center gap-6">
      <button
        type="submit"
        :disabled="state === 'loading'"
        class="inline-flex items-center gap-3 bg-accent text-canvas font-mono text-sm uppercase tracking-widest px-7 py-3.5 hover:bg-accent-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          v-if="state === 'loading'"
          class="w-4 h-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
        </svg>
        {{ state === 'loading' ? 'Sending...' : 'Send Message' }}
      </button>

      <p v-if="state === 'error'" class="font-mono text-xs text-red-400">
        Something went wrong. Try again.
      </p>
    </div>
  </form>
</template>

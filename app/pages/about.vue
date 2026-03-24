<script setup lang="ts">
useSeoMeta({
  title: 'About',
  description:
    'Full-Stack Developer. Self-made, production-proven, and operating well beyond his years.',
})

const stack = {
  'Primary — production use': ['PHP', 'Laravel', 'Symfony', 'JavaScript', 'TypeScript', 'Vue', 'Quasar', 'Nuxt'],
  'Also in production': ['Node.js', 'MySQL', 'Docker', 'GCP', 'AWS', 'GitHub Actions'],
  'Tools': ['Git', 'Linux / Ubuntu', 'Postman', 'PHPUnit / Pest', 'Figma', 'Vite'],
  'Familiar': ['React', 'Java', 'Spring Boot', 'MongoDB', 'Python', 'Redis'],
}
</script>

<template>
  <div>
    <!-- ─── PAGE HEADER ───────────────────────────────────────────────── -->
    <div class="max-w-6xl mx-auto px-6 py-20">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-4">About</p>
      <h1 class="text-5xl md:text-6xl font-bold text-slate-100 leading-tight mb-6">
        Who I am.
      </h1>
      <p class="text-slate-400 max-w-2xl leading-relaxed text-lg">
        Full-stack developer. I got into real engineering work early, moved fast, and haven't
        slowed down since.
      </p>
    </div>

    <div class="border-t border-slate-800/50">
      <!-- ─── THE STORY ─────────────────────────────────────────────── -->
      <section class="py-20">
        <div class="max-w-6xl mx-auto px-6">
          <SectionLabel number="01" label="The Story" />

          <div class="max-w-2xl space-y-5 text-slate-400 leading-relaxed">
            <p>
              I was already writing code for real clients while still in school — small projects,
              but real deadlines and real people depending on the output. That early exposure led
              to an internship that turned into something more before I even graduated.
            </p>
            <p>
              Early on, I worked with a US-based company — started at the bottom, moved up fast,
              and left having held engineering and leadership roles I had no business holding at
              that age. That pattern has repeated itself since.
            </p>
            <p>
              Today I work full-time as a developer for an Australian company, contributing to
              enterprise systems used in production at scale. I also take on select freelance and
              consulting work on the side. I operate as a senior engineer regardless of what
              the title says.
            </p>
          </div>
        </div>
      </section>

      <!-- ─── HOW I THINK ───────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div class="max-w-6xl mx-auto px-6">
          <SectionLabel number="02" label="How I Think" />

          <div class="max-w-2xl space-y-5 text-slate-400 leading-relaxed">
            <p>
              Decision-making is the most important part of engineering. Every technical choice is
              a bet — on scale, on maintainability, on what the system will need to do six months
              from now. I take that seriously.
            </p>
            <p>
              I start simple. The most complex solution is rarely the right one. I build what solves
              the problem, prove it works, then optimize when reality gives me a reason to — not
              before. Premature optimization is just debt with extra steps.
            </p>
            <p>
              I take full ownership of what I ship. That means I don't merge because the tests pass.
              I merge because I understand the problem, the solution, and the edge cases. If something
              breaks in production, I want to understand exactly why — and I usually already do.
            </p>
            <p>
              Technical debt isn't bad luck. It's a choice. Someone decided moving fast mattered more
              than moving right. I choose differently. Every time.
            </p>
          </div>
        </div>
      </section>

      <!-- ─── STACK ─────────────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div class="max-w-6xl mx-auto px-6">
          <SectionLabel number="03" label="Stack" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div v-for="(items, category) in stack" :key="category">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-4">
                {{ category }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="item in items"
                  :key="item"
                  class="font-mono text-xs text-slate-400 border border-slate-800 px-3 py-1.5 hover:border-slate-600 hover:text-slate-100 transition-colors"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── CURRENTLY ─────────────────────────────────────────────── -->
      <section class="py-20 border-t border-slate-800/50">
        <div class="max-w-6xl mx-auto px-6">
          <SectionLabel number="04" label="Currently" />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800">
            <div class="bg-canvas p-8">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">
                Full-Time
              </p>
              <p class="text-slate-100 font-semibold mb-1">Full-Stack Developer</p>
              <p class="text-slate-400 text-sm">Cloudesk Pty Ltd, Sydney AU</p>
            </div>
            <div class="bg-canvas p-8">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">
                Based In
              </p>
              <p class="text-slate-100 font-semibold mb-1">Philippines</p>
              <p class="text-slate-400 text-sm">Remote-first. Working across timezones.</p>
            </div>
            <div class="bg-canvas p-8">
              <p class="font-mono text-xs uppercase tracking-widest text-slate-600 mb-3">
                Open To
              </p>
              <p class="text-slate-100 font-semibold mb-1">Select Engagements</p>
              <p class="text-slate-400 text-sm">Freelance, consulting, and the right full-time roles.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

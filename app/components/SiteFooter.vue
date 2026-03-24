<template>
  <footer class="border-t border-slate-800 mt-24">
    <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <!-- Left -->
      <div>
        <p class="font-semibold text-slate-100">
          Almario<span class="text-accent">.</span>
        </p>
        <p class="font-mono text-xs text-slate-500 mt-1 uppercase tracking-widest">
          Full-Stack Developer
        </p>
      </div>

      <!-- Right -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <a
          href="https://github.com/amiano4"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/almariomiano"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="mailto:almariomiano@gmail.com"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          Email
        </a>
        <a
          href="/resume.pdf"
          download
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          Résumé ↓
        </a>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-6 pb-8">
      <p class="font-mono text-xs text-slate-700 uppercase tracking-widest">
        © {{ new Date().getFullYear() }} Almario Miano. All rights reserved.
      </p>
    </div>
  </footer>
</template>

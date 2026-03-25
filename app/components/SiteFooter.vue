<script setup lang="ts">
import { computed } from "vue";
import { site } from "~/utils/data";

const runtimeConfig = useRuntimeConfig();

const deployedAtLabel = computed(() => {
  const deployedAt = runtimeConfig.public.deployedAt;

  if (!deployedAt) {
    return "";
  }

  const date = new Date(deployedAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `v. UTC+8 ${getPart("day")}/${getPart("month")}/${getPart("year")} ${getPart("hour")}:${getPart("minute")}:${getPart("second")}`;
});
</script>

<template>
  <footer class="border-t border-slate-800 mt-24">
    <div
      class="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
    >
      <!-- Left -->
      <div>
        <div class="flex items-center gap-2.5 mb-2">
          <LogoMark :size="24" />
          <p class="font-semibold text-slate-100">
            {{ site.name }}<span class="text-accent">.</span>
          </p>
        </div>
        <p class="font-mono text-xs text-slate-500 uppercase tracking-widest">
          {{ site.title }}
        </p>
      </div>

      <!-- Right -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <a
          :href="site.contact.github"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          GitHub
        </a>
        <a
          :href="site.contact.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          LinkedIn
        </a>
        <a
          :href="`mailto:${site.contact.email}`"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          Email
        </a>
        <a
          :href="site.assets.resume"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-slate-100 transition-colors"
        >
          Resume ↗
        </a>
      </div>
    </div>

    <div
      class="max-w-6xl mx-auto px-6 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
    >
      <div>
        <p class="font-mono text-xs text-slate-700 uppercase tracking-widest">
          © {{ new Date().getFullYear() }} {{ site.fullName }}. All rights
          reserved.
        </p>
        <p
          v-if="deployedAtLabel"
          class="mt-2 font-mono text-[11px] text-slate-700 tracking-widest"
        >
          {{ deployedAtLabel }}
        </p>
      </div>
      <a
        v-if="site.assets.repo"
        :href="site.assets.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="font-mono text-xs uppercase tracking-widest text-slate-700 hover:text-accent transition-colors"
      >
        Fork this repo ↗
      </a>
    </div>
  </footer>
</template>

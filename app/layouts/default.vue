<template>
  <div class="min-h-screen relative text-slate-100">
    <ClientOnly>
      <BackgroundFx />
      <CursorTrail />
    </ClientOnly>

    <div class="min-h-screen flex flex-col relative z-10">
      <SiteHeader />
      <main class="flex-1 pt-16 relative">
        <slot />
      </main>
      <SiteFooter />
    </div>
  </div>
</template>

<template>
  <div class="min-h-screen flex flex-col text-slate-100">
    <SiteHeader />
    <main class="flex-1 pt-16 relative">
      <slot />
    </main>
    <SiteFooter />
    <ClientOnly>
      <BackgroundFx />
      <CursorTrail />
    </ClientOnly>
  </div>
</template>

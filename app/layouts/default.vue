<template>
  <div class="min-h-screen flex flex-col bg-canvas text-slate-100">
    <SiteHeader />
    <main class="flex-1 pt-16 relative">
      <slot />
    </main>
    <SiteFooter />
    <ClientOnly>
      <CursorTrail />
    </ClientOnly>
  </div>
</template>

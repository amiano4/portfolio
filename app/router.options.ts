import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      // Cross-page navigation — wait for DOM to render before scrolling
      if (from.path !== to.path) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ el: to.hash, top: 88, behavior: 'smooth' })
          }, 400)
        })
      }

      return { el: to.hash, top: 88, behavior: 'smooth' }
    }

    return { top: 0, behavior: 'smooth' }
  },
}

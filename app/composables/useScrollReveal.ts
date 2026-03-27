// Must match .page-enter-active transition duration in main.css
const PAGE_ENTER_MS = 180

export function useScrollReveal() {
  onMounted(() => {
    const vh = window.innerHeight

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      const itemDelay = parseInt(el.getAttribute('data-reveal-delay') || '0')
      const { top, bottom } = el.getBoundingClientRect()
      const inViewport = bottom > 0 && top < vh - 40

      if (inViewport) {
        // CSS animation: delay starts AFTER page enter transition so animation is visible.
        // animation-fill-mode: both keeps from-state during delay (el invisible with page).
        ;(el as HTMLElement).style.animationDelay = `${PAGE_ENTER_MS + itemDelay}ms`
        el.classList.add('reveal-anim')
      }
      else {
        // Below fold: transition-based reveal on scroll via IO
        el.classList.add('will-reveal')
        if (itemDelay) (el as HTMLElement).style.transitionDelay = `${itemDelay}ms`
        observer.observe(el)
      }
    })
  })
}

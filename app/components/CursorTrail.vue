<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)
const spriteRef = ref<HTMLDivElement | null>(null)

let rafId = 0
let cleanupHandlers: (() => void)[] = []

onMounted(() => {
  const canvas = canvasRef.value
  const sprite = spriteRef.value
  if (!canvas || !sprite) return

  // Skip on touch/stylus-only and reduced-motion
  if (!window.matchMedia('(pointer: fine)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const ctx = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1

  const resize = () => {
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
  }
  resize()

  let mx = -300, my = -300   // real mouse
  let fx = -300, fy = -300   // follower (lerped)

  interface Pt { x: number; y: number; t: number }
  const trail: Pt[] = []
  const LERP = 0.12
  const TRAIL_MS = 700

  const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
  const onResize = () => resize()

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize', onResize)

  // Sprite SVG paths — arrow (default) and hand (pointer)
  const ARROW_PATH = 'M1 1 L1 12 L4 9 L6 15 L8 14 L5.5 8.5 L10 8.5 Z'
  const HAND_PATH  = 'M5 1 C5 0.4 5.6 0 6 0.5 L6 6 C6.4 5.5 7 5.4 7.5 5.8 C8 5.4 8.6 5.6 8.8 6.2 C9.3 5.9 10 6.2 10 7 L10 11 C10 13.2 8.2 15 6 15 L4 15 C2.3 15 1 13.7 1 12 L1 6 C1 5.4 1.6 5 2 5.4 L2 1 C2 0.4 2.6 0 3 0.5 L3 5 C3.4 4.6 4 4.6 4.4 5 L5 5 Z'

  const svgPath = sprite.querySelector('path')!

  let lastCursorMode = ''

  const loop = () => {
    const now = performance.now()

    // Smooth-follow with lerp
    fx += (mx - fx) * LERP
    fy += (my - fy) * LERP

    // Detect cursor mode under real pointer and swap sprite
    const elUnder = document.elementFromPoint(mx, my)
    const cursorMode = elUnder ? window.getComputedStyle(elUnder).cursor : 'default'
    if (cursorMode !== lastCursorMode) {
      lastCursorMode = cursorMode
      const isPointer = cursorMode === 'pointer'
      svgPath.setAttribute('d', isPointer ? HAND_PATH : ARROW_PATH)
      sprite.style.opacity = isPointer ? '0.9' : '1'
    }

    // Move sprite — arrow tip at (1,1), hand at roughly (3,0)
    const offsetX = lastCursorMode === 'pointer' ? -3 : -1
    const offsetY = lastCursorMode === 'pointer' ? 0 : -1
    sprite.style.transform = `translate(${fx + offsetX}px, ${fy + offsetY}px)`

    // Record trail point
    trail.push({ x: fx, y: fy, t: now })

    // Prune expired points
    const cutoff = now - TRAIL_MS
    let i = 0
    while (i < trail.length && trail[i].t < cutoff) i++
    if (i > 0) trail.splice(0, i)

    // --- Draw ---
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

    for (let j = 1; j < trail.length; j++) {
      const alpha = 1 - (now - trail[j].t) / TRAIL_MS
      const p0 = trail[j - 1]
      const p1 = trail[j]

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Pass 1: soft wide glow halo
      ctx.beginPath()
      ctx.moveTo(p0.x, p0.y)
      ctx.lineTo(p1.x, p1.y)
      ctx.strokeStyle = `rgba(14,165,233,${alpha * 0.18})`
      ctx.lineWidth = 7
      ctx.shadowBlur = 0
      ctx.stroke()

      // Pass 2: thin bright core with bloom
      ctx.beginPath()
      ctx.moveTo(p0.x, p0.y)
      ctx.lineTo(p1.x, p1.y)
      ctx.strokeStyle = `rgba(56,189,248,${alpha * 0.88})`
      ctx.lineWidth = 1.5
      ctx.shadowBlur = 10
      ctx.shadowColor = '#0EA5E9'
      ctx.stroke()
    }

    rafId = requestAnimationFrame(loop)
  }

  loop()

  cleanupHandlers = [
    () => cancelAnimationFrame(rafId),
    () => window.removeEventListener('mousemove', onMouseMove),
    () => window.removeEventListener('resize', onResize),
  ]
})

onUnmounted(() => cleanupHandlers.forEach(fn => fn()))
</script>

<template>
  <!-- Trail canvas — sits below the sprite -->
  <canvas
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z-[9996]"
  />

  <!-- Lagged cursor sprite -->
  <div
    ref="spriteRef"
    class="pointer-events-none fixed top-0 left-0 z-[9997] will-change-transform"
  >
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1 L1 12 L4 9 L6 15 L8 14 L5.5 8.5 L10 8.5 Z"
        fill="rgba(56,189,248,0.65)"
        stroke="rgba(14,165,233,0.55)"
        stroke-width="0.6"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

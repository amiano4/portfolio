<script setup lang="ts">
const glowRef   = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let rafId = 0
const cleanupFns: (() => void)[] = []

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const glow   = glowRef.value!
  const canvas = canvasRef.value!
  const ctx    = canvas.getContext('2d')!
  const dpr    = window.devicePixelRatio || 1

  const GLOW_SIZE  = 420   // px diameter of the glow blob
  const GLOW_LERP  = 0.05  // much slower than cursor trail (0.12) — feels like ambient light
  const PARTICLE_N = 60

  // DPR-aware canvas
  const resize = () => {
    const w = window.innerWidth, h = window.innerHeight
    canvas.width  = w * dpr
    canvas.height = h * dpr
    canvas.style.width  = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
  }
  resize()

  // Glow position — starts centered, follows mouse lazily
  let mx = window.innerWidth  / 2
  let my = window.innerHeight / 2
  let gx = mx, gy = my

  // Particles — tiny drifting dots
  interface Dot {
    x: number; y: number; r: number; alpha: number
    vx: number; vy: number
    nvx: number; nvy: number
  }
  const dots: Dot[] = Array.from({ length: PARTICLE_N }, () => {
    const nvy = -(Math.random() * 0.4 + 0.1)
    const nvx =  (Math.random() - 0.5) * 0.3
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.35 + 0.1,
      vx: nvx, vy: nvy,
      nvx, nvy,
    }
  })

  const FLOW_INJECT = 0.02  // how much scroll momentum enters the fluid field
  const FLOW_DAMP   = 0.9   // how long the shared flow momentum coasts
  const VISCOSITY   = 0.12  // how quickly particles return to natural drift
  let lastScrollY   = window.scrollY
  let flowVy        = 0

  const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
  const onResize    = () => resize()
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize',    onResize)

  const loop = () => {
    const w = window.innerWidth, h = window.innerHeight

    // Lazy glow follow
    gx += (mx - gx) * GLOW_LERP
    gy += (my - gy) * GLOW_LERP
    glow.style.transform = `translate(${gx - GLOW_SIZE / 2}px, ${gy - GLOW_SIZE / 2}px)`

    // Scroll injects momentum into a shared fluid flow field
    const scrollDelta = window.scrollY - lastScrollY
    lastScrollY = window.scrollY
    flowVy += scrollDelta * FLOW_INJECT
    flowVy *= FLOW_DAMP

    ctx.clearRect(0, 0, w, h)
    for (const d of dots) {
      // Fluid advection: particles inherit some of the scrolling flow
      d.vy += flowVy * (0.75 + d.r * 0.08)

      // Viscous drag: smoothly return toward natural drift, no bounce
      d.vx += (d.nvx - d.vx) * 0.04
      d.vy += (d.nvy - d.vy) * VISCOSITY

      // Integrate position
      d.x += d.vx
      d.y += d.vy

      if (d.y < -4)    { d.y = h + 4; d.x = Math.random() * w }
      if (d.y > h + 4) { d.y = -4;   d.x = Math.random() * w }
      if (d.x < -4)     d.x = w + 4
      if (d.x > w + 4)  d.x = -4

      ctx.beginPath()
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(14,165,233,${d.alpha})`
      ctx.fill()
    }

    rafId = requestAnimationFrame(loop)
  }

  loop()

  cleanupFns.push(
    () => cancelAnimationFrame(rafId),
    () => window.removeEventListener('mousemove', onMouseMove),
    () => window.removeEventListener('resize',    onResize),
  )
})

onUnmounted(() => cleanupFns.forEach(fn => fn()))
</script>

<template>
  <!-- z-index: -1 keeps this behind all page content but above the body background -->
  <div class="pointer-events-none fixed inset-0" style="z-index: -1;">
    <!-- Particle drift canvas -->
    <canvas ref="canvasRef" class="absolute inset-0" />

    <!-- Mouse-reactive ambient glow — same accent color as cursor trail, much slower lerp -->
    <div
      ref="glowRef"
      class="absolute rounded-full"
      :style="{
        width:  '420px',
        height: '420px',
        background: 'radial-gradient(circle, rgba(14,165,233,0.13) 0%, transparent 70%)',
      }"
    />
  </div>
</template>

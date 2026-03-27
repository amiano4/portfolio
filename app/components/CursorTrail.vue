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

  // Sprite SVG paths keyed by cursor type
  const PATHS: Record<string, { d: string; ox: number; oy: number }> = {
    // Arrow (default)
    default: {
      d:  'M1 1 L1 12 L4 9 L6 15 L8 14 L5.5 8.5 L10 8.5 Z',
      ox: -1, oy: -1,
    },
    // Pointing hand
    pointer: {
      d:  'M6 1 C5.4 1 5 1.5 5 2.2 L5 8 L3.5 8 C3 8 2.5 8.5 2.5 9 L2.5 12 C2.5 13.7 3.9 15 5.5 15 L7.5 15 C9.3 15 9.5 13.5 9.5 12 L9.5 9 C9.5 8.5 9 8 8.5 8 L7 8 L7 2.2 C7 1.5 6.6 1 6 1 Z',
      ox: -5, oy: -1,
    },
    // I-beam (text cursor)
    text: {
      d:  'M3 2.5 H9 V4 H7 V12 H9 V13.5 H3 V12 H5 V4 H3 Z',
      ox: -6, oy: -7,
    },
    // Circle with line (not-allowed / no-drop)
    'not-allowed': {
      d:  'M6 1 C3.2 1 1 3.2 1 6 C1 8.8 3.2 11 6 11 C8.8 11 11 8.8 11 6 C11 3.2 8.8 1 6 1 Z M3 8.5 L9 3.5',
      ox: -5, oy: -5,
    },
    // Crosshair
    crosshair: {
      d:  'M6 1 L6 4 M6 8 L6 11 M1 6 L4 6 M8 6 L11 6 M5 6 C5 5.4 5.4 5 6 5 C6.6 5 7 5.4 7 6 C7 6.6 6.6 7 6 7 C5.4 7 5 6.6 5 6 Z',
      ox: -5, oy: -5,
    },
  }

  // Aliases that map to existing paths
  const ALIAS: Record<string, string> = {
    auto: 'default', grab: 'pointer', grabbing: 'pointer',
    'vertical-text': 'text', 'no-drop': 'not-allowed', copy: 'default',
    move: 'default', cell: 'crosshair',
  }

  const svgEl   = sprite.querySelector('svg')!
  const svgPath = sprite.querySelector('path')!

  const applySprite = (key: string) => {
    const resolved = PATHS[key] ?? PATHS[ALIAS[key]] ?? PATHS.default
    svgPath.setAttribute('d', resolved.d)
    // crosshair / not-allowed look better slightly larger
    const big = (key === 'crosshair' || key === 'not-allowed')
    svgEl.setAttribute('width',  big ? '14' : '12')
    svgEl.setAttribute('height', big ? '14' : '16')
    svgEl.setAttribute('viewBox', big ? '0 0 12 12' : '0 0 12 16')
  }

  let lastCursorKey = ''
  applySprite('default')

  const loop = () => {
    const now = performance.now()

    // Smooth-follow with lerp
    fx += (mx - fx) * LERP
    fy += (my - fy) * LERP

    // Detect cursor under real pointer and swap sprite
    const elUnder   = document.elementFromPoint(mx, my)
    const rawCursor = elUnder ? window.getComputedStyle(elUnder).cursor : 'default'
    // Strip url() fallbacks — take the last keyword token
    let cursorKey = rawCursor.split(/[\s,]+/).findLast(t => !/^url\(/.test(t)) ?? 'default'

    // browsers render cursor:auto as I-beam over selectable text nodes —
    // replicate that: if computed cursor is auto/default, check the tag
    if ((cursorKey === 'auto' || cursorKey === 'default') && elUnder) {
      const tag = (elUnder as HTMLElement).tagName
      if (/^(P|H[1-6]|SPAN|LI|TD|TH|LABEL|BLOCKQUOTE|PRE|CODE|EM|STRONG|B|I|SMALL|DT|DD|FIGCAPTION)$/.test(tag)) {
        cursorKey = 'text'
      }
    }

    if (cursorKey !== lastCursorKey) {
      lastCursorKey = cursorKey
      applySprite(cursorKey)
    }

    const { ox, oy } = PATHS[cursorKey] ?? PATHS[ALIAS[cursorKey]] ?? PATHS.default
    sprite.style.transform = `translate(${fx + ox}px, ${fy + oy}px)`

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
    class="pointer-events-none fixed inset-0 z-[2]"
  />

  <!-- Lagged cursor sprite -->
  <div
    ref="spriteRef"
    class="pointer-events-none fixed top-0 left-0 z-[3] will-change-transform"
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

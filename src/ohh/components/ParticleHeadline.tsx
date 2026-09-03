import { useEffect, useRef } from 'react'

type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; c: string }

const COLORS = ['#f0531c', '#f0531c', '#f0531c', '#ff7a45', '#e8431a', '#14202b'] // vivid orange, a touch of ink

/** Interactive particle text: the headline is rasterised to an offscreen
 *  canvas, sampled into particles, then each particle springs to its home
 *  position and is repelled by the pointer. No baked background = no box, and
 *  the letters scatter/flow around the cursor. */
export function ParticleHeadline({ lines, className = '' }: { lines: string[]; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const mouse = { x: -9999, y: -9999 }
    let particles: P[] = []
    let raf = 0

    const build = () => {
      const rect = wrap.getBoundingClientRect()
      const W = Math.max(1, Math.floor(rect.width))
      const H = Math.max(1, Math.floor(rect.height))
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // rasterise the text offscreen
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d')
      if (!octx) return
      octx.fillStyle = '#fff'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      let fs = Math.min((H / lines.length) * 0.92, W * 0.17)
      const setFont = (s: number) => (octx.font = `800 ${s}px "Bricolage Grotesque", system-ui, sans-serif`)
      setFont(fs)
      const widest = Math.max(...lines.map((l) => octx.measureText(l).width))
      if (widest > W * 0.98) {
        fs *= (W * 0.98) / widest
        setFont(fs)
      }
      const lineH = fs * 0.98
      const startY = H / 2 - (lineH * lines.length) / 2 + lineH / 2
      lines.forEach((l, i) => octx.fillText(l, W / 2, startY + i * lineH))

      const data = octx.getImageData(0, 0, W, H).data
      const gap = W < 600 ? 5 : 4
      particles = []
      for (let y = 0; y < H; y += gap) {
        for (let x = 0; x < W; x += gap) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            particles.push({
              x: Math.random() * W,
              y: Math.random() * H,
              hx: x,
              hy: y,
              vx: 0,
              vy: 0,
              c: COLORS[(Math.random() * COLORS.length) | 0],
            })
          }
        }
      }
    }

    const step = () => {
      const W = canvas.width / dpr
      const H = canvas.height / dpr
      ctx.clearRect(0, 0, W, H)
      const R = 58
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let ax = (p.hx - p.x) * 0.05
        let ay = (p.hy - p.y) * 0.05
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const d2 = dx * dx + dy * dy
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1
          const f = ((R - d) / R) * 4.2
          ax += (dx / d) * f
          ay += (dy / d) * f
        }
        p.vx = (p.vx + ax) * 0.86
        p.vy = (p.vy + ay) * 0.86
        p.x += p.vx
        p.y += p.vy
        ctx.fillStyle = p.c
        ctx.fillRect(p.x, p.y, 2, 2)
      }
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    let cancelled = false
    const start = async () => {
      try {
        await (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready
      } catch {
        /* fonts API unavailable — fall back to system font */
      }
      if (cancelled) return
      build()
      raf = requestAnimationFrame(step)
    }
    start()

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    const ro = new ResizeObserver(() => build())
    ro.observe(wrap)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
    }
  }, [lines])

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  )
}

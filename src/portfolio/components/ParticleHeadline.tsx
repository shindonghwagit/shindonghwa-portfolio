import { useEffect, useRef } from 'react'

type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; c: string }

// Original ohhmydesign palette — mostly brand orange with occasional ink/blue.
const COLORS = ['#F0531C', '#F0531C', '#F0531C', '#14202B', '#0D99FF']

type FontSet = { load?: (f: string) => Promise<unknown>; ready?: Promise<unknown> }

/** Interactive particle headline — faithful port of the original ohhmydesign
 *  hero. The lines are rendered once with Anton to an offscreen canvas, their
 *  opaque pixels sampled on a fixed grid into particles that spring toward
 *  their home coordinate and are repelled by the pointer. Disabled on phones. */
export function ParticleHeadline({
  lines,
  className = '',
}: {
  lines: string[]
  className?: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const mouse = { x: -9999, y: -9999 }
    const fine = matchMedia('(pointer:fine)').matches
    let particles: P[] = []
    let raf = 0
    let W = 0
    let H = 0
    let dpr = 1
    let psize = 2.5

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = wrap.getBoundingClientRect()
      W = Math.max(1, Math.floor(r.width))
      H = Math.max(1, Math.floor(r.height))
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const build = () => {
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const o = off.getContext('2d')
      if (!o) return
      o.fillStyle = '#000'
      o.textAlign = 'center'
      o.textBaseline = 'middle'

      // size the type to fill the box: measured at 100px then scaled
      o.font = '700 100px Anton, sans-serif'
      let w100 = 1
      for (const l of lines) w100 = Math.max(w100, o.measureText(l).width)
      const fs = Math.min(((W * 0.9) / w100) * 100, H * 0.46)
      o.font = `700 ${fs}px Anton, sans-serif`

      const lh = fs * 0.92
      const startY = H / 2 - (lh * (lines.length - 1)) / 2
      lines.forEach((l, i) => o.fillText(l, W / 2, startY + i * lh))

      const data = o.getImageData(0, 0, W, H).data
      const stepPx = Math.max(2, Math.min(3, Math.round(fs / 47)))
      psize = Math.max(2.2, Math.min(2.55, fs / 72))

      const next: P[] = []
      let k = 0
      for (let y = 0; y < H; y += stepPx) {
        for (let x = 0; x < W; x += stepPx) {
          if (data[(y * W + x) * 4 + 3] > 128) {
            const prev = particles[k] // reuse position on resize so it doesn't jump
            next.push({
              x: prev ? prev.x : Math.random() * W,
              y: prev ? prev.y : Math.random() * H,
              tx: x,
              ty: y,
              vx: 0,
              vy: 0,
              c: COLORS[k % COLORS.length],
            })
            k++
          }
        }
      }
      particles = next
    }

    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const R = 92
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        let ax = (p.tx - p.x) * 0.02
        let ay = (p.ty - p.y) * 0.02
        if (fine) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1
            const f = ((R - d) / R) * 4.5
            ax += (dx / d) * f
            ay += (dy / d) * f
          }
        }
        p.vx = (p.vx + ax) * 0.86
        p.vy = (p.vy + ay) * 0.86
        p.x += p.vx
        p.y += p.vy
        ctx.fillStyle = p.c
        ctx.fillRect(p.x, p.y, psize, psize)
      }
      raf = requestAnimationFrame(frame)
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
    const init = () => {
      size()
      build()
    }
    const start = async () => {
      // original bails out entirely on phones
      if (matchMedia('(max-width:680px)').matches) return
      const fonts = (document as Document & { fonts?: FontSet }).fonts
      try {
        await fonts?.load?.('700 100px Anton')
        await fonts?.ready
      } catch {
        /* fonts API unavailable — draw with whatever is ready */
      }
      if (cancelled) return
      init()
      raf = requestAnimationFrame(frame)
    }
    start()

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    let rt: number | undefined
    const onResize = () => {
      window.clearTimeout(rt)
      rt = window.setTimeout(() => {
        if (!cancelled) init()
      }, 200)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(rt)
    }
  }, [lines])

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  )
}

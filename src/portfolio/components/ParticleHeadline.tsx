import { useEffect, useRef } from 'react'

type P = { x: number; y: number; hx: number; hy: number; vx: number; vy: number; c: string }

const FALLBACK_COLORS = ['#f0531c', '#f0531c', '#f0531c', '#e8431a', '#ff6a2f']

/** A sampled pixel counts as "text" (not sky) when it leans warm — the orange
 *  particles have r noticeably above b. The blue gradient background is cool
 *  (b > r), so it's excluded. */
function isTextPixel(r: number, b: number) {
  return r > b + 14
}

/** Interactive particle text. When `src` is given, particles are sampled from
 *  that image so the original letterforms/colours are reproduced exactly (and
 *  the baked background is filtered out — no box). Otherwise the text is drawn
 *  with a font as a fallback. Particles spring home and are repelled by the
 *  pointer, so the letters scatter and flow around the cursor. */
export function ParticleHeadline({
  lines,
  src,
  className = '',
}: {
  lines: string[]
  src?: string
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

    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const mouse = { x: -9999, y: -9999 }
    let particles: P[] = []
    let raf = 0
    let img: HTMLImageElement | null = null

    // Fine cell sampling: one particle per gap×gap cell that overlaps a letter,
    // coloured from the source image's own pixels (its original orange/salmon
    // mix) so the restored headline matches the original impossible.png look.
    const sample = (data: Uint8ClampedArray, W: number, H: number, fromImage: boolean) => {
      const gap = W < 600 ? 3 : 2
      particles = []
      for (let cy = 0; cy < H; cy += gap) {
        for (let cx = 0; cx < W; cx += gap) {
          // pick the most vivid (orange) pixel in the cell for both hit + colour
          let hit = false
          let cr = 240
          let cg = 83
          let cb = 28
          let bestWarm = -1e9
          for (let y = cy; y < cy + gap && y < H; y++) {
            for (let x = cx; x < cx + gap && x < W; x++) {
              const idx = (y * W + x) * 4
              if (data[idx + 3] < 128) continue
              const r = data[idx]
              const g = data[idx + 1]
              const b = data[idx + 2]
              if (fromImage) {
                if (!isTextPixel(r, b)) continue
                const warm = r - b
                if (warm > bestWarm) {
                  bestWarm = warm
                  cr = r
                  cg = g
                  cb = b
                }
                hit = true
              } else {
                hit = true
                break
              }
            }
            if (hit && !fromImage) break
          }
          if (!hit) continue
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            hx: cx + gap / 2,
            hy: cy + gap / 2,
            vx: 0,
            vy: 0,
            c: fromImage ? `rgb(${cr},${cg},${cb})` : FALLBACK_COLORS[(Math.random() * FALLBACK_COLORS.length) | 0],
          })
        }
      }
    }

    const build = () => {
      const rect = wrap.getBoundingClientRect()
      const W = Math.max(1, Math.floor(rect.width))
      const H = Math.max(1, Math.floor(rect.height))
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d')
      if (!octx) return

      if (img && img.complete && img.naturalWidth) {
        // draw the source image "contain"-fitted, then sample its warm pixels
        const scale = Math.min(W / img.naturalWidth, H / img.naturalHeight)
        const dw = img.naturalWidth * scale
        const dh = img.naturalHeight * scale
        octx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)
        sample(octx.getImageData(0, 0, W, H).data, W, H, true)
      } else {
        // font fallback
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
        sample(octx.getImageData(0, 0, W, H).data, W, H, false)
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
      if (src) {
        img = new Image()
        img.src = src
        try {
          await img.decode()
        } catch {
          img = null // fall back to font
        }
      }
      if (!img) {
        try {
          await (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready
        } catch {
          /* fonts API unavailable */
        }
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
  }, [lines, src])

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  )
}

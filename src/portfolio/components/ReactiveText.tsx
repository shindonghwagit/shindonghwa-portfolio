import { useEffect, useRef } from 'react'

/** Per-letter proximity reaction. A rAF loop eases every letter toward its
 *  target each frame (rather than restarting a CSS transition on each move), so
 *  the motion stays continuously smooth — a soft wave that trails the pointer.
 *  Layout offsets are used for measurement so a letter's own transform never
 *  feeds back into the calculation. */
export function ReactiveText({
  text,
  className = '',
  letterClassName = '',
  glow = false,
  accent = [],
}: {
  text: string
  className?: string
  letterClassName?: string
  glow?: boolean
  /** letter indices (spaces ignored) to paint in the brand colour */
  accent?: number[]
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const ptr = useRef({ x: 0, y: 0, active: false })
  const cur = useRef<number[]>([])
  const vel = useRef<number[]>([])
  const rafId = useRef(0)

  const tick = () => {
    const wrap = ref.current
    if (!wrap) {
      rafId.current = 0
      return
    }
    const els = wrap.querySelectorAll<HTMLElement>('[data-rl]')
    const wr = wrap.getBoundingClientRect()
    const R = Math.max(170, wr.height * 1.7) // wide, soft falloff
    let alive = false

    els.forEach((el, i) => {
      let target = 0
      let dxN = 0
      if (ptr.current.active) {
        const cx = wr.left + el.offsetLeft + el.offsetWidth / 2
        const cy = wr.top + el.offsetTop + el.offsetHeight / 2
        const dx = ptr.current.x - cx
        const dy = ptr.current.y - cy
        target = Math.max(0, 1 - Math.hypot(dx, dy) / R)
        dxN = Math.max(-1, Math.min(1, dx / R))
      }
      // quadratic falloff — snappier right under the cursor (matches the
      // original heading reaction), then a light spring so letters lift toward
      // the pointer and bounce back with a little overshoot on leave.
      const tgt = target * target
      const prev = cur.current[i] ?? 0
      let v = vel.current[i] ?? 0
      v = (v + (tgt - prev) * 0.16) * 0.74
      const c = prev + v
      vel.current[i] = v
      cur.current[i] = c
      if (Math.abs(tgt - c) > 0.002 || Math.abs(v) > 0.002) alive = true

      if (Math.abs(c) > 0.002) {
        const lift = -c * el.offsetHeight * 0.12
        const rot = -dxN * 4.5 * c
        el.style.transform = `translateY(${lift.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) scale(${(1 + c * 0.045).toFixed(3)})`
      } else {
        el.style.transform = ''
      }
      if (glow) el.style.opacity = (0.09 + Math.max(0, c) * 0.5).toFixed(3)
    })

    rafId.current = alive ? requestAnimationFrame(tick) : 0
  }

  const kick = () => {
    if (!rafId.current) rafId.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const words = text.split(' ')
  const accentSet = new Set(accent)
  let gi = -1 // running letter index across words (spaces skipped)

  return (
    <span
      ref={ref}
      onPointerMove={(e) => {
        ptr.current = { x: e.clientX, y: e.clientY, active: true }
        kick()
      }}
      onPointerLeave={() => {
        ptr.current.active = false
        kick()
      }}
      className={`relative inline-block ${className}`}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {[...word].map((ch, i) => {
            gi += 1
            return (
              <span
                key={i}
                data-rl
                className={`inline-block origin-bottom will-change-transform ${accentSet.has(gi) ? 'text-brand' : ''} ${letterClassName}`}
                style={glow ? { opacity: 0.09 } : undefined}
              >
                {ch}
              </span>
            )
          })}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

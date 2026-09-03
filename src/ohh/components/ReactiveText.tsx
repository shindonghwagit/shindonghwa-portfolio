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
}: {
  text: string
  className?: string
  letterClassName?: string
  glow?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const ptr = useRef({ x: 0, y: 0, active: false })
  const cur = useRef<number[]>([])
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
      // ease current → target (small factor = gentle, smooth trailing)
      const prev = cur.current[i] ?? 0
      const c = prev + (target - prev) * 0.09
      cur.current[i] = c
      if (c > 0.002 || target > 0) alive = true

      if (c > 0.002) {
        const lift = -c * el.offsetHeight * 0.1
        const skew = -dxN * 6 * c
        el.style.transform = `translateY(${lift.toFixed(2)}px) skewX(${skew.toFixed(2)}deg) scale(${(1 + c * 0.04).toFixed(3)})`
      } else {
        el.style.transform = ''
      }
      if (glow) el.style.opacity = (0.09 + c * 0.5).toFixed(3)
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
          {[...word].map((ch, i) => (
            <span
              key={i}
              data-rl
              className={`inline-block origin-bottom will-change-transform ${letterClassName}`}
              style={glow ? { opacity: 0.09 } : undefined}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

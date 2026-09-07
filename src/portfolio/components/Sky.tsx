import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'

type RGB = [number, number, number]
const hexToRgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpRgb = (a: RGB, b: RGB, t: number): RGB => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
const rgb = (c: RGB) => `rgb(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])})`
const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

type KF = { h: number; top: RGB; mid: RGB; bot: RGB; ink: number }
const K = (h: number, top: string, mid: string, bot: string, ink: number): KF => ({
  h,
  top: hexToRgb(top),
  mid: hexToRgb(mid),
  bot: hexToRgb(bot),
  ink,
})

// hour → sky gradient stops + ink level (0 = dark text, 1 = light text)
const KEYS: KF[] = [
  K(0, '#0e1830', '#0b1327', '#160b28', 1), // deep night
  K(5, '#24406e', '#2a3a66', '#6b4a72', 1), // pre-dawn
  K(6.5, '#8ab4d8', '#a9c3d6', '#eabf95', 0.35), // dawn
  K(8, '#7cc0f2', '#5eaeea', '#3f97e0', 0), // morning blue
  K(12, '#6fbef5', '#49a4ed', '#2f8fe0', 0), // noon
  K(16, '#86c5f0', '#6fb0e6', '#4f97cf', 0), // afternoon
  K(18, '#f4b06a', '#f18f6a', '#d76f8f', 0), // golden hour
  K(19, '#ff8a5c', '#f0648c', '#8a5aa8', 0.2), // sunset
  K(20, '#5a4a8e', '#3a3a72', '#5a2f5a', 0.8), // dusk
  K(21.5, '#1a2a52', '#142042', '#241634', 1), // night falling
  K(24, '#0e1830', '#0b1327', '#160b28', 1),
]

function interp(hour: number) {
  let a = KEYS[0]
  let b = KEYS[KEYS.length - 1]
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (hour >= KEYS[i].h && hour <= KEYS[i + 1].h) {
      a = KEYS[i]
      b = KEYS[i + 1]
      break
    }
  }
  const t = (hour - a.h) / (b.h - a.h || 1)
  return {
    top: lerpRgb(a.top, b.top, t),
    mid: lerpRgb(a.mid, b.mid, t),
    bot: lerpRgb(a.bot, b.bot, t),
    ink: lerp(a.ink, b.ink, t),
  }
}

export type SkyTheme = {
  vars: CSSProperties
  starOpacity: number
  cloudOpacity: number
  sun: { x: number; y: number; op: number }
  moon: { x: number; y: number; op: number }
}

/** Reads the visitor's local hour (with a `?sky=HH` preview override) and
 *  returns the time-of-day sky colours, on-sky ink colour, and sun/moon/star
 *  state. Updates every 30s so the sky drifts with real time. */
export function useSkyTheme(): SkyTheme {
  const [hour, setHour] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('sky')) {
      const q = Number(params.get('sky'))
      if (!Number.isNaN(q) && q >= 0 && q <= 24) return q
    }
    const d = new Date()
    return d.getHours() + d.getMinutes() / 60
  })

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('sky')) return // frozen for preview
    const id = setInterval(() => {
      const d = new Date()
      setHour(d.getHours() + d.getMinutes() / 60)
    }, 30000)
    return () => clearInterval(id)
  }, [])

  const s = interp(hour)
  const lum = (0.299 * s.mid[0] + 0.587 * s.mid[1] + 0.114 * s.mid[2]) / 255
  const starOpacity = clamp01((0.42 - lum) / 0.32)
  const cloudOpacity = clamp01(1 - starOpacity * 1.15)
  const ink = lerpRgb([20, 32, 43], [236, 243, 255], s.ink)
  const inkSoft = lerpRgb([74, 97, 115], [190, 205, 235], s.ink)

  const sunUp = hour > 5 && hour < 19
  const sunP = clamp01((hour - 6) / 12)
  const sun = { x: ((hour - 5) / 14) * 100, y: (1 - Math.sin(sunP * Math.PI)) * 70 + 8, op: sunUp ? 1 : 0 }

  const mh = hour < 6 ? hour + 24 : hour
  const moonUp = hour > 18.5 || hour < 6
  const moonP = clamp01((mh - 19) / 11)
  const moon = { x: ((mh - 18.5) / 11.5) * 100, y: (1 - Math.sin(moonP * Math.PI)) * 70 + 8, op: moonUp ? 1 : 0 }

  return {
    vars: {
      '--color-sky-top': rgb(s.top),
      '--color-sky-mid': rgb(s.mid),
      '--color-sky-bot': rgb(s.bot),
      '--pf-sky-ink': rgb(ink),
      '--pf-sky-ink-soft': rgb(inkSoft),
    } as CSSProperties,
    starOpacity,
    cloudOpacity,
    sun,
    moon,
  }
}

/** Fixed celestial layer: twinkling stars at night + a sun/moon that arcs
 *  across the sky by the hour. Sits behind the clouds and page content. */
export function Sky({ theme }: { theme: SkyTheme }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 68,
        s: Math.random() * 2 + 1,
        d: Math.random() * 3,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: theme.starOpacity }}>
        {stars.map((st, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: st.s,
              height: st.s,
              animation: `pf-twinkle ${2 + st.d}s ease-in-out ${st.d}s infinite`,
            }}
          />
        ))}
      </div>

      {/* sun */}
      <div
        className="absolute size-24 rounded-full transition-opacity duration-1000"
        style={{
          left: `${theme.sun.x}%`,
          top: `${theme.sun.y}%`,
          opacity: theme.sun.op,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, #fff6d8 0%, #ffd86b 55%, rgba(255,200,80,0) 72%)',
          boxShadow: '0 0 90px 34px rgba(255,214,107,0.45)',
        }}
      />

      {/* moon */}
      <div
        className="absolute size-16 rounded-full transition-opacity duration-1000"
        style={{
          left: `${theme.moon.x}%`,
          top: `${theme.moon.y}%`,
          opacity: theme.moon.op,
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle at 36% 34%, #fdfdff 0%, #d7ddf0 62%, #b9c2dd 100%)',
          boxShadow: '0 0 55px 14px rgba(220,228,255,0.32)',
        }}
      />
    </div>
  )
}

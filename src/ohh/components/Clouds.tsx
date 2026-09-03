/** Soft, out-of-focus cloud illustrations drifting across the sky backdrop —
 *  low opacity + heavy blur to match the original's dreamy depth-of-field. */
const CLOUDS = [
  { top: '6%', size: 240, dur: '46s', delay: '0s', op: 0.75, blur: 5 },
  { top: '16%', size: 150, dur: '60s', delay: '-8s', op: 0.55, blur: 8 },
  { top: '26%', size: 320, dur: '78s', delay: '-24s', op: 0.4, blur: 11 },
  { top: '44%', size: 190, dur: '54s', delay: '-4s', op: 0.5, blur: 6 },
  { top: '58%', size: 260, dur: '68s', delay: '-34s', op: 0.38, blur: 10 },
  { top: '74%', size: 170, dur: '50s', delay: '-14s', op: 0.5, blur: 7 },
  { top: '86%', size: 300, dur: '82s', delay: '-48s', op: 0.32, blur: 12 },
]

function Cloud({ w }: { w: number }) {
  return (
    <svg viewBox="0 0 200 96" width={w} height={(w * 96) / 200} fill="#ffffff">
      <ellipse cx="60" cy="64" rx="52" ry="30" />
      <ellipse cx="104" cy="50" rx="46" ry="40" />
      <ellipse cx="146" cy="66" rx="44" ry="28" />
      <rect x="38" y="58" width="134" height="36" rx="18" />
    </svg>
  )
}

export function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute -left-[35%]"
          style={{
            top: c.top,
            opacity: c.op,
            filter: `blur(${c.blur}px)`,
            animation: `ohh-drift ${c.dur} linear ${c.delay} infinite`,
          }}
        >
          <Cloud w={c.size} />
        </div>
      ))}
      <style>{`@keyframes ohh-drift { from { transform: translateX(0); } to { transform: translateX(190vw); } }`}</style>
    </div>
  )
}

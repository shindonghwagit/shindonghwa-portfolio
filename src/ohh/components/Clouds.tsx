/** Soft floating cloud illustrations drifting across the sky backdrop. */
const CLOUDS = [
  { top: '8%', size: 220, dur: '38s', delay: '0s', op: 0.9 },
  { top: '18%', size: 150, dur: '52s', delay: '-8s', op: 0.7 },
  { top: '30%', size: 300, dur: '64s', delay: '-20s', op: 0.55 },
  { top: '52%', size: 180, dur: '46s', delay: '-4s', op: 0.6 },
  { top: '70%', size: 240, dur: '58s', delay: '-30s', op: 0.5 },
]

function Cloud({ w }: { w: number }) {
  return (
    <svg viewBox="0 0 200 96" width={w} height={(w * 96) / 200} fill="#ffffff">
      <ellipse cx="60" cy="64" rx="52" ry="30" />
      <ellipse cx="104" cy="50" rx="44" ry="38" />
      <ellipse cx="146" cy="66" rx="42" ry="26" />
      <rect x="40" y="58" width="130" height="34" rx="17" />
    </svg>
  )
}

export function Clouds() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute -left-[30%] blur-[1px]"
          style={{
            top: c.top,
            opacity: c.op,
            animation: `ohh-drift ${c.dur} linear ${c.delay} infinite`,
          }}
        >
          <Cloud w={c.size} />
        </div>
      ))}
      <style>{`@keyframes ohh-drift { from { transform: translateX(0); } to { transform: translateX(180vw); } }`}</style>
    </div>
  )
}

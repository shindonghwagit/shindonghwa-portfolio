/** Thin decorative Figma-style ruler strip pinned to the very top edge. */
export function Ruler() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 hidden h-[26px] items-center border-b border-ink/[0.08] bg-white/30 backdrop-blur-sm md:flex">
      <span className="flex items-center gap-1.5 px-3 font-mono text-[9px] font-bold uppercase tracking-[1px] text-ink/50">
        <span className="size-2 rounded-[2px] bg-brand" /> donghwa.fig
      </span>
      <span className="px-3 font-mono text-[9px] text-ink/40">100%</span>
      {/* ticks */}
      <div className="relative flex h-full flex-1 items-end overflow-hidden">
        {Array.from({ length: 120 }).map((_, i) => (
          <span
            key={i}
            className={`w-[16px] shrink-0 border-l ${i % 5 === 0 ? 'h-2.5 border-ink/25' : 'h-1.5 border-ink/12'}`}
          />
        ))}
      </div>
    </div>
  )
}

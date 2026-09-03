import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Centered section header: script overline + oversized Bricolage heading. */
export function SectionHead({
  over,
  title,
  className = '',
}: {
  over: string
  title: ReactNode
  className?: string
}) {
  return (
    <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
      <span className="font-script text-2xl text-brand">{over}</span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-[clamp(40px,7vw,78px)] font-bold uppercase leading-[0.93] tracking-[-1.5px] text-ink"
      >
        {title}
      </motion.h2>
    </div>
  )
}

/** Tiny monospace code label pinned to a card's top-right corner. */
export function CellLabel({ children }: { children: ReactNode }) {
  return (
    <span className="absolute right-3.5 top-3 font-mono text-[9px] font-bold tracking-[1.08px] text-[#8aa6b8]">
      {children}
    </span>
  )
}

/** Blue Figma "layer tab" that slides up out of a cell on hover. */
export function LayerTab({ label }: { label: string }) {
  return (
    <span className="ohh-tab flex items-center gap-2 rounded-t-[7px] bg-blue px-2.5 py-1 shadow-[0px_-6px_16px_-8px_rgba(13,153,255,0.7)]">
      <i className="size-2 rounded-[2px] bg-white" />
      <span className="font-mono text-[10.5px] font-bold tracking-[0.42px] text-white">{label}</span>
    </span>
  )
}

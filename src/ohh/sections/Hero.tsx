import { motion } from 'motion/react'
import { useClock } from '../components/useClock'

function Handle({ className }: { className: string }) {
  return <span className={`ohh-handle ${className}`} />
}

export function Hero() {
  const clock = useClock()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center"
    >
      {/* YC social-proof pill */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="relative mb-6 flex flex-wrap items-center justify-center gap-x-[11px] gap-y-1 rounded-[7px] border border-blue/40 bg-white/50 px-4 py-3 text-[13px] backdrop-blur-md shadow-[0px_16px_34px_-24px_rgba(20,32,43,0.5)] sm:px-[22px] sm:text-[15px]"
      >
        <Handle className="-left-[5px] -top-[5px]" />
        <Handle className="-bottom-[5px] -left-[5px]" />
        <span className="text-[15px] font-semibold text-ink">Worked with 15+</span>
        <span className="flex size-[22px] items-center justify-center rounded-[5px] bg-brand text-[13px] font-bold text-white shadow-[0px_4px_10px_-4px_rgba(240,83,28,0.6)]">
          Y
        </span>
        <span className="text-[15px] font-bold text-brand">Combinator</span>
        <span className="text-[15px] font-medium text-ink-soft">companies</span>
        <Handle className="-right-[5px] -top-[5px]" />
        <Handle className="-bottom-[5px] -right-[5px]" />
      </motion.div>

      {/* Particle headline: IMPOSSIBLE TO IGNORE — clip-wipe reveal */}
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.4 }}
        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
        transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1080px]"
      >
        <img
          src="/assets/ohh/hero/impossible.png"
          alt="Impossible to ignore"
          className="mx-auto w-full select-none"
          draggable={false}
        />
      </motion.div>

      {/* mono hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-2 font-mono text-[11px] uppercase tracking-[1.32px] text-brand"
      >
        we don't do forgettable ✦
      </motion.p>

      {/* Subcopy in a Figma selection box */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="ohh-select relative mx-auto mt-6 max-w-[500px] px-3 py-1"
      >
        <span className="absolute -top-[21px] left-0 rounded-[5px] rounded-bl-[1px] bg-blue/90 px-[7px] py-0.5 font-mono text-[9px] tracking-[0.27px] text-white shadow-[0px_4px_10px_-4px_rgba(13,153,255,0.5)]">
          do not drag
        </span>
        <Handle className="-left-[5px] -top-[5px] size-[9px]" />
        <Handle className="-right-[5px] -top-[5px] size-[9px]" />
        <Handle className="-bottom-[5px] -left-[5px] size-[9px]" />
        <Handle className="-bottom-[5px] -right-[5px] size-[9px]" />
        <p className="text-[19px] leading-[28.5px] text-ink-soft">
          Most brands you can scroll right past. The ones we build do this to your eyes.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#contact"
          className="flex items-center gap-2.5 rounded-[10px] bg-brand px-[22px] py-3 text-[14px] font-bold text-white shadow-[0px_12px_26px_-12px_#f0531c] transition-transform hover:-translate-y-0.5"
        >
          Book a call
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a
          href="#work"
          className="rounded-[10px] border border-ink px-[22px] py-3 text-[14px] font-bold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          See the work
        </a>
      </motion.div>

      {/* Corner mono labels */}
      <div className="pointer-events-none absolute bottom-6 left-8 hidden text-left font-mono text-[11px] uppercase tracking-[0.99px] md:block">
        <p className="font-bold text-ink">working worldwide</p>
        <p className="text-ink-soft">no office, on purpose</p>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-8 hidden text-right font-mono text-[11px] uppercase tracking-[0.99px] md:block">
        <p className="font-bold text-ink">open for 2026</p>
        <p className="text-ink-soft">your timezone, handled</p>
      </div>

      {/* LIVE clock */}
      <div className="pointer-events-none absolute left-1/2 top-24 flex -translate-x-1/2 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[1px] text-ink">
        <span className="size-1.5 animate-pulse rounded-full bg-brand" />
        LIVE · {clock}
      </div>
    </section>
  )
}

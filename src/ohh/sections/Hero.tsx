import { motion } from 'motion/react'
import { useClock } from '../components/useClock'

// Feather all four edges so the image's baked-in blue gradient dissolves into
// the sky instead of reading as a hard rectangle.
const featherMask =
  'linear-gradient(to right, transparent 0, #000 4%, #000 96%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 6%, #000 94%, transparent 100%)'

export function Hero() {
  const clock = useClock()

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-32 pt-40 text-center"
    >
      {/* Particle headline: IMPOSSIBLE TO IGNORE — soft fade-in, feathered edges */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.25, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1080px]"
      >
        <img
          src="/assets/ohh/hero/impossible.png"
          alt="Impossible to ignore"
          className="mx-auto w-full select-none"
          draggable={false}
          style={{
            maskImage: featherMask,
            WebkitMaskImage: featherMask,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />
      </motion.div>

      {/* mono hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 font-mono text-[11px] uppercase tracking-[1.32px] text-brand"
      >
        front to back · built to be remembered ✦
      </motion.p>

      {/* CTAs — both are real, working links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <a
          href="#contact"
          className="flex items-center gap-2.5 rounded-[10px] bg-brand px-[22px] py-3 text-[14px] font-bold text-white shadow-[0px_12px_26px_-12px_#f0531c] transition-transform hover:-translate-y-0.5"
        >
          Get in touch
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
        <p className="font-bold text-ink">based in seoul</p>
        <p className="text-ink-soft">building end to end</p>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-8 hidden text-right font-mono text-[11px] uppercase tracking-[0.99px] md:block">
        <p className="font-bold text-ink">open to work</p>
        <p className="text-ink-soft">2026</p>
      </div>

      {/* LIVE clock */}
      <div className="pointer-events-none absolute left-1/2 top-24 flex -translate-x-1/2 items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[1px] text-ink">
        <span className="size-1.5 animate-pulse rounded-full bg-brand" />
        LIVE · {clock}
      </div>
    </section>
  )
}

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/** Full-screen intro: the OHHMYDESIGN wordmark assembles while a counter
 *  ticks 0 → 100%, then the curtain lifts to reveal the page. */
export function IntroLoader() {
  const [pct, setPct] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const DURATION = 1900
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION)
      // ease-out so it decelerates toward 100
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const word = 'DONGHWASHIN'

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="ohh-sky fixed inset-0 z-[100] flex flex-col items-center justify-center"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex overflow-hidden">
            {word.split('').map((ch, i) => (
              <motion.span
                key={i}
                className="text-[8vw] font-extrabold leading-none tracking-tight text-white md:text-[64px]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <div className="mt-6 flex w-[min(80vw,420px)] items-center gap-4">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-[width] duration-100"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-12 text-right font-mono text-sm font-bold text-white">
              {pct}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

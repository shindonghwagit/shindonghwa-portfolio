import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** A single "You" cursor that follows the real pointer with a soft spring —
 *  the collaborative flourish, minus the chaos. Fine-pointer devices only. */
export function Cursors() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.18 })
  const sy = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.18 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[101] flex items-start"
      aria-hidden
    >
      <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
        <path
          d="M5.5 3.2 18.4 15.9c.5.5.2 1.4-.5 1.5l-5.9.6c-.4 0-.8.3-1 .7l-2.4 5.4c-.3.7-1.3.6-1.5-.1L2.4 4.3c-.2-.9.6-1.6 1.4-1.1Z"
          fill="#f0531c"
          stroke="#fff"
          strokeWidth="1.5"
        />
      </svg>
      <span className="-mt-0.5 ml-1.5 rounded-md rounded-tl-[2px] bg-brand px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm">
        You
      </span>
    </motion.div>
  )
}

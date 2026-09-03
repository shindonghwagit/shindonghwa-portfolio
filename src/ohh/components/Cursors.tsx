import { motion } from 'motion/react'

/** Decorative "2 cursors online" collaboration flourish, like the original.
 *  One cursor follows the real pointer; a second drifts on its own path. */
function CursorSvg({ color }: { color: string }) {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
      <path
        d="M5.5 3.2 18.4 15.9c.5.5.2 1.4-.5 1.5l-5.9.6c-.4 0-.8.3-1 .7l-2.4 5.4c-.3.7-1.3.6-1.5-.1L2.4 4.3c-.2-.9.6-1.6 1.4-1.1Z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function Tag({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="ml-4 -mt-1 inline-block rounded-md px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm"
      style={{ background: color }}
    >
      {name}
    </span>
  )
}

export function Cursors() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] hidden md:block">
      {/* Teammate cursor drifting on a loop */}
      <motion.div
        className="absolute left-0 top-0 flex items-start"
        initial={{ x: '20vw', y: '30vh' }}
        animate={{
          x: ['18vw', '32vw', '24vw', '40vw', '18vw'],
          y: ['28vh', '46vh', '62vh', '38vh', '28vh'],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CursorSvg color="#0d99ff" />
        <Tag name="Alex" color="#0d99ff" />
      </motion.div>
      <motion.div
        className="absolute left-0 top-0 flex items-start"
        initial={{ x: '70vw', y: '55vh' }}
        animate={{
          x: ['72vw', '58vw', '66vw', '50vw', '72vw'],
          y: ['52vh', '40vh', '66vh', '48vh', '52vh'],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CursorSvg color="#f0531c" />
        <Tag name="You" color="#f0531c" />
      </motion.div>
    </div>
  )
}

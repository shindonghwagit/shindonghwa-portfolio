import { motion } from 'motion/react'
import { useSeoulTime } from '../lib/useSeoulTime'

const ease = [0.2, 0.7, 0.2, 1] as const

export function StatusCard() {
  const time = useSeoulTime()
  return (
    <motion.aside
      className="status"
      aria-label="current status"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease }}
    >
      <div className="status-row">
        <span className="dot" />
        <span className="status-loc">SEOUL · KST</span>
        <span className="status-time">{time}</span>
      </div>
      <div className="status-now">Now → wrapping up CVDLens, my capstone</div>
      <div className="status-handle">@shindonghwagit</div>
    </motion.aside>
  )
}

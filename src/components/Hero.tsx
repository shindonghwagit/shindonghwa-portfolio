import { motion } from 'motion/react'
import { StatusCard } from './StatusCard'
import { RobotScene } from './RobotScene'

const ease = [0.2, 0.7, 0.2, 1] as const
const lineAnim = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease },
})

export function Hero() {
  return (
    <section className="hero">
      <motion.p className="eyebrow" {...lineAnim(0.5)}>
        PORTFOLIO — 2026 ↘
      </motion.p>

      <h1 className="title">
        <motion.span className="line" {...lineAnim(0.15)}>
          I build the
        </motion.span>
        <motion.span className="line" {...lineAnim(0.26)}>
          <em>whole thing.</em>
        </motion.span>
        <motion.span className="line" {...lineAnim(0.37)}>
          Front to back, to deploy.
        </motion.span>
      </h1>

      <motion.p className="lead" {...lineAnim(0.5)}>
        Full-stack developer who'd rather implement the core by hand than
        import it. Currently in an AI lab — training deep-learning models
        and shipping them as real products.
      </motion.p>

      <RobotScene />

      <StatusCard />
    </section>
  )
}

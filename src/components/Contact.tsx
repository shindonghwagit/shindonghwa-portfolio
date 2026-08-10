import { motion } from 'motion/react'
import { useSeoulTime } from '../lib/useSeoulTime'

const ease = [0.2, 0.7, 0.2, 1] as const
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.8, ease },
}

export function Contact() {
  const time = useSeoulTime()
  return (
    <section id="contact" className="contact">
      <motion.p className="label" {...reveal}>
        CONTACT ↘
      </motion.p>
      <motion.h2 className="contact-h" {...reveal}>
        Let's build
        <br />
        something.
      </motion.h2>
      <motion.div className="contact-links" {...reveal}>
        <a href="mailto:ek65110112@gmail.com">ek65110112@gmail.com</a>
        <a
          href="https://github.com/shindonghwagit"
          target="_blank"
          rel="noreferrer"
        >
          github.com/shindonghwagit
        </a>
      </motion.div>
      <motion.div className="foot" {...reveal}>
        <span>© 2026 Donghwa Shin</span>
        <span>It's {time} in Seoul →</span>
        <span>Built with React · Vite · hand-written CSS</span>
      </motion.div>
    </section>
  )
}

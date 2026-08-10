import { motion } from 'motion/react'

const ease = [0.2, 0.7, 0.2, 1] as const

export function About() {
  return (
    <section id="about" className="about">
      <motion.p
        className="label"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease }}
      >
        ABOUT ↘
      </motion.p>
      <motion.div
        className="about-grid"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="photo">
          <img className="photo-img" src="/profile.jpg" alt="Donghwa Shin" />
        </div>
        <div className="about-text">
          <p>
            I'm a computer software engineering student at Soonchunhyang
            University. I like building things end to end — designing the
            API, wiring up the database, shaping the frontend, and shipping
            it.
          </p>
          <p>
            Lately I've been in an AI lab, training models and turning them
            into things people can actually use. My rule of thumb: implement
            the core logic by hand at least once before reaching for a
            library.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

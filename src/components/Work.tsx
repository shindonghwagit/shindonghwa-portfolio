import { motion } from 'motion/react'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

const ease = [0.2, 0.7, 0.2, 1] as const

export function Work() {
  return (
    <section id="work" className="work">
      <motion.p
        className="label"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.8, ease }}
      >
        SELECTED WORK ↘
      </motion.p>
      <div className="grid">
        {projects.map((p) => (
          <ProjectCard key={p.n} project={p} />
        ))}
      </div>
    </section>
  )
}

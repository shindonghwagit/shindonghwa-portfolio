import { useState } from 'react'
import { motion } from 'motion/react'
import { projects } from '../data/projects'
import type { Project } from '../types'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

const ease = [0.2, 0.7, 0.2, 1] as const

export function Work() {
  const [active, setActive] = useState<Project | null>(null)

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
          <ProjectCard key={p.n} project={p} onOpen={() => setActive(p)} />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}

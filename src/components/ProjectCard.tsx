import { motion } from 'motion/react'
import type { Project } from '../types'

const ease = [0.2, 0.7, 0.2, 1] as const

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, ease }}
    >
      <div className={`thumb ${project.imgs && project.imgs.length > 1 ? 'thumb-multi' : ''}`}>
        {project.imgs && project.imgs.length > 0 ? (
          project.imgs.map((src, i) => (
            <img
              key={src}
              className="thumb-img"
              src={src}
              alt={`${project.title} ${i + 1}`}
              loading="lazy"
            />
          ))
        ) : (
          <span className="thumb-tag">IMG — {project.title}</span>
        )}
      </div>
      <div className="card-meta">
        <span className="c-n">{project.n}</span>
        <span className="c-kind">{project.kind}</span>
      </div>
      <h3 className="c-title">{project.title}</h3>
      <p className="c-desc">{project.desc}</p>
      <a className="c-link" href={project.href ?? '#'}>
        View project →
      </a>
    </motion.article>
  )
}

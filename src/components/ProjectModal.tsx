import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Project } from '../types'

const ease = [0.2, 0.7, 0.2, 1] as const

const overlayAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25, ease },
}

const boxAnim = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
  transition: { duration: 0.25, ease },
}

function ModalContent({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const detail = project.detail

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  if (!detail) return null

  return (
    <motion.div className="modal-overlay" {...overlayAnim} onClick={onClose}>
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={dialogRef}
        {...boxAnim}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="modal-head">
          <h3 id="modal-title" className="modal-title">
            {project.title}
          </h3>
          <div className="modal-meta">
            <span className="modal-kind">{project.kind}</span>
            {detail.year && <span className="modal-year">{detail.year}</span>}
          </div>
        </div>

        <p className="modal-overview">{detail.overview}</p>

        {detail.role && (
          <section className="modal-sec">
            <p className="modal-label">ROLE ↘</p>
            <p className="modal-role">{detail.role}</p>
          </section>
        )}

        <section className="modal-sec">
          <p className="modal-label">HIGHLIGHTS ↘</p>
          <ul className="modal-list">
            {detail.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <section className="modal-sec">
          <p className="modal-label">BUILT WITH ↘</p>
          <ul className="modal-stack">
            {detail.stack.map((s) => (
              <li key={s} className="modal-badge">
                {s}
              </li>
            ))}
          </ul>
        </section>

        {(detail.github || detail.live) && (
          <div className="modal-actions">
            {detail.github && (
              <a className="modal-btn" href={detail.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
            {detail.live && (
              <a
                className="modal-btn modal-btn-primary"
                href={detail.live}
                target="_blank"
                rel="noreferrer"
              >
                Live demo ↗
              </a>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {project && <ModalContent key={project.n} project={project} onClose={onClose} />}
    </AnimatePresence>
  )
}

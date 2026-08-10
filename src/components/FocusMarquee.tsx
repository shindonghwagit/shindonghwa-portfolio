import { focusAreas } from '../data/projects'

export function FocusMarquee() {
  const items = [...focusAreas, ...focusAreas, ...focusAreas]
  return (
    <section className="focusbar" aria-label="focus areas">
      <div className="marquee">
        <div className="marquee-track">
          {items.map((f, i) => (
            <span key={i} className="m-item">
              {f}
              <span className="m-sep">↘</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

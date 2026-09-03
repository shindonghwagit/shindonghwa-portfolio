import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

type WorkItem = {
  slug: string
  name: string
  img: string
  fit?: 'cover' | 'contain'
  tags: string[]
  key: string // matches a title in projects.ts for the detail popup
}

// The originals are the studio's client cards; here we surface the owner's
// real projects in the same frosted-card treatment.
const ITEMS: WorkItem[] = [
  { slug: 'cvdlens', name: 'CVDLens', img: '/og_cover.jpg', fit: 'contain', tags: ['AI', 'PyTorch', 'Next.js'], key: 'CVDLens' },
  { slug: 'prismdesign', name: 'PrismDesign', img: '/assets1.png', fit: 'contain', tags: ['React', 'Canvas', 'ReactFlow'], key: 'PrismDesign' },
  { slug: 'ghfilter', name: 'Country Filter', img: '/top-repositories.png', fit: 'cover', tags: ['Chrome', 'JS'], key: 'GitHub Country Filter' },
  { slug: 'farmers', name: "Farmer's Market", img: '/screenshot.png', fit: 'cover', tags: ['Spring', 'SSE', 'OAuth2'], key: "Farmer's Market" },
]

const BY_TITLE: Record<string, Project> = Object.fromEntries(projects.map((p) => [p.title, p]))

function Card({ item, onOpen, selected }: { item: WorkItem; onOpen: () => void; selected: boolean }) {
  return (
    <button
      onClick={onOpen}
      data-work-card
      className={`group relative block w-[clamp(300px,42vw,560px)] shrink-0 text-left ${selected ? 'is-selected' : ''}`}
    >
      {/* blue label tab — brightens when the card is the active one */}
      <span
        className={`absolute -top-6 left-0 z-10 rounded-[5px] rounded-bl-[1px] px-2 py-0.5 font-mono text-[10px] font-bold text-white transition-colors ${
          selected ? 'bg-blue' : 'bg-blue/45'
        }`}
      >
        {item.slug}
      </span>
      <div
        className={`relative rounded-[22px] border-2 transition-colors group-hover:border-blue ${
          selected ? 'border-blue' : 'border-blue/0'
        }`}
      >
        {['-left-[6px] -top-[6px]', '-right-[6px] -top-[6px]', '-bottom-[6px] -left-[6px]', '-bottom-[6px] -right-[6px]'].map(
          (p) => (
            <span
              key={p}
              className={`ohh-handle absolute ${p} z-10 transition-opacity group-hover:opacity-100 ${
                selected ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ),
        )}
        <div
          className={`rounded-[20px] bg-white/55 p-3.5 shadow-[0px_32px_58px_-32px_rgba(20,32,43,0.36)] backdrop-blur-[5px] transition-transform duration-300 group-hover:-translate-y-1 ${
            selected ? '-translate-y-1' : ''
          }`}
        >
          <div className="rounded-[14px] bg-white p-3.5">
            {/* dark image frame */}
            <div className="relative aspect-[962/669] overflow-hidden rounded-[9px] bg-[#0e1620]">
              <img
                src={item.img}
                alt={item.name}
                className={`size-full ${item.fit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
                loading="lazy"
              />
              {/* view affordance (no arrow) */}
              <span
                className={`absolute right-3.5 top-3.5 rounded-full border border-white/40 bg-white/15 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[1px] text-white backdrop-blur-md transition-opacity group-hover:opacity-100 ${
                  selected ? 'opacity-100' : 'opacity-0'
                }`}
              >
                View
              </span>
            </div>
            {/* footer */}
            <div className="flex items-center justify-between px-2 pb-2 pt-5">
              <div className="flex items-center gap-2.5">
                <span className="size-[7px] rounded-[2px] bg-brand" />
                <span className="font-display text-[23px] font-bold tracking-[-0.5px] text-ink">{item.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t, i) => (
                  <span
                    key={t}
                    className={`rounded-[20px] border px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.81px] ${
                      i === 0 ? 'border-brand/20 bg-brand/[0.07] text-brand' : 'border-ink/[0.08] bg-ink/[0.04] text-ink-soft'
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}

function ProjectWindow({ item, onClose }: { item: WorkItem; onClose: () => void }) {
  const p = BY_TITLE[item.key]
  const d = p?.detail
  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[86vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[16px] border border-ink/10 bg-white shadow-[0px_50px_100px_-40px_rgba(20,32,43,0.7)]"
      >
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-ink/[0.07] px-4 py-3">
          <div className="flex gap-1.5">
            <button onClick={onClose} aria-label="Close" className="size-[11px] rounded-full bg-[#ff6159]" />
            <span className="size-[11px] rounded-full bg-[#febc2e]" />
            <span className="size-[11px] rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-[13px] font-bold text-ink-soft">{item.slug}.fig</span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto flex size-7 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-ink/5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="overflow-y-auto">
          {/* preview */}
          <div className="aspect-[962/500] overflow-hidden bg-[#0e1620]">
            <img src={item.img} alt={item.name} className={`size-full ${item.fit === 'contain' ? 'object-contain p-6' : 'object-cover'}`} />
          </div>

          <div className="flex flex-col gap-5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[28px] font-extrabold tracking-[-1px] text-ink">{item.name}</h3>
                <p className="mt-0.5 font-mono text-[11px] font-bold uppercase tracking-[1px] text-brand">
                  {p?.kind}
                  {d?.year ? ` · ${d.year}` : ''}
                </p>
              </div>
            </div>

            {d?.overview && <p className="text-[15px] leading-[24px] text-ink-soft">{d.overview}</p>}

            {d?.role && (
              <p className="text-[14px] text-ink-soft">
                <span className="font-semibold text-ink">Role — </span>
                {d.role}
              </p>
            )}

            {d?.highlights?.length ? (
              <ul className="flex flex-col gap-2.5">
                {d.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[14px] leading-[21px] text-ink">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/12 text-brand">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            {d?.stack?.length ? (
              <div>
                <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[1.4px] text-[#8aa6b8]">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {d.stack.map((s) => (
                    <span key={s} className="rounded-[8px] border border-ink/10 bg-[#f1f4f8] px-2.5 py-1 font-mono text-[12px] font-bold text-ink">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {d?.github && (
              <a
                href={d.github}
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex w-fit items-center gap-2.5 rounded-[10px] bg-ink px-5 py-3 text-[14px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                View on GitHub
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Work() {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<WorkItem | null>(null)
  const [overflow, setOverflow] = useState(1000)
  const [active, setActive] = useState(0)

  // How far the track overruns the viewport = both the horizontal travel and
  // (added to one viewport) the scroll distance the pin lasts. Keeping them
  // equal makes scroll-to-pan feel ~1:1.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setOverflow(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // The pinned frame stays fixed; scrolling through the tall wrapper maps to a
  // horizontal translate — the classic sticky/pinned horizontal scroll.
  const { scrollYProgress } = useScroll({ target: pinRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -overflow])

  // The card nearest the viewport centre becomes "selected" as it pans through.
  useEffect(() => {
    const measureActive = () => {
      const track = trackRef.current
      if (!track) return
      const cards = track.querySelectorAll<HTMLElement>('[data-work-card]')
      const cx = window.innerWidth / 2
      let best = 0
      let bestDist = Infinity
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - cx)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
    }
    measureActive()
    const unsub = x.on('change', measureActive)
    window.addEventListener('resize', measureActive)
    return () => {
      unsub()
      window.removeEventListener('resize', measureActive)
    }
  }, [x])

  // Lock body scroll while the popup is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <section id="work" className="relative">
      {/* Desktop: pinned horizontal scroll — the screen holds still while the
          cards slide sideways. */}
      <div
        ref={pinRef}
        className="relative hidden md:block"
        style={{ height: `calc(100vh + ${overflow}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-8 px-[8vw] will-change-transform">
            {ITEMS.map((item, i) => (
              <Card key={item.slug} item={item} selected={i === active} onOpen={() => setOpen(item)} />
            ))}
          </motion.div>
          {/* progress dots */}
          <div className="mt-12 flex items-center justify-center gap-1.5">
            {ITEMS.map((it, i) => (
              <span
                key={it.slug}
                className={`h-[7px] rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 bg-ink' : 'w-[7px] bg-ink/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: native horizontal swipe (no scroll-jacking on touch). */}
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 py-16 md:hidden [scrollbar-width:none]">
        {ITEMS.map((item) => (
          <div key={item.slug} className="snap-center">
            <Card item={item} selected={false} onOpen={() => setOpen(item)} />
          </div>
        ))}
      </div>

      <AnimatePresence>{open && <ProjectWindow item={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

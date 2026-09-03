import { motion } from 'motion/react'
import { SectionHead } from '../components/bits'

type Entry = {
  tag: string
  title: string
  sub: string
  body: string
  chips: string[]
  icon: string
  accent?: boolean
}

// Drawn from the real story + projects. Years are approximate — easy to adjust.
const TIMELINE: Entry[] = [
  {
    tag: 'Now',
    title: 'AI Lab',
    sub: 'Soonchunhyang University',
    body: 'Training models and turning them into things people can actually use — from raw data to a served ONNX endpoint.',
    chips: ['PyTorch', 'ONNX', 'FastAPI'],
    icon: '🤖',
    accent: true,
  },
  {
    tag: '2025',
    title: 'CVDLens — Capstone',
    sub: 'Full-stack + AI',
    body: 'Real-time color-vision correction. Implemented the Brettel LMS transform by hand instead of importing a library.',
    chips: ['Python', 'MobileNetV2+U-Net', 'Next.js'],
    icon: '👁️',
  },
  {
    tag: '2025',
    title: "Farmer's Market",
    sub: 'Solo full-stack',
    body: 'A farm-to-table marketplace built front to back — OAuth2 login, SSE live inventory, atomic point payments.',
    chips: ['Spring Boot', 'PostgreSQL', 'SSE'],
    icon: '🌱',
  },
  {
    tag: '2024',
    title: 'PrismDesign · Country Filter',
    sub: 'Team & side projects',
    body: 'A browser node visual-programming studio, and a Chrome extension that filters GitHub users by country.',
    chips: ['React', 'ReactFlow', 'Chrome'],
    icon: '🧩',
  },
  {
    tag: 'Base',
    title: 'B.S. Computer Software Engineering',
    sub: 'Soonchunhyang University',
    body: 'Where the end-to-end habit started — API, database, frontend, deploy. Build the core by hand once, then reach for tools.',
    chips: ['C', 'C++', 'Java'],
    icon: '🎓',
  },
]

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionHead over="the journey so far" title="Experience" className="mb-14" />

      <div className="relative mx-auto max-w-[820px]">
        {/* vertical rail */}
        <span className="absolute bottom-6 left-[23px] top-6 w-px bg-ink/15" aria-hidden />

        <div className="flex flex-col gap-5">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-5"
            >
              {/* node */}
              <span
                className={`relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border text-[18px] shadow-sm ${
                  t.accent ? 'border-brand bg-brand/10' : 'border-ink/10 bg-white'
                }`}
              >
                {t.icon}
              </span>

              {/* card */}
              <div className="ohh-cell flex-1 bg-white p-5 md:p-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[1px] ${
                      t.accent ? 'bg-brand/12 text-brand' : 'bg-ink/[0.06] text-ink-soft'
                    }`}
                  >
                    {t.tag}
                  </span>
                  <h3 className="font-display text-[20px] font-bold tracking-[-0.4px] text-ink">{t.title}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.6px] text-[#8aa6b8]">{t.sub}</span>
                </div>
                <p className="text-[15px] leading-[23px] text-ink-soft">{t.body}</p>
                {t.chips.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.chips.map((c) => (
                      <span
                        key={c}
                        className="rounded-[8px] border border-ink/[0.08] bg-[#f1f4f8] px-2.5 py-1 font-mono text-[11px] font-bold text-ink"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

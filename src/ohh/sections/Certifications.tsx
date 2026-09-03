import { SectionHead } from '../components/bits'

type Cert = { name: string; issuer: string; year: string; id?: string }

// Fill this in as certifications are earned — the grid renders automatically.
const CERTS: Cert[] = []

export function Certifications() {
  return (
    <section id="certs" className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionHead over="credentials" title="Certifications" className="mb-14" />

      {CERTS.length === 0 ? (
        // Empty state — intentionally blank for now.
        <div className="relative mx-auto max-w-[820px] rounded-[18px] border border-dashed border-ink/25 bg-white/50 p-14 text-center backdrop-blur">
          {['-left-[5px] -top-[5px]', '-right-[5px] -top-[5px]', '-bottom-[5px] -left-[5px]', '-bottom-[5px] -right-[5px]'].map(
            (p) => (
              <span key={p} className={`ohh-handle absolute ${p}`} />
            ),
          )}
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-ink/[0.05] text-2xl">🎖️</div>
          <p className="font-display text-[20px] font-bold text-ink">Nothing here yet</p>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[1px] text-ink-soft">certifications coming soon</p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[900px] gap-4 md:grid-cols-2">
          {CERTS.map((c) => (
            <div key={c.name} className="ohh-cell flex items-center gap-4 bg-white p-6">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[12px] bg-brand/10 text-2xl">🎖️</span>
              <div className="flex-1">
                <p className="font-display text-[18px] font-bold text-ink">{c.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.6px] text-ink-soft">
                  {c.issuer} · {c.year}
                </p>
              </div>
              {c.id && <span className="font-mono text-[10px] text-ink-soft/50">{c.id}</span>}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

import { useClock } from '../components/useClock'
import { ReactiveText } from '../components/ReactiveText'

const COLS = [
  { title: 'Pages', links: ['Home', 'Work', 'About', 'FAQ'] },
  { title: 'Company', links: ['Contact', 'Privacy', 'Terms'] },
  { title: 'Connect', links: ['GitHub', 'LinkedIn', 'Instagram', 'Email'] },
]

const WORD = 'DONGHWASHIN'

export function Footer() {
  const clock = useClock().slice(0, 5)

  return (
    <footer className="relative mt-10 overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-6 pt-20">
        {/* top: CTA + nav — mirrors the studio's footer top */}
        <div className="flex flex-wrap justify-between gap-x-14 gap-y-12 pb-14">
          {/* CTA — small eyebrow, giant email headline, action row */}
          <div>
            <p className="font-mono text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
              have an idea worth building?
            </p>
            <a
              href="mailto:ek65110112@gmail.com"
              className="group my-4 flex w-fit items-center gap-[0.18em] font-display text-[clamp(26px,4.4vw,52px)] font-bold leading-none tracking-[-0.03em] text-white"
            >
              ek65110112@gmail.com
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="size-[0.5em] text-brand transition-transform duration-300 group-hover:-translate-y-2 group-hover:translate-x-2"
              >
                <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <div className="flex flex-wrap items-center gap-[18px]">
              <a
                href="mailto:ek65110112@gmail.com"
                className="flex items-center gap-2.5 rounded-[10px] bg-brand px-[22px] py-3 text-[14px] font-bold text-white shadow-[0px_12px_26px_-12px_#f0531c] transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink"
              >
                Show us the idea
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <span className="flex items-center gap-2 font-mono text-[12px] font-bold text-white/80">
                <span className="size-2 animate-pulse rounded-full bg-[#27c06b]" /> available for projects
              </span>
            </div>
          </div>

          {/* nav columns */}
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="mb-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/40">{c.title}</p>
                <ul className="flex flex-col">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="block py-[5px] text-[15px] font-medium text-white/80 transition-[color,transform] hover:translate-x-[3px] hover:text-brand"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* giant wordmark — letters lift near the pointer, so clip only the
          horizontal overflow (never the vertical lift) and leave headroom */}
      <div className="flex justify-center overflow-x-clip px-4 pb-4 pt-6">
        <ReactiveText
          text={WORD}
          accent={[7, 8, 9, 10]} /* SHIN — brand-coloured like ohhmydesign's leading letter */
          strength={1.8}
          className="font-display text-[clamp(40px,13vw,180px)] font-extrabold leading-none tracking-[-4px] text-white"
        />
      </div>

      {/* status bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-6 py-4 font-mono text-[11px] text-white/50">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-[3px] bg-blue/70" /> donghwa.fig
          </span>
          <span className="flex items-center gap-2">
            <span className="size-3 rounded-full border border-ink bg-brand" />
            you're online · {clock} KST
          </span>
          <span>© 2026 · made by Donghwa Shin</span>
        </div>
      </div>

      {/* back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="absolute right-6 top-16 flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </footer>
  )
}

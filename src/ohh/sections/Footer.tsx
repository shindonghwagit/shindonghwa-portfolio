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
        {/* top CTA */}
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-white/10 pb-14">
          <div>
            <p className="font-script text-2xl text-brand">let's talk</p>
            <h3 className="mt-1 font-display text-[clamp(32px,5vw,56px)] font-extrabold leading-[0.95] tracking-[-1.5px]">
              have an idea<br />worth building?
            </h3>
          </div>
          <div className="flex flex-col items-start gap-4">
            <a href="mailto:ek65110112@gmail.com" className="font-mono text-[15px] text-white/70 underline-offset-4 hover:text-white hover:underline">
              ek65110112@gmail.com
            </a>
            <a
              href="mailto:ek65110112@gmail.com"
              className="flex items-center gap-2.5 rounded-[10px] bg-brand px-[22px] py-3 text-[14px] font-bold text-white shadow-[0px_12px_26px_-12px_#f0531c] transition-transform hover:-translate-y-0.5"
            >
              Show us the idea
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <span className="flex items-center gap-2 font-mono text-[12px] text-[#27c06b]">
              <span className="size-2 rounded-full bg-[#27c06b]" /> available for projects
            </span>
          </div>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-8 py-14 md:grid-cols-3">
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[1.5px] text-white/40">{c.title}</p>
              <ul className="flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group relative inline-block w-fit text-[15px] text-white/75 transition-colors hover:text-white"
                    >
                      {l}
                      {/* Figma selection box + corner handles on hover */}
                      <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-[3px] border border-blue opacity-0 transition-opacity group-hover:opacity-100" />
                      {['-left-2 -top-1', '-right-2 -top-1', '-bottom-1 -left-2', '-bottom-1 -right-2'].map((p) => (
                        <span
                          key={p}
                          className={`pointer-events-none absolute ${p} size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-blue bg-white opacity-0 transition-opacity group-hover:opacity-100`}
                        />
                      ))}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* giant wordmark — letters lift & light up near the pointer */}
      <div className="flex justify-center overflow-hidden px-4 pb-4">
        <ReactiveText
          text={WORD}
          glow
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

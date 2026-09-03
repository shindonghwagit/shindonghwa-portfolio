// Ordered to match the sequence sections appear on the page.
const NAV: { label: string; id: string }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Work', id: 'work' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certs', id: 'certs' },
]

/** Two stacked copies of a label; the pair slides up on the parent's hover,
 *  revealing the second copy — the site's signature nav micro-interaction. */
function SlideLabel({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span className={`relative block h-[20px] overflow-hidden text-[14px] ${className}`}>
      {[0, 1].map((i) => (
        <span
          key={i}
          className="block leading-[20px] transition-transform duration-300 ease-out group-hover:-translate-y-full"
        >
          {label}
        </span>
      ))}
    </span>
  )
}

function NavLink({ label, id }: { label: string; id: string }) {
  return (
    <a
      href={`#${id}`}
      className="group hidden rounded-full px-3 py-[7px] transition-colors hover:bg-ink/5 md:block"
    >
      <SlideLabel label={label} className="font-medium text-ink" />
    </a>
  )
}

/** Fixed floating nav — a centered white pill plus a right-aligned email pill. */
export function Topbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-6">
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-center gap-4">
        {/* Nav pill */}
        <nav className="flex items-center gap-[3px] rounded-full border border-ink/[0.13] bg-white py-1.5 pl-2 pr-1.5 shadow-[0px_12px_32px_-18px_rgba(20,19,16,0.4)] sm:pl-4">
          {NAV.map((item) => (
            <NavLink key={item.id} label={item.label} id={item.id} />
          ))}
          <span className="px-2 font-display text-[15px] font-bold text-ink md:hidden">DS.</span>
          {/* Contact — dark pill, white font, same slide-up interaction */}
          <a
            href="#contact"
            className="group ml-1 rounded-full bg-ink px-4 py-[9px] transition-colors hover:bg-ink/90"
          >
            <SlideLabel label="Contact" className="font-semibold text-white" />
          </a>
        </nav>

        {/* Email pill */}
        <a
          href="mailto:ek65110112@gmail.com"
          className="absolute right-0 hidden items-center gap-2 rounded-full border border-ink/[0.13] bg-white px-4 py-2 shadow-[0px_12px_32px_-18px_rgba(20,19,16,0.4)] transition-transform hover:-translate-y-0.5 xl:flex"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-brand">
            <rect x="2.5" y="4.5" width="19" height="15" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="m3 6 9 7 9-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[12px] font-bold text-ink">ek65110112@gmail.com</span>
        </a>
      </div>
    </header>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/** Bottom-right floating "Why wait? Let's chat" widget with a little popover. */
export function ChatWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[300px] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0px_30px_60px_-24px_rgba(20,32,43,0.5)]"
          >
            <div className="flex items-center gap-2.5 bg-gradient-to-br from-brand to-blue px-4 py-3.5 text-white">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/20 text-[15px]">👋</span>
              <div>
                <p className="text-[14px] font-bold">Let's chat</p>
                <p className="font-mono text-[10px] text-white/80">usually replies in a few hours</p>
              </div>
            </div>
            <div className="p-4">
              <p className="rounded-2xl rounded-tl-sm bg-[#f1f6fa] px-3.5 py-2.5 text-[13px] text-ink">
                Hey! Tell me about your project and I'll get back fast. No forms, no hoops.
              </p>
              <a
                href="mailto:ek65110112@gmail.com"
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-ink py-2.5 text-[13px] font-bold text-white transition-transform hover:-translate-y-0.5"
              >
                Start the conversation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-full bg-ink py-3 pl-3 pr-5 text-white shadow-[0px_16px_34px_-16px_rgba(20,32,43,0.8)] transition-transform hover:-translate-y-0.5"
      >
        <span className="relative flex size-8 items-center justify-center rounded-full bg-brand">
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6 6 18" stroke="white" strokeWidth="2.4" strokeLinecap="round" /></svg>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H8l-4 4V5Z" stroke="white" strokeWidth="2" strokeLinejoin="round" /></svg>
              <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-ink bg-[#27c06b]" />
            </>
          )}
        </span>
        <span className="text-[14px] font-bold">{open ? 'Close' : "Why wait? Let's chat"}</span>
      </button>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FocusMarquee } from './components/FocusMarquee'
import { Work } from './components/Work'
import { About } from './components/About'
import { Contact } from './components/Contact'

const CURSOR_HOVER_SELECTOR = 'a, .card, .m-item, .contact-h'

export default function App() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(
      '%cTaking a peek at the code? 👋  github.com/shindonghwagit',
      'font-family:monospace;font-size:13px;',
    )

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Lenis smooth scroll (skip when reduced motion is preferred — fall back to native)
    let lenis: Lenis | null = null
    let rafId = 0
    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      const raf = (time: number) => {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    }

    // anchor click → lenis.scrollTo (or native fallback)
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') {
        e.preventDefault()
        return
      }
      const el = document.querySelector(href) as HTMLElement | null
      if (!el) {
        e.preventDefault()
        return
      }
      e.preventDefault()
      if (lenis) lenis.scrollTo(el)
      else el.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('click', handleAnchor)

    // custom cursor — pointer:fine only
    const cursor = cursorRef.current
    const fine = window.matchMedia('(pointer:fine)').matches
    let onMove: ((e: MouseEvent) => void) | null = null
    const hoverBindings: Array<{
      el: Element
      grow: () => void
      shrink: () => void
    }> = []

    if (cursor && fine) {
      onMove = (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      window.addEventListener('mousemove', onMove)

      const grow = () => cursor.classList.add('big')
      const shrink = () => cursor.classList.remove('big')
      document.querySelectorAll(CURSOR_HOVER_SELECTOR).forEach((el) => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
        hoverBindings.push({ el, grow, shrink })
      })
    } else if (cursor) {
      cursor.style.display = 'none'
    }

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      document.removeEventListener('click', handleAnchor)
      if (onMove) window.removeEventListener('mousemove', onMove)
      hoverBindings.forEach(({ el, grow, shrink }) => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="root">
        <div className="cursor" ref={cursorRef} aria-hidden="true" />
        <Navbar />
        <main id="top">
          <Hero />
          <FocusMarquee />
          <Work />
          <About />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  )
}

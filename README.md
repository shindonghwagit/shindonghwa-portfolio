# ohhmydesign — Donghwa Shin

**Live:** https://shindonghwa-portfolio.vercel.app

A bright, sky-blue studio landing page — a faithful reproduction of the
ohhmydesign.com design, rebuilt from Figma and wired up with real interactions.

## Stack

- React 19 + TypeScript + Vite 8
- [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`)
- [motion](https://motion.dev) — intro loader, scroll reveals, marquee, lever, modals
- Fonts: Hanken Grotesk, Space Mono, Bricolage Grotesque, Caveat

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  main.tsx               renders <OhhLanding />
  types.ts               Project type
  data/projects.ts       project entries (used by the Work popups)
  ohh/
    OhhLanding.tsx        page composition
    ohh.css               Tailwind + tokens + keyframes (scoped under .ohh)
    components/           Topbar, Ruler, Clouds, Cursors, IntroLoader,
                          ChatWidget, bits, useClock
    sections/             Hero, Work, About, Process, Services, Difference,
                          Testimonials, Cta, Pricing, Faq, DropFun, Footer
```

## Contact

- ek65110112@gmail.com
- [github.com/shindonghwagit](https://github.com/shindonghwagit)

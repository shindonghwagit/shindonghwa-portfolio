import { motion } from 'motion/react'
import { SectionHead, CellLabel, LayerTab } from '../components/bits'
import { focusAreas } from '../../data/projects'

function reveal(i: number) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }
}

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[1280px] px-6 py-24">
      <SectionHead over="a little about me" title="Who am I" className="mb-14" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Photo card */}
        <motion.div {...reveal(0)} className="pf-cell relative overflow-hidden bg-white p-3.5 lg:col-span-5">
          <LayerTab label="me.png" />
          <div className="relative overflow-hidden rounded-[12px] bg-[#0e1620]">
            <img src="/profile.jpg" alt="Donghwa Shin" className="aspect-[4/5] w-full object-cover" />
            {/* selection handles */}
            {['-left-[5px] -top-[5px]', '-right-[5px] -top-[5px]', '-bottom-[5px] -left-[5px]', '-bottom-[5px] -right-[5px]'].map(
              (p) => (
                <span key={p} className={`pf-handle absolute ${p}`} />
              ),
            )}
            <span className="absolute bottom-3 left-3 rounded-md bg-white/85 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[1px] text-ink backdrop-blur">
              Donghwa Shin · 신동화
            </span>
          </div>
        </motion.div>

        {/* Story card */}
        <motion.div {...reveal(1)} className="pf-cell flex flex-col justify-center gap-5 bg-white p-8 md:p-10 lg:col-span-7">
          <LayerTab label="story" />
          <CellLabel>ABOUT.TXT</CellLabel>
          <span className="font-display text-6xl leading-none text-brand">“</span>
          <p className="text-[19px] leading-[30px] text-ink-soft">
            <span className="font-bold text-ink">AI CS Lab</span>에서 <span className="font-bold text-ink">학부 연구생</span>으로
            있습니다. 수많은 아이디어 속에서도 직접 만들고, 끝까지 완성해내는 개발자가 되고자 합니다.
          </p>
          <p className="text-[19px] leading-[30px] text-ink-soft">
            새로운 기술을 배우는 것보다 중요한 것은 그것을 <span className="font-bold text-ink">실제 서비스로 구현해내는 것</span>
            이라고 생각합니다. 작은 차이를 꾸준히 쌓아, 결국 눈에 띄는 한 사람 —{' '}
            <span className="font-bold text-ink">군계일학(群鷄一鶴)</span>이 되는 것이 저의 목표입니다.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-4 border-t border-ink/[0.13] pt-5 font-mono text-[11px] uppercase tracking-[1.32px] text-[#8aa6b8]">
            <span>📍 순천향대학교</span>
            <span className="flex items-center gap-2 text-[#27c06b]">
              <i className="size-2 rounded-[4px] bg-[#27c06b]" /> open to work
            </span>
          </div>
        </motion.div>

        {/* Focus / stack chips */}
        <motion.div {...reveal(2)} className="pf-cell flex flex-col justify-center gap-4 bg-ink p-6 lg:col-span-12">
          <LayerTab label="focus" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[1.4px] text-white/40">
            ▶ what I work with
          </span>
          <div className="flex flex-wrap gap-2.5">
            {focusAreas.map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono text-[13px] font-bold text-white/85"
              >
                {f}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

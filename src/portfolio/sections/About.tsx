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
            <span className="font-bold text-ink">순천향대학교 컴퓨터소프트웨어공학과</span>에 재학 중입니다. API 설계부터
            데이터베이스 연결, 프론트엔드 구현, 배포까지 처음부터 끝까지 직접 만드는 걸 좋아합니다.
          </p>
          <p className="text-[19px] leading-[30px] text-ink-soft">
            요즘은 <span className="font-bold text-ink">AI CS 랩</span>에서 모델을 학습시키고, 그것을 실제로 사람들이 쓸 수
            있는 형태로 만드는 일을 하고 있습니다. 라이브러리에 손을 뻗기 전에 핵심 로직은 최소 한 번은 직접 구현해보는 게
            제 원칙입니다.
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

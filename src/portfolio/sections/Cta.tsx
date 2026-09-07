import { SectionHead } from '../components/bits'
import { useClock } from '../components/useClock'

export function Cta() {
  const clock = useClock().slice(0, 5) // HH:MM

  return (
    <section id="contact" className="relative mx-auto max-w-[1280px] px-6 pb-8 pt-28 text-center">
      <SectionHead
        over="say hi"
        title={
          <>
            Let's <span className="text-brand">build.</span>
          </>
        }
      />
      {/* taped note */}
      <div className="mt-4 flex justify-center">
        <span className="-rotate-[1.2deg] rounded-md rounded-br-[1px] bg-[#fbe9cf] px-4 py-2 text-[14px] font-medium text-ink shadow-[0px_8px_20px_-12px_rgba(20,19,16,0.4)]">
          based in seoul · open to work
        </span>
      </div>

      <p className="mx-auto mt-24 max-w-[470px] text-[19px] leading-[28.5px] text-ink">
        It's <span className="font-bold">{clock}</span> in Seoul. Got a project, a question, or just want to say
        hi? Drop me a line — I'll get back.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4">
        <a
          href="mailto:ek65110112@gmail.com"
          className="rounded-[10px] bg-brand px-[22px] py-3 text-[14px] font-bold text-white shadow-[0px_12px_26px_-12px_#f0531c] transition-transform hover:-translate-y-0.5"
        >
          Email me
        </a>
        <a
          href="https://github.com/shindonghwagit"
          target="_blank"
          rel="noreferrer"
          className="border-b-2 border-ink pb-0.5 text-[16px] font-bold text-ink"
        >
          or find me on GitHub
        </a>
      </div>
    </section>
  )
}

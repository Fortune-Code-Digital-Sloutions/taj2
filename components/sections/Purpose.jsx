'use client'

// Scene 1 — arrival in the light. The statement forms out of the cream,
// then the founding numbers anchor it.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'

const LINES = [
  ['We', 'unleash'],
  ['potential', 'and'],
  ['create', 'growth.'],
]

const FACTS = [
  { big: '2008', small: 'Established' },
  { big: '2030', small: 'Vision' },
  { big: '7+', small: 'Industries' },
  { big: 'GCC', small: 'Presence' },
]

export default function Purpose() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)

      gsap.from(q('.purpose-word'), {
        yPercent: 118,
        duration: 1.15,
        stagger: 0.08,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.purpose-h')[0], start: 'top 78%' },
      })

      gsap.from(q('.purpose-copy'), {
        opacity: 0,
        y: 28,
        duration: 1,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.purpose-copy')[0], start: 'top 88%' },
      })

      gsap.from(q('.purpose-fact'), {
        opacity: 0,
        y: 34,
        duration: 0.9,
        stagger: 0.09,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.purpose-facts')[0], start: 'top 88%' },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="purpose"
      ref={ref}
      data-bg="#fff2c9"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="02" title="Our Purpose" />

        <h2 className="purpose-h font-display text-[13.5vw] font-light leading-[0.98] tracking-tight md:text-[7.2rem]">
          {LINES.map((line, li) => (
            <span key={li} className="mask-line">
              {line.map((w, wi) => (
                <span key={wi} className="purpose-word mr-[0.28em] inline-block">
                  {w === 'potential' || w === 'growth.' ? (
                    <em className="font-normal italic text-gold">{w}</em>
                  ) : (
                    w
                  )}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2">
          <p className="purpose-copy max-w-md text-[1.05rem] leading-[1.8] text-ink-soft">
            We create opportunities, empower entrepreneurs, and drive
            sustainable economic progress — building companies that outlast
            the moment they were founded in.
          </p>

          <div className="purpose-facts grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.small} className="purpose-fact">
                <p className="font-display text-4xl text-ink md:text-5xl">{f.big}</p>
                <p className="eyebrow mt-2 text-ink-soft">{f.small}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

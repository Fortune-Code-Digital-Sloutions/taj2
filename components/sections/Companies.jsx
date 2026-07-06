'use client'

// Scene 4 — the companies. A quiet, disciplined grid after the drama of
// the gates. Tiles invert to stone on hover.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'
import { COMPANIES } from '@/lib/data'

export default function Companies() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      gsap.from(q('.co-tile'), {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.8,
        ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
        stagger: { amount: 0.5, grid: 'auto', from: 'start' },
        scrollTrigger: { trigger: q('.co-grid')[0], start: 'top 82%' },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="companies"
      ref={ref}
      data-bg="#f8f2e3"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="05" title="Our Companies" />

        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
          <h2 className="font-display text-5xl font-light leading-[1.05] md:text-6xl">
            Strong companies.
            <br />
            <em className="italic text-gold">Built for excellence.</em>
          </h2>
          <p className="eyebrow text-ink-soft">10 companies · 7 industries</p>
        </div>

        <div className="co-grid grid grid-cols-2 border-l border-t border-ink/10 md:grid-cols-5">
          {COMPANIES.map((c) => (
            <div
              key={c.name}
              data-hover
              className="co-tile group relative flex aspect-square flex-col items-center justify-center gap-2 border-b border-r border-ink/10 px-4 text-center transition-colors duration-500"
              style={{ transitionTimingFunction: 'var(--ease-1)' }}
            >
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-stone transition-transform duration-500 group-hover:scale-y-100" style={{ transitionTimingFunction: 'var(--ease-1)' }} />
              <p className="relative font-display text-2xl tracking-wide text-ink transition-colors duration-500 group-hover:text-cream-deep md:text-[1.7rem]">
                {c.name}
              </p>
              <p className="eyebrow relative text-ink-soft transition-colors duration-500 group-hover:text-gold-bright">
                {c.field}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

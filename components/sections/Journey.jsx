'use client'

// Scene 7 — the journey. A gold line draws itself across two decades;
// 2030 stays open, pulsing — the ending is still being written.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'
import { MILESTONES } from '@/lib/data'

export default function Journey() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)

      gsap.from(q('.journey-line'), {
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: q('.journey-track')[0],
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.5,
        },
      })

      q('.journey-stop').forEach((stop, i) => {
        gsap.from(stop, {
          opacity: 0,
          y: 26,
          duration: 0.8,
          delay: i * 0.06,
          ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
          scrollTrigger: { trigger: q('.journey-track')[0], start: `top ${74 - i * 4}%` },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="journey"
      ref={ref}
      data-bg="#f8f2e3"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="08" title="Our Journey" />

        <h2 className="font-display text-5xl font-light leading-[1.05] md:text-6xl">
          A journey of <em className="italic text-gold">vision</em>,
          <br />
          persistence, and growth.
        </h2>

        {/* Desktop: horizontal line; Mobile: vertical rail */}
        <div className="journey-track relative mt-24 hidden md:block">
          <div className="absolute left-0 right-0 top-[7px] h-px bg-ink/15" />
          <div className="journey-line absolute left-0 right-0 top-[7px] h-px bg-gold" />
          <div className="grid grid-cols-5">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="journey-stop relative">
                <span
                  className={`relative z-10 block h-[15px] w-[15px] rounded-full border ${
                    m.year === '2030'
                      ? 'border-gold bg-cream-deep'
                      : 'border-gold bg-gold'
                  }`}
                >
                  {m.year === '2030' && (
                    <span className="absolute inset-[-8px] animate-ping rounded-full border border-gold/50" />
                  )}
                </span>
                <p className={`mt-6 font-display text-4xl ${i === MILESTONES.length - 1 ? 'text-gold' : 'text-ink'}`}>
                  {m.year}
                </p>
                <p className="eyebrow mt-2 text-ink-soft">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 space-y-10 border-l border-ink/15 pl-8 md:hidden">
          {MILESTONES.map((m) => (
            <div key={m.year} className="journey-stop relative">
              <span className="absolute -left-[37px] top-2 block h-[9px] w-[9px] rounded-full bg-gold" />
              <p className="font-display text-3xl">{m.year}</p>
              <p className="eyebrow mt-1 text-ink-soft">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

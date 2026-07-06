'use client'

// Scene 3 — the seven gates. Dark stone doorways standing in the light.
// Hover: the gate widens and its light leaks out. Click: it swallows the
// screen and you're inside the sector — a deliberate return to the dark.
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'
import { SECTORS } from '@/lib/data'

export default function Sectors() {
  const ref = useRef(null)
  const overlayRef = useRef(null)
  const [active, setActive] = useState(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      gsap.from(q('.sector-gate'), {
        yPercent: 26,
        opacity: 0,
        duration: 1.1,
        stagger: 0.07,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.sector-row')[0], start: 'top 82%' },
      })
    },
    { scope: ref }
  )

  useEffect(() => {
    if (!overlayRef.current) return
    if (active) {
      document.documentElement.style.overflow = 'hidden'
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'inset(12% 30% 12% 30%)', opacity: 0 },
        { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.8, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' }
      )
      gsap.fromTo(
        overlayRef.current.querySelectorAll('.ov-reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, delay: 0.35, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' }
      )
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [active])

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      onComplete: () => setActive(null),
    })
  }

  return (
    <section
      id="sectors"
      ref={ref}
      data-bg="#f8f2e3"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="04" title="Our Sectors" />

        <h2 className="mb-4 font-display text-5xl font-light leading-[1.05] md:text-6xl">
          Seven gates. <em className="italic text-gold">Seven industries.</em>
        </h2>
        <p className="mb-14 max-w-md text-[1.02rem] leading-[1.8] text-ink-soft md:mb-20">
          Choose a gate to explore.
        </p>

        {/* The gates — flex row on desktop, snap scroll on mobile */}
        <div className="sector-row flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 md:h-[62vh] md:snap-none md:overflow-visible md:pb-0">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              type="button"
              data-hover
              onClick={() => setActive(s)}
              className="sector-gate group relative h-[54vh] w-[72vw] shrink-0 snap-center overflow-hidden text-left transition-[flex-grow] duration-700 md:h-auto md:w-auto md:flex-1 md:basis-0 md:hover:flex-grow-[2.2]"
              style={{ transitionTimingFunction: 'var(--ease-1)' }}
            >
              {/* stone */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(168deg, #241a0f 0%, #17110a 42%, #0b0806 100%)',
                }}
              />
              {/* light leak under the door */}
              <div className="absolute inset-x-6 bottom-0 h-24 bg-gold-bright/0 blur-2xl transition-colors duration-700 group-hover:bg-gold-bright/25" />
              <div className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gold-bright/30 transition-all duration-700 group-hover:h-1 group-hover:bg-gold-bright/70" />

              {/* content */}
              <div className="relative flex h-full flex-col justify-between p-6">
                <span className="eyebrow text-cream-deep/40">{s.num} / 07</span>
                <div>
                  <p className="font-display text-2xl font-light leading-tight text-cream-deep transition-transform duration-700 group-hover:-translate-y-2 md:text-[1.6rem]">
                    {s.name}
                  </p>
                  <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-cream-deep/60 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100">
                    {s.blurb}
                  </p>
                  <span className="eyebrow mt-4 inline-block text-gold-bright opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Enter sector →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inside the gate — full dark overlay */}
      {active && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-night px-6 py-8 text-cream-deep md:px-12"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <div className="ov-reveal flex items-center justify-between">
            <span className="eyebrow text-cream-deep/50">{active.num} / 07 — Sector Gate</span>
            <button type="button" data-hover onClick={close} className="eyebrow text-gold-bright">
              Close ✕
            </button>
          </div>

          <div className="mx-auto w-full max-w-5xl">
            <p className="ov-reveal eyebrow mb-6 text-gold">TAJ Holding Group</p>
            <h3 className="ov-reveal font-display text-6xl font-light leading-[1.02] md:text-8xl">
              {active.name}
            </h3>
            <p className="ov-reveal mt-8 max-w-xl text-lg leading-[1.85] text-cream-deep/70">
              {active.blurb}
            </p>
            <div className="ov-reveal mt-10 h-px w-full max-w-xl bg-cream-deep/15" />
            <p className="ov-reveal mt-6 text-sm text-cream-deep/45">
              Full sector page — coming with the asset drop. This gate already
              knows where it leads.
            </p>
          </div>

          <div className="ov-reveal flex items-center justify-between">
            <span className="eyebrow text-cream-deep/40">Unleashing Potential</span>
            <span className="eyebrow text-cream-deep/40">Creating Growth</span>
          </div>
        </div>
      )}
    </section>
  )
}

'use client'

// Scene 6 — leadership. Still, formal, almost a portrait sitting.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'

export default function Leadership() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      gsap.from(q('.lead-reveal'), {
        opacity: 0,
        y: 36,
        duration: 1.05,
        stagger: 0.12,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
      gsap.from(q('.lead-frame'), {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.3,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="leadership"
      ref={ref}
      data-bg="#fff2c9"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="07" title="Leadership" />

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <h2 className="lead-reveal font-display text-5xl font-light leading-[1.06] md:text-[4.2rem]">
              Visionary leadership.
              <br />
              <em className="italic text-gold">Responsible growth.</em>
            </h2>
            <p className="lead-reveal mt-8 max-w-md text-[1.05rem] leading-[1.85] text-ink-soft">
              A strong vision needs strong leaders to turn it into reality.
              Since 2008, one principle has held: build slowly, build well,
              and let the results speak.
            </p>
            <div className="lead-reveal mt-12">
              <p className="font-display text-3xl">Omar A. Henaidy</p>
              <p className="eyebrow mt-2 text-ink-soft">Founder &amp; Chairman</p>
            </div>
            <a
              href="#contact"
              data-hover
              data-magnetic
              className="lead-reveal mt-12 inline-block border border-ink/25 px-8 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-500 hover:bg-ink hover:text-cream-deep"
              style={{ transitionTimingFunction: 'var(--ease-1)' }}
            >
              Meet the Board
            </a>
          </div>

          {/* Portrait slot — drop /public/images/chairman.jpg to fill */}
          <div className="lead-frame relative aspect-[4/5] w-full max-w-lg justify-self-end overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(160deg, #241a0f 0%, #17110a 48%, #0b0806 100%)',
              }}
            />
            <div className="absolute inset-x-10 bottom-0 h-1/2 bg-gold-bright/10 blur-3xl" />
            <div className="absolute inset-6 border border-cream-deep/15" />
            <p className="eyebrow absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-cream-deep/40">
              Portrait — asset slot
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

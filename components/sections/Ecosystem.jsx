'use client'

// Scene 2 — the ecosystem. Gold lines draw themselves from the mark to each
// discipline as the section crosses the viewport.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'
import Mark from '@/components/ui/Mark'
import { ECOSYSTEM } from '@/lib/data'

// 6 nodes around a center — positions in a 1000x640 viewBox
const NODES = [
  { x: 500, y: 70 },
  { x: 880, y: 200 },
  { x: 880, y: 440 },
  { x: 500, y: 570 },
  { x: 120, y: 440 },
  { x: 120, y: 200 },
]
const CX = 500
const CY = 320

export default function Ecosystem() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      const lines = q('.eco-line')

      lines.forEach((line) => {
        const len = line.getTotalLength()
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      })

      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: 0.12,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 62%' },
      })

      gsap.from(q('.eco-node'), {
        opacity: 0,
        scale: 0.85,
        transformOrigin: 'center',
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 62%' },
      })

      gsap.from(q('.eco-mark'), {
        opacity: 0,
        scale: 0.6,
        rotate: 45,
        duration: 1.2,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="ecosystem"
      ref={ref}
      data-bg="#f8f2e3"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="03" title="Our Ecosystem" />

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="font-display text-5xl font-light leading-[1.05] md:text-6xl">
              Everything connected.
              <br />
              <em className="italic text-gold">Everything grows</em> together.
            </h2>
            <p className="mt-8 max-w-sm text-[1.02rem] leading-[1.8] text-ink-soft">
              One group, one operating philosophy. Capital, expertise and
              execution move freely between our companies — so each one grows
              faster than it could alone.
            </p>
          </div>

          {/* Desktop constellation */}
          <div className="relative hidden md:block">
            <svg viewBox="0 0 1000 640" className="w-full" role="img" aria-label="TAJ ecosystem diagram">
              {NODES.map((n, i) => (
                <line
                  key={i}
                  className="eco-line"
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  stroke="#b8933f"
                  strokeWidth="1"
                  opacity="0.55"
                />
              ))}
              {NODES.map((n, i) => (
                <g key={i} className="eco-node">
                  <circle cx={n.x} cy={n.y} r="4" fill="#b8933f" />
                  <text
                    x={n.x}
                    y={n.y + (n.y < CY ? -20 : 34)}
                    textAnchor="middle"
                    fill="#221909"
                    style={{ font: '600 15px var(--font-sans-var)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    {ECOSYSTEM[i]}
                  </text>
                </g>
              ))}
            </svg>
            <div className="eco-mark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold">
              <Mark className="h-20 w-20" />
            </div>
          </div>

          {/* Mobile list */}
          <ul className="grid grid-cols-2 gap-4 md:hidden">
            {ECOSYSTEM.map((e) => (
              <li key={e} className="border border-ink/10 px-4 py-5">
                <span className="mb-2 block h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

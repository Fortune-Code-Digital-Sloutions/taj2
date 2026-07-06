'use client'

// Numbered eyebrow + hairline — the recurring section signature.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function SectionHead({ num, title, tone = 'dark' }) {
  const ref = useRef(null)
  const color = tone === 'light' ? 'text-cream-deep/70' : 'text-ink-soft'
  const line = tone === 'light' ? 'bg-cream-deep/25' : 'bg-ink/20'

  useGSAP(
    () => {
      gsap.from(ref.current.querySelector('.rule'), {
        scaleX: 0,
        duration: 1.1,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      })
      gsap.from(ref.current.querySelector('.eyebrow'), {
        opacity: 0,
        x: -16,
        duration: 0.8,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="mb-12 flex items-center gap-6 md:mb-16">
      <p className={`eyebrow shrink-0 ${color}`}>
        <span className="mr-3 text-gold">{num}</span>
        {title}
      </p>
      <div className={`rule w-full ${line}`} />
    </div>
  )
}

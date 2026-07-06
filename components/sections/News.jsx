'use client'

// Scene 8 — news. Editorial list, hairlines grow in, rows slide on hover.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'
import { NEWS } from '@/lib/data'

export default function News() {
  const ref = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      gsap.from(q('.news-row'), {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.news-list')[0], start: 'top 84%' },
      })
      gsap.from(q('.news-rule'), {
        scaleX: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.news-list')[0], start: 'top 84%' },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="news"
      ref={ref}
      data-bg="#f8f2e3"
      data-fg="#221909"
      className="relative px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead num="09" title="News & Insights" />

        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-light leading-[1.05] md:text-6xl">
            Stay <em className="italic text-gold">informed.</em>
          </h2>
          <a
            href="#news"
            data-hover
            className="eyebrow border-b border-ink/30 pb-1 text-ink-soft transition-colors hover:text-gold"
          >
            View all news
          </a>
        </div>

        <div className="news-list">
          {NEWS.map((n) => (
            <a key={n.title} href="#news" data-hover className="group block">
              <div className="news-rule rule w-full bg-ink/15" />
              <div className="news-row flex flex-col gap-2 py-8 transition-transform duration-500 group-hover:translate-x-3 md:flex-row md:items-center md:justify-between md:gap-10" style={{ transitionTimingFunction: 'var(--ease-1)' }}>
                <span className="eyebrow shrink-0 text-ink-soft md:w-36">{n.date}</span>
                <span className="flex-1 font-display text-2xl font-light leading-snug transition-colors duration-500 group-hover:text-gold md:text-3xl">
                  {n.title}
                </span>
                <span className="hidden text-2xl text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                  →
                </span>
              </div>
            </a>
          ))}
          <div className="news-rule rule w-full bg-ink/15" />
        </div>
      </div>
    </section>
  )
}

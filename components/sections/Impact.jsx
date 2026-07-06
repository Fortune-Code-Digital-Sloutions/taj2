'use client'

// Scene 5 — the dark interlude. The page dims mid-scroll and the numbers
// glow. Video slot for the globe loop; a starfield stands in until then.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SectionHead from '@/components/ui/SectionHead'
import Counter from '@/components/ui/Counter'
import { IMPACT_STATS, VIDEOS } from '@/lib/data'
import useVideoReady from '@/lib/useVideoReady'

// deterministic pseudo-random stars (no Math.random — stable SSR markup)
const STARS = Array.from({ length: 70 }, (_, i) => {
  const a = (i * 137.508) % 360
  const r = 8 + ((i * 61) % 84)
  return {
    left: (50 + r * 0.48 * Math.cos((a * Math.PI) / 180)).toFixed(2) + '%',
    top: (52 + r * 0.42 * Math.sin((a * Math.PI) / 180)).toFixed(2) + '%',
    size: `${1 + (i % 3)}px`,
    delay: `${((i % 9) * 0.4).toFixed(1)}s`,
  }
})

export default function Impact() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const hasVideo = useVideoReady(videoRef)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)
      gsap.from(q('.impact-stat'), {
        opacity: 0,
        y: 44,
        duration: 1,
        stagger: 0.1,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: q('.impact-grid')[0], start: 'top 80%' },
      })
      // slow parallax on the glow
      gsap.to(q('.impact-glow'), {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="impact"
      ref={ref}
      data-bg="#0b0806"
      data-fg="#fff2c9"
      className="relative overflow-hidden px-6 py-32 text-cream-deep md:px-12 md:py-48"
    >
      {/* globe video slot */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${hasVideo ? 'opacity-60' : 'opacity-0'}`}
      >
        <source src={VIDEOS.globeLoop.hevc} type='video/mp4; codecs="hvc1"' />
        <source src={VIDEOS.globeLoop.h264} type="video/mp4" />
      </video>

      {/* fallback atmosphere */}
      {!hasVideo && (
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="impact-glow absolute left-1/2 top-[62%] h-[120vh] w-[120vh] -translate-x-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(227,192,126,0.20) 0%, rgba(184,147,63,0.08) 34%, rgba(11,8,6,0) 62%)',
            }}
          />
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-gold-bright/70"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationName: 'twinkle',
                animationDuration: '3.4s',
                animationTimingFunction: 'ease-in-out',
                animationDelay: s.delay,
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
      )}

      <div className="relative mx-auto max-w-7xl">
        <SectionHead num="06" title="Our Impact" tone="light" />

        <h2 className="max-w-3xl font-display text-5xl font-light leading-[1.05] md:text-7xl">
          Real numbers. <em className="italic text-gold-bright">Real impact.</em>
        </h2>
        <p className="mt-6 max-w-md text-[1.02rem] leading-[1.8] text-cream-deep/60">
          Creating value that lasts — measured across two decades, not two quarters.
        </p>

        <div className="impact-grid mt-20 grid grid-cols-2 gap-x-8 gap-y-16 md:mt-28 md:grid-cols-5">
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className="impact-stat">
              <p className="font-display text-6xl font-light text-cream-deep md:text-7xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <div className="rule mt-4 w-10 bg-gold" />
              <p className="eyebrow mt-4 text-cream-deep/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

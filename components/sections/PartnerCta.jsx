'use client'

// Scene 9 — the second gate. The light dims and a new doorway opens:
// this time, crossing it means starting a conversation.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { VIDEOS } from '@/lib/data'
import useVideoReady from '@/lib/useVideoReady'

export default function PartnerCta() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const hasVideo = useVideoReady(videoRef)

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref)

      // the gate glow widens as you approach
      gsap.fromTo(
        q('.cta-door'),
        { scaleY: 0.55, opacity: 0.35 },
        {
          scaleY: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'center 45%', scrub: 0.6 },
        }
      )

      gsap.from(q('.cta-reveal'), {
        opacity: 0,
        y: 44,
        duration: 1.1,
        stagger: 0.12,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
        scrollTrigger: { trigger: ref.current, start: 'top 62%' },
      })
    },
    { scope: ref }
  )

  return (
    <section
      id="contact"
      ref={ref}
      data-bg="#0b0806"
      data-fg="#fff2c9"
      className="relative overflow-hidden px-6 py-36 text-center text-cream-deep md:px-12 md:py-56"
    >
      {/* finale video slot */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 h-full w-full object-cover ${hasVideo ? 'opacity-50' : 'opacity-0'}`}
      >
        <source src={VIDEOS.finaleLoop.hevc} type='video/mp4; codecs="hvc1"' />
        <source src={VIDEOS.finaleLoop.h264} type="video/mp4" />
      </video>

      {/* the second doorway */}
      {!hasVideo && (
        <div className="absolute inset-0 flex items-end justify-center" aria-hidden="true">
          <div
            className="cta-door h-[76%] w-[34vw] origin-bottom md:w-[19vw]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,242,201,0.16) 0%, rgba(227,192,126,0.10) 45%, rgba(184,147,63,0.05) 100%)',
              clipPath: 'polygon(12% 100%, 22% 0%, 78% 0%, 88% 100%)',
              filter: 'blur(1px)',
            }}
          />
          <div className="absolute bottom-0 left-1/2 h-40 w-[60vw] -translate-x-1/2 bg-gold-bright/10 blur-[90px]" />
        </div>
      )}

      <div className="relative mx-auto max-w-4xl">
        <p className="cta-reveal eyebrow mb-10 text-gold">10 — Partner With Us</p>
        <h2 className="cta-reveal font-display text-6xl font-light leading-[1.02] md:text-[6.5rem]">
          Let&apos;s build
          <br />
          what&apos;s next. <em className="italic text-gold-bright">Together.</em>
        </h2>
        <p className="cta-reveal mx-auto mt-10 max-w-md text-[1.02rem] leading-[1.8] text-cream-deep/60">
          Partner with us to unlock new opportunities and create lasting value.
        </p>
        <div className="cta-reveal mt-14">
          <a
            href="mailto:info@tajholding.com"
            data-hover
            data-magnetic
            className="inline-block border border-gold-bright/60 px-12 py-5 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-cream-deep transition-colors duration-500 hover:bg-cream-deep hover:text-night"
            style={{ transitionTimingFunction: 'var(--ease-1)' }}
          >
            Explore Opportunities
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

// Scene 0 — the gate. 300vh of scroll drives the push through the stone
// gate into flat #fff2c9. When /videos/gate-enter.mp4 exists it becomes a
// scroll-scrubbed video; until then the CSS gate stands in with the same
// choreography, so the swap later is invisible to the rest of the site.
import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { VIDEOS } from '@/lib/data'
import useVideoReady from '@/lib/useVideoReady'

// 3D loads client-side only, after the fold — never blocks the video
const LogoReveal = dynamic(() => import('@/components/canvas/LogoReveal'), { ssr: false })

const TITLE = 'POTENTIAL'

export default function GateIntro() {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const hasVideo = useVideoReady(videoRef)

  useGSAP(
    () => {
      const q = gsap.utils.selector(wrapRef)

      // Entrance — after the preloader curtain lifts
      gsap.from(q('.gate-letter'), {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.045,
        delay: 2.5,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      })
      gsap.from(q('.gate-sub'), {
        opacity: 0,
        y: 14,
        duration: 0.9,
        delay: 3.2,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      })
      // The light breathes while the visitor decides
      gsap.to(q('.gate-shaft'), {
        opacity: 0.75,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      // The crossing — scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            const v = videoRef.current
            if (v && v.dataset.ok === '1' && v.duration) {
              v.currentTime = v.duration * Math.min(self.progress / 0.82, 1)
            }
          },
        },
      })

      tl.to(q('.gate-title'), { opacity: 0, y: -60, duration: 0.18 }, 0)
        .to(q('.gate-sub'), { opacity: 0, duration: 0.08 }, 0)
        .to(q('.gate-wall-l'), { xPercent: -34, duration: 0.62, ease: 'none' }, 0.05)
        .to(q('.gate-wall-r'), { xPercent: 34, duration: 0.62, ease: 'none' }, 0.05)
        .to(q('.gate-shaft'), { scaleX: 5.5, opacity: 1, duration: 0.62, ease: 'none' }, 0.05)
        .to(q('.gate-zoom'), { scale: 1.22, duration: 0.75, ease: 'none' }, 0.05)
        .to(
          q('.gate-cream'),
          { clipPath: 'circle(142% at 50% 55%)', duration: 0.34, ease: 'none' },
          0.56
        )
        .fromTo(
          q('.gate-logo3d'),
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'none' },
          0.64
        )

      return () => tl.scrollTrigger && tl.scrollTrigger.kill()
    },
    { scope: wrapRef }
  )

  return (
    <section id="gate" ref={wrapRef} data-bg="#0b0806" data-fg="#fff2c9" className="relative h-[300vh]">
      <div className="gate-stage sticky top-0 h-screen overflow-hidden">
        {/* zoom layer — the push through the gate; the 3D arrival lives outside it */}
        <div className="gate-zoom absolute inset-0">
        {/* Video slot — scrubbed when the asset lands in /public/videos */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full object-cover ${hasVideo ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={VIDEOS.gateEnter.hevc} type='video/mp4; codecs="hvc1"' />
          <source src={VIDEOS.gateEnter.h264} type="video/mp4" />
        </video>

        {/* CSS gate — stands in until the video arrives */}
        {!hasVideo && (
          <div className="absolute inset-0" aria-hidden="true">
            {/* horizon light behind everything */}
            <div className="gate-shaft absolute left-1/2 top-0 h-full w-[26vw] -translate-x-1/2 opacity-55"
              style={{
                background:
                  'linear-gradient(180deg, #fff2c9 0%, #f3d18e 38%, #d9a555 62%, #8a5f2a 82%, #241505 100%)',
                filter: 'blur(2px)',
              }}
            />
            <div className="absolute left-1/2 top-[30%] h-[45vh] w-[40vw] -translate-x-1/2 rounded-full bg-cream-deep/30 blur-[120px]" />

            {/* stone walls */}
            <div className="gate-wall-l absolute inset-y-0 left-0 w-[46%]"
              style={{
                background:
                  'linear-gradient(105deg, #060402 0%, #0e0a06 45%, #17110a 78%, #241a0f 100%)',
                boxShadow: 'inset -60px 0 120px -40px rgba(255, 226, 156, 0.14)',
              }}
            />
            <div className="gate-wall-r absolute inset-y-0 right-0 w-[46%]"
              style={{
                background:
                  'linear-gradient(-105deg, #060402 0%, #0e0a06 45%, #17110a 78%, #241a0f 100%)',
                boxShadow: 'inset 60px 0 120px -40px rgba(255, 226, 156, 0.14)',
              }}
            />

            {/* floor reflection */}
            <div className="absolute inset-x-0 bottom-0 h-[22vh]"
              style={{
                background:
                  'linear-gradient(0deg, rgba(255,226,156,0.10) 0%, rgba(11,8,6,0) 70%)',
              }}
            />
          </div>
        )}

        {/* copy */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <h1 className="gate-title flex overflow-hidden font-display text-[13vw] font-light tracking-[0.28em] text-cream-deep mix-blend-difference md:text-[7.5vw]">
            {TITLE.split('').map((ch, i) => (
              <span key={i} className="gate-letter inline-block">
                {ch}
              </span>
            ))}
          </h1>
          <p className="gate-sub mt-4 text-[0.72rem] font-medium uppercase tracking-[0.4em] text-cream-deep/60">
            Every journey begins with potential
          </p>
        </div>

        <div className="gate-sub absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="eyebrow text-cream-deep/50">Scroll to enter</p>
          <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-cream-deep/20">
            <div className="h-1/2 w-full animate-[drop_1.8s_var(--ease-1)_infinite] bg-gold-bright" />
          </div>
        </div>

        {/* corner UI — storyboard frame furniture */}
        <p className="gate-sub eyebrow absolute bottom-9 left-6 z-10 hidden text-cream-deep/40 md:block md:left-12">
          <span className="mr-3 text-gold-bright/70">01</span>The Gate — Hero
        </p>
        <p className="gate-sub eyebrow absolute bottom-9 right-6 z-10 hidden text-cream-deep/40 md:block md:right-12">
          Unleashing Potential. Creating Growth.
        </p>
        </div>

        {/* the arrival — the gate opens onto the original TAJ 3D hero */}
        <div
          className="gate-cream absolute inset-0 z-20 bg-cream-deep"
          style={{ clipPath: 'circle(0% at 50% 55%)' }}
        >
          <div className="gate-logo3d h-full w-full opacity-0">
            <LogoReveal />
          </div>
        </div>
      </div>
    </section>
  )
}

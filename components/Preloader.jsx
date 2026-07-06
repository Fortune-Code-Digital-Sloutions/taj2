'use client'

// Number-counter loader — irregular increments so it feels real, not scripted.
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function Preloader() {
  const wrapRef = useRef(null)
  const numRef = useRef(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const state = { val: 0 }
    document.documentElement.classList.add('is-loading')

    const tween = gsap.to(state, {
      val: 100,
      duration: 1.9,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = String(Math.round(state.val)).padStart(3, '0')
      },
      onComplete: () => {
        gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove('is-loading')
            document.documentElement.classList.add('is-ready')
            setGone(true)
          },
        })
          .to(numRef.current, { yPercent: -120, opacity: 0, duration: 0.5, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' })
          .to(wrapRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.9,
            ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
          }, '-=0.1')
      },
    })

    return () => tween.kill()
  }, [])

  if (gone) return null

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[10000] flex items-end justify-between bg-night px-6 pb-6 md:px-12 md:pb-10"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <p className="eyebrow text-cream-deep/60">TAJ Holding Group</p>
      <span
        ref={numRef}
        className="font-display text-[18vw] leading-none text-cream-deep md:text-[9rem]"
      >
        000
      </span>
    </div>
  )
}

'use client'

// Scroll-triggered number counter — fires once at 85% viewport.
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function Counter({ value, suffix = '', className = '' }) {
  const ref = useRef(null)

  useGSAP(() => {
    const state = { val: 0 }
    gsap.to(state, {
      val: value,
      duration: 1.6,
      ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(state.val) + suffix
      },
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
    })
  })

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}

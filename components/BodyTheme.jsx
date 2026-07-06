'use client'

// Seamless scene color: sections declare data-bg / data-fg and the body
// tweens between them as they cross the viewport midline. Sections stay
// transparent — the page itself is the canvas.
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function BodyTheme() {
  useEffect(() => {
    const sections = gsap.utils.toArray('[data-bg]')
    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive) return
          gsap.to('body', {
            backgroundColor: el.dataset.bg,
            color: el.dataset.fg || '#221909',
            duration: 0.9,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
      })
    )
    return () => triggers.forEach((t) => t.kill())
  }, [])

  return null
}

'use client'

// Gold dot + lagging ring. Desktop pointer only — never mounts on touch.
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return undefined
    setEnabled(true)
    document.body.dataset.cursor = 'on'

    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }
    let raf

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.14
      ring.y += (pos.y - ring.y) * 0.14
      if (dotRef.current) gsap.set(dotRef.current, { x: pos.x, y: pos.y })
      if (ringRef.current) gsap.set(ringRef.current, { x: ring.x, y: ring.y })
      raf = requestAnimationFrame(tick)
    }

    const onOver = (e) => {
      const hot = e.target.closest('a, button, [data-hover]')
      gsap.to(ringRef.current, {
        scale: hot ? 2.2 : 1,
        opacity: hot ? 0.9 : 0.5,
        duration: 0.35,
        ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      })
    }

    // Magnetic pull on tagged elements
    const magnets = []
    const bindMagnets = () => {
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        const move = (e) => {
          const r = el.getBoundingClientRect()
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.25,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' })
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', leave)
        magnets.push([el, move, leave])
      })
    }
    const t = setTimeout(bindMagnets, 1500) // after sections mount

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    raf = requestAnimationFrame(tick)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      magnets.forEach(([el, move, leave]) => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
      delete document.body.dataset.cursor
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden="true">
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-bright mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-bright opacity-50 mix-blend-difference"
      />
    </div>
  )
}

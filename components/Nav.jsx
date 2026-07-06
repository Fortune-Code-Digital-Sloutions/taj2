'use client'

// Fixed navbar — present from the gate onward. mix-blend-difference keeps
// it legible over video, night stone and cream alike. Staggered entrance
// after the preloader curtain lifts.
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { NAV_LINKS, SECTORS } from '@/lib/data'
import Mark from '@/components/ui/Mark'

export default function Nav() {
  const barRef = useRef(null)
  const menuRef = useRef(null)
  const [open, setOpen] = useState(false)

  // Entrance — logo first, then links, right after the preloader
  useEffect(() => {
    const items = barRef.current.querySelectorAll('.nav-item')
    const tl = gsap.timeline({ delay: 2.7 })
    tl.fromTo(
      barRef.current,
      { yPercent: -130 },
      { yPercent: 0, duration: 0.9, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' }
    ).fromTo(
      items,
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' },
      '-=0.4'
    )
    return () => tl.kill()
  }, [])

  // Fullscreen menu open/close
  useEffect(() => {
    if (!menuRef.current) return
    if (open) {
      document.documentElement.style.overflow = 'hidden'
      const rows = menuRef.current.querySelectorAll('.menu-item')
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' }
      )
      gsap.fromTo(
        rows,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, delay: 0.3, ease: 'cubic-bezier(0.76, 0, 0.24, 1)' }
      )
    } else {
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (!el) return
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const closeMenu = () => {
    gsap.to(menuRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.6,
      ease: 'cubic-bezier(0.76, 0, 0.24, 1)',
      onComplete: () => setOpen(false),
    })
  }

  return (
    <>
      <header
        ref={barRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] mix-blend-difference"
      >
        <nav className="flex items-center justify-between px-6 py-5 md:px-12">
          <a
            href="#gate"
            onClick={(e) => go(e, '#gate')}
            className="nav-item pointer-events-auto flex items-center gap-3 text-cream-deep"
            aria-label="TAJ Holding Group — home"
            data-hover
          >
            <Mark className="h-7 w-7" />
            <span className="flex flex-col leading-none">
              <span className="eyebrow">TAJ Holding Group</span>
              <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.3em] text-cream-deep/50">
                Unleashing Potential
              </span>
            </span>
          </a>

          <ul className="pointer-events-auto hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label} className="nav-item">
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="nav-link relative text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-cream-deep"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Menu toggle — always available, only control on mobile */}
          <button
            type="button"
            data-hover
            onClick={() => setOpen(true)}
            className="nav-item group pointer-events-auto flex items-center gap-3 text-cream-deep lg:ml-10"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="eyebrow hidden sm:block">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-7 bg-cream-deep transition-transform duration-500 group-hover:scale-x-75" style={{ transformOrigin: 'right', transitionTimingFunction: 'var(--ease-1)' }} />
              <span className="block h-px w-7 bg-cream-deep" />
            </span>
          </button>
        </nav>
      </header>

      {/* Fullscreen menu — the gate hall revisited */}
      {open && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-[400] flex flex-col bg-night px-6 py-6 text-cream-deep md:px-12"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
        >
          {/* faint gate glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-0 hidden h-full w-[16vw] md:block"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,242,201,0.10) 0%, rgba(227,192,126,0.05) 55%, rgba(11,8,6,0) 100%)',
              clipPath: 'polygon(18% 0%, 82% 0%, 96% 100%, 4% 100%)',
            }}
          />

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3 text-gold-bright">
              <Mark className="h-7 w-7" />
              <span className="eyebrow text-cream-deep/60">TAJ Holding Group</span>
            </span>
            <button type="button" data-hover onClick={closeMenu} className="eyebrow text-gold-bright">
              Close ✕
            </button>
          </div>

          <div className="grid flex-1 content-center gap-12 md:grid-cols-[1.5fr_1fr]">
            <ul>
              {NAV_LINKS.map((l, i) => (
                <li key={l.label} className="overflow-hidden">
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    data-hover
                    className="menu-item group flex items-baseline gap-5 py-2 font-display text-5xl font-light text-cream-deep transition-colors duration-400 hover:text-gold-bright md:text-7xl"
                  >
                    <span className="text-xs tracking-[0.3em] text-gold">0{i + 1}</span>
                    <span className="italic-on-hover">{l.label}</span>
                    <span className="ml-2 -translate-x-3 text-3xl text-gold-bright opacity-0 transition-all duration-400 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <p className="menu-item eyebrow mb-6 text-gold">Our Sectors</p>
              <ul className="space-y-2">
                {SECTORS.map((s) => (
                  <li key={s.id} className="overflow-hidden">
                    <span className="menu-item block text-sm text-cream-deep/55">{s.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <p className="menu-item eyebrow text-cream-deep/40">
              Cloud Tower, King Fahd Road, Riyadh
            </p>
            <p className="menu-item eyebrow text-cream-deep/40">
              Unleashing Potential. Creating Growth.
            </p>
          </div>
        </div>
      )}
    </>
  )
}

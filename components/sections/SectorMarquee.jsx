'use client'

// Gold ticker — the one loud element between the quiet sections.
import { SECTORS } from '@/lib/data'

export default function SectorMarquee() {
  const row = SECTORS.map((s) => s.name)

  return (
    <div data-bg="#f8f2e3" data-fg="#221909" className="overflow-hidden border-y border-ink/10 py-5">
      <div className="marquee-track flex w-max items-center gap-10">
        {[...row, ...row].map((name, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-3xl font-light italic text-ink/80 md:text-4xl">{name}</span>
            <span className="h-2 w-2 rotate-45 bg-gold" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  )
}

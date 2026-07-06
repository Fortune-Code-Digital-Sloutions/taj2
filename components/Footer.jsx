'use client'

// Footer — refined, dark, keeps the visitor connected.
import Mark from '@/components/ui/Mark'
import { NAV_LINKS, SECTORS } from '@/lib/data'

export default function Footer() {
  return (
    <footer data-bg="#0b0806" data-fg="#fff2c9" className="px-6 pb-10 pt-24 text-cream-deep md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3 text-gold-bright">
              <Mark className="h-9 w-9" />
              <span className="eyebrow text-cream-deep">TAJ Holding Group</span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-[1.8] text-cream-deep/50">
              Unleashing potential and creating growth across industries for a
              better tomorrow.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-6 text-gold">Navigation</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-cream-deep/60 transition-colors hover:text-cream-deep">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-6 text-gold">Our Sectors</p>
            <ul className="space-y-3">
              {SECTORS.map((s) => (
                <li key={s.id} className="text-sm text-cream-deep/60">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-6 text-gold">Contact Us</p>
            <address className="space-y-3 text-sm not-italic leading-relaxed text-cream-deep/60">
              <p>
                Cloud Tower, 4th Floor
                <br />
                King Fahd Road, Riyadh
                <br />
                Kingdom of Saudi Arabia
              </p>
              <p>
                <a href="tel:+966114565666" className="transition-colors hover:text-cream-deep">
                  +966 11 456 5666
                </a>
              </p>
              <p>
                <a href="mailto:info@tajholding.com" className="transition-colors hover:text-cream-deep">
                  info@tajholding.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-cream-deep/10 pt-8 md:flex-row">
          <p className="text-xs text-cream-deep/35">
            © {new Date().getFullYear()} TAJ Holding Group. All rights reserved.
          </p>
          <p className="eyebrow text-cream-deep/35">Unleashing Potential. Creating Growth.</p>
        </div>
      </div>
    </footer>
  )
}

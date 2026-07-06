import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import Preloader from '@/components/Preloader'
import Cursor from '@/components/Cursor'
import BodyTheme from '@/components/BodyTheme'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display-var',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans-var',
})

export const metadata = {
  title: 'TAJ Holding Group — Unleashing Potential. Creating Growth.',
  description:
    'TAJ Holding Group. Seven industries, one vision. Established 2008 — building strong companies across the GCC toward Vision 2030.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <Preloader />
        <Cursor />
        <SmoothScroll>
          <BodyTheme />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

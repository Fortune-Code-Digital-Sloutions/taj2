import Nav from '@/components/Nav'
import GateIntro from '@/components/sections/GateIntro'
import Purpose from '@/components/sections/Purpose'
import Ecosystem from '@/components/sections/Ecosystem'
import SectorMarquee from '@/components/sections/SectorMarquee'
import Sectors from '@/components/sections/Sectors'
import Companies from '@/components/sections/Companies'
import Impact from '@/components/sections/Impact'
import Leadership from '@/components/sections/Leadership'
import Journey from '@/components/sections/Journey'
import News from '@/components/sections/News'
import PartnerCta from '@/components/sections/PartnerCta'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <GateIntro />
      <Purpose />
      <Ecosystem />
      <SectorMarquee />
      <Sectors />
      <Companies />
      <Impact />
      <Leadership />
      <Journey />
      <News />
      <PartnerCta />
      <Footer />
    </main>
  )
}

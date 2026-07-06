// Content extracted from the TAJ Holding Group storyboard (The Gate Concept)

export const SECTORS = [
  { id: 'fashion', num: '01', name: 'Fashion Retail', blurb: 'Curated retail concepts and brands built for the modern GCC consumer.' },
  { id: 'food', num: '02', name: 'Food & Beverage', blurb: 'From production to plate — food ventures with regional reach.' },
  { id: 'aviation', num: '03', name: 'Aviation & Defense', blurb: 'Advanced solutions. Trusted performance. Bringing safety and innovation to the skies.' },
  { id: 'tech', num: '04', name: 'Technology & IT', blurb: 'Digital infrastructure and services powering tomorrow’s enterprises.' },
  { id: 'manufacturing', num: '05', name: 'Manufacturing', blurb: 'Industrial capability built on precision, scale and discipline.' },
  { id: 'realestate', num: '06', name: 'Real Estate', blurb: 'Developments that shape skylines and hold their value.' },
  { id: 'services', num: '07', name: 'Business Services', blurb: 'Shared expertise that lets every company in the group move faster.' },
]

export const ECOSYSTEM = [
  'Investment Strategy',
  'Operational Excellence',
  'Disciplined Execution',
  'Sustainable Impact',
  'Entrepreneurship',
  'Global Expertise',
]

export const COMPANIES = [
  { name: 'BESIDE', field: 'Retail' },
  { name: 'نظم', field: 'Nudhum' },
  { name: 'MILESTONE', field: 'Aviation Services' },
  { name: 'TAM', field: 'Group Aviation' },
  { name: 'NAFISCO', field: 'Trading' },
  { name: 'AHB', field: 'Design & Build' },
  { name: 'NUCORP', field: 'Shared Services' },
  { name: 'AUS', field: 'Renewable Energy' },
  { name: 'AHC', field: 'Construction' },
  { name: 'MEG CO.', field: 'Electrical Panels' },
]

export const IMPACT_STATS = [
  { value: 25, suffix: '+', label: 'Years of Growth' },
  { value: 70, suffix: '+', label: 'Companies' },
  { value: 15, suffix: '+', label: 'Industries' },
  { value: 8, suffix: '', label: 'Countries' },
  { value: 15, suffix: 'K+', label: 'Expert Employees' },
]

export const MILESTONES = [
  { year: '2008', label: 'Established' },
  { year: '2012', label: 'Expanded' },
  { year: '2016', label: 'Growing' },
  { year: '2020', label: 'Accelerating' },
  { year: '2030', label: 'Vision' },
]

export const NEWS = [
  { date: '11 May 2025', title: 'TAM Group Appoints New Group COO' },
  { date: '14 Apr 2025', title: 'Taj Holding Group Appoints Group Internal Audit Director' },
  { date: '10 Apr 2025', title: 'Taj Holding Group Appoints Legal Affairs Director' },
]

export const NAV_LINKS = [
  { label: 'About Us', href: '#purpose' },
  { label: 'Our Sectors', href: '#sectors' },
  { label: 'Portfolio', href: '#companies' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

/*
 * Video asset slots — every clip ships as an HEVC/H264 pair served via dual
 * <source> tags (hvc1 primary, h264 universal fallback). Drop files into
 * /public/videos/ with these names and the site picks them up automatically.
 * Missing pair -> the scene renders its built-in CSS fallback.
 *
 * Encoding contract (see docs/DESIGN-SYSTEM.md):
 *  - scrubbed clips (gate-enter): keyint=1 all-intra, HEVC crf ~31 / H264 crf-4
 *  - loops (globe, finale): keyint=120, start frame === end frame
 *  - never bake text into the video
 */
export const VIDEOS = {
  gateEnter: { hevc: '/videos/gate-enter-hevc.mp4', h264: '/videos/gate-enter-h264.mp4' },
  globeLoop: { hevc: '/videos/globe-loop-hevc.mp4', h264: '/videos/globe-loop-h264.mp4' },
  finaleLoop: { hevc: '/videos/finale-loop-hevc.mp4', h264: '/videos/finale-loop-h264.mp4' },
}

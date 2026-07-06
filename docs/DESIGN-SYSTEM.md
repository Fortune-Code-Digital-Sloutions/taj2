# TAJ Holding Group — Design System

## Creative Direction
**Feeling:** monumental · ceremonial · warm
**This site feels like:** standing inside a dark stone hall at sunset — the light through the doorway is the brand.
**This site does NOT feel like:** a corporate template, a SaaS landing page, purple-gradient AI slop.
**Motion DNA:** everything moves like a heavy door — slow start, committed middle, soft landing. One curve, everywhere.

## The Narrative (scene order)
dark → LIGHT LIGHT LIGHT LIGHT → dark (Impact) → light light light → dark (finale + footer)

| # | Scene | Component | Tone |
|---|-------|-----------|------|
| 01 | The Gate (hero, 300vh scrub) | `sections/GateIntro` | night |
| 02 | Our Purpose (arrival) | `sections/Purpose` | cream-deep #fff2c9 |
| 03 | Ecosystem (SVG constellation) | `sections/Ecosystem` | cream #f8f2e3 |
| — | Sector marquee (the one loud strip) | `sections/SectorMarquee` | cream |
| 04 | Seven Gates (sectors) | `sections/Sectors` | cream + stone panels |
| 05 | Companies grid | `sections/Companies` | cream |
| 06 | Impact (dark interlude, counters) | `sections/Impact` | night |
| 07 | Leadership | `sections/Leadership` | cream-deep |
| 08 | Journey timeline | `sections/Journey` | cream |
| 09 | News | `sections/News` | cream |
| 10 | Partner CTA (second gate) | `sections/PartnerCta` | night |
| — | Footer | `Footer` | night |

Body background/color is tweened between scenes by `components/BodyTheme.jsx`
reading `data-bg` / `data-fg` off each section. Sections stay transparent.

## Color Tokens (Tailwind `@theme` in app/globals.css)
| Token | Value | Usage |
|-------|-------|-------|
| night | #0b0806 | dark scenes background |
| stone | #17110a | gate panels, hover fills |
| stone-hi | #241a0f | panel highlights |
| cream-deep | #fff2c9 | the "arrival" color — end frame of the gate video |
| cream | #f8f2e3 | long light sections (easier on the eyes) |
| cream-dim | #efe4cb | subtle surfaces |
| ink | #221909 | text on light |
| ink-soft | #6f5f43 | secondary text on light |
| gold | #b8933f | accent on light backgrounds (AA on cream) |
| gold-bright | #e3c07e | accent on dark backgrounds |

Rules: gold appears sparingly — italic words, hairlines, dots, one CTA border.
Never more than 3 colors in one view.

## Typography
| Role | Font | Notes |
|------|------|-------|
| Display | Cormorant Garamond (300–600 + italic) | headlines, numbers; italic gold word = the signature move |
| UI/Body | Manrope | body, labels |
| Label | `.eyebrow` class | 0.72rem, 600, tracking 0.34em, uppercase |

Display:body ratio ≥ 7:1. Italic accent word appears once per headline.

## Motion
- **One easing:** `--ease-1: cubic-bezier(0.76, 0, 0.24, 1)` (counters may use out-expo `0.16,1,0.3,1`)
- ScrollTrigger start: `top 85%` region (78–88% depending on element weight)
- Stagger: 0.06–0.12s
- Durations: micro 0.25 / fast 0.45 / base 0.8 / slow 1.2
- Smooth scroll: Lenis 1.15s, disabled under `prefers-reduced-motion`
- NEVER: bounce, elastic (except the cursor-magnet release), spring overshoot

## Video Asset Slots (start-frame → end-frame system)
Defined in `lib/data.js` → `VIDEOS`. Drop files in `/public/videos/`:
| File | Contract |
|------|----------|
| gate-enter.mp4 | starts on gate still → ends flat #fff2c9. Scroll-scrubbed — encode with `ffmpeg -g 1` for smooth seeking |
| gate-idle.mp4 | loop, start === end frame (not wired yet — GateIntro CSS handles idle) |
| globe-loop.mp4 | dark globe loop, start === end |
| finale-loop.mp4 | sunset gate/handshake loop, start === end |

Every slot has a CSS fallback with the same choreography — swapping in the
video changes nothing else. **Never bake text into the videos** (RTL/SEO).

## What This Site NEVER Does
- Text baked into video
- Gold on gold, or accent used as a large background
- A second easing curve
- Scroll hijacking outside the gate scrub sections
- Hover-only information on touch devices (gates open on tap)

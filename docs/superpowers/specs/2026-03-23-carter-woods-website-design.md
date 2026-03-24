# Carter Woods — Personal Website Design Spec

## Overview

A high-energy, immersive single-page website for Carter Woods, Canadian XC mountain bike racer on the Giant Factory Off-Road Team. The site is a visual showpiece — designed to make people say "damn, go look at Carter's website." It won't be updated frequently; it's a static, hardcoded experience with no CMS.

## Goals

- **Primary:** Create a jaw-dropping web experience that fans share because it's impressive
- **Non-goals:** Sponsor acquisition, content publishing, race recaps, self-service editing

## Target Audience

Fans, fellow riders, and anyone sent the link. The site should impress both cycling enthusiasts and people who know nothing about XC racing.

## Design Direction

**High-energy & immersive** with bold section-based design as the foundation, plus targeted scroll-driven animations at key moments. Motion only where it amplifies the content — restraint makes the animated moments hit harder.

**Color palette:**
- Background: `#0a0a0a` (near-black)
- Accent: `#ff4500` (aggressive orange)
- Text: white for headlines, `#999`/`#777` for body
- Subtle: `rgba(255,69,0,0.1)` borders and glows

**Typography:**
- Headlines: Bold display sans-serif (900 weight, tight letter-spacing)
- Section labels: `Courier New` or similar monospace, 9px, all-caps, wide letter-spacing
- Body: System sans-serif, small size, muted color

**Film grain overlay** across the entire site for cinematic texture.

## Navigation

**Vertical side rail** — fixed on the right edge of the viewport. Numbered chapters (01–05) with labels that track scroll position via a glowing orange indicator line. Fades to just numbers on mobile.

Section names:
- 01 — The Roots
- 02 — The Numbers
- 03 — The Machine
- 04 — The Moments
- 05 — The Partners

No top nav bar. No redundant logo. The hero has no navigation overlay — the side rail appears after scrolling past the hero.

## Sections

### 00 — Hero (Full Viewport)

**Layout:** Full-bleed photo background with centered text overlay. No top navigation.

**Photo:** `651246149_18186299323368723_1206937785783111305_n.jpg` (Albstadt mud victory, arms spread crossing the finish line). 1080x720 JPEG, 114KB.

**Content:**
- Subtitle: "Canadian XC Mountain Bike" (orange, small caps, wide tracking)
- Name: "CARTER WOODS" (massive, 900 weight, tight tracking)
- 3 teaser stats at bottom: "5 World Cup Wins" / "6x National Champion" / "24 Years Old"
- Bottom-right: "SCROLL TO EXPLORE" in vertical text, very faint

**Animations:**
- Name slams in with scale animation on page load (GSAP)
- Photo has parallax — shifts slower than scroll speed
- Stats count up from 0 when they enter viewport
- Subtle speed lines drift horizontally on CSS loop
- Film grain overlay
- On scroll down, entire hero fades + scales slightly to reveal next section

### 01 — The Roots (About / Origin Story)

**Layout:** Horizontal split — text left, photo right.

**Photo:** `520635155_18510177286029554_5417697810450795149_n.jpg` (finish line wheelie celebration). 1080x720 JPEG, 187KB.

**Content (left):**
- Section label: "01 — THE ROOTS" (monospace, orange)
- Headline: "Born from the trails of Cumberland"
- Body: "From BMX tracks on Vancouver Island to World Cup podiums across Europe. A small-town kid from the Pacific Northwest rainforest who became the first Canadian man to win a U23 XCO World Cup."

**Animations:**
- Text slides in from left on scroll-enter
- Photo reveals with a wipe transition from left to right
- Subtle parallax on the photo

### 02 — The Numbers (Stats / Palmares)

**Layout:** Big stat cards in a 3-column grid on top, vertical career timeline below.

**Background photo:** `473112416_18474599503029554_4899687034926118350_n.jpg` (Canadian jersey leading peloton). 1080x719 JPEG, 122KB. Heavily darkened as a subtle background texture.

**Stat cards (top):**
| Stat | Label |
|------|-------|
| 5 | World Cup Wins |
| 14 | WC Podiums |
| 6 | National Titles |

Cards have subtle orange border and dark glass background.

**Career timeline (bottom):**
| Year | Milestone |
|------|-----------|
| 2018 | Junior National Champion — the beginning |
| 2021 | First Canadian to win U23 XCO World Cup ★ (highlighted) |
| 2023 | Elite National Champion — double XCO + XCC |
| 2025 | 2nd XCC World Cup overall — elite breakthrough |
| 2026 | The chapter being written now |

**Animations:**
- Stat cards count up from 0 as they enter viewport (GSAP)
- Timeline items stagger in one-by-one with a slight slide
- 2021 milestone line has a brighter orange glow — the historic moment

### 03 — The Machine (Bike Setup)

**Layout:** Horizontal split — photo left (wider), specs right.

**Photo:** `520162167_18509624404029554_6234318489082901777_n.jpg` (navigating rock garden through trees). 1080x721 JPEG, 206KB.

**Content (right):**
- Section label: "03 — THE MACHINE" (monospace, orange)
- Headline: "Giant Anthem Advanced Pro 29"
- Specs grid (2 columns):

| Category | Value |
|----------|-------|
| Fork | Fox 34 SL 120mm |
| Drivetrain | Shimano XTR Di2 |
| Wheels | Giant XCR Carbon |
| Tires | Maxxis Aspen 2.40 |
| Shock | Fox Float SL |
| Weight | 10.3 kg |

**Animations:**
- Spec items appear with a quick typewriter-style reveal
- Photo has subtle parallax

### 04 — The Moments (Gallery)

**Layout:** Asymmetric masonry grid — different sized cards. One tall, some square, one wide.

**Photos (all 6):**
| File | Description | Grid position |
|------|-------------|---------------|
| `472790099...jpg` | Snowshoe podium, Canadian jersey | Tall (spans 2 rows) |
| `520256372...jpg` | World Cup peloton, mountains | Standard |
| `651246149...jpg` | Albstadt mud victory | Standard |
| `520635155...jpg` | Finish line wheelie | Wide (spans 2 columns) |
| `520162167...jpg` | Technical roots | Standard |
| `473112416...jpg` | Canadian jersey peloton lead | Standard |

All images: 1080px wide, ~720px tall, JPEG. Must not stretch beyond native 1080px width. Use `object-fit: cover` for cropping within grid cells.

**Animations:**
- Photos scale up from 95% → 100% on scroll-enter with a slight rotation
- On hover: lift with shadow, show caption overlay with location/event name
- Whole grid has subtle drift animation

### 05 — The Partners (Sponsors) + Footer

**Layout:** Sponsor logos in muted glass cards centered, minimal footer below.

**Sponsors:** Giant, Shimano, FOX, Maxxis, 100%, CADEX, CushCore (text-only logos in bordered cards — no images needed)

**Footer:**
- Name: "CARTER WOODS" (bold)
- Subtitle: "Cumberland, BC — Giant Factory Off-Road Team"
- Social icons: Instagram (@carterwoodsmtb), X (@carterwoodsrace) — circular bordered icons

**Animations:**
- Logos fade in with stagger delay
- Social icons pulse orange glow on hover
- Section transitions from racing energy to calm — the cool-down

## Image Handling

All 6 images are Instagram-resolution JPEGs at 1080px wide, ~720px tall, 114–206KB.

**Strategy:**
- Use Next.js `<Image>` component with automatic optimization (WebP conversion, responsive srcsets)
- Generate blur placeholder data URLs at build time for smooth loading
- Never upscale beyond 1080px native width — constrain with `max-width`
- Use `object-fit: cover` with `object-position` tuned per image for best cropping
- Priority loading for hero image, lazy loading for everything else
- Images stored in `/public/images/` with shorter filenames (e.g., `hero-albstadt.jpg`, `podium-snowshoe.jpg`)

## Responsive Behavior

- **Desktop (1024px+):** Full experience with side rail nav, split layouts, masonry grid
- **Tablet (768–1023px):** Side rail collapses to numbered dots only. Split layouts stack. Masonry becomes 2-column
- **Mobile (< 768px):** Side rail becomes bottom dots or hidden. All layouts stack vertically. Hero text scales down. Gallery becomes single-column with swipe hints. Animations simplified (reduce parallax, remove rotation)

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, static export) |
| Styling | Tailwind CSS v4 |
| Animations | GSAP ScrollTrigger (hero, stats) + CSS scroll-driven animations (reveals, parallax) |
| Typography | Bold display font (Google Fonts — specific choice at implementation) + monospace accent |
| Images | next/image with blur placeholders |
| Hosting | Vercel (static deployment) |
| Repository | GitHub (new repo to be created) |

## Performance Targets

- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Total image payload: < 1MB (after Next.js optimization)
- GSAP loaded only for sections that use it (dynamic import)
- Prefer CSS animations over JS where equivalent

## File Structure (Planned)

```
carter-woods/
├── public/
│   └── images/          # Renamed, optimized source photos
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout, fonts, metadata
│   │   └── page.tsx     # Single page, imports all sections
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── TheRoots.tsx
│   │   ├── TheNumbers.tsx
│   │   ├── TheMachine.tsx
│   │   ├── TheMoments.tsx
│   │   ├── ThePartners.tsx
│   │   ├── SideRail.tsx
│   │   └── FilmGrain.tsx
│   └── lib/
│       └── animations.ts  # GSAP setup and scroll triggers
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

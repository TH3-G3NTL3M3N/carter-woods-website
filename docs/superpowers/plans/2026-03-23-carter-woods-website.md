# Carter Woods Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-energy, immersive single-page website for Carter Woods (Canadian XC mountain biker) that makes people go "damn, look at this site."

**Architecture:** Next.js 15 App Router static site with Tailwind CSS v4. Scroll-driven animations via GSAP ScrollTrigger for hero/stats and CSS animations for reveals. Single page composed of 6 section components + a fixed side rail nav. Mobile-first responsive design.

**Tech Stack:** Next.js 15, Tailwind CSS v4, GSAP + ScrollTrigger, TypeScript, Google Fonts (Bebas Neue for display, JetBrains Mono for labels), Vercel hosting.

**Spec:** `docs/superpowers/specs/2026-03-23-carter-woods-website-design.md`

---

## File Structure

```
carter-woods/
├── public/
│   └── images/
│       ├── hero-albstadt.jpg          # Mud victory arms spread (651246149...)
│       ├── celebration-wheelie.jpg    # Finish line wheelie (520635155...)
│       ├── peloton-mountains.jpg      # World Cup peloton (520256372...)
│       ├── technical-roots.jpg        # Rock garden trail (520162167...)
│       ├── podium-snowshoe.jpg        # Snowshoe podium (472790099...)
│       └── lead-canadian-jersey.jpg   # Leading peloton (473112416...)
├── src/
│   ├── app/
│   │   ├── globals.css       # Tailwind directives, CSS custom properties, grain overlay, speed lines
│   │   ├── layout.tsx        # Root layout, fonts, metadata, OG tags
│   │   └── page.tsx          # Single page composing all sections
│   ├── components/
│   │   ├── Hero.tsx          # Full-viewport hero with photo bg + name + stats
│   │   ├── TheRoots.tsx      # About section, split layout
│   │   ├── TheNumbers.tsx    # Stats cards + career timeline
│   │   ├── TheMachine.tsx    # Bike specs, split layout
│   │   ├── TheMoments.tsx    # Photo gallery masonry grid
│   │   ├── ThePartners.tsx   # Sponsors + footer
│   │   ├── SideRail.tsx      # Fixed vertical nav with scroll tracking
│   │   └── FilmGrain.tsx     # CSS film grain overlay component
│   ├── hooks/
│   │   └── useScrollSpy.ts   # IntersectionObserver hook for active section tracking
│   └── lib/
│       └── animations.ts     # GSAP ScrollTrigger registration + reusable triggers
├── tailwind.config.ts        # Custom colors, fonts, screens
├── next.config.ts            # Image optimization config, static export
├── tsconfig.json
└── package.json
```

---

### Task 1: Project Scaffolding + Image Setup

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Create: `public/images/` (copy + rename photos)

- [ ] **Step 1: Create Next.js project**

```bash
cd /Users/simruelland/Documents/WebApps/CarterWoods
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

Accept defaults. This scaffolds the project with Next.js 15, Tailwind v4, TypeScript, App Router, and src directory.

- [ ] **Step 2: Install GSAP**

```bash
npm install gsap
```

- [ ] **Step 3: Install Google Fonts via next/font**

No extra install needed — `next/font/google` is built into Next.js. We'll use Bebas Neue (display) and JetBrains Mono (monospace labels).

- [ ] **Step 4: Copy and rename images**

```bash
mkdir -p public/images
cp 651246149_18186299323368723_1206937785783111305_n.jpg public/images/hero-albstadt.jpg
cp 520635155_18510177286029554_5417697810450795149_n.jpg public/images/celebration-wheelie.jpg
cp 520256372_18509624425029554_1671036970612571058_n.jpg public/images/peloton-mountains.jpg
cp 520162167_18509624404029554_6234318489082901777_n.jpg public/images/technical-roots.jpg
cp 472790099_18474599143029554_5663942140869413033_n.jpg public/images/podium-snowshoe.jpg
cp 473112416_18474599503029554_4899687034926118350_n.jpg public/images/lead-canadian-jersey.jpg
```

- [ ] **Step 5: Configure Tailwind with custom theme**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0a",
        accent: "#ff4500",
        "accent-dim": "rgba(255,69,0,0.1)",
        "accent-glow": "rgba(255,69,0,0.3)",
        "text-muted": "#999",
        "text-dim": "#777",
        "text-faint": "#555",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 6: Set up root layout with fonts + metadata**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carter Woods — Canadian XC Mountain Bike",
  description:
    "Official website of Carter Woods. 5x World Cup winner, 6x Canadian National Champion. Giant Factory Off-Road Team.",
  openGraph: {
    title: "Carter Woods — Canadian XC Mountain Bike",
    description: "5x World Cup winner. Cumberland, BC to the world stage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Set up globals.css with base styles, grain, and speed lines**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-bg: #0a0a0a;
  --color-accent: #ff4500;
  --color-accent-dim: rgba(255, 69, 0, 0.1);
  --color-accent-glow: rgba(255, 69, 0, 0.3);
  --color-text-muted: #999;
  --color-text-dim: #777;
  --color-text-faint: #555;
  --font-display: var(--font-bebas), sans-serif;
  --font-mono: var(--font-jetbrains), monospace;
}

/* Film grain overlay */
.film-grain::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.08;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Speed lines */
@keyframes drift-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.speed-line {
  position: absolute;
  height: 1px;
  width: 200%;
  background: linear-gradient(
    90deg,
    transparent 10%,
    var(--color-accent-glow) 30%,
    var(--color-accent) 50%,
    var(--color-accent-glow) 70%,
    transparent 90%
  );
  animation: drift-left 8s linear infinite;
}

/* Scroll-triggered reveals */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-left {
  opacity: 0;
  transform: translateX(-40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal-left.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal-left {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .speed-line {
    animation: none;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 8: Create placeholder page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="film-grain">
      <div className="h-screen flex items-center justify-center">
        <h1 className="font-display text-6xl tracking-tight text-accent">
          CARTER WOODS
        </h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 9: Configure next.config.ts for static export**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Note: Using `unoptimized: true` because static export doesn't support the Next.js image optimization server. Images are already small (114-206KB) and we'll handle optimization via build tooling if needed later.

- [ ] **Step 10: Verify the dev server runs**

```bash
npm run dev
```

Expected: App starts on `localhost:3000`, shows "CARTER WOODS" in Bebas Neue with orange color, film grain visible as subtle texture over the page.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind, GSAP, fonts, images, and base styles"
```

---

### Task 2: FilmGrain + useScrollSpy + SideRail

**Files:**
- Create: `src/components/FilmGrain.tsx`
- Create: `src/hooks/useScrollSpy.ts`
- Create: `src/components/SideRail.tsx`

- [ ] **Step 1: Create FilmGrain component**

Create `src/components/FilmGrain.tsx`:

```tsx
"use client";

export default function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.06]"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
```

- [ ] **Step 2: Create useScrollSpy hook**

Create `src/hooks/useScrollSpy.ts`:

```ts
"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "the-roots",
  "the-numbers",
  "the-machine",
  "the-moments",
  "the-partners",
];

export function useScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
            setPastHero(index > 0);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return { activeIndex, pastHero, sectionIds: SECTION_IDS };
}
```

- [ ] **Step 3: Create SideRail component**

Create `src/components/SideRail.tsx`:

```tsx
"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";

const SECTIONS = [
  { num: "01", label: "The Roots" },
  { num: "02", label: "The Numbers" },
  { num: "03", label: "The Machine" },
  { num: "04", label: "The Moments" },
  { num: "05", label: "The Partners" },
];

export default function SideRail() {
  const { activeIndex, pastHero, sectionIds } = useScrollSpy();
  // activeIndex 0 = hero, 1 = the-roots (which maps to SECTIONS[0])
  const activeSectionIndex = activeIndex - 1;

  const scrollTo = (index: number) => {
    const el = document.getElementById(sectionIds[index + 1]);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: vertical side rail */}
      <nav
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-0 transition-opacity duration-500 ${
          pastHero ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Section navigation"
      >
        {/* Active indicator line */}
        <div
          className="absolute -left-4 w-[2px] h-12 bg-accent rounded-full shadow-[0_0_12px_rgba(255,69,0,0.5)] transition-all duration-300"
          style={{ top: `${Math.max(0, activeSectionIndex) * 60}px` }}
        />

        {SECTIONS.map((section, i) => (
          <button
            key={section.num}
            onClick={() => scrollTo(i)}
            className={`py-3 text-right transition-opacity duration-300 cursor-pointer group ${
              activeSectionIndex === i ? "opacity-100" : "opacity-30 hover:opacity-60"
            }`}
          >
            <div className="font-mono text-[9px] tracking-[3px] uppercase text-accent">
              {section.num}
            </div>
            <div className="font-sans text-[11px] font-semibold tracking-[2px] uppercase text-white">
              {section.label}
            </div>
          </button>
        ))}
      </nav>

      {/* Mobile: bottom dots */}
      <nav
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex lg:hidden gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/5 transition-opacity duration-500 ${
          pastHero ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Section navigation"
      >
        {SECTIONS.map((section, i) => (
          <button
            key={section.num}
            onClick={() => scrollTo(i)}
            className="p-1 cursor-pointer"
            aria-label={section.label}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSectionIndex === i
                  ? "bg-accent shadow-[0_0_8px_rgba(255,69,0,0.6)] scale-125"
                  : "bg-white/30"
              }`}
            />
          </button>
        ))}
      </nav>
    </>
  );
}
```

- [ ] **Step 4: Verify dev server still runs cleanly**

```bash
npm run dev
```

Expected: No errors. Components aren't wired into the page yet — that comes later.

- [ ] **Step 5: Commit**

```bash
git add src/components/FilmGrain.tsx src/hooks/useScrollSpy.ts src/components/SideRail.tsx
git commit -m "feat: add FilmGrain overlay, useScrollSpy hook, and SideRail nav component"
```

---

### Task 3: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/lib/animations.ts`

- [ ] **Step 1: Create GSAP animation utilities**

Create `src/lib/animations.ts`:

```ts
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function createHeroTimeline(container: HTMLElement) {
  registerGSAP();

  // Name slam-in animation
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(container.querySelector(".hero-subtitle"), {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.2,
  })
    .from(
      container.querySelector(".hero-name"),
      {
        opacity: 0,
        scale: 1.3,
        duration: 0.6,
      },
      "-=0.3"
    )
    .from(
      container.querySelectorAll(".hero-stat"),
      {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
      },
      "-=0.2"
    );

  // Hero fade + scale on scroll
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set(container, {
        opacity: 1 - progress,
        scale: 1 - progress * 0.05,
      });
    },
  });

  return tl;
}

export function createCountUp(
  elements: NodeListOf<Element>,
  trigger: HTMLElement
) {
  registerGSAP();

  elements.forEach((el) => {
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      },
    });
  });
}
```

- [ ] **Step 2: Create Hero component**

Create `src/components/Hero.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createHeroTimeline } from "@/lib/animations";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const tl = createHeroTimeline(el);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-between"
    >
      {/* Background photo */}
      <Image
        src="/images/hero-albstadt.jpg"
        alt="Carter Woods crossing the finish line at Albstadt, arms spread wide, covered in mud"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_60%,rgba(255,69,0,0.08),transparent_60%)]" />

      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="speed-line absolute top-[30%] opacity-40" />
        <div className="speed-line absolute top-[50%] opacity-25" style={{ animationDelay: "-3s" }} />
        <div className="speed-line absolute top-[70%] opacity-15 hidden md:block" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 md:px-12 py-10 md:py-16">
        {/* Top spacer */}
        <div />

        {/* Center: name + subtitle */}
        <div className="text-center">
          <p className="hero-subtitle font-mono text-[10px] md:text-xs tracking-[6px] uppercase text-accent font-bold mb-4">
            Canadian XC Mountain Bike
          </p>
          <h1 className="hero-name font-display text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tight text-white">
            CARTER
            <br />
            WOODS
          </h1>
        </div>

        {/* Bottom: stats + scroll hint */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] text-white/30 tracking-wide hidden md:block">
            Cumberland, BC
          </p>

          <div className="flex gap-8 md:gap-10">
            <div className="hero-stat text-center">
              <div className="font-display text-3xl md:text-4xl text-white">5</div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[2px] uppercase text-accent">
                World Cup Wins
              </div>
            </div>
            <div className="hero-stat text-center">
              <div className="font-display text-3xl md:text-4xl text-white">6x</div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[2px] uppercase text-accent">
                National Champ
              </div>
            </div>
            <div className="hero-stat text-center">
              <div className="font-display text-3xl md:text-4xl text-white">24</div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[2px] uppercase text-accent">
                Years Old
              </div>
            </div>
          </div>

          {/* Scroll hint - chevron on mobile, vertical text on desktop */}
          <div className="md:hidden animate-bounce">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
              <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <p
            className="hidden md:block text-[11px] text-white/20 tracking-wide"
            style={{ writingMode: "vertical-lr" }}
          >
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Wire Hero into page.tsx**

Replace `src/app/page.tsx`:

```tsx
import Hero from "@/components/Hero";
import FilmGrain from "@/components/FilmGrain";
import SideRail from "@/components/SideRail";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Placeholder sections for scroll testing */}
      <div id="the-roots" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">01 — THE ROOTS</p>
      </div>
      <div id="the-numbers" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">02 — THE NUMBERS</p>
      </div>
      <div id="the-machine" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">03 — THE MACHINE</p>
      </div>
      <div id="the-moments" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">04 — THE MOMENTS</p>
      </div>
      <div id="the-partners" className="h-screen bg-bg flex items-center justify-center">
        <p className="font-mono text-accent text-sm tracking-widest">05 — THE PARTNERS</p>
      </div>
      <SideRail />
      <FilmGrain />
    </main>
  );
}
```

- [ ] **Step 4: Test in browser**

```bash
npm run dev
```

Expected: Hero fills the viewport with the Albstadt photo, "CARTER WOODS" slams in with animation, stats count visible, speed lines drift. On scroll, hero fades. Side rail appears with glowing indicator. Film grain visible as subtle overlay. On mobile viewport, bottom dots appear instead of side rail, chevron bounces at bottom of hero.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/lib/animations.ts src/app/page.tsx
git commit -m "feat: add Hero section with GSAP animations, parallax, and speed lines"
```

---

### Task 4: The Roots Section

**Files:**
- Create: `src/components/TheRoots.tsx`

- [ ] **Step 1: Create TheRoots component**

Create `src/components/TheRoots.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function TheRoots() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.querySelectorAll(".reveal-left, .reveal").forEach((node) =>
        node.classList.add("visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    el.querySelectorAll(".reveal-left, .reveal").forEach((node) =>
      observer.observe(node)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-roots"
      ref={sectionRef}
      className="relative min-h-screen bg-bg flex items-center py-20 md:py-0"
    >
      <div className="w-full flex flex-col md:flex-row items-stretch">
        {/* Text — left on desktop, below on mobile */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 md:py-0 order-2 md:order-1">
          <div className="reveal-left">
            <p className="font-mono text-[9px] tracking-[4px] uppercase text-accent mb-4">
              01 — The Roots
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-white mb-6">
              Born from the
              <br />
              trails of
              <br />
              Cumberland
            </h2>
            <p className="text-sm md:text-base text-text-dim leading-relaxed max-w-md">
              From BMX tracks on Vancouver Island to World Cup podiums across
              Europe. A small-town kid from the Pacific Northwest rainforest who
              became the first Canadian man to win a U23 XCO World Cup.
            </p>
          </div>
        </div>

        {/* Photo — right on desktop, top on mobile */}
        <div className="flex-1 relative min-h-[50vh] md:min-h-screen order-1 md:order-2">
          <div className="reveal absolute inset-0">
            <Image
              src="/images/celebration-wheelie.jpg"
              alt="Carter Woods celebrating with a wheelie at the finish line, crowd cheering"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient fade into text area */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg via-bg/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace the `id="the-roots"` placeholder div in `page.tsx` with:

```tsx
<TheRoots />
```

Add the import at the top:

```tsx
import TheRoots from "@/components/TheRoots";
```

- [ ] **Step 3: Test in browser**

```bash
npm run dev
```

Expected: Scroll past hero, The Roots section appears with text sliding in from left and photo revealing. On mobile, photo stacks on top full-bleed, text below.

- [ ] **Step 4: Commit**

```bash
git add src/components/TheRoots.tsx src/app/page.tsx
git commit -m "feat: add The Roots about section with scroll reveal animations"
```

---

### Task 5: The Numbers Section

**Files:**
- Create: `src/components/TheNumbers.tsx`

- [ ] **Step 1: Create TheNumbers component**

Create `src/components/TheNumbers.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createCountUp, registerGSAP } from "@/lib/animations";

const STATS = [
  { value: 5, label: "World Cup Wins" },
  { value: 14, label: "WC Podiums" },
  { value: 6, label: "National Titles" },
];

const TIMELINE = [
  { year: "2018", text: "Junior National Champion — the beginning", highlight: false },
  { year: "2021", text: "First Canadian to win U23 XCO World Cup", highlight: true },
  { year: "2023", text: "Elite National Champion — double XCO + XCC", highlight: false },
  { year: "2025", text: "2nd XCC World Cup overall — elite breakthrough", highlight: false },
  { year: "2026", text: "The chapter being written now", highlight: false },
];

export default function TheNumbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reveals
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );

    el.querySelectorAll(".reveal").forEach((node) => {
      if (prefersReduced) node.classList.add("visible");
      else observer.observe(node);
    });

    // Count-up for stat numbers
    if (!prefersReduced) {
      const statEls = el.querySelectorAll("[data-target]");
      createCountUp(statEls, el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-numbers"
      ref={sectionRef}
      className="relative min-h-screen bg-bg py-20 md:py-32 flex items-center"
    >
      {/* Background photo — heavily darkened */}
      <Image
        src="/images/lead-canadian-jersey.jpg"
        alt=""
        fill
        className="object-cover opacity-[0.07]"
        sizes="100vw"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <p className="reveal font-mono text-[9px] tracking-[4px] uppercase text-accent mb-10">
          02 — The Numbers
        </p>

        {/* Stat cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-5 mb-16 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-8 px-8 md:mx-0 md:px-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="reveal flex-shrink-0 w-[75vw] md:w-auto snap-center bg-accent-dim/40 border border-accent-dim rounded-lg p-6 md:p-8 text-center"
            >
              <div
                className="font-display text-5xl md:text-6xl text-white"
                data-target={stat.value}
              >
                {stat.value}
              </div>
              <div className="font-mono text-[9px] tracking-[3px] uppercase text-accent mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Career timeline */}
        <div className="border-l-2 border-accent/20 pl-6 md:pl-8 flex flex-col gap-4">
          {TIMELINE.map((item, i) => (
            <div
              key={item.year}
              className="reveal flex items-baseline gap-4"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className={`font-mono text-sm font-bold min-w-[3rem] ${
                  item.highlight ? "text-accent drop-shadow-[0_0_6px_rgba(255,69,0,0.5)]" : "text-accent/60"
                }`}
              >
                {item.year}
              </span>
              <span
                className={`text-sm ${
                  item.highlight
                    ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(255,69,0,0.4)]"
                    : "text-text-muted"
                }`}
              >
                {item.text}
                {item.highlight && (
                  <span className="text-accent ml-1">★</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace the `id="the-numbers"` placeholder div with `<TheNumbers />` and add the import.

- [ ] **Step 3: Test in browser**

Expected: Stats count up on scroll-enter. Cards swipe horizontally on mobile. Timeline staggers in with the 2021 line glowing brighter. Background photo barely visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/TheNumbers.tsx src/app/page.tsx
git commit -m "feat: add The Numbers section with count-up stats and career timeline"
```

---

### Task 6: The Machine Section

**Files:**
- Create: `src/components/TheMachine.tsx`

- [ ] **Step 1: Create TheMachine component**

Create `src/components/TheMachine.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const SPECS = [
  { category: "Fork", value: "Fox 34 SL 120mm" },
  { category: "Drivetrain", value: "Shimano XTR Di2" },
  { category: "Wheels", value: "Giant XCR Carbon" },
  { category: "Tires", value: "Maxxis Aspen 2.40" },
  { category: "Shock", value: "Fox Float SL" },
  { category: "Weight", value: "10.3 kg" },
];

export default function TheMachine() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    el.querySelectorAll(".reveal, .reveal-left").forEach((node) => {
      if (prefersReduced) node.classList.add("visible");
      else observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-machine"
      ref={sectionRef}
      className="relative min-h-screen bg-bg flex items-center py-20 md:py-0"
    >
      <div className="w-full flex flex-col md:flex-row items-stretch">
        {/* Photo — left on desktop, top on mobile */}
        <div className="flex-[1.2] relative min-h-[50vh] md:min-h-screen">
          <div className="reveal absolute inset-0">
            <Image
              src="/images/technical-roots.jpg"
              alt="Carter Woods navigating a technical rock garden section through trees"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            {/* Gradient fade into specs area */}
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-bg via-bg/40 to-transparent" />
          </div>
        </div>

        {/* Specs — right on desktop, below on mobile */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-12 md:py-0">
          <div className="reveal-left">
            <p className="font-mono text-[9px] tracking-[4px] uppercase text-accent mb-4">
              03 — The Machine
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] text-white mb-8">
              Giant Anthem
              <br />
              Advanced Pro 29
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            {SPECS.map((spec, i) => (
              <div
                key={spec.category}
                className="reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="font-mono text-[9px] tracking-[2px] uppercase text-text-faint">
                  {spec.category}
                </div>
                <div className="text-sm text-white/80 mt-0.5">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace the `id="the-machine"` placeholder div with `<TheMachine />` and add the import.

- [ ] **Step 3: Test in browser**

Expected: Photo left with gradient bleed into specs. Spec items stagger in on scroll. On mobile, photo full-width on top, specs below.

- [ ] **Step 4: Commit**

```bash
git add src/components/TheMachine.tsx src/app/page.tsx
git commit -m "feat: add The Machine bike specs section with staggered reveals"
```

---

### Task 7: The Moments Gallery Section

**Files:**
- Create: `src/components/TheMoments.tsx`

- [ ] **Step 1: Create TheMoments component**

Create `src/components/TheMoments.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PHOTOS = [
  {
    src: "/images/podium-snowshoe.jpg",
    alt: "Carter Woods on the podium at Snowshoe World Cup in Canadian champion jersey",
    caption: "Snowshoe World Cup",
    className: "md:row-span-2",
  },
  {
    src: "/images/peloton-mountains.jpg",
    alt: "Racing through a mountain switchback in the World Cup peloton",
    caption: "World Cup XCO",
    className: "",
  },
  {
    src: "/images/hero-albstadt.jpg",
    alt: "Arms spread crossing the finish line at Albstadt, covered in mud",
    caption: "Albstadt — First Canadian U23 Win",
    className: "",
  },
  {
    src: "/images/celebration-wheelie.jpg",
    alt: "Wheelie celebration at the finish line with crowd cheering",
    caption: "Victory Celebration",
    className: "md:col-span-2",
  },
  {
    src: "/images/technical-roots.jpg",
    alt: "Navigating a technical rock garden section through forest",
    caption: "Technical XCO",
    className: "",
  },
  {
    src: "/images/lead-canadian-jersey.jpg",
    alt: "Leading the peloton in Canadian national champion jersey",
    caption: "Leading the Pack",
    className: "",
  },
];

export default function TheMoments() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    el.querySelectorAll(".gallery-item").forEach((node) => {
      if (prefersReduced) node.classList.add("visible");
      else observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-moments"
      ref={sectionRef}
      className="relative bg-bg py-20 md:py-32"
    >
      <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <p className="reveal font-mono text-[9px] tracking-[4px] uppercase text-accent mb-10">
          04 — The Moments
        </p>

        {/* Desktop: masonry grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-[auto_auto_auto] gap-3">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className={`gallery-item relative overflow-hidden rounded-md group cursor-pointer
                opacity-0 scale-95 transition-all duration-700 ease-out
                [&.visible]:opacity-100 [&.visible]:scale-100
                ${photo.className}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`relative ${photo.className.includes("row-span-2") ? "h-[500px]" : photo.className.includes("col-span-2") ? "h-[250px]" : "h-[240px]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="font-mono text-[10px] tracking-[2px] uppercase text-accent">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single column feed */}
        <div className="flex md:hidden flex-col gap-4">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="gallery-item relative overflow-hidden rounded-lg
                opacity-0 scale-95 transition-all duration-700 ease-out
                [&.visible]:opacity-100 [&.visible]:scale-100"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                {/* Always-visible caption on mobile */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="font-mono text-[10px] tracking-[2px] uppercase text-accent">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace the `id="the-moments"` placeholder div with `<TheMoments />` and add the import.

- [ ] **Step 3: Test in browser**

Expected: Masonry grid on desktop with different card sizes, hover reveals captions. On mobile, single-column feed with captions always visible. Photos scale in on scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/TheMoments.tsx src/app/page.tsx
git commit -m "feat: add The Moments gallery with masonry grid and mobile feed"
```

---

### Task 8: The Partners + Footer Section

**Files:**
- Create: `src/components/ThePartners.tsx`

- [ ] **Step 1: Create ThePartners component**

Create `src/components/ThePartners.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

const SPONSORS = [
  "Giant", "Shimano", "FOX", "Maxxis", "100%", "CADEX", "CushCore",
];

export default function ThePartners() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );

    el.querySelectorAll(".reveal").forEach((node) => {
      if (prefersReduced) node.classList.add("visible");
      else observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-partners"
      ref={sectionRef}
      className="relative bg-bg py-20 md:py-32"
    >
      <div className="px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <p className="reveal font-mono text-[9px] tracking-[4px] uppercase text-accent mb-12 text-center">
          05 — The Partners
        </p>

        {/* Sponsor logos */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20">
          {SPONSORS.map((sponsor, i) => (
            <div
              key={sponsor}
              className="reveal px-5 py-3 md:px-7 md:py-4 border border-white/[0.06] rounded-lg
                text-text-faint font-bold text-xs md:text-sm tracking-wider
                hover:border-accent/20 hover:text-white/60 transition-all duration-300"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {sponsor.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="font-display text-2xl text-white tracking-tight">
                CARTER WOODS
              </div>
              <div className="text-[11px] text-text-faint tracking-wide mt-1">
                Cumberland, BC — Giant Factory Off-Road Team
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/carterwoodsmtb/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 border border-accent/20 rounded-full flex items-center justify-center
                  text-accent text-sm hover:bg-accent/10 hover:shadow-[0_0_12px_rgba(255,69,0,0.3)]
                  transition-all duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://x.com/carterwoodsrace"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 border border-accent/20 rounded-full flex items-center justify-center
                  text-accent text-sm hover:bg-accent/10 hover:shadow-[0_0_12px_rgba(255,69,0,0.3)]
                  transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <p className="text-center text-[10px] text-white/10 mt-10 tracking-wide">
            &copy; {new Date().getFullYear()} Carter Woods
          </p>
        </footer>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into page.tsx**

Replace the `id="the-partners"` placeholder div with `<ThePartners />` and add the import.

- [ ] **Step 3: Test in browser**

Expected: Sponsor cards fade in with stagger, social icons glow on hover. Footer is clean and minimal. Mobile layout centers everything.

- [ ] **Step 4: Commit**

```bash
git add src/components/ThePartners.tsx src/app/page.tsx
git commit -m "feat: add The Partners sponsors section and footer with social links"
```

---

### Task 9: Polish, Final page.tsx Assembly, and Build Test

**Files:**
- Modify: `src/app/page.tsx` (final assembly — remove all placeholders)
- Modify: `src/app/globals.css` (any final polish)

- [ ] **Step 1: Finalize page.tsx**

Ensure `src/app/page.tsx` has all real components and no placeholder divs:

```tsx
import Hero from "@/components/Hero";
import TheRoots from "@/components/TheRoots";
import TheNumbers from "@/components/TheNumbers";
import TheMachine from "@/components/TheMachine";
import TheMoments from "@/components/TheMoments";
import ThePartners from "@/components/ThePartners";
import SideRail from "@/components/SideRail";
import FilmGrain from "@/components/FilmGrain";

export default function Home() {
  return (
    <main>
      <Hero />
      <TheRoots />
      <TheNumbers />
      <TheMachine />
      <TheMoments />
      <ThePartners />
      <SideRail />
      <FilmGrain />
    </main>
  );
}
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds with static export. No errors.

- [ ] **Step 3: Test static export locally**

```bash
npx serve out
```

Expected: Site loads from static files, all sections render, animations work, images load.

- [ ] **Step 4: Test mobile responsiveness**

Open Chrome DevTools → toggle device toolbar → test on iPhone 14 Pro (390px) and iPad (768px). Verify:
- Hero: name scales, chevron visible, stats wrap
- The Roots: photo on top, text below
- The Numbers: stat cards swipe horizontally
- The Machine: photo on top, specs below
- The Moments: single-column feed with visible captions
- The Partners: centered, wrapped grid
- Bottom dots nav visible, side rail hidden

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: finalize all sections, production build verified"
```

---

### Task 10: GitHub Repo + Vercel Deployment

**Files:** None (infrastructure only)

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create carter-woods-website --public --source=. --push
```

This creates the repo on GitHub and pushes the current branch.

- [ ] **Step 2: Deploy to Vercel**

```bash
npx vercel --yes
```

Follow prompts. Since we have `output: "export"` in next.config.ts, Vercel will detect a static Next.js site.

- [ ] **Step 3: Verify deployment**

Open the Vercel URL in browser and on phone. Check all sections load, animations fire, images display correctly.

- [ ] **Step 4: Commit any Vercel config if generated**

```bash
git add -A && git diff --cached --quiet || git commit -m "chore: add Vercel config"
```

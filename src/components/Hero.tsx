"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
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

    // Count up hero stats
    el.querySelectorAll(".hero-stat-num").forEach((statEl) => {
      const target = parseInt(statEl.getAttribute("data-target") || "0", 10);
      const suffix = statEl.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        delay: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          statEl.textContent = Math.round(obj.val).toString() + suffix;
        },
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background photo — parallax target */}
      <div className="hero-bg absolute inset-0">
        <Image
          src="/images/hero-albstadt.jpg"
          alt="Carter Woods crossing the finish line at Albstadt, arms spread wide, covered in mud"
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
      </div>

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

      {/* Content — parallax target (moves faster) */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full px-6 md:px-12">
        {/* Center: name + subtitle */}
        <div className="text-center mb-8">
          <p className="hero-subtitle font-mono text-[10px] md:text-xs tracking-[6px] uppercase text-accent font-bold mb-4">
            Canadian XC Mountain Bike
          </p>
          <h1 className="hero-name font-display text-[clamp(4rem,15vw,10rem)] leading-[0.85] tracking-tight text-white">
            CARTER
            <br />
            WOODS
          </h1>
        </div>

        {/* Stats — perfectly centered */}
        <div className="flex items-center justify-center gap-10 md:gap-14">
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-4xl md:text-5xl text-white" data-target="5" data-suffix="">5</div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-[2px] uppercase text-accent font-bold">
              World Cup Wins
            </div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-4xl md:text-5xl text-white" data-target="6" data-suffix="x">6x</div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-[2px] uppercase text-accent font-bold">
              National Champ
            </div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-4xl md:text-5xl text-white" data-target="24" data-suffix="">24</div>
            <div className="font-mono text-[9px] md:text-[10px] tracking-[2px] uppercase text-accent font-bold">
              Years Old
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint — fixed at bottom, outside content parallax */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p className="hidden md:block text-[10px] text-white/20 tracking-[3px] uppercase">
          Scroll
        </p>
        <div className="w-[1px] h-8 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

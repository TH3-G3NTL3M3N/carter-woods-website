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
        delay: 1,
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
        <div />

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

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] text-white/30 tracking-wide hidden md:block">
            Cumberland, BC
          </p>

          <div className="flex gap-8 md:gap-10">
            <div className="hero-stat text-center">
              <div className="hero-stat-num font-display text-3xl md:text-4xl text-white" data-target="5" data-suffix="">5</div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[2px] uppercase text-accent">
                World Cup Wins
              </div>
            </div>
            <div className="hero-stat text-center">
              <div className="hero-stat-num font-display text-3xl md:text-4xl text-white" data-target="6" data-suffix="x">6x</div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[2px] uppercase text-accent">
                National Champ
              </div>
            </div>
            <div className="hero-stat text-center">
              <div className="hero-stat-num font-display text-3xl md:text-4xl text-white" data-target="24" data-suffix="">24</div>
              <div className="font-mono text-[8px] md:text-[9px] tracking-[2px] uppercase text-accent">
                Years Old
              </div>
            </div>
          </div>

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

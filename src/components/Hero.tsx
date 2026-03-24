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
      className="relative h-dvh w-full overflow-hidden"
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


      {/* Content — parallax target (moves faster) */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-between h-dvh px-6 md:px-12 pt-6 pb-6 md:py-16">
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

        {/* Stats — at the bottom */}
        <div className="flex items-center justify-center gap-6 md:gap-14">
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-2xl md:text-5xl text-white" data-target="5" data-suffix="">5</div>
            <div className="font-mono text-[7px] md:text-[10px] tracking-[1px] md:tracking-[2px] uppercase text-accent font-bold">
              World Cup Wins
            </div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-2xl md:text-5xl text-white" data-target="14" data-suffix="">14</div>
            <div className="font-mono text-[7px] md:text-[10px] tracking-[1px] md:tracking-[2px] uppercase text-accent font-bold">
              WC Podiums
            </div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-2xl md:text-5xl text-white" data-target="6" data-suffix="x">6x</div>
            <div className="font-mono text-[7px] md:text-[10px] tracking-[1px] md:tracking-[2px] uppercase text-accent font-bold">
              National Champ
            </div>
          </div>
          <div className="hero-stat text-center">
            <div className="hero-stat-num font-display text-2xl md:text-5xl text-white" data-target="24" data-suffix="">24</div>
            <div className="font-mono text-[7px] md:text-[10px] tracking-[1px] md:tracking-[2px] uppercase text-accent font-bold">
              Years Old
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

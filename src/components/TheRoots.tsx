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
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg via-bg/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

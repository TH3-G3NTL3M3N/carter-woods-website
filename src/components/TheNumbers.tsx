"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { createCountUp, createScrollReveals } from "@/lib/animations";

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

    createScrollReveals(el);

    if (!prefersReduced) {
      const statEls = el.querySelectorAll("[data-target]");
      createCountUp(statEls, el);
    }
  }, []);

  return (
    <section
      id="the-numbers"
      ref={sectionRef}
      className="relative min-h-screen bg-bg py-20 md:py-32 flex items-center"
    >
      <Image
        src="/images/lead-canadian-jersey.jpg"
        alt=""
        fill
        className="object-cover opacity-[0.07]"
        sizes="100vw"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <p className="gsap-reveal-up font-mono text-[9px] tracking-[4px] uppercase text-accent mb-10">
          02 — The Numbers
        </p>

        <div className="gsap-stagger-parent flex md:grid md:grid-cols-3 gap-5 mb-16 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-8 px-8 md:mx-0 md:px-0">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="gsap-stagger-child flex-shrink-0 w-[75vw] md:w-auto snap-center bg-[#111] border border-accent/15 rounded-lg p-6 md:p-8 text-center"
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

        <div className="gsap-stagger-parent border-l-2 border-accent/20 pl-6 md:pl-8 flex flex-col gap-4">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="gsap-stagger-child flex items-baseline gap-4"
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

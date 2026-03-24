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
        <div className="flex-[1.2] relative min-h-[50vh] md:min-h-screen">
          <div className="reveal absolute inset-0">
            <Image
              src="/images/technical-roots.jpg"
              alt="Carter Woods navigating a technical rock garden section through trees"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-bg via-bg/40 to-transparent" />
          </div>
        </div>

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

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
            &copy; 2026 Carter Woods
          </p>
        </footer>
      </div>
    </section>
  );
}

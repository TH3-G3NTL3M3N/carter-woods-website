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
        <div
          className="absolute -left-4 w-[2px] h-12 bg-accent rounded-full shadow-[0_0_12px_rgba(255,69,0,0.5)] transition-all duration-300"
          style={{ top: `${Math.max(0, activeSectionIndex) * 64}px` }}
        />

        {SECTIONS.map((section, i) => (
          <button
            key={section.num}
            onClick={() => scrollTo(i)}
            className={`py-3 text-right transition-opacity duration-300 cursor-pointer group ${
              activeSectionIndex === i ? "opacity-100" : "opacity-30 hover:opacity-60"
            }`}
          >
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent font-bold">
              {section.num}
            </div>
            <div className="font-sans text-[13px] font-bold tracking-[2px] uppercase text-white">
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

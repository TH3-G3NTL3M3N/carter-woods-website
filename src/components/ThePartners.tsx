"use client";

const SPONSORS = [
  "Giant", "Shimano", "FOX", "Maxxis", "100%", "CushCore", "Cuore", "Stan's NoTubes", "MRP", "ODI", "Thule", "Park Tool", "Finish Line",
];

export default function ThePartners() {
  // Triple for seamless loop
  const marqueeItems = [...SPONSORS, ...SPONSORS, ...SPONSORS];

  return (
    <section
      id="the-partners"
      className="relative bg-bg py-20 md:py-32"
    >
      <div className="px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <p className="font-mono text-[9px] tracking-[4px] uppercase text-accent mb-16 text-center">
          05 — The Partners
        </p>
      </div>

      {/* Marquee with CSS mask fade — Clerk/Vercel style */}
      <div
        className="relative overflow-hidden mb-20 max-w-4xl mx-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {marqueeItems.map((sponsor, i) => (
            <span
              key={`m-${i}`}
              className="mx-6 md:mx-8 text-xl md:text-2xl font-bold tracking-[5px] text-white/40 cursor-default select-none"
              style={{ fontFamily: "var(--font-jetbrains), monospace" }}
            >
              {sponsor.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-8 md:px-16 lg:px-24 max-w-5xl mx-auto">
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

            <a
              href="https://www.instagram.com/carterwoodsmtb/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-accent transition-colors duration-300"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>

        </footer>

        <div className="py-5 text-center mt-16">
          <p className="text-white text-sm m-0">
            built by{" "}
            <a
              href="https://s1m.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold no-underline border-b border-white hover:opacity-70 transition-opacity"
            >
              s1m
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

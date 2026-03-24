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

        </footer>
      </div>
    </section>
  );
}

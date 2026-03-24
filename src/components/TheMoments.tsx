"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const PHOTOS = [
  {
    src: "/images/podium-snowshoe.jpg",
    alt: "Carter Woods on the podium at Snowshoe World Cup in Canadian champion jersey",
    caption: "Snowshoe World Cup",
    className: "md:row-span-2",
  },
  {
    src: "/images/peloton-mountains.jpg",
    alt: "Racing through a mountain switchback in the World Cup peloton",
    caption: "World Cup XCO",
    className: "",
  },
  {
    src: "/images/hero-albstadt.jpg",
    alt: "Arms spread crossing the finish line at Albstadt, covered in mud",
    caption: "Albstadt — First Canadian U23 Win",
    className: "",
  },
  {
    src: "/images/celebration-wheelie.jpg",
    alt: "Wheelie celebration at the finish line with crowd cheering",
    caption: "Victory Celebration",
    className: "md:col-span-2",
  },
  {
    src: "/images/technical-roots.jpg",
    alt: "Navigating a technical rock garden section through forest",
    caption: "Technical XCO",
    className: "",
  },
  {
    src: "/images/lead-canadian-jersey.jpg",
    alt: "Leading the peloton in Canadian national champion jersey",
    caption: "Leading the Pack",
    className: "",
  },
];

export default function TheMoments() {
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
      { threshold: 0.1 }
    );

    el.querySelectorAll(".gallery-item").forEach((node) => {
      if (prefersReduced) node.classList.add("visible");
      else observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="the-moments"
      ref={sectionRef}
      className="relative bg-bg py-20 md:py-32"
    >
      <div className="px-8 md:px-16 lg:px-24 max-w-6xl mx-auto">
        <p className="font-mono text-[9px] tracking-[4px] uppercase text-accent mb-10">
          04 — The Moments
        </p>

        {/* Desktop: masonry grid */}
        <div className="hidden md:grid grid-cols-3 grid-rows-[auto_auto_auto] gap-3">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className={`gallery-item relative overflow-hidden rounded-md group cursor-pointer
                opacity-0 scale-95 transition-all duration-700 ease-out
                [&.visible]:opacity-100 [&.visible]:scale-100
                ${photo.className}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`relative ${photo.className.includes("row-span-2") ? "h-[500px]" : photo.className.includes("col-span-2") ? "h-[250px]" : "h-[240px]"}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="font-mono text-[10px] tracking-[2px] uppercase text-accent">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single column feed */}
        <div className="flex md:hidden flex-col gap-4">
          {PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              className="gallery-item relative overflow-hidden rounded-lg
                opacity-0 scale-95 transition-all duration-700 ease-out
                [&.visible]:opacity-100 [&.visible]:scale-100"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="font-mono text-[10px] tracking-[2px] uppercase text-accent">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

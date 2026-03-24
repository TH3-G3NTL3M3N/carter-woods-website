"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "hero",
  "the-roots",
  "the-numbers",
  "the-machine",
  "the-moments",
  "the-partners",
];

export function useScrollSpy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
            setPastHero(index > 0);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // Also detect when scrolled to very bottom — activate partners
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (scrolledToBottom) {
        setActiveIndex(SECTION_IDS.length - 1);
        setPastHero(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { activeIndex, pastHero, sectionIds: SECTION_IDS };
}

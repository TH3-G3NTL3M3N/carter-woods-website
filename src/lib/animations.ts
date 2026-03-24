"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function createHeroTimeline(container: HTMLElement) {
  registerGSAP();

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from(container.querySelector(".hero-subtitle"), {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
    duration: 1,
    delay: 0.3,
  })
    .from(
      container.querySelector(".hero-name"),
      {
        opacity: 0,
        scale: 1.4,
        filter: "blur(20px)",
        duration: 0.8,
      },
      "-=0.5"
    )
    .from(
      container.querySelectorAll(".hero-stat"),
      {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
      },
      "-=0.3"
    )
;

  // Hero parallax: photo moves slower, content moves faster, with blur
  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "bottom top",
    scrub: 0.5,
    onUpdate: (self) => {
      const p = self.progress;
      // Fade + scale + blur the entire hero
      gsap.set(container.querySelector(".hero-content"), {
        opacity: 1 - p * 1.5,
        y: p * -80,
        filter: `blur(${p * 8}px)`,
      });
      // Photo parallax — moves slower than scroll
      gsap.set(container.querySelector(".hero-bg"), {
        y: p * 150,
        scale: 1 + p * 0.1,
      });
    },
  });

  return tl;
}

export function createCountUp(
  elements: NodeListOf<Element>,
  trigger: HTMLElement
) {
  registerGSAP();

  elements.forEach((el) => {
    const target = parseInt(el.getAttribute("data-target") || "0", 10);
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      },
    });
  });
}

// Scroll-driven parallax for section images (desktop only)
export function createImageParallax(imageEl: HTMLElement, triggerEl: HTMLElement) {
  registerGSAP();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 768) return; // skip on mobile

  gsap.fromTo(
    imageEl,
    { y: -40 },
    {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.3,
      },
    }
  );
}

// Scroll-driven reveal with modern blur + clip effects
export function createScrollReveals(container: HTMLElement) {
  registerGSAP();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    container.querySelectorAll(".gsap-reveal, .gsap-reveal-left, .gsap-reveal-up").forEach((el) => {
      gsap.set(el, { opacity: 1, y: 0, x: 0, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" });
    });
    return;
  }

  // Reveal up (default)
  container.querySelectorAll(".gsap-reveal-up").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      filter: "blur(6px)",
      duration: 0.9,
      delay: i * 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });
  });

  // Reveal from left with clip-path wipe
  container.querySelectorAll(".gsap-reveal-left").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -60,
      filter: "blur(8px)",
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
    });
  });

  // Image wipe reveal
  container.querySelectorAll(".gsap-image-wipe").forEach((el) => {
    gsap.from(el, {
      clipPath: "inset(0% 100% 0% 0%)",
      duration: 1.2,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
        once: true,
      },
    });
  });

  // Stagger children
  container.querySelectorAll(".gsap-stagger-parent").forEach((parent) => {
    const children = parent.querySelectorAll(".gsap-stagger-child");
    gsap.from(children, {
      opacity: 0,
      y: 40,
      filter: "blur(4px)",
      stagger: 0.1,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: parent,
        start: "top 80%",
        once: true,
      },
    });
  });
}

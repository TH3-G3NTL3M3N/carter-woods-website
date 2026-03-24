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
    y: 20,
    duration: 0.8,
    delay: 0.2,
  })
    .from(
      container.querySelector(".hero-name"),
      {
        opacity: 0,
        scale: 1.3,
        duration: 0.6,
      },
      "-=0.3"
    )
    .from(
      container.querySelectorAll(".hero-stat"),
      {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.5,
      },
      "-=0.2"
    );

  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "bottom top",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.set(container, {
        opacity: 1 - progress,
        scale: 1 - progress * 0.05,
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

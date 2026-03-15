import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollReveal({ stagger = false, staggerDelay = 0.15 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const triggers = [];

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      if (stagger) {
        gsap.set(el.querySelectorAll(".reveal-child"), {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        });
      }
      return;
    }

    // Set initial state
    gsap.set(el, { opacity: 0, y: 40, filter: "blur(4px)" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    triggers.push(tl.scrollTrigger);

    // Reveal the container
    tl.to(el, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: EASE_OUT,
    });

    // Stagger children if requested
    if (stagger) {
      const children = el.querySelectorAll(".reveal-child");
      if (children.length > 0) {
        gsap.set(children, { opacity: 0, y: 30, filter: "blur(2px)" });
        tl.to(
          children,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: EASE_OUT,
            stagger: staggerDelay,
          },
          "-=0.4"
        );
      }

      // Pulse timeline dots as their cards enter
      const dots = el.querySelectorAll(".timeline-dot");
      dots.forEach((dot, i) => {
        tl.to(
          dot,
          {
            scale: 1.5,
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          },
          `-=${0.6 - i * staggerDelay}`
        );
      });
    }

    // Section number count-up using proxy object
    const numberEl = el.querySelector(".section-number");
    if (numberEl) {
      const target = parseInt(numberEl.textContent, 10);
      if (!isNaN(target)) {
        const proxy = { val: 0 };
        numberEl.textContent = "00";
        tl.to(
          proxy,
          {
            val: target,
            duration: 0.4,
            ease: "none",
            snap: { val: 1 },
            onUpdate: () => {
              numberEl.textContent = String(Math.round(proxy.val)).padStart(2, "0");
            },
          },
          "-=0.6"
        );
      }
    }

    return () => {
      tl.kill();
      triggers.forEach((st) => {
        if (st) st.kill();
      });
    };
  }, [stagger, staggerDelay]);

  return ref;
}

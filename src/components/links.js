import React, { memo, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { social } from "../data/data";
import { gsap } from "gsap";

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const MagneticLink = memo(function MagneticLink({ link }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHover()) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < 50) {
        gsap.to(el, {
          x: distX * 0.3,
          y: distY * 0.3,
          duration: 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.4)",
      });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      className="flex items-center gap-3 px-5 py-2.5 min-h-[44px] rounded-md-token text-text-secondary font-medium text-sm transition-all duration-200 will-change-transform
        bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-sm
        hover:text-space-primary hover:border-[var(--glass-hover-border)] hover:shadow-glow-golden"
      href={link.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${link.name} profile`}
    >
      <FontAwesomeIcon
        icon={link.icon}
        className="text-lg text-space-primary"
      />
      <span>{link.name}</span>
    </a>
  );
});

const Links = memo(function Links() {
  return (
    <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
      {social.map((link, index) => (
        <MagneticLink key={index} link={link} />
      ))}
    </div>
  );
});

export default Links;

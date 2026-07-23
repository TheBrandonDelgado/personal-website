import { memo, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { portfolio } from "../data/data";
import type { Project } from "../types/content";
import { gsap } from "gsap";

const canHover = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

type PortfolioCardProps = { project: Project };

const PortfolioCard = memo(function PortfolioCard({ project }: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !canHover()) return;

    // Mild lift only — full 3D tilt reads poorly on wide horizontal cards
    const onMouseEnter = (): void => {
      gsap.to(el, {
        y: -3,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = (): void => {
      gsap.to(el, {
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      });
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="reveal-child glass-panel group overflow-hidden will-change-transform
        flex flex-col md:flex-row md:items-stretch min-w-0"
    >
      {/* Screenshot — top on mobile, left on md+ */}
      <div
        className="relative w-full md:w-[44%] lg:w-[46%] shrink-0 overflow-hidden
          aspect-[16/10] md:aspect-auto md:min-h-[280px] lg:min-h-[300px]"
      >
        <img
          src={project.image}
          alt={project.title || project.company}
          className="absolute inset-0 w-full h-full object-top object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Text content — below on mobile, right on md+ */}
      <div className="flex-1 min-w-0 flex flex-col gap-4 p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-xl lg:text-2xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
            {project.title || project.company}
          </h3>
          <span className="font-mono text-xs text-space-primary bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] px-3 py-1 rounded-sm-token font-medium whitespace-nowrap shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-text-muted font-medium leading-snug">
          {project.company}
        </p>

        <p className="text-sm lg:text-base text-text-secondary leading-relaxed max-w-2xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-1">
          {project.technologies.map((tech, techIndex) => (
            <div
              key={techIndex}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm-token font-mono text-xs transition-all duration-200
                bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-text-muted
                group-hover:text-space-primary group-hover:border-[rgba(251,191,36,0.15)] group-hover:bg-[rgba(251,191,36,0.08)]"
            >
              <FontAwesomeIcon
                icon={tech.icon}
                className="text-xs text-space-primary"
              />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 self-start px-6 py-2.5 mt-auto rounded-md-token font-semibold text-sm transition-all duration-300
            bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] text-space-primary
            group-hover:bg-gradient-primary group-hover:text-[#0a0a0a] group-hover:border-transparent group-hover:shadow-glow-golden"
        >
          <span>View Project</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </article>
  );
});

const Portfolio = memo(function Portfolio() {
  return (
    <div className="flex flex-col gap-8">
      {portfolio.map((project, index) => (
        <PortfolioCard key={index} project={project} />
      ))}
    </div>
  );
});

export default Portfolio;

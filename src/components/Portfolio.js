import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { portfolio } from "../data/data";
import { memo, useRef, useEffect } from "react";
import { gsap } from "gsap";

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const PortfolioCard = memo(function PortfolioCard({ project }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !canHover()) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateY: x * 6,
        rotateX: -y * 6,
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
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
    <div
      ref={cardRef}
      className="reveal-child glass-panel group h-full flex flex-col will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img
          src={project.image}
          alt={project.title || project.company}
          className="w-full h-full object-top object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.8)] to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold text-text-primary leading-tight tracking-[-0.02em]">
            {project.title || project.company}
          </h3>
          <span className="font-mono text-xs text-space-primary bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] px-3 py-1 rounded-sm-token font-medium whitespace-nowrap">
            {project.year}
          </span>
        </div>

        <p className="text-sm text-text-muted font-medium">
          {project.company}
        </p>
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 my-2">
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

        {/* CTA Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-md-token font-semibold text-sm transition-all duration-300 mt-auto
            bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] text-space-primary
            group-hover:bg-gradient-primary group-hover:text-[#0a0a0a] group-hover:border-transparent group-hover:shadow-glow-golden"
        >
          <span>View Project</span>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
});

const Portfolio = memo(function Portfolio() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
      style={{ perspective: "1000px" }}
    >
      {portfolio.map((project, index) => (
        <PortfolioCard key={index} project={project} />
      ))}
    </div>
  );
});

export default Portfolio;

import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { experience } from "../data/data";

const WorkExperience = memo(function WorkExperience() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {experience.map((job, index) => (
        <div
          key={index}
          className="reveal-child flex gap-0 md:gap-8 mb-12 relative"
        >
          {/* Timeline Marker */}
          <div className="relative hidden md:flex flex-col items-center flex-shrink-0">
            <div
              className="timeline-dot w-3 h-3 rounded-full shadow-glow-golden z-10 relative"
              style={{
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
              }}
            />
            {index < experience.length - 1 && (
              <div className="w-px h-full mt-4 bg-[rgba(255,255,255,0.08)]" />
            )}
          </div>

          {/* Experience Content */}
          <div className="flex-1 glass-panel p-8">
            {/* Header */}
            <div className="mb-6">
              {/* Desktop Layout */}
              <div className="hidden md:flex justify-between items-start gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-primary mb-2 leading-tight tracking-[-0.02em]">
                    {job.title}
                  </h3>
                  <div>
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-space-primary font-semibold text-lg inline-flex items-center gap-2 transition-all duration-200 hover:text-space-secondary"
                      >
                        {job.company}
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className="text-sm"
                        />
                      </a>
                    ) : (
                      <span className="text-text-secondary font-semibold text-lg">
                        {job.company}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-mono text-xs text-space-primary bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] px-3 py-1.5 rounded-sm-token font-medium whitespace-nowrap">
                  {job.years}
                </span>
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden">
                <h3 className="text-2xl font-bold text-text-primary mb-2 leading-tight tracking-[-0.02em]">
                  {job.title}
                </h3>
                <div className="mb-3">
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-space-primary font-semibold text-lg inline-flex items-center gap-2 transition-all duration-200 hover:text-space-secondary"
                    >
                      {job.company}
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="text-sm"
                      />
                    </a>
                  ) : (
                    <span className="text-text-secondary font-semibold text-lg">
                      {job.company}
                    </span>
                  )}
                </div>
                <span className="font-mono text-xs text-space-primary bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.2)] px-3 py-1.5 rounded-sm-token font-medium whitespace-nowrap">
                  {job.years}
                </span>
              </div>
            </div>

            {/* Descriptions */}
            <div className="mb-6">
              {job.descriptions.map((description, descIndex) => (
                <p
                  key={descIndex}
                  className="text-text-secondary leading-relaxed mb-4 text-base relative pl-6 before:content-['•'] before:text-space-primary before:font-bold before:absolute before:left-0 before:top-0"
                >
                  {description}
                </p>
              ))}
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {job.technologies.map((technology, techIndex) => (
                <span
                  key={techIndex}
                  className="font-mono text-xs px-3 py-1.5 rounded-sm-token font-medium transition-all duration-200
                    bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-text-muted
                    hover:text-space-primary hover:border-[rgba(251,191,36,0.15)] hover:bg-[rgba(251,191,36,0.08)]"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default WorkExperience;

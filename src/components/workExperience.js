import React, { useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { experience } from '../data/data';

const WorkExperience = memo(function WorkExperience() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="relative max-w-4xl mx-auto">
            {experience.map((job, index) => (
                <div 
                    key={index}
                    className={`flex gap-0 md:gap-8 mb-12 relative transition-all duration-300 hover:translate-x-2 ${
                        activeIndex === index ? 'translate-x-2' : ''
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    {/* Timeline Marker */}
                    <div className="relative hidden md:flex flex-col items-center flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full border-3 border-bg-primary shadow-glow-golden transition-all duration-300 z-10 relative ${
                            activeIndex === index ? 'scale-125 shadow-glow-golden-lg' : ''
                        }`}
                        style={{background: 'linear-gradient(135deg, #fbbf24, #f59e0b)'}}></div>
                        {index < experience.length - 1 && (
                            <div className={`w-0.5 h-full mt-4 transition-all duration-300 ${
                                activeIndex === index ? 'bg-gradient-primary' : 'bg-border'
                            }`}></div>
                        )}
                    </div>
                    
                    {/* Experience Content */}
                    <div className={`flex-1 bg-bg-secondary rounded-2xl p-8 border border-border transition-all duration-300 relative overflow-hidden ${
                        activeIndex === index ? 'border-space-primary shadow-glow-golden-lg' : ''
                    }`}>
                        {/* Gradient top border */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-primary transition-opacity duration-300 ${
                            activeIndex === index ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                        
                        {/* Header */}
                        <div className="mb-6">
                            {/* Desktop Layout */}
                            <div className="hidden md:flex justify-between items-start gap-8">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-text-primary mb-2 leading-tight">
                                        {job.title}
                                    </h3>
                                    <div>
                                        {job.link ? (
                                            <a 
                                                href={job.link} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="text-space-primary font-semibold text-lg inline-flex items-center gap-2 transition-all duration-200 hover:text-space-secondary hover:translate-x-1"
                                            >
                                                {job.company}
                                                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm transition-transform duration-200 group-hover:translate-x-0.5" />
                                            </a>
                                        ) : (
                                            <span className="text-text-secondary font-semibold text-lg">{job.company}</span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-space-primary bg-bg-tertiary px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap border border-border">
                                    {job.years}
                                </span>
                            </div>
                            
                            {/* Mobile Layout */}
                            <div className="md:hidden">
                                <h3 className="text-2xl font-bold text-text-primary mb-2 leading-tight">
                                    {job.title}
                                </h3>
                                <div className="mb-3">
                                    {job.link ? (
                                        <a 
                                            href={job.link} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="text-space-primary font-semibold text-lg inline-flex items-center gap-2 transition-all duration-200 hover:text-space-secondary hover:translate-x-1"
                                        >
                                            {job.company}
                                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm transition-transform duration-200 group-hover:translate-x-0.5" />
                                        </a>
                                    ) : (
                                        <span className="text-text-secondary font-semibold text-lg">{job.company}</span>
                                    )}
                                </div>
                                <span className="text-space-primary bg-bg-tertiary px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap border border-border">
                                    {job.years}
                                </span>
                            </div>
                        </div>
                        
                        {/* Descriptions */}
                        <div className="mb-6">
                            {job.descriptions.map((description, descIndex) => (
                                <p key={descIndex} className="text-text-secondary leading-relaxed mb-4 text-base relative pl-6 before:content-['•'] before:text-space-primary before:font-bold before:absolute before:left-0 before:top-0">
                                    {description}
                                </p>
                            ))}
                        </div>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-3">
                            {job.technologies.map((technology, techIndex) => (
                                <span key={techIndex} className="bg-bg-tertiary text-text-primary px-4 py-2 rounded-full text-sm font-medium border border-border transition-all duration-200 hover:bg-gradient-golden hover:text-white hover:-translate-y-0.5 hover:shadow-glow-golden">
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
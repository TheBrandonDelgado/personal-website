import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { portfolio } from '../data/data';
import { useState, memo } from 'react';

const Portfolio = memo(function Portfolio() {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {portfolio.map((project, index) => (
                <div 
                    key={index}
                    className={`bg-bg-secondary rounded-3xl border border-border overflow-hidden transition-all duration-300 relative h-full flex flex-col hover:-translate-y-2 hover:shadow-glow-golden-lg hover:border-space-primary ${
                        activeIndex === index ? '-translate-y-2 shadow-glow-golden-lg border-space-primary' : ''
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={project.title || project.company}
                            className="w-full h-full object-top object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2 text-white font-semibold px-6 py-3 bg-gradient-primary rounded-full transition-transform duration-200 hover:scale-105"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                <span>View Project</span>
                            </a>
                        </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex justify-between items-start gap-4">
                            <h3 className="text-xl font-bold text-text-primary leading-tight">
                                {project.title || project.company}
                            </h3>
                            <span className="text-sm text-space-primary bg-bg-tertiary px-3 py-1 rounded-full font-semibold whitespace-nowrap border border-border">
                                {project.year}
                            </span>
                        </div>
                        
                        <p className="text-sm text-text-muted font-medium">{project.company}</p>
                        <p className="text-sm text-text-secondary leading-relaxed flex-1">{project.description}</p>
                        
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-3 my-2">
                            {project.technologies.map((tech, techIndex) => (
                                <div key={techIndex} className="flex items-center gap-2 px-3 py-2 bg-bg-tertiary rounded-full border border-border transition-all duration-200 hover:bg-gradient-golden hover:text-white hover:-translate-y-0.5 hover:shadow-glow-golden">
                                    <FontAwesomeIcon 
                                        icon={tech.icon} 
                                        className="text-sm text-space-primary transition-colors duration-200 group-hover:text-white"
                                    />
                                    <span className="text-xs font-medium">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                        
                        {/* Action Button */}
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-golden-lg mt-auto"
                        >
                            <span>View Project</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default Portfolio;
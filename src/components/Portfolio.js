import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { portfolio } from '../data/data';
import { useState } from 'react';
function Portfolio() {
    const [ activeIndex, setActiveIndex ] = useState(null);
    const [ anchorHover, setAnchorHover ] = useState(false);

    return (
        <div className='portfolio-cards overflow-x-auto flex gap-4 p-4 lg:gap-0'>
            {
                portfolio.map((project, index) => (
                    <div 
                        className={`portfolio-card min-w-[80%] flex-shrink-0 flex flex-col gap-4 border-[1px] border-stone-400 rounded-lg p-4 align-center transition-all duration-500 justify-between 
                            lg:justify-start lg:border-0 lg:min-w-0 lg:w-1/3 
                            ${activeIndex === index ? 
                                'lg:flex-grow-[2] justify-between lg:border-[1px]' 
                                : activeIndex !== null ? 
                                    'lg:flex-grow-[0.5] lg:border-0 lg:justify-start' : 
                                    'lg:flex-grow justify-between lg:gap-0'
                            }`
                        } 
                        onMouseEnter={() => setActiveIndex(index)} 
                        onMouseLeave={() => setActiveIndex(null)}
                    >
                        <a href={project.link} target="_blank" rel="noreferrer">
                            <img src={project.image} alt={project.title ? project.title : project.company}></img>
                        </a>
                        <a className={`project-title ${activeIndex === index ? 'lg:mt-0' : 'lg:mt-4'} text-white`} 
                            href={project.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            onMouseEnter={() => setAnchorHover(true)} 
                            onMouseLeave={() => setAnchorHover(false)}
                        >
                            <h5>{project.title ? project.title : project.company}</h5>
                            <FontAwesomeIcon 
                                className={`link-arrow ${activeIndex === index && anchorHover && "bouncing-icon"} text-white`} 
                                icon={faArrowRight} 
                                size="sm" 
                            />
                        </a>
                        <p 
                            className={`project-description mx-auto absolute overflow-hidden transition-all duration-500 text-stone-400
                                ${activeIndex === index ? 
                                    'lg:h-auto lg:relative lg:opacity-100' : 
                                    'lg:opacity-0 lg:h-0'
                                }`
                            }
                            >{project.description}</p>
                        <div 
                            className={`portfolio-technologies flex space-between absolute overflow-hidden transition-all duration-500 text-stone-400
                                ${activeIndex === index ? 
                                    'lg:h-auto lg:relative lg:opacity-100' : 
                                    'lg:opacity-0 lg:h-0'
                                }`
                            }
                        >
                            {
                                project.technologies.map(technology => (
                                    <div className="flex flex-col items-center gap-2">
                                        <FontAwesomeIcon icon={technology.icon} size="xl" />
                                        <p className="portfolio-tech text-xs md:text-base">{technology.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Portfolio;
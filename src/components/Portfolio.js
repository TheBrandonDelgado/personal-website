import React, { useState, useEffect } from 'react';
import sazStore from '../assets/saz-store.png';
import jan3 from '../assets/jan3.png';
import tesla from '../assets/tesla.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faHtml5, faCss3 } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faServer, faArrowRight, faCode, faStore } from '@fortawesome/free-solid-svg-icons';

const portfolio = [
    {
        year: "2024",
        title: "Sazmining Store",
        company: "Sazmining",
        image: sazStore,
        link: "https://store.sazmining.com",
        description: "Senior Full Stack Engineer",
        technologies: [
            {
                name: "React",
                icon: faReact
            },
            {
                name: "TypeScript",
                icon: faCode
            },
            {
                name: "Medusa",
                icon: faStore
            },
            {
                name: "Next.js",
                icon: faCode
            }
        ]
    },
    {
        year: "2024",
        title: "Tesla Clone",
        company: "Personal Project",
        image: tesla,
        link: "https://tesla.brandon-delgado.com",
        description: "Personal Project",
        technologies: [
            {
                name: "React",
                icon: faReact
            },
            {
                name: "JavaScript",
                icon: faJs
            },
            {
                name: "HTML5",
                icon: faHtml5
            },
            {
                name: "CSS",
                icon: faCss3
            }
        ]
    },
    {
        year: "2024",
        company: "JAN3",
        image: jan3,
        link: "https://jan3.com",
        description: "Contracted Full Stack Engineer",
        technologies: [
            {
                name: "Chart.js",
                icon: faChartLine
            },
            {
                name: "Handlebars.js",
                icon: faCode
            },
            {
                name: "NestJS",
                icon: faServer
            },
            {
                name: "TypeScript",
                icon: faCode
            }
        ]
    }
];

function Portfolio() {
    const [ activeIndex, setActiveIndex ] = useState(null);
    const [ anchorHover, setAnchorHover ] = useState(false);

    return (
        <div className='portfolio-cards'>
            {
                portfolio.map((project, index) => (
                    <div className="portfolio-card" onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}>
                        <a href={project.link} target="_blank" rel="noreferrer">
                            <img src={project.image} alt={project.title ? project.title : project.company}></img>
                        </a>
                        <a className="project-title" href={project.link} target="_blank" rel="noreferrer" onMouseEnter={() => setAnchorHover(true)} onMouseLeave={() => setAnchorHover(false)}>
                            <h5>{project.title ? project.title : project.company}</h5>
                            <FontAwesomeIcon className={`link-arrow ${activeIndex === index && anchorHover && "bouncing-icon"}`} icon={faArrowRight} size="sm" />
                        </a>
                        <p className={`project-description ${activeIndex === index && "visible"}`}>{project.description}</p>
                        <div className={`portfolio-technologies ${activeIndex === index && "visible"}`}>
                            {
                                project.technologies.map(technology => (
                                    <div>
                                        <FontAwesomeIcon icon={technology.icon} size="xl" />
                                        <p className="portfolio-tech">{technology.name}</p>
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
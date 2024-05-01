import React, { useState, useEffect } from 'react';
import bitcoinDashboard from '../assets/bitcoin-dashboard.png';
import jan3 from '../assets/jan3.png';
import euroPac from '../assets/euro-pacific-capital.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faPhp, faHtml5, faWordpress } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faServer, faArrowRight, faCode } from '@fortawesome/free-solid-svg-icons';

const portfolio = [
    {
        year: "2024",
        title: "Bitcoin Dashboard",
        company: "Personal Project",
        image: bitcoinDashboard,
        link: "https://bitcoin.brandon-delgado.com",
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
                name: "Chart.js",
                icon: faChartLine
            },
            {
                name: "API",
                icon: faServer
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
    },
    {
        year: "2023",
        company: "Euro Pacific Asset Managment",
        image: euroPac,
        link: "https://europac.com",
        description: "Contracted Front End Engineer",
        technologies: [
            {
                name: "JavaScript",
                icon: faJs
            },
            {
                name: "PHP",
                icon: faPhp
            },
            {
                name: "HTML5",
                icon: faHtml5
            },
            {
                name: "WordPress",
                icon: faWordpress
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
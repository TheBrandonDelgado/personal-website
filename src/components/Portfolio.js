import React, { useState, useEffect } from 'react';
import bitcoinDashboard from '../assets/bitcoin-dashboard.png';
import redditClient from '../assets/reddit-clone.png';
import euroPac from '../assets/euro-pacific-capital.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faJs, faPhp, faHtml5, faWordpress } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faServer, faShop, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const portfolio = [
    {
        year: "2024",
        title: "Bitcoin Dashboard",
        company: "Personal Project",
        image: bitcoinDashboard,
        link: "https://bitcoin.brandon-delgado.com",
        description: "The price of Bitcoin contrasted with the Fear and Greed Index.",
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
        year: "2023",
        title: "Reddit Client",
        company: "Personal Project",
        image: redditClient,
        link: "https://reddit-project.brandon-delgado.com",
        description: "Minimal Reddit client",
        technologies: [
            {
                name: "React",
                icon: faReact
            },
            {
                name: "Redux",
                icon: faShop
            },
            {
                name: "JavaScript",
                icon: faJs
            },
            {
                name: "API",
                icon: faServer
            }
        ]
    },
    {
        year: "2023",
        company: "Euro Pacific Asset Managment",
        image: euroPac,
        link: "https://europac.com",
        description: "Built to client design specifications.",
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
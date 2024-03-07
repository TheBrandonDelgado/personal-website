import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Projects() {
    const experience = [
        {
            year: "2024",
            title: "Bitcoin Dashboard",
            company: "Personal Project",
            link: "https://bitcoin.brandon-delgado.com",
            description: "This dashboard was built to emphasize that it's always the right time to buy Bitcoin. You only get a YTD view of the price contrasted with the Fear and Greed Index, and a list of books I feel properly explain the timeless utility of Bitcoin.",
            technologies: [
                "React •",
                "JavaScript •",
                "Chart.js •",
                "API"
            ]
        },
        {
            year: "2023",
            title: "Reddit Clone",
            company: "Personal Project",
            link: "https://reddit-project.brandon-delgado.com",
            description: "Minimal Reddit client",
            technologies: [
                "React •",
                "Redux •",
                "JavaScript •",
                "API"
            ]
        },
        {
            year: "2023",
            company: "Euro Pacific Asset Managment",
            link: "https://europac.com",
            description: "Built to client design specifications.",
            technologies: [
                "JavaScript •",
                "PHP •",
                "HTML •",
                "WordPress"
            ]
        },
        {
            year: "2022",
            company: "BioProtein Technology",
            link: "https://bioproteintech.com",
            description: "Built to client design specifications.",
            technologies: [
                "JavaScript •",
                "PHP •",
                "HTML •",
                "WordPress"
            ] 
        }
    ];

    return (
        <div style={{color: "white"}}>
            {
                experience.map(job => (
                    <div className="job-container">
                        <p className="years">{job.year}</p>
                        <div className="information">
                            {
                                job.title ?
                                <a className="title-company" href={job.link} target="_blank" rel="noreferrer">
                                    {job.title} - {job.company} <FontAwesomeIcon className="link-arrow" icon={faArrowRight} size="sm" />
                                </a> :
                                <a className="title-company" href={job.link} target="_blank" rel="noreferrer">
                                    {job.company} <FontAwesomeIcon className="link-arrow" icon={faArrowRight} size="sm" />
                                </a>
                            }
                            <p className="description">{job.description}</p>
                            <div className="technologies">
                                {
                                    job.technologies.map(technology => (
                                        <p className="tech">{technology}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Projects;
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function WorkExperience() {
    const [ activeIndex, setActiveIndex ] = useState(null);
    const [ anchorHover, setAnchorHover ] = useState(false);

    const experience = [
        {
            years: "2024 - present",
            title: "Senior Full Stack Software Engineer",
            company: "Sazmining",
            link: "https://www.sazmining.com",
            descriptions: [
                'Automate accounting by building a QuickBooks microservice using NodeJS, ExpressJS, and Redis to communicate between the third-party and e-commerce web app.',
                'Mentor junior developers and conduct code reviews.',
                'Build modules and plugins in TypeScript and NodeJS for the open source e-commerce web app Medusa.',
                'Construct databases and APIs in Supabase.',
                'Architect internal CRUD tools in Refine, React, and Tailwind CSS.'
            ],
            technologies: [
                "React",
                "TypeScript",
                "Node.js",
                "Tailwind CSS"
            ]
        },
        {
            years: "2024 - present",
            title: "Web Developer",
            company: "JAN3",
            link: "https://jan3.com",
            descriptions: [
                "Engineer data visualization solutions using Chart.js and JSON APIs.",
                "Build and update the Ghost frontend for both JAN3 and AQUA websites.",
                "Build API endpoints in a NestJS backend using TypeScript.",
                "Construct custom modules in a NestJS backend that add new functionality like instant translations of site content."
            ],
            technologies: [
                "Chart.js",
                "Handlebars.js",
                "NestJS",
                "TypeScript"
            ]
        },
        {
            years: "2023 - 2024",
            title: "Web Developer II",
            company: "TrueSense Marketing",
            link: "https://www.truesense.com",
            descriptions: [
                "Facilitated the transition of 30+ clients from One & All to TrueSense throughout the acquisition process, supplementing $10 million in revenue.",
                "Constructed 300+ marketing emails, 100+ donation pages, and 150+ lightboxes while serving 13 clients.",
                "Mentored junior developers, conducted code reviews, presented innovative solutions across teams and wrote extensive documentation allowing for scalability, efficiency, and coordination.",
                "Created data pipelines allowing for analytics of thousands of donations to be successfully attributed to key campaign elements.",
                "Standardized accessibility guidelines across client verticals."
            ],
            technologies: [
                "JavaScript",
                "HTML",
                "CSS",
                "Wordpress"
            ]
        },
        {
            years: "2022 - 2023",
            title: "Digital Developer",
            company: "One & All",
            descriptions: [
                "Collaborated with a team of strategists, designers, and executive leadership to engineer a mobile application.",
                "Conducted A/B testing using VWO for donation forms, allowing clients to generate an over 200% increase in donations.",
                "Trained freelance developers on building campaigns in order to balance workload effectively during the busiest seasons.",
                "Managed and analyzed engagement and donation data using Google Tag Manager and Google Analytics for 30+ clients."
            ],
            technologies: [
                "JavaScript",
                "HTML",
                "CSS",
                "WordPress"
            ]
        },
        {
            years: "2020 - 2022",
            title: "Full Stack Engineer",
            company: "Freelance",
            descriptions: [
                "Built 20+ websites and web applications for 8 individual clients using React, Redux, JavaScript, TypeScript, Express, NestJS, Python, and Django REST.", 
                "Managed development overflow for 3 marketing agencies with work spanning 25 clients.", 
                "Crafted optimal SEO strategies and worked with Google Search Console to bring website listings to the top of Google Search.",
                "Developed custom plugins and themes for WordPress using PHP and JavaScript.",
                "Constructed CI/CD pipelines using Digital Ocean and Runcloud allowing for continuous deployment of websites while iterating quickly on projects."
            ],
            technologies: [
                "React",
                "Redux",
                "TypeScript",
                "JavaScript"
            ]
        },
    ];

    return (
        <div style={{color: "white"}}>
            {
                experience.map((job, index) => (
                    <div className="job-container" onMouseEnter={() => setActiveIndex(index)}>
                        <p className="years">{job.years}</p>
                        <div className="information">
                            {
                                job.link ?
                                <a className="title-company" href={job.link} target="_blank" rel="noreferrer" onMouseEnter={() => setAnchorHover(true)} onMouseLeave={() => setAnchorHover(false)}>
                                    {job.title} - {job.company} <FontAwesomeIcon className={`link-arrow ${activeIndex === index && anchorHover && "bouncing-icon"}`} icon={faArrowRight} size="sm" />
                                </a> :
                                <p className="title-company">{job.title} - {job.company}</p>
                            }
                            {
                                job.descriptions.map(description => (
                                    <p className="description">{description}</p>
                                ))
                            }
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

export default WorkExperience;
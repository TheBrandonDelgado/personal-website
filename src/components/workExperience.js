import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { experience } from '../data/data';
function WorkExperience() {
    const [ activeIndex, setActiveIndex ] = useState(null);
    const [ anchorHover, setAnchorHover ] = useState(false);

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
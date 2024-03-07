import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Links() {
    const social = [
        {
            name: "LinkedIn",
            username: "Brandon Delgado",
            link: "https://www.linkedin.com/in/thebrandondelgado/"
        },
        {
            name: "GitHub",
            username: "TheBrandonDelgado",
            link: "https://github.com/TheBrandonDelgado"
        },
        {
            name: "X",
            username: "@BrandonDelgad0",
            link: "https://twitter.com/BrandonDelgad0"
        }, 
        {
            name: "Email",
            username: "TheBrandonDelgado@gmail.com",
            link: "mailto:thebrandondelgado@gmail.com?subject=Website%20Inquiry"
        }
    ];

    return (
        <div style={{color: "white"}}>
            {
                social.map(link => (
                    <div className="link-container">
                        <p className="name">{link.name}</p>
                        <div className="information">
                            <a className="social-link" href={link.link} target="_blank" rel="noreferrer">
                                {link.username} <FontAwesomeIcon className="link-arrow" icon={faArrowRight} size="sm" />
                            </a>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Links;
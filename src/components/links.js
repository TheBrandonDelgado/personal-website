import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'

function Links() {
    const social = [
        {
            name: "LinkedIn",
            username: "Brandon Delgado",
            link: "https://www.linkedin.com/in/thebrandondelgado/",
            icon: faLinkedin
        },
        {
            name: "GitHub",
            username: "TheBrandonDelgado",
            link: "https://github.com/TheBrandonDelgado",
            icon: faGithub
        },
        {
            name: "X",
            username: "@BrandonDelgad0",
            link: "https://twitter.com/BrandonDelgad0",
            icon: faXTwitter
        }, 
        {
            name: "Email",
            username: "TheBrandonDelgado@gmail.com",
            link: "mailto:thebrandondelgado@gmail.com?subject=Website%20Inquiry",
            icon: faEnvelope
        }
    ];

    return (
        <div style={{color: "white"}}>
            {
                social.map(link => (
                    <a className="social-link" href={link.link} target="_blank" rel="noreferrer">
                        <FontAwesomeIcon className="link-arrow" icon={link.icon} size="xl" />
                    </a>
                ))
            }
        </div>
    );
}

export default Links;
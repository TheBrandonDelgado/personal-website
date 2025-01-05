import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { social } from '../data/data';

function Links() {
    return (
        <div className="text-white">
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
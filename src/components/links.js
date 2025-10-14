import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { social } from '../data/data';

const Links = memo(function Links() {
    return (
        <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            {social.map((link, index) => (
                <a 
                    key={index}
                    className="flex items-center gap-3 px-6 py-3 bg-bg-secondary border border-border rounded-full text-text-primary font-semibold transition-all duration-300 relative overflow-hidden group hover:text-white hover:border-space-primary hover:-translate-y-0.5 hover:shadow-glow-golden before:absolute before:inset-0 before:bg-gradient-primary before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100" 
                    href={link.link} 
                    target="_blank" 
                    rel="noreferrer"
                    aria-label={`Visit ${link.name} profile`}
                >
                    <FontAwesomeIcon 
                        icon={link.icon} 
                        className="text-xl relative z-10 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className="relative z-10 text-sm lg:text-base">{link.name}</span>
                </a>
            ))}
        </div>
    );
});

export default Links;
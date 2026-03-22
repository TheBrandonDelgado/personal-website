import {
    faCloud,
    faDatabase,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import saz from "../assets/Sazmining.png";
import jan3 from "../assets/jan3.png";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
    faChartLine,
    faCode,
    faCodeBranch,
    faNetworkWired,
    faServer,
} from "@fortawesome/free-solid-svg-icons";

export const social = [
    {
        name: "LinkedIn",
        username: "Brandon Delgado",
        link: "https://www.linkedin.com/in/thebrandondelgado/",
        icon: faLinkedin,
    },
    {
        name: "GitHub",
        username: "TheBrandonDelgado",
        link: "https://github.com/TheBrandonDelgado",
        icon: faGithub,
    },
    {
        name: "Email",
        username: "TheBrandonDelgado@icloud.com",
        link: "mailto:thebrandondelgado@icloud.com?subject=Website%20Inquiry",
        icon: faEnvelope,
    },
];

export const portfolio = [
    {
        year: "2024 - Present",
        title: "Sazmining",
        company: "Sazmining",
        image: saz,
        link: "https://app.sazmining.com",
        description: "Senior Full Stack Engineer",
        technologies: [
            {
                name: "React",
                icon: faReact,
            },
            {
                name: "TypeScript",
                icon: faCode,
            },
            {
                name: "Supabase",
                icon: faDatabase,
            },
            {
                name: "GraphQL",
                icon: faCodeBranch,
            },
            {
                name: "Redis",
                icon: faNetworkWired,
            },
        ],
    },
    {
        year: "2024",
        company: "JAN3",
        image: jan3,
        link: "https://jan3.com",
        description: "Full Stack Engineer",
        technologies: [
            {
                name: "TypeScript",
                icon: faCode,
            },
            {
                name: "NestJS",
                icon: faServer,
            },
            {
                name: "Chart.js",
                icon: faChartLine,
            },
            {
                name: "REST API",
                icon: faNetworkWired,
            },
            {
                name: "Ghost CMS",
                icon: faCloud,
            },
        ],
    },
];

export const experience = [
    {
        years: "2024 - present",
        title: "Senior Full Stack Software Engineer",
        company: "Sazmining",
        type: "Full-time",
        link: "https://www.sazmining.com",
        descriptions: [
            "Engineered the industry's first integration between a Bitcoin Mining-as-a-Service (BMaaS) platform and the OCEAN decentralized mining pool, enabling real-time hashrate transparency and non-custodial payouts for hundreds of users; built with TypeScript, Supabase, and React.",
            "As an early hire and temporarily sole engineer, played a key role in scaling Sazmining 350% in 2025 — growing from 2 to 5 data centers — shaping core architecture and product strategy during a critical growth phase.",
            "Built a real-time revenue tracking engine that aggregates and reconciles financial data across mining payouts providing leadership with live revenue visibility and eliminating manual reconciliation errors.",
            "Migrated a complex monolith into three purpose-built applications (Admin, Customer, e-commerce) using modern modular patterns, accelerating feature delivery and reducing cross-team deployment risk.",
            "Architected a QuickBooks microservice (Node.js/Express) and automated precision billing via Supabase Edge Functions, integrating third-party APIs to streamline financial operations and ensure accurate revenue collection across subscription and e-commerce platforms.",
            "Mentored junior developers, led code reviews, and conducted engineering interviews, raising team velocity and maintaining high code quality standards.",
        ],
        technologies: [
            "Node.js",
            "Express.js",
            "TypeScript",
            "React",
            "Supabase",
            "GraphQL",
            "Redis",
            "Medusa",
            "Tailwind CSS",
        ],
    },
    {
        years: "2024 - present",
        title: "Web Developer",
        company: "NCQA",
        type: "Contract",
        link: "https://www.ncqa.org",
        descriptions: [
            "Updated and refreshed website content for ncqa.org, enhancing clarity, user engagement, and alignment with NCQA's mission to improve healthcare quality.",
            "Partnered with Allyant to identify and resolve over 200 accessibility issues, implementing WCAG 2.1-compliant enhancements that significantly improved usability and ensured equitable digital access.",
            "Optimized website elements for SEO, resulting in improved search rankings, increased organic traffic, and better visibility for NCQA's accreditation and quality resources.",
            "Served as interim sole web developer for three months during team member's paternity leave, managing full-site maintenance, updates, and issue resolution to ensure uninterrupted operations.",
        ],
        technologies: [
            "WordPress",
            "SEO",
            "WCAG 2.1",
            "Accessibility",
        ],
    },
    {
        years: "2024",
        title: "Web Developer",
        company: "JAN3",
        type: "Contract",
        link: "https://jan3.com",
        descriptions: [
            "Engineered dynamic financial data visualizations with Chart.js and JSON APIs, transforming complex datasets into clear, actionable insights for stakeholders.",
            "Revamped and maintained Ghost frontends for JAN3 and AQUA websites, delivering sleek, user-friendly experiences tailored to brand needs.",
            "Developed robust API endpoints in a NestJS/TypeScript backend, powering seamless data flows and feature scalability.",
            "Crafted custom NestJS modules to supercharge functionality—like real-time content translations—enhancing global accessibility and user engagement.",
        ],
        technologies: [
            "CSS",
            "HTML5",
            "TypeScript",
            "NestJS",
            "Chart.js",
            "REST API",
            "Ghost CMS",
        ],
    },
    {
        years: "2023 - 2024",
        title: "Web Developer II",
        company: "TrueSense Marketing",
        type: "Full-time",
        link: "https://www.truesense.com",
        descriptions: [
            "Spearheaded the seamless transition of 30+ clients from One & All to TrueSense during acquisition, unlocking $10M in revenue through technical and operational support.",
            "Designed and deployed 300+ marketing emails, 100+ donation pages, and 150+ lightboxes, driving engagement for 13 clients with high-performing assets.",
            "Mentored junior developers, led code reviews, and delivered cross-team solutions—backed by thorough documentation—to boost scalability, efficiency, and collaboration.",
            "Built data pipelines to analyze thousands of donations, pinpointing key campaign drivers and fueling data-driven optimizations.",
            "Championed accessibility standards across client verticals, ensuring inclusive, compliant experiences.",
        ],
        technologies: [
            "CSS",
            "HTML5",
            "JavaScript",
            "Data Pipelines",
            "Email Marketing",
            "WordPress",
            "WCAG Standards",
        ],
    },
    {
        years: "2022 - 2023",
        title: "Digital Developer",
        company: "One & All Agency",
        type: "Full-time",
        descriptions: [
            "Partnered with strategists, designers, and execs to architect a mobile app, aligning tech with business goals for a standout user experience.",
            "Ran A/B tests with VWO on donation forms, driving a 200%+ surge in client donations through data-backed optimizations.",
            "Trained freelance developers to build campaigns, streamlining workloads and keeping momentum during peak seasons.",
            "Oversaw engagement and donation analytics for 30+ clients via Google Tag Manager and Google Analytics, delivering actionable insights.",
        ],
        technologies: [
            "CSS",
            "HTML5",
            "A/B Testing",
            "Google Analytics",
            "Mobile Development",
            "JavaScript",
            "VWO",
        ],
    },
    {
        years: "2020 - 2022",
        title: "Full Stack Engineer",
        company: "Freelance",
        type: "Freelance",
        descriptions: [
            "Delivered 20+ websites and web apps for 8 clients, leveraging React, Redux, JavaScript, TypeScript, Express, NestJS, Python, and Django REST to nail functionality and performance.",
            "Tackled development overflow for 3 marketing agencies, supporting 25 clients with fast, reliable solutions under tight deadlines.",
            "Masterminded SEO strategies and wielded Google Search Console to rocket client websites to the top of Google rankings.",
            "Engineered custom WordPress plugins and themes with PHP and JavaScript, tailoring experiences to client specs.",
            "Built CI/CD pipelines using Digital Ocean and Runcloud, enabling rapid iteration and seamless deployment across projects.",
        ],
        technologies: [
            "Python",
            "CSS",
            "React/Redux",
            "TypeScript",
            "Python/Django",
            "CI/CD",
            "SEO",
        ],
    },
];

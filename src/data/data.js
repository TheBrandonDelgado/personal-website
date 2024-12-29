import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import sazStore from "../assets/saz-store.png";
import jan3 from "../assets/jan3.png";
import tesla from "../assets/tesla.png";
import {
    faCss3,
    faHtml5,
    faJs,
    faReact,
} from "@fortawesome/free-brands-svg-icons";
import {
    faChartLine,
    faCode,
    faServer,
    faStore,
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
        username: "TheBrandonDelgado@gmail.com",
        link: "mailto:thebrandondelgado@gmail.com?subject=Website%20Inquiry",
        icon: faEnvelope,
    },
    {
        name: "X",
        username: "@BrandonDelgad0",
        link: "https://x.com/BrandonDelgad0",
        icon: faXTwitter,
    },
];

export const portfolio = [
    {
        year: "2024",
        title: "Sazmining Store",
        company: "Sazmining",
        image: sazStore,
        link: "https://store.sazmining.com",
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
                name: "Medusa",
                icon: faStore,
            },
            {
                name: "Next.js",
                icon: faCode,
            },
        ],
    },
    {
        year: "2024",
        title: "Tesla Clone",
        company: "Personal Project",
        image: tesla,
        link: "https://tesla.brandon-delgado.com",
        description: "Personal Project",
        technologies: [
            {
                name: "React",
                icon: faReact,
            },
            {
                name: "JavaScript",
                icon: faJs,
            },
            {
                name: "HTML5",
                icon: faHtml5,
            },
            {
                name: "CSS",
                icon: faCss3,
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
                name: "Chart.js",
                icon: faChartLine,
            },
            {
                name: "Handlebars.js",
                icon: faCode,
            },
            {
                name: "NestJS",
                icon: faServer,
            },
            {
                name: "TypeScript",
                icon: faCode,
            },
        ],
    },
];

export const experience = [
    {
        years: "2024 - present",
        title: "Senior Full Stack Software Engineer",
        company: "Sazmining",
        link: "https://www.sazmining.com",
        descriptions: [
            "Early hire at a rapidly growing tech startup, contributing to the core architecture and product strategy from initial stages to scaled development.",
            "Integrate third-party GraphQL APIs into the core product, enhancing data flexibility and optimizing performance for external services.",
            "Automate accounting workflows by building a QuickBooks microservice with Node.js and Express.js, facilitating communication between the third-party API and the e-commerce web application.",
            "Mentor junior developers and conduct code reviews, fostering growth and maintaining high coding standards across the team.",
            "Develop and maintain modules and plugins in TypeScript and Node.js for the open-source e-commerce platform Medusa.",
            "Construct scalable databases, edge functions, and APIs using Supabase to efficiently manage application data.",
            "Architect internal CRUD tools with Refine, React, and Tailwind CSS to streamline operational workflows for the company.",
            "Manage Redis persistence strategies, balancing in-memory speed with data durability to ensure high-performance application demands.",
        ],
        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "Tailwind CSS",
        ],
    },
    {
        years: "2024",
        title: "Web Developer",
        company: "JAN3",
        link: "https://jan3.com",
        descriptions: [
            "Engineered data visualization solutions using Chart.js and JSON APIs.",
            "Built and updated the Ghost frontend for both JAN3 and AQUA websites.",
            "Built API endpoints in a NestJS backend using TypeScript.",
            "Constructed custom modules in a NestJS backend that add new functionality like instant translations of site content.",
        ],
        technologies: [
            "Chart.js",
            "Handlebars.js",
            "NestJS",
            "TypeScript",
        ],
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
            "Standardized accessibility guidelines across client verticals.",
        ],
        technologies: [
            "JavaScript",
            "HTML",
            "CSS",
            "Wordpress",
        ],
    },
    {
        years: "2022 - 2023",
        title: "Digital Developer",
        company: "One & All",
        descriptions: [
            "Collaborated with a team of strategists, designers, and executive leadership to engineer a mobile application.",
            "Conducted A/B testing using VWO for donation forms, allowing clients to generate an over 200% increase in donations.",
            "Trained freelance developers on building campaigns in order to balance workload effectively during the busiest seasons.",
            "Managed and analyzed engagement and donation data using Google Tag Manager and Google Analytics for 30+ clients.",
        ],
        technologies: [
            "JavaScript",
            "HTML",
            "CSS",
            "WordPress",
        ],
    },
    {
        years: "2020 - 2022",
        title: "Full Stack Engineer",
        company: "Freelance",
        descriptions: [
            "Built 20+ websites and web applications for 8 individual clients using React, Redux, JavaScript, TypeScript, Express, and NestJS.",
            "Managed development overflow for 3 marketing agencies with work spanning 25 clients.",
            "Crafted optimal SEO strategies and worked with Google Search Console to bring website listings to the top of Google Search.",
            "Developed custom plugins and themes for WordPress using PHP and JavaScript.",
            "Constructed CI/CD pipelines using Digital Ocean and Runcloud allowing for continuous deployment of websites while iterating quickly on projects.",
        ],
        technologies: [
            "React",
            "Redux",
            "TypeScript",
            "JavaScript",
        ],
    },
];

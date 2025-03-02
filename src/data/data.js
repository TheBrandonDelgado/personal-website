import {
    faCloud,
    faDatabase,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
        username: "TheBrandonDelgado@gmail.com",
        link: "mailto:thebrandondelgado@gmail.com?subject=Website%20Inquiry",
        icon: faEnvelope,
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
        link: "https://www.sazmining.com",
        descriptions: [
            "Early hire at Sazmining, a fast-growing tech startup, shaping core architecture and product strategy from inception through scaled development; temporarily served as the sole engineer, owning all engineering responsibilities during a critical growth phase.",
            "Integrate third-party GraphQL APIs into the core product, boosting data flexibility and optimizing performance for external services.",
            "Automate accounting workflows with a QuickBooks microservice (Node.js/Express.js), linking third-party APIs to the e-commerce web app for seamless financial operations.",
            "Automate precision billing using Supabase edge functions, custom algorithms, and third-party payment processors, ensuring accurate and efficient revenue collection.",
            "Mentor junior developers and lead code reviews, driving team growth and upholding high coding standards.",
            "Build and maintain TypeScript/Node.js modules and plugins for Medusa, an open-source e-commerce platform.",
            "Design scalable databases, edge functions, and APIs with Supabase to streamline application data management.",
            "Architect internal CRUD tools using Refine, React, and Tailwind CSS, enhancing operational efficiency.",
            "Optimize Redis persistence strategies, balancing in-memory performance with data durability for demanding applications.",
        ],
        technologies: [
            "TypeScript",
            "Node.js",
            "React",
            "Supabase",
            "GraphQL",
            "Redis",
            "Medusa",
            "Tailwind CSS",
        ],
    },
    {
        years: "2024",
        title: "Web Developer",
        company: "JAN3",
        link: "https://jan3.com",
        descriptions: [
            "Engineered dynamic financial data visualizations with Chart.js and JSON APIs, transforming complex datasets into clear, actionable insights for stakeholders.",
            "Revamped and maintained Ghost frontends for JAN3 and AQUA websites, delivering sleek, user-friendly experiences tailored to brand needs.",
            "Developed robust API endpoints in a NestJS/TypeScript backend, powering seamless data flows and feature scalability.",
            "Crafted custom NestJS modules to supercharge functionality—like real-time content translations—enhancing global accessibility and user engagement.",
        ],
        technologies: [
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
        link: "https://www.truesense.com",
        descriptions: [
            "Spearheaded the seamless transition of 30+ clients from One & All to TrueSense during acquisition, unlocking $10M in revenue through technical and operational support.",
            "Designed and deployed 300+ marketing emails, 100+ donation pages, and 150+ lightboxes, driving engagement for 13 clients with high-performing assets.",
            "Mentored junior developers, led code reviews, and delivered cross-team solutions—backed by thorough documentation—to boost scalability, efficiency, and collaboration.",
            "Built data pipelines to analyze thousands of donations, pinpointing key campaign drivers and fueling data-driven optimizations.",
            "Championed accessibility standards across client verticals, ensuring inclusive, compliant experiences.",
        ],
        technologies: [
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
        company: "One & All",
        descriptions: [
            "Partnered with strategists, designers, and execs to architect a mobile app, aligning tech with business goals for a standout user experience.",
            "Ran A/B tests with VWO on donation forms, driving a 200%+ surge in client donations through data-backed optimizations.",
            "Trained freelance developers to build campaigns, streamlining workloads and keeping momentum during peak seasons.",
            "Oversaw engagement and donation analytics for 30+ clients via Google Tag Manager and Google Analytics, delivering actionable insights.",
        ],
        technologies: [
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
        descriptions: [
            "Delivered 20+ websites and web apps for 8 clients, leveraging React, Redux, JavaScript, TypeScript, Express, NestJS, Python, and Django REST to nail functionality and performance.",
            "Tackled development overflow for 3 marketing agencies, supporting 25 clients with fast, reliable solutions under tight deadlines.",
            "Masterminded SEO strategies and wielded Google Search Console to rocket client websites to the top of Google rankings.",
            "Engineered custom WordPress plugins and themes with PHP and JavaScript, tailoring experiences to client specs.",
            "Built CI/CD pipelines using Digital Ocean and Runcloud, enabling rapid iteration and seamless deployment across projects.",
        ],
        technologies: [
            "React/Redux",
            "TypeScript",
            "Python/Django",
            "CI/CD",
            "SEO",
        ],
    },
];

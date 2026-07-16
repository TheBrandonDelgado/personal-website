import type { SocialLink, Project, ExperienceEntry } from "../types/content";
import {
    faCloud,
    faDatabase,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import saz from "../assets/Sazmining.webp";
import jan3 from "../assets/jan3.webp";
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
] satisfies SocialLink[];

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
] satisfies Project[];

export const experience = [
    {
        years: "2024 - present",
        title: "Senior Full Stack Software Engineer",
        company: "Sazmining",
        type: "Full-time",
        link: "https://www.sazmining.com",
        descriptions: [
            "Architected the migration of a monolith into three purpose-built applications (Admin, Customer, e-commerce), including a QuickBooks microservice and an automated billing pipeline on Supabase Edge Functions, restructuring how financial operations run across subscription and e-commerce systems.",
            "Led a full-stack rebuild and production cutover of the customer commerce platform from Medusa v1 to Medusa v2—backend, storefront, and shared contracts in a monorepo—redesigning multi-facility catalog/pricing, cart and checkout, payment capture, QuickBooks invoicing, and inventory availability while preserving money-correct purchase flows.",
            "Built a real-time revenue engine over asynchronous payout sources using event-driven, immutable ledger patterns, eliminating manual reconciliation and giving leadership live financial visibility.",
            "Engineered the industry's first integration between a Bitcoin Mining-as-a-Service (BMaaS) platform and the OCEAN decentralized mining pool, delivering real-time hashrate transparency and non-custodial Bitcoin payouts to hundreds of users; built with TypeScript, Supabase, and React.",
            "Designed a deferred pool and wallet change system that abstracts mining-pool constraints (stranded earnings, change windows, rate limits), so users initiate changes immediately while a background poller executes when conditions allow, with clear progress visibility throughout.",
            "Built an AI-first engineering knowledge base mapping the stack, architectural decisions, and second-order change consequences, enabling AI-assisted development to operate effectively across a complex production codebase.",
            "Joined as an early hire and served as temporarily sole engineer while the company scaled 350% in 2025, growing from 2 to 5 data centers; shaped core architecture and product strategy through a critical growth phase.",
        ],
        technologies: [
            "Node.js",
            "Express.js",
            "TypeScript",
            "React",
            "Supabase",
            "PostgreSQL",
            "GraphQL",
            "Redis",
            "Medusa (v1/v2)",
            "Event-Driven Architecture",
            "Distributed Systems",
            "Claude Code",
        ],
    },
    {
        years: "2024",
        title: "Web Developer",
        company: "JAN3",
        type: "Contract",
        link: "https://jan3.com",
        descriptions: [
            "Developed backend API endpoints in a NestJS and TypeScript service, including custom modules such as real-time content translation, powering data flows for JAN3 and the AQUA Bitcoin wallet.",
            "Built dynamic financial data visualizations with Chart.js and JSON APIs, turning complex Bitcoin-related datasets into clear, actionable insights for stakeholders.",
        ],
        technologies: [
            "TypeScript",
            "NestJS",
            "Chart.js",
            "REST API",
        ],
    },
    {
        years: "2023 - 2024",
        title: "Web Developer II",
        company: "TrueSense Marketing",
        type: "Full-time",
        link: "https://www.truesense.com",
        descriptions: [
            "Led the technical transition of 30+ clients during an agency acquisition, supporting $10M in revenue continuity through data and systems migration.",
            "Mentored junior developers and led code reviews, improving team practices and scalability.",
        ],
        technologies: [
            "JavaScript",
            "Data Pipelines",
        ],
    },
    {
        years: "2022 - 2023",
        title: "Digital Developer",
        company: "One & All Agency",
        type: "Full-time",
        descriptions: [
            "Partnered with strategists, designers, and executives to architect a mobile app, and owned engagement and donation analytics for 30+ clients.",
        ],
        technologies: [
            "JavaScript",
            "Mobile Development",
        ],
    },
    {
        years: "2020 - 2022",
        title: "Full Stack Engineer",
        company: "Freelance",
        type: "Freelance",
        descriptions: [
            "Built 20+ websites and web applications for 8 clients using React, Redux, TypeScript, Express, NestJS, and Python/Django, and set up CI/CD pipelines for rapid deployment.",
        ],
        technologies: [
            "React/Redux",
            "TypeScript",
            "Python/Django",
            "CI/CD",
        ],
    },
] satisfies ExperienceEntry[];

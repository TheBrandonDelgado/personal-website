import type { SocialLink, Project, ExperienceEntry } from "../types/content";
import {
    faBolt,
    faChartLine,
    faCode,
    faCodeBranch,
    faDatabase,
    faEnvelope,
    faFileInvoice,
    faNetworkWired,
    faServer,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
    faNodeJs,
    faReact,
} from "@fortawesome/free-brands-svg-icons";
import saz from "../assets/Sazmining.webp";
import sazStore from "../assets/Sazmining-Store.webp";
import jan3 from "../assets/jan3.webp";

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
        year: "2026 - Present",
        title: "Sazmining Store",
        company: "Sole technical owner · Full stack · Production cutover",
        image: sazStore,
        link: "https://store.sazmining.com",
        description:
            "End-to-end Medusa v2 commerce platform for Sazmining hardware sales: multi-facility pricing and inventory, cart/checkout, Zaprite payment settlement, and QuickBooks invoicing—owned through production cutover.",
        technologies: [
            {
                name: "TypeScript",
                icon: faCode,
            },
            {
                name: "Medusa 2",
                icon: faShoppingCart,
            },
            {
                name: "React",
                icon: faReact,
            },
            {
                name: "TanStack Start",
                icon: faServer,
            },
            {
                name: "Node",
                icon: faNodeJs,
            },
            {
                name: "Postgres",
                icon: faDatabase,
            },
            {
                name: "Redis",
                icon: faNetworkWired,
            },
            {
                name: "Zaprite",
                icon: faBolt,
            },
            {
                name: "QuickBooks",
                icon: faFileInvoice,
            },
        ],
    },
    {
        year: "2024 - Present",
        title: "Sazmining User Dashboard",
        company: "Sole product owner · Customer-facing · Ongoing",
        image: saz,
        link: "https://app.sazmining.com",
        description:
            "Sole owner of Sazmining’s primary customer-facing product: a React/TypeScript dashboard for managing mining service, financial status, and platform integrations—end-to-end product ownership.",
        technologies: [
            {
                name: "TypeScript",
                icon: faCode,
            },
            {
                name: "React",
                icon: faReact,
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
                name: "Postgres",
                icon: faDatabase,
            },
            {
                name: "Full-stack product",
                icon: faServer,
            },
        ],
    },
    {
        year: "2024",
        title: "JAN3 Website",
        company: "Contract · Backend & data visualizations",
        image: jan3,
        link: "https://jan3.com",
        description:
            "NestJS/TypeScript APIs (including real-time translation) and Chart.js financial visualizations for the JAN3 and AQUA Bitcoin wallet websites.",
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
                name: "REST APIs",
                icon: faNetworkWired,
            },
            {
                name: "Bitcoin / fintech-adjacent",
                icon: faBolt,
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
        years: "2022 - 2024",
        title: "Web Developer II",
        company: "TrueSense Marketing",
        type: "Full-time · One & All Agency through acquisition",
        link: "https://www.truesense.com",
        descriptions: [
            "Led the technical transition of 30+ clients during an agency acquisition, supporting $10M in revenue continuity through data and systems migration.",
            "Mentored junior developers and led code reviews, improving team practices and scalability.",
            "Partnered with strategists, designers, and executives to architect a mobile app, and owned engagement and donation analytics across 30+ client accounts.",
        ],
        technologies: [
            "JavaScript",
            "Data Pipelines",
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

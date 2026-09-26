import type { SocialLink, Project, ExperienceEntry } from "../types/content";

/** Compact hero badges under the one-liner. Labels match stack already claimed on the site. */
export const heroStack = [
  "TypeScript",
  "React",
  "Node.js",
  "Postgres",
  "Supabase",
  "Redis",
  "NestJS / Express",
] as const;

export const social = [
  {
    name: "LinkedIn",
    username: "Brandon Delgado",
    link: "https://www.linkedin.com/in/thebrandondelgado/",
  },
  {
    name: "GitHub",
    username: "TheBrandonDelgado",
    link: "https://github.com/TheBrandonDelgado",
  },
  {
    name: "Email",
    username: "TheBrandonDelgado@icloud.com",
    link: "mailto:thebrandondelgado@icloud.com?subject=Website%20Inquiry",
  },
  {
    name: "Resume",
    username: "Brandon Delgado",
    link: "/Brandon-Delgado-Resume.pdf",
    download: "Brandon-Delgado-Resume.pdf",
  },
] satisfies SocialLink[];

export const portfolio = [
  {
    year: "2026 - Present",
    title: "Sazmining Store",
    company: "Sole technical owner · Full stack · Production cutover",
    link: "https://store.sazmining.com",
    description:
      "End-to-end Medusa v2 commerce platform for Sazmining hardware sales: multi-facility pricing and inventory, cart/checkout, Zaprite payment settlement, and QuickBooks invoicing—owned through production cutover.",
    technologies: [
      "TypeScript",
      "Medusa 2",
      "React",
      "TanStack Start",
      "Node",
      "Postgres",
      "Redis",
      "Zaprite",
      "QuickBooks",
    ],
  },
  {
    year: "2024 - Present",
    title: "Sazmining User Dashboard",
    company: "Sole product owner · Customer-facing · Ongoing",
    link: "https://app.sazmining.com",
    description:
      "Sole owner of Sazmining’s primary customer-facing product: a React/TypeScript dashboard for managing hosted hardware, financial status, and platform integrations—end-to-end product ownership.",
    technologies: [
      "TypeScript",
      "React",
      "Supabase",
      "GraphQL",
      "Postgres",
      "Full-stack product",
    ],
  },
  {
    year: "2024",
    title: "JAN3 Website",
    company: "Contract · Backend & data visualizations",
    link: "https://jan3.com",
    description:
      "NestJS/TypeScript APIs (including real-time translation) and Chart.js financial visualizations for the JAN3 and AQUA wallet websites.",
    technologies: ["TypeScript", "NestJS", "Chart.js", "REST APIs", "Fintech / wallets"],
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
      "Led a full-stack rebuild and production cutover of the customer commerce platform from Medusa v1 to Medusa v2—backend, storefront, and shared contracts in a monorepo—redesigning multi-facility catalog/pricing, cart and checkout, payment capture, QuickBooks invoicing, and inventory availability while preserving correct purchase flows.",
      "Built a real-time revenue engine over asynchronous payout sources using event-driven, immutable ledger patterns, eliminating manual reconciliation and giving leadership live financial visibility.",
      "Engineered a first-of-its-kind third-party payout and earnings integration, giving hundreds of users real-time transparency; built with TypeScript, Supabase, and React.",
      "Designed a deferred change system that abstracts third-party constraints (stranded earnings, change windows, rate limits), so users initiate changes immediately while a background poller executes when conditions allow, with clear progress visibility throughout.",
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
      "Developed backend API endpoints in a NestJS and TypeScript service, including custom modules such as real-time content translation, powering data flows for JAN3 and the AQUA wallet.",
      "Built dynamic financial data visualizations with Chart.js and JSON APIs, turning complex financial datasets into clear, actionable insights for stakeholders.",
    ],
    technologies: ["TypeScript", "NestJS", "Chart.js", "REST API"],
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
    technologies: ["JavaScript", "Data Pipelines"],
  },
  {
    years: "2020 - 2022",
    title: "Full Stack Engineer",
    company: "Freelance",
    type: "Freelance",
    descriptions: [
      "Built 20+ websites and web applications for 8 clients using React, Redux, TypeScript, Express, and NestJS, and set up CI/CD pipelines for rapid deployment.",
    ],
    technologies: ["React/Redux", "TypeScript", "CI/CD"],
  },
] satisfies ExperienceEntry[];

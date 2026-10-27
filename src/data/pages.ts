import { experience, portfolio } from "./data";

export const SITE = "https://brandon-delgado.com";

export const HOME_TITLE = "Brandon Delgado — Senior Full Stack Software Engineer";

/** Short line for the home meta, Open Graph, and Twitter description tags. */
export const HOME_DESCRIPTION =
  "Brandon Delgado, senior full-stack engineer: payments, checkout, and customer-facing product, built end to end.";

/** Long line for the hero and the JSON-LD description. */
export const POSITIONING =
  "I build the parts of a product where money moves and customers are watching: checkout, payments, invoicing, and the customer-facing app. I own it end to end, from data model to UI, and ship daily with AI agents under review rules I wrote.";

const emphasisStart = POSITIONING.indexOf("checkout, payments");
const emphasisEnd = emphasisStart + "checkout, payments, invoicing, and the customer-facing app.".length;

export const INTRO_LEAD = POSITIONING.slice(0, emphasisStart);
export const INTRO_EMPHASIS = POSITIONING.slice(emphasisStart, emphasisEnd);
export const INTRO_TAIL = POSITIONING.slice(emphasisEnd);

/** Verbatim closing line from the approved manifesto mockup. */
export const CLOSING_LINE = "Software that touches the physical world has to respect it.";

/** Required company framing. Not a stand-in for a product metric. */
export const SAZMINING_LINE =
  "Sazmining is a hardware hosting and managed infrastructure service.";

export interface Principle {
  numeral: string;
  statement: string;
  proofName: string;
  proofLine: string;
  path: string;
}

export const principles = [
  {
    numeral: "i",
    statement: "Leave it better than you found it.",
    proofName: "Commerce rebuild",
    proofLine: "Led store.sazmining.com from initial scaffolding to production.",
    path: "/proof/commerce-rebuild",
  },
  {
    numeral: "ii",
    statement: "Make more possible, for more people.",
    proofName: "Earnings integration",
    proofLine: "Real-time earnings and direct payouts for hundreds of customers.",
    path: "/proof/earnings-integration",
  },
  {
    numeral: "iii",
    statement: "Own the whole thing.",
    proofName: "app.sazmining.com",
    proofLine: "Sole owner of the customer dashboard. Sole engineer into 2025.",
    path: "/proof/customer-dashboard",
  },
  {
    numeral: "iv",
    statement: "Let reason decide, not habit.",
    proofName: "Revenue ledger",
    proofLine: "Polled on a schedule, insert-only. Manual reconciliation, gone.",
    path: "/proof/revenue-ledger",
  },
  {
    numeral: "v",
    statement: "Build what works in the real world.",
    proofName: "Dispatch",
    proofLine: "Redis queue, paced once a minute across data centers.",
    path: "/proof/hardware-dispatch",
  },
  {
    numeral: "vi",
    statement: "Use every tool that makes you better.",
    proofName: "How I work",
    proofLine:
      "AI-first with Claude Code and Cursor, with the judgment kept my own.",
    path: "/proof/how-i-work",
  },
] as const satisfies readonly Principle[];

export interface PageLink {
  href: string;
  label: string;
}

export interface PageBlock {
  id?: string;
  heading: string;
  paragraphs: readonly string[];
  links?: readonly PageLink[];
}

export interface Subpage {
  path: string;
  title: string;
  description: string;
  ogType: "article";
  kicker: string;
  headline: string;
  /** When set, this is the page's h1: the work, not the principle. */
  serif?: string;
  blocks: readonly PageBlock[];
  links?: readonly PageLink[];
  quote?: string;
  next?: PageLink;
  diagram?: boolean;
  note?: string;
}

export interface HomePageMeta {
  path: "/";
  title: string;
  description: string;
  ogType: "website";
}

export type PublishedPage = HomePageMeta | Subpage;

function job(company: string) {
  const entry = experience.find((item) => item.company === company);
  if (!entry) {
    throw new Error(`Missing experience entry for ${company}`);
  }
  return entry;
}

function bullet(company: string, snippet: string): string {
  const line = job(company).descriptions.find((item) => item.includes(snippet));
  if (!line) {
    throw new Error(`Missing ${company} copy containing "${snippet}"`);
  }
  return line;
}

function project(title: string) {
  const entry = portfolio.find((item) => item.title === title);
  if (!entry) {
    throw new Error(`Missing portfolio entry ${title}`);
  }
  return entry;
}

const saz = job("Sazmining");
const dashboard = project("Sazmining User Dashboard");
const store = project("Sazmining Store");

const commerce = principles[0];
const earnings = principles[1];
const customer = principles[2];
const ledger = principles[3];
const dispatch = principles[4];
const practice = principles[5];

function proofKicker(principle: Principle): string {
  return `${principle.numeral}  ·  ${principle.statement}  ·  Sazmining, 2024–present`;
}

export const subpages: readonly Subpage[] = [
  {
    path: commerce.path,
    title: "Commerce rebuild — Brandon Delgado",
    description:
      "Brandon Delgado led the rebuild of store.sazmining.com on Medusa v2 from initial scaffolding to production: pricing, checkout, invoicing, and inventory.",
    ogType: "article",
    kicker: proofKicker(commerce),
    headline: commerce.statement,
    serif: commerce.proofLine,
    blocks: [
      {
        heading: "The rebuild",
        paragraphs: [
          store.description,
          bullet("Sazmining", "Medusa v1 to Medusa v2"),
          "In September 2026 I shipped 0% financing at checkout, so customers can spread the cost of hardware over time.",
          bullet("Sazmining", "loyalty program"),
          bullet("Sazmining", "bug-bounty"),
        ],
        links: [{ href: store.link, label: "store.sazmining.com" }],
      },
    ],
    next: { href: earnings.path, label: "ii. Make more possible, for more people →" },
  },
  {
    path: earnings.path,
    title: "Earnings integration — Brandon Delgado",
    description:
      "An earnings and payout integration Brandon Delgado built at Sazmining, giving hundreds of customers real-time earnings and direct payouts.",
    ogType: "article",
    kicker: proofKicker(earnings),
    headline: earnings.statement,
    serif: earnings.proofLine,
    blocks: [
      {
        heading: "The integration",
        paragraphs: [bullet("Sazmining", "Real-time earnings and direct payouts")],
      },
      {
        heading: "Deferred changes",
        paragraphs: [bullet("Sazmining", "deferred change system")],
      },
    ],
    next: { href: customer.path, label: "iii. Own the whole thing →" },
  },
  {
    path: customer.path,
    title: "Customer dashboard — Brandon Delgado",
    description:
      "Brandon Delgado is the sole owner of the Sazmining customer dashboard: hosted hardware, financial status, and platform integrations in React and TypeScript.",
    ogType: "article",
    kicker: proofKicker(customer),
    headline: customer.statement,
    serif: customer.proofLine,
    blocks: [
      {
        heading: "The product",
        paragraphs: [
          dashboard.description,
          bullet("Sazmining", "sole engineer into 2025"),
        ],
        links: [{ href: dashboard.link, label: "app.sazmining.com" }],
      },
    ],
    next: { href: ledger.path, label: "iv. Let reason decide, not habit →" },
  },
  {
    path: ledger.path,
    title: "Revenue ledger — Brandon Delgado",
    description:
      "Brandon Delgado wrote the revenue ledger at Sazmining. It polls two payout providers on a schedule into insert-only records and ends manual reconciliation.",
    ogType: "article",
    kicker: proofKicker(ledger),
    headline: ledger.statement,
    serif: ledger.proofLine,
    blocks: [
      {
        heading: "The ledger",
        paragraphs: [bullet("Sazmining", "insert-only")],
      },
    ],
    next: { href: dispatch.path, label: "v. Build what works in the real world →" },
  },
  {
    path: dispatch.path,
    title: "Hardware dispatch — Brandon Delgado",
    description:
      "How Brandon Delgado sends hardware configuration commands across data centers: a Redis queue and cron scheduler, paced on a one-minute interval.",
    ogType: "article",
    kicker: proofKicker(dispatch),
    headline: dispatch.statement,
    serif: dispatch.proofLine,
    diagram: true,
    blocks: [
      {
        heading: "The problem",
        paragraphs: [
          "Customers own hardware hosted across multiple data centers. Each machine needs commands, and a burst of them at one site causes power fluctuations.",
        ],
      },
      {
        heading: "The decision",
        paragraphs: [
          "Treat power as a real constraint. The original Redis queue and cron scheduler paces configuration commands across data centers on a one-minute interval. Its Postgres-based successor followed, fed by the deferred change queue.",
        ],
      },
      {
        heading: "The conditions",
        paragraphs: [
          "I was the sole engineer into 2025, then led the core platform, authoring over 80% of backend code, as the company scaled 350% from 2 to 5 data centers.",
          bullet("Sazmining", "Created the Admin app"),
        ],
      },
    ],
    links: [{ href: saz.link ?? "https://www.sazmining.com", label: "sazmining.com" }],
    quote: CLOSING_LINE,
    next: { href: practice.path, label: "vi. Use every tool that makes you better →" },
    note: SAZMINING_LINE,
  },
  {
    path: practice.path,
    title: "How I work — Brandon Delgado",
    description:
      "Brandon Delgado works AI-first with Claude Code and Cursor, and built a knowledge base for a complex production codebase.",
    ogType: "article",
    kicker: proofKicker(practice),
    headline: practice.statement,
    serif: practice.proofLine,
    blocks: [
      {
        heading: "The practice",
        paragraphs: [
          bullet("Sazmining", "AI-first engineering knowledge base"),
          bullet("Sazmining", "review rules I wrote"),
        ],
      },
    ],
    next: { href: "/work", label: "Earlier work →" },
  },
  {
    path: "/work",
    title: "Earlier work — Brandon Delgado",
    description:
      "Earlier work by Brandon Delgado: JAN3, TrueSense Marketing, and freelance full-stack delivery.",
    ogType: "article",
    kicker: "JAN3  ·  TrueSense Marketing  ·  Freelance",
    headline: "Earlier work.",
    blocks: [
      {
        id: "jan3",
        heading: "JAN3",
        paragraphs: [
          `${job("JAN3").title} · ${job("JAN3").years} · ${job("JAN3").type ?? "Contract"}`,
          ...job("JAN3").descriptions,
        ],
        links: [{ href: "https://jan3.com", label: "jan3.com" }],
      },
      {
        id: "truesense",
        heading: "TrueSense Marketing",
        paragraphs: [
          `${job("TrueSense Marketing").title} · ${job("TrueSense Marketing").years} · ${job("TrueSense Marketing").type ?? ""}`,
          ...job("TrueSense Marketing").descriptions,
        ],
        links: [{ href: "https://www.truesense.com", label: "truesense.com" }],
      },
      {
        id: "freelance",
        heading: "Freelance",
        paragraphs: [
          `${job("Freelance").title} · ${job("Freelance").years} · ${job("Freelance").type ?? "Freelance"}`,
          ...job("Freelance").descriptions,
        ],
      },
    ],
    next: { href: "/", label: "What I hold to →" },
  },
];

export const homePage = {
  path: "/",
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  ogType: "website",
} as const satisfies HomePageMeta;

export const publishedPages: readonly PublishedPage[] = [homePage, ...subpages];

export function normalizePath(input: string): string {
  const bare = input.split(/[?#]/)[0] ?? "/";
  if (bare.length > 1 && bare.endsWith("/")) {
    return bare.slice(0, -1);
  }
  return bare.length === 0 ? "/" : bare;
}

export function resolvePath(input: string): string {
  const path = normalizePath(input);
  return publishedPages.some((page) => page.path === path) ? path : "/";
}

export function canonicalFor(path: string): string {
  return path === "/" ? `${SITE}/` : `${SITE}${path}`;
}

export function pageByPath(input: string): PublishedPage {
  const path = resolvePath(input);
  const page = publishedPages.find((item) => item.path === path);
  return page ?? homePage;
}

export function subpageByPath(path: string): Subpage | undefined {
  return subpages.find((page) => page.path === path);
}

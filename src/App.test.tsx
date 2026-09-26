import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import App from "./App.tsx";
import { principles, publishedPages, CLOSING_LINE, INTRO_EMPHASIS, SAZMINING_LINE } from "./data/pages.ts";

const banned = [
  /\bmining\b/i,
  /bitcoin/i,
  /hashrate/i,
  /\bpython\b/i,
  /BMaaS/,
  /\bOCEAN\b/,
  /money rails/i,
  /\bcrypto/i,
  /open to work/i,
];

test("renders one h1 with Brandon's name and role", () => {
  render(<App />);
  const headings = screen.getAllByRole("heading", { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent(/brandon delgado/i);
  expect(headings[0]).toHaveTextContent(/senior full-stack engineer/i);
  expect(headings[0]).toHaveTextContent(/what i hold to/i);
});

test("renders hero stack chips and a resume download", () => {
  render(<App />);

  const stack = screen.getByRole("list", { name: /core stack/i });
  expect(stack).toHaveTextContent("TypeScript");
  expect(stack).toHaveTextContent("React");
  expect(stack).toHaveTextContent("Node.js");
  expect(stack).toHaveTextContent("Postgres");
  expect(stack).toHaveTextContent("Supabase");
  expect(stack).toHaveTextContent("Redis");
  expect(stack).toHaveTextContent("NestJS / Express");

  const resume = screen.getByRole("link", { name: /download resume/i });
  expect(resume).toHaveAttribute("href", "/Brandon-Delgado-Resume.pdf");
  expect(resume).toHaveAttribute("download", "Brandon-Delgado-Resume.pdf");
  expect(resume).not.toHaveAttribute("target");
});

test("renders the six principles as h2s with h3 proofs", () => {
  render(<App />);
  expect(screen.getByText(INTRO_EMPHASIS)).toBeInTheDocument();
  for (const principle of principles) {
    expect(screen.getByRole("heading", { level: 2, name: principle.statement })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: `The proof · ${principle.proofName}` }),
    ).toBeInTheDocument();
    expect(screen.getByText(principle.proofLine)).toBeInTheDocument();
  }
});

test("keeps every route free of banned wording", () => {
  for (const page of publishedPages) {
    const { container, unmount } = render(<App initialPath={page.path} />);
    const text = container.textContent ?? "";
    for (const pattern of banned) {
      expect(text, `${page.path} ${pattern}`).not.toMatch(pattern);
    }
    expect(text).toContain("Brandon Delgado");
    unmount();
  }
});

test("closes the current role as 2024–present", () => {
  const home = render(<App />);
  expect(screen.getByRole("link", { name: "Sazmining 2024–present" })).toHaveAttribute(
    "href",
    "/proof/customer-dashboard",
  );
  home.unmount();

  for (const page of publishedPages) {
    const view = render(<App initialPath={page.path} />);
    expect(view.container.textContent ?? "", page.path).not.toMatch(/20\d{2}[–-]\s*(?=·|$)/);
    view.unmount();
  }
});

test("renders the hardware dispatch proof with the recorded facts", () => {
  render(<App initialPath="/proof/hardware-dispatch" />);
  expect(screen.getByRole("heading", { level: 1, name: /build what works in the real world/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: /the problem/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: /the decision/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 2, name: /the conditions/i })).toBeInTheDocument();
  expect(screen.getByText(/350%/)).toBeInTheDocument();
  expect(screen.getAllByText(/Redis queue/i).length).toBeGreaterThan(0);
  expect(screen.getByText(CLOSING_LINE)).toBeInTheDocument();
  expect(screen.getByText(SAZMINING_LINE)).toBeInTheDocument();
});

test("publishes every route in the sitemap and keeps share metadata", () => {
  const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
  for (const page of publishedPages) {
    const loc = page.path === "/" ? "https://brandon-delgado.com/" : `https://brandon-delgado.com${page.path}`;
    expect(sitemap).toContain(`<loc>${loc}</loc>`);
  }

  const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
  expect(html).toContain('"@type": "Person"');
  expect(html).toContain('"@type": "WebSite"');
  expect(html).toContain('rel="canonical"');
  expect(html).toContain("https://brandon-delgado.com/og.jpg");
  expect(html).toContain('href="/favicon.ico"');
});

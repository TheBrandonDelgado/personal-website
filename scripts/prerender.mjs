// Inject a static render into each route's HTML so crawlers see the page
// without executing JavaScript. The browser hydrates that HTML.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = resolve(root, "dist/index.html");
const serverEntry = resolve(root, ".ssr-build/entry-server.mjs");

const template = readFileSync(templatePath, "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error(`Prerender marker not found in ${templatePath}`);
}

const { render, publishedPages } = await import(pathToFileURL(serverEntry).href);

function escapeText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function escapeAttr(value) {
  return escapeText(value).replace(/"/g, "&quot;");
}

function setMeta(html, key, value) {
  const pattern = new RegExp(`(data-seo="${key}"[^>]*content=")[^"]*"`);
  if (!pattern.test(html)) {
    throw new Error(`Missing meta ${key}`);
  }
  return html.replace(pattern, `$1${escapeAttr(value)}"`);
}

function applyHead(html, meta, jsonLd) {
  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);
  next = setMeta(next, "description", meta.description);
  next = setMeta(next, "og:title", meta.title);
  next = setMeta(next, "og:description", meta.description);
  next = setMeta(next, "og:url", meta.canonical);
  next = setMeta(next, "og:type", meta.ogType);
  next = setMeta(next, "twitter:title", meta.title);
  next = setMeta(next, "twitter:description", meta.description);
  next = setMeta(next, "twitter:url", meta.canonical);
  const canonical = new RegExp(`(data-seo="canonical"[^>]*href=")[^"]*"`);
  if (!canonical.test(next)) {
    throw new Error("Missing canonical link");
  }
  next = next.replace(canonical, `$1${escapeAttr(meta.canonical)}"`);
  const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
  const jsonPattern = /<script type="application\/ld\+json" id="page-jsonld">[\s\S]*?<\/script>/;
  if (!jsonPattern.test(next)) {
    throw new Error("Missing page JSON-LD");
  }
  next = next.replace(
    jsonPattern,
    `<script type="application/ld+json" id="page-jsonld">${json}</script>`,
  );
  return next;
}

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

const pages = [];
for (const page of publishedPages) {
  const rendered = render(page.path);
  if (!rendered.html.includes("Brandon Delgado")) {
    throw new Error(`Prerender for ${page.path} did not include the name`);
  }
  if (!rendered.html.includes(`data-page="${page.path}"`)) {
    throw new Error(`Prerender for ${page.path} rendered ${rendered.meta.path}`);
  }
  for (const pattern of banned) {
    if (pattern.test(rendered.html)) {
      throw new Error(`Banned copy ${pattern} in ${page.path}`);
    }
  }
  const file = applyHead(template, rendered.meta, rendered.jsonLd).replace(
    marker,
    `<div id="root">${rendered.html}</div>`,
  );
  if (file.includes("opacity:0") || file.includes("opacity: 0")) {
    throw new Error(`Prerendered HTML for ${page.path} hides text with opacity 0`);
  }
  pages.push({ path: page.path, html: file, title: rendered.meta.title });
}

for (const page of pages) {
  const filePath =
    page.path === "/"
      ? resolve(root, "dist/index.html")
      : resolve(root, "dist", page.path.slice(1), "index.html");
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, page.html);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publishedPages
  .map((page) => {
    const loc = page.path === "/" ? "https://brandon-delgado.com/" : `https://brandon-delgado.com${page.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  })
  .join("\n")}
</urlset>
`;
writeFileSync(resolve(root, "dist/sitemap.xml"), sitemap);

rmSync(resolve(root, ".ssr-build"), { recursive: true, force: true });

const required = [
  "dist/sitemap.xml",
  "dist/robots.txt",
  "dist/og.jpg",
  "dist/avatar.jpg",
  "dist/favicon.ico",
  "dist/favicon-32.png",
  "dist/apple-touch-icon.png",
  "dist/icon-192.png",
  "dist/icon-512.png",
  "dist/manifest.json",
  "dist/Brandon-Delgado-Resume.pdf",
  "dist/proof/hardware-dispatch/index.html",
];

for (const rel of required) {
  if (!existsSync(resolve(root, rel))) {
    throw new Error(`Published file missing from the build: ${rel}`);
  }
}

const home = readFileSync(resolve(root, "dist/index.html"), "utf8");
for (const snippet of [
  "Senior Full-Stack Engineer",
  "Supabase",
  "NestJS / Express",
  "/Brandon-Delgado-Resume.pdf",
  "Build what works in the real world.",
  "Let reason decide, not habit.",
  "https://brandon-delgado.com/og.jpg",
  '"@type": "Person"',
  '"@type": "WebSite"',
]) {
  if (!home.includes(snippet)) {
    throw new Error(`Home HTML is missing ${snippet}`);
  }
}

const dispatch = readFileSync(resolve(root, "dist/proof/hardware-dispatch/index.html"), "utf8");
for (const snippet of [
  "<title>Hardware dispatch — Brandon Delgado</title>",
  'rel="canonical" href="https://brandon-delgado.com/proof/hardware-dispatch"',
  "350%",
  "Redis",
  "Software that touches the physical world has to respect it.",
]) {
  if (!dispatch.includes(snippet)) {
    throw new Error(`Dispatch HTML is missing ${snippet}`);
  }
}

console.log(`Prerendered ${pages.length} routes`);

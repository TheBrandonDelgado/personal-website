// Inject a static render into dist/index.html so crawlers and link unfurlers
// see the page without executing JavaScript. The browser hydrates that HTML.
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();
if (typeof appHtml !== "string" || !appHtml.includes("Brandon Delgado")) {
  throw new Error("Prerender did not return the page content");
}

writeFileSync(templatePath, template.replace(marker, `<div id="root">${appHtml}</div>`));
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
];

for (const rel of required) {
  if (!existsSync(resolve(root, rel))) {
    throw new Error(`Published file missing from the build: ${rel}`);
  }
}

console.log("Prerendered dist/index.html");

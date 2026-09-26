import { canonicalFor, pageByPath, SITE, type PublishedPage } from "./data/pages";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType: PublishedPage["ogType"];
}

export function pageMeta(input: string): PageMeta {
  const page = pageByPath(input);
  return {
    path: page.path,
    title: page.title,
    description: page.description,
    canonical: canonicalFor(page.path),
    ogType: page.ogType,
  };
}

export function webPageJson(meta: PageMeta): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    url: meta.canonical,
    description: meta.description,
    isPartOf: {
      "@type": "WebSite",
      name: "Brandon Delgado",
      url: SITE,
    },
    about: {
      "@type": "Person",
      name: "Brandon Delgado",
      url: SITE,
    },
  };
}

function setContent(key: string, value: string): void {
  const element = document.querySelector(`meta[data-seo="${key}"]`);
  element?.setAttribute("content", value);
}

/** Keep the document head in step with client-side route changes. */
export function applyDocumentMeta(meta: PageMeta): void {
  document.title = meta.title;
  setContent("description", meta.description);
  setContent("og:url", meta.canonical);
  setContent("og:title", meta.title);
  setContent("og:description", meta.description);
  setContent("og:type", meta.ogType);
  setContent("twitter:url", meta.canonical);
  setContent("twitter:title", meta.title);
  setContent("twitter:description", meta.description);
  document.querySelector(`link[data-seo="canonical"]`)?.setAttribute("href", meta.canonical);
  const script = document.getElementById("page-jsonld");
  if (script) {
    script.textContent = JSON.stringify(webPageJson(meta));
  }
}

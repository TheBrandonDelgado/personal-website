import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.tsx";
import { publishedPages } from "./data/pages.ts";
import { pageMeta, webPageJson, type PageMeta } from "./seo.ts";

export interface RenderedPage {
  html: string;
  meta: PageMeta;
  jsonLd: Record<string, unknown>;
}

/** Static HTML for one route. The client hydrates the same tree. */
export function render(url: string): RenderedPage {
  const meta = pageMeta(url);
  const html = renderToString(
    <StrictMode>
      <App initialPath={url} />
    </StrictMode>,
  );
  return { html, meta, jsonLd: webPageJson(meta) };
}

export { publishedPages };

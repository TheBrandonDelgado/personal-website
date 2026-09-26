import { useEffect, useState } from "react";
import { normalizePath, resolvePath } from "../data/pages";
import { applyDocumentMeta, pageMeta } from "../seo";

function scrollToHashOrTop(): void {
  const hash = window.location.hash;
  if (hash.length > 1) {
    document.getElementById(hash.slice(1))?.scrollIntoView();
    return;
  }
  try {
    window.scrollTo(0, 0);
  } catch {
    // jsdom does not implement scrolling.
  }
}

/**
 * Path sourced from the server render, then kept in sync with the address bar.
 * Unknown paths stay on the home document so the Netlify fallback hydrates.
 */
export function useRoute(initialPath: string): string {
  const [path, setPath] = useState(() => resolvePath(initialPath));

  useEffect(() => {
    const onPop = (): void => {
      setPath(resolvePath(window.location.pathname));
    };

    const onClick = (event: MouseEvent): void => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      const normalized = normalizePath(url.pathname);
      const next = resolvePath(url.pathname);
      if (next !== normalized) return;

      event.preventDefault();
      const dest = `${url.pathname}${url.search}${url.hash}`;
      const current = resolvePath(window.location.pathname);
      window.history.pushState(null, "", dest);
      if (next === current) {
        scrollToHashOrTop();
        return;
      }
      setPath(next);
    };

    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    applyDocumentMeta(pageMeta(path));
    scrollToHashOrTop();
  }, [path]);

  return path;
}

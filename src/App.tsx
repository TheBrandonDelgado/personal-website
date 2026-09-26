import { subpageByPath } from "./data/pages";
import { useRoute } from "./hooks/useRoute";
import { SiteHeader } from "./components/Chrome";
import HomePage from "./components/HomePage";
import ProofPage from "./components/ProofPage";

export default function App({ initialPath = "/" }: { initialPath?: string }) {
  const path = useRoute(initialPath);
  const subpage = path === "/" ? undefined : subpageByPath(path);

  return (
    <div data-page={path} className="min-h-screen bg-stage font-sans text-ink">
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <div className="vignette" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      <main id="content">
        {subpage ? <ProofPage page={subpage} /> : <HomePage />}
      </main>
    </div>
  );
}

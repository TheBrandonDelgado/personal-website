# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **Bun** as its package manager and script runner (`bun.lock` is the committed lockfile; there is no `package-lock.json`).

```bash
bun install        # Install dependencies (use --frozen-lockfile in CI)
bun run dev        # Start Vite dev server (port 3000, strict) with hot reload
bun run build      # Type-check (tsc -b) then production build (vite build -> dist/)
bun run preview    # Preview the production build locally (port 3000)
bun run test       # Run the test suite once (vitest run)
bun run typecheck  # Type-check only (tsc --noEmit)
```

Run scripts with `bun run <script>`. Note `bun run test` runs Vitest (our `test` script); plain `bun test` would invoke Bun's own native runner instead — not what we want. No lint command. TypeScript runs in strict mode; treat `tsc --noEmit` as the gate.

## Architecture

**Vite + React 19 + TypeScript (strict)** multi-route site. Tailwind CSS via PostCSS handles styling. The Vite entry is `src/main.tsx`, which hydrates `App` in `React.StrictMode` and imports `src/index.css`. `src/entry-server.tsx` prerenders each route into its own HTML file during `bun run build`. The HTML shell is the root `index.html`, which carries favicons, the canonical tag, Open Graph / Twitter meta, Person and WebSite JSON-LD, and preloads for the self-hosted fonts.

**Content is centralized in `src/data/data.ts` and `src/data/pages.ts`.** Portfolio projects, work experience, and social links live in `data.ts`. The six principles, their proof pages, and document titles live in `pages.ts`. Edit those files rather than hard-coding new claims in components.

### Component Structure

- `src/App.tsx` — route shell. Home is the manifesto; every other published path renders a proof page. There is NO dark-mode toggle.
- `src/components/HomePage.tsx` — hero, six full-screen principle scenes, and the signature close.
- `src/components/ProofPage.tsx` — prerendered proof and earlier-work pages. Hardware dispatch includes the SVG diagram.
- `src/components/Chrome.tsx` — fixed header, resume link, and contact row.
- `src/hooks/useRoute.ts` — client navigations for known routes. Unknown paths keep the home document so the Netlify fallback hydrates.

Scroll motion is CSS only and never parks text at opacity 0. Reduced motion skips it. GSAP remains installed but is not used on the page.

### Styling Conventions

- **Tailwind utility classes** for layout and responsive design.
- **`src/App.css`** holds the ember horizon, grain, vignette, headline light sweep, and the reduced-motion rules.
- **`src/index.css`** holds Tailwind and the self-hosted `@font-face` rules (Instrument Serif, Inter Tight, JetBrains Mono, Mrs Saint Delafield). Font files live in `public/fonts/`.
- **`tailwind.config.js`** extends the theme with the manifesto palette (`stage`, `ink`, `ember`, `glow`) and the self-hosted font families. It sets `darkMode: "class"`, but this is inert — the app never toggles a `dark` class and uses no `dark:` utilities.
- **`postcss.config.js`** runs `tailwindcss` + `autoprefixer`.

### Assets

`public/` is served at the web root: favicons, `og.jpg`, `avatar.jpg`, `sitemap.xml`, `robots.txt`, the resume PDF, and `fonts/`. Proof routes are also written into `dist/` by the prerender step and listed in the sitemap.

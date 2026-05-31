# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (port 3000, strict) with hot reload
npm run build      # Type-check (tsc -b) then production build (vite build -> dist/)
npm run preview    # Preview the production build locally (port 3000)
npm test           # Run the test suite once (vitest run)
npm run typecheck  # Type-check only (tsc --noEmit)
```

No lint command. TypeScript runs in strict mode; treat `tsc --noEmit` as the gate.

## Architecture

**Vite + React 19 + TypeScript (strict)** single-page app. Tailwind CSS via PostCSS handles styling. The Vite entry is `src/main.tsx`, which renders `App` in `React.StrictMode` and imports `src/index.css`. The HTML shell is the root `index.html` (Vite convention), which loads `/src/main.tsx` as a module and includes the favicon, Open Graph / Twitter meta, and the Inter Google Font link.

**Content is centralized in `src/data/data.ts`** — all portfolio projects, work experience entries, and social links live there, typed against the interfaces in `src/types/content.ts` (`SocialLink`, `Project`, `ProjectTechnology`, `ExperienceEntry`). Edit `data.ts` to update portfolio/experience/social content. (The hero strings and the About paragraphs are intentionally kept inline in `App.tsx`.)

### Component Structure

- `src/App.tsx` — root component. Lazy-loads `Starfield` inside `Suspense`; a `canvasReady` state toggles a CSS fallback radial-gradient background until the canvas paints. Uses `useScrollReveal` for the About, Portfolio, and Experience sections. Renders `ScrollProgress`, the hero (avatar, animated gradient name, subtitle, tagline, `Links` row), three About paragraphs, `Portfolio`, and `WorkExperience`. There is NO footer and NO dark-mode toggle.
- `src/components/Links.tsx` — social link bar; each link has a GSAP magnetic-hover effect (fine-pointer only).
- `src/components/Portfolio.tsx` — project grid cards with a GSAP 3D tilt on hover (fine-pointer only) and FontAwesome technology icons.
- `src/components/WorkExperience.tsx` — timeline of job history (separate desktop/mobile layouts), FontAwesome external-link icon, and technology chips.
- `src/components/Starfield.tsx` — Canvas 2D animated starfield with three depth layers (far/mid/near), gravitational cursor interaction, drift, and twinkle; handles reduced-motion and mobile; calls an `onReady` callback when the first frame paints.
- `src/components/ScrollProgress.tsx` — GSAP ScrollTrigger-driven scroll progress bar.
- `src/hooks/useScrollReveal.ts` — GSAP + ScrollTrigger reveal hook with optional stagger; returns a ref to attach to a section.

`Portfolio`, `Links`, and `WorkExperience` are memoized and receive their data by importing it directly from `src/data/data.ts`.

### Styling Conventions

- **Tailwind utility classes** for layout and responsive design.
- **`src/App.css`** holds design tokens (CSS custom properties), the `.glass-panel` system, `.scroll-progress`, smooth scroll, hidden scrollbars, keyframes (`gradient-shift`, `pulse-glow`), the reduced-motion block, gold focus outline, and gold `::selection`. It also `@import`s the Inter and JetBrains Mono Google Fonts.
- **`tailwind.config.js`** extends the theme with a space/golden color palette, gradient backgrounds, custom glow shadows, animations (`pulse-glow`, `gradient-shift`), Inter/JetBrains Mono font families, and radius tokens. It sets `darkMode: "class"`, but this is inert — the app never toggles a `dark` class and uses no `dark:` utilities.
- **`postcss.config.js`** runs `tailwindcss` + `autoprefixer`.

### Assets

Images are in `src/assets/` and imported directly (Vite resolves them to URLs). `public/` (Avatar.ico, manifest.json, robots.txt) is served at the web root.

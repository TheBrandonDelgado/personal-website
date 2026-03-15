# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Start dev server with hot reload
npm run build    # Production build
npm test         # Run tests (watch mode)
```

No lint command — uses the default ESLint config from `react-app` preset (enforced by react-scripts).

## Architecture

**Create React App** (not ejected) — Webpack/Babel config is hidden behind `react-scripts`. Tailwind CSS with PostCSS handles styling.

**Content is centralized in `src/data/data.js`** — all portfolio projects, work experience entries, and social links live there. This is the primary file to edit when updating content.

### Component Structure

- `App.js` — root component; handles dark/light mode toggle (persisted in `localStorage`), renders all sections (hero, about, portfolio, experience)
- `src/components/links.js` — social media link bar
- `src/components/Portfolio.js` — project grid cards
- `src/components/workExperience.js` — timeline of job history

All three components are memoized. They receive their data as props from `App.js`.

### Styling Conventions

- **Tailwind utility classes** for layout and responsive design; dark mode enabled via `class` strategy
- **`App.css`** for custom scrollbar and light mode CSS variable overrides
- **`tailwind.config.js`** extends the default theme with space/golden color palette, custom glow shadows, and animations (`pulse-glow`, `twinkle`, `fade-in-up`, `gradient-shift`)
- Dark mode toggling works by adding/removing the `dark` class on `document.documentElement`

### Assets

Images are in `src/assets/`. Project screenshot images used in portfolio cards are referenced from `data.js`.

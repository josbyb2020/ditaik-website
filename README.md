# Ditaik

**Data & AI freelance platform.** Corporate site for Ditaik — connecting businesses with specialized freelancers in data engineering and artificial intelligence.

- **Stack:** [Astro](https://astro.build/) v5, [Tailwind CSS](https://tailwindcss.com/) v3, [React](https://react.dev/) (islands), [Framer Motion](https://www.framer.com/motion/)
- **Content:** French; static generation with View Transitions
- **Theme:** Class-based dark mode, OS preference, localStorage persistence

---

## Table of contents

- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Configuration](#configuration)
- [Theme system](#theme-system)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License & contact](#license--contact)

---

## Quick start

```bash
git clone https://github.com/josbyb2020/ditaik-website.git
cd ditaik-website
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321). Production build:

```bash
npm run build
npm run preview
```

| Script     | Command        | Purpose                    |
|-----------|----------------|----------------------------|
| `dev`     | `astro dev`    | Dev server, hot reload     |
| `build`   | `astro build`  | Output to `dist/`          |
| `preview` | `astro preview`| Serve `dist/` locally       |

---

## Project structure

```
ditaik-website/
├── public/                 # Static assets (copied as-is)
│   └── assets/
│       ├── favicon_io/      # Favicons (ico, 16, 32, 180, 192, 512, manifest)
│       └── favicon.png     # Optional fallback
├── src/
│   ├── components/
│   │   ├── react/          # React islands (HeroAnimation, SpotlightCard)
│   │   └── TechTicker.astro
│   ├── layouts/
│   │   └── Layout.astro    # Shell: nav, footer, theme toggle, skip link, mobile menu
│   ├── pages/              # File-based routes
│   │   ├── index.astro     # /
│   │   ├── services.astro  # /services
│   │   ├── freelance.astro # /freelance
│   │   ├── about.astro     # /about
│   │   └── contact.astro   # /contact
│   └── styles/
│       └── global.css      # Tailwind, focus, skip link, reduced motion
├── docs/
│   ├── README.md           # Documentation index
│   └── ui-architecture-review.md  # Design system and accessibility
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## Configuration

- **Astro:** `astro.config.mjs` — React integration, Tailwind, View Transitions
- **Tailwind:** `tailwind.config.mjs` — `darkMode: 'class'`, custom colors (`electric`, `slate`), Inter Tight font
- **Environment:** No required env vars for build; optional `.env` for future server/API use

Design tokens (brand):

| Token        | Value        | Usage              |
|-------------|--------------|--------------------|
| Primary     | `#FF4400`    | Accent, CTAs, focus|
| Background  | `slate-100` / `slate-950` | Light / dark       |
| Font        | Inter Tight  | Body, headings     |

---

## Theme system

Dark mode is class-based and applied on `<html>`:

1. **Initial load:** Inline script in `<head>` runs before paint; reads `localStorage.theme` or `prefers-color-scheme` (no flash).
2. **Toggle:** Navbar button (desktop + mobile menu) toggles `dark` class and writes `localStorage.theme`.
3. **OS sync:** `matchMedia('prefers-color-scheme')` updates theme when the user has no stored preference.

All UI uses Tailwind `dark:` variants; `global.css` sets CSS variables for body background/foreground.

---

## Deployment

Build output is static in `dist/`. Deploy that folder to any static host:

- **Vercel / Netlify / Cloudflare Pages:** Connect repo; build command `npm run build`, output `dist/`
- **Custom:** Upload `dist/` to your server; ensure redirects for SPA-like routes if needed (e.g. `/*` → `index.html` for client-side routing; Astro default is static HTML per route, so no special redirects required)

---

## Documentation

Detailed project docs live in [`docs/`](docs/):

| Document | Description |
|----------|-------------|
| [Documentation index](docs/README.md) | Overview of all docs |
| [Design system and accessibility](docs/ui-architecture-review.md) | Design tokens, a11y conventions, component overview |

For version history and release notes, see [CHANGELOG.md](CHANGELOG.md) and [VERSIONING.md](VERSIONING.md).

---

## License & contact

- **License:** © 2026 Ditaik. All rights reserved.
- **Email:** contact@ditaik.org  
- **Location:** Paris, France

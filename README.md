# Ditaik — L'excellence data et IA

A modern platform connecting businesses with specialized freelancers in Data and Artificial Intelligence.

## Tech Stack

- **Framework**: [Astro v5](https://astro.build/) — Static site generation with islands architecture
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) — Utility-first CSS with dark mode support
- **Animations**: [Framer Motion](https://www.framer.com/motion/) — React-based animations
- **Theme**: Class-based dark mode with OS preference detection and localStorage persistence

## Features

- 🌓 **Light/Dark Theme** — Respects OS preference with manual toggle
- ⚡ **SPA-like Navigation** — ViewTransitions for smooth page transitions
- 📱 **Fully Responsive** — Mobile-first design with glassmorphism menu
- 🎨 **Premium Design** — Gradient backgrounds, spotlight effects, ambient glows

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── public/
│   └── assets/
│       ├── favicon.png          # Optional fallback
│       └── favicon_io/          # Canonical set (ico, 16, 32, 180, 192, 512, manifest)
├── src/
│   ├── components/
│   │   ├── react/               # React islands (HeroAnimation, SpotlightCard)
│   │   └── TechTicker.astro     # Scrolling tech strip
│   ├── layouts/
│   │   └── Layout.astro         # Main layout (nav, footer, theme, skip link)
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── services.astro       # Services page
│   │   ├── about.astro          # About page
│   │   ├── contact.astro        # Contact page
│   │   └── freelance.astro      # Freelance sign-up (Google Form)
│   └── styles/
│       └── global.css           # Tailwind + focus + reduced-motion
├── docs/
│   └── UI-ARCHITECTURE-REVIEW.md  # Design and a11y review
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Branding

| Element | Value |
|---------|-------|
| Primary Font | Inter Tight |
| Background (Light) | `#ffffff` |
| Background (Dark) | `slate-950` (#020617) |
| Accent Color | `#FF4400` (electric-500) |
| Text Dark | `slate-900` |
| Text Light | `slate-100` |

## Theme System

The site uses class-based dark mode (`darkMode: 'class'` in Tailwind config):

1. **Initial load**: Inline script applies theme before render (no flash)
2. **OS sync**: Listens to `prefers-color-scheme` changes in real-time
3. **Manual toggle**: Sun/moon button in navbar
4. **Persistence**: Preference saved to `localStorage`

## Documentation

- **Design and accessibility**: See [docs/UI-ARCHITECTURE-REVIEW.md](docs/UI-ARCHITECTURE-REVIEW.md) for the latest UI and a11y review.

## Deployment

The site builds to static HTML in `/dist` and can be deployed to any static host:

```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, Cloudflare Pages, or any static host.

## License

© 2026 Ditaik. All rights reserved.

## Contact

- **Email**: contact@ditaik.org
- **Location**: Paris, France

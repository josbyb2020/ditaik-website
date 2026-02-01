# Design system and accessibility

Reference for the Ditaik Astro frontend: design tokens, accessibility conventions, and component overview.

---

## Design system

**Stack:** Tailwind (electric-500, slate-*, spacing scale) and CSS variables in `global.css` for body background/foreground.

| Token | Value | Usage |
|-------|--------|--------|
| Primary | `#FF4400` (electric-500) | Accent, CTAs, focus outline |
| Typography | Inter Tight | Applied in Tailwind config and `global.css` |
| Spacing | Tailwind scale (e.g. px-6, py-8, gap-12) | Layout and components |
| Motion | `transition-colors`, `transition-transform`, `duration-300` | Transitions and animations; respects `prefers-reduced-motion` in `global.css` |

Colors use electric-500 and slate-* consistently. No custom tokens outside this set.

---

## Accessibility

**Focus:** Global `:focus-visible` in `global.css` (2px solid #FF4400, 2px offset) for links and buttons.

**Skip link:** "Aller au contenu principal" in Layout, targets `#main-content`; styled as `.skip-link` in `global.css`. `<main>` has `id="main-content"` and `tabindex="-1"`.

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` in `global.css` shortens animations and transitions.

**ARIA:** Theme toggle `aria-label="Changer le thème"`. Mobile menu button: `aria-expanded`, `aria-controls`, `aria-label="Ouvrir le menu"`. Menu overlay: `role="dialog"`, `aria-label="Menu de navigation"`; state updated on open/close and on link click.

**Semantic HTML:** One h1 per page; `<nav>`, `<main>`, `<footer>`, `<section>` and heading hierarchy used correctly.

**External links:** LinkedIn uses `rel="noopener noreferrer"`. Freelance form iframe has `title="Formulaire d'inscription freelance"`.

---

## UI flow

```
Home → [Découvrir l'expertise] → /services
     → [Nous contacter]         → /contact

Nav (desktop/mobile): Accueil | Services | Freelances | À propos | Contact
Theme toggle: dark/light; persisted in localStorage
Mobile menu: open (aria-expanded=true) → close on link click or after navigation

Contact: mailto:, tel:, LinkedIn (external)
Freelance: Google Form iframe (title set)
```

---

## Responsive layout

- Breakpoints: `md:` (768px), `lg:` (1024px) for nav, grids, typography.
- Mobile: Hamburger menu, full-screen overlay, stacked CTAs.
- Layout: `max-w-7xl`, `container mx-auto px-6` across pages.

---

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Layout.astro | src/layouts/ | Shell: skip link, nav (desktop + mobile), theme toggle, footer, `<main id="main-content">` |
| index.astro | src/pages/ | Home: hero, TechTicker, SpotlightCard bento (4 cards) |
| services.astro | src/pages/ | Services grid and process steps (3 étapes) |
| about.astro | src/pages/ | About: stats, mission, values, CTA |
| contact.astro | src/pages/ | Contact: email, phone, location, LinkedIn, freelance CTA |
| freelance.astro | src/pages/ | Freelance: benefits, Google Form iframe |
| HeroAnimation.jsx | src/components/react/ | Framer Motion: central glow and floating dots |
| SpotlightCard.jsx | src/components/react/ | Mouse/focus spotlight gradient on card |
| TechTicker.astro | src/components/ | Infinite scroll strip of tech names; hover pauses |
| global.css | src/styles/ | Tailwind base, CSS vars, focus, skip-link, reduced-motion |

Interactive elements (nav, CTAs, theme toggle, mobile menu, SpotlightCard, TechTicker) have default, hover, and focus states where applicable; focus uses the global `:focus-visible` outline.

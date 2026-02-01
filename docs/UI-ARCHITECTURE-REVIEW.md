# UI Architecture Review — Ditaik (Astro Frontend)

**Date:** 2026  
**Scope:** Astro + Tailwind frontend (src/, Layout, pages, components)  
**Method:** UI Architect Agent + UI Review Command (Claude Code / Anthropic frontend guidelines)

---

## Summary

The Ditaik Astro site has a clear design system (electric orange, slate palette, Inter Tight), consistent light/dark mode, and solid French copy. A few accessibility and motion-preference gaps were fixed. Remaining items are optional polish.

---

## Critical Issues

*None.* No blocking functionality or major a11y violations.

---

## High Priority (Fixed in This Pass)

| Issue | Location | Fix Applied |
|-------|----------|-------------|
| No visible focus for keyboard users | Global (links, buttons) | Added `a:focus-visible, button:focus-visible { outline: 2px solid #FF4400; outline-offset: 2px; }` in `global.css` |
| No skip-to-content link | Layout | Added skip link "Aller au contenu principal" targeting `#main-content`; styled in `global.css` (`.skip-link`) |
| Main content not focusable for skip target | Layout | Added `id="main-content"` and `tabindex="-1"` on `<main>` |
| Reduced motion not respected | Global (TechTicker, HeroAnimation, SpotlightCard) | Added `@media (prefers-reduced-motion: reduce)` in `global.css` to shorten animations/transitions |

---

## Medium Priority (Addressed or Optional)

| Issue | Location | Status / Recommendation |
|-------|----------|-------------------------|
| Footer nav missing Freelances | Layout.astro | **Fixed earlier** — Freelances link added to footer |
| Mobile menu ARIA | Layout.astro | **Fixed earlier** — `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-label`; state updated on open/close and on link click |
| Focus trap in mobile menu | Layout.astro | Optional: when menu is open, trap focus inside dialog (e.g. focus first link, Tab cycles within menu). Improves a11y but not required for launch |

---

## Low Priority / Suggestions

| Item | Suggestion |
|------|------------|
| Theme toggle focus | Already covered by global `button:focus-visible`; optional: add `focus-visible:ring-2 focus-visible:ring-electric-500` for stronger emphasis |
| CTA buttons | Optional: add `focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2` to primary CTAs for consistency with brand |
| TechTicker | Pause on hover is good; reduced-motion already handled globally |
| Performance | Consider `font-display: swap` in Google Fonts URL; preload favicon if needed |

---

## UI Flow Map

```
Home → [Découvrir l'expertise] → /services
     → [Nous contacter]         → /contact

Nav (desktop/mobile) → Accueil | Services | Freelances | À propos | Contact
Theme toggle         → Toggle dark/light; persisted in localStorage
Mobile menu          → Open (aria-expanded=true) → Click link or after-swap → Close (aria-expanded=false)

Contact → mailto:, tel:, LinkedIn (external, noopener noreferrer)
Freelance → Google Form iframe (title set)
```

---

## Design Token Compliance

- **Stack:** Tailwind (electric-500, slate-*, spacing scale) + CSS variables in `global.css` for body background/foreground.
- **Colors:** electric-500 (#FF4400) used consistently for accent, CTAs, focus outline.
- **Typography:** Inter Tight (sans) applied in Tailwind config and global.css.
- **Spacing:** Tailwind scale (e.g. px-6, py-8, gap-12) used consistently.
- **Motion:** `transition-colors`, `transition-transform`, `duration-300`; infinite-scroll and card effects; now respect `prefers-reduced-motion`.

No violations; design tokens are used consistently.

---

## Responsive Check

- Breakpoints: `md:` (768px), `lg:` (1024px) used for nav, grids, typography.
- Mobile: Hamburger menu, full-screen overlay, stacked CTAs.
- Layout: `max-w-7xl`, `container mx-auto px-6` consistent across pages.

---

## State Coverage (Interactive Elements)

| Element | Default | Hover | Focus | Active | Notes |
|---------|---------|-------|--------|--------|-------|
| Nav links | Yes | Yes (text color) | Yes (global outline) | — | OK |
| CTA (primary) | Yes | Yes (shadow-glow) | Yes (global) | — | OK |
| CTA (secondary) | Yes | Yes (bg change) | Yes (global) | — | OK |
| Theme toggle | Yes | Yes (bg) | Yes (global) | — | OK |
| Mobile menu btn | Yes | — | Yes (global) | — | OK |
| SpotlightCard | Yes | Yes (border, gradient) | — | — | Focus on card not required |
| TechTicker | Yes | Pause animation | — | — | OK |

Loading/error/empty: N/A for current static content; forms (e.g. Google Form iframe) are external.

---

## Accessibility Quick Check

- **Semantic HTML:** `<nav>`, `<main>`, `<footer>`, `<section>`, headings (h1/h2/h3) used correctly; one h1 per page.
- **ARIA:** Theme toggle `aria-label="Changer le thème"`; mobile menu button `aria-expanded`, `aria-controls`, `aria-label="Ouvrir le menu"`; dialog `role="dialog"` and `aria-label="Menu de navigation"`.
- **Focus:** Visible focus via global `:focus-visible`; skip link and `#main-content` in place.
- **Motion:** `prefers-reduced-motion` respected in global.css.
- **External link:** LinkedIn has `rel="noopener noreferrer"`.
- **iframe:** Freelance form has `title="Formulaire d'inscription freelance"`.

---

## Recommendations

1. **Done:** Focus visibility, skip link, main id/tabindex, reduced motion.
2. **Optional:** Focus trap in mobile menu for stricter a11y.
3. **Optional:** Add `focus-visible:ring-2 focus-visible:ring-electric-500` to primary buttons if you want a stronger focus style than the global outline.
4. **Optional:** Run Lighthouse (Performance, Accessibility) after deploy and fix any new findings.

---

## Next Steps

- Run `/a11y-review` (or pa11y) for a deeper accessibility audit if needed.
- Run Lighthouse on a production build for performance and a11y scores.
- Consider focus trap in mobile menu in a future iteration.

---

## Last pass – components (final review)

| Component | Location | Purpose | Status |
|-----------|---------|---------|--------|
| **Layout.astro** | `src/layouts/` | Shell: skip link, nav (desktop + mobile), theme toggle, footer, `<main id="main-content">` | OK – no temp or wrong content |
| **index.astro** | `src/pages/` | Home: hero, TechTicker, SpotlightCard bento (4 cards) | OK – French copy, correct imports |
| **services.astro** | `src/pages/` | Services grid + process steps (3 étapes) | OK – SpotlightCard, French |
| **about.astro** | `src/pages/` | About: stats, mission, values, CTA | OK – French |
| **contact.astro** | `src/pages/` | Contact: email, phone, location, LinkedIn, freelance CTA | OK – French, external link noopener |
| **freelance.astro** | `src/pages/` | Freelance: benefits, Google Form iframe (title set) | OK – French |
| **HeroAnimation.jsx** | `src/components/react/` | Framer Motion: central glow + 20 floating dots | OK – useEffect/useState, key={i} acceptable |
| **SpotlightCard.jsx** | `src/components/react/` | Mouse/focus spotlight gradient on card | OK – no tabIndex on wrapper (children receive focus) |
| **TechTicker.astro** | `src/components/` | Infinite scroll strip of tech names (text only) | OK – mask for fade edges, hover pauses |
| **global.css** | `src/styles/` | Tailwind base, CSS vars, focus, skip-link, reduced-motion | OK – no dead or temp rules |

**Temp / wrong files:** None in `src/`. `_archive/legacy-v1/` is intentional legacy; not temp. `.gitignore` already excludes `.astro/`, `dist/`, `*.tmp`, `*.temp`, `*.log`.

# Ditaik Website - Claude Code Memory

## Project Overview

Static HTML/CSS/JS website for Ditaik - a freelance platform specializing in Data and AI.

**Stack**: Vanilla HTML5 + CSS3 (with CSS Variables) + JavaScript (ES6+)
**No build tool** - files served directly

## Quick Commands

```bash
# Start local server (install first: npm install -g http-server)
http-server . -p 8080

# Optional linting (if installed)
npx htmlhint "*.html"
npx stylelint "css/**/*.css"
npx eslint "js/**/*.js"

# Optional accessibility audit (if installed)
npx pa11y http://localhost:8080/index.html
```

## Frontend Standards

### A) Design System (use existing tokens)

All new styles MUST use these CSS variables from `css/styles.css`:

| Token | Usage |
|-------|-------|
| `--primary`, `--primary-light`, `--primary-dark` | Brand colors |
| `--spacing-xs` to `--spacing-xl` | All spacing (0.5rem to 8rem) |
| `--border-radius-sm/md/lg` | Border radius (0.3/0.6/1.2rem) |
| `--shadow-sm/md/lg` | Box shadows |
| `--transition` | Standard animation (0.3s ease-in-out) |

**Typography**: Montserrat for headings, Open Sans for body.

### B) HTML Conventions

- Always include `lang="fr"` on `<html>`
- Include security meta tags (CSP, X-Frame-Options, etc.) - copy from index.html
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`
- Include proper `aria-*` attributes for interactive elements
- All images need meaningful `alt` text

### C) Accessibility Baseline

- Keyboard navigable: all interactive elements focusable in logical order
- Visible focus states (default browser focus is acceptable)
- Sufficient color contrast (4.5:1 for normal text)
- Respect `prefers-reduced-motion` (already in reset.css)
- Links: descriptive text, not "click here"
- Form inputs: always have associated `<label>` elements

### D) JavaScript Conventions

- Use `const`/`let` (no `var`)
- Prefer event delegation for multiple similar elements
- Handle cases where elements may not exist (`if (element)`)
- No inline event handlers in HTML - use `addEventListener`
- Validate forms client-side but never trust client-side validation alone

### E) Security Rules

- Never use `innerHTML` with user input - use `textContent` or sanitize
- External links: always include `rel="noopener noreferrer"` and `target="_blank"`
- No sensitive data in JavaScript files
- Maintain existing CSP headers when adding pages

### F) File Organization

- New pages: copy structure from `index.html`
- Page-specific CSS: `css/[pagename].css`
- Page-specific JS: `js/[pagename].js`
- Assets: `assets/` folder

## Triggers - When to Run Which Command

| Change Type | Run Command |
|-------------|-------------|
| Any HTML/CSS/JS change | `/verify-ui` |
| UI component, styling, layout | `/ui-review` then `/ui-fix` if needed |
| Interactive elements (forms, menus, modals) | `/a11y-review` |
| JS changes, external links, forms | `/redteam` (security) |

## Security Triggers (run /redteam when)

- Adding/modifying JavaScript that handles user input
- Adding external links (`target="_blank"`)
- Adding forms or form handlers
- Adding external scripts/CDN resources
- Modifying CSP headers
- Any change to `js/*.js` files

## Review Rubrics

### UI Review Rubric
1. **Design Consistency** - Uses design tokens? Matches existing patterns?
2. **Responsive** - Works on mobile (576px), tablet (768px), desktop?
3. **States** - Loading, error, empty, success states handled?
4. **Interaction** - Hover, focus, active states defined?
5. **Maintainability** - Code is clear, follows existing patterns?

### Accessibility Rubric
1. **Keyboard** - Tab order logical? All actions keyboard-accessible?
2. **Focus** - Focus visible? Focus trapped in modals?
3. **Semantics** - Correct heading hierarchy? ARIA labels where needed?
4. **Content** - Alt text? Link text descriptive?
5. **Motion** - Animations respect reduced-motion preference?

### Performance Rubric
1. **Images** - Optimized? Lazy loaded? Correct format (SVG/WebP/PNG)?
2. **CSS** - Minimal, uses existing classes? No unused styles?
3. **JS** - No unnecessary DOM queries? Events cleaned up?
4. **Loading** - Critical CSS inline? Fonts preconnected?

### Security Rubric (Static Sites)
1. **XSS** - No innerHTML with user input? No eval()?
2. **Links** - External links have rel="noopener noreferrer"?
3. **CSP** - Content-Security-Policy headers present?
4. **Secrets** - No API keys/tokens in JS files?
5. **SRI** - CDN resources have integrity attribute?

## Learned Rules (add when patterns emerge)

<!-- Add 1-3 line rules here when recurring issues are found -->
- Mobile menu: always update `aria-expanded` on toggle
- Form validation: check `required` AND custom validation (email pattern)

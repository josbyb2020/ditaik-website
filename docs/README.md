# Documentation

Technical and product documentation for the Ditaik website.

---

## Contents

| Document | Description |
|----------|-------------|
| [Design system and accessibility](ui-architecture-review.md) | Design tokens, accessibility conventions, component overview. Reference for maintainers and contributors. |

---

## For maintainers

- **Adding a page:** Create `src/pages/<name>.astro`; use `Layout` and set `title` prop. Add nav link in `src/layouts/Layout.astro`.
- **Changing theme/brand:** Update `tailwind.config.mjs` (electric, slate) and `src/styles/global.css` (CSS variables, focus outline).
- **Accessibility:** Keep one h1 per page, set `aria-label` on icon buttons, use `:focus-visible` for keyboard users. See [ui-architecture-review.md](ui-architecture-review.md) for the full checklist.

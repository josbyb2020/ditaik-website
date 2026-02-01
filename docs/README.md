# Documentation

Technical and product documentation for the Ditaik website.

---

## Contents

| Document | Description |
|----------|-------------|
| **[UI & accessibility review](UI-ARCHITECTURE-REVIEW.md)** | UI architecture review: design system (colors, typography, spacing), accessibility (focus, skip link, ARIA, reduced motion), component checklist, and recommendations. Use for onboarding, audits, or before major UI changes. |

---

## For maintainers

- **Adding a page:** Create `src/pages/<name>.astro`; use `Layout` and set `title` prop. Add nav link in `src/layouts/Layout.astro`.
- **Changing theme/brand:** Update `tailwind.config.mjs` (electric, slate) and `src/styles/global.css` (CSS variables, focus outline).
- **Accessibility:** Keep one h1 per page, set `aria-label` on icon buttons, use `:focus-visible` for keyboard users. See [UI-ARCHITECTURE-REVIEW.md](UI-ARCHITECTURE-REVIEW.md) for the full checklist.

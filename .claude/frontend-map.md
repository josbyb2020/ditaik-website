# Frontend Project Map - Ditaik Website

Generated: 2026-01-10

## Stack Summary

| Category | Technology |
|----------|------------|
| **Type** | Static HTML/CSS/JS website |
| **Framework** | None (Vanilla) |
| **Build Tool** | None |
| **Package Manager** | npm (minimal config) |
| **Styling** | Custom CSS with CSS Variables (design tokens) |
| **Icons** | Font Awesome 6.4.0 (CDN) |
| **Fonts** | Google Fonts (Montserrat, Open Sans) |
| **Testing** | Not configured |
| **Linting** | Not configured |
| **E2E** | Not configured |

## UI Entrypoints / Pages / Routes

| Page | Path | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, features, CTA |
| About | `about.html` | Company info, mission types, values |
| Services | `services.html` | How it works for companies and freelancers |
| Pricing | `pricing.html` | Pricing structure |
| Freelance | `freelance.html` | Freelancer registration (Google Forms embed) |
| Contact | `contact.html` | Contact information |
| Privacy | `privacy.html` | Privacy policy |

## Component Organization

```
/
├── css/
│   ├── reset.css        # CSS reset + reduced-motion support
│   ├── styles.css       # Main styles + design tokens
│   ├── about.css        # Page-specific styles
│   ├── services.css
│   ├── contact.css
│   ├── freelance.css
│   ├── pricing.css
│   └── faq.css
├── js/
│   ├── script.js        # Main JS (nav, scroll, animations, form validation)
│   ├── about.js         # Page-specific scripts
│   ├── services.js
│   ├── contact.js
│   ├── freelance.js
│   ├── pricing.js
│   └── faq.js
└── assets/
    ├── logo.png
    ├── hero-image.svg
    └── favicon_io/      # Favicon variants
```

## Design Constraints (Inferred from CSS)

### Spacing Scale
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 2rem     /* 32px */
--spacing-lg: 4rem     /* 64px */
--spacing-xl: 8rem     /* 128px */
```

### Color Palette
```css
/* Primary */
--primary: #1a4fc0
--primary-light: #4f7ae5
--primary-dark: #0f3680

/* Neutral */
--white: #ffffff
--black: #000000
--text: #333333
--text-light: #666666
--gray-light: #f5f7fa
--gray: #e0e0e0

/* Semantic */
--success: #28a745
--danger: #dc3545
```

### Typography
- **Headings**: Montserrat (700 weight)
- **Body**: Open Sans (300-600 weights)
- **Base**: 62.5% (10px), 1rem = 10px scaling

### Border Radius
```css
--border-radius-sm: 0.3rem
--border-radius-md: 0.6rem
--border-radius-lg: 1.2rem
```

### Shadows
```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
```

## Interaction Constraints

### Responsive Breakpoints
- **Desktop**: > 991px
- **Tablet**: 768px - 991px
- **Mobile**: 576px - 768px
- **Small Mobile**: < 576px
- **Extra Small**: < 375px

### Animation / Motion
- Standard transition: `all 0.3s ease-in-out`
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`
- Hero image float animation (6s cycle)
- Scroll-triggered animations (fade-in, slide-in, zoom-in)

### Keyboard Navigation
- Mobile menu: hamburger toggle with aria-expanded
- Smooth scroll for anchor links
- Header scroll effect on 50px threshold

## Security Posture

Already implemented:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy (restricted geolocation, microphone, camera)

## High-Risk UI Surfaces

| Surface | Risk Level | Notes |
|---------|------------|-------|
| Contact Form | Medium | Form validation client-side only |
| Freelance Registration | Low | Delegates to Google Forms |
| External Links | Low | Has rel="noopener noreferrer" |

## Performance Considerations

- **No bundling**: All assets loaded individually
- **CDN dependencies**: Font Awesome, Google Fonts
- **Images**: SVG for hero, PNG for logo/favicons
- **CSS loaded synchronously**: Could block rendering
- **No lazy loading**: All content loads upfront

## Optional Tools (Not Installed)

To enhance the development workflow, consider installing:
- **Linting**: `htmlhint`, `stylelint`, `eslint`
- **Formatting**: `prettier`
- **Server**: `live-server` or `http-server` for local development
- **A11y**: `pa11y` for accessibility audits
- **Validation**: `html-validate` for HTML validation

Install via: `npm install --save-dev htmlhint stylelint eslint prettier html-validate pa11y`

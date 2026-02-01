# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-02-01

Major overhaul release.

### Added
- Complete site rewrite using Astro v5 framework
- Tailwind CSS v3 with class-based dark mode
- Framer Motion animations for React components
- Theme system with OS preference detection and localStorage persistence
- ViewTransitions for SPA-like page navigation
- Modern gradient backgrounds and spotlight effects
- Mobile glassmorphism menu overlay

### Changed
- **BREAKING**: Migrated from static HTML/CSS/JS to Astro-based architecture
- Updated favicon to match "Ditaik." branding (white D with orange dot)
- Converted headings to sentence case
- Replaced Font Awesome icons with typographic numbers (01, 02, 03...)
- Updated color palette for premium dark mode experience

### Removed
- Legacy HTML pages (archived to `_archive/legacy-v1/`)
- Legacy CSS files (archived to `_archive/legacy-v1/`)
- Legacy JavaScript files (archived to `_archive/legacy-v1/`)
- Font Awesome CDN dependency

---

## [2.0.0] - 2026-01-11

(Pre-release; 3.0.0 is the shipped major overhaul.)

---

## [1.2.0] - 2025-01-XX

### Added
- Security headers on all HTML pages (CSP, X-Frame-Options, X-Content-Type-Options)
- Frontend Fleet system for development and code review
- Claude agents for accessibility, security and UI audits

### Changed
- Externalized all inline scripts to external JavaScript files
- Externalized all inline styles to external CSS files

---

## [1.0.0] - 2025-03-05

### Added
- Initial version of Ditaik website
- Homepage, About, Services, Pricing, Freelance, Contact pages
- Google Forms integration for freelancer registration
- Responsive design for all devices

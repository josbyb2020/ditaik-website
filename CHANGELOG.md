# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-XX

### Added
- Security headers on all HTML pages
  - Content-Security-Policy (CSP)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
- New css/pricing.css file for pricing page styles
- New js/pricing.js file for pricing page functionality
- Security section in README.md
- Frontend Fleet system for development and code review
- Claude agents for accessibility, security and UI audits
- Automated verification scripts (a11y, lighthouse, UI)
- Modern design with advanced visual effects (View Transitions, 3D effects, grain texture)
- Improved UI consistency and accessibility

### Changed
- Externalized all inline scripts to external JavaScript files
- Externalized all inline styles to external CSS files
- Improved origin validation for cross-origin messages (postMessage)
- Moved animation styles from about.js to css/about.css
- Standardized CSP policies across all pages
- Updated README.md to remove emojis and document security improvements
- Updated project structure in README.md
- Added missing references to specific JavaScript files (about.js, services.js, freelance.js)

### Security
- Protection against XSS attacks via Content Security Policy
- Protection against clickjacking via X-Frame-Options
- Protection against MIME sniffing via X-Content-Type-Options
- Strict origin validation for iframe communications
- Complete separation of HTML, CSS and JavaScript

## [1.1.0] - 2025-03-XX

### Added
- Security improvements and externalization of scripts/styles

## [1.0.0] - 2025-03-05

### Added
- Initial version of Ditaik website
- Homepage (index.html)
- About page (about.html)
- Services page (services.html)
- Pricing page (pricing.html)
- Freelance page (freelance.html)
- Contact page (contact.html)
- Privacy policy page (privacy.html)
- Google Forms integration for freelancer registration
- Responsive design for all devices
- Modern animations and user interactions

### Changed
- Logo visibility improvements
  - Increased logo size (250px)
  - Added padding around the logo
  - Added hover effects
  - Smooth transition for better user experience

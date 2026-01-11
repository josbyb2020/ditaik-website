# Ditaik - Specialized Freelance Platform

Ditaik is a platform connecting businesses with specialized freelancers in Data and Artificial Intelligence.

## Current Version

**Version 1.2.0** - January 2025
For more details on changes, see [CHANGELOG](CHANGELOG.md).

## Recent Updates

- **January 2026**: Modern and professional design
  - New design with elegant gradients and visual effects
  - Smooth scroll animations (scroll reveal)
  - Cards with modern hover effects
  - Hero section with subtle gradient background
  - Buttons with gradients and shadow effects
  - Automated review system (Claude Code)

- **October 2025**: Security improvements
  - Added security headers (CSP, X-Frame-Options, X-Content-Type-Options)
  - Externalized all inline scripts and styles
  - Strict origin validation for cross-origin messages
  - Clean separation of HTML, CSS and JavaScript code

- **March 2025**: Logo visibility improvements
  - Increased logo size (250px)
  - Added padding around the logo
  - Added hover effects (slight size increase and drop shadow)
  - Smooth transition for better user experience

## Features

- Detailed presentation of matching services
- Contact form for businesses
- Freelancer registration via Google Forms
- Responsive design adapted to all devices
- Modern animations and user interactions
- Robust security headers to protect users

## Technologies Used

- HTML5
- CSS3 (with CSS variables for visual consistency)
- JavaScript (Vanilla JS)
- Google Forms (for freelancer registration)

## Project Structure

```
/
├── assets/               # Images and resources
│   ├── favicon_io/       # Favicon and icons
│   ├── logo.png          # Main logo
│   ├── favicon.png       # Main favicon
│   └── hero-image.svg    # Header image
├── css/                  # CSS files
│   ├── reset.css         # CSS reset
│   ├── styles.css        # Main styles
│   ├── about.css         # About page styles
│   ├── services.css      # Services page styles
│   ├── contact.css       # Contact page styles
│   ├── freelance.css     # Freelance page styles
│   ├── pricing.css       # Pricing page styles
│   └── faq.css           # FAQ page styles
├── js/                   # JavaScript files
│   ├── script.js         # Main script
│   ├── about.js          # About page script
│   ├── services.js       # Services page script
│   ├── freelance.js      # Freelance page script
│   ├── pricing.js        # Pricing page script
│   ├── faq.js            # FAQ page script
│   └── file-structure.txt # File structure documentation
├── index.html            # Homepage
├── about.html            # About page
├── services.html         # Services page
├── freelance.html        # Freelancer registration page
├── pricing.html          # Pricing page
└── contact.html          # Contact page
```

## Google Forms Integration

The site integrates a Google Forms form for freelancer registration. The form is embedded via an iframe on the `freelance.html` page.

## Responsiveness

The site is fully responsive and adapts to different screen sizes:
- Desktop computers (> 992px)
- Tablets (768px - 992px)
- Smartphones (576px - 768px)
- Small smartphones (< 576px)

## Color Palette

- Primary color: Royal blue (#1a4fc0)
- Secondary colors: White (#ffffff), Light gray (#f9f9f9), Dark gray (#333333)
- Accents: Light blue (#3a6edb), Orange (#ff7846)

## Security

The site implements several security measures:
- Content Security Policy (CSP) to prevent XSS attacks
- X-Frame-Options headers to protect against clickjacking
- X-Content-Type-Options headers to prevent MIME sniffing
- Strict origin validation for cross-origin communications
- Complete separation of HTML, CSS and JavaScript

## License

© 2025 Ditaik. All rights reserved.

## Contact

For any questions or suggestions regarding this project, please contact:
- Email: contact@ditaik.org
- Phone: +33 6 18 47 43 25

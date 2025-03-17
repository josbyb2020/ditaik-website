// Main JavaScript for Ditaik Website

// DOM Elements
const header = document.querySelector('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Détection iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

// Force l'affichage du menu hamburger sur iOS
if (isIOS && window.innerWidth <= 821) {
    if (navToggle) {
        navToggle.style.display = 'block';
        navToggle.style.position = 'absolute';
        navToggle.style.right = '20px';
        navToggle.style.top = '20px';
        navToggle.style.zIndex = '1001';
    }
}

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle avec conditions spéciales pour iOS
navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Force le style inline pour iOS
    if (isIOS && navMenu.classList.contains('active')) {
        navMenu.style.right = '0';
    } else if (isIOS) {
        navMenu.style.right = '-100%';
    }
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Force le style inline pour iOS
        if (isIOS) {
            navMenu.style.right = '-100%';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Force le style inline pour iOS
        if (isIOS) {
            navMenu.style.right = '-100%';
        }
    }
});

// Fonction de redimensionnement pour gérer les changements d'orientation
window.addEventListener('resize', () => {
    if (isIOS) {
        if (window.innerWidth > 821) {
            navToggle.style.display = 'none';
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.right = 'auto';
        } else {
            navToggle.style.display = 'block';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'fixed';
            if (!navMenu.classList.contains('active')) {
                navMenu.style.right = '-100%';
            }
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if(this.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animation on scroll for elements
const animateElements = () => {
    const elements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
            element.classList.add('visible');
        }
    });
};

// Initialize animations
window.addEventListener('load', animateElements);
window.addEventListener('scroll', animateElements);

// Form validation for contact form
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Simple validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.required && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    e.preventDefault(); // Prevent form submission only if validation fails
                } else if (input.type === 'email' && input.value.trim()) {
                    // Simple email validation
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                        e.preventDefault(); // Prevent form submission only if validation fails
                    } else {
                        input.classList.remove('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
            }
            // If validation passes, the form will submit normally to Formspree
        });
        
        // Remove error class on input when user types
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('error');
            });
        });
    }
});

// Add fade-in and slide-in classes to elements for animations
document.addEventListener('DOMContentLoaded', () => {
    // Services cards fade in
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Features fade in
    document.querySelectorAll('.feature').forEach((feature, index) => {
        feature.classList.add('fade-in');
        feature.style.animationDelay = `${0.1 * index}s`;
    });
    
    // Hero content slide in
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('slide-in');
    }
    
    // Hero image zoom in
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.classList.add('zoom-in');
    }
});

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', () => {
    const copyrightElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    
    copyrightElements.forEach(element => {
        element.textContent = element.textContent.replace(/\d{4}/, currentYear);
    });
});

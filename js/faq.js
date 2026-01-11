// JavaScript for FAQ Page

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Function to calculate and dynamically adjust height
    const adjustHeight = (element) => {
        // Reset styles first to get true height
        element.style.height = 'auto';
        element.style.maxHeight = 'none';
        element.style.overflow = 'visible';
        
        // Let browser recalculate dimensions
        window.getComputedStyle(element).getPropertyValue('height');
        
        // Check if element contains lists or tables
        const hasList = element.querySelector('ul, ol') !== null;
        const hasTable = element.querySelector('table') !== null;
        
        // Apply specific styles for complex content
        if (hasList || hasTable) {
            element.style.paddingBottom = '20px'; // Add more space at bottom
        }
    };
    
    // Function to initialize all FAQ items
    const initFaqItems = () => {
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            
            // Preload images if present
            const images = answer.querySelectorAll('img');
            if (images.length > 0) {
                images.forEach(img => {
                    if (!img.complete) {
                        img.onload = () => {
                            if (item.classList.contains('active')) {
                                adjustHeight(answer);
                            }
                        };
                    }
                });
            }
        });
    };
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Check if element is already active
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle active class on current element
            if (!isActive) {
                item.classList.add('active');
                // Dynamically adjust height
                adjustHeight(answer);
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Make first FAQ item active by default
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        if (firstAnswer) {
            adjustHeight(firstAnswer);
        }
    }

    // Adjust heights on window resize
    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                adjustHeight(answer);
            }
        });
    });

    // Initialize all FAQ items
    initFaqItems();

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}); 
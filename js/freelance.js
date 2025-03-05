// Freelance Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Form iframe responsive height adjustment
    const formIframe = document.querySelector('.form-container iframe');
    if (formIframe) {
        // Adjust iframe height based on screen size
        const adjustIframeHeight = () => {
            if (window.innerWidth < 768) {
                formIframe.style.height = '1000px';
            } else {
                formIframe.style.height = '800px';
            }
        };
        
        // Initial adjustment
        adjustIframeHeight();
        
        // Adjust on resize
        window.addEventListener('resize', adjustIframeHeight);
        
        // Message handling for iframe communication (if needed in the future)
        window.addEventListener('message', function(event) {
            // Check if the message is from Google Forms
            if (event.origin.includes('google.com')) {
                try {
                    const data = JSON.parse(event.data);
                    
                    // Handle form submission success
                    if (data.type === 'form-submit-success') {
                        // Show success message or redirect
                        console.log('Form submitted successfully');
                    }
                } catch (e) {
                    // Not a JSON message or other error
                    console.log('Message received but not processed');
                }
            }
        });
    }
    
    // Animation for benefits cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    const animateOnScroll = () => {
        benefitCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    benefitCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
}); 
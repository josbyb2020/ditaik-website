document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-item, .process-step, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add class for CSS animation
    const serviceItems = document.querySelectorAll('.service-item');
    const processSteps = document.querySelectorAll('.process-step');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    serviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        step.style.transitionDelay = `${index * 0.2}s`;
    });
    
    pricingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Function to animate elements
    const animateElements = function() {
        serviceItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
        
        setTimeout(() => {
            processSteps.forEach(step => {
                step.style.opacity = '1';
                step.style.transform = 'translateY(0)';
            });
        }, 500);
        
        setTimeout(() => {
            pricingCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, 1000);
    };
    
    // Execute animation after a short delay
    setTimeout(animateElements, 300);
    
    // Smooth scroll for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hover effect for feature cards
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Active navigation on scroll
    const sections = document.querySelectorAll('.services-main');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Initialize animations on load
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}); 
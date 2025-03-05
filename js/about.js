// About Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animate stats counter on scroll
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    // Function to animate counting
    function animateCounter(el, target) {
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
            count += increment;
            
            if (count >= target) {
                clearInterval(timer);
                el.textContent = target.toString().includes('+') ? target : target + '+';
            } else {
                el.textContent = Math.floor(count) + (target.toString().includes('+') ? '+' : '');
            }
        }, 16);
    }

    // Check if stats section is in viewport and animate
    function checkStatsVisibility() {
        if (animated) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
            animated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                stat.textContent = '0';
                animateCounter(stat, target);
            });
        }
    }

    // Run on scroll
    window.addEventListener('scroll', checkStatsVisibility);
    
    // Run once on page load
    checkStatsVisibility();

    // Team member hover effect
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
            member.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0)';
            member.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.story-content, .mission-card, .value-card, .team-member');
        
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (position < screenPosition) {
                el.classList.add('animate-in');
            }
        });
    };
    
    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .story-content, .mission-card, .value-card, .team-member {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    setTimeout(animateOnScroll, 300);
}); 
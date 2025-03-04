// JavaScript for FAQ Page

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Fonction pour calculer et ajuster dynamiquement la hauteur
    const adjustHeight = (element) => {
        // Réinitialiser d'abord les styles pour obtenir la vraie hauteur
        element.style.height = 'auto';
        element.style.maxHeight = 'none';
        element.style.overflow = 'visible';
        
        // Laisser le navigateur recalculer les dimensions
        window.getComputedStyle(element).getPropertyValue('height');
        
        // Vérifier si l'élément contient des listes ou des tableaux
        const hasList = element.querySelector('ul, ol') !== null;
        const hasTable = element.querySelector('table') !== null;
        
        // Appliquer des styles spécifiques pour les contenus complexes
        if (hasList || hasTable) {
            element.style.paddingBottom = '20px'; // Ajouter plus d'espace en bas
        }
    };
    
    // Fonction pour initialiser tous les éléments FAQ
    const initFaqItems = () => {
        faqItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            
            // Précharger les images si présentes
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
            // Vérifier si l'élément est déjà actif
            const isActive = item.classList.contains('active');
            
            // Fermer tous les autres éléments FAQ
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Basculer la classe active sur l'élément actuel
            if (!isActive) {
                item.classList.add('active');
                // Ajuster dynamiquement la hauteur
                adjustHeight(answer);
            } else {
                item.classList.remove('active');
            }
        });
    });

    // Rendre le premier élément FAQ actif par défaut
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        if (firstAnswer) {
            adjustHeight(firstAnswer);
        }
    }

    // Ajuster les hauteurs lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        faqItems.forEach(item => {
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                adjustHeight(answer);
            }
        });
    });

    // Initialiser tous les éléments FAQ
    initFaqItems();

    // Navigation toggle pour mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}); 
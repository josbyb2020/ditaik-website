# Changelog

Tous les changements notables de ce projet seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Versionnage Sémantique](https://semver.org/lang/fr/).

## [Non publié]

### Ajouté
- En-têtes de sécurité sur toutes les pages HTML
  - Content-Security-Policy (CSP)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
- Nouveau fichier css/pricing.css pour les styles de la page tarifs
- Nouveau fichier js/pricing.js pour les fonctionnalités de la page tarifs
- Section sécurité dans README.md

### Modifié
- Externalisation de tous les scripts inline vers des fichiers JavaScript externes
- Externalisation de tous les styles inline vers des fichiers CSS externes
- Amélioration de la validation des origines pour les messages cross-origin (postMessage)
- Déplacement des styles d'animation de about.js vers css/about.css
- Standardisation des politiques CSP à travers toutes les pages
- Mise à jour de README.md pour supprimer les emojis et documenter les améliorations de sécurité
- Mise à jour de la structure du projet dans README.md

### Sécurité
- Protection contre les attaques XSS via Content Security Policy
- Protection contre le clickjacking via X-Frame-Options
- Protection contre le MIME sniffing via X-Content-Type-Options
- Validation stricte des origines pour les communications iframe
- Séparation complète du HTML, CSS et JavaScript

## [1.0.0] - 2025-03-05

### Ajouté
- Version initiale du site web Ditaik
- Page d'accueil (index.html)
- Page À propos (about.html)
- Page Services (services.html)
- Page Tarifs (pricing.html)
- Page Freelances (freelance.html)
- Page Contact (contact.html)
- Page Politique de confidentialité (privacy.html)
- Intégration Google Forms pour l'inscription des freelances
- Design responsive pour tous les appareils
- Animations et interactions utilisateur modernes

### Modifié
- Amélioration de la visibilité du logo
  - Augmentation de la taille du logo (250px)
  - Ajout d'un padding autour du logo
  - Ajout d'effets de survol
  - Transition fluide pour une meilleure expérience utilisateur

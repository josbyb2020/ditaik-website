# Ditaik - Plateforme de Freelances Spécialisés

Ditaik est une plateforme de mise en relation entre entreprises et freelances spécialisés dans les domaines de la Data et de l'Intelligence Artificielle.

## Version actuelle

**Version 1.0.0** - Mars 2025
Pour plus de détails sur les changements, consultez le [CHANGELOG](CHANGELOG.md).

## Mises à jour récentes

- **Octobre 2025** : Améliorations de sécurité
  - Ajout d'en-têtes de sécurité (CSP, X-Frame-Options, X-Content-Type-Options)
  - Externalisation de tous les scripts et styles inline
  - Validation stricte des origines pour les messages cross-origin
  - Séparation propre du code HTML, CSS et JavaScript

- **Mars 2025** : Amélioration de la visibilité du logo
  - Augmentation de la taille du logo (250px)
  - Ajout d'un padding autour du logo
  - Ajout d'effets de survol (légère augmentation de taille et ombre portée)
  - Transition fluide pour une meilleure expérience utilisateur

## Fonctionnalités

- Présentation détaillée des services de mise en relation
- Formulaire de contact pour les entreprises
- Inscription des freelances via Google Forms
- Design responsive adapté à tous les appareils
- Animations et interactions utilisateur modernes
- En-têtes de sécurité robustes pour protéger les utilisateurs

## Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS pour la cohérence visuelle)
- JavaScript (Vanilla JS)
- Google Forms (pour l'inscription des freelances)

## Structure du Projet

```
/
├── assets/               # Images et ressources
│   ├── favicon_io/       # Favicon et icônes
│   ├── logo.png          # Logo principal
│   ├── favicon.png       # Favicon principal
│   └── hero-image.svg    # Image d'en-tête
├── css/                  # Fichiers CSS
│   ├── reset.css         # Reset CSS
│   ├── styles.css        # Styles principaux
│   ├── about.css         # Styles de la page à propos
│   ├── services.css      # Styles de la page services
│   ├── contact.css       # Styles de la page contact
│   ├── freelance.css     # Styles de la page freelance
│   └── pricing.css       # Styles de la page tarifs
├── js/                   # Fichiers JavaScript
│   ├── script.js         # Script principal
│   ├── about.js          # Script de la page à propos
│   ├── services.js       # Script de la page services
│   ├── contact.js        # Script de la page contact
│   ├── freelance.js      # Script de la page freelance
│   ├── pricing.js        # Script de la page tarifs
│   └── file-structure.js # Script pour la structure des fichiers
├── index.html            # Page d'accueil
├── about.html            # Page À propos
├── services.html         # Page Services
├── freelance.html        # Page d'inscription freelance
├── pricing.html          # Page Tarifs
└── contact.html          # Page Contact
```

## Intégration avec Google Forms

Le site intègre un formulaire Google Forms pour l'inscription des freelances. Le formulaire est intégré via une iframe dans la page `freelance.html`.

## Responsivité

Le site est entièrement responsive et s'adapte à différentes tailles d'écran :
- Ordinateurs de bureau (> 992px)
- Tablettes (768px - 992px)
- Smartphones (576px - 768px)
- Petits smartphones (< 576px)

## Palette de Couleurs

- Couleur principale : Bleu royal (#1a4fc0)
- Couleurs secondaires : Blanc (#ffffff), Gris clair (#f9f9f9), Gris foncé (#333333)
- Accents : Bleu clair (#3a6edb), Orange (#ff7846)

## Sécurité

Le site implémente plusieurs mesures de sécurité :
- Content Security Policy (CSP) pour prévenir les attaques XSS
- En-têtes X-Frame-Options pour protéger contre le clickjacking
- En-têtes X-Content-Type-Options pour empêcher le MIME sniffing
- Validation stricte des origines pour les communications cross-origin
- Séparation complète du HTML, CSS et JavaScript

## Licence

© 2025 Ditaik. Tous droits réservés.

## Contact

Pour toute question ou suggestion concernant ce projet, veuillez contacter :
- Email : contact@ditaik.org
- Téléphone : +33 6 18 47 43 25 
# Guide de Versionnage pour Ditaik

Ce document explique comment gérer les versions du site web Ditaik.

## Système de versionnage

Nous utilisons le versionnage sémantique (SemVer) sous le format : **MAJEUR.MINEUR.CORRECTIF**

- **MAJEUR** : changements incompatibles avec les versions précédentes
- **MINEUR** : ajout de fonctionnalités rétrocompatibles
- **CORRECTIF** : corrections de bugs rétrocompatibles

## Fichiers de versionnage

- **VERSION** : contient le numéro de version actuel
- **CHANGELOG.md** : documente tous les changements par version

## Processus pour une nouvelle version

1. **Mettre à jour le fichier VERSION** avec le nouveau numéro de version
2. **Mettre à jour CHANGELOG.md** avec les détails des changements
3. **Committer les changements** :
   ```
   git add VERSION CHANGELOG.md
   git commit -m "Préparation de la version X.Y.Z"
   ```
4. **Créer un tag** pour la nouvelle version :
   ```
   git tag -a vX.Y.Z -m "Version X.Y.Z - Description courte"
   ```
5. **Pousser les changements et le tag** :
   ```
   git push origin main
   git push origin vX.Y.Z
   ```

## Branches

- **main** : branche principale contenant la version de production
- Des branches de fonctionnalités peuvent être créées pour des développements spécifiques

## Historique

L'historique du dépôt a été nettoyé le 5 mars 2024, avec la version 1.0.0 comme point de départ propre. Toutes les versions ultérieures suivront ce système de versionnage. 
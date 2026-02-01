# Versioning Guide for Ditaik

This document explains how to manage versions of the Ditaik website.

## Versioning System

We use semantic versioning (SemVer) in the format: **MAJOR.MINOR.PATCH**

- **MAJOR**: Incompatible changes with previous versions
- **MINOR**: Addition of backward-compatible features
- **PATCH**: Backward-compatible bug fixes

## Versioning Files

- **VERSION**: Contains the current version number
- **CHANGELOG.md**: Documents all changes by version

## Process for a New Version

1. **Update the VERSION file** with the new version number
2. **Update CHANGELOG.md** with details of the changes
3. **Commit the changes**:
   ```
   git add VERSION CHANGELOG.md
   git commit -m "Prepare version X.Y.Z"
   ```
4. **Create a tag** for the new version:
   ```
   git tag -a vX.Y.Z -m "Version X.Y.Z - Short description"
   ```
5. **Push the changes and tag**:
   ```
   git push origin main
   git push origin vX.Y.Z
   ```

## Branches

- **main**: Main branch containing the production version
- Feature branches can be created for specific developments

## History

The repository history was cleaned on March 5, 2024, with version 1.0.0 as the clean starting point. Version 3.0.0 is the major overhaul (Astro/Tailwind migration). All subsequent versions follow this versioning system.

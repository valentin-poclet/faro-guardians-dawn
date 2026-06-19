# FARO V15 — Mobile Architecture Fix

## Correction principale

- La page Architecture ne prépare plus simultanément les six lecteurs vidéo 3D.
- Chaque vidéo est remplacée par une vignette légère jusqu'à ce que le visiteur appuie sur « Charger la vidéo 3D ».
- Aucun fichier MP4 n'est demandé avant cette action.
- Les photographies restent chargées progressivement avec le défilement.
- Une sécurité mobile révèle automatiquement les contenus Architecture après 700 ms si l'observateur de défilement du navigateur ne répond pas.

## Schéma d'architecture

- Suppression des quatre grosses pastilles 1, 2, 3 et 4.
- Suppression complète du panneau explicatif noir sous l'image.
- Sur ordinateur, le schéma est affiché seul et en pleine largeur.
- Sur téléphone, il conserve une taille lisible et peut être parcouru horizontalement au doigt.
- Un appui sur l'image permet toujours de l'agrandir en plein écran.

## Déploiement

- Cache hors ligne renouvelé pour empêcher un téléphone de conserver l'ancienne page Architecture.

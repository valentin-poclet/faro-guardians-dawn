# FARO V8 — Control

## Nouveautés

- Centre de contrôle accessible avec le bouton flottant `FARO`.
- Raccourci clavier `Ctrl + K` sous Windows/Linux ou `Cmd + K` sous macOS.
- Raccourcis directs vers les cinq pages du site.
- Commande permettant de rejouer l'introduction immersive.
- Animation progressive des chiffres clés lors de leur apparition à l'écran.
- Transition légère entre les pages.
- Prise en charge de `prefers-reduced-motion` pour limiter les animations si nécessaire.
- Révélation progressive des sections, cartes et médias au fil du défilement sur toutes les pages.

## Fichiers principaux ajoutés

- `src/components/faro/CommandCenter.tsx`
- `src/components/faro/AnimatedMetric.tsx`

Les textes français et anglais du centre de contrôle sont regroupés au début du fichier `CommandCenter.tsx` pour rester faciles à modifier.

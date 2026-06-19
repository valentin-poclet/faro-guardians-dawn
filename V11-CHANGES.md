# FARO V11 — Mission Control

## Introduction plus fluide

- L'accueil reste préchargé derrière la séquence d'ouverture.
- La dernière image de l'introduction se fond progressivement dans la forêt.
- L'opacité, le léger zoom et le flou de sortie se superposent au contenu afin d'éviter une coupure visuelle.

## Mini-jeu « Mission FARO »

- Accessible uniquement depuis le centre de contrôle avec `Ctrl/Cmd + K`.
- Carte forestière responsive de 8 × 8 cases.
- Placement stratégique de quatre capteurs FARO.
- Départ de feu aléatoire et propagation animée.
- Détection fondée sur la zone surveillée par chaque capteur.
- Alerte LoRa, victoire, défaite et conseils de placement.
- Score calculé selon la rapidité et la couverture du terrain.
- Meilleur score enregistré localement sur l'appareil.
- Interface entièrement disponible en français et en anglais.

La page du jeu se trouve dans `src/pages/MissionFaro.tsx` et sa route est `/mission-faro`.

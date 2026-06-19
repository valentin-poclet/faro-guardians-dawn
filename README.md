# FARO - Fire Area Risk Observatory

Site vitrine bilingue du projet FARO, realise par six etudiants ingenieurs de 3e annee a ESIEE Paris.

Le site presente le projet a un jury, a des visiteurs de stand et a des personnes non specialistes : detection precoce des feux de foret, reseau LoRa maille, IA embarquee et simulation predictive de propagation.

## Fonctionnalites principales

- contenu complet en francais et en anglais
- demonstration interactive de la chaine de detection
- sequence d'ouverture "Activer le reseau"
- scanner forestier interactif et mode d'alerte global
- photos du prototype et videos de modelisation 3D
- video de presentation avec son
- installation possible comme application web
- consultation hors connexion des pages et ressources deja chargees
- navigation mobile et barre de progression de lecture
- centre de contrôle accessible avec `Ctrl/Cmd + K`
- chiffres clés animés et transitions de page respectant l'accessibilité
- révélation progressive des sections et des cartes pendant le défilement
- transition cinématique plein écran après l'activation du réseau
- zoom plein écran des photos et du schéma d'architecture
- progression technique active sur la page Projet
- parallaxe discret sur la forêt et balayage visuel entre les pages
- mini-jeu bilingue « Mission FARO », accessible uniquement depuis le centre de contrôle
- meilleur score du jeu conservé localement sur l'appareil
- sortie d'introduction superposée à l'accueil pour une transition plus fluide
- mise en page mobile-first testable dès 320 px et respect des zones de sécurité iPhone
- centre de contrôle sous forme de panneau inférieur sur téléphone
- médias 3D chargés uniquement à la demande pour réduire les données mobiles
- jeu stratégique avec vent, terrains, trois difficultés, pause et vitesse réglable
- chaîne LoRa obligatoire et départ du feu hors couverture dans Mission FARO
- télémétrie simulée et comparaison « sans FARO / avec FARO » sur l'accueil
- schéma d'architecture interactif à quatre zones
- suggestion de page suivante à la fin de chaque parcours
- option de réduction manuelle des animations dans le centre de contrôle
- télémétrie traduite en niveaux lisibles avec explications et valeurs techniques secondaires
- placement entièrement libre des capteurs dans Mission FARO

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichee dans le terminal.

## Modifier les textes

La majorite des textes visibles sont centralises ici :

```text
src/content/i18n.ts
```

Ce fichier contient les versions francaise et anglaise :

```ts
title: {
  fr: "Titre en francais",
  en: "English title",
}
```

## Modifier les membres de l'equipe

Les cartes de l'equipe se trouvent dans :

```text
src/content/i18n.ts
```

Chercher la constante `TEAM`, puis modifier les noms, roles et biographies.

## Modifier les liens

Les liens GitHub et Google Drive se trouvent dans :

```text
src/content/i18n.ts
```

Chercher la constante `LINKS`.

## Images et videos

Les medias du prototype sont ranges dans :

```text
public/media/components/
public/media/architecture/
```

Les associations entre photos, videos 3D et textes sont definies dans :

```text
src/pages/Architecture.tsx
src/content/i18n.ts
```

Les pages principales sont dans :

```text
src/pages/
```

Le logo officiel et les documents telechargeables sont places dans :

```text
public/faro-logo.png
public/documents/
```

Pour une video de plusieurs minutes, preferer un lecteur YouTube non repertorie ou un lien Drive integre afin de ne pas alourdir le depot GitHub.

## Pages du site

- Accueil : `src/pages/Index.tsx`
- Projet : `src/pages/Projet.tsx`
- Architecture : `src/pages/Architecture.tsx`
- Equipe : `src/pages/Equipe.tsx`
- Ressources : `src/pages/Ressources.tsx`

## Technologies

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react

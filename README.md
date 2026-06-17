# FARO - Fire Area Risk Observatory

Site vitrine bilingue du projet FARO, realise par six etudiants ingenieurs de 3e annee a ESIEE Paris.

Le site presente le projet a un jury, a des visiteurs de stand et a des personnes non specialistes : detection precoce des feux de foret, reseau LoRa maille, IA embarquee et simulation predictive de propagation.

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

## Remplacer les images et videos

Les blocs "Insérer ici..." sont des placeholders. Pour les remplacer, ajouter les fichiers dans :

```text
src/assets/
```

Puis importer le fichier dans la page concernee, par exemple :

```tsx
import projectVideo from "@/assets/video-projet.mp4";
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

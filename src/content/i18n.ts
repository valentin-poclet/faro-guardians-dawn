/**
 * FARO bilingual content (FR default, EN full).
 * Edit text here — all visible strings live in this single file.
 */

export type Lang = "fr" | "en";

export const NAV = {
  home: { fr: "Accueil", en: "Home" },
  project: { fr: "Projet", en: "Project" },
  architecture: { fr: "Architecture", en: "Architecture" },
  team: { fr: "Équipe", en: "Team" },
  resources: { fr: "Ressources", en: "Resources" },
};

export const BRAND = {
  name: "FARO",
  long: { fr: "Fire Area Risk Observatory", en: "Fire Area Risk Observatory" },
  slogan: {
    fr: "Le feu n'attend pas. Nous non plus.",
    en: "Fire does not wait. Neither do we.",
  },
  school: { fr: "ESIEE Paris — Projet ingénieur 3e année", en: "ESIEE Paris — 3rd-year engineering project" },
};

export const LINKS = {
  github: "https://github.com/marius-velluet/faro-backend",
  drive: "https://drive.google.com/drive/folders/1bvFLYfYpu_0ll0Z5LbygZBb9jzliP9hv?usp=sharing",
};

/* ---------- HOME ---------- */
export const HOME = {
  hero: {
    eyebrow: { fr: "Fire Area Risk Observatory", en: "Fire Area Risk Observatory" },
    title: {
      fr: "60 secondes pour sauver une forêt.",
      en: "60 seconds to save a forest.",
    },
    subtitle: {
      fr: "FARO est un système de détection ultra-précoce des feux de forêt combinant capteurs IoT, IA embarquée, réseau LoRa maillé et simulation prédictive de propagation.",
      en: "FARO is an ultra-early wildfire detection system combining IoT sensors, on-device AI, a LoRa mesh radio network and predictive fire-propagation simulation.",
    },
    ctaPrimary: { fr: "Découvrir le projet", en: "Discover the project" },
    ctaSecondary: { fr: "Voir le GitHub", en: "View on GitHub" },
  },
  metrics: [
    {
      value: "~500 000",
      unit: { fr: "hectares", en: "hectares" },
      label: {
        fr: "brûlés en Europe chaque année",
        en: "burned across Europe every year",
      },
    },
    {
      value: "< 2 min",
      unit: { fr: "délai d'alerte", en: "alert delay" },
      label: {
        fr: "visé par le système FARO",
        en: "targeted by the FARO system",
      },
    },
  ],
  how: {
    title: { fr: "Comment ça fonctionne ?", en: "How it works" },
    steps: [
      {
        n: "01",
        title: { fr: "Mesurer", en: "Measure" },
        text: {
          fr: "Température, humidité, gaz, lumière et qualité de l'air sont mesurés en continu par des capteurs autonomes alimentés par panneaux solaires.",
          en: "Temperature, humidity, gases, light and air quality are measured continuously by autonomous sensors powered by solar panels.",
        },
      },
      {
        n: "02",
        title: { fr: "Analyser", en: "Analyse" },
        text: {
          fr: "Une IA embarquée détecte les anomalies directement sur le capteur, sans dépendre du cloud.",
          en: "On-device AI detects anomalies directly on the sensor, with no dependency on the cloud.",
        },
      },
      {
        n: "03",
        title: { fr: "Transmettre", en: "Transmit" },
        text: {
          fr: "L'alerte est envoyée via un réseau radio LoRa maillé sur plusieurs kilomètres, sans Internet.",
          en: "The alert travels through a multi-kilometer LoRa mesh radio network, with no Internet required.",
        },
      },
      {
        n: "04",
        title: { fr: "Simuler", en: "Simulate" },
        text: {
          fr: "Un dashboard cartographique simule la propagation du feu pour aider à orienter l'intervention.",
          en: "A mapping dashboard simulates fire propagation to help guide field intervention.",
        },
      },
    ],
  },
  pillars: {
    title: { fr: "Trois piliers technologiques", en: "Three technical pillars" },
    items: [
      {
        title: { fr: "Détecter", en: "Detect" },
        text: {
          fr: "Un réseau maillé de capteurs LoRa déployés sur le terrain mesure en temps réel la température, l'humidité, la qualité de l'air, les gaz et la fumée.",
          en: "A field-deployed LoRa mesh network measures temperature, humidity, air quality, gases and smoke in real time.",
        },
      },
      {
        title: { fr: "Analyser", en: "Analyse" },
        text: {
          fr: "Une IA embarquée de type autoencodeur, entraînée sur des données réelles, détecte les anomalies dès que les conditions s'éloignent du comportement normal.",
          en: "An autoencoder on-device AI model, trained on real field data, flags anomalies as soon as conditions diverge from normal behavior.",
        },
      },
      {
        title: { fr: "Prédire", en: "Predict" },
        text: {
          fr: "Une simulation par automate cellulaire calcule la propagation possible du feu à t+5, t+15 et t+30 minutes grâce aux données météo en direct.",
          en: "A cellular-automaton simulation computes possible fire spread at t+5, t+15 and t+30 minutes, fed by live weather data.",
        },
      },
    ],
  },
  video: {
    placeholder: { fr: "Insérer ici la vidéo du projet", en: "Project video to be inserted here" },
    caption: { fr: "Voir FARO en action.", en: "See FARO in action." },
  },
  teamTeaser: {
    title: {
      fr: "Conçu par 6 étudiants ingénieurs à ESIEE Paris",
      en: "Built by 6 engineering students at ESIEE Paris",
    },
    text: {
      fr: "Un projet mêlant électronique embarquée, réseau radio, intelligence artificielle, simulation et interface web.",
      en: "A project combining embedded electronics, radio networks, artificial intelligence, simulation and web interfaces.",
    },
    cta: { fr: "Découvrir l'équipe", en: "Meet the team" },
  },
};

/* ---------- PROJET ---------- */
export const PROJECT = {
  title: { fr: "Comment fonctionne FARO ?", en: "How does FARO work?" },
  intro: {
    fr: "FARO repose sur cinq couches techniques développées indépendamment puis intégrées dans une seule chaîne cohérente : du capteur jusqu'à la carte de propagation.",
    en: "FARO is built on five technical layers, developed independently and then integrated into a single coherent chain: from sensor to propagation map.",
  },
  layers: [
    {
      n: "01",
      title: { fr: "Capteurs embarqués et électronique", en: "Embedded sensors & electronics" },
      text: {
        fr: "Chaque nœud FARO embarque un capteur BME688 capable de mesurer la température, l'humidité, la pression atmosphérique et la qualité de l'air. Le système intègre aussi un écran OLED pour l'affichage local, une puce radio LoRa SX1262 pour la communication longue portée et un microcontrôleur ESP32 qui pilote le fonctionnement du nœud à travers une machine à états.",
        en: "Each FARO node embeds a BME688 sensor measuring temperature, humidity, atmospheric pressure and air quality. The node also features an OLED display for local readings, a LoRa SX1262 radio chip for long-range communication and an ESP32 microcontroller running a state machine to manage measurement cycles, transmission and local alert logic.",
      },
    },
    {
      n: "02",
      title: { fr: "Réseau maillé LoRa", en: "LoRa mesh network" },
      text: {
        fr: "LoRa est un protocole radio longue portée et basse consommation utilisant la bande 868 MHz en Europe. Les nœuds forment un maillage par flooding : chaque nœud peut relayer les messages des nœuds voisins. Le système reste ainsi robuste et indépendant de toute infrastructure réseau existante.",
        en: "LoRa is a long-range, low-power radio protocol using the 868 MHz band in Europe. Nodes form a mesh through flooding: each node relays messages from its neighbours, making the system robust and independent of any existing network infrastructure.",
      },
    },
    {
      n: "03",
      title: { fr: "Détection d'anomalies par IA embarquée", en: "On-device anomaly detection" },
      text: {
        fr: "Un modèle d'autoencodeur est entraîné sur des données réelles collectées avec le BME688, en conditions normales et lors d'essais simulés de début d'incendie. Il apprend le comportement normal de l'environnement et détecte les anomalies via une erreur de reconstruction (MSE) comparée à un seuil calibré.",
        en: "An autoencoder model is trained on real BME688 field data, collected in normal conditions and during simulated early-fire trials. It learns the environment's normal behavior and detects anomalies through a reconstruction error (MSE) compared against a calibrated threshold.",
      },
    },
    {
      n: "04",
      title: { fr: "Simulation prédictive de propagation", en: "Predictive propagation simulation" },
      text: {
        fr: "Les coordonnées GPS du nœud déclencheur et les données météo en direct issues d'OpenWeatherMap alimentent une simulation par automate cellulaire. Le terrain est représenté comme une grille d'états : forêt, feu, eau, inerte, brûlé. La simulation produit des projections à t+5, t+15 et t+30 minutes et exporte les résultats en GeoJSON pour la carte.",
        en: "GPS coordinates of the triggering node and live weather data from OpenWeatherMap feed a cellular-automaton simulation. Terrain is represented as a grid of states — forest, fire, water, inert, burned — producing projections at t+5, t+15 and t+30 minutes and exporting GeoJSON for map rendering.",
      },
    },
    {
      n: "05",
      title: { fr: "Interface web et visualisation", en: "Web interface & visualisation" },
      text: {
        fr: "Une application web React, déployée via Docker avec un serveur Node.js, affiche en temps réel les données capteurs, l'état du réseau maillé, les alertes et une carte animée de propagation rendue avec Leaflet.js.",
        en: "A React web application, deployed via Docker with a Node.js server, shows live sensor data, mesh status, alerts and an animated propagation map rendered with Leaflet.js.",
      },
    },
  ],
  resources: {
    title: { fr: "Ressources techniques", en: "Technical resources" },
    github: { fr: "GitHub — Simulation backend", en: "GitHub — Simulation backend" },
    drive: { fr: "Google Drive — Code LoRa & IA", en: "Google Drive — LoRa & AI code" },
  },
};

/* ---------- ARCHITECTURE ---------- */
export const ARCH = {
  title: { fr: "Architecture du système", en: "System architecture" },
  intro: {
    fr: "Chaque nœud FARO est une unité autonome pensée pour fonctionner en extérieur, sans infrastructure réseau existante, avec une alimentation indépendante.",
    en: "Each FARO node is an autonomous unit designed to operate outdoors, without existing network infrastructure, on independent power.",
  },
  diagram: { fr: "Insérer ici le schéma d'architecture", en: "System architecture diagram to be inserted here" },
  showcase: {
    fr: "Insérer ici les photos du boîtier et du prototype",
    en: "Enclosure & prototype photos to be inserted here",
  },
  components: [
    {
      title: { fr: "Capteur BME688", en: "BME688 sensor" },
      text: {
        fr: "Mesure en continu la température, l'humidité, la pression atmosphérique et la qualité de l'air. C'est la source principale de données pour la détection d'anomalies.",
        en: "Continuously measures temperature, humidity, atmospheric pressure and air quality. The main data source for anomaly detection.",
      },
    },
    {
      title: { fr: "Puce LoRa SX1262", en: "LoRa SX1262 chip" },
      text: {
        fr: "Gère la communication radio longue portée sur la bande européenne 868 MHz. L'antenne doit impérativement être connectée avant la mise sous tension pour ne pas endommager la puce.",
        en: "Handles long-range radio communication on the European 868 MHz band. The antenna must be connected before powering the node on to avoid damaging the chip.",
      },
    },
    {
      title: { fr: "Microcontrôleur ESP32", en: "ESP32 microcontroller" },
      text: {
        fr: "Le cerveau du nœud. Il exécute la machine à états, pilote le capteur et l'écran, gère la transmission radio et prend les décisions d'alerte locales.",
        en: "The brain of the node. It runs the state machine, drives the sensor and display, manages radio transmission and takes local alert decisions.",
      },
    },
    {
      title: { fr: "Écran OLED", en: "OLED display" },
      text: {
        fr: "Affiche les mesures du capteur directement sur le nœud, ce qui permet une vérification sur le terrain sans matériel externe.",
        en: "Shows live sensor readings directly on the node, enabling field checks without external devices.",
      },
    },
    {
      title: { fr: "Batterie & alimentation solaire", en: "Battery & solar power" },
      text: {
        fr: "Alimente le nœud de façon autonome. Le système est pensé pour un déploiement en extérieur prolongé, avec recharge solaire continue.",
        en: "Powers the node autonomously. The system is designed for long-term outdoor deployment with continuous solar recharging.",
      },
    },
    {
      title: { fr: "Réseau maillé LoRa", en: "LoRa mesh network" },
      text: {
        fr: "Les nœuds relayent les messages les uns des autres via un protocole de flooding, créant un réseau résilient même lorsqu'un nœud n'est pas directement connecté à la passerelle.",
        en: "Nodes relay each other's messages through a flooding protocol, creating a resilient network even when a node is not directly connected to the gateway.",
      },
    },
  ],
  deployVideo: { fr: "Insérer ici la vidéo de déploiement terrain", en: "Field deployment video to be inserted here" },
};

/* ---------- TEAM ---------- */
export const TEAM = {
  title: { fr: "L'équipe derrière FARO", en: "The team behind FARO" },
  subtitle: {
    fr: "Six étudiants ingénieurs de troisième année à ESIEE Paris.",
    en: "Six third-year engineering students at ESIEE Paris.",
  },
  members: [
    {
      name: "Valentin Poclet",
      role: { fr: "Simulation prédictive & export cartographique", en: "Predictive simulation & map export" },
      bio: {
        fr: "Valentin a développé le moteur de simulation de propagation du feu, modélisé le terrain en grille cellulaire, intégré la gestion des obstacles naturels, connecté les données météo en direct via l'API OpenWeatherMap, orienté la propagation selon la vitesse et la direction du vent, généré les projections à t+5, t+15 et t+30 minutes et créé l'export GeoJSON pour le rendu cartographique avec Leaflet.js.",
        en: "Valentin built the fire propagation simulation engine: terrain modelled as a cellular grid, handling of natural obstacles, live weather data via the OpenWeatherMap API, wind-driven propagation, projections at t+5, t+15 and t+30 minutes, and GeoJSON export for Leaflet.js map rendering.",
      },
    },
    {
      name: "Marius Velluet",
      role: { fr: "Application web & infrastructure", en: "Web application & infrastructure" },
      bio: {
        fr: "Marius a construit l'application web de simulation prédictive, déployée via Docker avec un serveur Node.js et une interface React. Il a conçu l'architecture permettant la visualisation en temps réel des données capteurs, des alertes et de la carte animée de propagation.",
        en: "Marius built the predictive simulation web app, deployed with Docker, a Node.js server and a React front-end. He designed the architecture for live visualisation of sensor data, alerts and the animated propagation map.",
      },
    },
    {
      name: "Christophe Sannier",
      role: { fr: "Électronique embarquée & logique de contrôle", en: "Embedded electronics & control logic" },
      bio: {
        fr: "Christophe a conçu et développé la couche embarquée des nœuds : machine à états, logique de décision, intégration du capteur BME688, intégration de l'écran OLED et logique de contrôle opérationnel. Il a travaillé étroitement avec Thomas pour assurer la cohérence entre les couches matérielle et logicielle.",
        en: "Christophe designed and developed the nodes' embedded layer: state machine, decision logic, BME688 sensor integration, OLED display integration and operational control logic. He worked closely with Thomas to keep hardware and software layers consistent.",
      },
    },
    {
      name: "Jean Catherine",
      role: { fr: "Intelligence artificielle", en: "Artificial intelligence" },
      bio: {
        fr: "Jean a conçu et entraîné le modèle d'IA du projet, un autoencodeur basé sur les données réelles collectées avec le capteur BME688. Il a validé le modèle en conditions réelles et calibré le seuil MSE pour réduire les faux positifs tout en conservant une détection fiable.",
        en: "Jean designed and trained the project's AI model — an autoencoder built on real BME688 field data. He validated the model in real-world conditions and calibrated the MSE threshold to limit false positives while keeping reliable detection.",
      },
    },
    {
      name: "Léon Rostand",
      role: { fr: "Réseau LoRa & communication radio", en: "LoRa network & radio communication" },
      bio: {
        fr: "Léon a développé la couche de communication radio basée sur la technologie LoRa. Il a implémenté le protocole maillé de flooding qui permet aux nœuds de relayer les données sans Internet ni infrastructure existante.",
        en: "Léon developed the radio communication layer based on LoRa technology. He implemented the flooding mesh protocol allowing nodes to relay data without Internet or any existing infrastructure.",
      },
    },
    {
      name: "Thomas Degoulé",
      role: { fr: "Intégration système & documentation", en: "System integration & documentation" },
      bio: {
        fr: "Thomas a contribué à l'intégration du système embarqué en collaboration avec Christophe, assuré la cohérence de la chaîne de détection, mené le rapport éthique et contribué à la vidéo de présentation du projet.",
        en: "Thomas contributed to embedded system integration alongside Christophe, ensured consistency across the detection chain, led the ethical report and contributed to the project presentation video.",
      },
    },
  ],
};

/* ---------- RESOURCES ---------- */
export const RESOURCES = {
  title: { fr: "Explorer FARO", en: "Explore FARO" },
  intro: {
    fr: "Tout ce dont vous avez besoin pour approfondir le projet : code source, modèles et vidéos.",
    en: "Everything you need to dig deeper into the project: source code, models and videos.",
  },
  blocks: [
    {
      kind: "github",
      title: { fr: "Simulation backend — GitHub", en: "Simulation backend — GitHub" },
      desc: {
        fr: "Code source de la simulation prédictive de propagation du feu et de l'application backend.",
        en: "Source code for the predictive fire-propagation simulation and the backend application.",
      },
      cta: { fr: "Ouvrir GitHub", en: "Open GitHub" },
      href: "https://github.com/marius-velluet/faro-backend",
    },
    {
      kind: "drive",
      title: { fr: "Code LoRa & IA — Google Drive", en: "LoRa & AI code — Google Drive" },
      desc: {
        fr: "Code source du protocole de communication LoRa maillé et du modèle d'IA embarquée pour la détection d'anomalies.",
        en: "Source code for the LoRa mesh communication protocol and the on-device AI anomaly-detection model.",
      },
      cta: { fr: "Ouvrir Drive", en: "Open Drive" },
      href: "https://drive.google.com/drive/folders/1bvFLYfYpu_0ll0Z5LbygZBb9jzliP9hv?usp=sharing",
    },
    {
      kind: "video",
      title: { fr: "Vidéo du projet", en: "Project video" },
      desc: {
        fr: "Découvrez FARO en action : déploiement des capteurs, détection en direct et simulation de propagation.",
        en: "See FARO in action: sensor deployment, live detection and propagation simulation.",
      },
      videoPlaceholder: { fr: "Insérer ici la vidéo du projet", en: "Project video to be inserted here" },
    },
  ] as const,
};

/* ---------- FOOTER ---------- */
export const FOOTER = {
  about: {
    fr: "FARO — Fire Area Risk Observatory. Projet ingénieur 3e année, ESIEE Paris.",
    en: "FARO — Fire Area Risk Observatory. 3rd-year engineering project, ESIEE Paris.",
  },
  rights: { fr: "Tous droits réservés.", en: "All rights reserved." },
  navTitle: { fr: "Navigation", en: "Navigation" },
  resourcesTitle: { fr: "Ressources", en: "Resources" },
};

export const UI = {
  langSwitch: { fr: "Langue", en: "Language" },
  openMenu: { fr: "Ouvrir le menu", en: "Open menu" },
  closeMenu: { fr: "Fermer le menu", en: "Close menu" },
};
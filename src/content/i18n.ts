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
      fr: "Détecter plus tôt. Décider avec plus de contexte.",
      en: "Detect earlier. Decide with better context.",
    },
    subtitle: {
      fr: "FARO est un démonstrateur de détection précoce des feux de forêt combinant capteurs environnementaux, IA embarquée, réseau LoRa maillé et simulation prédictive de propagation.",
      en: "FARO is an early wildfire detection demonstrator combining environmental sensors, on-device AI, a LoRa mesh network and predictive fire-spread simulation.",
    },
    status: {
      fr: "Prototype étudiant — données campus — validation terrain nécessaire",
      en: "Student prototype — campus data — field validation required",
    },
    ctaPrimary: { fr: "Découvrir le projet", en: "Discover the project" },
    ctaSecondary: { fr: "Voir le GitHub", en: "View on GitHub" },
  },
  promise: {
    eyebrow: { fr: "FARO / Alerte précoce", en: "FARO / Early warning" },
    title: {
      fr: "Viser l'alerte avant que le feu ne soit clairement visible.",
      en: "Aim to alert before the fire becomes clearly visible.",
    },
    text: {
      fr: "Les systèmes classiques repèrent souvent les incendies lorsqu'ils sont déjà installés. FARO explore une alerte plus précoce : mesurer le terrain en continu, détecter les signaux faibles et transmettre l'information sans dépendre d'Internet.",
      en: "Classic systems often detect wildfires once they are already established. FARO explores earlier warning: continuously measure the field, detect weak signals and transmit information without depending on the Internet.",
    },
    cards: [
      {
        title: { fr: "Problème", en: "Problem" },
        text: {
          fr: "Satellites et tours de guet peuvent arriver trop tard, surtout au tout début d'un feu.",
          en: "Satellites and watchtowers can react too late, especially during the earliest phase of a fire.",
        },
      },
      {
        title: { fr: "Solution FARO", en: "FARO solution" },
        text: {
          fr: "Un réseau de capteurs autonomes place l'intelligence directement sur le terrain, au plus près du risque.",
          en: "A network of autonomous sensor nodes brings intelligence directly into the field, close to the risk.",
        },
      },
      {
        title: { fr: "Objectif", en: "Goal" },
        text: {
          fr: "Aider les équipes à comprendre où le feu peut se propager dans les prochaines minutes.",
          en: "Help response teams understand where the fire may spread in the next few minutes.",
        },
      },
    ],
  },
  metrics: [
    {
      value: "5 s",
      unit: { fr: "entre les mesures", en: "between readings" },
      label: {
        fr: "pour suivre l'évolution de l'environnement au niveau du nœud",
        en: "to monitor environmental changes at node level",
      },
    },
    {
      value: "868 MHz",
      unit: { fr: "bande radio", en: "radio band" },
      label: {
        fr: "pour une communication LoRa autonome, sans abonnement",
        en: "for autonomous LoRa communication with no subscription",
      },
    },
    {
      value: "0",
      unit: { fr: "action automatique", en: "automatic action" },
      label: {
        fr: "l'opérateur conserve la décision finale après chaque alerte",
        en: "the operator keeps final authority after every alert",
      },
    },
  ],
  how: {
    title: { fr: "Comment ça fonctionne ?", en: "How it works" },
    eyebrow: {
      fr: "Mesurer / Analyser / Transmettre / Simuler",
      en: "Measure / Analyse / Transmit / Simulate",
    },
    steps: [
      {
        n: "01",
        title: { fr: "Mesurer", en: "Measure" },
        text: {
          fr: "Le BME688 mesure la température, l'humidité, la pression et les variations de qualité de l'air. Le prototype associe batteries LiPo et chaîne de recharge solaire.",
          en: "The BME688 measures temperature, humidity, pressure and air-quality variations. The prototype combines LiPo batteries with a solar charging chain.",
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
          fr: "L'alerte est relayée par un réseau radio LoRa maillé, sans Internet ni compte en ligne.",
          en: "The alert is relayed through a LoRa mesh radio network, without Internet access or an online account.",
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
          fr: "Un réseau maillé de nœuds LoRa mesure la température, l'humidité, la pression et les variations de qualité de l'air.",
          en: "A mesh network of LoRa nodes measures temperature, humidity, pressure and air-quality variations.",
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
  demo: {
    eyebrow: { fr: "Capteur / IA / Maillage / Carte", en: "Sensor / AI / Mesh / Map" },
    title: { fr: "Une chaîne complète, du capteur à la carte.", en: "A complete chain, from sensor to map." },
    text: {
      fr: "FARO ne se limite pas à déclencher une alerte : le projet relie électronique embarquée, réseau radio, IA locale et visualisation cartographique pour transformer une anomalie terrain en information exploitable.",
      en: "FARO does more than trigger an alert: the project connects embedded electronics, radio networking, local AI and map visualisation to turn a field anomaly into actionable information.",
    },
    items: [
      { value: "BME688", label: { fr: "mesures environnementales", en: "environmental sensing" } },
      { value: "LoRa", label: { fr: "transmission sans Internet", en: "Internet-free transmission" } },
      { value: "IA", label: { fr: "détection embarquée", en: "on-device detection" } },
      { value: "GeoJSON", label: { fr: "export cartographique", en: "map-ready export" } },
    ],
  },
  interactive: {
    eyebrow: { fr: "Démonstration interactive", en: "Interactive demonstration" },
    title: { fr: "Suivez une alerte à travers FARO.", en: "Follow an alert through FARO." },
    text: {
      fr: "Lancez la séquence pour visualiser le parcours d'une anomalie, depuis sa mesure sur le terrain jusqu'à son affichage sur la carte prédictive.",
      en: "Start the sequence to visualise an anomaly travelling from its field measurement to the predictive map.",
    },
    start: { fr: "Lancer une détection", en: "Start a detection" },
    replay: { fr: "Relancer la séquence", en: "Replay the sequence" },
    running: { fr: "Transmission en cours...", en: "Transmission in progress..." },
    hint: {
      fr: "Vous pouvez aussi survoler chaque étape.",
      en: "You can also hover over each step.",
    },
    steps: [
      {
        title: { fr: "Mesure", en: "Measure" },
        detail: { fr: "Le BME688 relève une variation.", en: "The BME688 detects a variation." },
      },
      {
        title: { fr: "Analyse", en: "Analyse" },
        detail: { fr: "L'IA calcule le score d'anomalie.", en: "The AI computes the anomaly score." },
      },
      {
        title: { fr: "Transmission", en: "Transmit" },
        detail: { fr: "Le réseau LoRa relaie l'alerte.", en: "The LoRa network relays the alert." },
      },
      {
        title: { fr: "Simulation", en: "Simulate" },
        detail: { fr: "La carte projette la propagation.", en: "The map projects fire spread." },
      },
    ],
  },
  video: {
    eyebrow: { fr: "Présentation vidéo", en: "Video presentation" },
    title: { fr: "FARO, du concept au déploiement.", en: "FARO, from concept to deployment." },
    text: {
      fr: "Découvrez la conception du prototype, ses composants, son assemblage et son installation en environnement forestier.",
      en: "Discover the prototype design, its components, assembly and installation in a forest environment.",
    },
    caption: {
      fr: "Présentation du projet FARO - 2 min 21 s - son disponible.",
      en: "FARO project presentation - 2 min 21 sec - sound available.",
    },
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
  chain: {
    title: { fr: "La chaîne de détection", en: "Detection chain" },
    eyebrow: { fr: "Pipeline complet", en: "End-to-end pipeline" },
    items: [
      { fr: "Capteur", en: "Sensor" },
      { fr: "IA locale", en: "Local AI" },
      { fr: "Réseau LoRa", en: "LoRa network" },
      { fr: "Alerte", en: "Alert" },
      { fr: "Carte prédictive", en: "Predictive map" },
    ],
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
  ethics: {
    eyebrow: { fr: "Conception responsable", en: "Responsible design" },
    title: {
      fr: "Un outil d'aide à la décision, jamais un remplacement de l'humain.",
      en: "A decision-support tool, never a replacement for people.",
    },
    intro: {
      fr: "L'analyse éthique n'est pas restée théorique : elle a directement fait évoluer l'interface, le protocole radio et les limites assumées du prototype.",
      en: "The ethical review was not merely theoretical: it directly changed the interface, radio protocol and stated limits of the prototype.",
    },
    principles: [
      {
        title: { fr: "Décision humaine", en: "Human decision" },
        text: {
          fr: "FARO signale une anomalie et fournit du contexte. Un opérateur qualifié décide toujours de la suite à donner à l'alerte.",
          en: "FARO reports an anomaly and provides context. A qualified operator always decides what action should follow.",
        },
      },
      {
        title: { fr: "Alerte plus lisible", en: "More transparent alerts" },
        text: {
          fr: "Le score numérique d'anomalie accompagne le niveau d'alerte afin de ne pas réduire l'IA à un simple voyant rouge opaque.",
          en: "A numerical anomaly score accompanies the alert level so the AI is not reduced to an opaque red indicator.",
        },
      },
      {
        title: { fr: "Réseau accessible", en: "Accessible network" },
        text: {
          fr: "Le protocole LoRa autonome fonctionne sans 4G, abonnement commercial, application obligatoire ni compte en ligne.",
          en: "The autonomous LoRa protocol works without 4G, a commercial subscription, a mandatory app or an online account.",
        },
      },
    ],
    limitTitle: { fr: "Une limite clairement documentée", en: "A clearly documented limitation" },
    limitText: {
      fr: "Le modèle a été entraîné avec des données collectées sur le campus. Il doit être recalibré et validé avec des professionnels avant tout déploiement réel en forêt.",
      en: "The model was trained on data collected on campus. It must be recalibrated and validated with professionals before any real forest deployment.",
    },
  },
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
  diagram: {
    eyebrow: { fr: "Vue d'ensemble", en: "System overview" },
    title: { fr: "Du terrain jusqu'à la simulation.", en: "From the field to the simulation." },
    intro: {
      fr: "Le schéma résume les quatre fonctions principales de FARO : mesurer, analyser localement, transmettre sans Internet et simuler la propagation.",
      en: "The diagram summarises FARO's four main functions: measure, analyse locally, transmit without Internet and simulate fire spread.",
    },
    caption: {
      fr: "Schéma fonctionnel de l'architecture FARO. Cliquez pour l'afficher en pleine taille.",
      en: "Functional diagram of the FARO architecture. Click to open it full size.",
    },
  },
  media: {
    eyebrow: { fr: "Prototype et modélisation", en: "Prototype and modelling" },
    title: {
      fr: "Du composant réel à son modèle 3D.",
      en: "From the real component to its 3D model.",
    },
    intro: {
      fr: "Chaque élément a été sélectionné pour le prototype puis reproduit en 3D afin de préparer son intégration mécanique dans le boîtier.",
      en: "Each element was selected for the prototype and then reproduced in 3D to prepare its mechanical integration into the enclosure.",
    },
    photoLabel: { fr: "Composant réel", en: "Real component" },
    videoLabel: { fr: "Modélisation 3D", en: "3D model" },
    exteriorLabel: { fr: "Extérieur", en: "Exterior" },
    interiorLabel: { fr: "Intérieur", en: "Interior" },
    items: [
      {
        title: { fr: "Capteur BME688", en: "BME688 sensor" },
        text: {
          fr: "Le capteur environnemental utilisé pour mesurer la température, l'humidité, la pression et les variations de qualité de l'air.",
          en: "The environmental sensor used to measure temperature, humidity, pressure and air-quality variations.",
        },
      },
      {
        title: { fr: "Carte DFR1195", en: "DFR1195 board" },
        text: {
          fr: "La carte ESP32-S3 qui pilote le nœud et assure la communication radio LoRa.",
          en: "The ESP32-S3 board that controls the node and handles LoRa radio communication.",
        },
      },
      {
        title: { fr: "Batterie LiPo 3000 mAh", en: "3000 mAh LiPo battery" },
        text: {
          fr: "La source d'énergie embarquée choisie pour alimenter chaque nœud du prototype.",
          en: "The on-board energy source selected to power each prototype node.",
        },
      },
      {
        title: { fr: "Cellule solaire SOL3W", en: "SOL3W solar cell" },
        text: {
          fr: "La cellule photovoltaïque prévue pour contribuer à l'autonomie énergétique du nœud.",
          en: "The photovoltaic cell intended to contribute to the node's energy autonomy.",
        },
      },
      {
        title: { fr: "Module SunFlower DFR0559", en: "SunFlower DFR0559 module" },
        text: {
          fr: "Le module de gestion d'alimentation placé entre la cellule solaire, la batterie et l'électronique.",
          en: "The power management module placed between the solar cell, battery and electronics.",
        },
      },
      {
        title: { fr: "Boîtier du nœud FARO", en: "FARO node enclosure" },
        text: {
          fr: "Le boîtier fabriqué pour rassembler, protéger et rendre accessibles les éléments du prototype.",
          en: "The enclosure built to house, protect and provide access to the prototype components.",
        },
      },
    ],
  },
  inventory: {
    eyebrow: { fr: "Nomenclature du prototype", en: "Prototype bill of materials" },
    title: { fr: "Du matériel choisi pour construire et tester.", en: "Hardware selected to build and test." },
    intro: {
      fr: "Cette liste reprend la BOM réelle du projet. Elle distingue les éléments achetés des fonctions logicielles développées par l'équipe.",
      en: "This list comes directly from the project's bill of materials. It separates purchased hardware from the software functions developed by the team.",
    },
    total: { fr: "194,34 € de matériel référencé", en: "€194.34 of listed hardware" },
    items: [
      {
        qty: "×4",
        name: "DFR1195",
        detail: { fr: "Carte ESP32-S3 avec radio LoRa", en: "ESP32-S3 board with LoRa radio" },
      },
      {
        qty: "×3",
        name: "BME688 SEN0629",
        detail: { fr: "Capteur environnemental pour l'analyse de l'air", en: "Environmental sensor for air analysis" },
      },
      {
        qty: "×4",
        name: "LiPo 3,7 V / 3000 mAh",
        detail: { fr: "Batteries du prototype", en: "Prototype batteries" },
      },
      {
        qty: "×1",
        name: "SunFlower DFR0559",
        detail: { fr: "Module de gestion solaire 5 V / 1 A", en: "5 V / 1 A solar power manager" },
      },
      {
        qty: "×1",
        name: "SOL3W",
        detail: { fr: "Cellule solaire", en: "Solar cell" },
      },
    ],
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
  antennaWarning: {
    fr: "Antenne obligatoire avant la mise sous tension.",
    en: "Antenna required before power-on.",
  },
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
      email: "valentin.poclet@edu.esiee.fr",
      role: { fr: "Simulation prédictive & export cartographique", en: "Predictive simulation & map export" },
      bio: {
        fr: "Valentin a développé le moteur de simulation de propagation du feu, modélisé le terrain en grille cellulaire, intégré la gestion des obstacles naturels, connecté les données météo en direct via l'API OpenWeatherMap, orienté la propagation selon la vitesse et la direction du vent, généré les projections à t+5, t+15 et t+30 minutes et créé l'export GeoJSON pour le rendu cartographique avec Leaflet.js.",
        en: "Valentin built the fire propagation simulation engine: terrain modelled as a cellular grid, handling of natural obstacles, live weather data via the OpenWeatherMap API, wind-driven propagation, projections at t+5, t+15 and t+30 minutes, and GeoJSON export for Leaflet.js map rendering.",
      },
    },
    {
      name: "Marius Velluet",
      email: "marius.velluet@edu.esiee.fr",
      role: { fr: "Application web & infrastructure", en: "Web application & infrastructure" },
      bio: {
        fr: "Marius a construit l'application web de simulation prédictive, déployée via Docker avec un serveur Node.js et une interface React. Il a conçu l'architecture permettant la visualisation en temps réel des données capteurs, des alertes et de la carte animée de propagation.",
        en: "Marius built the predictive simulation web app, deployed with Docker, a Node.js server and a React front-end. He designed the architecture for live visualisation of sensor data, alerts and the animated propagation map.",
      },
    },
    {
      name: "Christophe Sannier",
      email: "christophe.sannier@edu.esiee.fr",
      role: { fr: "Électronique embarquée & logique de contrôle", en: "Embedded electronics & control logic" },
      bio: {
        fr: "Christophe a conçu et développé la couche embarquée des nœuds : machine à états, logique de décision, intégration du capteur BME688, intégration de l'écran OLED et logique de contrôle opérationnel. Il a travaillé étroitement avec Thomas pour assurer la cohérence entre les couches matérielle et logicielle.",
        en: "Christophe designed and developed the nodes' embedded layer: state machine, decision logic, BME688 sensor integration, OLED display integration and operational control logic. He worked closely with Thomas to keep hardware and software layers consistent.",
      },
    },
    {
      name: "Jean Catherine",
      email: "jean.catherine@edu.esiee.fr",
      role: { fr: "Intelligence artificielle", en: "Artificial intelligence" },
      bio: {
        fr: "Jean a conçu et entraîné le modèle d'IA du projet, un autoencodeur basé sur les données réelles collectées avec le capteur BME688. Il a validé le modèle en conditions réelles et calibré le seuil MSE pour réduire les faux positifs tout en conservant une détection fiable.",
        en: "Jean designed and trained the project's AI model — an autoencoder built on real BME688 field data. He validated the model in real-world conditions and calibrated the MSE threshold to limit false positives while keeping reliable detection.",
      },
    },
    {
      name: "Léon Rostand",
      email: "leon.rostand@edu.esiee.fr",
      role: { fr: "Réseau LoRa & communication radio", en: "LoRa network & radio communication" },
      bio: {
        fr: "Léon a développé la couche de communication radio basée sur la technologie LoRa. Il a implémenté le protocole maillé de flooding qui permet aux nœuds de relayer les données sans Internet ni infrastructure existante.",
        en: "Léon developed the radio communication layer based on LoRa technology. He implemented the flooding mesh protocol allowing nodes to relay data without Internet or any existing infrastructure.",
      },
    },
    {
      name: "Thomas Degoul",
      email: "thomas.degoul@edu.esiee.fr",
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
      kind: "report",
      title: { fr: "Rapport d'analyse éthique", en: "Ethical analysis report" },
      desc: {
        fr: "Choix de conception, contrôle humain, limites du modèle et équité territoriale : l'analyse qui a fait évoluer FARO.",
        en: "Design choices, human oversight, model limitations and territorial equity: the review that changed FARO.",
      },
      cta: { fr: "Lire le rapport", en: "Read the report" },
      href: "/documents/rapport-ethique-faro.pdf",
    },
    {
      kind: "bom",
      title: { fr: "BOM du prototype", en: "Prototype BOM" },
      desc: {
        fr: "La nomenclature des cartes, capteurs, batteries et éléments d'alimentation utilisés pour le prototype.",
        en: "The list of boards, sensors, batteries and power components used for the prototype.",
      },
      cta: { fr: "Télécharger la BOM", en: "Download the BOM" },
      href: "/documents/bom-faro.xlsx",
    },
    {
      kind: "poster",
      title: { fr: "Affiche FARO - Journée des projets", en: "FARO poster - Project Day" },
      desc: {
        fr: "L'affiche officielle présentée lors de la Journée des projets : problème, solution, chaîne fonctionnelle et architecture FARO.",
        en: "The official Project Day poster presenting FARO's problem, solution, functional chain and architecture.",
      },
      cta: { fr: "Ouvrir l'affiche", en: "Open the poster" },
      href: "/documents/affiche-faro-journee-projets.pdf",
    },
    {
      kind: "projectVideo",
      title: { fr: "Vidéo de présentation FARO", en: "FARO presentation video" },
      desc: {
        fr: "Une présentation de 2 min 21 s consacrée au prototype, à ses composants, à son assemblage et à son déploiement.",
        en: "A 2 min 21 sec presentation covering the prototype, its components, assembly and deployment.",
      },
      cta: { fr: "Regarder la vidéo", en: "Watch the video" },
      href: "/media/project/faro-presentation.mp4",
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
  layer: { fr: "Couche", en: "Layer" },
  offline: {
    fr: "Mode hors connexion - le contenu déjà consulté reste disponible.",
    en: "Offline mode - previously viewed content remains available.",
  },
  mediaReplace: {
    fr: "Remplacer ce bloc par votre fichier quand il sera prêt.",
    en: "Replace this block with your file when ready.",
  },
};

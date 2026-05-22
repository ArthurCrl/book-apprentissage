// =============================================================================
// SPACE PORTFOLIO 3D - Données des semestres (S5 → S10)
// Planètes = semestres d'alternance, Lunes = technologies clés
// =============================================================================

export interface Moon {
  name: string
  color: string
  orbitRadius: number // unités Three.js (relatif à la planète)
  orbitSpeed: number // radians/seconde
  size: number // rayon en unités Three.js
  angleOffset: number // angle initial en radians
}

export interface Mission {
  title: string
  description: string
  technologies: string[]
  duration: string
  status: 'completed' | 'ongoing'
}

export interface SemesterData {
  id: string
  label: string
  period: string
  color: string
  glowColor: string
  // Orbite 3D
  orbitRadius3D: number // unités Three.js
  orbitDuration: number // secondes pour 1 tour complet
  orbitAngleStart: number // angle initial en degrés
  size3D: number // rayon de la sphère en unités Three.js
  // Lunes (technologies)
  moons: Moon[]
  // Contenu
  entreprise: {
    name: string
    description: string
    team: string
    workMethod: string
    tools: string[]
  }
  ecole: {
    name: string
    formation: string
    description: string
    courses: { name: string; description: string }[]
    skills: string[]
  }
  missions: Mission[]
}

export const semestersData: SemesterData[] = [
  {
    id: 's5',
    label: 'S5',
    period: 'Sept. 2022 – Janv. 2023',
    color: '#4FC3F7',
    glowColor: 'rgba(79, 195, 247, 0.6)',
    orbitRadius3D: 3.5,
    orbitDuration: 18,
    orbitAngleStart: 300,
    size3D: 0.28,
    moons: [
      { name: 'Java', color: '#f89820', orbitRadius: 0.6, orbitSpeed: 1.8, size: 0.08, angleOffset: 0 },
      { name: 'Spring', color: '#6db33f', orbitRadius: 0.75, orbitSpeed: 1.3, size: 0.07, angleOffset: 2.1 },
      { name: 'Angular', color: '#dd0031', orbitRadius: 0.9, orbitSpeed: 0.9, size: 0.07, angleOffset: 4.2 },
      { name: 'GitHub Copilot', color: '#2496ed', orbitRadius: 1.05, orbitSpeed: 0.7, size: 0.06, angleOffset: 1.0 },
    ],
    entreprise: {
      name: 'La Poste Groupe - Branche BGPN',
      description:
        "Dans le cadre de mon parcours d'ingénieur orienté Data et IA en alternance, j'ai intégré le groupe La Poste, plus précisément la DSI de la Branche Grand Public et Numérique (BGPN). J'évolue dans la direction DSOD (Direction des Solutions Distributeurs) sous la responsabilité de Louis Ramin. Mon alternance s'inscrit dans un projet stratégique : le Programme SI Distributeur 2030, piloté par Christophe Le Du, qui vise à moderniser l'intégrialité des outils numériques utilisés par les postiers et les clients en bureau de poste.",
      team: "Équipe ART (Appui et Référent Technique) menée par Loïc Hennequin. Travail en collaboration directe avec mon tuteur Jérôme Biabiany, Expert Informatique, qui m'accompagne sur les aspects techniques et stratégiques.",
      workMethod:
        'Agile Scrum avec daily stand-ups, sprint planning et rétrospectives. Code review via GitLab avant chaque merge. Intégration à des réunions stratégiques sur l\'utilisation de l\'IA au sein des équipes.',
      tools: ['Java', 'Spring Boot', 'Maven', 'SoapUI', 'GitLab', 'Jira', 'GitHub Copilot'],
    },
    ecole: {
      name: 'Polytech Nantes',
      formation: 'Cycle Ingénieur par Apprentissage IDIA – 1ère année',
      description:
        "Formation d'ingénieur orientée Data et Intelligence Artificielle. Consolidation des bases théoriques nécessaires pour comprendre le fonctionnement bas-niveau des applications et les enjeux de modernisation technologique.",
      courses: [
        { name: 'Algorithmique (Python)', description: 'Structures de données, algorithmes complexes et optimisation. Rigueur algorithmique nécessaire pour les migrations applicatives.' },
        { name: 'Systèmes Informatiques', description: 'Linux, architecture PC, gestion des processus et mémoire virtuelle. Fondamentaux pour comprendre le fonctionnement bas-niveau.' },
        { name: 'Langage Relationnel', description: 'SQL avancé, algèbre relationnelle et modélisation relationnel pour les bases de données.' },
        { name: 'Théorie des Graphes', description: 'Projet de 35 pages explorant algorithmes de recherche du plus court chemin (Dijkstra, Bellman-Ford) et arbres couvrants (Kruskal, Prim).' },
        { name: 'Gestion de Projet & Git', description: 'Versioning avec Git, stratégies de tests, organisation et pilotage de projets logiciels modernes.' },
      ],
      skills: ['Python', 'Linux', 'SQL', 'Algorithmique', 'Git', 'Gestion de Projet'],
    },
    missions: [
      {
        title: 'Migration Legacy → Java 17+ SpringBoot',
        description:
          "Participation à la migration du socle applicatif Legacy de La Poste vers un environnement moderne basé sur Java 17+ et SpringBoot. Migration complète de deux premières applications avec restructuration Maven, adaptation des technologies et respect des standards de l'entreprise en matière de nommage et packaging.",
        technologies: ['Java 17+', 'Spring Boot', 'Maven', 'Legacy Code', 'Code Refactoring'],
        duration: 'En cours',
        status: 'ongoing',
      },
      {
        title: 'POC Automatisation Migration par IA',
        description:
          "Conception d'un système d'assistance à la migration utilisant l'Intelligence Artificielle générative pour automatiser le processus de refactorisation. Objectif : gagner en efficacité et réduire les erreurs humaines lors des phases de refactorisation du code.",
        technologies: ['AI/ML', 'GenAI', 'Code Analysis', 'Automation'],
        duration: '6 semaines',
        status: 'ongoing',
      },
      {
        title: 'Documentation Technique & Standards',
        description:
          "Production d'une documentation technique détaillée étape par étape basée sur les migrations réussies. Guide couvrant la restructuration, la gestion des dépendances, et la mise en place de services bouchonnés via SoapUI pour garantir l'autonomie des tests sans dépendre des services tiers.",
        technologies: ['SoapUI', 'Documentation', 'Testing', 'Best Practices'],
        duration: '4 semaines',
        status: 'completed',
      },
    ],
  },
  {
    id: 's6',
    label: 'S6',
    period: 'Fév. 2024 – Juin 2024',
    color: '#FF8A65',
    glowColor: 'rgba(255, 138, 101, 0.6)',
    orbitRadius3D: 5.0,
    orbitDuration: 25,
    orbitAngleStart: 45,
    size3D: 0.30,
    moons: [
      { name: 'Java', color: '#f89820', orbitRadius: 0.65, orbitSpeed: 1.6, size: 0.08, angleOffset: 0.5 },
      { name: 'GitHub Copilot', color: '#24292e', orbitRadius: 0.80, orbitSpeed: 1.1, size: 0.07, angleOffset: 2.5 },
      { name: 'Spring Boot', color: '#6db33f', orbitRadius: 0.95, orbitSpeed: 0.8, size: 0.07, angleOffset: 4.5 },
      { name: 'GitLab', color: '#FCA121', orbitRadius: 1.1, orbitSpeed: 0.6, size: 0.06, angleOffset: 1.5 },
    ],
    entreprise: {
      name: 'La Poste Groupe - Équipe ART (DSOD)',
      description:
        "Continuation du projet de migration techniques des application de la Poste accompagné par l'IA. Accélération du projet avec l'arrivée d'un stagiaire Master 2 qui travaillait sur le même projet. Répartition stratégique : il gère les applications Front avec interface utilisateur directe, moi les applications Back (Modules) consommées par d'autres applications via API REST.",
      team: 'Équipe de 8 développeurs + 1 stagiaire Master 2. Collaboration avec Jérôme Biabiany (tuteur) et Loïc Hennequin ainsi que Antonin Rouxel(stagiaire). Validation par les experts techniques du département.',
      workMethod:
        'Agile Scrum. Utilisation d\'agents GitHub Copilot pour automatiser les migrations. Code review rigoureuse avant déploiement sur GitLab.',
      tools: ['Java 17+', 'Spring Boot', 'GitHub Copilot', 'Maven', 'GitLab', 'REST API'],
    },
    ecole: {
      name: 'Polytech Nantes',
      formation: 'Cycle Ingénieur par Apprentissage IDIA – 2ème année (S6)',
      description:
        "Approfondissement en systèmes logiciels et humanités. Formation équilibrée entre compétences techniques avancées et softs skills essentiels pour l'ingénieur.",
      courses: [
        { name: 'Programmation Java FISA', description: 'Concepts avancés Java. Projet Hackaton : simulation de gestion de l\'électricité dans une ville.' },
        { name: 'Technologies du Web FISA', description: 'HTML/CSS avancé, JavaScript ES6+, frameworks web modernes.' },
        { name: 'Algèbre Linéaire FISA', description: 'Matrices, espaces vectoriels, applications pratiques en informatique.' },
        { name: 'Statistiques et Probabilités FISA', description: 'Probabilités théoriques, analyse statistique, modélisation données.' },
        { name: 'Conception des Systèmes d\'Information FISA', description: 'Modélisation UML, patterns architecturaux, design de systèmes scalables. Note: 14.5/20 (Devoir: 12/20, TP: 17/20).' },
        { name: 'Systèmes Transactionnels FISA S6', description: 'ACID, transactions distribuées, gestion de la concurrence.' },
        { name: 'Traitement de Requêtes FISA S6', description: 'Optimisation de requêtes, indexation, analyse de plans d\'exécution.' },
        { name: 'Introduction aux Systèmes Distribués FISA', description: 'Concepts de base des architectures distribuées, théorème CAP.' },
        { name: 'Simulation de Gestion d\'Entreprise - FISA', description: 'Jeu de gestion d\'entreprise interactif, décisions stratégiques et opérationnelles.' },
        { name: 'Enjeux de Société et Entreprise S6', description: 'RSE, éthique, responsabilité sociétale des entreprises.' },
        { name: 'Preparing the TOEIC and Debating - FISA', description: 'English for technical professionals, presentation skills, debate.' },
      ],
      skills: ['Java', 'Web Technologies', 'Systèmes d\'Information', 'Bases de Données', 'Communication', 'Leadership'],
    },
    missions: [
      {
        title: 'Migration Applications Back (Modules) & APIs',
        description:
          "Migration de plusieurs applications Back (Modules) du legacy vers Java 17+ SpringBoot. Exposition des méthodes via API REST pour la consommation par d'autres applications. Applications tests validées par les experts techniques. Travail en collaboration avec le stagiaire Master 2 qui gère les applications Front.",
        technologies: ['Java 17+', 'Spring Boot', 'REST API', 'API-First Design', 'Maven', 'Refactoring'],
        duration: '3 mois',
        status: 'completed',
      },
      {
        title: 'Développement d\'Agents GitHub Copilot',
        description:
          "Création d'agents intelligents utilisant GitHub Copilot pour automatiser les processus de migration du code Legacy. Les agents effectuent l'analyse du code existant, la transformation et la génération de code cible conformes aux standards. Apprentissage par l'utilisation de patterns et de règles métier.",
        technologies: ['GitHub Copilot', 'Code Generation', 'AI/ML', 'Automation Scripts', 'Java'],
        duration: '2 mois',
        status: 'completed',
      },
      {
        title: 'Publication & Déploiement des Agents sur GitLab',
        description:
          "Déploiement des agents GitHub Copilot sur le GitLab interne de La Poste pour utilisation par les collègues. Les agents sont maintenant disponibles pour l'équipe afin d'accélérer les migrations d'applications supplémentaires. Prochaine étape: test et validation sur applications en production.",
        technologies: ['GitLab', 'GitHub Copilot', 'CI/CD', 'Code Review', 'DevOps'],
        duration: '3 semaines',
        status: 'completed',
      },
    ],
  },
  {
    id: 's7',
    label: 'S7',
    period: 'Sept. 2023 – Janv. 2024',
    color: '#81C784',
    glowColor: 'rgba(129, 199, 132, 0.6)',
    orbitRadius3D: 6.5,
    orbitDuration: 33,
    orbitAngleStart: 150,
    size3D: 0.32,
    moons: [
      { name: 'Python', color: '#3776ab', orbitRadius: 0.65, orbitSpeed: 1.5, size: 0.08, angleOffset: 1.0 },
      { name: 'PySpark', color: '#e25a1c', orbitRadius: 0.80, orbitSpeed: 1.0, size: 0.07, angleOffset: 3.0 },
      { name: 'MLflow', color: '#0194e2', orbitRadius: 0.95, orbitSpeed: 0.75, size: 0.07, angleOffset: 5.0 },
      { name: 'BERT', color: '#ffcc00', orbitRadius: 1.1, orbitSpeed: 0.55, size: 0.06, angleOffset: 2.0 },
    ],
    entreprise: {
      name: 'La Poste Groupe',
      description:
        "Montée en responsabilité avec des sujets complexes liés à la data et à l'intelligence artificielle. Projets transverses multi-équipes.",
      team: 'Équipe Data & IA de 10 personnes. Binôme avec un data scientist senior.',
      workMethod: "Scrum pour le développement, Kanban pour la maintenance. MLOps pour l'industrialisation.",
      tools: ['Python', 'PySpark', 'Airflow', 'MLflow', 'Databricks', 'Azure', 'Jupyter'],
    },
    ecole: {
      name: 'Polytech Nancy',
      formation: 'Cycle Ingénieur Informatique – 4ème année',
      description: 'Spécialisation en Intelligence Artificielle et Science des Données. Projets de recherche appliquée.',
      courses: [
        { name: 'Machine Learning', description: 'Algorithmes supervisés/non supervisés, scikit-learn.' },
        { name: 'Deep Learning', description: 'CNN, RNN, LSTM, TensorFlow, PyTorch.' },
        { name: 'Big Data', description: 'Hadoop, Spark, architectures Lambda et Kappa.' },
        { name: 'NLP', description: 'Tokenisation, word embeddings, transformers, BERT.' },
        { name: 'Éthique & IA', description: 'Biais algorithmiques, explicabilité, RGPD, IA Act.' },
      ],
      skills: ['Python', 'Machine Learning', 'Deep Learning', 'PySpark', 'NLP'],
    },
    missions: [
      {
        title: 'Modèle de prédiction des retards',
        description: 'XGBoost entraîné sur 3 ans de données pour prédire les retards de livraison. Déploiement via MLflow.',
        technologies: ['Python', 'XGBoost', 'scikit-learn', 'MLflow', 'Azure ML'],
        duration: '3 mois',
        status: 'completed',
      },
      {
        title: 'Pipeline ETL avec Spark',
        description: "+10M d'événements/jour traités en quasi-temps réel avec Apache Spark et Delta Lake.",
        technologies: ['PySpark', 'Airflow', 'Azure Data Lake', 'Delta Lake'],
        duration: '2 mois',
        status: 'completed',
      },
      {
        title: 'Analyse de sentiment BERT',
        description: "Modèle BERT fine-tuné pour l'analyse de sentiment sur avis clients. Interface de visualisation pour le marketing.",
        technologies: ['Python', 'HuggingFace', 'BERT', 'FastAPI', 'React'],
        duration: '6 semaines',
        status: 'completed',
      },
    ],
  },
  {
    id: 's8',
    label: 'S8',
    period: 'Fév. 2024 – Juin 2024',
    color: '#CE93D8',
    glowColor: 'rgba(206, 147, 216, 0.6)',
    orbitRadius3D: 8.0,
    orbitDuration: 42,
    orbitAngleStart: 220,
    size3D: 0.34,
    moons: [
      { name: 'GraphQL', color: '#e535ab', orbitRadius: 0.65, orbitSpeed: 1.4, size: 0.08, angleOffset: 0.3 },
      { name: 'TypeScript', color: '#3178c6', orbitRadius: 0.80, orbitSpeed: 0.95, size: 0.07, angleOffset: 2.3 },
      { name: 'Elasticsearch', color: '#f04e98', orbitRadius: 0.95, orbitSpeed: 0.7, size: 0.07, angleOffset: 4.3 },
      { name: 'Terraform', color: '#7b42bc', orbitRadius: 1.1, orbitSpeed: 0.5, size: 0.06, angleOffset: 1.3 },
    ],
    entreprise: {
      name: 'La Poste Groupe',
      description: 'Responsabilité accrue. Lead technique sur un projet stratégique de transformation numérique.',
      team: "Référent technique dans une équipe de 12 personnes. Mentorat d'un alternant.",
      workMethod: 'Shape Up (cycles 6 semaines) + Kanban. Architecture Decision Records.',
      tools: ['TypeScript', 'Node.js', 'React', 'GraphQL', 'Redis', 'Elasticsearch', 'Terraform', 'AWS'],
    },
    ecole: {
      name: 'Polytech Nancy',
      formation: 'Cycle Ingénieur Informatique – 4ème année (suite)',
      description: "Approfondissement avec cours de recherche et début du projet de fin d'études.",
      courses: [
        { name: 'Systèmes Distribués Avancés', description: 'Consensus distribué, CAP theorem, CRDTs.' },
        { name: 'Sécurité des SD', description: 'Zero Trust, OAuth 2.0, OIDC, sécurité API.' },
        { name: 'DevOps & SRE', description: 'IaC, GitOps, SLO/SLI/SLA.' },
        { name: 'Innovation & Entrepreneuriat', description: 'Lean Startup, Design Thinking, propriété IP.' },
        { name: 'Anglais Technique', description: 'Communication pro en anglais, documentation technique.' },
      ],
      skills: ['GraphQL', 'TypeScript', 'IaC', 'SRE', 'Architecture Distribuée'],
    },
    missions: [
      {
        title: "Refonte de l'API Gateway",
        description: 'Nouvelle API Gateway centralisée avec GraphQL Federation. Auth, rate limiting, logging. Migration de 40+ services.',
        technologies: ['Node.js', 'GraphQL Federation', 'Apollo Server', 'Redis', 'Terraform', 'AWS'],
        duration: '4 mois',
        status: 'completed',
      },
      {
        title: 'Moteur de recherche intelligent',
        description: 'Elasticsearch pour recherche full-text et sémantique pour les agents postaux.',
        technologies: ['Elasticsearch', 'Python', 'FastAPI', 'React', 'TypeScript'],
        duration: '2 mois',
        status: 'completed',
      },
    ],
  },
  {
    id: 's9',
    label: 'S9',
    period: 'Sept. 2024 – Janv. 2025',
    color: '#EF5350',
    glowColor: 'rgba(239, 83, 80, 0.6)',
    orbitRadius3D: 9.5,
    orbitDuration: 52,
    orbitAngleStart: 80,
    size3D: 0.36,
    moons: [
      { name: 'Next.js', color: '#000000', orbitRadius: 0.65, orbitSpeed: 1.3, size: 0.08, angleOffset: 0.8 },
      { name: 'Storybook', color: '#ff4785', orbitRadius: 0.80, orbitSpeed: 0.9, size: 0.07, angleOffset: 2.8 },
      { name: 'Cypress', color: '#17202c', orbitRadius: 0.95, orbitSpeed: 0.65, size: 0.07, angleOffset: 4.8 },
      { name: 'LangChain', color: '#1c3c3c', orbitRadius: 1.1, orbitSpeed: 0.45, size: 0.06, angleOffset: 1.8 },
    ],
    entreprise: {
      name: 'La Poste Groupe',
      description: 'Refonte complète de la plateforme e-commerce nationale. Équipe distribuée Paris/Nancy.',
      team: 'Équipe produit 20 personnes. Tech Lead Frontend. Collaboration avec 3 équipes backend et UX.',
      workMethod: 'Dual-track Agile. Feature Flags pour déploiements progressifs.',
      tools: ['Next.js', 'React', 'TypeScript', 'Storybook', 'Cypress', 'Figma', 'Vercel'],
    },
    ecole: {
      name: 'Polytech Nancy',
      formation: 'Cycle Ingénieur Informatique – 5ème année',
      description: "Cours très spécialisés. Début du PFE. Préparation intensive à l'insertion pro.",
      courses: [
        { name: 'Gestion de Projet Avancée', description: 'PMI, gestion des risques, leadership technique.' },
        { name: 'IA Générative', description: 'LLMs, prompt engineering, RAG, fine-tuning.' },
        { name: 'Droit du Numérique', description: 'RGPD, cybersécurité légale, contrats informatiques.' },
        { name: "Stratégie d'Entreprise", description: 'Transformation digitale, innovation ouverte.' },
      ],
      skills: ['Next.js', 'Tests E2E', 'Storybook', 'Feature Flags', 'Tech Lead'],
    },
    missions: [
      {
        title: 'Refonte e-commerce La Poste',
        description:
          'Lead Frontend sur la refonte complète. Micro-frontend avec Module Federation. Design system Storybook. Tests E2E Cypress.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Module Federation', 'Storybook', 'Cypress'],
        duration: '5 mois',
        status: 'completed',
      },
      {
        title: 'Assistant IA service client',
        description: 'Chatbot GPT-4 + RAG sur base de connaissances interne. Réduction de 35% du volume de tickets support.',
        technologies: ['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI', 'React'],
        duration: '3 mois',
        status: 'completed',
      },
    ],
  },
  {
    id: 's10',
    label: 'S10',
    period: 'Fév. 2025 – Juin 2025',
    color: '#4DB6AC',
    glowColor: 'rgba(77, 182, 172, 0.6)',
    orbitRadius3D: 11.0,
    orbitDuration: 63,
    orbitAngleStart: 330,
    size3D: 0.38,
    moons: [
      { name: 'PyTorch', color: '#ee4c2c', orbitRadius: 0.65, orbitSpeed: 1.2, size: 0.08, angleOffset: 1.2 },
      { name: 'OR-Tools', color: '#4285f4', orbitRadius: 0.80, orbitSpeed: 0.85, size: 0.07, angleOffset: 3.2 },
      { name: 'MLOps', color: '#0194e2', orbitRadius: 0.95, orbitSpeed: 0.6, size: 0.07, angleOffset: 5.2 },
      { name: 'LaTeX', color: '#008080', orbitRadius: 1.1, orbitSpeed: 0.4, size: 0.06, angleOffset: 2.2 },
    ],
    entreprise: {
      name: 'La Poste Groupe',
      description: "Dernier semestre d'alternance. PFE en lien avec l'entreprise. Préparation à la soutenance et transition CDI.",
      team: "Retour dans l'équipe Data & IA. Collaboration avec laboratoire de recherche interne.",
      workMethod: 'Méthodologie de recherche appliquée. Réunions hebdomadaires tuteur + directeur académique.',
      tools: ['Python', 'PyTorch', 'Hugging Face', 'MLflow', 'Azure ML', 'LaTeX', 'Jupyter'],
    },
    ecole: {
      name: 'Polytech Nancy',
      formation: 'Cycle Ingénieur Informatique – 5ème année (PFE)',
      description: "Projet de Fin d'Études : recherche et développement sur 6 mois, soutenu devant jury mixte.",
      courses: [
        { name: "Projet de Fin d'Études", description: "Recherche et développement d'une solution innovante." },
        { name: 'Séminaire Recherche', description: 'Méthodologie de recherche, rédaction scientifique.' },
        { name: 'Soft Skills & Leadership', description: 'Communication, négociation, prise de parole.' },
        { name: 'Veille Technologique', description: 'Méthodes de veille, analyse de tendances.' },
      ],
      skills: ['Recherche Appliquée', 'Rédaction Scientifique', 'PyTorch', 'MLOps', 'Présentation'],
    },
    missions: [
      {
        title: 'PFE : Optimisation RL des tournées',
        description:
          'Reinforcement Learning (PPO) pour le Vehicle Routing Problem à grande échelle. Réduction théorique de 12% des distances.',
        technologies: ['Python', 'PyTorch', 'Stable Baselines3', 'OR-Tools', 'Gymnasium', 'MLflow'],
        duration: '6 mois',
        status: 'ongoing',
      },
      {
        title: 'Documentation & transfert de connaissances',
        description: "Documentation technique complète, guides d'onboarding, sessions de knowledge sharing.",
        technologies: ['Confluence', 'Markdown', 'Draw.io', 'Miro'],
        duration: '2 mois',
        status: 'ongoing',
      },
    ],
  },
]

export function getSemesterById(id: string): SemesterData | undefined {
  return semestersData.find((s) => s.id === id)
}

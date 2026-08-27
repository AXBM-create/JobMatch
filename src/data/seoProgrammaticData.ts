export interface AtsSystemData {
  slug: string;
  name: string;
  category: string;
  marketShare: string;
  typicalCompanies: string[];
  mainFilters: string[];
  keyRecommendations: string[];
  atsKeywordsToInclude: string[];
}

export interface JobRoleData {
  slug: string;
  title: string;
  category: string;
  description: string;
  topKeywords: string[];
  certifications: string[];
}

export const ATS_SYSTEMS_DATA: AtsSystemData[] = [
  {
    slug: "workday",
    name: "Workday Recruiting",
    category: "Entreprises & Grands Groupes",
    marketShare: "~26% des entreprises Fortune 500",
    typicalCompanies: ["Sanofi", "BNP Paribas", "Capgemini", "Amazon", "TotalEnergies"],
    mainFilters: [
      "Parsing strict des sections (Expérience, Formation, Compétences)",
      "Correspondance exacte des intitulés de postes et compétences clés",
      "Élimination des tableaux multi-colonnes et graphiques non textuels",
      "Reconnaissance des dates au format MM/AAAA standard"
    ],
    keyRecommendations: [
      "Utiliser un format de CV chronologique inversé sans colonnes imbriquées",
      "Répéter 2 à 3 fois les compétences clés de l'annonce dans le résumé et l'expérience",
      "Privilégier les fichiers PDF texte natifs ou Word DOCX",
      "Indiquer clairement le diplôme exact et l'intitulé normalisé"
    ],
    atsKeywordsToInclude: [
      "Gestion de projet", "KPIs", "Transformation digitale", "Agile", "Management transverse", "Budget"
    ]
  },
  {
    slug: "taleo",
    name: "Oracle Taleo",
    category: "Grands Groupes & Secteur Public",
    marketShare: "~18% des multinationales",
    typicalCompanies: ["L'Oréal", "Société Générale", "Thales", "Airbus", "Orange"],
    mainFilters: [
      "Recherche par mots-clés booléens (AND / OR) paramétrée par les RH",
      "Extraction automatique de l'historique salarial et années d'ancienneté",
      "Sensibilité au balisage de section (Headers & Bullet points)"
    ],
    keyRecommendations: [
      "Inclure une section 'Compétences Techniques & Certifications' dédiée",
      "Aligner les intitulés de diplômes sur la nomenclature internationale",
      "Quantifier chaque résultat clé avec des pourcentages et volumes concrets"
    ],
    atsKeywordsToInclude: [
      "Scrum Master", "Leadership", "CRM", "Reporting", "Stratégie", "Conduite du changement"
    ]
  },
  {
    slug: "greenhouse",
    name: "Greenhouse",
    category: "Scale-ups & Tech leaders",
    marketShare: "~22% de la Tech & Startups",
    typicalCompanies: ["Doctolib", "BlaBlaCar", "Spendesk", "Qonto", "Alan"],
    mainFilters: [
      "Scorecard d'évaluation basée sur les attributs de culture et compétences cibles",
      "Lecture fluide des formats modernes bien structurés",
      "Extraction des liens GitHub, LinkedIn, Portfolio"
    ],
    keyRecommendations: [
      "Mettre en avant les réalisations mesurables et les stacks techniques maîtrisées",
      "Adapter le ton de la lettre de motivation aux valeurs et à la mission d'entreprise",
      "Insérer des liens cliquables vérifiés vers vos réalisations publiques"
    ],
    atsKeywordsToInclude: [
      "Product Management", "React", "TypeScript", "Growth", "Product-Led Growth", "Data-driven"
    ]
  },
  {
    slug: "lever",
    name: "Lever",
    category: "Scale-ups & Entreprises Innovantes",
    marketShare: "~14% des entreprises Tech",
    typicalCompanies: ["Figma", "Spotify", "Netflix", "Datadog", "Pennylane"],
    mainFilters: [
      "Matching prédictif candidat-poste",
      "Analyse sémantique du résumé professionnel",
      "Tagging automatique des compétences secondaires"
    ],
    keyRecommendations: [
      "Rédiger une accroche professionnelle percutante reprenant le titre exact de l'annonce",
      "Structurer les expériences avec 'Contexte > Actions > Résultats chiffrés'",
      "Mentionner explicitement les environnements SaaS et outils collaboratifs"
    ],
    atsKeywordsToInclude: [
      "SaaS B2B", "API", "Customer Success", "UI/UX Design", "Figma", "Roadmap"
    ]
  }
];

export const JOB_ROLES_DATA: JobRoleData[] = [
  {
    slug: "product-designer",
    title: "Product Designer / UX-UI",
    category: "Design & Produit",
    description: "Modèle de CV optimisé ATS pour Product Designer avec mise en valeur du Design System, de la recherche utilisateur et des résultats de conversion.",
    topKeywords: ["Design System", "Figma", "User Research", "Wireframing", "Prototypage", "Tests Utilisateurs", "Accessibilité WCAG", "B2B SaaS"],
    certifications: ["Nielsen Norman Group UX", "Figma Advanced", "Interaction Design Foundation"]
  },
  {
    slug: "developpeur-fullstack",
    title: "Développeur Full-Stack",
    category: "Ingénierie & Tech",
    description: "Modèle de CV calibré pour passer les filtres techniques ATS avec structure claire pour stacks frontend, backend, DevOps et bases de données.",
    topKeywords: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "CI/CD", "Tailwind CSS", "Architecture microservices"],
    certifications: ["AWS Certified Developer", "Meta Frontend / Backend Developer", "CKA Kubernetes"]
  },
  {
    slug: "chef-de-projet-digital",
    title: "Chef de Projet Digital / Product Owner",
    category: "Management & Produit",
    description: "Modèle axé méthodologies agiles, pilotage de sprints, gestion de backlog et indicateurs ROI pour plateformes ATS.",
    topKeywords: ["Scrum", "Agile", "Jira", "Sprint Planning", "Backlog Grooming", "User Stories", "KPIs", "Gestion des parties prenantes"],
    certifications: ["PSPO I / II Scrum.org", "PMP PMI", "SAFe Agilist"]
  },
  {
    slug: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    category: "Marketing & Ventes",
    description: "Modèle de CV axé acquisition, conversion, tracking data et ROI publicitaire pour maximiser le match score ATS.",
    topKeywords: ["Acquisition SEA/SMA", "SEO", "Google Analytics 4", "A/B Testing", "HubSpot", "Copywriting", "Cac & LTV", "Funnel de conversion"],
    certifications: ["Google Ads Certified", "HubSpot Inbound Marketing", "Reforge Growth Series"]
  },
  {
    slug: "commercial-b2b",
    title: "Commercial B2B / Account Executive",
    category: "Commercial & Business Development",
    description: "Modèle de CV orienté atteinte des objectifs de CA, closing, prospection multi-canale et gestion de pipeline CRM.",
    topKeywords: ["Prospection B2B", "Salesforce", "Négociation", "Closing", "Pipeline Management", "Chiffre d'affaires", "Cycle de vente long", "Outbound"],
    certifications: ["MEDDPICC Certified", "HubSpot Sales Software", "Challenger Sale"]
  }
];

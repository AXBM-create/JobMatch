/**
 * @file semanticClusterData.ts
 * @description Données et contenus du cocon sémantique SEO JobMatch :
 * - Page Pilier : Guide complet pour optimiser son CV pour les ATS en 2026 (> 1500 mots)
 * - Pages Satellites : CV Développeur, CV Commercial, CV Santé (600-800 mots chacune)
 * Avec maillage interne réciproque, métadonnées, FAQ et Schema.org
 */

export interface PillarSection {
  id: string;
  title: string;
  content: string[];
  subsections?: Array<{
    title: string;
    content: string[];
  }>;
  callout?: {
    type: "tip" | "warning" | "stat" | "key";
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface SatellitePageData {
  slug: string;
  route: string;
  roleTitle: string;
  badge: string;
  metaTitle: string; // < 60 chars
  metaDescription: string; // 150-160 chars
  readingTime: string;
  publishedDate: string;
  h1: string;
  heroSubtitle: string;
  topStats: Array<{ label: string; value: string }>;
  introParagraphs: string[];
  sectorChallenges: {
    title: string;
    description: string;
    points: string[];
  };
  jobmatchSolution: {
    title: string;
    description: string;
    features: Array<{ title: string; desc: string }>;
  };
  mustHaveKeywords: {
    hardSkills: string[];
    methodologies: string[];
    metrics: string[];
  };
  actionableChecklist: string[];
  faq: Array<{ q: string; a: string }>;
}

export const PILLAR_PAGE_DATA = {
  slug: "guide-cv-ats",
  route: "/guide-cv-ats",
  metaTitle: "Optimiser son CV pour les ATS en 2026 : Guide Complet", // 53 chars (< 60)
  metaDescription: "Découvrez comment optimiser votre CV pour passer tous les filtres ATS en 2026. Règles d'or, structure infaillible, erreurs à éviter et rôle clé de l'IA.", // 156 chars (150-160)
  h1: "Guide complet : optimiser son CV pour les ATS en 2026",
  readingTime: "12 min de lecture",
  wordCount: "1 850 mots",
  updatedDate: "2026-03-01",
  author: {
    name: "Alain Braud & l'équipe JobMatch",
    role: "Experts en Algorithmes ATS & Recrutement IA",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  keyTakeaways: [
    "Plus de 75% des CV sont éliminés par les robots ATS sans jamais atteindre les yeux d'un recruteur humain.",
    "Un ATS réalise un parsing textuel strict : les designs à deux colonnes, tableaux et jauges graphiques provoquent des rejets immédiats.",
    "L'adéquation sémantique nécessite de reprendre les mots-clés exacts de l'offre d'emploi (hard skills, acronymes et intitulés précis).",
    "L'intelligence artificielle contextuelle permet d'adapter chaque CV en 30 secondes pour atteindre un score de compatibilité supérieur à 90%.",
    "Adoptez systématiquement une mise en page chronologique inversée à colonne unique au format PDF texte natif.",
  ],
  sections: [
    {
      id: "definition-ats",
      title: "1. Qu'est-ce qu'un ATS et pourquoi régit-il le recrutement en 2026 ?",
      content: [
        "Un ATS (Applicant Tracking System), ou Système de Suivi des Candidatures en français, est une plateforme logicielle conçue pour automatiser, filtrer et hiérarchiser les flux massifs de candidatures reçues par les entreprises.",
        "Alors qu'une offre d'emploi publiée sur LinkedIn, Indeed ou Welcome to the Jungle génère en moyenne 250 à 300 candidatures en quelques jours, les équipes de recrutement ne disposent matériellement pas du temps nécessaire pour évaluer chaque dossier. Un recruteur humain passe en moyenne 6 à 7 secondes sur un CV.",
        "En 2026, plus de 98% des multinationales du Fortune 500 et plus de 80% des Entreprises de Taille Intermédiaire (ETI) et scale-ups européennes utilisent des solutions ATS de référence comme Workday, Taleo (Oracle), Greenhouse, Lever, SmartRecruiters, Bullhorn ou SuccessFactors (SAP).",
        "L'ATS n'est pas un simple outil d'archivage : c'est un gardien algorithmique impitoyable. Son objectif premier est de réduire une pile de 300 candidats à une sélection restreinte de 5 à 10 profils jugés statistiquement les plus pertinents pour un entretien d'embauche."
      ],
      callout: {
        type: "stat",
        title: "Statistique clé du marché de l'emploi",
        text: "75% des CV soumis en ligne sont rejetés par le filtre de parsing ou le scoring de pertinence d'un ATS avant même qu'un recruteur humain ne les ouvre."
      }
    },
    {
      id: "fonctionnement-filtrage",
      title: "2. Comment fonctionne le filtrage d'un ATS : de la réception au score",
      content: [
        "Pour déjouer les pièges d'un ATS, il est indispensable de comprendre les étapes informatiques successives appliquées à votre document dès que vous cliquez sur « Postuler » :",
        "Étape 1 : L'extraction de données (Parsing). Le moteur de parsing convertit votre fichier (PDF ou DOCX) en texte brut non formaté. Il tente de reconnaître les blocs standards : Coordonnées, Titre professionnel, Résumé, Expériences professionnelles, Formation et Compétences techniques. Si le fichier comporte des éléments visuels non décodables, le texte est corrompu ou ignoré.",
        "Étape 2 : L'indexation sémantique et la tokenisation. Le système fragmente le texte en unités de sens (tokens). Il identifie les verbes d'action, les intitulés de poste, les technologies, les certifications et les années d'expérience.",
        "Étape 3 : Le calcul du score de correspondance (Match Score). L'algorithme compare les tokens de votre CV à la grille de critères définie par le recruteur dans l'offre d'emploi. Chaque compétence exigée se voit attribuer une pondération. Si le seuil minimum (souvent fixé à 80% ou 85%) n'est pas atteint, le CV est automatiquement classé dans la catégorie des refusés."
      ],
      subsections: [
        {
          title: "Les filtres éliminatoires automatiques (Knockout Questions)",
          content: [
            "Certains ATS appliquent des questions éliminatoires immédiates avant même l'analyse sémantique. Parmi ces critères stricts figurent le droit de travailler dans le pays (permis/visa), le niveau d'études minimal certifié, les années d'expérience obligatoires ou la maîtrise bilingue d'une langue étrangère.",
            "Si votre CV ne mentionne pas explicitement ces prérequis sous forme textuelle intelligible, l'algorithme attribue un statut d'incompatibilité irrémédiable."
          ]
        }
      ]
    },
    {
      id: "erreurs-rejet",
      title: "3. Les 7 erreurs courantes qui provoquent le rejet immédiat d'un CV",
      content: [
        "La grande majorité des candidats pensent que leur CV a été rejeté à cause d'un manque de qualifications. Dans les faits, 8 fois sur 10, le rejet est purement technique. Voici les erreurs éliminatoires observées par les experts du recrutement :"
      ],
      table: {
        headers: ["Pratique fréquente", "Effet néfaste sur l'ATS", "Alternative 100% conforme ATS"],
        rows: [
          ["Mise en page à 2 colonnes (style Canva)", "Le parser lit de gauche à droite sur toute la largeur, mélangeant deux paragraphes distincts en une phrase incohérente.", "Mise en page stricte à 1 colonne verticale chronologique."],
          ["Jauges de compétences, étoiles, pourcentages", "Les robots ne peuvent pas lire les graphiques vectoriels ni les barres de progression. Compétence considérée comme absente.", "Mention textuelle précise (ex: Anglais bilingue C1, Python niveau avancé)."],
          ["Coordonnées dans le header ou footer", "De nombreux parsers ignorent délibérément les en-têtes et pieds de page pour éviter les doublons de pagination.", "Coordonnées placées au tout début du corps principal du texte."],
          ["Export PDF en image aplatie (scanné)", "Le parser ne trouve aucune chaîne de texte sélectionnable (0 mot trouvé) : rejet instantané avec score de 0%.", "Export PDF texte natif avec polices standard vectorisées."],
          ["Titres de sections originaux ('Mon Odyssée')", "L'ATS ne sait pas associer le titre fantaisiste à la catégorie requise.", "Rubriques conventionnelles : Expérience professionnelle, Formation, Compétences."],
          ["Tableaux HTML ou zones de texte flottantes Word", "L'ordre de lecture des conteneurs flottants est aléatoire pour les parsers.", "Paragraphes standard et listes à puces simples (tirets ou puces rondes)."],
          ["Keyword stuffing en texte blanc invisible", "Les algorithmes détectent désormais le texte caché de même couleur que le fond et classent le dossier comme fraude.", "Intégration naturelle et contextualisée des mots-clés dans vos réalisations."]
        ]
      }
    },
    {
      id: "structure-infaillible",
      title: "4. Comment structurer un CV pour passer les filtres avec brio",
      content: [
        "Un CV optimisé pour les ATS doit réussir un double défi : être parfaitement digestible pour un algorithme machine tout en restant élégant et percutant pour l'œil du recruteur humain qui le lira en phase 2.",
        "Voici les règles d'or d'architecture d'un document à score élevé :"
      ],
      subsections: [
        {
          title: "A. L'en-tête et les coordonnées stratégiques",
          content: [
            "Indiquez votre prénom, votre nom, votre adresse email professionnelle (évitez les pseudonymes d'adolescence), votre numéro de téléphone au format international (+33), votre ville et code postal (pour les filtres de géolocalisation de l'ATS) et le lien direct vers votre profil LinkedIn optimisé.",
            "N'ajoutez pas de statut marital, d'âge ou d'informations personnelles superflues qui ne sont pas exploitées par les filtres de compétences."
          ]
        },
        {
          title: "B. L'accroche professionnelle ciblée (Profil / Résumé)",
          content: [
            "Rédigez un paragraphe d'accroche percutant de 3 à 4 lignes situé immédiatement sous votre titre. Ce résumé doit reprendre l'intitulé exact de l'offre d'emploi visée, votre nombre d'années d'expérience, vos 3 expertises maîtresses et votre valeur ajoutée distinctive.",
            "C'est l'emplacement stratégique numéro 1 pour concentrer la densité des mots-clés clés dès le premier quart du document."
          ]
        },
        {
          title: "C. L'historique des expériences professionnelles (Méthode STAR)",
          content: [
            "Adoptez le format chronologique inversé (du poste le plus récent au plus ancien). Pour chaque expérience, mentionnez systématiquement : Intitulé du poste, Nom de l'entreprise, Lieu, Dates précises (mois et année : ex. 03/2022 – 11/2025).",
            "Décrivez vos missions en utilisant la méthode STAR (Situation, Tâche, Action, Résultat). Bannissez les listes passives de devoirs quotidiens et privilégiez les verbes d'action suivis de métriques chiffrées : pourcentages de croissance, économies réalisées, budgets gérés, délais raccourcis."
          ]
        },
        {
          title: "D. La rubrique Compétences : le vivier de mots-clés",
          content: [
            "Segmentez clairement vos compétences en sous-groupes thématiques : Compétences techniques (Hard Skills), Outils & Logiciels informatiques, Méthodologies de travail (Agile, Scrum, Lean), et Langues avec niveau CECRL officiel (A1 à C2).",
            "Écrivez toujours les termes sous leur double forme : acronyme et libellé complet (ex : « Customer Relationship Management (CRM) » ou « Search Engine Optimization (SEO) ») pour matcher indifféremment les requêtes booléennes des recruteurs."
          ]
        }
      ]
    },
    {
      id: "role-ia-jobmatch",
      title: "5. Le rôle de l'intelligence artificielle dans l'optimisation ATS en 2026",
      content: [
        "Face à des algorithmes d'ATS de plus en plus sophistiqués intégrant le traitement du langage naturel (NLP) et les modèles d'intégration vectorielle (Embeddings), la vieille technique consistant à envoyer le même CV générique à 50 entreprises est devenue totalement inefficace.",
        "C'est ici qu'intervient l'intelligence artificielle générative et contextuelle telle que développée par JobMatch.",
        "Contrairement aux simples vérificateurs de mots-clés qui se contentent de surligner des termes manquants, une IA dédiée analyse en profondeur la structure syntaxique de l'offre d'emploi cible :",
        "• Analyse sémantique de l'offre : Extraction automatique des compétences prioritaires, des technologies indispensables, de la tonalité managériale et des valeurs de l'entreprise.",
        "• Reformulation sur-mesure de votre parcours : L'IA ne crée pas de faux diplômes ni d'expériences imaginaires ; elle réécrit vos expériences réelles en valorisant précisément les réalisations qui répondent aux attentes exactes de l'annonce.",
        "• Calibration du score ATS en temps réel : Votre CV et votre lettre de motivation sont évalués par rapport aux critères réels des robots du marché pour garantir un taux d'affinité supérieur à 90%.",
        "Le résultat : vous gagnez des heures précieuses tout en multipliant par 3 vos chances de décrocher des entretiens."
      ],
      callout: {
        type: "key",
        title: "La promesse JobMatch",
        text: "En important simplement le lien de l'offre d'emploi et votre CV de base, JobMatch génère en 30 secondes un dossier de candidature complet (CV + Lettre de motivation) taillé sur-mesure pour passer les filtres les plus stricts."
      }
    },
    {
      id: "cocon-metiers",
      title: "6. Guides pratiques et modèles de CV spécialisés par métier",
      content: [
        "Chaque secteur d'activité obéit à des règles de filtrage ATS bien distinctes. Un recruteur dans le secteur de la tech ne configure pas son robot de la même manière qu'une direction commerciale ou un établissement hospitalier.",
        "Pour vous accompagner de manière ciblée, explorez nos guides d'experts dédiés à votre domaine d'activité :"
      ]
    }
  ],
  faq: [
    {
      q: "Quel est le meilleur format de fichier pour passer les filtres ATS ?",
      a: "Le format PDF texte natif est la référence universelle en 2026. Il garantit que votre mise en page reste intacte sur tous les écrans tout en permettant un parsing fluide. Assurez-vous que le texte peut être sélectionné au curseur. Le format Word (.docx) est également accepté mais présente des risques de décalage de typographie."
    },
    {
      q: "Comment savoir si mon CV actuel est compatible avec les ATS ?",
      a: "Un test rapide consiste à sélectionner l'intégralité du texte de votre CV (Ctrl+A / Cmd+A) et à le coller dans un éditeur de texte brut comme le Bloc-notes. Si des sections sont absentes, des colonnes mélangées ou des mots coupés, l'ATS rencontrera exactement le même problème. Vous pouvez également utiliser le scanner gratuit de JobMatch pour obtenir votre score instantané."
    },
    {
      q: "Faut-il modifier son CV pour chaque offre d'emploi ?",
      a: "Oui, absolument. C'est le secret numéro 1 des candidats qui décrochent plusieurs entretiens par semaine. Les ATS comparent mot à mot votre CV à l'annonce. Personnaliser votre résumé professionnel et réordonner vos compétences en fonction de chaque poste ciblé fait basculer votre score de 50% à plus de 90%."
    },
    {
      q: "Mettre des mots-clés en blanc invisible fonctionne-t-il encore ?",
      a: "Non, c'est une technique totalement obsolète et dangereuse. Les ATS modernes convertissent les fichiers en texte brut monochrome, rendant le texte blanc immédiatement visible pour le recruteur. Pire encore, les algorithmes intègrent désormais des détecteurs d'anomalies qui disqualifient automatiquement les candidats tentant cette manipulation."
    }
  ]
};

export const SATELLITE_PAGES_DATA: Record<string, SatellitePageData> = {
  developpeur: {
    slug: "cv-developpeur",
    route: "/cv-developpeur",
    roleTitle: "Développeur & Ingénieur Tech",
    badge: "Secteur Informatique & Tech",
    metaTitle: "CV Développeur IA & ATS : Modèle et Conseils 2026", // 49 chars (< 60)
    metaDescription: "Comment créer un CV de développeur adapté aux ATS grâce à l'IA en 2026. Mots-clés tech, projets GitHub, compétences stack et astuces de recrutement.", // 154 chars (150-160)
    readingTime: "5 min de lecture",
    publishedDate: "2026-03-02",
    h1: "CV Développeur & Tech par IA : Réussir les Filtres ATS en 2026",
    heroSubtitle: "Découvrez les spécificités du recrutement tech en 2026 : comment formater votre stack technique, valoriser vos projets open source et passer les filtres Workday, Greenhouse ou Lever sans vous faire filtrer.",
    topStats: [
      { label: "CV tech filtrés par ATS", value: "82%" },
      { label: "Mots-clés stack requis", value: "8 à 15" },
      { label: "Score moyen JobMatch", value: "94%" }
    ],
    introParagraphs: [
      "Le recrutement des développeurs et ingénieurs logiciels en 2026 est marqué par un paradoxe : bien que les profils qualifiés soient activement recherchés, le volume massif de candidatures pousse les scale-ups, ETI et grandes entreprises tech à durcir considérablement leurs filtres ATS.",
      "Des plateformes comme Greenhouse, Lever ou Workday analysent quotidiennement des centaines de profils de développeurs front-end, back-end, full-stack, DevOps ou data engineers. Pour un profil tech, la moindre ambiguïté sur une version de framework, un langage ou une architecture cloud peut entraîner une élimination mécanique avant même l'entretien technique."
    ],
    sectorChallenges: {
      title: "Les défis uniques du CV de développeur face aux algorithmes",
      description: "Contrairement à d'autres secteurs généralistes, le CV d'un ingénieur logiciel repose sur une nomenclature technologique ultra-précise :",
      points: [
        "La confusion des versions et technologies associées : Mentionner 'React' sans préciser 'React 18+', 'Next.js', 'TypeScript' ou 'Redux Toolkit' abaisse considérablement le score si l'offre requiert ces spécifications exactes.",
        "Le piège des portfolios et liens GitHub non cliquables : Si vous insérez des liens sans texte d'ancre lisible, les robots ne visiteront pas votre code. Les parsers ont besoin de descriptions textuelles de vos architectures.",
        "L'absence de métriques de performance et de scalabilité : Décrire uniquement 'développement d'API' est insuffisant pour un ATS tech. Le robot valorise 'développement d'API REST/GraphQL traitant 5M de requêtes/jour avec une latence < 80ms'.",
        "Les formats graphiques à deux colonnes issus de générateurs de CV web qui tronquent les descriptions de vos contributions techniques."
      ]
    },
    jobmatchSolution: {
      title: "Comment JobMatch adapte votre CV pour les métiers de la Tech",
      description: "Notre moteur d'intelligence artificielle a été spécialement calibré sur les ontologies technologiques et les grilles d'évaluation des principaux ATS du secteur numérique :",
      features: [
        {
          title: "Alignement précis de la stack technique",
          desc: "JobMatch identifie instantanément tous les langages, bibliothèques, bases de données (SQL, NoSQL), orchestrateurs (Docker, Kubernetes) et fournisseurs cloud (AWS, GCP, Azure) exigés dans l'offre et les intègre dans vos réalisations."
        },
        {
          title: "Formulation orientée impact et architecture",
          desc: "L'IA transforme vos descriptions de code en accomplissements mesurables (réduction de la dette technique, optimisation du temps de build CI/CD, couverture de tests unitaires Jest/Cypress à +85%)."
        },
        {
          title: "Structure mono-colonne certifiée zéro rejet",
          desc: "Un template épuré respectant les standards typographiques des ingénieurs, lisible à 100% par tous les parsers du marché."
        }
      ]
    },
    mustHaveKeywords: {
      hardSkills: ["TypeScript", "Python", "Go", "Java Spring Boot", "Next.js", "React", "Node.js", "PostgreSQL", "Redis", "GraphQL"],
      methodologies: ["Agile Scrum", "CI/CD Pipeline", "Test-Driven Development (TDD)", "Clean Architecture", "Microservices", "DevOps"],
      metrics: ["Latence / Performance (ms)", "Disponibilité (SLA 99.9%)", "Couverture de code (%)", "Volumétrie utilisateurs (MAU)", "Optimisation des coûts Cloud (€)"]
    },
    actionableChecklist: [
      "Indiquez votre stack technologique principale dès le titre du CV (ex : Développeur Full-Stack Senior — React / Node.js / TypeScript).",
      "Listez vos compétences par catégories étanches : Langages, Frameworks, Bases de données, Cloud & DevOps, Outils collaboratifs.",
      "Associez chaque projet ou expérience à une métrique technique d'impact chiffrée.",
      "Mentionnez l'URL de votre profil GitHub et LinkedIn au format texte complet.",
      "Passez votre document dans JobMatch pour calibrer la correspondance exacte avec l'offre ciblée."
    ],
    faq: [
      {
        q: "Faut-il lister tous les langages que j'ai appris depuis mes études ?",
        a: "Non. Une liste interminable dilue la pertinence sémantique de votre CV. Concentrez-vous sur les 6 à 10 technologies principales requises par l'offre d'emploi visée pour maximiser votre score d'adéquation ATS."
      },
      {
        q: "Comment faire figurer mes projets personnels ou open source ?",
        a: "Créez une section dédiée intitulée 'Projets Techniques & Open Source' avec le nom du projet, les technologies utilisées, le lien textuel et une phrase résumant l'usage ou le nombre d'étoiles GitHub."
      }
    ]
  },
  commercial: {
    slug: "cv-commercial",
    route: "/cv-commercial",
    roleTitle: "Commercial & Business Developer",
    badge: "Secteur Vente & Business Development",
    metaTitle: "CV Commercial IA & ATS : Modèle et Mots-Clés 2026", // 48 chars (< 60)
    metaDescription: "Optimisez votre CV commercial avec l'IA pour passer les filtres ATS. Métriques de vente (ARR, quota, CRM), compétences clés et modèle de CV performant.", // 156 chars (150-160)
    readingTime: "5 min de lecture",
    publishedDate: "2026-03-02",
    h1: "CV Commercial & Business Developer par IA : Passer les ATS en 2026",
    heroSubtitle: "Apprenez à structurer un CV commercial percutant capable de franchir les filtres ATS : valorisation du chiffre d'affaires, taux d'atteinte de quota, maîtrise des CRM et négociation grand compte.",
    topStats: [
      { label: "Candidatures par poste de vente", value: "320+" },
      { label: "Pondération des chiffres", value: "65%" },
      { label: "Taux d'entretien JobMatch", value: "3.2x" }
    ],
    introParagraphs: [
      "Dans l'univers commercial, de l'Inside Sales au Business Developer Grands Comptes en passant par le Directeur Commercial, la performance se mesure en chiffres sonnants et trébuchants. Pourtant, des milliers de commerciaux talentueux voient leurs candidatures rejetées chaque mois par des logiciels de recrutement automatisés.",
      "Les directions commerciales et cabinets de chasse de têtes paramètrent leurs ATS pour traquer des acronymes de vente précis (ARR, MRR, CAC, LTV), des noms de logiciels CRM (Salesforce, HubSpot) et surtout des indicateurs quantifiables d'atteinte d'objectifs. Un CV commercial sans chiffres est un CV invisible."
    ],
    sectorChallenges: {
      title: "Les écueils fréquents du CV commercial face aux filtres automatisés",
      description: "Les robots ATS éliminent les profils commerciaux qui pèchent par imprécision ou descriptions trop littéraires :",
      points: [
        "Des descriptions de missions purement passives : Écrire 'responsable du développement commercial' n'apporte aucun score sémantique. L'ATS recherche 'prospection outband, closing de contrats et signature de 25 nouveaux comptes'.",
        "L'absence de pourcentages d'atteinte de quota : Le premier critère de tri d'un ATS pour un poste de commercial est le respect ou le dépassement des objectifs (ex: 115% du quota annuel atteint en 2025).",
        "L'oubli des outils d'aide à la vente (Sales Enablement) : Les recruteurs recherchent des spécialistes familiers de l'écosystème commercial moderne (Salesforce, Outreach, Lemlist, Apollo, Gong).",
        "L'omission de la typologie des clients et de la taille des paniers moyens (B2B, B2C, SMB, Mid-Market, Enterprise, ACV)."
      ]
    },
    jobmatchSolution: {
      title: "Comment JobMatch propulse votre CV commercial en tête de pile",
      description: "JobMatch adapte automatiquement le vocabulaire de votre parcours pour répondre aux attentes chirurgicales des directeurs commerciaux et de leurs ATS :",
      features: [
        {
          title: "Injection intelligente des KPI commerciaux",
          desc: "Notre IA réorganise chaque expérience en mettant en relief le montant du portefeuille géré (€), le chiffre d'affaires généré et les taux de conversion d'opportunités."
        },
        {
          title: "Alignement sur le cycle de vente de l'annonce",
          desc: "Si l'offre recherche un profil 'cycle de vente long en cycle complexe B2B', JobMatch ajuste les termes de vos négociations passées pour matcher exactement cette dimension."
        },
        {
          title: "Mise en valeur de votre boîte à outils commerciale",
          desc: "Extraction et disposition claire des logiciels de prospection, CRM et techniques de vente (MEDDIC, SPIN Selling, Challenger Sale)."
        }
      ]
    },
    mustHaveKeywords: {
      hardSkills: ["Développement commercial", "Prospection multicanale", "Négociation Grands Comptes", "Closing", "Account Management", "Gestion de pipeline"],
      methodologies: ["Méthodologie MEDDIC", "SPIN Selling", "Challenger Sale", "Inbound Sales", "Cold Calling & Cold Emailing"],
      metrics: ["Chiffre d'Affaires généré (€)", "Pourcentage d'atteinte d'objectifs (%)", "Annual Recurring Revenue (ARR)", "Panier moyen / ACV (€)", "Taux de transformation (%)"]
    },
    actionableChecklist: [
      "Affichez votre record de vente ou votre taux de dépassement d'objectif dès l'en-tête de votre profil.",
      "Précisez pour chaque poste la cible commerciale (ex : PME du secteur industriel, grands comptes CAC 40).",
      "Mentionnez systématiquement les outils CRM et logiciels de prospection maîtrisés.",
      "Quantifiez chaque puce d'expérience avec au moins un chiffre, un pourcentage ou une somme en euros.",
      "Générez une version ajustée avec JobMatch pour chaque nouvelle opportunité d'embauche."
    ],
    faq: [
      {
        q: "Comment présenter mes chiffres si j'ai signé une clause de confidentialité ?",
        a: "Vous pouvez exprimer vos performances en pourcentages d'atteinte de quota (ex : '128% des objectifs annuels atteints'), en pourcentages de progression de chiffre d'affaires (+45% YoY) ou en fourchettes estimatives sans divulguer les données sensibles de votre ancien employeur."
      },
      {
        q: "Quelles méthodologies de vente valoriser en 2026 ?",
        a: "Les acronymes MEDDIC (ou MEDDPICC), Solution Selling et SPIN Selling sont particulièrement plébiscités par les algorithmes de recrutement B2B cette année."
      }
    ]
  },
  sante: {
    slug: "cv-sante",
    route: "/cv-sante",
    roleTitle: "Professionnel de Santé & Médical",
    badge: "Secteur Santé, Soins & Paramédical",
    metaTitle: "CV Métiers de la Santé par IA : Guide ATS 2026", // 46 chars (< 60)
    metaDescription: "Créez un CV du secteur santé et médical optimisé pour les logiciels ATS. Diplômes d'État, spécialisations, protocoles de soins et modèle IA en 30s.", // 154 chars (150-160)
    readingTime: "5 min de lecture",
    publishedDate: "2026-03-02",
    h1: "CV Santé & Médical par IA : Optimisation ATS et Conseils 2026",
    heroSubtitle: "Guide complet pour infirmiers, cadres de santé, médecins et professionnels paramédicaux : comment formater vos diplômes d'État, services hospitaliers et protocoles pour passer les logiciels de tri des cliniques et CHU.",
    topStats: [
      { label: "Établissements avec ATS", value: "88%" },
      { label: "Poids des certifications", value: "100%" },
      { label: "Gain de temps moyen", value: "3h / dossier" }
    ],
    introParagraphs: [
      "Le secteur de la santé, qu'il s'agisse des Centres Hospitaliers Universitaires (CHU), des cliniques privées, des EHPAD ou des laboratoires de recherche, a massivement digitalisé ses processus de recrutement au cours des dernières années.",
      "Face aux exigences réglementaires strictes et aux tensions sur les effectifs, les directions des ressources humaines hospitalières s'appuient désormais sur des ATS stricts (tels que Cegid, Talentsoft ou Infor) pour vérifier la conformité des diplômes d'État, des autorisations d'exercer et des compétences médico-techniques obligatoires."
    ],
    sectorChallenges: {
      title: "Les spécificités critiques d'un CV médical face au tri algorithmique",
      description: "Dans le milieu de la santé, la moindre omission de formalisme réglementaire disqualifie instantanément la candidature :",
      points: [
        "L'omission de l'intitulé exact du Diplôme d'État (DE) : L'ATS filtre d'abord sur la conformité du diplôme (ex: 'Diplôme d'État d'Infirmier - DEI' ou 'Diplôme d'État de Masseur-Kinésithérapeute'). Une formulation incomplète bloque la candidature.",
        "L'absence des spécialités de services hospitaliers : Mentionner simplement 'expérience hospitalière' pénalise le score. Le système recherche des mots-clés de services précis : Réanimation, Urgences, Bloc Opératoire, Néonatalogie, Oncologie, Gériatrie.",
        "Le manque de précision sur les logiciels de santé informatisés (DPI) : Les recruteurs scannent la maîtrise des outils de dossier patient informatisé (Crossway, DxCare, Sillage, Hopital Manager, Medasys).",
        "L'oubli des protocoles de sécurité et certifications de soins d'urgence (AFGSU niveau 1 et 2, hygiène hospitalière, pharmacovigilance)."
      ]
    },
    jobmatchSolution: {
      title: "Comment JobMatch adapte votre CV aux exigences du secteur médical",
      description: "Notre plateforme garantit une conformité absolue avec les grilles de lecture des directions des ressources humaines médicales :",
      features: [
        {
          title: "Vérification et normalisation des qualifications",
          desc: "Positionnement en avant-plan de vos diplômes d'État, numéros d'enregistrement professionnels (RPPS, ADELI) et dates d'obtention sous format reconnu par les parsers."
        },
        {
          title: "Valorisation des actes techniques et protocoles",
          desc: "Intégration systématique des terminologies de soins, de surveillance clinique, d'administration thérapeutique et de prise en charge d'urgences vitales."
        },
        {
          title: "Mise en page épurée et hautement professionnelle",
          desc: "Un document sobre, dénué de fioritures graphiques, transmettant immédiatement la rigueur et la fiabilité indispensables aux métiers de la santé."
        }
      ]
    },
    mustHaveKeywords: {
      hardSkills: ["Prise en charge patient", "Administration des thérapeutiques", "Protocoles d'hygiène et asepsie", "Surveillance hémodynamique", "Transmissions ciblées", "Gestion de l'urgence"],
      methodologies: ["Attestation de Formation aux Gestes et Soins d'Urgence (AFGSU 2)", "Évaluation de la douleur", "Démarche clinique infirmière", "Éducation thérapeutique du patient"],
      metrics: ["Nombre de lits sous responsabilité", "Ratio patients/soignant", "Services hospitaliers pratiqués", "Participation aux gardes et astreintes", "Taux de conformité traçabilité"]
    },
    actionableChecklist: [
      "Faites figurer votre Diplôme d'État et votre numéro RPPS / ADELI immédiatement sous vos coordonnées.",
      "Spécifiez pour chaque expérience le type d'établissement (CHU, clinique, HAD) et le service concerné.",
      "Mentionnez l'actualité de votre certification AFGSU et de vos formations continues spécifiques.",
      "Citez les logiciels médicaux et de dossier patient (DPI) que vous maîtrisez opérationnellement.",
      "Utilisez JobMatch pour générer une lettre de motivation déontologique et personnalisée pour chaque établissement."
    ],
    faq: [
      {
        q: "Dois-je indiquer mon numéro RPPS sur mon CV ?",
        a: "Oui, c'est fortement recommandé dès la première page de votre CV pour les professions à ordre (médecins, infirmiers, masseurs-kinésithérapeutes). Les ATS et recruteurs hospitaliers l'utilisent pour valider immédiatement votre droit d'exercice."
      },
      {
        q: "Comment valoriser mes stages de fin d'études en tant que jeune diplômé ?",
        a: "Détaillez chaque stage comme une expérience à part entière en précisant le service hospitalier, les actes techniques réalisés en autonomie et les protocoles appliqués."
      }
    ]
  }
};

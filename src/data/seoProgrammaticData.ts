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

export interface LongTailGuideSection {
  title: string;
  content: string[];
  callout?: {
    type: "tip" | "warning" | "example" | "stat";
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface LongTailGuideData {
  slug: string;
  targetKeyword: string;
  title: string;
  metaDescription: string;
  readingTime: string;
  category: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  intro: string;
  sections: LongTailGuideSection[];
  keyTakeaways: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const LONG_TAIL_GUIDES_DATA: LongTailGuideData[] = [
  {
    slug: "comment-passer-les-filtres-ats",
    targetKeyword: "comment passer les filtres ATS",
    title: "Comment passer les filtres ATS en 2026 : Le Guide Complet Anti-Rejet",
    metaDescription: "Découvrez comment passer les filtres ATS (Workday, Taleo, Greenhouse). Règles de mise en page, choix des mots-clés, erreurs éliminatoires et astuces d'experts.",
    readingTime: "6 min de lecture",
    category: "Guide Pratique ATS",
    publishedDate: "2026-02-28",
    author: {
      name: "Équipe Recrutement JobMatch AI",
      role: "Experts en Algorithmes ATS & RH",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    intro: "Savez-vous que plus de 75% des CV sont rejetés automatiquement par les logiciels de recrutement (ATS) avant même qu'un recruteur humain ne pose les yeux dessus ? Si vous envoyez des dizaines de candidatures sans recevoir de réponse, le problème ne vient probablement pas de vos compétences, mais de la compatibilité technique de votre CV avec les robots de tri.",
    keyTakeaways: [
      "Utilisez toujours un format chronologique inversé à colonne unique pour garantir un parsing 100% lisible.",
      "Identifiez et insérez 5 à 10 mots-clés exacts de l'offre d'emploi dans votre résumé et vos expériences.",
      "Bannissez les jauges de niveau graphiques, tableaux Canva, icônes complexes et boîtes de texte flottantes.",
      "Quantifiez systématiquement vos réalisations avec des chiffres précis (%, €, volumes d'utilisateurs).",
      "Nommez votre fichier au format standard 'Prenom_Nom_CV_IntitulePoste.pdf'."
    ],
    sections: [
      {
        title: "1. Qu'est-ce qu'un ATS et comment fonctionne-t-il ?",
        content: [
          "Un ATS (Applicant Tracking System), ou système de suivi des candidatures, est un logiciel utilisé par plus de 98% des entreprises du Fortune 500 et la quasi-totalité des ETI et scale-ups pour automatiser la réception et le tri des CV.",
          "Dès que vous soumettez votre dossier en ligne (sur Workday, Taleo, Greenhouse, Lever ou SmartRecruiters), le robot effectue une opération appelée le 'parsing' : il découpe votre CV en sections brutes (Identité, Expériences, Compétences, Diplômes) et extrait les mots-clés textuels pour calculer un score d'adéquation avec l'offre d'emploi.",
          "Si votre score de correspondance est inférieur au seuil fixé par le recruteur (souvent 80% ou 85%), votre candidature est classée dans les refus automatiques sans lecture humaine."
        ],
        callout: {
          type: "stat",
          title: "Chiffre clé du recrutement",
          text: "Pour une seule offre d'emploi, un recruteur reçoit en moyenne 250 CVs. L'ATS filtre automatiquement 180 à 200 profils, et le recruteur ne consulte en détail que les 5 à 10 meilleurs scores."
        }
      },
      {
        title: "2. Les 6 règles d'or de mise en page pour un CV 100% compatible ATS",
        content: [
          "Pour vous assurer que le parser de l'ATS extrait correctement chaque ligne de votre parcours, vous devez respecter une structure propre et standardisée :",
          "• Privilégiez une mise en page à colonne unique : Les mises en page complexes sur deux ou trois colonnes créent des erreurs de lecture où l'ATS mélange le texte de gauche et de droite.",
          "• Utilisez des en-têtes de sections conventionnels : Nommez vos rubriques 'Expérience professionnelle', 'Formation', 'Compétences' et 'Langues'. Évitez les titres créatifs comme 'Mon Odyssée' ou 'Mes Talents' que les algorithmes ne savent pas catégoriser.",
          "• Adoptez des polices de caractères standards : Utilisez Arial, Helvetica, Calibri, Roboto ou Inter. Les polices personnalisées ou décoratives ne sont pas toujours encodées correctement lors de la conversion.",
          "• Bannissez les tableaux et boîtes de texte flottantes : Le parser ignore fréquemment le texte inséré dans les cellules de tableau ou les formes graphiques.",
          "• Évitez les informations cruciales dans le header ou footer : Beaucoup d'ATS ignorent les en-têtes et pieds de page pour éviter les répétitions. Placez vos coordonnées dans le corps principal.",
          "• Fournissez un fichier PDF texte natif ou Word .docx : Vérifiez que vous pouvez sélectionner et copier le texte de votre PDF avec votre souris. Si le texte n'est pas sélectionnable, c'est une image non indexable."
        ],
        table: {
          headers: ["Élément", "Recommandé pour ATS", "À proscrire absolument"],
          rows: [
            ["Structure", "1 colonne verticale hiérarchisée", "2 ou 3 colonnes imbriquées"],
            ["Compétences", "Liste à puces avec mots-clés exacts", "Jauges de compétences, étoiles, barres de pourcentage"],
            ["Format date", "MM/AAAA (ex: 03/2022 - 11/2024)", "Dates imprécises ou formats fantaisistes"],
            ["En-têtes", "Titres standards (Expérience, Formation)", "Titres poétiques ou icônes sans texte"]
          ]
        }
      },
      {
        title: "3. La stratégie sémantique : Comment cibler les mots-clés de l'annonce",
        content: [
          "L'ATS n'évalue pas seulement la forme, mais avant tout la densité et la pertinence sémantique de vos mots-clés. Voici comment procéder pour chaque offre ciblée :",
          "1. Analysez attentivement l'offre d'emploi : Relevez les 10 compétences techniques (hard skills), méthodologies (ex: Agile, Scrum, Lean) et outils logiciels (ex: Salesforce, Figma, React, Jira) mentionnés.",
          "2. Utilisez la même terminologie que l'employeur : Si l'annonce stipule 'Chef de projet digital', n'écrivez pas uniquement 'Responsable web'. Mentionnez l'intitulé exact dans votre titre de profil.",
          "3. Répétez naturellement les compétences clés : Un mot-clé important doit apparaître au minimum 2 à 3 fois dans votre CV (une fois dans le résumé d'accroche, puis dans le détail de vos réalisations professionnelles).",
          "4. Intégrez à la fois les acronymes et les termes complets : Écrivez par exemple 'Search Engine Optimization (SEO)' ou 'Gestion de la relation client (CRM)' pour couvrir toutes les requêtes booléennes des recruteurs."
        ],
        callout: {
          type: "tip",
          title: "Conseil d'expert",
          text: "N'essayez jamais le 'bourrage de mots-clés en texte blanc' (white fonting). Les ATS modernes détectent cette technique frauduleuse et éliminent immédiatement votre candidature avec un flag anti-spam."
        }
      },
      {
        title: "4. Formulez vos puces d'expérience avec des résultats quantifiés",
        content: [
          "Les algorithmes ATS attribuent une note de pertinence supérieure aux puces d'action contenant des métriques mesurables. Utilisez la célèbre formule préconisée par les recruteurs de Google :",
          "'Accompli [Action concrète] mesuré par [Chiffre ou Pourcentage], en utilisant [Compétence technique ou Méthodologie]'.",
          "Exemples de transformation à fort impact :",
          "• Faible : 'Responsable de l'amélioration du site web et de la prospection commerciale.'",
          "• Optimisé ATS : 'Pilotage de la refonte UX/UI et optimisation du tunnel d'acquisition, entraînant une hausse de +34% du taux de conversion et 120 000€ de chiffre d'affaires additionnel.'"
        ]
      },
      {
        title: "5. Comment tester et optimiser votre CV en 30 secondes",
        content: [
          "Pour éviter de passer des heures à reformuler manuellement votre CV pour chaque annonce, l'utilisation d'une intelligence artificielle spécialisée comme JobMatch AI vous permet d'automatiser cette tâche tout en garantissant un score supérieur à 90%.",
          "L'outil analyse instantanément le texte de l'annonce cible, compare votre profil initial et réécrit vos expériences avec les formulations les plus valorisantes pour les logiciels ATS et les recruteurs humains."
        ]
      }
    ],
    faq: [
      {
        question: "Le format PDF est-il accepté par tous les filtres ATS ?",
        answer: "Oui, à condition qu'il s'agisse d'un PDF texte natif (vectoriel) généré depuis un traitement de texte et non d'une image scannée. Le format DOCX est également très bien toléré."
      },
      {
        question: "Dois-je modifier mon CV pour chaque candidature ?",
        answer: "Absolument. Chaque entreprise utilise des critères et des formulations différentes. Adapter votre CV à l'annonce augmente votre taux de réponse de plus de 300%."
      },
      {
        question: "Les barres de compétences ou étoiles sont-elles lisibles par l'ATS ?",
        answer: "Non. Les robots ATS sont incapables d'interpréter les jauges graphiques ou les étoiles de notation. Indiquez vos compétences sous forme de texte clair ou précisez votre niveau (ex: Anglais - Courant / Bilingue)."
      }
    ]
  },
  {
    slug: "exemple-de-cv-optimise-ia",
    targetKeyword: "exemple de CV optimisé IA",
    title: "Exemple de CV Optimisé par l'IA : Avant / Après et Modèle Concret",
    metaDescription: "Consultez un exemple complet de CV optimisé par l'intelligence artificielle pour passer les filtres ATS. Analyse comparative Avant/Après et score de matching.",
    readingTime: "5 min de lecture",
    category: "Étude de Cas & Modèles",
    publishedDate: "2026-02-28",
    author: {
      name: "Thomas Laurent",
      role: "Lead Product & Recrutement JobMatch",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    intro: "À quoi ressemble réellement un CV optimisé par l'intelligence artificielle ? Pourquoi un même profil peut-il passer d'un taux de rejet de 90% à 3 invitations d'entretien en 48 heures simplement en ajustant la formulation de ses expériences ? Découvrez notre étude de cas comparative détaillée.",
    keyTakeaways: [
      "Un CV optimisé par IA remplace les descriptions de tâches passives par des réalisations chiffrées orientées ROI.",
      "Le résumé professionnel est immédiatement aligné sur les défis majeurs de l'entreprise cible.",
      "Les compétences clés de l'annonce sont intégrées dans le contexte réel des missions passées sans inventer d'expérience.",
      "La structure est épurée pour maximiser la lisibilité à la fois pour l'algorithme ATS et pour le recruteur pressé (6 secondes d'attention moyenne)."
    ],
    sections: [
      {
        title: "1. Comparatif Avant / Après : La transformation d'un profil",
        content: [
          "Examinons le cas d'Alexandre, Chef de projet digital avec 5 ans d'expérience postulant chez un grand groupe bancaire utilisant le logiciel Workday.",
          "Voici la comparaison directe entre sa version initiale générique et sa version optimisée par l'algorithme de JobMatch AI :"
        ],
        table: {
          headers: ["Critère", "CV Classique (Avant)", "CV Optimisé IA JobMatch (Après)"],
          rows: [
            ["Score ATS", "42% (Rejet automatique probable)", "96% (Mise en avant en tête de pile)"],
            ["Titre du profil", "Chef de projet dynamique", "Chef de Projet Digital & Transformation Agile | Scrum Master"],
            ["Résumé d'accroche", "'Professionnel motivé cherchant un nouveau challenge dans une entreprise innovante...'", "'Chef de projet digital avec 5 ans d'expérience dans le pilotage de plateformes SaaS et la gestion de budgets > 500k€. Expert Agile Scrum orienté ROI.'"],
            ["Description mission", "'Gestion de l'équipe et organisation des réunions de suivi.'", "'Coordination d'une équipe cross-fonctionnelle de 8 développeurs et designers, livraison de 12 sprints dans les délais avec une réduction de 25% du time-to-market.'"],
            ["Compétences", "Gestion de projet, Word, Communication", "Jira, Scrum, Product Roadmapping, Budget 500k€, KPIs, Change Management, SQL"]
          ]
        }
      },
      {
        title: "2. Les 3 leviers de l'intelligence artificielle pour booster votre CV",
        content: [
          "Pourquoi l'IA parvient-elle à créer un impact si fort sur les recruteurs et les algorithmes ? Elle active 3 leviers fondamentaux :",
          "• 1. L'alignement sémantique instantané : L'IA identifie les mots-clés prioritaires de l'annonce et les intègre de manière fluide et contextuelle dans votre parcours.",
          "• 2. La valorisation de la posture professionnelle : Elle remplace le jargon passif ('aidé à', 'participé à') par des verbes d'action puissants ('piloté', 'conçu', 'accéléré', 'négocié').",
          "• 3. La mise en valeur des métriques de succès : L'IA structure chaque point fort autour de l'impact mesurable, ce que recherchent activement 100% des managers recruteurs."
        ],
        callout: {
          type: "example",
          title: "Exemple de reformulation IA en direct",
          text: "Texte brut candidat : 'J'ai travaillé sur le SEO du site et écrit des articles.'\nReformulation IA JobMatch : 'Élaboration et déploiement d'une stratégie SEO de contenu ayant généré +140% de trafic organique mensuel et positionné 45 mots-clés stratégiques en Top 3 Google.'"
        }
      },
      {
        title: "3. Exemple complet de modèle de CV prêt à l'emploi",
        content: [
          "Voici la structure type générée par JobMatch AI, parfaitement reconnue par les parsers Workday, Taleo, Greenhouse et Lever :",
          "1. En-tête sobre : Nom, Prénom, Titre aligné sur l'offre, Ville, Email, Téléphone, Lien LinkedIn personnalisé.",
          "2. Résumé exécutif (3 lignes percutantes) : Positionnement professionnel, années d'expérience, réalisations phares et adéquation avec les défis de l'employeur.",
          "3. Compétences & Outils clés : Hard skills, méthodologies et outils logiciels sous forme de tags textuels clairs.",
          "4. Expériences professionnelles (chronologique inversé) : Intitulé précis, Entreprise, Période (MM/AAAA - MM/AAAA), 3 à 5 réalisations chiffrées avec verbes d'action.",
          "5. Formation & Certifications : Diplômes normalisés, école, année d'obtention et certifications professionnelles reconnues."
        ]
      },
      {
        title: "4. Générer votre CV sur-mesure en 30 secondes",
        content: [
          "Vous souhaitez appliquer cette méthode à votre propre profil ? Avec JobMatch AI, il vous suffit de coller le texte de votre offre d'emploi cible pour obtenir votre CV personnalisé et votre lettre de motivation en 30 secondes."
        ]
      }
    ],
    faq: [
      {
        question: "L'IA invente-t-elle des expériences ou diplômes sur mon CV ?",
        answer: "Non. JobMatch AI s'appuie exclusivement sur votre parcours réel. Il reformule, structure et met en valeur vos véritables compétences sans jamais créer de fausses informations."
      },
      {
        question: "Est-ce visible par le recruteur que le CV a été optimisé par IA ?",
        answer: "Le résultat est rédigé dans un français professionnel, élégant et naturel. Le recruteur verra simplement une candidature particulièrement soignée, claire et parfaitement ciblée."
      },
      {
        question: "Combien de candidatures puis-je générer gratuitement ?",
        answer: "Vous bénéficiez d'un essai complet offert sans carte bancaire, incluant la génération de votre CV optimisé et de votre lettre de motivation prête à l'envoi."
      }
    ]
  },
  {
    slug: "lettre-de-motivation-automatique-gratuite",
    targetKeyword: "lettre de motivation automatique gratuite",
    title: "Lettre de Motivation Automatique Gratuite : Générer en 30s par IA",
    metaDescription: "Créez une lettre de motivation automatique gratuite et 100% personnalisée grâce à l'intelligence artificielle. Adaptez votre discours à chaque recruteur en 30 secondes.",
    readingTime: "5 min de lecture",
    category: "Générateur & Conseils",
    publishedDate: "2026-02-28",
    author: {
      name: "Sarah Marchand",
      role: "Responsable Carrière & Acquisition",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    intro: "Rédiger une lettre de motivation est souvent l'étape la plus chronophage et redoutée d'une recherche d'emploi. Passer 2 heures à écrire une lettre pour chaque annonce entraîne de la frustration et pousse souvent aux copier-coller génériques que les recruteurs repèrent en 3 secondes. Grâce aux générateurs de lettre de motivation automatique par IA, vous pouvez désormais concevoir une lettre unique et ultra-ciblée en moins de 30 secondes.",
    keyTakeaways: [
      "Les recruteurs rejettent instantanément les modèles types trouvés sur Internet car ils manquent de personnalisation concrète.",
      "La structure gagnante d'une lettre de motivation moderne repose sur le triptyque 'VOUS - MOI - NOUS'.",
      "L'IA analyse la culture et les projets de l'entreprise cible pour créer une accroche sur-mesure percutante.",
      "Avec JobMatch AI, générez gratuitement votre première lettre de motivation complète sans renseigner de carte bancaire."
    ],
    sections: [
      {
        title: "1. Pourquoi les modèles de lettre de motivation traditionnels échouent",
        content: [
          "Les formules toutes faites comme 'Actuellement à la recherche d'un emploi, je me permets de vous soumettre ma candidature...' sont lues des milliers de fois par les recruteurs. Elles envoient un signal négatif : un manque d'intérêt spécifique pour l'entreprise.",
          "À l'inverse, une lettre de motivation performante doit prouver 3 choses dès les premières lignes :",
          "1. Vous avez compris les défis et projets de l'entreprise.",
          "2. Vos réussites passées correspondent exactement à leurs besoins actuels.",
          "3. Vous partagez leur vision et souhaitez vous investir activement dans leur croissance."
        ],
        callout: {
          type: "warning",
          title: "Piège fréquent à éviter",
          text: "Ne répétez pas bêtement votre CV dans votre lettre de motivation. Le CV liste vos faits et compétences, tandis que la lettre raconte votre motivation et démontre pourquoi vous êtes la solution aux enjeux de l'équipe."
        }
      },
      {
        title: "2. La structure infaillible 'Vous - Moi - Nous'",
        content: [
          "Une lettre de motivation percutante se divise en 3 paragraphes structurés :",
          "• Paragraphe 1 : 'VOUS' (L'accroche et l'entreprise) : Mentionnez une actualité, une levée de fonds, un nouveau produit ou la réputation de l'entreprise pour montrer que vous avez fait vos recherches.",
          "• Paragraphe 2 : 'MOI' (La valeur ajoutée et les résultats) : Mettez en avant 1 ou 2 réalisations majeures en lien direct avec le poste, appuyées par des chiffres concrets.",
          "• Paragraphe 3 : 'NOUS' (La projection commune & l'appel à l'action) : Proposez une rencontre ou un échange téléphonique pour discuter des prochaines étapes du projet."
        ]
      },
      {
        title: "3. Exemple de lettre automatique générée par JobMatch AI",
        content: [
          "Voici un exemple de lettre générée en 25 secondes par notre modèle IA pour un poste de Responsable Marketing Digital :",
          "----------------------------------------",
          "Madame, Monsieur,",
          "Ayant suivi avec enthousiasme le récent lancement de votre nouvelle gamme éco-responsable et votre développement à l'international, c'est avec un vif intérêt que je vous soumets ma candidature au poste de Responsable Marketing Digital au sein de [Nom Entreprise].",
          "Au cours de mes 4 années d'expérience en acquisition digitale, j'ai notamment piloté des campagnes multi-canales ayant généré une hausse de +45% de leads qualifiés tout en réduisant le coût d'acquisition de 18%. Mon expertise sur le SEO, les Google Ads et l'analyse de données me permettra d'être immédiatement opérationnel pour accélérer votre visibilité sur vos marchés clés.",
          "Rejoindre vos équipes serait l'opportunité de mettre mon dynamisme et ma rigueur au service de vos objectifs ambitieux. Je serais ravi de vous rencontrer lors d'un entretien pour échanger sur la mise en œuvre de votre stratégie d'acquisition.",
          "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
          "----------------------------------------"
        ]
      },
      {
        title: "4. Comment générer votre lettre automatique gratuite en 3 clics",
        content: [
          "1. Rendez-vous sur le générateur JobMatch AI (aucun compte bancaire requis).",
          "2. Collez le texte ou le lien de l'offre d'emploi qui vous intéresse.",
          "3. Renseignez brièvement votre profil ou importez votre CV existant.",
          "4. Cliquez sur 'Générer' : votre lettre personnalisée et votre CV optimisé ATS sont prêts en 30 secondes."
        ]
      }
    ],
    faq: [
      {
        question: "Est-ce vraiment gratuit pour générer ma lettre de motivation ?",
        answer: "Oui, JobMatch offre 1 génération complète (CV + Lettre de motivation) sans carte de crédit pour vous permettre de tester la puissance de l'outil."
      },
      {
        question: "Puis-je modifier le texte de la lettre générée ?",
        answer: "Oui, notre éditeur interactif vous permet d'ajuster chaque phrase, de changer le ton (formel, dynamique, moderne) ou de régénérer des paragraphes spécifiques en un clic."
      },
      {
        question: "Quels formats d'exportation sont disponibles ?",
        answer: "Vous pouvez exporter votre lettre de motivation en format PDF haute définition prêt à l'envoi ou copier le texte brut pour vos candidatures par email."
      }
    ]
  }
];

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


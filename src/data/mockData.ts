import { ApplicationResult } from "../types";

export const DEFAULT_ALEXANDRE_DUBOIS: ApplicationResult = {
  id: "app-default-1",
  createdAt: "2023-10-24T10:30:00.000Z",
  targetJob: {
    title: "Lead Product Designer",
    company: "InnovateTech Labs",
    location: "Paris, France",
    description: "Nous recherchons un Lead Product Designer pour piloter la refonte de notre plateforme SaaS, diriger une équipe de 4 designers et concevoir des visualisations analytiques d'IA accessibles.",
  },
  matchScore: 92,
  matchSummary: "Excellente adéquation (92%) avec les attentes d'InnovateTech Labs en design SaaS, leadership de design systems et métriques de rétention.",
  matchedKeywords: [
    "Design Systems",
    "SaaS Platforms",
    "User Research",
    "Figma",
    "Cross-functional Leadership",
    "User Retention",
    "UI/UX Architecture",
  ],
  missingKeywords: ["AI Analytics Visualization", "Mobile Native App"],
  tailoringAdvice: [
    "Impact quantifié de +24% de rétention mis en avant au premier plan.",
    "Management d'une équipe de 4 designers directement valorisé.",
    "Lettre de motivation orientée sur l'analytique et la clarté des interfaces complexes.",
  ],
  language: "en",
  tone: "Professionnel & Axé Résultats",
  resume: {
    personalInfo: {
      fullName: "Alexandre Dubois",
      title: "Senior Product Designer • Paris, France • alexandre@example.com",
      location: "Paris, France",
      email: "alexandre@example.com",
      phone: "+33 6 12 34 56 78",
      linkedin: "linkedin.com/in/alexandredubois",
      website: "alexandredubois.design",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    summary: "Strategic designer with 8+ years of experience bridging user needs and business goals. Proven track record of leading design systems and cross-functional teams to deliver impactful digital products.",
    experiences: [
      {
        id: "exp-1",
        role: "Lead UX Designer",
        company: "TechNova Solutions",
        period: "2021 - Present",
        highlights: [
          "Spearheaded the redesign of the core SaaS platform, increasing user retention by 24%.",
          "Managed a team of 4 designers, establishing a unified design system.",
        ],
        aiNote: "Aligné avec le leadership et le besoin SaaS d'InnovateTech",
      },
      {
        id: "exp-2",
        role: "Senior UI Designer",
        company: "CreativeFlow Agency",
        period: "2018 - 2021",
        highlights: [
          "Delivered end-to-end design solutions for Fortune 500 e-commerce clients.",
        ],
        aiNote: "Démontre une expertise clients et rigueur UI",
      },
    ],
    education: [
      {
        id: "edu-1",
        degree: "Master of Interaction Design",
        school: "Gobelins Paris",
        year: "2018",
        details: "Graduated with honors • Focus on Enterprise UI Systems",
      },
    ],
    skills: [
      "Figma & Design Tokens",
      "Design Systems Architecture",
      "User Research & Testing",
      "Data-Driven UX & A/B Testing",
      "SaaS Product Strategy",
      "Cross-functional Collaboration",
    ],
    languages: ["French (Native)", "English (Fluent - C1)"],
    certifications: ["Nielsen Norman Group UX Master Certified"],
  },
  coverLetter: {
    date: "October 24, 2023",
    recipient: {
      name: "Hiring Manager",
      title: "Head of Design Recruitment",
      company: "InnovateTech Labs",
      address: "123 Innovation Drive",
    },
    salutation: "Dear Hiring Manager,",
    paragraphs: [
      "I am writing to express my strong interest in the Lead Product Designer position at InnovateTech Labs. With a proven history of designing intuitive, user-centric interfaces and leading robust design systems, I am excited about the opportunity to contribute to your innovative product suite.",
      "In my current role at TechNova Solutions, I successfully led the redesign of our core platform, which resulted in a 24% increase in user retention. This experience, combined with my ability to align design strategy with business objectives, positions me well to drive meaningful impact at InnovateTech.",
      "I am particularly drawn to your recent work on AI-driven analytics tools, as it aligns perfectly with my passion for creating accessible complex data visualizations.",
      "Thank you for considering my application. I look forward to the possibility of discussing how my design expertise can support your team's goals.",
    ],
    signOff: "Sincerely,",
    signerName: "Alexandre Dubois",
    signerTitle: "Senior Product Designer",
  },
};

export const PRESET_PROFILES = [
  {
    id: "alexandre",
    name: "Alexandre Dubois",
    title: "Senior Product Designer",
    email: "alexandre@example.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    summary: "Strategic designer with 8+ years of experience bridging user needs and business goals. Proven track record of leading design systems and cross-functional teams to deliver impactful digital products.",
    experienceText: `Lead UX Designer @ TechNova Solutions (2021 - Present)
- Spearheaded the redesign of the core SaaS platform, increasing user retention by 24%.
- Managed a team of 4 designers, establishing a unified design system.

Senior UI Designer @ CreativeFlow Agency (2018 - 2021)
- Delivered end-to-end design solutions for Fortune 500 e-commerce clients.
- Led user testing workshops across 12 client engagements.`,
    skillsText: "Figma, Design Systems, UX Research, Prototyping, SaaS UX, Design Tokens, Mentoring",
    educationText: "Master of Interaction Design - Gobelins Paris (2018)",
  },
  {
    id: "sarah",
    name: "Sarah Benali",
    title: "Lead Full Stack & AI Engineer",
    email: "sarah.benali@techdev.io",
    phone: "+33 7 88 99 00 11",
    location: "Lyon, France / Remote",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    summary: "Ingénieure Full Stack avec 6 ans d'expertise dans les architectures réactives, le scaling de microservices et l'intégration de modèles LLM génératifs.",
    experienceText: `Senior Software Engineer @ CloudScale (2022 - Présent)
- Architecture et déploiement d'APIs temps réel traitant plus de 5M req/jour.
- Intégration de pipelines GenAI réduisant le temps de traitement de 40%.

Full Stack Developer @ NextWave Studio (2019 - 2022)
- Développement d'applications React / Node.js avec couverture de tests de 95%.`,
    skillsText: "TypeScript, React, Node.js, Python, PostgreSQL, Gemini API, Docker, AWS, GraphQL",
    educationText: "Diplôme d'Ingénieur en Informatique - INSA Lyon (2019)",
  },
  {
    id: "thomas",
    name: "Thomas Laurent",
    title: "Senior Product Manager",
    email: "thomas.laurent@growthhub.com",
    phone: "+33 6 44 55 66 77",
    location: "Bordeaux, France",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    summary: "Product Manager B2B SaaS spécialisé dans l'activation, le product-led growth (PLG) et la monétisation avec 7 ans d'expérience.",
    experienceText: `Product Lead @ ScaleMetrics (2021 - Présent)
- Pilotage de la roadmap produit ayant généré +1.8M€ d'ARR additionnel en 18 mois.
- Coordination d'une squad pluridisciplinaire de 8 ingénieurs et 2 designers.`,
    skillsText: "Product Strategy, PLG, User Analytics, Jira, SQL, A/B Testing, Scrum, OKRs",
    educationText: "Master en Management Technologique - HEC Paris (2017)",
  },
];

export const PRESET_JOBS = [
  {
    id: "innovatetech",
    jobTitle: "Lead Product Designer",
    companyName: "InnovateTech Labs",
    companyAddress: "123 Innovation Drive, Paris",
    hiringManagerName: "Hiring Manager",
    jobDescription: `InnovateTech Labs recherche un Lead Product Designer expérimenté pour orchestrer la refonte de sa suite logicielle SaaS B2B.
Vos missions principales :
- Structurer et faire évoluer notre design system global sous Figma.
- Diriger et encadrer une équipe de 4 designers talentueux.
- Collaborer étroitement avec les équipes produit et ingénierie pour intégrer des fonctionnalités d'analytique basée sur l'IA.
- Maximiser la rétention utilisateur et la simplicité de prise en main.
Profil recherché : 5+ ans d'expérience en design de produits digitaux SaaS, maîtrise du design system, sensibilité forte à la data et aux technologies émergentes.`,
  },
  {
    id: "stripe",
    jobTitle: "Staff Software Engineer - AI Platform",
    companyName: "FinTech Global",
    companyAddress: "45 Rue de la Bourse, Paris",
    hiringManagerName: "Directeur de l'Ingénierie",
    jobDescription: `Nous recrutons un Staff Software Engineer pour concevoir les moteurs de transactions et les copilotes d'IA financière de nouvelle génération.
Responsabilités :
- Concevoir des architectures scalables, fiables et à ultra-faible latence.
- Intégrer les LLMs pour automatiser la détection des anomalies et le reporting financier.
- Mentorat technique des ingénieurs juniors et seniors.
Exigences : TypeScript/Node.js ou Python, expérience solide sur les systèmes distribués et les intégrations d'IA.`,
  },
  {
    id: "doctolib",
    jobTitle: "Head of Product - SaaS Healthcare",
    companyName: "MediCare Tech",
    companyAddress: "10 Avenue de l'Opéra, Paris",
    hiringManagerName: "Chief Product Officer",
    jobDescription: `Rejoignez notre mission pour digitaliser le parcours patient et praticien.
Missions :
- Définir la vision produit et les OKRs pour nos modules B2B.
- Piloter l'expérience utilisateur et les métriques de conversion.
- Évangéliser la culture produit data-driven.`,
  },
];

/**
 * Single source of truth for the site's canonical domain.
 */
const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;
const envSiteUrl = metaEnv?.VITE_SITE_URL ? String(metaEnv.VITE_SITE_URL).trim() : "";

export const SITE_URL = envSiteUrl
  ? (envSiteUrl.includes("jobmatch.company") ? "https://www.jobmatch.company" : envSiteUrl.replace(/\/$/, ""))
  : "https://www.jobmatch.company";

export interface PageMetadataConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  robots?: string;
  jsonLd?: Record<string, any>;
}

export interface NextLikeMetadata {
  title: string;
  description: string;
  keywords: string[];
  alternates: {
    canonical: string;
    languages: Record<string, string>;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  robots: string;
}

export const METADATA_DICTIONARY: Record<string, PageMetadataConfig> = {
  landing: {
    title: "JobMatch — Générateur de CV & Lettre de Motivation par IA | jobmatch.company",
    description: "L'intelligence artificielle analyse l'offre d'emploi cible et adapte automatiquement votre CV et lettre de motivation pour passer les filtres ATS et décrocher 3x plus d'entretiens.",
    keywords: [
      "optimisation CV ATS",
      "générateur CV IA",
      "lettre de motivation personnalisée",
      "filtre ATS recrutement",
      "score ATS",
      "JobMatch",
      "jobmatch.company"
    ],
    canonicalUrl: `${SITE_URL}/`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  pricing: {
    title: "Tarifs & Formules — JobMatch | Accès Gratuit & Pro Illimité (jobmatch.company)",
    description: "Découvrez nos formules transparentes pour booster vos candidatures. 1 candidature complète offerte, formule Pro Illimitée à 14,90€/mois et pack sans engagement.",
    keywords: [
      "prix JobMatch",
      "tarifs optimisation CV",
      "abonnement IA CV",
      "CV gratuit sans carte",
      "pack candidatures",
      "jobmatch.company"
    ],
    canonicalUrl: `${SITE_URL}/pricing`,
    ogImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  onboarding: {
    title: "Générateur de CV & Lettre ATS en 30s — JobMatch (jobmatch.company)",
    description: "Collez le lien de votre offre LinkedIn, Indeed ou Welcome to the Jungle et uploadez votre CV actuel pour obtenir instantanément un profil optimisé à +90% ATS.",
    keywords: [
      "créer CV offre emploi",
      "adapter CV LinkedIn",
      "générer lettre IA",
      "scanner offre emploi",
      "test compatibilité ATS"
    ],
    canonicalUrl: `${SITE_URL}/onboarding`,
    ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  history: {
    title: "Mes Candidatures — JobMatch (jobmatch.company)",
    description: "Accédez à l'historique de vos CVs et lettres de motivation optimisés, modifiez vos versions et suivez vos envois.",
    keywords: ["tableau de bord", "mes candidatures", "suivi recrutement"],
    canonicalUrl: `${SITE_URL}/history`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "noindex, nofollow",
  },
  "ats-test": {
    title: "Testeur de Score ATS Gratuit — Scanner de CV en Ligne | JobMatch",
    description: "Testez gratuitement la compatibilité de votre CV avec une annonce d'emploi. Obtenez votre note sur 100 et identifiez les mots-clés manquants pour franchir les filtres Workday, Taleo et Greenhouse.",
    keywords: [
      "test score ATS",
      "scanner CV gratuit",
      "compatibilité ATS",
      "mots-clés CV robot",
      "passer filtre Workday"
    ],
    canonicalUrl: `${SITE_URL}/test-score-ats`,
    ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  guides: {
    title: "Guides ATS & Recrutement 2026 — Conseils & Décryptage | JobMatch",
    description: "Guides pratiques et articles d'experts pour comprendre le fonctionnement des filtres ATS (Workday, Taleo, Greenhouse, Lever) et optimiser vos candidatures par métier.",
    keywords: [
      "guides ATS",
      "fonctionnement logiciel recrutement",
      "conseils CV 2026",
      "comment passer les ATS",
      "modèles de CV par métier"
    ],
    canonicalUrl: `${SITE_URL}/guides`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  "guide-comment-passer-les-filtres-ats": {
    title: "Comment passer les filtres ATS en 2026 : Le Guide Complet Anti-Rejet | JobMatch",
    description: "Découvrez la méthode étape par étape pour passer les filtres ATS (Workday, Taleo, Greenhouse). Règles de mise en page, choix des mots-clés et erreurs éliminatoires.",
    keywords: [
      "comment passer les filtres ATS",
      "logiciel ATS recrutement",
      "score CV ATS",
      "optimisation CV Workday",
      "contourner filtre robot CV"
    ],
    canonicalUrl: `${SITE_URL}/guides/comment-passer-les-filtres-ats`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  "guide-exemple-de-cv-optimise-ia": {
    title: "Exemple de CV Optimisé par l'IA : Avant / Après et Modèle Concret | JobMatch",
    description: "Consultez un exemple concret de CV optimisé par l'intelligence artificielle pour franchir les filtres de recrutement. Analyse comparative Avant/Après et score ATS.",
    keywords: [
      "exemple de CV optimisé IA",
      "CV généré par intelligence artificielle",
      "modèle CV IA 2026",
      "score ATS exemple",
      "CV adapté offre emploi"
    ],
    canonicalUrl: `${SITE_URL}/guides/exemple-de-cv-optimise-ia`,
    ogImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  "guide-lettre-de-motivation-automatique-gratuite": {
    title: "Lettre de Motivation Automatique Gratuite : Générer en 30s par IA | JobMatch",
    description: "Créez une lettre de motivation personnalisée et automatique en 30 secondes grâce à l'IA. Essai gratuit sans carte bancaire, adaptée à chaque offre d'emploi.",
    keywords: [
      "lettre de motivation automatique gratuite",
      "générateur lettre de motivation IA",
      "lettre motivation personnalisée gratuite",
      "IA lettre de motivation",
      "rédiger lettre motivation 30s"
    ],
    canonicalUrl: `${SITE_URL}/guides/lettre-de-motivation-automatique-gratuite`,
    ogImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  "mentions-legales": {
    title: "Mentions Légales — JobMatch (jobmatch.company)",
    description: "Consultez les mentions légales de JobMatch, éditeur du générateur de CV et lettre de motivation optimisés ATS sur jobmatch.company.",
    keywords: ["mentions légales", "éditeur JobMatch", "informations légales", "jobmatch.company"],
    canonicalUrl: `${SITE_URL}/mentions-legales`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  "politique-confidentialite": {
    title: "Politique de Confidentialité & RGPD — JobMatch (jobmatch.company)",
    description: "Découvrez nos engagements de confidentialité, de sécurité des données et notre conformité RGPD stricte sur jobmatch.company.",
    keywords: ["politique de confidentialité", "RGPD", "protection données CV", "jobmatch.company"],
    canonicalUrl: `${SITE_URL}/politique-confidentialite`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  cgv: {
    title: "Conditions Générales de Vente (CGV) — JobMatch (jobmatch.company)",
    description: "Conditions générales de vente et d'utilisation du service de génération de CV par IA JobMatch sur jobmatch.company.",
    keywords: ["conditions générales de vente", "CGV", "CGU", "jobmatch.company"],
    canonicalUrl: `${SITE_URL}/cgv`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  "guide-cv-ats": {
    title: "Optimiser son CV pour les ATS en 2026 : Guide Complet",
    description: "Découvrez comment optimiser votre CV pour passer tous les filtres ATS en 2026. Règles d'or, structure infaillible, erreurs à éviter et rôle clé de l'IA.",
    keywords: [
      "optimiser son CV pour les ATS",
      "filtres ATS 2026",
      "guide complet CV ATS",
      "logiciel recrutement ATS",
      "score CV ATS",
      "JobMatch",
      "jobmatch.company"
    ],
    canonicalUrl: `${SITE_URL}/guide-cv-ats`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Guide complet : optimiser son CV pour les ATS en 2026",
      "name": "Optimiser son CV pour les ATS en 2026 : Guide Complet",
      "description": "Découvrez comment optimiser votre CV pour passer tous les filtres ATS en 2026. Règles d'or, structure infaillible, erreurs à éviter et rôle clé de l'IA.",
      "datePublished": "2026-03-01T08:00:00+01:00",
      "dateModified": "2026-03-01T08:00:00+01:00",
      "author": {
        "@type": "Organization",
        "name": "JobMatch",
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "JobMatch",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo.png`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/guide-cv-ats`
      }
    }
  },
  "cv-developpeur": {
    title: "CV Développeur IA & ATS : Modèle et Conseils 2026",
    description: "Comment créer un CV de développeur adapté aux ATS grâce à l'IA en 2026. Mots-clés tech, projets GitHub, compétences stack et astuces de recrutement.",
    keywords: [
      "CV développeur IA",
      "CV tech ATS",
      "modèle CV ingénieur logiciel",
      "mots clés CV développeur",
      "JobMatch"
    ],
    canonicalUrl: `${SITE_URL}/cv-developpeur`,
    ogImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "CV Développeur & Tech par IA : Réussir les Filtres ATS en 2026",
      "name": "CV Développeur IA & ATS : Modèle et Conseils 2026",
      "description": "Comment créer un CV de développeur adapté aux ATS grâce à l'IA en 2026. Mots-clés tech, projets GitHub, compétences stack et astuces de recrutement.",
      "datePublished": "2026-03-02T09:00:00+01:00",
      "dateModified": "2026-03-02T09:00:00+01:00",
      "author": {
        "@type": "Organization",
        "name": "JobMatch",
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "JobMatch"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/cv-developpeur`
      }
    }
  },
  "cv-commercial": {
    title: "CV Commercial IA & ATS : Modèle et Mots-Clés 2026",
    description: "Optimisez votre CV commercial avec l'IA pour passer les filtres ATS. Métriques de vente (ARR, quota, CRM), compétences clés et modèle de CV performant.",
    keywords: [
      "CV commercial IA",
      "CV business developer ATS",
      "modèle CV commercial 2026",
      "mots clés vente ATS",
      "JobMatch"
    ],
    canonicalUrl: `${SITE_URL}/cv-commercial`,
    ogImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "CV Commercial & Business Developer par IA : Passer les ATS en 2026",
      "name": "CV Commercial IA & ATS : Modèle et Mots-Clés 2026",
      "description": "Optimisez votre CV commercial avec l'IA pour passer les filtres ATS. Métriques de vente (ARR, quota, CRM), compétences clés et modèle de CV performant.",
      "datePublished": "2026-03-02T09:00:00+01:00",
      "dateModified": "2026-03-02T09:00:00+01:00",
      "author": {
        "@type": "Organization",
        "name": "JobMatch",
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "JobMatch"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/cv-commercial`
      }
    }
  },
  "cv-sante": {
    title: "CV Métiers de la Santé par IA : Guide ATS 2026",
    description: "Créez un CV du secteur santé et médical optimisé pour les logiciels ATS. Diplômes d'État, spécialisations, protocoles de soins et modèle IA en 30s.",
    keywords: [
      "CV santé IA",
      "CV médical ATS",
      "modèle CV infirmier hôpital",
      "mots clés santé ATS",
      "JobMatch"
    ],
    canonicalUrl: `${SITE_URL}/cv-sante`,
    ogImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "CV Santé & Médical par IA : Optimisation ATS et Conseils 2026",
      "name": "CV Métiers de la Santé par IA : Guide ATS 2026",
      "description": "Créez un CV du secteur santé et médical optimisé pour les logiciels ATS. Diplômes d'État, spécialisations, protocoles de soins et modèle IA en 30s.",
      "datePublished": "2026-03-02T09:00:00+01:00",
      "dateModified": "2026-03-02T09:00:00+01:00",
      "author": {
        "@type": "Organization",
        "name": "JobMatch",
        "url": SITE_URL
      },
      "publisher": {
        "@type": "Organization",
        "name": "JobMatch"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${SITE_URL}/cv-sante`
      }
    }
  },
};

/**
 * Generate Dynamic Metadata for a Specific Job Application
 * Format: "Candidature [Poste] chez [Entreprise] - JobMatch"
 */
export function generateJobApplicationMetadata(
  targetJob: { title: string; company: string; location?: string },
  candidateName?: string,
  matchScore?: number,
  applicationId?: string
): PageMetadataConfig {
  const jobTitle = targetJob?.title?.trim() || "Poste";
  const company = targetJob?.company?.trim() || "Entreprise";
  const locationText = targetJob?.location ? ` (${targetJob.location})` : "";
  const scoreText = matchScore ? ` (Score ATS: ${matchScore}%)` : "";
  const candidateText = candidateName ? ` de ${candidateName}` : "";

  const title = `Candidature ${jobTitle} chez ${company} - JobMatch`;
  const description = `Dossier de candidature${candidateText} optimisé pour le poste de ${jobTitle} chez ${company}${locationText}${scoreText}. CV certifié ATS et lettre de motivation générés avec JobMatch.`;
  const canonicalUrl = applicationId 
    ? `${SITE_URL}/application/${applicationId}`
    : `${SITE_URL}/editor`;

  const keywords = [
    `Candidature ${jobTitle}`,
    `Recrutement ${company}`,
    `CV ${jobTitle}`,
    `Lettre de motivation ${company}`,
    "Optimisation CV ATS",
    "JobMatch",
    "jobmatch.company",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "about": {
      "@type": "JobPosting",
      "title": jobTitle,
      "hiringOrganization": {
        "@type": "Organization",
        "name": company,
      },
      ...(targetJob.location ? { "jobLocation": { "@type": "Place", "address": targetJob.location } } : {}),
    },
    "publisher": {
      "@type": "Organization",
      "name": "JobMatch",
      "url": SITE_URL,
    },
  };

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
    jsonLd,
  };
}

/**
 * Generate Next.js Dynamic Metadata Object
 */
export function generatePageMetadata(view: string): NextLikeMetadata {
  const config = METADATA_DICTIONARY[view] || METADATA_DICTIONARY.landing;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: config.canonicalUrl,
      languages: {
        "fr-FR": `${config.canonicalUrl}?lang=fr`,
        "en-US": `${config.canonicalUrl}?lang=en`,
        "es-ES": `${config.canonicalUrl}?lang=es`,
        "de-DE": `${config.canonicalUrl}?lang=de`,
      },
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.canonicalUrl,
      siteName: "JobMatch",
      images: [
        {
          url: config.ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.ogImage],
    },
    robots: config.robots || "index, follow",
  };
}

/**
 * Client-side DOM Meta Tags Updater (Hook / Helper)
 * Dynamically updates document.title, OpenGraph, Twitter and Meta Description tags
 */
export function updateDOMMetaTags(config: PageMetadataConfig) {
  if (typeof document === "undefined") return;

  // 1. Title
  document.title = config.title;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  // 3. Primary Meta Tags
  setMetaTag("name", "title", config.title);
  setMetaTag("name", "description", config.description);
  if (config.keywords?.length) {
    setMetaTag("name", "keywords", config.keywords.join(", "));
  }
  if (config.robots) {
    setMetaTag("name", "robots", config.robots);
  }

  // 4. OpenGraph Tags
  setMetaTag("property", "og:title", config.title);
  setMetaTag("property", "og:description", config.description);
  setMetaTag("property", "og:url", config.canonicalUrl);
  setMetaTag("property", "og:site_name", "JobMatch");
  if (config.ogImage) {
    setMetaTag("property", "og:image", config.ogImage);
  }

  // 5. Twitter Card Tags (both name and property for maximum bot compatibility)
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:url", config.canonicalUrl);
  setMetaTag("property", "twitter:url", config.canonicalUrl);
  setMetaTag("name", "twitter:title", config.title);
  setMetaTag("property", "twitter:title", config.title);
  setMetaTag("name", "twitter:description", config.description);
  setMetaTag("property", "twitter:description", config.description);
  if (config.ogImage) {
    setMetaTag("name", "twitter:image", config.ogImage);
    setMetaTag("property", "twitter:image", config.ogImage);
  }

  // 6. Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", config.canonicalUrl);

  // Set/update hreflang alternate links
  const setAlternateLink = (hreflang: string, href: string) => {
    let altLink = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`) as HTMLLinkElement | null;
    if (!altLink) {
      altLink = document.createElement("link");
      altLink.setAttribute("rel", "alternate");
      altLink.setAttribute("hreflang", hreflang);
      document.head.appendChild(altLink);
    }
    altLink.setAttribute("href", href);
  };

  const cleanBase = config.canonicalUrl.replace(/\/$/, "");
  const frUrl = config.canonicalUrl;
  const enUrl = config.canonicalUrl.endsWith("/") ? `${config.canonicalUrl}?lang=en` : `${cleanBase}?lang=en`;
  const xDefault = config.canonicalUrl;

  setAlternateLink("fr", frUrl);
  setAlternateLink("en", enUrl);
  setAlternateLink("x-default", xDefault);

  // 7. Dynamic JSON-LD injection if provided
  if (config.jsonLd) {
    let scriptTag = document.getElementById("dynamic-job-jsonld") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "dynamic-job-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(config.jsonLd);
  }
}

/**
 * Single source of truth for the site's canonical domain.
 * Configurable via VITE_SITE_URL or NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = 
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SITE_URL) ||
  (typeof process !== "undefined" && (process.env?.NEXT_PUBLIC_SITE_URL || process.env?.SITE_URL || process.env?.VITE_SITE_URL)) ||
  "https://jobmatch.company";

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
    title: "JobMatch AI — Ton CV et Lettre de Motivation parfaits en 30 secondes",
    description: "L'intelligence artificielle analyse l'offre d'emploi cible et adapte automatiquement votre CV et lettre de motivation pour passer les filtres ATS et décrocher 3x plus d'entretiens.",
    keywords: [
      "optimisation CV ATS",
      "générateur CV IA",
      "lettre de motivation personnalisée",
      "filtre ATS recrutement",
      "score ATS",
      "JobMatch AI"
    ],
    canonicalUrl: `${SITE_URL}/`,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  pricing: {
    title: "Tarifs & Formules — JobMatch AI | Accès Gratuit & Pro Illimité",
    description: "Découvrez nos formules transparentes pour booster vos candidatures. 1 candidature complète offerte, formule Pro Illimitée à 14,90€/mois et pack sans engagement.",
    keywords: [
      "prix JobMatch",
      "tarifs optimisation CV",
      "abonnement IA CV",
      "CV gratuit sans carte",
      "pack candidatures"
    ],
    canonicalUrl: `${SITE_URL}/pricing`,
    ogImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  onboarding: {
    title: "Générateur de CV & Lettre ATS en 30s — JobMatch AI",
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
    title: "Mes Candidatures — JobMatch AI",
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
  const description = `Dossier de candidature${candidateText} optimisé pour le poste de ${jobTitle} chez ${company}${locationText}${scoreText}. CV certifié ATS et lettre de motivation générés avec JobMatch AI.`;
  const canonicalUrl = applicationId 
    ? `${SITE_URL}/application/${applicationId}`
    : `${SITE_URL}/editor`;

  const keywords = [
    `Candidature ${jobTitle}`,
    `Recrutement ${company}`,
    `CV ${jobTitle}`,
    `Lettre de motivation ${company}`,
    "Optimisation CV ATS",
    "JobMatch AI",
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
      "name": "JobMatch AI",
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
      siteName: "JobMatch AI",
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
  if (config.ogImage) {
    setMetaTag("property", "og:image", config.ogImage);
  }

  // 5. Twitter Card Tags
  setMetaTag("property", "twitter:title", config.title);
  setMetaTag("property", "twitter:description", config.description);
  if (config.ogImage) {
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

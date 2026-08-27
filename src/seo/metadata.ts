export interface PageMetadataConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  robots?: string;
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
    canonicalUrl: "https://www.jobmatch.company/",
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow, max-image-preview:large, max-snippet:-1",
  },
  pricing: {
    title: "Tarifs & Formules — JobMatch AI | Accès Gratuit & Pro Illimité",
    description: "Découvrez nos offres transparentes pour booster vos candidatures. 1 candidature complète offerte, formule Pro Illimitée à 14,90€/mois et pack sans engagement.",
    keywords: [
      "prix JobMatch",
      "tarifs optimisation CV",
      "abonnement IA CV",
      "CV gratuit sans carte",
      "pack candidatures"
    ],
    canonicalUrl: "https://www.jobmatch.company/pricing",
    ogImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  onboarding: {
    title: "Générateur de CV & Lettre ATS — JobMatch AI (30s)",
    description: "Collez le lien de votre offre LinkedIn, Indeed ou Welcome to the Jungle et uploadez votre CV actuel pour obtenir instantanément un profil optimisé à +90% ATS.",
    keywords: [
      "créer CV offre emploi",
      "adapter CV LinkedIn",
      "générer lettre IA",
      "scanner offre emploi",
      "test compatibilité ATS"
    ],
    canonicalUrl: "https://www.jobmatch.company/onboarding",
    ogImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    robots: "index, follow",
  },
  history: {
    title: "Mes Candidatures — JobMatch AI",
    description: "Accédez à l'historique de vos CVs et lettres de motivation optimisés, modifiez vos versions et suivez vos envois.",
    keywords: ["tableau de bord", "mes candidatures", "suivi recrutement"],
    canonicalUrl: "https://www.jobmatch.company/history",
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
    robots: "noindex, nofollow",
  },
};

/**
 * Generate Next.js Dynamic Metadata Object
 */
export function generatePageMetadata(view: "landing" | "pricing" | "onboarding" | "history" | string): NextLikeMetadata {
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

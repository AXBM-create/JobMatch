import { NextLikeMetadata, generateJobApplicationMetadata } from '../../../seo/metadata';

interface PageProps {
  params: {
    id: string;
  };
  searchParams?: {
    job?: string;
    company?: string;
    candidate?: string;
    score?: string;
  };
}

/**
 * Server-side dynamic metadata generator in Next.js App Router
 * Outputs <title>Candidature [Poste] chez [Entreprise] - JobMatch</title>
 */
export async function generateMetadata({ params, searchParams }: PageProps): Promise<NextLikeMetadata> {
  const jobTitle = searchParams?.job || "Poste Spécialisé";
  const company = searchParams?.company || "Entreprise Cible";
  const candidate = searchParams?.candidate;
  const score = searchParams?.score ? parseInt(searchParams.score, 10) : 92;

  const jobMeta = generateJobApplicationMetadata(
    { title: jobTitle, company: company },
    candidate,
    score,
    params.id
  );

  return {
    title: jobMeta.title,
    description: jobMeta.description,
    keywords: jobMeta.keywords,
    alternates: {
      canonical: jobMeta.canonicalUrl,
      languages: {
        "fr-FR": `${jobMeta.canonicalUrl}?lang=fr`,
        "en-US": `${jobMeta.canonicalUrl}?lang=en`,
        "es-ES": `${jobMeta.canonicalUrl}?lang=es`,
        "de-DE": `${jobMeta.canonicalUrl}?lang=de`,
      },
    },
    openGraph: {
      title: jobMeta.title,
      description: jobMeta.description,
      url: jobMeta.canonicalUrl,
      siteName: "JobMatch",
      images: [
        {
          url: jobMeta.ogImage,
          width: 1200,
          height: 630,
          alt: jobMeta.title,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: jobMeta.title,
      description: jobMeta.description,
      images: [jobMeta.ogImage],
    },
    robots: jobMeta.robots || "index, follow",
  };
}

export default function ApplicationPage({ params }: PageProps) {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800">Dossier de Candidature #{params.id}</h1>
      <p className="text-slate-600 mt-2">Dossier pré-rendu optimisé pour le référencement ATS et les moteurs de recherche.</p>
    </div>
  );
}

import { NextLikeMetadata, SITE_URL } from '../../../seo/metadata';
import { JOB_ROLES_DATA } from '../../../data/seoProgrammaticData';
import { DashboardCreator } from '../../../components/DashboardCreator';

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function generateStaticParams() {
  return JOB_ROLES_DATA.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<NextLikeMetadata> {
  const job = JOB_ROLES_DATA.find((item) => item.slug === params.slug);
  if (!job) {
    return {
      title: 'Optimiser son CV — JobMatch AI',
      description: "Générateur et optimiseur de CV par métier calibré pour les logiciels de recrutement ATS.",
      keywords: ['optimiser CV', 'CV ATS'],
      alternates: {
        canonical: `${SITE_URL}/optimiser-cv/${params.slug}`,
        languages: { 'fr-FR': `${SITE_URL}/optimiser-cv/${params.slug}` },
      },
      openGraph: {
        title: 'Optimiser son CV — JobMatch AI',
        description: "Générateur et optimiseur de CV par métier calibré pour les logiciels de recrutement ATS.",
        url: `${SITE_URL}/optimiser-cv/${params.slug}`,
        siteName: 'JobMatch AI',
        images: [{ url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630, alt: 'Optimiser CV' }],
        locale: 'fr_FR',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Optimiser son CV — JobMatch AI',
        description: "Générateur et optimiseur de CV par métier calibré pour les logiciels de recrutement ATS.",
        images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80'],
      },
      robots: 'index, follow',
    };
  }

  const title = `CV ${job.title} : Modèle & Mots-Clés ATS Recommandés — JobMatch`;
  const description = `Optimisez votre CV de ${job.title} avec les mots-clés ATS indispensables (${job.topKeywords.slice(0, 5).join(', ')}) et générez une candidature adaptée en 30s.`;
  const canonicalUrl = `${SITE_URL}/optimiser-cv/${job.slug}`;

  return {
    title,
    description,
    keywords: [
      `CV ${job.title}`,
      `Modèle CV ${job.title}`,
      `Mots clés ATS ${job.title}`,
      ...job.topKeywords,
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr-FR': `${canonicalUrl}?lang=fr`,
        'en-US': `${canonicalUrl}?lang=en`,
        'es-ES': `${canonicalUrl}?lang=es`,
        'de-DE': `${canonicalUrl}?lang=de`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'JobMatch AI',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80'],
    },
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  };
}

export default function JobRolePage({ params }: Props) {
  const job = JOB_ROLES_DATA.find((item) => item.slug === params.slug) || JOB_ROLES_DATA[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto pt-8 px-4 text-center">
        <h1 className="text-3xl font-extrabold text-[#1A3A5C] mb-2">
          Générateur de CV {job.title} Optimisé ATS
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto">
          {job.description}
        </p>
      </div>
      <DashboardCreator
        onGenerate={() => {}}
        isLoading={false}
        onQuickViewSample={() => {}}
      />
    </div>
  );
}

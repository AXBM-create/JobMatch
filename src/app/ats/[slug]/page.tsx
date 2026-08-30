import { NextLikeMetadata, SITE_URL } from '../../../seo/metadata';
import { ATS_SYSTEMS_DATA } from '../../../data/seoProgrammaticData';
import { AtsGuideDetailView } from '../../../components/AtsGuideDetailView';

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function generateStaticParams() {
  return ATS_SYSTEMS_DATA.map((ats) => ({
    slug: ats.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<NextLikeMetadata> {
  const guide = ATS_SYSTEMS_DATA.find((item) => item.slug === params.slug);
  if (!guide) {
    return {
      title: 'Guide ATS — JobMatch',
      description: "Guide d'optimisation de CV pour les logiciels de suivi de candidatures (ATS).",
      keywords: ['guide ATS', 'optimiser CV ATS'],
      alternates: {
        canonical: `${SITE_URL}/ats/${params.slug}`,
        languages: { 'fr-FR': `${SITE_URL}/ats/${params.slug}` },
      },
      openGraph: {
        title: 'Guide ATS — JobMatch',
        description: "Guide d'optimisation de CV pour les logiciels de suivi de candidatures (ATS).",
        url: `${SITE_URL}/ats/${params.slug}`,
        siteName: 'JobMatch',
        images: [{ url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80', width: 1200, height: 630, alt: 'Guide ATS' }],
        locale: 'fr_FR',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Guide ATS — JobMatch',
        description: "Guide d'optimisation de CV pour les logiciels de suivi de candidatures (ATS).",
        images: ['https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80'],
      },
      robots: 'index, follow',
    };
  }

  const title = `Comment passer le filtre ATS ${guide.name} ? (Guide & Formatage 2026) — JobMatch`;
  const description = `Découvrez comment formater votre CV pour dépasser 90% de score sur l'ATS ${guide.name}. Évitez les causes de rejet automatique chez ${guide.typicalCompanies.slice(0, 3).join(', ')}.`;
  const canonicalUrl = `${SITE_URL}/ats/${guide.slug}`;

  return {
    title,
    description,
    keywords: [
      `filtre ATS ${guide.name}`,
      `optimiser CV ${guide.name}`,
      `passer le robot ${guide.name}`,
      ...guide.atsKeywordsToInclude,
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
      siteName: 'JobMatch',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80',
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
      images: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80'],
    },
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  };
}

export default function AtsDetailPage({ params }: Props) {
  const guide = ATS_SYSTEMS_DATA.find((item) => item.slug === params.slug) || ATS_SYSTEMS_DATA[0];

  return (
    <AtsGuideDetailView
      guide={guide}
      onBack={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/guides';
        }
      }}
      onStartForAts={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/onboarding';
        }
      }}
    />
  );
}

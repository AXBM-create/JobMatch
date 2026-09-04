import { ATS_SYSTEMS_DATA, JOB_ROLES_DATA } from '../data/seoProgrammaticData';
import { SITE_URL } from '../seo/metadata';

export interface SitemapItem {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

export default function sitemap(): SitemapItem[] {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const staticPages: SitemapItem[] = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/?lang=fr`,
          en: `${baseUrl}/?lang=en`,
          es: `${baseUrl}/?lang=es`,
          de: `${baseUrl}/?lang=de`,
        },
      },
    },
    {
      url: `${baseUrl}/onboarding`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/onboarding?lang=fr`,
          en: `${baseUrl}/onboarding?lang=en`,
          es: `${baseUrl}/onboarding?lang=es`,
          de: `${baseUrl}/onboarding?lang=de`,
        },
      },
    },
    {
      url: `${baseUrl}/test-score-ats`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/test-score-ats?lang=fr`,
          en: `${baseUrl}/test-score-ats?lang=en`,
          es: `${baseUrl}/test-score-ats?lang=es`,
          de: `${baseUrl}/test-score-ats?lang=de`,
        },
      },
    },
    {
      url: `${baseUrl}/guides`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/guides?lang=fr`,
          en: `${baseUrl}/guides?lang=en`,
          es: `${baseUrl}/guides?lang=es`,
          de: `${baseUrl}/guides?lang=de`,
        },
      },
    },
    {
      url: `${baseUrl}/guide-cv-ats`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/guide-cv-ats`,
          en: `${baseUrl}/guide-cv-ats?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/cv-developpeur`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/cv-developpeur`,
          en: `${baseUrl}/cv-developpeur?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/cv-commercial`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/cv-commercial`,
          en: `${baseUrl}/cv-commercial?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/cv-sante`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/cv-sante`,
          en: `${baseUrl}/cv-sante?lang=en`,
        },
      },
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/pricing?lang=fr`,
          en: `${baseUrl}/pricing?lang=en`,
          es: `${baseUrl}/pricing?lang=es`,
          de: `${baseUrl}/pricing?lang=de`,
        },
      },
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cgv`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic ATS Guides Pages
  const atsPages: SitemapItem[] = ATS_SYSTEMS_DATA.map((ats) => ({
    url: `${baseUrl}/ats/${ats.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        fr: `${baseUrl}/ats/${ats.slug}?lang=fr`,
        en: `${baseUrl}/ats/${ats.slug}?lang=en`,
        es: `${baseUrl}/ats/${ats.slug}?lang=es`,
        de: `${baseUrl}/ats/${ats.slug}?lang=de`,
      },
    },
  }));

  // Dynamic Job Role Pages
  const jobPages: SitemapItem[] = JOB_ROLES_DATA.map((job) => ({
    url: `${baseUrl}/optimiser-cv/${job.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        fr: `${baseUrl}/optimiser-cv/${job.slug}?lang=fr`,
        en: `${baseUrl}/optimiser-cv/${job.slug}?lang=en`,
        es: `${baseUrl}/optimiser-cv/${job.slug}?lang=es`,
        de: `${baseUrl}/optimiser-cv/${job.slug}?lang=de`,
      },
    },
  }));

  return [...staticPages, ...atsPages, ...jobPages];
}

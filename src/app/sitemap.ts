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
  const baseUrl = 'https://www.jobmatch.company';
  const lastModified = new Date();

  return [
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
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: 'weekly',
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
  ];
}

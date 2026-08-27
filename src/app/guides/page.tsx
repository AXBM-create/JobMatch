import { generatePageMetadata, NextLikeMetadata } from '../../seo/metadata';
import { BlogGuidesView } from '../../components/BlogGuidesView';

export const dynamic = 'force-static';
export const revalidate = 86400; // Cache 24h

export async function generateMetadata(): Promise<NextLikeMetadata> {
  return generatePageMetadata('guides');
}

export default function GuidesPage() {
  return (
    <BlogGuidesView
      onSelectAtsGuide={(guide) => {
        if (typeof window !== 'undefined') {
          window.location.href = `/ats/${guide.slug}`;
        }
      }}
      onSelectJobRole={(roleId) => {
        if (typeof window !== 'undefined') {
          window.location.href = `/optimiser-cv/${roleId}`;
        }
      }}
      onStartGenerator={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/onboarding';
        }
      }}
    />
  );
}

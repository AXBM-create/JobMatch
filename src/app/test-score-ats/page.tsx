import { generatePageMetadata, NextLikeMetadata } from '../../seo/metadata';
import { AtsTestScoreView } from '../../components/AtsTestScoreView';

export const dynamic = 'force-static';
export const revalidate = 86400; // Cache 24h

export async function generateMetadata(): Promise<NextLikeMetadata> {
  return generatePageMetadata('ats-test');
}

export default function AtsTestPage() {
  return (
    <AtsTestScoreView
      onStartFullOptimization={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/onboarding';
        }
      }}
    />
  );
}

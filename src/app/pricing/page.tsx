import { generatePageMetadata, NextLikeMetadata } from '@/src/seo/metadata';
import { PricingView } from '@/src/components/PricingView';

export const dynamic = 'force-static';
export const revalidate = 86400; // Cache 24h

export async function generateMetadata(): Promise<NextLikeMetadata> {
  return generatePageMetadata('pricing');
}

export default function PricingPage() {
  return <PricingView onStartFree={() => {}} />;
}

import { generatePageMetadata, NextLikeMetadata } from '../../seo/metadata';
import { PricingView } from '../../components/PricingView';

export const dynamic = 'force-static';
export const revalidate = 86400; // Cache 24h

export async function generateMetadata(): Promise<NextLikeMetadata> {
  return generatePageMetadata('pricing');
}

export default function PricingPage() {
  return <PricingView onStartFree={() => {}} />;
}

import { generatePageMetadata, NextLikeMetadata } from '../seo/metadata';
import { LandingView } from '../components/LandingView';

export const dynamic = 'force-static';
export const revalidate = 86400; // Cache 24h

export async function generateMetadata(): Promise<NextLikeMetadata> {
  return generatePageMetadata('landing');
}

export default function HomePage() {
  return <LandingView onStart={() => {}} onViewPricing={() => {}} onQuickViewSample={() => {}} />;
}

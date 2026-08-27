import { generatePageMetadata, NextLikeMetadata } from '@/src/seo/metadata';
import { DashboardCreator } from '@/src/components/DashboardCreator';

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<NextLikeMetadata> {
  return generatePageMetadata('onboarding');
}

export default function OnboardingPage() {
  return (
    <DashboardCreator
      onGenerate={() => {}}
      isLoading={false}
      onQuickViewSample={() => {}}
    />
  );
}

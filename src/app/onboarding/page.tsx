import { generatePageMetadata, NextLikeMetadata } from '../../seo/metadata';
import { DashboardCreator } from '../../components/DashboardCreator';

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

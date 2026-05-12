import { Redirect } from 'expo-router';

import { evaluateDriverGuard, useAuthStore } from '@/features/auth';
import { AnimatedSplashOverlay } from '@/shared/ui/animated-icon';
import AppTabs from '@/shared/ui/app-tabs';

export default function DriverLayout() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const status = useAuthStore((s) => s.status);
  const guard = evaluateDriverGuard(hydrated, status);

  if (guard.kind === 'loading') {
    return null;
  }
  if (guard.kind === 'redirect') {
    return <Redirect href={guard.href} />;
  }

  return (
    <>
      <AnimatedSplashOverlay />
      <AppTabs />
    </>
  );
}

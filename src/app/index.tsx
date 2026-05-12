import { Redirect } from 'expo-router';

import { evaluateRootIndexRedirect, useAuthStore } from '@/features/auth';

export default function RootIndex() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const status = useAuthStore((s) => s.status);
  const href = evaluateRootIndexRedirect(hydrated, status);
  if (!href) {
    return null;
  }
  return <Redirect href={href} />;
}

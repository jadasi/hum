import { Redirect, Stack } from 'expo-router';

import { evaluateAuthStackRedirect, useAuthStore } from '@/features/auth';

export default function AuthLayout() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const status = useAuthStore((s) => s.status);
  const target = evaluateAuthStackRedirect(hydrated, status);
  if (target) {
    return <Redirect href={target} />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}

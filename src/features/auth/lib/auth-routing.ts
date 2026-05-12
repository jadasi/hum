import type { AuthStatus } from '../model/auth-store';

export type DriverGuardResult =
  | { kind: 'loading' }
  | { kind: 'redirect'; href: '/(auth)/sign-in' }
  | { kind: 'allow' };

/** Route guards for the driver shell vs auth stack (see specs/001-auth-flow/contracts/auth-routing.md). */
export function evaluateDriverGuard(hydrated: boolean, status: AuthStatus): DriverGuardResult {
  if (!hydrated || status === 'unknown') {
    return { kind: 'loading' };
  }
  if (status === 'signedOut') {
    return { kind: 'redirect', href: '/(auth)/sign-in' };
  }
  return { kind: 'allow' };
}

export function evaluateAuthStackRedirect(hydrated: boolean, status: AuthStatus): '/(driver)/(tabs)' | null {
  if (hydrated && status === 'signedIn') {
    return '/(driver)/(tabs)';
  }
  return null;
}

export function evaluateRootIndexRedirect(
  hydrated: boolean,
  status: AuthStatus
): '/(driver)/(tabs)' | '/(auth)/sign-in' | null {
  if (!hydrated || status === 'unknown') {
    return null;
  }
  if (status === 'signedIn') {
    return '/(driver)/(tabs)';
  }
  return '/(auth)/sign-in';
}

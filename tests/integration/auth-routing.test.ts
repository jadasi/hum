import { evaluateDriverGuard, evaluateRootIndexRedirect } from '@/features/auth';

describe('auth routing guards', () => {
  describe('evaluateDriverGuard', () => {
    it('blocks while not hydrated', () => {
      expect(evaluateDriverGuard(false, 'unknown')).toEqual({ kind: 'loading' });
    });

    it('blocks while status unknown after hydration edge', () => {
      expect(evaluateDriverGuard(true, 'unknown')).toEqual({ kind: 'loading' });
    });

    it('redirects signed-out users away from driver shell', () => {
      expect(evaluateDriverGuard(true, 'signedOut')).toEqual({
        kind: 'redirect',
        href: '/(auth)/sign-in',
      });
    });

    it('allows signed-in users', () => {
      expect(evaluateDriverGuard(true, 'signedIn')).toEqual({ kind: 'allow' });
    });
  });

  describe('evaluateRootIndexRedirect', () => {
    it('returns null until hydrated', () => {
      expect(evaluateRootIndexRedirect(false, 'signedOut')).toBeNull();
    });

    it('sends signed-in users to driver area', () => {
      expect(evaluateRootIndexRedirect(true, 'signedIn')).toBe('/(driver)/(tabs)');
    });

    it('sends signed-out users to sign-in', () => {
      expect(evaluateRootIndexRedirect(true, 'signedOut')).toBe('/(auth)/sign-in');
    });
  });
});

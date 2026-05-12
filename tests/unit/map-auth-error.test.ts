import { mapAuthError } from '@/features/auth';

describe('mapAuthError', () => {
  it('maps invalid login credentials', () => {
    expect(mapAuthError({ message: 'Invalid login credentials' })).toContain('email or password');
  });

  it('maps email not confirmed', () => {
    expect(mapAuthError({ message: 'Email not confirmed' })).toContain('confirm your email');
  });

  it('maps duplicate user', () => {
    expect(mapAuthError({ message: 'User already registered' })).toContain('already exists');
  });

  it('maps network failures', () => {
    expect(mapAuthError({ message: 'Network request failed' })).toContain('connection');
  });

  it('maps rate limit', () => {
    expect(mapAuthError({ message: 'Too many requests' })).toContain('Too many attempts');
  });

  it('returns generic message for unknown errors', () => {
    expect(mapAuthError({ message: 'cryptic xyz' })).toBe('Something went wrong. Please try again.');
  });

  it('handles non-object errors', () => {
    expect(mapAuthError('string')).toBe('Something went wrong. Please try again.');
  });
});

const mockSignUp = jest.fn();

jest.mock('@/shared/api/supabase-client', () => ({
  getSupabase: () => ({
    auth: {
      signUp: (...args: unknown[]) => mockSignUp(...args),
    },
  }),
}));

import { signUp } from '@/features/auth/api/auth-api';

describe('sign-up-flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns no confirmation when session is returned', async () => {
    mockSignUp.mockResolvedValueOnce({
      data: {
        user: { id: 'u1' },
        session: { access_token: 'at' },
      },
      error: null,
    });
    const result = await signUp('new@example.com', 'password123');
    expect(result.error).toBeNull();
    expect(result.needsEmailConfirmation).toBe(false);
  });

  it('returns needsEmailConfirmation when user exists but session is null', async () => {
    mockSignUp.mockResolvedValueOnce({
      data: {
        user: { id: 'u1' },
        session: null,
      },
      error: null,
    });
    const result = await signUp('new@example.com', 'password123');
    expect(result.error).toBeNull();
    expect(result.needsEmailConfirmation).toBe(true);
  });

  it('returns mapped error for duplicate registration', async () => {
    mockSignUp.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'User already registered' },
    });
    const result = await signUp('taken@example.com', 'password123');
    expect(result.needsEmailConfirmation).toBe(false);
    expect(result.error).toContain('already exists');
  });
});

const mockGetSession = jest.fn();
const mockUnsubscribe = jest.fn();

jest.mock('@/shared/api/supabase-client', () => ({
  getSupabase: () => ({
    auth: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: mockUnsubscribe } },
      }),
    },
  }),
}));

import { hydrateAuthStore, subscribeAuthStore, useAuthStore } from '@/features/auth/model/auth-store';

describe('auth-store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      status: 'unknown',
      hydrated: false,
      session: null,
      user: null,
    });
    mockGetSession.mockResolvedValue({ data: { session: null }, error: null });
  });

  it('hydrate sets signedOut when no session', async () => {
    await hydrateAuthStore();
    expect(useAuthStore.getState().status).toBe('signedOut');
    expect(useAuthStore.getState().hydrated).toBe(true);
    expect(useAuthStore.getState().session).toBeNull();
  });

  it('hydrate sets signedIn when session present', async () => {
    const session = {
      access_token: 'at',
      refresh_token: 'rt',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer' as const,
      user: {
        id: 'user-1',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'driver@example.com',
        app_metadata: {},
        user_metadata: {},
        created_at: new Date().toISOString(),
      },
    };
    mockGetSession.mockResolvedValueOnce({ data: { session }, error: null });
    await hydrateAuthStore();
    expect(useAuthStore.getState().status).toBe('signedIn');
    expect(useAuthStore.getState().user?.email).toBe('driver@example.com');
  });

  it('subscribe returns unsubscribe', () => {
    const unsub = subscribeAuthStore();
    expect(typeof unsub).toBe('function');
    unsub();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});

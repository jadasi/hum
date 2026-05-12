const mockSignOut = jest.fn();
let onAuthStateChangeCallback: ((event: string, session: null) => void) | undefined;

jest.mock('@/shared/api/supabase-client', () => ({
  getSupabase: () => ({
    auth: {
      signOut: (...args: unknown[]) => mockSignOut(...args),
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: (cb: (event: string, session: null) => void) => {
        onAuthStateChangeCallback = cb;
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      },
    },
  }),
}));

import type { Session } from '@supabase/supabase-js';

import { signOut } from '@/features/auth/api/auth-api';
import { subscribeAuthStore, useAuthStore } from '@/features/auth/model/auth-store';

describe('sign-out', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSignOut.mockResolvedValue({ error: null });
    onAuthStateChangeCallback = undefined;
    useAuthStore.setState({
      status: 'unknown',
      hydrated: false,
      session: null,
      user: null,
    });
  });

  it('calls Supabase signOut', async () => {
    await signOut();
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('ends in signedOut when auth listener receives null session', () => {
    subscribeAuthStore();
    const session = {
      access_token: 'at',
      refresh_token: 'rt',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: {
        id: 'user-1',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'driver@example.com',
        app_metadata: {},
        user_metadata: {},
        created_at: new Date().toISOString(),
      },
    } as Session;
    useAuthStore.getState().applySession(session);
    expect(useAuthStore.getState().status).toBe('signedIn');

    onAuthStateChangeCallback?.('SIGNED_OUT', null);

    expect(useAuthStore.getState().status).toBe('signedOut');
    expect(useAuthStore.getState().session).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});

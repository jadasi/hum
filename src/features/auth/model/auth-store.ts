import type { Session, User } from '@supabase/supabase-js';
import { create } from 'zustand';

import { getSupabase } from '@/shared/api/supabase-client';

export type AuthStatus = 'unknown' | 'signedOut' | 'signedIn';

type AuthState = {
  status: AuthStatus;
  hydrated: boolean;
  session: Session | null;
  user: User | null;
  applySession: (session: Session | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'unknown',
  hydrated: false,
  session: null,
  user: null,
  applySession: (session) => {
    set({
      session,
      user: session?.user ?? null,
      status: session ? 'signedIn' : 'signedOut',
    });
  },
}));

export async function hydrateAuthStore(): Promise<void> {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  useAuthStore.getState().applySession(data.session);
  useAuthStore.setState({ hydrated: true });
}

export function subscribeAuthStore(): () => void {
  const supabase = getSupabase();
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    if (__DEV__) {
      if (
        event === 'SIGNED_IN' ||
        event === 'SIGNED_OUT' ||
        event === 'TOKEN_REFRESHED' ||
        event === 'USER_UPDATED'
      ) {
        console.log('[auth]', event);
      }
    }
    useAuthStore.getState().applySession(session);
    useAuthStore.setState({ hydrated: true });
  });
  return () => {
    data.subscription.unsubscribe();
  };
}

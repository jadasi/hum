import { getSupabase } from '@/shared/api/supabase-client';

import { mapAuthError } from '../lib/map-auth-error';

export async function signInWithPassword(
  email: string,
  password: string
): Promise<{ error: string | null }> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) {
    return { error: mapAuthError(error) };
  }
  return { error: null };
}

export async function signUp(
  email: string,
  password: string
): Promise<{ error: string | null; needsEmailConfirmation: boolean }> {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });
  if (error) {
    return { error: mapAuthError(error), needsEmailConfirmation: false };
  }
  const needsEmailConfirmation = Boolean(data.user) && !data.session;
  return { error: null, needsEmailConfirmation };
}

export async function signOut(): Promise<{ error: string | null }> {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { error: mapAuthError(error) };
  }
  return { error: null };
}

export async function getSession() {
  const supabase = getSupabase();
  return supabase.auth.getSession();
}

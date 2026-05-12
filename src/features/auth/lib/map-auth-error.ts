import type { AuthError } from '@supabase/supabase-js';

function messageFromUnknown(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: string }).message);
  }
  return undefined;
}

/** Maps Supabase / network errors to plain-language copy (no raw internals). */
export function mapAuthError(error: unknown): string {
  const raw = messageFromUnknown(error)?.trim();
  const lower = raw?.toLowerCase() ?? '';

  if (!raw) {
    return 'Something went wrong. Please try again.';
  }

  if (lower.includes('invalid login credentials') || lower.includes('invalid email or password')) {
    return 'That email or password does not match our records. Please try again.';
  }

  if (lower.includes('email not confirmed')) {
    return 'Please confirm your email before signing in. Check your inbox for a link.';
  }

  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return 'An account already exists for this email. Try signing in instead.';
  }

  if (lower.includes('network request failed') || lower.includes('fetch')) {
    return 'We could not reach the server. Check your connection and try again.';
  }

  if (lower.includes('too many requests') || lower.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment and try again.';
  }

  const auth = error as Partial<AuthError>;
  if (auth.status === 400 && lower.includes('password')) {
    return 'Please check your password and try again.';
  }

  return 'Something went wrong. Please try again.';
}

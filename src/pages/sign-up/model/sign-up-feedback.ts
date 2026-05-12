export type SignUpResultShape = {
  error: string | null;
  needsEmailConfirmation: boolean;
};

export type SignUpFeedback =
  | { kind: 'error'; message: string }
  | { kind: 'awaiting_email'; title: string; body: string }
  | { kind: 'silent_success' };

/** Maps sign-up API outcome to UI feedback (navigation handled by auth session elsewhere). */
export function getSignUpFeedback(result: SignUpResultShape): SignUpFeedback {
  if (result.error) {
    return { kind: 'error', message: result.error };
  }
  if (result.needsEmailConfirmation) {
    return {
      kind: 'awaiting_email',
      title: 'Check your email',
      body: 'We sent a confirmation link to your address. Open it, then come back and sign in.',
    };
  }
  return { kind: 'silent_success' };
}

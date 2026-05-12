import { getSignUpFeedback } from '@/pages/sign-up/model';

describe('sign-up-screen-logic', () => {
  it('maps API error to error feedback', () => {
    const fb = getSignUpFeedback({ error: 'Bad request', needsEmailConfirmation: false });
    expect(fb).toEqual({ kind: 'error', message: 'Bad request' });
  });

  it('maps awaiting confirmation to info feedback', () => {
    const fb = getSignUpFeedback({ error: null, needsEmailConfirmation: true });
    expect(fb.kind).toBe('awaiting_email');
    if (fb.kind === 'awaiting_email') {
      expect(fb.title).toBeTruthy();
      expect(fb.body).toContain('confirmation');
    }
  });

  it('maps immediate session to silent success', () => {
    const fb = getSignUpFeedback({ error: null, needsEmailConfirmation: false });
    expect(fb).toEqual({ kind: 'silent_success' });
  });
});

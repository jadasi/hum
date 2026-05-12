/** Maps thrown errors from auth network calls to user-safe copy. */
export function messageFromCaughtException(error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();
  if (
    lower.includes('network') ||
    lower.includes('fetch') ||
    lower.includes('failed to') ||
    lower.includes('timeout') ||
    lower.includes('abort') ||
    lower.includes('connection')
  ) {
    return 'We could not reach the server. Check your connection and try again.';
  }
  return 'Something went wrong. Please try again.';
}

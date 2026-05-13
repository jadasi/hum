/** Upper bound for driver-entered pending quotes (50,000 USD in cents). */
export const MAX_PENDING_QUOTE_CENTS = 50_000_000;

export function formatQuoteDollarsFromCents(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function parseDriverQuoteInput(raw: string): { ok: true; cents: number } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: 'Enter a quote amount.' };
  }

  const normalized = trimmed.replace(/[$,\s]/g, '');
  if (!/^\d*(\.\d{0,2})?$/.test(normalized)) {
    return { ok: false, error: 'Use numbers only, like 45 or 45.50.' };
  }

  if (normalized === '.' || normalized.endsWith('.')) {
    return { ok: false, error: 'Enter dollars and cents, like 45.00.' };
  }

  const dollars = Number.parseFloat(normalized);
  if (!Number.isFinite(dollars) || dollars < 0) {
    return { ok: false, error: 'Enter a valid dollar amount.' };
  }

  const cents = Math.round(dollars * 100);
  if (!Number.isSafeInteger(cents)) {
    return { ok: false, error: 'Quote amount is too large.' };
  }

  return { ok: true, cents };
}

export function validatePendingQuoteCents(cents: number): string | null {
  if (!Number.isFinite(cents) || !Number.isInteger(cents)) {
    return 'Quote must be a whole cent amount.';
  }
  if (cents < 0) {
    return 'Quote cannot be negative.';
  }
  if (cents > MAX_PENDING_QUOTE_CENTS) {
    return 'Quote amount is too large.';
  }
  return null;
}

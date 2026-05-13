import {
  MAX_PENDING_QUOTE_CENTS,
  formatQuoteDollarsFromCents,
  parseDriverQuoteInput,
  validatePendingQuoteCents,
} from '@/pages/driver-ride';

describe('pending-quote', () => {
  describe('formatQuoteDollarsFromCents', () => {
    it('formats whole dollars with two decimals', () => {
      expect(formatQuoteDollarsFromCents(4500)).toBe('45.00');
    });
  });

  describe('parseDriverQuoteInput', () => {
    it('parses plain dollars', () => {
      expect(parseDriverQuoteInput('45')).toEqual({ ok: true, cents: 4500 });
    });

    it('parses dollars with cents', () => {
      expect(parseDriverQuoteInput('45.5')).toEqual({ ok: true, cents: 4550 });
    });

    it('strips currency symbols and commas', () => {
      expect(parseDriverQuoteInput('$1,234.56')).toEqual({ ok: true, cents: 123_456 });
    });

    it('rejects empty input', () => {
      const r = parseDriverQuoteInput('   ');
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.error).toMatch(/Enter a quote/);
    });

    it('rejects non-numeric junk', () => {
      const r = parseDriverQuoteInput('abc');
      expect(r.ok).toBe(false);
    });
  });

  describe('validatePendingQuoteCents', () => {
    it('accepts zero', () => {
      expect(validatePendingQuoteCents(0)).toBeNull();
    });

    it('rejects negative cents', () => {
      expect(validatePendingQuoteCents(-1)).toMatch(/negative/i);
    });

    it('rejects amounts above the cap', () => {
      expect(validatePendingQuoteCents(MAX_PENDING_QUOTE_CENTS + 1)).toMatch(/too large/i);
    });
  });
});

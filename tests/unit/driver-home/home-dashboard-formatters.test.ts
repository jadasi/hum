import { formatMoney, formatRideGoalProgress } from '@/pages/driver-home';

describe('home dashboard formatters', () => {
  it('formats whole-dollar money values without cents', () => {
    expect(formatMoney({ cents: 142000, currency: 'USD' })).toBe('$1,420');
  });

  it('formats money values with cents when needed', () => {
    expect(formatMoney({ cents: 4525, currency: 'USD' })).toBe('$45.25');
  });

  it('formats weekly ride goal progress plainly', () => {
    expect(formatRideGoalProgress(7, 10)).toBe('7/10');
  });
});

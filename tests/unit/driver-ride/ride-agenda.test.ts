import { buildConfirmedRideAgenda, mapRideView } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

function mapConfirmedRow(overrides: Parameters<typeof buildRideViewRow>[0] = {}) {
  const row = buildRideViewRow({
    state: 'confirmed',
    pricing: {
      id: '80000000-0000-4000-8000-000000000001',
      quoted_amount_cents: 4500,
      accepted_amount_cents: 4500,
      platform_average_low_cents: null,
      platform_average_high_cents: null,
      currency: 'USD',
      pricing_note: null,
    },
    ...overrides,
  });
  const mapped = mapRideView(row);
  if (!mapped) {
    throw new Error('expected mapped ride');
  }
  return mapped;
}

describe('buildConfirmedRideAgenda', () => {
  it('marks prep active and pickup upcoming when pickup is within a day but not imminent', () => {
    const data = mapConfirmedRow({
      scheduled_pickup_at: '2026-05-13T10:00:00.000Z',
    });
    const nowMs = Date.parse('2026-05-12T14:00:00.000Z');
    const agenda = buildConfirmedRideAgenda(data, nowMs);

    expect(agenda[0]?.status).toBe('done');
    expect(agenda[1]?.status).toBe('active');
    expect(agenda[2]?.status).toBe('upcoming');
  });

  it('marks pickup active when pickup is within two hours', () => {
    const data = mapConfirmedRow({
      scheduled_pickup_at: '2026-05-12T15:30:00.000Z',
    });
    const nowMs = Date.parse('2026-05-12T14:00:00.000Z');
    const agenda = buildConfirmedRideAgenda(data, nowMs);

    expect(agenda[0]?.status).toBe('done');
    expect(agenda[1]?.status).toBe('done');
    expect(agenda[2]?.status).toBe('active');
  });

  it('returns an empty agenda when the ride is not confirmed', () => {
    const row = buildRideViewRow({ state: 'pending' });
    const mapped = mapRideView(row);
    if (!mapped) {
      throw new Error('expected mapped ride');
    }
    expect(buildConfirmedRideAgenda(mapped, Date.now())).toEqual([]);
  });
});

import { mapHomeDashboard } from '@/pages/driver-home';

import { homeDashboardRowsFixture } from '../../fixtures/driver-home/supabase-row-fixtures';

describe('home dashboard read contract', () => {
  it('maps Supabase rows to the page read model', () => {
    const dashboard = mapHomeDashboard(homeDashboardRowsFixture);

    expect(dashboard.summary.weekEarnings).toEqual({ cents: 142000, currency: 'USD' });
    expect(dashboard.summary.weeklyRidesCompleted).toBe(7);
    expect(dashboard.rides).toHaveLength(1);
    expect(dashboard.rides[0]).toMatchObject({
      id: 'ride-row-1',
      type: 'appointment',
      state: 'confirmed',
      rider: {
        firstName: 'Daniel',
        lastName: 'Reyes',
      },
      pricing: {
        accepted: { cents: 3500, currency: 'USD' },
      },
      pickup: {
        label: 'Arcadia',
      },
      dropoff: {
        label: 'Sky Harbor offices',
      },
    });
  });
});

import type { HomeDashboardRows } from '@/pages/driver-home';

export const homeDashboardRowsFixture: HomeDashboardRows = {
  summary: {
    today_earnings_cents: 0,
    week_earnings_cents: 142000,
    weekly_rides_completed: 7,
    weekly_rides_goal: 10,
    computed_at: '2026-05-12T15:00:00.000Z',
  },
  rides: [
    {
      id: 'ride-row-1',
      ride_type: 'appointment',
      state: 'confirmed',
      scheduled_pickup_at: '2026-05-12T15:15:00.000Z',
      completed_at: null,
      display_note: 'standing',
      rider: {
        id: 'rider-row-1',
        first_name: 'Daniel',
        last_name: 'Reyes',
        phone_number: '+16025550111',
        total_rides: 24,
        lifetime_value_cents: 96000,
        preferences: ['front seat okay'],
      },
      pricing: {
        quoted_amount_cents: 3500,
        accepted_amount_cents: 3500,
        platform_average_low_cents: 3900,
        platform_average_high_cents: 4600,
        currency: 'USD',
        pricing_note: 'commute',
      },
      pickup: {
        label: 'Arcadia',
        address_line1: 'Arcadia, Phoenix, AZ',
        address_line2: null,
        city: 'Phoenix',
        region: 'AZ',
        airport_code: null,
      },
      dropoff: {
        label: 'Sky Harbor offices',
        address_line1: 'Sky Harbor offices',
        address_line2: null,
        city: 'Phoenix',
        region: 'AZ',
        airport_code: null,
      },
      flight: null,
    },
  ],
};

import { render, screen } from '@testing-library/react-native';

import { ConfirmedRidePanel, mapRideView } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

function mapConfirmed(overrides: Parameters<typeof buildRideViewRow>[0] = {}) {
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

describe('confirmed ride panel', () => {
  it('renders agenda, accepted quote, and rider context', () => {
    const data = mapConfirmed();
    render(<ConfirmedRidePanel data={data} nowMs={Date.parse('2026-05-12T14:00:00.000Z')} />);

    expect(screen.getByTestId('confirmed-ride-panel')).toBeTruthy();
    expect(screen.getByTestId('ride-agenda-timeline')).toBeTruthy();
    expect(screen.getByTestId('confirmed-accepted-quote')).toBeTruthy();
  });

  it('shows flight summary when a flight exists', () => {
    const data = mapConfirmed({
      flight: {
        airline_code: 'AA',
        flight_number: '123',
        origin_airport_code: 'PHX',
        destination_airport_code: 'LAX',
        scheduled_arrival_at: '2026-05-12T18:00:00.000Z',
        estimated_arrival_at: null,
        actual_arrival_at: null,
        status: 'on_time',
        delay_minutes: null,
        gate: 'A1',
        terminal: '4',
        baggage_claim: null,
        data_freshness_at: '2026-05-12T12:00:00.000Z',
      },
    });

    render(<ConfirmedRidePanel data={data} />);
    expect(screen.getByTestId('confirmed-flight-summary')).toBeTruthy();
  });

  it('shows route fallback copy when routing is limited', () => {
    const data = mapConfirmed();
    const limited = {
      ...data,
      route: {
        ...data.route,
        availability: 'location_unavailable' as const,
      },
    };

    render(<ConfirmedRidePanel data={limited} />);
    expect(screen.getByTestId('confirmed-route-fallback')).toBeTruthy();
  });
});

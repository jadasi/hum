import { render, screen } from '@testing-library/react-native';

import { ActiveRidePanel, mapRideView } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

function mapRow(overrides: Parameters<typeof buildRideViewRow>[0]) {
  const mapped = mapRideView(buildRideViewRow(overrides));
  if (!mapped) {
    throw new Error('expected mapped ride');
  }
  return mapped;
}

describe('active ride panel', () => {
  it('summarizes pickup for driving_to_appointment', () => {
    const data = mapRow({
      state: 'driving_to_appointment',
      pricing: {
        id: '80000000-0000-4000-8000-000000000001',
        quoted_amount_cents: 4500,
        accepted_amount_cents: 4500,
        platform_average_low_cents: null,
        platform_average_high_cents: null,
        currency: 'USD',
        pricing_note: null,
      },
    });

    render(<ActiveRidePanel data={data} />);
    expect(screen.getByTestId('active-ride-panel')).toBeTruthy();
    expect(screen.getByTestId('active-pickup-line')).toBeTruthy();
  });

  it('summarizes drop-off for driving_to_destination', () => {
    const data = mapRow({
      state: 'driving_to_destination',
      pricing: {
        id: '80000000-0000-4000-8000-000000000001',
        quoted_amount_cents: 4500,
        accepted_amount_cents: 4500,
        platform_average_low_cents: null,
        platform_average_high_cents: null,
        currency: 'USD',
        pricing_note: null,
      },
    });

    render(<ActiveRidePanel data={data} />);
    expect(screen.getByTestId('active-dropoff-line')).toBeTruthy();
  });
});

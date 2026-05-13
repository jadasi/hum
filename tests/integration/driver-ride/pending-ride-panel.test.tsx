import { render, screen } from '@testing-library/react-native';

import { mapRideView, PendingRidePanel } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

function mapPendingRow(row: ReturnType<typeof buildRideViewRow>) {
  const mapped = mapRideView(row);
  if (!mapped) {
    throw new Error('expected mapped ride');
  }
  return mapped;
}

describe('pending ride panel', () => {
  it('shows suggested quote and editable input', () => {
    const data = mapPendingRow(buildRideViewRow({ state: 'pending' }));

    render(
      <PendingRidePanel
        confirmError={null}
        data={data}
        isConfirming={false}
        onQuoteInputChange={jest.fn()}
        quoteError={null}
        quoteInput="45.00"
      />
    );

    expect(screen.getByTestId('pending-suggested-quote')).toBeTruthy();
    expect(screen.getByTestId('pending-quote-input').props.value).toBe('45.00');
    expect(screen.getByText('Jordan Lee')).toBeTruthy();
    expect(screen.getByTestId('pending-rider-source')).toBeTruthy();
  });

  it('shows platform comparison when both averages exist', () => {
    const data = mapPendingRow(
      buildRideViewRow({
        state: 'pending',
        pricing: {
          id: '80000000-0000-4000-8000-000000000001',
          quoted_amount_cents: 4500,
          accepted_amount_cents: null,
          platform_average_low_cents: 4600,
          platform_average_high_cents: 5200,
          currency: 'USD',
          pricing_note: null,
        },
      })
    );

    render(
      <PendingRidePanel
        confirmError={null}
        data={data}
        isConfirming={false}
        onQuoteInputChange={jest.fn()}
        quoteError={null}
        quoteInput="45.00"
      />
    );

    expect(screen.getByTestId('pending-platform-comparison')).toBeTruthy();
  });

  it('omits platform comparison when averages are missing', () => {
    const data = mapPendingRow(buildRideViewRow({ state: 'pending' }));

    render(
      <PendingRidePanel
        confirmError={null}
        data={data}
        isConfirming={false}
        onQuoteInputChange={jest.fn()}
        quoteError={null}
        quoteInput="45.00"
      />
    );

    expect(screen.queryByTestId('pending-platform-comparison')).toBeNull();
  });

  it('shows flight summary when flight exists', () => {
    const data = mapPendingRow(
      buildRideViewRow({
        state: 'pending',
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
      })
    );

    render(
      <PendingRidePanel
        confirmError={null}
        data={data}
        isConfirming={false}
        onQuoteInputChange={jest.fn()}
        quoteError={null}
        quoteInput="45.00"
      />
    );

    expect(screen.getByTestId('pending-flight-summary')).toBeTruthy();
  });

  it('omits flight summary when flight is absent', () => {
    const data = mapPendingRow(buildRideViewRow({ state: 'pending', flight: null }));

    render(
      <PendingRidePanel
        confirmError={null}
        data={data}
        isConfirming={false}
        onQuoteInputChange={jest.fn()}
        quoteError={null}
        quoteInput="45.00"
      />
    );

    expect(screen.queryByTestId('pending-flight-summary')).toBeNull();
  });
});

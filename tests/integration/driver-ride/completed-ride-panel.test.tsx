import { render, screen } from '@testing-library/react-native';

import { CompletedRidePanel, mapRideView } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('completed ride panel', () => {
  it('shows payment, HUM moment, and draft controls', () => {
    const mapped = mapRideView(
      buildRideViewRow({
        state: 'completed',
        completed_at: '2026-05-12T16:00:00.000Z',
        active_started_at: '2026-05-12T15:30:00.000Z',
        pricing: {
          id: '80000000-0000-4000-8000-000000000001',
          quoted_amount_cents: 4500,
          accepted_amount_cents: 4500,
          platform_average_low_cents: null,
          platform_average_high_cents: null,
          currency: 'USD',
          pricing_note: null,
        },
      })
    );
    if (!mapped) {
      throw new Error('expected mapped ride');
    }

    render(
      <CompletedRidePanel
        data={mapped}
        draft={{ body: '', tags: [] }}
        onChangeDraftBody={jest.fn()}
        onToggleDraftTag={jest.fn()}
      />
    );

    expect(screen.getByTestId('completed-payment-summary')).toBeTruthy();
    expect(screen.getByTestId('completed-hum-moment')).toBeTruthy();
    expect(screen.getByTestId('completed-draft-note')).toBeTruthy();
    expect(screen.getByTestId('completed-draft-tags')).toBeTruthy();
  });
});

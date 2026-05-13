import { render, screen } from '@testing-library/react-native';

import { CompletedRidePanel, mapRideView } from '@/pages/driver-ride';

import { buildRideViewRow } from '../../fixtures/driver-ride/ride-view-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('completed ride notes display', () => {
  it('renders saved relationship notes when present on the read model', () => {
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

    const withNotes = {
      ...mapped,
      relationshipNotes: [
        { id: 'note-1', body: 'Prefers quiet cabin', tags: ['VIP'] },
        { id: 'note-2', body: null, tags: ['Referral'] },
      ],
    };

    render(
      <CompletedRidePanel
        data={withNotes}
        draft={{ body: '', tags: [] }}
        onChangeDraftBody={jest.fn()}
        onToggleDraftTag={jest.fn()}
      />
    );

    expect(screen.getByText('Prefers quiet cabin')).toBeTruthy();
    expect(screen.getByTestId('completed-relationship-notes')).toBeTruthy();
  });
});

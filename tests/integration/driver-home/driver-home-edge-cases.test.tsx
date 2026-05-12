import { render, screen } from '@testing-library/react-native';

import { DriverHomeScreen, type HomeDashboardReadModel } from '@/pages/driver-home';

import {
  confirmedRide,
  fixtureSummary,
  partialAirportRide,
  pendingRide,
} from '../../fixtures/driver-home/home-dashboard-fixtures';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('driver home edge cases', () => {
  it('renders a clear route when pickup is missing', () => {
    const dashboard: HomeDashboardReadModel = {
      summary: fixtureSummary,
      rides: [{ ...confirmedRide, id: 'ride-missing-pickup', pickup: null }],
    };

    render(<DriverHomeScreen initialData={dashboard} today="2026-05-12" />);

    expect(screen.getByText('Pickup to be confirmed -> Home')).toBeTruthy();
  });

  it('omits unavailable optional flight fields', () => {
    render(
      <DriverHomeScreen
        initialData={{ summary: fixtureSummary, rides: [partialAirportRide] }}
        today="2026-05-12"
      />
    );

    expect(screen.getByText('Flight 2241')).toBeTruthy();
    expect(screen.getByText('PHX')).toBeTruthy();
    expect(screen.queryByText('DFW')).toBeNull();
    expect(screen.queryByText('Terminal 4 · Gate B12')).toBeNull();
    expect(screen.queryByText('Baggage 6')).toBeNull();
  });

  it('does not render empty rider preferences', () => {
    render(
      <DriverHomeScreen
        initialData={{ summary: fixtureSummary, rides: [confirmedRide] }}
        today="2026-05-12"
      />
    );

    expect(screen.queryByText('Preferences')).toBeNull();
    expect(screen.queryByText('undefined')).toBeNull();
  });

  it('shows quoted pricing when accepted price is pending', () => {
    render(
      <DriverHomeScreen
        initialData={{ summary: fixtureSummary, rides: [pendingRide] }}
        today="2026-05-12"
      />
    );

    expect(screen.getByText('quoted $45')).toBeTruthy();
    expect(screen.queryByText(/accepted/i)).toBeNull();
  });
});

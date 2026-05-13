import { render, screen } from '@testing-library/react-native';

import { DriverHomeScreen } from '@/pages/driver-home';

import {
    airportRide,
    fixtureSummary,
    pendingRide,
    staleAirportRide,
} from '../../fixtures/driver-home/home-dashboard-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('driver home airport rides', () => {
  it('renders available airport flight details on airport ride cards', () => {
    render(
      <DriverHomeScreen
        initialData={{ summary: fixtureSummary, rides: [airportRide] }}
        today="2026-05-12"
      />
    );

    expect(screen.getByText('AA 2241')).toBeTruthy();
    expect(screen.getByText('DFW')).toBeTruthy();
    expect(screen.getByText('PHX')).toBeTruthy();
    expect(screen.getByText('delayed 30 min')).toBeTruthy();
    expect(screen.getByText('Terminal 4 · Gate B12')).toBeTruthy();
    expect(screen.getByText('Baggage 6')).toBeTruthy();
  });

  it('shows unknown flight copy when flight details are stale or unavailable', () => {
    render(
      <DriverHomeScreen
        initialData={{ summary: fixtureSummary, rides: [staleAirportRide] }}
        today="2026-05-12"
      />
    );

    expect(screen.getByText('Flight details not confirmed')).toBeTruthy();
  });

  it('omits flight fields for non-flight ride cards', () => {
    render(
      <DriverHomeScreen
        initialData={{ summary: fixtureSummary, rides: [pendingRide] }}
        today="2026-05-12"
      />
    );

    expect(screen.queryByText('AA 2241')).toBeNull();
    expect(screen.queryByText('Terminal 4 · Gate B12')).toBeNull();
    expect(screen.queryByText('Baggage 6')).toBeNull();
  });
});

import { render, screen } from '@testing-library/react-native';

import {
  formatFlightRoute,
  formatFlightTerminalGate,
  getFlightStatusCopy,
} from '@/pages/driver-home/model/home-flight-view';

import {
  airportRide,
  partialAirportRide,
  staleAirportRide,
} from '../../fixtures/driver-home/home-dashboard-fixtures';

describe('home flight view', () => {
  it('formats complete flight route details', () => {
    render(formatFlightRoute(airportRide.flight!));

    expect(screen.getByText('AA 2241')).toBeTruthy();
    expect(screen.getByText('DFW')).toBeTruthy();
    expect(screen.getByText('PHX')).toBeTruthy();
    expect(formatFlightTerminalGate(airportRide.flight!)).toBe('Terminal 4 · Gate B12');
  });

  it('communicates delayed flights plainly', () => {
    expect(getFlightStatusCopy(airportRide.flight!)).toContain('delayed 30 min');
  });

  it('communicates stale or unknown flight data', () => {
    expect(getFlightStatusCopy(staleAirportRide.flight!)).toBe('Flight details not confirmed');
  });

  it('omits unavailable optional fields from partial flight data', () => {
    render(formatFlightRoute(partialAirportRide.flight!));

    expect(screen.getByText('Flight 2241')).toBeTruthy();
    expect(screen.getByText('PHX')).toBeTruthy();
    expect(screen.queryByText('DFW')).toBeNull();
    expect(formatFlightTerminalGate(partialAirportRide.flight!)).toBeNull();
  });
});

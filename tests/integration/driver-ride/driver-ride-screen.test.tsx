import { render, screen } from '@testing-library/react-native';

import { DriverRideScreen } from '@/pages/driver-ride';

import { rideViewReadModelByState } from '../../fixtures/driver-ride/ride-view-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

describe('driver ride screen shell', () => {
  const statesWithPrimaryAction = [
    { key: 'pending' as const, primaryLabel: 'Review quote and confirm' },
    { key: 'confirmed' as const, primaryLabel: 'Navigate to pickup' },
    { key: 'driving_to_appointment' as const, primaryLabel: 'Start drop-off trip' },
    { key: 'driving_to_destination' as const, primaryLabel: 'End trip' },
  ];

  it.each(statesWithPrimaryAction)('renders map, sheet, and primary action for $key', ({ key, primaryLabel }) => {
    const model = rideViewReadModelByState[key];

    render(<DriverRideScreen initialData={model} rideId={model.id} />);

    expect(screen.getByTestId('ride-map-view')).toBeTruthy();
    expect(screen.getByTestId('ride-bottom-sheet')).toBeTruthy();
    expect(screen.getByTestId('ride-map-nav-header')).toBeTruthy();
    expect(screen.getByLabelText(primaryLabel)).toBeTruthy();
  });

  it('renders completed ride without sheet actions', () => {
    const model = rideViewReadModelByState.completed;
    render(<DriverRideScreen initialData={model} rideId={model.id} />);

    expect(screen.getByTestId('ride-map-view')).toBeTruthy();
    expect(screen.getByTestId('ride-bottom-sheet')).toBeTruthy();
    expect(screen.queryByTestId('ride-primary-action-bar')).toBeNull();
  });

  it('renders the confirmed workspace panel when the ride is confirmed', () => {
    const model = rideViewReadModelByState.confirmed;
    render(<DriverRideScreen initialData={model} rideId={model.id} />);
    expect(screen.getByTestId('confirmed-ride-panel')).toBeTruthy();
  });
});

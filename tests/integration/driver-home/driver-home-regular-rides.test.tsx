import { render, screen } from '@testing-library/react-native';

import { DriverHomeScreen } from '@/pages/driver-home';

import { scheduleDashboardFixture } from '../../fixtures/driver-home/home-dashboard-fixtures';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('driver home regular ride cards', () => {
  it('shows route and accepted pricing for confirmed non-flight rides', () => {
    render(<DriverHomeScreen initialData={scheduleDashboardFixture} today="2026-05-12" />);

    expect(screen.getByText('Camelback Inn -> Home')).toBeTruthy();
    expect(screen.getByText('accepted $40')).toBeTruthy();
    expect(screen.getByText('platform $46-$52')).toBeTruthy();
  });

  it('shows quoted pricing when a ride has not been accepted yet', () => {
    render(<DriverHomeScreen initialData={scheduleDashboardFixture} today="2026-05-12" />);

    expect(screen.getAllByText('Phoenix Sky Harbor -> Scottsdale').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('quoted $45').length).toBeGreaterThanOrEqual(1);
  });
});

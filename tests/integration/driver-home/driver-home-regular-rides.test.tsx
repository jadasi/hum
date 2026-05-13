import { render, screen } from '@testing-library/react-native';

import { DriverHomeScreen } from '@/pages/driver-home';

import { scheduleDashboardFixture } from '../../fixtures/driver-home/home-dashboard-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('driver home regular ride cards', () => {
  it('shows route and accepted pricing for confirmed non-flight rides', () => {
    render(<DriverHomeScreen initialData={scheduleDashboardFixture} today="2026-05-12" />);

    expect(screen.getByText('Camelback Inn')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(
      screen.getByLabelText(/Brian S\.\. Confirmed\. Camelback Inn -> Home\. accepted \$40\./i)
    ).toBeTruthy();
  });

  it('shows quoted pricing when a ride has not been accepted yet', () => {
    render(<DriverHomeScreen initialData={scheduleDashboardFixture} today="2026-05-12" />);

    expect(screen.getAllByText('Phoenix Sky Harbor').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Scottsdale').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Quoted').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('$45').length).toBeGreaterThanOrEqual(1);
  });
});

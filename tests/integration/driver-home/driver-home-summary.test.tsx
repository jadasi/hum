import { render, screen } from '@testing-library/react-native';

import { DriverHomeScreen } from '@/pages/driver-home';

import { homeDashboardFixture, zeroHomeDashboardFixture } from '../../fixtures/driver-home/home-dashboard-fixtures';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

describe('driver home summary', () => {
  it('renders populated business stats', () => {
    render(<DriverHomeScreen initialData={homeDashboardFixture} today="2026-05-12" />);

    expect(screen.getByText('Tuesday')).toBeTruthy();
    expect(screen.getByText('May 12')).toBeTruthy();
    expect(screen.getByText('Today')).toBeTruthy();
    expect(screen.getByText('$0')).toBeTruthy();
    expect(screen.getByText('This week')).toBeTruthy();
    expect(screen.getByText('$1,420')).toBeTruthy();
    expect(screen.getByText('Ride goal')).toBeTruthy();
    expect(screen.getByText('7/10')).toBeTruthy();
  });

  it('renders zero-state business stats without hiding the card', () => {
    render(<DriverHomeScreen initialData={zeroHomeDashboardFixture} today="2026-05-12" />);

    expect(screen.getAllByText('$0').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('0/10')).toBeTruthy();
  });
});

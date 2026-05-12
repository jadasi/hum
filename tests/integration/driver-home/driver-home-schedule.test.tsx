import { render, screen } from '@testing-library/react-native';

import { DriverHomeScreen } from '@/pages/driver-home';

import { scheduleDashboardFixture } from '../../fixtures/driver-home/home-dashboard-fixtures';

jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('driver home schedule', () => {
  it('renders all supported ride states', () => {
    render(<DriverHomeScreen initialData={scheduleDashboardFixture} today="2026-05-12" />);

    expect(screen.getByText('Pending')).toBeTruthy();
    expect(screen.getByText('Confirmed')).toBeTruthy();
    expect(screen.getByText('Driving to pickup')).toBeTruthy();
    expect(screen.getByText('Driving to destination')).toBeTruthy();
    expect(screen.getByText('Completed')).toBeTruthy();
  });

  it('renders rides in chronological order', () => {
    render(<DriverHomeScreen initialData={scheduleDashboardFixture} today="2026-05-12" />);

    const names = screen.getAllByTestId('home-ride-rider-name').map((node) => node.props.children);
    expect(names).toEqual(['Nora P.', 'Michele W.', 'Daniel R.', 'Alicia M.', 'Brian S.']);
  });
});

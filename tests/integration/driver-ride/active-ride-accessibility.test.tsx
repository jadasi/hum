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

describe('active ride accessibility', () => {
  it('exposes labels for primary transition and contact actions', () => {
    const model = rideViewReadModelByState.driving_to_appointment;
    render(<DriverRideScreen initialData={model} rideId={model.id} />);

    expect(screen.getByLabelText('Start drop-off trip')).toBeTruthy();
    expect(screen.getByLabelText('Contact passenger')).toBeTruthy();
  });
});

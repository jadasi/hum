import { formatRideStateLabel } from '@/pages/driver-home';
import { getRideDisplayTime, sortRidesForSchedule } from '@/pages/driver-home/model/home-schedule-view';

import {
  completedRide,
  confirmedRide,
  drivingToAppointmentRide,
  pendingRide,
} from '../../fixtures/driver-home/home-dashboard-fixtures';

describe('home schedule view', () => {
  it('orders rides chronologically by the relevant display time', () => {
    const rides = [confirmedRide, pendingRide, completedRide, drivingToAppointmentRide];

    expect(sortRidesForSchedule(rides).map((ride) => ride.id)).toEqual([
      'ride-completed',
      'ride-pending',
      'ride-driving-pickup',
      'ride-confirmed',
    ]);
  });

  it('maps all supported ride states to plain-language labels', () => {
    expect(formatRideStateLabel('pending')).toBe('Pending');
    expect(formatRideStateLabel('confirmed')).toBe('Confirmed');
    expect(formatRideStateLabel('driving_to_appointment')).toBe('Driving to pickup');
    expect(formatRideStateLabel('driving_to_destination')).toBe('Driving to destination');
    expect(formatRideStateLabel('completed')).toBe('Completed');
  });

  it('uses completed time for completed rides when available', () => {
    expect(getRideDisplayTime(completedRide)).toBe('2026-05-12T14:35:00.000Z');
  });
});

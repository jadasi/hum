import type { HomeRideCardModel } from './home-dashboard-types';

export function getRideDisplayTime(ride: HomeRideCardModel): string {
  return (
    ride.completedAt ??
    ride.scheduledPickupAt ??
    ride.flight?.estimatedArrivalAt ??
    ride.flight?.scheduledArrivalAt ??
    ride.flight?.actualArrivalAt ??
    ''
  );
}

export function sortRidesForSchedule(rides: HomeRideCardModel[]): HomeRideCardModel[] {
  return [...rides].sort((a, b) => getRideDisplayTime(a).localeCompare(getRideDisplayTime(b)));
}

export function isCompletedRide(ride: HomeRideCardModel): boolean {
  return ride.state === 'completed';
}

export function isActiveRide(ride: HomeRideCardModel): boolean {
  return ride.state === 'driving_to_appointment' || ride.state === 'driving_to_destination';
}

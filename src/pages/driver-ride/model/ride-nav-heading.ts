import type { RideState } from '@/pages/driver-home';

/** Short line under the passenger name on the ride map header. */
export function rideNavSubtitleForState(state: RideState): string {
  switch (state) {
    case 'pending':
      return 'Review your quote and confirm';
    case 'confirmed':
      return 'Prepare and head to pickup';
    case 'driving_to_appointment':
      return 'Driving to pickup';
    case 'driving_to_destination':
      return 'Driving to drop-off';
    case 'completed':
      return 'Trip complete';
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

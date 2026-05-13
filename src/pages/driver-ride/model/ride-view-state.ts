import type { RideState } from '@/pages/driver-home';

import type { RideAction, RouteMode } from './ride-view-types';

export function getRouteModeForState(state: RideState, hasCurrentLocation: boolean): RouteMode {
  switch (state) {
    case 'pending':
      return 'pickup_to_dropoff';
    case 'confirmed':
      return hasCurrentLocation ? 'current_to_pickup_to_dropoff' : 'pickup_to_dropoff';
    case 'driving_to_appointment':
      return 'current_to_pickup';
    case 'driving_to_destination':
      return 'current_to_dropoff';
    case 'completed':
      return 'completed_summary';
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

function contactPassengerAction(hasRiderPhone: boolean): RideAction {
  return {
    id: 'contact_passenger',
    label: 'Contact passenger',
    priority: 'secondary',
    enabled: hasRiderPhone,
    disabledReason: hasRiderPhone ? undefined : 'Phone number unavailable',
    requiresReview: false,
  };
}

export function buildRideActions(state: RideState, hasRiderPhone: boolean): RideAction[] {
  switch (state) {
    case 'pending':
      return [
        {
          id: 'confirm_pending_ride',
          label: 'Review quote and confirm',
          priority: 'primary',
          enabled: true,
          requiresReview: true,
        },
      ];
    case 'confirmed':
      return [
        {
          id: 'navigate_to_pickup',
          label: 'Navigate to pickup',
          priority: 'primary',
          enabled: true,
          requiresReview: false,
        },
        {
          id: 'review_pre_trip_confirmation',
          label: 'Review pre-trip confirmation',
          priority: 'secondary',
          enabled: true,
          requiresReview: true,
        },
      ];
    case 'driving_to_appointment':
      return [
        {
          id: 'start_dropoff_leg',
          label: 'Start drop-off trip',
          priority: 'primary',
          enabled: true,
          requiresReview: false,
        },
        contactPassengerAction(hasRiderPhone),
      ];
    case 'driving_to_destination':
      return [
        {
          id: 'end_trip',
          label: 'End trip',
          priority: 'primary',
          enabled: true,
          requiresReview: false,
        },
        contactPassengerAction(hasRiderPhone),
      ];
    case 'completed':
      return [];
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

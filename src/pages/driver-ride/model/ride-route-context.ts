import type { RideState } from '@/pages/driver-home';

import { getRouteModeForState } from './ride-view-state';
import type { RideRouteContext } from './ride-view-types';

export type RouteAvailabilityInputs = {
  state: RideState;
  hasCurrentLocation: boolean;
  hasDropoffWaypoint: boolean;
};

export function computeRouteAvailability(inputs: RouteAvailabilityInputs): RideRouteContext['availability'] {
  const mode = getRouteModeForState(inputs.state, inputs.hasCurrentLocation);

  let availability: RideRouteContext['availability'] = 'ready';

  if (
    mode === 'current_to_pickup' ||
    mode === 'current_to_dropoff' ||
    mode === 'current_to_pickup_to_dropoff'
  ) {
    if (!inputs.hasCurrentLocation) {
      availability = 'location_unavailable';
    }
  }

  if (!inputs.hasDropoffWaypoint) {
    availability = 'route_unavailable';
  }

  return availability;
}

export function getRouteOverviewBannerCopy(route: RideRouteContext): string | null {
  if (route.availability === 'ready') {
    return null;
  }

  if (route.availability === 'location_unavailable') {
    return 'Turn on location to preview navigation from your current position.';
  }

  if (route.availability === 'route_unavailable') {
    return 'Route preview is limited until drop-off coordinates are available.';
  }

  if (route.availability === 'permission_needed') {
    return 'Location permission is needed to preview navigation from where you are.';
  }

  return null;
}

import {
  computeRouteAvailability,
  getRouteOverviewBannerCopy,
  type RideRouteContext,
} from '@/pages/driver-ride';

function routeStub(overrides: Partial<RideRouteContext>): RideRouteContext {
  return {
    mode: 'pickup_to_dropoff',
    currentLocation: null,
    pickupWaypoint: null,
    dropoffWaypoint: null,
    polyline: null,
    distanceText: null,
    durationText: null,
    routeFreshnessAt: null,
    availability: 'ready',
    ...overrides,
  };
}

describe('computeRouteAvailability', () => {
  it('flags location unavailable when current-location routing is required but missing', () => {
    expect(
      computeRouteAvailability({
        state: 'driving_to_appointment',
        hasCurrentLocation: false,
        hasDropoffWaypoint: true,
      })
    ).toBe('location_unavailable');
  });

  it('stays ready when current location exists for driving to pickup', () => {
    expect(
      computeRouteAvailability({
        state: 'driving_to_appointment',
        hasCurrentLocation: true,
        hasDropoffWaypoint: true,
      })
    ).toBe('ready');
  });

  it('flags route unavailable when drop-off waypoint is missing', () => {
    expect(
      computeRouteAvailability({
        state: 'confirmed',
        hasCurrentLocation: true,
        hasDropoffWaypoint: false,
      })
    ).toBe('route_unavailable');
  });
});

describe('getRouteOverviewBannerCopy', () => {
  it('returns null when routing is ready', () => {
    expect(getRouteOverviewBannerCopy(routeStub({ availability: 'ready' }))).toBeNull();
  });

  it('returns guidance when location is unavailable', () => {
    const copy = getRouteOverviewBannerCopy(routeStub({ availability: 'location_unavailable' }));
    expect(copy).toMatch(/location/i);
  });

  it('returns guidance when the route is unavailable', () => {
    const copy = getRouteOverviewBannerCopy(routeStub({ availability: 'route_unavailable' }));
    expect(copy).toMatch(/route preview/i);
  });
});

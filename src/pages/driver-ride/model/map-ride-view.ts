import type { FlightDisplay, LocationDisplay, Money, RideState } from '@/pages/driver-home';

import { computeRouteAvailability } from './ride-route-context';
import { buildRideActions, getRouteModeForState } from './ride-view-state';
import type {
  RideRouteContext,
  RideViewLocationRow,
  RideViewReadModel,
  RideViewRideRow,
  RideWaypoint,
} from './ride-view-types';

function mapMoney(cents: number, currency = 'USD'): Money {
  return { cents, currency };
}

function mapLocationDisplay(row: RideViewLocationRow | null): LocationDisplay | null {
  if (!row) {
    return null;
  }

  return {
    label: row.label,
    addressLine1: row.address_line1,
    addressLine2: row.address_line2,
    city: row.city,
    region: row.region,
    airportCode: row.airport_code,
  };
}

function waypointFromLocation(
  row: RideViewLocationRow | null | undefined,
  kind: 'pickup' | 'dropoff'
): RideWaypoint | null {
  if (!row || row.latitude == null || row.longitude == null) {
    return null;
  }

  const display = mapLocationDisplay(row);
  const label =
    display?.label?.trim() ||
    [display?.addressLine1, display?.city].filter(Boolean).join(', ') ||
    (kind === 'pickup' ? 'Pickup' : 'Drop-off');

  return {
    kind,
    label,
    coordinate: [row.longitude, row.latitude],
  };
}

function mapFlight(row: RideViewRideRow['flight']): FlightDisplay | null {
  if (!row) {
    return null;
  }

  return {
    airlineCode: row.airline_code,
    flightNumber: row.flight_number,
    originAirportCode: row.origin_airport_code,
    destinationAirportCode: row.destination_airport_code,
    scheduledArrivalAt: row.scheduled_arrival_at,
    estimatedArrivalAt: row.estimated_arrival_at,
    actualArrivalAt: row.actual_arrival_at,
    status: row.status,
    delayMinutes: row.delay_minutes,
    gate: row.gate,
    terminal: row.terminal,
    baggageClaim: row.baggage_claim,
    dataFreshnessAt: row.data_freshness_at,
  };
}

function deriveRouteContext(
  state: RideState,
  pickup: RideViewLocationRow | null,
  dropoff: RideViewLocationRow | null,
  hasCurrentLocation: boolean
): RideRouteContext {
  const pickupWaypoint = waypointFromLocation(pickup, 'pickup');
  const dropoffWaypoint = waypointFromLocation(dropoff, 'dropoff');
  const mode = getRouteModeForState(state, hasCurrentLocation);
  const availability = computeRouteAvailability({
    state,
    hasCurrentLocation,
    hasDropoffWaypoint: dropoffWaypoint !== null,
  });

  return {
    mode,
    currentLocation: null,
    pickupWaypoint,
    dropoffWaypoint,
    polyline: null,
    distanceText: null,
    durationText: null,
    routeFreshnessAt: null,
    availability,
  };
}

export function mapRideView(
  row: RideViewRideRow,
  options: { hasCurrentLocation?: boolean } = {}
): RideViewReadModel | null {
  const hasCurrentLocation = options.hasCurrentLocation ?? false;

  if (!row.rider || !row.pricing || !row.dropoff) {
    return null;
  }

  const pickupDisplay = mapLocationDisplay(row.pickup);
  const dropoffDisplay = mapLocationDisplay(row.dropoff);
  if (!dropoffDisplay) {
    return null;
  }

  const riderPhone = row.rider.phone_number?.trim() ?? '';
  const hasRiderPhone = riderPhone.length > 0;

  const readModel: RideViewReadModel = {
    id: row.id,
    state: row.state,
    type: row.ride_type,
    scheduledPickupAt: row.scheduled_pickup_at,
    activeStartedAt: row.active_started_at ?? null,
    completedAt: row.completed_at,
    displayNote: row.display_note,
    rider: {
      id: row.rider.id,
      firstName: row.rider.first_name,
      lastName: row.rider.last_name,
      phoneNumber: row.rider.phone_number,
      totalRides: row.rider.total_rides,
      lifetimeValue: mapMoney(row.rider.lifetime_value_cents),
      preferences: row.rider.preferences ?? [],
    },
    pricing: {
      quoteId: row.pricing.id,
      quoted: mapMoney(row.pricing.quoted_amount_cents, row.pricing.currency),
      accepted:
        row.pricing.accepted_amount_cents === null ? null : mapMoney(row.pricing.accepted_amount_cents, row.pricing.currency),
      platformAverageLow:
        row.pricing.platform_average_low_cents === null
          ? null
          : mapMoney(row.pricing.platform_average_low_cents, row.pricing.currency),
      platformAverageHigh:
        row.pricing.platform_average_high_cents === null
          ? null
          : mapMoney(row.pricing.platform_average_high_cents, row.pricing.currency),
      note: row.pricing.pricing_note,
    },
    pickup: pickupDisplay,
    dropoff: dropoffDisplay,
    route: deriveRouteContext(row.state, row.pickup, row.dropoff, hasCurrentLocation),
    flight: mapFlight(row.flight),
    agenda: [],
    relationshipNotes: [],
    availableActions: buildRideActions(row.state, hasRiderPhone),
  };

  return readModel;
}

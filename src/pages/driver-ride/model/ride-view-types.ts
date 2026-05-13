import type { FlightDisplay, FlightStatus, LocationDisplay, Money, RideState, RideType } from '@/pages/driver-home';

export type RouteMode =
  | 'pickup_to_dropoff'
  | 'current_to_pickup_to_dropoff'
  | 'current_to_pickup'
  | 'current_to_dropoff'
  | 'completed_summary';

export type RouteAvailability =
  | 'ready'
  | 'location_unavailable'
  | 'route_unavailable'
  | 'permission_needed';

export type RideWaypoint = {
  kind: 'pickup' | 'dropoff';
  label: string;
  /** Mapbox order: [longitude, latitude] */
  coordinate: [number, number];
};

export type RideRouteContext = {
  mode: RouteMode;
  /** Filled on-device later; server read model leaves this null. */
  currentLocation: [number, number] | null;
  pickupWaypoint: RideWaypoint | null;
  dropoffWaypoint: RideWaypoint | null;
  polyline: string | null;
  distanceText: string | null;
  durationText: string | null;
  routeFreshnessAt: string | null;
  availability: RouteAvailability;
};

export type RideActionPriority = 'primary' | 'secondary' | 'tertiary';

export type RideAction = {
  id: string;
  label: string;
  priority: RideActionPriority;
  enabled: boolean;
  disabledReason?: string;
  requiresReview: boolean;
};

export type RideAgendaItem = {
  id: string;
  status: 'done' | 'active' | 'upcoming';
  title: string;
  description: string | null;
  scheduledAt: string | null;
};

export type RelationshipNote = {
  id: string;
  body: string | null;
  tags: string[];
};

export type RideViewReadModel = {
  id: string;
  state: RideState;
  type: RideType;
  scheduledPickupAt: string | null;
  activeStartedAt: string | null;
  completedAt: string | null;
  displayNote: string | null;
  rider: {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    totalRides: number;
    lifetimeValue: Money;
    preferences: string[];
  };
  pricing: {
    /** `pricing_quotes.id` for driver-owned updates. */
    quoteId: string;
    quoted: Money;
    accepted: Money | null;
    platformAverageLow: Money | null;
    platformAverageHigh: Money | null;
    note: string | null;
  };
  pickup: LocationDisplay | null;
  dropoff: LocationDisplay;
  route: RideRouteContext;
  flight: FlightDisplay | null;
  agenda: RideAgendaItem[];
  relationshipNotes: RelationshipNote[];
  availableActions: RideAction[];
};

export type RideViewLoadState =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'ready'; data: RideViewReadModel };

/** Supabase nested row shape for a single ride detail read. */
export type RideViewLocationRow = {
  label: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string | null;
  region: string | null;
  airport_code: string | null;
  latitude?: number | null;
  longitude?: number | null;
};

export type RideViewRideRow = {
  id: string;
  pricing_id: string;
  ride_type: RideType;
  state: RideState;
  scheduled_pickup_at: string | null;
  /** Present on `rides` table; may be null until the active leg starts. */
  active_started_at: string | null;
  completed_at: string | null;
  display_note: string | null;
  rider: {
    id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    total_rides: number;
    lifetime_value_cents: number;
    preferences: string[] | null;
  } | null;
  pricing: {
    id: string;
    quoted_amount_cents: number;
    accepted_amount_cents: number | null;
    platform_average_low_cents: number | null;
    platform_average_high_cents: number | null;
    currency: string;
    pricing_note: string | null;
  } | null;
  pickup: RideViewLocationRow | null;
  dropoff: RideViewLocationRow | null;
  flight: {
    airline_code: string | null;
    flight_number: string;
    origin_airport_code: string | null;
    destination_airport_code: string;
    scheduled_arrival_at: string | null;
    estimated_arrival_at: string | null;
    actual_arrival_at: string | null;
    status: FlightStatus;
    delay_minutes: number | null;
    gate: string | null;
    terminal: string | null;
    baggage_claim: string | null;
    data_freshness_at: string | null;
  } | null;
};
